import { NextResponse } from "next/server"
import { db } from "@/db"
import { projects } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { auth } from "@/lib/auth"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await auth()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const project = await db.query.projects.findFirst({
      where: and(eq(projects.id, Number.parseInt(params.id)), eq(projects.userId, user.id)),
      with: {
        tasks: true,
      },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await auth()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const [project] = await db
      .update(projects)
      .set(body)
      .where(and(eq(projects.id, Number.parseInt(params.id)), eq(projects.userId, user.id)))
      .returning()

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await auth()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [project] = await db
      .delete(projects)
      .where(and(eq(projects.id, Number.parseInt(params.id)), eq(projects.userId, user.id)))
      .returning()

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

