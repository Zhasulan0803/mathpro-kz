"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type User = { name: string; email: string }

const topics = [
  { id: 1, name: "Теңдеулер", category: "Алгебра", lessons: 8, completed: 6 },
  { id: 2, name: "Функциялар", category: "Алгебра", lessons: 10, completed: 8 },
  { id: 3, name: "Логарифм", category: "Алгебра", lessons: 6, completed: 3 },
  { id: 4, name: "Тригонометрия", category: "Тригонометрия", lessons: 12, completed: 5 },
  { id: 5, name: "Үшбұрыш", category: "Геометрия", lessons: 8, completed: 7 },
  { id: 6, name: "Дөңгелек", category: "Геометрия", lessons: 6, completed: 2 },
  { id: 7, name: "Вектор", category: "Геометрия", lessons: 5, completed: 0 },
  { id: 8, name: "Ықтималдық", category: "Статистика", lessons: 7, completed: 4 },
]

const testHistory = [
  { date: "01.06.2025", topic: "Алгебра", score: 18, total: 20, time: "24 мин" },
  { date: "28.05.2025", topic: "Геометрия", score: 14, total: 20, time: "31 мин" },
  { date: "25.05.2025", topic: "Тригонометрия", score: 12, total: 20, time: "28 мин" },
  { date: "20.05.2025", topic: "Жалпы", score: 16, total: 20, time: "35 мин" },
]

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [hasPurchased, setHasPurchased] = useState(false)
  const [activeTab, setActiveTab] = useState("Негізгі")
  const [completedTopics, setCompletedTopics] = useState<number[]>([])
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const purchased = localStorage.getItem("purchased")
    const saved = localStorage.getItem("completedTopics")
    if (!userData) { router.push("/login"); return }
    setUser(JSON.parse(userData))
    setHasPurchased(!!purchased)
    if (saved) setCompletedTopics(JSON.parse(saved))
  }, [])

  function toggleTopic(id: number) {
    const updated = completedTopics.includes(id)
      ? completedTopics.filter(t => t !== id)
      : [...completedTopics, id]
    setCompletedTopics(updated)
    localStorage.setItem("completedTopics", JSON.stringify(updated))
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

  const totalLessons = topics.reduce((a, t) => a + t.lessons, 0)
  const completedLessons = topics.reduce((a, t) => a + t.completed, 0)
  const totalProgress = Math.round((completedLessons / totalLessons) * 100)

  const categories = [...new Set(topics.map(t => t.category))]
  const categoryProgress = categories.map(cat => {
    const catTopics = topics.filter(t => t.category === cat)
    const total = catTopics.reduce((a, t) => a + t.lessons, 0)
    const completed = catTopics.reduce((a, t) => a + t.completed, 0)
    return { name: cat, progress: Math.round((completed / total) * 100), completed, total }
  })

  const avgScore = Math.round(testHistory.reduce((a, t) => a + (t.score / t.total * 100), 0) / testHistory.length)

  return (
    <main style={{ minHeight: "100vh", background: "#f7f9fa", fontFamily: "Inter, sans-serif" }}>

      {/* NAVBAR */}
      <nav style={{ background: "white", borderBottom: "1px solid #d1d7dc", padding: "0 1rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#5624d0", textDecoration: "none" }}>IQ Math</Link>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.8rem", color: "#6a6f73" }}>Сәлем, {user.name}!</span>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#5624d0", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.75rem" }}>
            {user.name[0].toUpperCase()}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "1.25rem 1rem" }}>

        {/* TABS */}
        <div style={{ display: "flex", gap: "0.375rem", overflowX: "auto", marginBottom: "1.25rem", paddingBottom: "0.25rem" }}>
          {["Негізгі", "Прогресс", "Тесттер", "Жетістіктер"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "0.5rem 1rem", borderRadius: "4px", background: activeTab === tab ? "#5624d0" : "white", color: activeTab === tab ? "white" : "#1c1d1f", fontWeight: activeTab === tab ? 700 : 400, fontSize: "0.8rem", cursor: "pointer", whiteSpace: "nowrap", border: activeTab === tab ? "1px solid #5624d0" : "1px solid #d1d7dc" }}>
              {tab}
            </button>
          ))}
        </div>

        {/* НЕГІЗГІ */}
        {activeTab === "Негізгі" && (
          <div>
            {/* ЖАЛПЫ ПРОГРЕСС */}
            <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1c1d1f" }}>Жалпы прогресс</h2>
                <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#5624d0" }}>{totalProgress}%</span>
              </div>
              <div style={{ height: "10px", background: "#f7f9fa", borderRadius: "5px", overflow: "hidden", marginBottom: "0.75rem" }}>
                <div style={{ height: "100%", width: totalProgress + "%", background: "linear-gradient(90deg, #5624d0, #a435f0)", borderRadius: "5px", transition: "width 0.5s" }}></div>
              </div>
              <div style={{ fontSize: "0.78rem", color: "#6a6f73" }}>{completedLessons} / {totalLessons} сабақ аяқталды</div>
            </div>

            {/* STATS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1rem" }}>
              {[
                { icon: "🎬", label: "Сабақ", value: completedLessons },
                { icon: "📝", label: "Тест орт. балл", value: avgScore + "%" },
                { icon: "🏆", label: "Рейтинг", value: "#12" },
              ].map((s) => (
                <div key={s.label} style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "0.875rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>{s.icon}</div>
                  <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#5624d0" }}>{s.value}</div>
                  <div style={{ fontSize: "0.7rem", color: "#6a6f73" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* КАТЕГОРИЯ ПРОГРЕСС */}
            <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Тақырып бойынша прогресс</h2>
              {categoryProgress.map((cat) => (
                <div key={cat.name} style={{ marginBottom: "0.875rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "0.375rem" }}>
                    <span style={{ fontWeight: 600, color: "#1c1d1f" }}>{cat.name}</span>
                    <span style={{ color: cat.progress >= 70 ? "#16a34a" : cat.progress >= 40 ? "#d97706" : "#dc2626", fontWeight: 700 }}>{cat.progress}%</span>
                  </div>
                  <div style={{ height: "7px", background: "#f7f9fa", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: cat.progress + "%", background: cat.progress >= 70 ? "#16a34a" : cat.progress >= 40 ? "#d97706" : "#dc2626", borderRadius: "4px" }}></div>
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#6a6f73", marginTop: "0.2rem" }}>{cat.completed}/{cat.total} сабақ</div>
                </div>
              ))}
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

        {/* ПРОГРЕСС */}
        {activeTab === "Прогресс" && (
          <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Тақырыптар бойынша прогресс</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {topics.map((topic) => {
                const progress = Math.round((topic.completed / topic.lessons) * 100)
                const isDone = completedTopics.includes(topic.id)
                return (
                  <div key={topic.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem", border: "1px solid #f7f9fa", borderRadius: "8px", background: isDone ? "#f0fdf4" : "#fafafa" }}>
                    <button onClick={() => toggleTopic(topic.id)} style={{ width: "22px", height: "22px", borderRadius: "4px", border: isDone ? "none" : "2px solid #d1d7dc", background: isDone ? "#16a34a" : "white", color: "white", fontSize: "0.75rem", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {isDone ? "✓" : ""}
                    </button>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                        <div>
                          <span style={{ fontSize: "0.825rem", fontWeight: 600, color: "#1c1d1f" }}>{topic.name}</span>
                          <span style={{ fontSize: "0.7rem", color: "#6a6f73", marginLeft: "0.5rem" }}>{topic.category}</span>
                        </div>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: progress >= 70 ? "#16a34a" : progress >= 40 ? "#d97706" : "#5624d0" }}>{progress}%</span>
                      </div>
                      <div style={{ height: "5px", background: "#e5e7eb", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: progress + "%", background: progress >= 70 ? "#16a34a" : progress >= 40 ? "#d97706" : "#5624d0", borderRadius: "3px" }}></div>
                      </div>
                      <div style={{ fontSize: "0.68rem", color: "#6a6f73", marginTop: "0.2rem" }}>{topic.completed}/{topic.lessons} сабақ</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ТЕСТТЕР */}
        {activeTab === "Тесттер" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1rem" }}>
              {[
                { label: "Тапсырылған", value: testHistory.length, icon: "📝" },
                { label: "Орт. балл", value: avgScore + "%", icon: "📊" },
                { label: "Үздік нәтиже", value: Math.max(...testHistory.map(t => Math.round(t.score / t.total * 100))) + "%", icon: "🏆" },
              ].map((s) => (
                <div key={s.label} style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "0.875rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>{s.icon}</div>
                  <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#5624d0" }}>{s.value}</div>
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
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.9rem", fontWeight: 800, color: t.score / t.total >= 0.8 ? "#16a34a" : t.score / t.total >= 0.6 ? "#d97706" : "#dc2626" }}>{t.score}/{t.total}</div>
                      <div style={{ fontSize: "0.7rem", color: "#6a6f73" }}>{Math.round(t.score / t.total * 100)}%</div>
                    </div>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: t.score / t.total >= 0.8 ? "#dcfce7" : t.score / t.total >= 0.6 ? "#fef9c3" : "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>
                      {t.score / t.total >= 0.8 ? "🏆" : t.score / t.total >= 0.6 ? "👍" : "📚"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/tests" style={{ display: "block", background: "#5624d0", color: "white", padding: "0.875rem", borderRadius: "4px", fontWeight: 700, textAlign: "center", textDecoration: "none", fontSize: "0.95rem" }}>
              Жаңа тест тапсыру →
            </Link>
          </div>
        )}

        {/* ЖЕТІСТІКТЕР */}
        {activeTab === "Жетістіктер" && (
          <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Жетістіктер</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.75rem" }}>
              {[
                { icon: "🔥", title: "Бірінші сабақ", desc: "Алғашқы сабақты аяқтадыңыз", done: true },
                { icon: "📝", title: "Тест чемпионы", desc: "90%+ нәтиже алдыңыз", done: avgScore >= 90 },
                { icon: "⚡", title: "5 күн қатарынан", desc: "5 күн қатарынан оқыдыңыз", done: false },
                { icon: "🏆", title: "Үздік оқушы", desc: "Рейтингте TOP 10-ға кірдіңіз", done: true },
                { icon: "📚", title: "Кітапханашы", desc: "50+ сабақ аяқтадыңыз", done: completedLessons >= 50 },
                { icon: "🎯", title: "Мерген", desc: "Тестте 100% алдыңыз", done: false },
              ].map((a, i) => (
                <div key={i} style={{ background: a.done ? "#f0fdf4" : "#fafafa", border: "1px solid " + (a.done ? "#bbf7d0" : "#e5e7eb"), borderRadius: "8px", padding: "1rem", textAlign: "center", opacity: a.done ? 1 : 0.5 }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{a.icon}</div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "0.25rem" }}>{a.title}</div>
                  <div style={{ fontSize: "0.7rem", color: "#6a6f73" }}>{a.desc}</div>
                  {a.done && <div style={{ fontSize: "0.65rem", color: "#16a34a", fontWeight: 600, marginTop: "0.375rem" }}>✓ Алынды</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ height: "60px" }}></div>

        {/* BOTTOM NAV */}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: "1px solid #d1d7dc", display: "flex", justifyContent: "space-around", padding: "0.5rem 0", zIndex: 50 }}>
          {[
            { icon: "🏠", label: "Басты", href: "/" },
            { icon: "📊", label: "Прогресс", href: "/dashboard" },
            { icon: "📝", label: "Тест", href: "/tests" },
            { icon: "👤", label: "Профиль", href: "/dashboard" },
          ].map((item) => (
            <Link key={item.label} href={item.href} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem", textDecoration: "none", color: "#6a6f73", fontSize: "0.6rem" }}>
              <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
} 