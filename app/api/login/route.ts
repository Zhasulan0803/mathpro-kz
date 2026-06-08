import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email мен паролді толтырыңыз" }, { status: 400 })
    }

    return NextResponse.json({ success: true, user: { name: email.split("@")[0], email } })
  } catch {
    return NextResponse.json({ error: "Қате шықты" }, { status: 500 })
  }
} 