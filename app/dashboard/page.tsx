"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [hasPurchased, setHasPurchased] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const purchased = localStorage.getItem("purchased")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
    setHasPurchased(!!purchased)
  }, [])

  if (!user) return null

  if (!hasPurchased) {
    return (
      <main style={{ minHeight: "100vh", background: "#f7f9fa", fontFamily: "Inter, sans-serif" }}>
        <nav style={{ background: "white", borderBottom: "1px solid #d1d7dc", padding: "0 1rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#5624d0", textDecoration: "none" }}>IQ Math</Link>
        </nav>
        <div style={{ maxWidth: "500px", margin: "4rem auto", padding: "0 1rem", textAlign: "center" }}>
          <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "2.5rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "0.5rem" }}>Курс сатып алыңыз</h2>
            <p style={{ color: "#6a6f73", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              Дашбордқа кіру үшін алдымен курс сатып алуыңыз керек.
            </p>
            <Link href="/#courses" style={{ display: "inline-block", background: "#5624d0", color: "white", padding: "0.875rem 2rem", borderRadius: "4px", fontWeight: 700, textDecoration: "none", fontSize: "1rem" }}>
              Курстарды қарау →
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f7f9fa", fontFamily: "Inter, sans-serif" }}>
      <nav style={{ background: "white", borderBottom: "1px solid #d1d7dc", padding: "0 1rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#5624d0", textDecoration: "none" }}>IQ Math</Link>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.8rem", color: "#6a6f73" }}>{user.name}</span>
          <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#5624d0", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.8rem" }}>
            {user.name?.[0]?.toUpperCase()}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "1.5rem 1rem" }}>

        <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", marginBottom: "1.5rem", paddingBottom: "0.5rem" }}>
          {[
            { icon: "📊", label: "Дашборд", href: "/dashboard" },
            { icon: "📝", label: "Тесттер", href: "/tests" },
          ].map((item) => (
            <Link key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.5rem 0.875rem", textDecoration: "none", background: "#5624d0", color: "white", fontWeight: 700, fontSize: "0.8rem", borderRadius: "4px", whiteSpace: "nowrap", flexShrink: 0 }}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1.25rem" }}>
          {[
            { icon: "🎬", label: "Сабақ", value: "47" },
            { icon: "📝", label: "Тест", value: "23" },
            { icon: "🏆", label: "Рейтинг", value: "#12" },
          ].map((s) => (
            <div key={s.label} style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1rem 0.75rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>{s.icon}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#5624d0" }}>{s.value}</div>
              <div style={{ fontSize: "0.75rem", color: "#6a6f73" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem", marginBottom: "1.25rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Прогресс</h2>
          {[
            { label: "Жалпы прогресс", value: 72, color: "#5624d0" },
            { label: "Алгебра", value: 85, color: "#a435f0" },
            { label: "Геометрия", value: 60, color: "#5624d0" },
            { label: "Тригонометрия", value: 45, color: "#a435f0" },
          ].map((p) => (
            <div key={p.label} style={{ marginBottom: "0.875rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "0.375rem" }}>
                <span style={{ color: "#1c1d1f", fontWeight: 500 }}>{p.label}</span>
                <span style={{ color: "#5624d0", fontWeight: 700 }}>{p.value}%</span>
              </div>
              <div style={{ height: "8px", background: "#f7f9fa", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: p.value + "%", background: p.color, borderRadius: "4px" }}></div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Соңғы сабақтар</h2>
          {[
            { title: "Квадрат теңдеулер", time: "Бүгін, 14:00", done: true },
            { title: "Тригонометриялық функциялар", time: "Кеше, 16:30", done: true },
            { title: "Логарифм негіздері", time: "Ертең, 10:00", done: false },
          ].map((l) => (
            <div key={l.title} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid #f7f9fa" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "4px", background: l.done ? "#dcfce7" : "#f0e6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", flexShrink: 0 }}>
                  {l.done ? "✓" : "▶"}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.825rem", color: "#1c1d1f" }}>{l.title}</div>
                  <div style={{ fontSize: "0.7rem", color: "#6a6f73" }}>{l.time}</div>
                </div>
              </div>
              <button style={{ background: "none", border: "1px solid #5624d0", color: "#5624d0", padding: "0.3rem 0.625rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 600, cursor: "pointer" }}>
                {l.done ? "Қарау" : "Бастау"}
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
} 