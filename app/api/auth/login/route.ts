import { NextResponse } from "next/server"
import { compare } from "bcrypt"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { sign } from "jsonwebtoken"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Find user
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isValid = await compare(password, user.password)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create JWT token
    const token = sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "7d" })

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

