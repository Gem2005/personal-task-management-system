import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()

    // Check if user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const [user] = await db
      .insert(users)
      .values({
        email,
        name,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
      })

    return NextResponse.json({
      user,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

