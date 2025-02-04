import { NextResponse } from "next/server";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userTasks = await db.query.tasks.findMany({
      where: eq(tasks.userId, user.id),
      orderBy: [tasks.createdAt],
    });

    return NextResponse.json(userTasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Validate and parse the incoming data
    const { title, description, priority, dueDate } = body;
    if (!title || !priority) {
      return NextResponse.json({ error: "Title and priority are required" }, { status: 400 });
    }

    const parsedDueDate = dueDate ? new Date(dueDate) : null;
    if (parsedDueDate && isNaN(parsedDueDate.getTime())) {
      return NextResponse.json({ error: "Invalid due date" }, { status: 400 });
    }

    const { projectId } = body;
    const [task] = await db
      .insert(tasks)
      .values({
      title,
      description,
      priority,
      dueDate: parsedDueDate,
      userId: user.id,
      projectId: projectId || null,
      })
      .returning();

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
