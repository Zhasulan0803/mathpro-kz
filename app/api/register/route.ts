import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Барлық өрістерді толтырыңыз" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Пароль кемінде 6 таңба болуы керек" }, { status: 400 })
    }

    return NextResponse.json({ success: true, user: { name, email } })
  } catch {
    return NextResponse.json({ error: "Қате шықты" }, { status: 500 })
  }
} 