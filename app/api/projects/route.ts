import { NextResponse } from "next/server"
import { db } from "@/db"
import { projects } from "@/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const user = await auth()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userProjects = await db.query.projects.findMany({
      where: eq(projects.userId, user.id),
      orderBy: [projects.createdAt],
      with: {
        tasks: true,
      },
    })

    return NextResponse.json(userProjects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await auth()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const [project] = await db
      .insert(projects)
      .values({
        ...body,
        userId: user.id,
      })
      .returning()

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

