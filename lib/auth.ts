import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function auth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')

  if (!token) {
    return null
  }

  try {
    const decoded = verify(token.value, process.env.JWT_SECRET!) as {
      id: number
      email: string
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, decoded.id),
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    }
  } catch {
    return null
  }
}

