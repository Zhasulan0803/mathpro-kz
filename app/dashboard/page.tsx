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

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [hasPurchased, setHasPurchased] = useState(false)
  const [pkg, setPkg] = useState("basic")
  const [activeTab, setActiveTab] = useState("Сабақтар")
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

        {/* ПРОГРЕСС */}
        <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.1rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.625rem" }}>
            <div>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1c1d1f" }}>Сәлем, {user.name}! 👋</span>
              <div style={{ fontSize: "0.75rem", color: "#6a6f73" }}>{doneVideos}/{totalVideos} сабақ аяқталды</div>
            </div>
            <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#5624d0" }}>{progress}%</span>
          </div>
          <div style={{ height: "8px", background: "#f7f9fa", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: progress + "%", background: "linear-gradient(90deg, #5624d0, #a435f0)", borderRadius: "4px", transition: "width 0.5s" }}></div>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: "0.375rem", overflowX: "auto", marginBottom: "1rem", paddingBottom: "0.25rem" }}>
          {["Сабақтар", "PDF", "Үй тапсырмасы", "Тест"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "0.5rem 0.875rem", borderRadius: "4px", background: activeTab === tab ? "#5624d0" : "white", color: activeTab === tab ? "white" : "#1c1d1f", fontWeight: activeTab === tab ? 700 : 400, fontSize: "0.8rem", cursor: "pointer", whiteSpace: "nowrap", border: "1px solid #d1d7dc" }}>
              {tab === "Сабақтар" && "🎬 "}
              {tab === "PDF" && "📄 "}
              {tab === "Үй тапсырмасы" && "📝 "}
              {tab === "Тест" && "✅ "}
              {tab}
            </button>
          ))}
        </div>

        {/* ВИДЕО САБАҚТАР */}
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
                <div style={{ fontSize: "0.825rem", fontWeight: 700, color: "#5624d0", marginBottom: "0.625rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                  {topic}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {mat.videos.filter(v => v.topic === topic).map((video) => {
                    const done = completedVideos.includes(video.id)
                    return (
                      <div key={video.id} style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "0.875rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <button onClick={() => toggleVideo(video.id)} style={{ width: "24px", height: "24px", borderRadius: "4px", border: done ? "none" : "2px solid #d1d7dc", background: done ? "#16a34a" : "white", color: "white", fontSize: "0.75rem", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {done ? "✓" : ""}
                        </button>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.875rem", fontWeight: 600, color: done ? "#6a6f73" : "#1c1d1f", textDecoration: done ? "line-through" : "none" }}>{video.title}</div>
                          <div style={{ fontSize: "0.72rem", color: "#6a6f73" }}>⏱ {video.duration}</div>
                        </div>
                        <button onClick={() => setWatchingVideo(video.id)} style={{ background: "#5624d0", color: "white", border: "none", padding: "0.4rem 0.875rem", borderRadius: "4px", fontSize: "0.775rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
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
          <div style={{ textAlign: "center", background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📝</div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "0.5rem" }}>ҰБТ форматындағы тест</h2>
            <p style={{ color: "#6a6f73", marginBottom: "1.5rem", fontSize: "0.875rem" }}>20 сұрақ · 40 минут · ҰБТ форматы</p>
            <Link href="/tests" style={{ display: "inline-block", background: "#5624d0", color: "white", padding: "0.875rem 2rem", borderRadius: "4px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>
              Тест бастау →
            </Link>
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