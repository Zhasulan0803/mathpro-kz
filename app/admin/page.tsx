"use client"
import { useState } from "react"
import Link from "next/link"

const ADMIN_PASSWORD = "iqmath2025"

type Student = {
  id: number
  name: string
  email: string
  phone: string
  course: string
  status: string
  date: string
  progress: number
  parentPhone: string
}

const students: Student[] = [
  { id: 1, name: "Аяша Нұрланова", email: "ayasha@mail.ru", phone: "+77011234567", course: "ҰБТ Толық", status: "Белсенді", date: "01.06.2025", progress: 72, parentPhone: "+77019876543" },
  { id: 2, name: "Дәурен Қалиев", email: "dauren@mail.ru", phone: "+77021234567", course: "Базалық", status: "Белсенді", date: "28.05.2025", progress: 45, parentPhone: "+77029876543" },
  { id: 3, name: "Жанар Ерланқызы", email: "zhanar@mail.ru", phone: "+77031234567", course: "Интенсив", status: "Белсенді", date: "25.05.2025", progress: 88, parentPhone: "+77039876543" },
  { id: 4, name: "Арман Бекұлы", email: "arman@mail.ru", phone: "+77041234567", course: "ҰБТ Толық", status: "Тоқтатылды", date: "20.05.2025", progress: 30, parentPhone: "+77049876543" },
  { id: 5, name: "Сәуле Нұрқызы", email: "saule@mail.ru", phone: "+77051234567", course: "Базалық", status: "Белсенді", date: "15.05.2025", progress: 60, parentPhone: "+77059876543" },
]

const tabs = ["Дашборд", "Оқушылар", "Курстар", "Хабарламалар", "Ата-ана байланысы"]

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuth, setIsAuth] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("Дашборд")
  const [search, setSearch] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [parentMsg, setParentMsg] = useState("")
  const [msgSent, setMsgSent] = useState(false)

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      setIsAuth(true)
      setError("")
    } else {
      setError("Пароль қате!")
    }
  }

  function sendParentMessage(student: Student) {
    const message = "Salam! Sizdin balanyz " + student.name + " IQ Math platformasyndaghy progressi: " + student.progress + "%. Kurs: " + student.course + ". Tolygyraq: mathpro-kz.vercel.app"
    window.open("https://wa.me/" + student.parentPhone.replace(/\+/g, "").replace(/\s/g, "") + "?text=" + encodeURIComponent(message), "_blank")
  }

  async function sendTelegramMessage(text: string) {
    await fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    })
    setMsgSent(true)
    setTimeout(() => setMsgSent(false), 3000)
  }

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.course.toLowerCase().includes(search.toLowerCase())
  )

  if (!isAuth) {
    return (
      <main style={{ minHeight: "100vh", background: "#f7f9fa", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
        <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "2.5rem", width: "100%", maxWidth: "380px" }}>
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
            <input type="password" placeholder="Паролді енгізіңіз" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid #d1d7dc", borderRadius: "4px", fontSize: "1rem", outline: "none", boxSizing: "border-box" }} />
          </div>
          <button onClick={handleLogin} style={{ width: "100%", background: "#5624d0", color: "white", padding: "0.875rem", borderRadius: "4px", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "1rem" }}>
            Кіру →
          </button>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f7f9fa", fontFamily: "Inter, sans-serif" }}>

      {/* NAVBAR */}
      <nav style={{ background: "white", borderBottom: "1px solid #d1d7dc", padding: "0 1rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link href="/" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#5624d0", textDecoration: "none" }}>IQ Math</Link>
          <span style={{ background: "#fee2e2", color: "#dc2626", fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.5rem", borderRadius: "4px" }}>ADMIN</span>
        </div>
        <button onClick={() => setIsAuth(false)} style={{ background: "none", border: "1px solid #d1d7dc", color: "#6a6f73", padding: "0.375rem 0.875rem", borderRadius: "4px", fontSize: "0.8rem", cursor: "pointer" }}>
          Шығу
        </button>
      </nav>

      <div style={{ display: "flex", maxWidth: "1200px", margin: "0 auto", padding: "1.5rem 1rem", gap: "1.5rem" }}>

        {/* SIDEBAR */}
        <aside style={{ width: "200px", flexShrink: 0 }}>
          <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", overflow: "hidden" }}>
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.75rem 1rem", width: "100%", textAlign: "left", background: activeTab === tab ? "#f3f0ff" : "transparent", color: activeTab === tab ? "#5624d0" : "#1c1d1f", fontWeight: activeTab === tab ? 700 : 400, fontSize: "0.825rem", border: "none", borderLeft: activeTab === tab ? "3px solid #5624d0" : "3px solid transparent", cursor: "pointer", borderBottom: "1px solid #f7f9fa" }}>
                {tab === "Дашборд" && "📊"}
                {tab === "Оқушылар" && "👥"}
                {tab === "Курстар" && "📚"}
                {tab === "Хабарламалар" && "📨"}
                {tab === "Ата-ана байланысы" && "👪"}
                {" " + tab}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "1.25rem" }}>{activeTab}</h1>

          {/* ДАШБОРД */}
          {activeTab === "Дашборд" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.875rem", marginBottom: "1.25rem" }}>
                {[
                  { label: "Барлық оқушы", value: "1,248", icon: "👥", color: "#5624d0" },
                  { label: "Белсенді курс", value: "3", icon: "📚", color: "#a435f0" },
                  { label: "Бүгінгі кіру", value: "47", icon: "🔥", color: "#d97706" },
                  { label: "Жаңа оқушы", value: "+24", icon: "📈", color: "#16a34a" },
                ].map((s) => (
                  <div key={s.label} style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.1rem" }}>
                    <div style={{ fontSize: "1.35rem", marginBottom: "0.4rem" }}>{s.icon}</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: "0.75rem", color: "#6a6f73", marginTop: "0.2rem" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem", marginBottom: "1.25rem" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Соңғы тіркелулер</h2>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.825rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #f7f9fa" }}>
                      {["Оқушы", "Курс", "Күні", "Статус"].map((h) => (
                        <th key={h} style={{ textAlign: "left", padding: "0.5rem", color: "#6a6f73", fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {students.slice(0, 5).map((s) => (
                      <tr key={s.id} style={{ borderBottom: "1px solid #f7f9fa" }}>
                        <td style={{ padding: "0.625rem 0.5rem", fontWeight: 600, color: "#1c1d1f" }}>{s.name}</td>
                        <td style={{ padding: "0.625rem 0.5rem", color: "#5624d0" }}>{s.course}</td>
                        <td style={{ padding: "0.625rem 0.5rem", color: "#6a6f73" }}>{s.date}</td>
                        <td style={{ padding: "0.625rem 0.5rem" }}>
                          <span style={{ background: s.status === "Белсенді" ? "#dcfce7" : "#fee2e2", color: s.status === "Белсенді" ? "#166534" : "#dc2626", fontSize: "0.7rem", fontWeight: 600, padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{s.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Соңғы төлемдер</h2>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.825rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #f7f9fa" }}>
                      {["Оқушы", "Курс", "Сома", "Статус"].map((h) => (
                        <th key={h} style={{ textAlign: "left", padding: "0.5rem", color: "#6a6f73", fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Аяша Н.", course: "ҰБТ Толық", amount: "40 000 ₸" },
                      { name: "Жанар Е.", course: "Интенсив", amount: "75 000 ₸" },
                      { name: "Дәурен Қ.", course: "Базалық", amount: "25 000 ₸" },
                    ].map((p, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f7f9fa" }}>
                        <td style={{ padding: "0.625rem 0.5rem", color: "#1c1d1f" }}>{p.name}</td>
                        <td style={{ padding: "0.625rem 0.5rem", color: "#5624d0" }}>{p.course}</td>
                        <td style={{ padding: "0.625rem 0.5rem", color: "#16a34a", fontWeight: 700 }}>{p.amount}</td>
                        <td style={{ padding: "0.625rem 0.5rem" }}>
                          <span style={{ background: "#dcfce7", color: "#166534", fontSize: "0.7rem", fontWeight: 600, padding: "0.2rem 0.5rem", borderRadius: "4px" }}>Төленді</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ОҚУШЫЛАР */}
          {activeTab === "Оқушылар" && (
            <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
              <input type="text" placeholder="🔍 Оқушы іздеу..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: "100%", padding: "0.625rem 1rem", border: "1px solid #d1d7dc", borderRadius: "4px", fontSize: "0.875rem", outline: "none", marginBottom: "1rem", boxSizing: "border-box" }} />
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #d1d7dc" }}>
                      {["Аты-жөні", "Телефон", "Курс", "Прогресс", "Статус", "Күні", "Әрекет"].map((h) => (
                        <th key={h} style={{ textAlign: "left", padding: "0.5rem", color: "#6a6f73", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s) => (
                      <tr key={s.id} style={{ borderBottom: "1px solid #f7f9fa" }}>
                        <td style={{ padding: "0.625rem 0.5rem", fontWeight: 600, color: "#1c1d1f", whiteSpace: "nowrap" }}>{s.name}</td>
                        <td style={{ padding: "0.625rem 0.5rem", color: "#6a6f73" }}>{s.phone}</td>
                        <td style={{ padding: "0.625rem 0.5rem", color: "#5624d0", whiteSpace: "nowrap" }}>{s.course}</td>
                        <td style={{ padding: "0.625rem 0.5rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <div style={{ height: "6px", background: "#f7f9fa", borderRadius: "3px", overflow: "hidden", width: "60px" }}>
                              <div style={{ height: "100%", width: s.progress + "%", background: s.progress >= 70 ? "#16a34a" : s.progress >= 40 ? "#d97706" : "#dc2626", borderRadius: "3px" }}></div>
                            </div>
                            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#1c1d1f" }}>{s.progress}%</span>
                          </div>
                        </td>
                        <td style={{ padding: "0.625rem 0.5rem" }}>
                          <span style={{ background: s.status === "Белсенді" ? "#dcfce7" : "#fee2e2", color: s.status === "Белсенді" ? "#166534" : "#dc2626", fontSize: "0.7rem", fontWeight: 600, padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{s.status}</span>
                        </td>
                        <td style={{ padding: "0.625rem 0.5rem", color: "#6a6f73", whiteSpace: "nowrap" }}>{s.date}</td>
                        <td style={{ padding: "0.625rem 0.5rem" }}>
                          <div style={{ display: "flex", gap: "0.375rem" }}>
                            <button onClick={() => sendParentMessage(s)} style={{ background: "#25D366", color: "white", border: "none", padding: "0.3rem 0.625rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                              Ата-анаға
                            </button>
                            <a href={"https://wa.me/" + s.phone.replace(/\+/g, "").replace(/\s/g, "")} target="_blank" rel="noopener noreferrer" style={{ background: "#5624d0", color: "white", border: "none", padding: "0.3rem 0.625rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 600, textDecoration: "none" }}>
                              WhatsApp
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* КУРСТАР */}
          {activeTab === "Курстар" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              {[
                { title: "Математика негіздері", students: 342, price: "25 000 ₸", active: true },
                { title: "ҰБТ Толық дайындық", students: 687, price: "40 000 ₸", active: true },
                { title: "ҰБТ Экспресс: 100 балл", students: 219, price: "75 000 ₸", active: true },
              ].map((c, i) => (
                <div key={i} style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.625rem" }}>📚</div>
                  <h3 style={{ fontWeight: 700, color: "#1c1d1f", marginBottom: "0.375rem", fontSize: "0.9rem" }}>{c.title}</h3>
                  <div style={{ color: "#6a6f73", fontSize: "0.8rem", marginBottom: "0.5rem" }}>{c.students} оқушы</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#5624d0", marginBottom: "1rem" }}>{c.price}<span style={{ fontSize: "0.75rem", fontWeight: 400, color: "#6a6f73" }}>/ай</span></div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button style={{ flex: 1, background: "#5624d0", color: "white", padding: "0.5rem", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 600, border: "none", cursor: "pointer" }}>Өңдеу</button>
                    <button style={{ flex: 1, background: "white", color: "#6a6f73", border: "1px solid #d1d7dc", padding: "0.5rem", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>Статистика</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ХАБАРЛАМАЛАР */}
          {activeTab === "Хабарламалар" && (
            <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.5rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Telegram арқылы хабарлама жіберу</h2>
              {msgSent && (
                <div style={{ background: "#dcfce7", border: "1px solid #bbf7d0", borderRadius: "4px", padding: "0.75rem", color: "#166534", fontSize: "0.875rem", marginBottom: "1rem" }}>
                  ✅ Хабарлама сәтті жіберілді!
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
                <textarea
                  placeholder="Хабарлама мәтінін жазыңыз..."
                  value={parentMsg}
                  onChange={(e) => setParentMsg(e.target.value)}
                  rows={4}
                  style={{ padding: "0.875rem", border: "1px solid #d1d7dc", borderRadius: "4px", fontSize: "0.9rem", outline: "none", resize: "vertical", fontFamily: "Inter, sans-serif" }}
                />
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button onClick={() => sendTelegramMessage(parentMsg)} style={{ background: "#5624d0", color: "white", padding: "0.75rem 1.5rem", borderRadius: "4px", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.875rem" }}>
                  Telegram-ға жіберу
                </button>
              </div>
              <div style={{ marginTop: "1.5rem", borderTop: "1px solid #f7f9fa", paddingTop: "1.5rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "0.75rem" }}>Жылдам хабарламалар:</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[
                    "Бугін сабак болады! Сагат 16:00. IQ Math",
                    "Жана тест косылды! Текшеріп коріңіз.",
                    "Ерте тіркелген оқушыларға жеңілдік бар!",
                  ].map((msg, i) => (
                    <button key={i} onClick={() => sendTelegramMessage(msg)} style={{ background: "#f7f9fa", border: "1px solid #d1d7dc", color: "#1c1d1f", padding: "0.625rem 1rem", borderRadius: "4px", fontSize: "0.825rem", cursor: "pointer", textAlign: "left" }}>
                      {msg}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* АТА-АНА БАЙЛАНЫСЫ */}
          {activeTab === "Ата-ана байланысы" && (
            <div>
              <div style={{ background: "#f0e6ff", border: "1px solid #d8b4fe", borderRadius: "8px", padding: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ fontWeight: 700, color: "#5624d0", marginBottom: "0.25rem", fontSize: "0.9rem" }}>👪 Ата-аналарға хабарлама жіберу</div>
                <div style={{ fontSize: "0.825rem", color: "#6b21a8" }}>Оқушының прогресі туралы ата-анасына WhatsApp арқылы автоматты хабарлама жіберіңіз</div>
              </div>

              <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem", marginBottom: "1.25rem" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Барлық оқушыларға жіберу</h2>
                <button
                  onClick={() => {
                    students.forEach(s => sendParentMessage(s))
                  }}
                  style={{ background: "#25D366", color: "white", padding: "0.75rem 1.5rem", borderRadius: "4px", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.875rem" }}
                >
                  Барлық ата-аналарға жіберу (WhatsApp)
                </button>
              </div>

              <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Жеке оқушы бойынша жіберу</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {students.map((s) => (
                    <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem", border: "1px solid #f7f9fa", borderRadius: "8px", background: "#fafafa", flexWrap: "wrap", gap: "0.5rem" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#1c1d1f" }}>{s.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "#6a6f73" }}>{s.course} · Прогресс: <span style={{ fontWeight: 700, color: s.progress >= 70 ? "#16a34a" : s.progress >= 40 ? "#d97706" : "#dc2626" }}>{s.progress}%</span></div>
                        <div style={{ fontSize: "0.72rem", color: "#6a6f73" }}>Ата-ана: {s.parentPhone}</div>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button onClick={() => sendParentMessage(s)} style={{ background: "#25D366", color: "white", border: "none", padding: "0.5rem 0.875rem", borderRadius: "4px", fontSize: "0.775rem", fontWeight: 600, cursor: "pointer" }}>
                          WhatsApp жіберу
                        </button>
                        <button
                          onClick={() => sendTelegramMessage("Оқушы: " + s.name + " | Курс: " + s.course + " | Прогресс: " + s.progress + "% | Ата-ана: " + s.parentPhone)}
                          style={{ background: "#5624d0", color: "white", border: "none", padding: "0.5rem 0.875rem", borderRadius: "4px", fontSize: "0.775rem", fontWeight: 600, cursor: "pointer" }}
                        >
                          Telegram
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}  