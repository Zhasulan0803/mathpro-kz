import { NextResponse } from "next/server"

const students = [
  { name: "Аяша Нұрланова", course: "ҰБТ Толық", progress: 72, lessonsCompleted: 47, testsCompleted: 23, lastActive: "Бүгін", parentPhone: "77019876543" },
  { name: "Дәурен Қалиев", course: "Базалық", progress: 45, lessonsCompleted: 20, testsCompleted: 8, lastActive: "Кеше", parentPhone: "77029876543" },
  { name: "Жанар Ерланқызы", course: "Интенсив", progress: 88, lessonsCompleted: 105, testsCompleted: 42, lastActive: "Бүгін", parentPhone: "77039876543" },
  { name: "Арман Бекұлы", course: "ҰБТ Толық", progress: 30, lessonsCompleted: 15, testsCompleted: 5, lastActive: "3 күн бұрын", parentPhone: "77049876543" },
  { name: "Сәуле Нұрқызы", course: "Базалық", progress: 60, lessonsCompleted: 27, testsCompleted: 12, lastActive: "Бүгін", parentPhone: "77059876543" },
]

async function sendTelegram(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
    }),
  })
}

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization")
  if (authHeader !== "Bearer " + process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const date = new Date().toLocaleDateString("kk-KZ")
  let report = "📊 <b>Апталық оқушылар есебі</b>\n"
  report += "📅 Күні: " + date + "\n\n"

  for (const s of students) {
    const emoji = s.progress >= 70 ? "🟢" : s.progress >= 40 ? "🟡" : "🔴"
    report += emoji + " <b>" + s.name + "</b>\n"
    report += "📚 Курс: " + s.course + "\n"
    report += "📈 Прогресс: " + s.progress + "%\n"
    report += "🎬 Өткен сабақ: " + s.lessonsCompleted + "\n"
    report += "📝 Тест: " + s.testsCompleted + "\n"
    report += "🕐 Соңғы белсенділік: " + s.lastActive + "\n\n"
  }

  report += "✅ Жалпы белсенді оқушы: " + students.filter(s => s.lastActive === "Бүгін").length + "/" + students.length

  await sendTelegram(report)

  for (const s of students) {
    const waMsg = "Assalaumagaleykim! Siz " + s.name + " ata-anasysyz. Balanyzdy IQ Math platformasyndaghy progressi turaly haftalyk esep:" +
      " Progress: " + s.progress + "%. " +
      "Otken sabak: " + s.lessonsCompleted + ". " +
      "Tapsyngan test: " + s.testsCompleted + ". " +
      "Songy belgsizdik: " + s.lastActive + ". " +
      "Tolygyraq: mathpro-kz.vercel.app"

    console.log("WhatsApp to parent " + s.parentPhone + ": " + waMsg)
  }

  return NextResponse.json({ success: true, studentsCount: students.length, date })
} 