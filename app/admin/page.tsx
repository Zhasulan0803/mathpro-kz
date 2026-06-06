"use client"
import { useState } from "react"

const ADMIN_PASSWORD = "iqmath2025"

const stats = [
  { label: "Барлық оқушы", value: "1,248", icon: "👨‍🎓", color: "#5624d0" },
  { label: "Белсенді курс", value: "3", icon: "📚", color: "#a435f0" },
  { label: "Бүгінгі төлем", value: "340 000 ₸", icon: "💰", color: "#16a34a" },
  { label: "Жаңа оқушы", value: "+24", icon: "📈", color: "#d97706" },
]

const users = [
  { name: "Аяша Нұрланова", email: "ayasha@mail.ru", course: "ҰБТ Толық", status: "Белсенді", date: "01.06.2025" },
  { name: "Дәурен Қалиев", email: "dauren@mail.ru", course: "Базалық", status: "Белсенді", date: "28.05.2025" },
  { name: "Жанар Ерланқызы", email: "zhanar@mail.ru", course: "Интенсив", status: "Белсенді", date: "25.05.2025" },
  { name: "Арман Бекұлы", email: "arman@mail.ru", course: "ҰБТ Толық", status: "Тоқтатылды", date: "20.05.2025" },
]

const tabs = ["Дашборд", "Оқушылар", "Курстар", "Төлемдер"]

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuth, setIsAuth] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("Дашборд")

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      setIsAuth(true)
      setError("")
    } else {
      setError("Пароль қате!")
    }
  }

  if (!isAuth) {
    return (
      <main style={{ minHeight: "100vh", background: "#f7f9fa", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
        <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "2.5rem", width: "100%", maxWidth: "400px" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔐</div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1c1d1f" }}>Админ панелі</h1>
            <p style={{ color: "#6a6f73", fontSize: "0.875rem" }}>IQ Math басқару жүйесі</p>
          </div>

          {error && (
            <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: "4px", padding: "0.75rem", color: "#dc2626", fontSize: "0.875rem", marginBottom: "1rem", textAlign: "center" }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1c1d1f", display: "block", marginBottom: "0.375rem" }}>Пароль</label>
            <input
              type="password"
              placeholder="Админ паролін енгізіңіз"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid #d1d7dc", borderRadius: "4px", fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <button
            onClick={handleLogin}
            style={{ width: "100%", background: "#5624d0", color: "white", padding: "0.875rem", borderRadius: "4px", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "1rem" }}
          >
            Кіру →
          </button>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f7f9fa", fontFamily: "Inter, sans-serif", display: "flex" }}>

      {/* SIDEBAR */}
      <aside style={{ width: "220px", background: "white", borderRight: "1px solid #d1d7dc", padding: "1.5rem 0", flexShrink: 0 }}>
        <div style={{ padding: "0 1rem", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#5624d0" }}>IQ Math</div>
          <div style={{ fontSize: "0.75rem", color: "#dc2626", fontWeight: 600, background: "#fee2e2", padding: "0.2rem 0.5rem", borderRadius: "4px", display: "inline-block", marginTop: "0.25rem" }}>Админ панелі</div>
        </div>
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", width: "100%", textAlign: "left", background: activeTab === tab ? "#f7f9fa" : "transparent", borderLeft: activeTab === tab ? "3px solid #5624d0" : "3px solid transparent", color: activeTab === tab ? "#5624d0" : "#1c1d1f", fontWeight: activeTab === tab ? 700 : 400, fontSize: "0.875rem", border: "none", cursor: "pointer" }}>
            {tab === "Дашборд" && "📊"}
            {tab === "Оқушылар" && "👨‍🎓"}
            {tab === "Курстар" && "📚"}
            {tab === "Төлемдер" && "💳"}
            {tab}
          </button>
        ))}
        <button onClick={() => setIsAuth(false)} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", width: "100%", textAlign: "left", background: "transparent", color: "#dc2626", fontWeight: 500, fontSize: "0.875rem", border: "none", cursor: "pointer", marginTop: "1rem" }}>
          🚪 Шығу
        </button>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, padding: "2rem", overflow: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1c1d1f" }}>{activeTab}</h1>
        </div>

        {activeTab === "Дашборд" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
              {stats.map((s) => (
                <div key={s.label} style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{s.icon}</div>
                  <div style={{ fontSize: "1.75rem", fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: "0.8rem", color: "#6a6f73" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.5rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Соңғы төлемдер</h2>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #d1d7dc" }}>
                    <th style={{ textAlign: "left", padding: "0.625rem", color: "#6a6f73", fontWeight: 600 }}>Оқушы</th>
                    <th style={{ textAlign: "left", padding: "0.625rem", color: "#6a6f73", fontWeight: 600 }}>Курс</th>
                    <th style={{ textAlign: "left", padding: "0.625rem", color: "#6a6f73", fontWeight: 600 }}>Сома</th>
                    <th style={{ textAlign: "left", padding: "0.625rem", color: "#6a6f73", fontWeight: 600 }}>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Аяша Н.", course: "ҰБТ Толық", amount: "40 000 ₸", status: "Төленді" },
                    { name: "Дәурен Қ.", course: "Базалық", amount: "25 000 ₸", status: "Төленді" },
                    { name: "Жанар Е.", course: "Интенсив", amount: "75 000 ₸", status: "Төленді" },
                  ].map((p, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f7f9fa" }}>
                      <td style={{ padding: "0.75rem 0.625rem", color: "#1c1d1f" }}>{p.name}</td>
                      <td style={{ padding: "0.75rem 0.625rem", color: "#6a6f73" }}>{p.course}</td>
                      <td style={{ padding: "0.75rem 0.625rem", color: "#16a34a", fontWeight: 700 }}>{p.amount}</td>
                      <td style={{ padding: "0.75rem 0.625rem" }}>
                        <span style={{ background: "#dcfce7", color: "#166534", fontSize: "0.75rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: "4px" }}>{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "Оқушылар" && (
          <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.5rem" }}>
            <div style={{ marginBottom: "1rem" }}>
              <input type="text" placeholder="🔍 Оқушы іздеу..." style={{ padding: "0.625rem 1rem", border: "1px solid #d1d7dc", borderRadius: "4px", fontSize: "0.875rem", outline: "none", width: "100%", boxSizing: "border-box" }} />
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #d1d7dc" }}>
                  <th style={{ textAlign: "left", padding: "0.625rem", color: "#6a6f73", fontWeight: 600 }}>Аты-жөні</th>
                  <th style={{ textAlign: "left", padding: "0.625rem", color: "#6a6f73", fontWeight: 600 }}>Email</th>
                  <th style={{ textAlign: "left", padding: "0.625rem", color: "#6a6f73", fontWeight: 600 }}>Курс</th>
                  <th style={{ textAlign: "left", padding: "0.625rem", color: "#6a6f73", fontWeight: 600 }}>Статус</th>
                  <th style={{ textAlign: "left", padding: "0.625rem", color: "#6a6f73", fontWeight: 600 }}>Күні</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f7f9fa" }}>
                    <td style={{ padding: "0.75rem 0.625rem", fontWeight: 600, color: "#1c1d1f" }}>{u.name}</td>
                    <td style={{ padding: "0.75rem 0.625rem", color: "#6a6f73" }}>{u.email}</td>
                    <td style={{ padding: "0.75rem 0.625rem", color: "#5624d0" }}>{u.course}</td>
                    <td style={{ padding: "0.75rem 0.625rem" }}>
                      <span style={{ background: u.status === "Белсенді" ? "#dcfce7" : "#fee2e2", color: u.status === "Белсенді" ? "#166534" : "#dc2626", fontSize: "0.75rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: "4px" }}>{u.status}</span>
                    </td>
                    <td style={{ padding: "0.75rem 0.625rem", color: "#6a6f73" }}>{u.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "Курстар" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
            {[
              { title: "Математика негіздері", students: 342, price: "25 000 ₸" },
              { title: "ҰБТ Толық дайындық", students: 687, price: "40 000 ₸" },
              { title: "ҰБТ Экспресс", students: 219, price: "75 000 ₸" },
            ].map((c, i) => (
              <div key={i} style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.5rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>📚</div>
                <h3 style={{ fontWeight: 700, color: "#1c1d1f", marginBottom: "0.375rem" }}>{c.title}</h3>
                <div style={{ color: "#6a6f73", fontSize: "0.875rem", marginBottom: "0.75rem" }}>{c.students} оқушы</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#5624d0", marginBottom: "1rem" }}>{c.price}</div>
                <button style={{ background: "#5624d0", color: "white", padding: "0.5rem 1rem", borderRadius: "4px", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: "pointer", width: "100%" }}>Өңдеу</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Төлемдер" && (
          <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "3rem", textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚧</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#6a6f73" }}>Жақында қосылады</div>
          </div>
        )}
      </div>
    </main>
  )
} 