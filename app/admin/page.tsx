"use client"
import { useState } from "react"
import Link from "next/link"

const ADMIN_PASSWORD = "iqmath2025"

type Student = {
  name: string
  phone: string
  course: string
  status: string
  date: string
  parentPhone: string
}

const students: Student[] = [
  { name: "Аяша Нұрланова", phone: "+7 701 234 5678", course: "ҰБТ Толық", status: "Белсенді", date: "01.06.2025", parentPhone: "77012345678" },
  { name: "Дәурен Қалиев", phone: "+7 702 345 6789", course: "Базалық", status: "Белсенді", date: "28.05.2025", parentPhone: "77023456789" },
  { name: "Жанар Ерланқызы", phone: "+7 703 456 7890", course: "Интенсив", status: "Белсенді", date: "25.05.2025", parentPhone: "77034567890" },
  { name: "Арман Бекұлы", phone: "+7 704 567 8901", course: "ҰБТ Толық", status: "Тоқтатылды", date: "20.05.2025", parentPhone: "77045678901" },
]

const tabs = ["Дашборд", "Оқушылар", "Ата-аналар", "Төлемдер", "Курстар"]

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuth, setIsAuth] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("Дашборд")
  const [search, setSearch] = useState("")
  const [feedbackName, setFeedbackName] = useState("")
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackPhone, setFeedbackPhone] = useState("")
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      setIsAuth(true)
      setError("")
    } else {
      setError("Пароль қате!")
    }
  }

  async function sendFeedback(parentPhone: string, studentName: string) {
    const msg = "Salam! " + studentName + " okushysynyn ate-anasy. IQ Math platformasy boyynsha habarlasamyn."
    window.open("https://wa.me/" + parentPhone + "?text=" + msg, "_blank")
  }

  async function sendCustomFeedback() {
    if (!feedbackName || !feedbackText || !feedbackPhone) return
    const msg = feedbackText
    window.open("https://wa.me/" + feedbackPhone.replace(/\D/g, "") + "?text=" + encodeURIComponent(msg), "_blank")
    setFeedbackSent(true)
    setTimeout(() => {
      setFeedbackSent(false)
      setFeedbackName("")
      setFeedbackText("")
      setFeedbackPhone("")
    }, 2000)
  }

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.course.toLowerCase().includes(search.toLowerCase())
  )

  if (!isAuth) {
    return (
      <main style={{ minHeight: "100vh", background: "#f7f9fa", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
        <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "2.5rem", width: "100%", maxWidth: "380px" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔐</div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#1c1d1f" }}>Админ панелі</h1>
            <p style={{ color: "#6a6f73", fontSize: "0.825rem" }}>IQ Math басқару жүйесі</p>
          </div>
          {error && (
            <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: "4px", padding: "0.75rem", color: "#dc2626", fontSize: "0.825rem", marginBottom: "1rem", textAlign: "center" }}>
              {error}
            </div>
          )}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "#1c1d1f", display: "block", marginBottom: "0.375rem" }}>Пароль</label>
            <input type="password" placeholder="Паролді енгізіңіз" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d7dc", borderRadius: "4px", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }} />
          </div>
          <button onClick={handleLogin} style={{ width: "100%", background: "#5624d0", color: "white", padding: "0.875rem", borderRadius: "4px", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.95rem" }}>
            Кіру →
          </button>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f7f9fa", fontFamily: "Inter, sans-serif", display: "flex" }}>

      {/* SIDEBAR */}
      <aside style={{ width: "200px", background: "white", borderRight: "1px solid #d1d7dc", padding: "1rem 0", flexShrink: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 1rem", marginBottom: "1.25rem" }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#5624d0" }}>IQ Math</div>
          <div style={{ fontSize: "0.65rem", color: "#dc2626", fontWeight: 600, background: "#fee2e2", padding: "0.15rem 0.5rem", borderRadius: "4px", display: "inline-block", marginTop: "0.2rem" }}>Админ</div>
        </div>
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.625rem 1rem", width: "100%", textAlign: "left", background: activeTab === tab ? "#f7f9fa" : "transparent", borderLeft: activeTab === tab ? "3px solid #5624d0" : "3px solid transparent", color: activeTab === tab ? "#5624d0" : "#1c1d1f", fontWeight: activeTab === tab ? 700 : 400, fontSize: "0.825rem", border: "none", cursor: "pointer" }}>
            {tab === "Дашборд" && "📊"}
            {tab === "Оқушылар" && "👨‍🎓"}
            {tab === "Ата-аналар" && "👨‍👩‍👧"}
            {tab === "Төлемдер" && "💳"}
            {tab === "Курстар" && "📚"}
            {" "}{tab}
          </button>
        ))}
        <div style={{ marginTop: "auto", padding: "1rem" }}>
          <button onClick={() => setIsAuth(false)} style={{ width: "100%", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "4px", padding: "0.5rem", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>
            🚪 Шығу
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, padding: "1.5rem", overflow: "auto" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "1.25rem" }}>{activeTab}</h1>

        {/* ДАШБОРД */}
        {activeTab === "Дашборд" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.875rem", marginBottom: "1.25rem" }}>
              {[
                { label: "Барлық оқушы", value: "1,248", icon: "👨‍🎓", color: "#5624d0" },
                { label: "Белсенді курс", value: "3", icon: "📚", color: "#a435f0" },
                { label: "Бүгінгі төлем", value: "340 000 ₸", icon: "💰", color: "#16a34a" },
                { label: "Жаңа оқушы", value: "+24", icon: "📈", color: "#d97706" },
              ].map((s) => (
                <div key={s.label} style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1rem" }}>
                  <div style={{ fontSize: "1.25rem", marginBottom: "0.375rem" }}>{s.icon}</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: "0.75rem", color: "#6a6f73", marginTop: "0.2rem" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Соңғы тіркелген оқушылар</h2>
              {students.slice(0, 3).map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.625rem 0", borderBottom: "1px solid #f7f9fa" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#5624d0", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.7rem", fontWeight: 700 }}>{s.name[0]}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.825rem", color: "#1c1d1f" }}>{s.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "#6a6f73" }}>{s.course} · {s.date}</div>
                    </div>
                  </div>
                  <span style={{ background: s.status === "Белсенді" ? "#dcfce7" : "#fee2e2", color: s.status === "Белсенді" ? "#166534" : "#dc2626", fontSize: "0.7rem", fontWeight: 600, padding: "0.15rem 0.5rem", borderRadius: "4px" }}>{s.status}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
              <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Соңғы төлемдер</h2>
              {[
                { name: "Аяша Н.", course: "ҰБТ Толық", amount: "40 000 ₸" },
                { name: "Дәурен Қ.", course: "Базалық", amount: "25 000 ₸" },
                { name: "Жанар Е.", course: "Интенсив", amount: "75 000 ₸" },
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.625rem 0", borderBottom: "1px solid #f7f9fa", fontSize: "0.825rem" }}>
                  <div>
                    <div style={{ fontWeight: 600, color: "#1c1d1f" }}>{p.name}</div>
                    <div style={{ color: "#6a6f73", fontSize: "0.75rem" }}>{p.course}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: "#16a34a" }}>{p.amount}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ОҚУШЫЛАР */}
        {activeTab === "Оқушылар" && (
          <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
            <input type="text" placeholder="🔍 Оқушы іздеу..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: "100%", padding: "0.625rem 0.875rem", border: "1px solid #d1d7dc", borderRadius: "4px", fontSize: "0.825rem", outline: "none", marginBottom: "1rem", boxSizing: "border-box" }} />
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #d1d7dc" }}>
                    {["Аты-жөні", "Телефон", "Курс", "Күні", "Статус", "Әрекет"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "0.5rem 0.625rem", color: "#6a6f73", fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f7f9fa" }}>
                      <td style={{ padding: "0.625rem", fontWeight: 600, color: "#1c1d1f" }}>{s.name}</td>
                      <td style={{ padding: "0.625rem", color: "#6a6f73" }}>{s.phone}</td>
                      <td style={{ padding: "0.625rem", color: "#5624d0" }}>{s.course}</td>
                      <td style={{ padding: "0.625km", color: "#6a6f73" }}>{s.date}</td>
                      <td style={{ padding: "0.625rem" }}>
                        <span style={{ background: s.status === "Белсенді" ? "#dcfce7" : "#fee2e2", color: s.status === "Белсенді" ? "#166534" : "#dc2626", fontSize: "0.7rem", fontWeight: 600, padding: "0.15rem 0.5rem", borderRadius: "4px" }}>{s.status}</span>
                      </td>
                      <td style={{ padding: "0.625rem" }}>
                        <button onClick={() => sendFeedback(s.parentPhone, s.name)} style={{ background: "#25D366", color: "white", border: "none", borderRadius: "4px", padding: "0.3rem 0.625rem", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer" }}>
                          WhatsApp
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* АТА-АНАЛАР */}
        {activeTab === "Ата-аналар" && (
          <div>
            <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Ата-анаға хабарлама жіберу</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1c1d1f", display: "block", marginBottom: "0.3rem" }}>Оқушы аты</label>
                  <input type="text" placeholder="Оқушының аты-жөні" value={feedbackName} onChange={(e) => setFeedbackName(e.target.value)} style={{ width: "100%", padding: "0.625rem", border: "1px solid #d1d7dc", borderRadius: "4px", fontSize: "0.825rem", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1c1d1f", display: "block", marginBottom: "0.3rem" }}>Ата-ана телефоны</label>
                  <input type="tel" placeholder="+7 700 000 0000" value={feedbackPhone} onChange={(e) => setFeedbackPhone(e.target.value)} style={{ width: "100%", padding: "0.625rem", border: "1px solid #d1d7dc", borderRadius: "4px", fontSize: "0.825rem", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1c1d1f", display: "block", marginBottom: "0.3rem" }}>Хабарлама мәтіні</label>
                  <textarea placeholder="Хабарлама жазыңыз..." value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} rows={4} style={{ width: "100%", padding: "0.625rem", border: "1px solid #d1d7dc", borderRadius: "4px", fontSize: "0.825rem", outline: "none", boxSizing: "border-box", resize: "vertical" }} />
                </div>
                <button onClick={sendCustomFeedback} style={{ background: "#25D366", color: "white", border: "none", borderRadius: "4px", padding: "0.75rem", fontWeight: 700, cursor: "pointer", fontSize: "0.875rem" }}>
                  {feedbackSent ? "Жіберілді! ✓" : "WhatsApp арқылы жіберу →"}
                </button>
              </div>
            </div>

            <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
              <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Жылдам хабарлама шаблондары</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[
                  { label: "Сабаққа қатыспады", text: "Salam! Sizdin balaningyz bugin sabakka katyspadы." },
                  { label: "Жақсы нәтиже", text: "Salam! Sizdin balaningyz testте жоғары нәтиже көрсетті. Рахмет!" },
                  { label: "Үй тапсырмасы орындалмады", text: "Salam! Uy tapserması орындалмады. Nazaryngyzdy suraymyn." },
                  { label: "Ата-аналар жиналысы", text: "Salam! IQ Math platformasynda ata-analar zhynalysы өтеді. Kutu etemizbiz!" },
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #d1d7dc", borderRadius: "4px", padding: "0.75rem" }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.825rem", color: "#1c1d1f" }}>{t.label}</div>
                      <div style={{ fontSize: "0.72rem", color: "#6a6f73", marginTop: "0.2rem" }}>{t.text.slice(0, 50)}...</div>
                    </div>
                    <button onClick={() => setFeedbackText(t.text)} style={{ background: "#5624d0", color: "white", border: "none", borderRadius: "4px", padding: "0.375rem 0.75rem", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", flexShrink: 0, marginLeft: "0.5rem" }}>
                      Таңдау
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ТӨЛЕМДЕР */}
        {activeTab === "Төлемдер" && (
          <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.875rem", marginBottom: "1.25rem" }}>
              {[
                { label: "Осы ай", value: "340 000 ₸", color: "#16a34a" },
                { label: "Өткен ай", value: "285 000 ₸", color: "#5624d0" },
                { label: "Жыл бойы", value: "3 200 000 ₸", color: "#d97706" },
              ].map((s) => (
                <div key={s.label} style={{ background: "#f7f9fa", borderRadius: "8px", padding: "1rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: "0.75rem", color: "#6a6f73", marginTop: "0.2rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #d1d7dc" }}>
                  {["Оқушы", "Курс", "Сома", "Күні", "Статус"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "0.5rem 0.625rem", color: "#6a6f73", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Аяша Н.", course: "ҰБТ Толық", amount: "40 000 ₸", date: "01.06.2025", status: "Төленді" },
                  { name: "Дәурен Қ.", course: "Базалық", amount: "25 000 ₸", date: "01.06.2025", status: "Төленді" },
                  { name: "Жанар Е.", course: "Интенсив", amount: "75 000 ₸", date: "31.05.2025", status: "Төленді" },
                  { name: "Арман Б.", course: "ҰБТ Толық", amount: "40 000 ₸", date: "20.05.2025", status: "Күтілуде" },
                ].map((p, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f7f9fa" }}>
                    <td style={{ padding: "0.625rem", fontWeight: 600, color: "#1c1d1f" }}>{p.name}</td>
                    <td style={{ padding: "0.625rem", color: "#6a6f73" }}>{p.course}</td>
                    <td style={{ padding: "0.625rem", fontWeight: 700, color: "#16a34a" }}>{p.amount}</td>
                    <td style={{ padding: "0.625rem", color: "#6a6f73" }}>{p.date}</td>
                    <td style={{ padding: "0.625rem" }}>
                      <span style={{ background: p.status === "Төленді" ? "#dcfce7" : "#fef3c7", color: p.status === "Төленді" ? "#166534" : "#92400e", fontSize: "0.7rem", fontWeight: 600, padding: "0.15rem 0.5rem", borderRadius: "4px" }}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* КУРСТАР */}
        {activeTab === "Курстар" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {[
              { title: "Математика негіздері", students: 342, price: "25 000 ₸", active: true },
              { title: "ҰБТ Толық дайындық", students: 687, price: "40 000 ₸", active: true },
              { title: "ҰБТ Экспресс: 100 балл", students: 219, price: "75 000 ₸", active: true },
            ].map((c, i) => (
              <div key={i} style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.625rem" }}>📚</div>
                <h3 style={{ fontWeight: 700, color: "#1c1d1f", marginBottom: "0.3rem", fontSize: "0.875rem" }}>{c.title}</h3>
                <div style={{ color: "#6a6f73", fontSize: "0.8rem", marginBottom: "0.5rem" }}>{c.students} оқушы</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#5624d0", marginBottom: "0.875rem" }}>{c.price}/ай</div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button style={{ flex: 1, background: "#5624d0", color: "white", border: "none", borderRadius: "4px", padding: "0.5rem", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}>Өңдеу</button>
                  <button style={{ flex: 1, background: "#f7f9fa", color: "#1c1d1f", border: "1px solid #d1d7dc", borderRadius: "4px", padding: "0.5rem", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}>Көру</button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  )
} 