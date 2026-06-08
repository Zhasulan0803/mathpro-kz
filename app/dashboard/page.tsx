"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type User = { name: string; email: string }

const packageNames: Record<string, string> = {
  basic: "Базалық",
  full: "Орта деңгей",
  vip: "Интенсив (VIP)",
}

const packageColors: Record<string, string> = {
  basic: "#d97706",
  full: "#5624d0",
  vip: "#dc2626",
}

const materials = {
  basic: {
    videos: [
      { id: 1, title: "Теңдеулер — Кіріспе", duration: "15:30", youtube: "dQw4w9WgXcQ", topic: "Алгебра" },
      { id: 2, title: "Теңдеулер — Негіздер", duration: "18:45", youtube: "dQw4w9WgXcQ", topic: "Алгебра" },
      { id: 3, title: "Геометрия — Үшбұрыш", duration: "22:10", youtube: "dQw4w9WgXcQ", topic: "Геометрия" },
      { id: 4, title: "Функциялар — Кіріспе", duration: "19:20", youtube: "dQw4w9WgXcQ", topic: "Алгебра" },
      { id: 5, title: "Тригонометрия негіздері", duration: "25:00", youtube: "dQw4w9WgXcQ", topic: "Тригонометрия" },
    ],
    pdfs: [
      { id: 1, title: "Алгебра формулалары", pages: 12 },
      { id: 2, title: "Геометрия теоремалары", pages: 8 },
    ],
    homeworks: [
      { id: 1, title: "Теңдеулер — 1-тапсырма", deadline: "05.06.2025", done: false },
      { id: 2, title: "Геометрия — 1-тапсырма", deadline: "08.06.2025", done: true },
    ],
  },
  full: {
    videos: [
      { id: 1, title: "Теңдеулер — Кіріспе", duration: "15:30", youtube: "dQw4w9WgXcQ", topic: "Алгебра" },
      { id: 2, title: "Теңдеулер — Негіздер", duration: "18:45", youtube: "dQw4w9WgXcQ", topic: "Алгебра" },
      { id: 3, title: "Теңдеулер — Күрделі", duration: "21:00", youtube: "dQw4w9WgXcQ", topic: "Алгебра" },
      { id: 4, title: "Геометрия — Үшбұрыш", duration: "22:10", youtube: "dQw4w9WgXcQ", topic: "Геометрия" },
      { id: 5, title: "Геометрия — Дөңгелек", duration: "20:30", youtube: "dQw4w9WgXcQ", topic: "Геометрия" },
      { id: 6, title: "Функциялар — Кіріспе", duration: "19:20", youtube: "dQw4w9WgXcQ", topic: "Алгебра" },
      { id: 7, title: "Функциялар — Графиктер", duration: "23:45", youtube: "dQw4w9WgXcQ", topic: "Алгебра" },
      { id: 8, title: "Тригонометрия негіздері", duration: "25:00", youtube: "dQw4w9WgXcQ", topic: "Тригонометрия" },
      { id: 9, title: "Тригонометрия теңдеулері", duration: "28:15", youtube: "dQw4w9WgXcQ", topic: "Тригонометрия" },
      { id: 10, title: "Логарифм — Кіріспе", duration: "20:00", youtube: "dQw4w9WgXcQ", topic: "Алгебра" },
    ],
    pdfs: [
      { id: 1, title: "Алгебра формулалары", pages: 12 },
      { id: 2, title: "Геометрия теоремалары", pages: 8 },
      { id: 3, title: "Тригонометрия формулалары", pages: 10 },
      { id: 4, title: "ҰБТ стратегиясы", pages: 15 },
    ],
    homeworks: [
      { id: 1, title: "Теңдеулер — 1-тапсырма", deadline: "05.06.2025", done: false },
      { id: 2, title: "Геометрия — 1-тапсырма", deadline: "08.06.2025", done: true },
      { id: 3, title: "Тригонометрия — 1-тапсырма", deadline: "12.06.2025", done: false },
    ],
  },
  vip: {
    videos: [
      { id: 1, title: "Теңдеулер — Кіріспе", duration: "15:30", youtube: "dQw4w9WgXcQ", topic: "Алгебра" },
      { id: 2, title: "Теңдеулер — Негіздер", duration: "18:45", youtube: "dQw4w9WgXcQ", topic: "Алгебра" },
      { id: 3, title: "Теңдеулер — Күрделі", duration: "21:00", youtube: "dQw4w9WgXcQ", topic: "Алгебра" },
      { id: 4, title: "Теңдеулер — ҰБТ деңгейі", duration: "24:30", youtube: "dQw4w9WgXcQ", topic: "Алгебра" },
      { id: 5, title: "Геометрия — Үшбұрыш", duration: "22:10", youtube: "dQw4w9WgXcQ", topic: "Геометрия" },
      { id: 6, title: "Геометрия — Дөңгелек", duration: "20:30", youtube: "dQw4w9WgXcQ", topic: "Геометрия" },
      { id: 7, title: "Геометрия — Вектор", duration: "19:45", youtube: "dQw4w9WgXcQ", topic: "Геометрия" },
      { id: 8, title: "Функциялар — Кіріспе", duration: "19:20", youtube: "dQw4w9WgXcQ", topic: "Алгебра" },
      { id: 9, title: "Функциялар — Графиктер", duration: "23:45", youtube: "dQw4w9WgXcQ", topic: "Алгебра" },
      { id: 10, title: "Тригонометрия негіздері", duration: "25:00", youtube: "dQw4w9WgXcQ", topic: "Тригонометрия" },
      { id: 11, title: "Логарифм — Кіріспе", duration: "20:00", youtube: "dQw4w9WgXcQ", topic: "Алгебра" },
      { id: 12, title: "Логарифм — Теңдеулер", duration: "22:30", youtube: "dQw4w9WgXcQ", topic: "Алгебра" },
      { id: 13, title: "Ықтималдық теориясы", duration: "18:00", youtube: "dQw4w9WgXcQ", topic: "Статистика" },
      { id: 14, title: "ҰБТ — Нақты тест талдауы", duration: "35:00", youtube: "dQw4w9WgXcQ", topic: "ҰБТ" },
      { id: 15, title: "ҰБТ — 100 балл стратегиясы", duration: "40:00", youtube: "dQw4w9WgXcQ", topic: "ҰБТ" },
    ],
    pdfs: [
      { id: 1, title: "Алгебра формулалары", pages: 12 },
      { id: 2, title: "Геометрия теоремалары", pages: 8 },
      { id: 3, title: "Тригонометрия формулалары", pages: 10 },
      { id: 4, title: "ҰБТ стратегиясы", pages: 15 },
      { id: 5, title: "Логарифм конспект", pages: 9 },
      { id: 6, title: "Нақты ҰБТ тесттері 2024", pages: 40 },
    ],
    homeworks: [
      { id: 1, title: "Теңдеулер — 1-тапсырма", deadline: "05.06.2025", done: false },
      { id: 2, title: "Геометрия — 1-тапсырма", deadline: "08.06.2025", done: true },
      { id: 3, title: "Тригонометрия — 1-тапсырма", deadline: "12.06.2025", done: false },
      { id: 4, title: "Логарифм — 1-тапсырма", deadline: "15.06.2025", done: false },
      { id: 5, title: "ҰБТ нақты тест", deadline: "20.06.2025", done: false },
    ],
  },
}

const testHistory = [
  { date: "01.06.2025", topic: "Алгебра", score: 18, total: 20, time: "24 мин" },
  { date: "28.05.2025", topic: "Геометрия", score: 14, total: 20, time: "31 мин" },
  { date: "25.05.2025", topic: "Тригонометрия", score: 12, total: 20, time: "28 мин" },
  { date: "20.05.2025", topic: "Жалпы", score: 16, total: 20, time: "35 мин" },
]

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [hasPurchased, setHasPurchased] = useState(false)
  const [pkg, setPkg] = useState("basic")
  const [activeTab, setActiveTab] = useState("Негізгі")
  const [watchingVideo, setWatchingVideo] = useState<number | null>(null)
  const [completedVideos, setCompletedVideos] = useState<number[]>([])
  const [homeworks, setHomeworks] = useState<Record<number, boolean>>({})
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const purchased = localStorage.getItem("purchased")
    const savedPkg = localStorage.getItem("package") || "basic"
    const savedVideos = localStorage.getItem("completedVideos")
    const savedHW = localStorage.getItem("homeworks")
    if (!userData) { router.push("/login"); return }
    setUser(JSON.parse(userData))
    setHasPurchased(!!purchased)
    setPkg(savedPkg)
    if (savedVideos) setCompletedVideos(JSON.parse(savedVideos))
    if (savedHW) setHomeworks(JSON.parse(savedHW))
  }, [])

  function toggleVideo(id: number) {
    const updated = completedVideos.includes(id)
      ? completedVideos.filter(v => v !== id)
      : [...completedVideos, id]
    setCompletedVideos(updated)
    localStorage.setItem("completedVideos", JSON.stringify(updated))
  }

  function toggleHomework(id: number) {
    const updated = { ...homeworks, [id]: !homeworks[id] }
    setHomeworks(updated)
    localStorage.setItem("homeworks", JSON.stringify(updated))
  }

  if (!user) return null

  if (!hasPurchased) {
    return (
      <main style={{ minHeight: "100vh", background: "#f7f9fa", fontFamily: "Inter, sans-serif" }}>
        <nav style={{ background: "white", borderBottom: "1px solid #d1d7dc", padding: "0 1rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#5624d0", textDecoration: "none" }}>IQ Math</Link>
        </nav>
        <div style={{ maxWidth: "500px", margin: "4rem auto", padding: "0 1rem", textAlign: "center" }}>
          <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "2.5rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "0.5rem" }}>Курс сатып алыңыз</h2>
            <p style={{ color: "#6a6f73", marginBottom: "1.5rem", lineHeight: 1.6 }}>Дашбордқа кіру үшін алдымен курс сатып алуыңыз керек.</p>
            <Link href="/#courses" style={{ display: "inline-block", background: "#5624d0", color: "white", padding: "0.875rem 2rem", borderRadius: "4px", fontWeight: 700, textDecoration: "none" }}>
              Курстарды қарау →
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const mat = materials[pkg as keyof typeof materials]
  const totalVideos = mat.videos.length
  const doneVideos = mat.videos.filter(v => completedVideos.includes(v.id)).length
  const progress = Math.round((doneVideos / totalVideos) * 100)
  const topics = [...new Set(mat.videos.map(v => v.topic))]
  const avgScore = Math.round(testHistory.reduce((a, t) => a + (t.score / t.total * 100), 0) / testHistory.length)
  const doneHW = mat.homeworks.filter(h => homeworks[h.id] || h.done).length

  return (
    <main style={{ minHeight: "100vh", background: "#f7f9fa", fontFamily: "Inter, sans-serif", paddingBottom: "80px" }}>

      {/* NAVBAR */}
      <nav style={{ background: "white", borderBottom: "1px solid #d1d7dc", padding: "0 1rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#5624d0", textDecoration: "none" }}>IQ Math</Link>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <span style={{ background: packageColors[pkg], color: "white", fontSize: "0.65rem", fontWeight: 700, padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
            {packageNames[pkg]}
          </span>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#5624d0", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.75rem" }}>
            {user.name[0].toUpperCase()}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "1.25rem 1rem" }}>

        {/* TABS */}
        <div style={{ display: "flex", gap: "0.375rem", overflowX: "auto", marginBottom: "1rem", paddingBottom: "0.25rem" }}>
          {["Негізгі", "Сабақтар", "PDF", "Үй тапсырмасы", "Тест", "Жетістіктер"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "0.5rem 0.875rem", borderRadius: "4px", background: activeTab === tab ? "#5624d0" : "white", color: activeTab === tab ? "white" : "#1c1d1f", fontWeight: activeTab === tab ? 700 : 400, fontSize: "0.8rem", cursor: "pointer", whiteSpace: "nowrap", border: "1px solid #d1d7dc" }}>
              {tab}
            </button>
          ))}
        </div>

        {/* НЕГІЗГІ */}
        {activeTab === "Негізгі" && (
          <div>
            {/* ПРОГРЕСС */}
            <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <div>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#1c1d1f" }}>Сәлем, {user.name}! 👋</div>
                  <div style={{ fontSize: "0.75rem", color: "#6a6f73" }}>{doneVideos}/{totalVideos} сабақ аяқталды</div>
                </div>
                <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#5624d0" }}>{progress}%</span>
              </div>
              <div style={{ height: "8px", background: "#f7f9fa", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: progress + "%", background: "linear-gradient(90deg, #5624d0, #a435f0)", borderRadius: "4px", transition: "width 0.5s" }}></div>
              </div>
            </div>

            {/* STATS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1rem" }}>
              {[
                { icon: "🎬", label: "Сабақ", value: doneVideos },
                { icon: "📝", label: "Тест орт.", value: avgScore + "%" },
                { icon: "📋", label: "Үй тапс.", value: doneHW + "/" + mat.homeworks.length },
              ].map((s) => (
                <div key={s.label} style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "0.875rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>{s.icon}</div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#5624d0" }}>{s.value}</div>
                  <div style={{ fontSize: "0.7rem", color: "#6a6f73" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* ТАҚЫРЫП ПРОГРЕСС */}
            <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Тақырып бойынша прогресс</h2>
              {topics.map((topic) => {
                const topicVideos = mat.videos.filter(v => v.topic === topic)
                const topicDone = topicVideos.filter(v => completedVideos.includes(v.id)).length
                const topicProgress = Math.round((topicDone / topicVideos.length) * 100)
                return (
                  <div key={topic} style={{ marginBottom: "0.875rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "0.375rem" }}>
                      <span style={{ fontWeight: 600, color: "#1c1d1f" }}>{topic}</span>
                      <span style={{ color: topicProgress >= 70 ? "#16a34a" : topicProgress >= 40 ? "#d97706" : "#5624d0", fontWeight: 700 }}>{topicProgress}%</span>
                    </div>
                    <div style={{ height: "6px", background: "#f7f9fa", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: topicProgress + "%", background: topicProgress >= 70 ? "#16a34a" : topicProgress >= 40 ? "#d97706" : "#5624d0", borderRadius: "3px" }}></div>
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "#6a6f73", marginTop: "0.2rem" }}>{topicDone}/{topicVideos.length} сабақ</div>
                  </div>
                )
              })}
            </div>

            {/* СОҢҒЫ ТЕСТ */}
            <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1c1d1f" }}>Соңғы тест нәтижелері</h2>
                <Link href="/tests" style={{ fontSize: "0.78rem", color: "#5624d0", fontWeight: 600, textDecoration: "none" }}>Тест тапсыру →</Link>
              </div>
              {testHistory.slice(0, 3).map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.625rem 0", borderBottom: "1px solid #f7f9fa" }}>
                  <div>
                    <div style={{ fontSize: "0.825rem", fontWeight: 600, color: "#1c1d1f" }}>{t.topic}</div>
                    <div style={{ fontSize: "0.7rem", color: "#6a6f73" }}>{t.date} · {t.time}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: t.score / t.total >= 0.8 ? "#16a34a" : t.score / t.total >= 0.6 ? "#d97706" : "#dc2626" }}>
                      {t.score}/{t.total}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "#6a6f73" }}>{Math.round(t.score / t.total * 100)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* САБАҚТАР */}
        {activeTab === "Сабақтар" && (
          <div>
            {watchingVideo !== null && (
              <div style={{ background: "black", borderRadius: "8px", overflow: "hidden", marginBottom: "1rem", position: "relative", paddingTop: "56.25%" }}>
                <iframe
                  src={"https://www.youtube.com/embed/" + mat.videos.find(v => v.id === watchingVideo)?.youtube + "?autoplay=1"}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  allowFullScreen
                  allow="autoplay"
                />
                <button onClick={() => setWatchingVideo(null)} style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(0,0,0,0.7)", color: "white", border: "none", borderRadius: "4px", padding: "0.375rem 0.75rem", cursor: "pointer", fontSize: "0.8rem" }}>
                  ✕ Жабу
                </button>
              </div>
            )}
            {topics.map((topic) => (
              <div key={topic} style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#5624d0", marginBottom: "0.625rem", textTransform: "uppercase", letterSpacing: "1px" }}>{topic}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {mat.videos.filter(v => v.topic === topic).map((video) => {
                    const done = completedVideos.includes(video.id)
                    return (
                      <div key={video.id} style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "0.875rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <button onClick={() => toggleVideo(video.id)} style={{ width: "22px", height: "22px", borderRadius: "4px", border: done ? "none" : "2px solid #d1d7dc", background: done ? "#16a34a" : "white", color: "white", fontSize: "0.75rem", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {done ? "✓" : ""}
                        </button>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.875rem", fontWeight: 600, color: done ? "#6a6f73" : "#1c1d1f", textDecoration: done ? "line-through" : "none" }}>{video.title}</div>
                          <div style={{ fontSize: "0.72rem", color: "#6a6f73" }}>⏱ {video.duration}</div>
                        </div>
                        <button onClick={() => setWatchingVideo(video.id)} style={{ background: "#5624d0", color: "white", border: "none", padding: "0.4rem 0.875rem", borderRadius: "4px", fontSize: "0.775rem", fontWeight: 600, cursor: "pointer" }}>
                          ▶ Қарау
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PDF */}
        {activeTab === "PDF" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {mat.pdfs.map((pdf) => (
              <div key={pdf.id} style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "40px", height: "40px", background: "#fee2e2", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem" }}>📄</div>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1c1d1f" }}>{pdf.title}</div>
                    <div style={{ fontSize: "0.72rem", color: "#6a6f73" }}>{pdf.pages} бет</div>
                  </div>
                </div>
                <button style={{ background: "#5624d0", color: "white", border: "none", padding: "0.4rem 0.875rem", borderRadius: "4px", fontSize: "0.775rem", fontWeight: 600, cursor: "pointer" }}>
                  Жүктеу
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ҮЙ ТАПСЫРМАСЫ */}
        {activeTab === "Үй тапсырмасы" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {mat.homeworks.map((hw) => {
              const done = homeworks[hw.id] || hw.done
              return (
                <div key={hw.id} style={{ background: done ? "#f0fdf4" : "white", border: "1px solid " + (done ? "#bbf7d0" : "#d1d7dc"), borderRadius: "8px", padding: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <button onClick={() => toggleHomework(hw.id)} style={{ width: "24px", height: "24px", borderRadius: "50%", border: done ? "none" : "2px solid #d1d7dc", background: done ? "#16a34a" : "white", color: "white", fontSize: "0.75rem", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {done ? "✓" : ""}
                  </button>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: done ? "#6a6f73" : "#1c1d1f", textDecoration: done ? "line-through" : "none" }}>{hw.title}</div>
                    <div style={{ fontSize: "0.72rem", color: "#6a6f73" }}>Мерзімі: {hw.deadline}</div>
                  </div>
                  {!done && (
                    <a href={"https://wa.me/77075687067?text=Salam! " + hw.title + " tapsynrdym."} target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "white", border: "none", padding: "0.4rem 0.875rem", borderRadius: "4px", fontSize: "0.775rem", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
                      Тапсыру
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* ТЕСТ */}
        {activeTab === "Тест" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1rem" }}>
              {[
                { label: "Тапсырылған", value: testHistory.length, icon: "📝" },
                { label: "Орт. балл", value: avgScore + "%", icon: "📊" },
                { label: "Үздік", value: Math.max(...testHistory.map(t => Math.round(t.score / t.total * 100))) + "%", icon: "🏆" },
              ].map((s) => (
                <div key={s.label} style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "0.875rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>{s.icon}</div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#5624d0" }}>{s.value}</div>
                  <div style={{ fontSize: "0.7rem", color: "#6a6f73" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Тест тарихы</h2>
              {testHistory.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid #f7f9fa" }}>
                  <div>
                    <div style={{ fontSize: "0.825rem", fontWeight: 600, color: "#1c1d1f" }}>{t.topic}</div>
                    <div style={{ fontSize: "0.7rem", color: "#6a6f73" }}>{t.date} · {t.time}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.9rem", fontWeight: 800, color: t.score / t.total >= 0.8 ? "#16a34a" : t.score / t.total >= 0.6 ? "#d97706" : "#dc2626" }}>{t.score}/{t.total}</div>
                      <div style={{ fontSize: "0.7rem", color: "#6a6f73" }}>{Math.round(t.score / t.total * 100)}%</div>
                    </div>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: t.score / t.total >= 0.8 ? "#dcfce7" : "#fef9c3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem" }}>
                      {t.score / t.total >= 0.8 ? "🏆" : "👍"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/tests" style={{ display: "block", background: "#5624d0", color: "white", padding: "0.875rem", borderRadius: "4px", fontWeight: 700, textAlign: "center", textDecoration: "none" }}>
              Жаңа тест тапсыру →
            </Link>
          </div>
        )}

        {/* ЖЕТІСТІКТЕР */}
        {activeTab === "Жетістіктер" && (
          <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Жетістіктер</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem" }}>
              {[
                { icon: "🔥", title: "Бірінші сабақ", desc: "Алғашқы сабақты аяқтадыңыз", done: doneVideos >= 1 },
                { icon: "📝", title: "Тест чемпионы", desc: "90%+ нәтиже алдыңыз", done: avgScore >= 90 },
                { icon: "⚡", title: "Белсенді оқушы", desc: "10+ сабақ аяқтадыңыз", done: doneVideos >= 10 },
                { icon: "🏆", title: "Үздік оқушы", desc: "Барлық сабақты аяқтадыңыз", done: doneVideos === totalVideos },
                { icon: "📚", title: "Кітапханашы", desc: "5+ сабақ аяқтадыңыз", done: doneVideos >= 5 },
                { icon: "🎯", title: "Мерген", desc: "Үй тапсырмасын тапсырдыңыз", done: doneHW >= 1 },
              ].map((a, i) => (
                <div key={i} style={{ background: a.done ? "#f0fdf4" : "#fafafa", border: "1px solid " + (a.done ? "#bbf7d0" : "#e5e7eb"), borderRadius: "8px", padding: "0.875rem", textAlign: "center", opacity: a.done ? 1 : 0.5 }}>
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.375rem" }}>{a.icon}</div>
                  <div style={{ fontSize: "0.775rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "0.2rem" }}>{a.title}</div>
                  <div style={{ fontSize: "0.68rem", color: "#6a6f73" }}>{a.desc}</div>
                  {a.done && <div style={{ fontSize: "0.65rem", color: "#16a34a", fontWeight: 600, marginTop: "0.25rem" }}>✓ Алынды</div>}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: "1px solid #d1d7dc", display: "flex", justifyContent: "space-around", padding: "0.5rem 0", zIndex: 50 }}>
        {[
          { icon: "🏠", label: "Басты", href: "/" },
          { icon: "📚", label: "Сабақтар", href: "/dashboard" },
          { icon: "📝", label: "Тест", href: "/tests" },
          { icon: "👤", label: "Профиль", href: "/dashboard" },
        ].map((item) => (
          <Link key={item.label} href={item.href} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem", textDecoration: "none", color: "#6a6f73", fontSize: "0.6rem" }}>
            <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

    </main>
  )
} 