import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Барлық өрістерді толтырыңыз" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Пароль кемінде 6 таңба болуы керек" }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: "Бұл email тіркелген" }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    })

    return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } })
  } catch {
    return NextResponse.json({ error: "Қате шықты" }, { status: 500 })
  }
} 