import { NextResponse } from "next/server"
import { db } from "@/db"
import { tasks } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { auth } from "@/lib/auth"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await auth()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const task = await db.query.tasks.findFirst({
      where: and(eq(tasks.id, Number.parseInt(params.id)), eq(tasks.userId, user.id)),
    })

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error("Error fetching task:", error)
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

    // Validate and parse the incoming data
    const { title, description, priority, dueDate } = body
    if (!title || !priority) {
      return NextResponse.json({ error: "Title and priority are required" }, { status: 400 })
    }

    const parsedDueDate = dueDate ? new Date(dueDate) : null
    if (parsedDueDate && isNaN(parsedDueDate.getTime())) {
      return NextResponse.json({ error: "Invalid due date" }, { status: 400 })
    }

    const [updatedTask] = await db
      .update(tasks)
      .set({
        title,
        description,
        priority,
        dueDate: parsedDueDate,
      })
      .where(and(eq(tasks.id, Number.parseInt(params.id)), eq(tasks.userId, user.id)))
      .returning()

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(updatedTask)
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await auth()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [task] = await db
      .delete(tasks)
      .where(and(eq(tasks.id, Number.parseInt(params.id)), eq(tasks.userId, user.id)))
      .returning()

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
