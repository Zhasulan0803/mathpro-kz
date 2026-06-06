"use client"
import { useState } from "react"
import Link from "next/link"

export default function Home() {
  const [formName, setFormName] = useState("")
  const [formPhone, setFormPhone] = useState("")
  const [formLoading, setFormLoading] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleFormSubmit() {
    if (!formName || !formPhone) return
    setFormLoading(true)
    await fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Жана тіркелу! Аты: " + formName + " Телефон: " + formPhone,
      }),
    })
    setFormSent(true)
    setFormLoading(false)
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f8f7ff", color: "#1e1b4b" }}>

      <nav style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(79,70,229,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2rem", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ fontSize: "1.25rem", fontWeight: 900 }}>
          <span style={{ color: "#4f46e5" }}>IQ</span>
          <span style={{ color: "#1e1b4b" }}> Math</span>
        </div>
        <div style={{ display: "flex", gap: "2rem", fontSize: "0.875rem", color: "#6b7280" }}>
          <a href="#courses">Курстар</a>
          <a href="#teacher">Мұғалім</a>
          <a href="#reviews">Пікірлер</a>
          <a href="#faq">FAQ</a>
        </div>
        <Link href="/login" style={{ background: "#4f46e5", color: "white", padding: "0.5rem 1rem", borderRadius: "0.75rem", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none" }}>
          Кіру
        </Link>
      </nav>

      <section style={{ textAlign: "center", padding: "8rem 1rem", position: "relative" }}>
        <div style={{ display: "inline-block", background: "rgba(79,70,229,0.1)", color: "#4f46e5", padding: "0.5rem 1rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700, marginBottom: "1.5rem", letterSpacing: "3px" }}>
          ҰБТ 2025 · МАТЕМАТИКА
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "1.5rem", lineHeight: 1.2, color: "#1e1b4b" }}>
          ҰБТ-да математикадан <br />
          <span style={{ color: "#4f46e5" }}>100 балл</span> алыңыз
        </h1>
        <p style={{ color: "#6b7280", fontSize: "1.1rem", marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
          Өміртай Жасұланмен бірге ҰБТ-ға дайындалыңыз. Нақты әдіс, нәтижелі сабақтар.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#courses" style={{ background: "#4f46e5", color: "white", padding: "1rem 2rem", borderRadius: "1rem", fontWeight: 700, fontSize: "1.1rem", textDecoration: "none", boxShadow: "0 8px 30px rgba(79,70,229,0.3)" }}>
            Курсты бастау
          </a>
          <a href="#form" style={{ background: "white", color: "#4f46e5", border: "2px solid #4f46e5", padding: "1rem 2rem", borderRadius: "1rem", fontWeight: 700, fontSize: "1.1rem", textDecoration: "none" }}>
            Тегін сабақ
          </a>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "4rem", flexWrap: "wrap" }}>
          {[["1200+", "Оқушы"], ["94%", "Нәтиже"], ["250+", "Видео сабақ"], ["500+", "ҰБТ тест"]].map(([num, label]) => (
            <div key={label} style={{ background: "white", border: "1px solid rgba(79,70,229,0.1)", borderRadius: "1rem", padding: "1rem 1.5rem", textAlign: "center", boxShadow: "0 4px 20px rgba(79,70,229,0.08)" }}>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "#4f46e5" }}>{num}</div>
              <div style={{ fontSize: "0.875rem", color: "#9ca3af", marginTop: "0.25rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="courses" style={{ padding: "5rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ color: "#4f46e5", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "3px", marginBottom: "0.5rem" }}>КУРСТАР</div>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#1e1b4b" }}>Мақсатыңызға сәйкес курс таңдаңыз</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {[
            { tag: "Базалық", title: "Математика негіздері", desc: "Алгебра, геометрия негіздері. 9-сынып білімін қалпына келтіру.", price: "25 000", hot: false },
            { tag: "Орта деңгей", title: "ҰБТ Толық дайындық", desc: "ҰБТ барлық тақырыптары, нақты емтихан тесттері, қателерді талдау.", price: "40 000", hot: true },
            { tag: "Интенсив", title: "ҰБТ Экспресс: 100 балл", desc: "Жеделдетілген бағдарлама. Жеке коучинг, кепілдікті нәтиже.", price: "75 000", hot: false },
          ].map((c) => (
            <div key={c.title} style={{ background: "white", border: c.hot ? "2px solid #4f46e5" : "1px solid rgba(79,70,229,0.1)", borderRadius: "1.5rem", padding: "1.5rem", position: "relative", boxShadow: c.hot ? "0 8px 40px rgba(79,70,229,0.15)" : "0 4px 20px rgba(0,0,0,0.05)" }}>
              {c.hot && <div style={{ position: "absolute", top: "-12px", right: "16px", background: "#4f46e5", color: "white", fontSize: "0.75rem", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: "100px" }}>Хит</div>}
              <div style={{ background: "rgba(79,70,229,0.1)", color: "#4f46e5", fontSize: "0.75rem", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: "100px", display: "inline-block", marginBottom: "1rem" }}>{c.tag}</div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 900, marginBottom: "0.5rem", color: "#1e1b4b" }}>{c.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "#9ca3af", marginBottom: "1.5rem", lineHeight: 1.6 }}>{c.desc}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(79,70,229,0.08)", paddingTop: "1rem" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 900, color: c.hot ? "#4f46e5" : "#1e1b4b" }}>{c.price} <span style={{ fontSize: "0.875rem", fontWeight: 400, color: "#9ca3af" }}>₸/ай</span></div>
                <a href={"https://wa.me/87075687067?text=Салем! " + c.title + " курсын сатып алгым келеді. Багасы: " + c.price + " тенге/ай"} target="_blank" rel="noopener noreferrer" style={{ background: c.hot ? "#4f46e5" : "#1e1b4b", color: "white", padding: "0.5rem 1rem", borderRadius: "0.75rem", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none" }}>
                  Сатып алу
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="teacher" style={{ padding: "5rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ background: "white", border: "1px solid rgba(79,70,229,0.1)", borderRadius: "1.5rem", padding: "3rem", display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap", boxShadow: "0 4px 30px rgba(79,70,229,0.08)" }}>
          <div style={{ width: "140px", height: "140px", borderRadius: "1.5rem", background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", fontWeight: 900, color: "white", flexShrink: 0 }}>ЖӨ</div>
          <div>
            <div style={{ color: "#4f46e5", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "3px", marginBottom: "0.25rem" }}>МҰҒАЛІМ</div>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#1e1b4b", marginBottom: "0.25rem" }}>Өміртай Жасұлан</h2>
            <div style={{ color: "#4f46e5", fontSize: "0.875rem", fontWeight: 500, marginBottom: "1rem" }}>Математика мұғалімі · ҰБТ сарапшысы</div>
            <p style={{ color: "#6b7280", lineHeight: 1.7, marginBottom: "1.5rem" }}>10 жылдан астам тәжірибе. 500+ оқушы ҰБТ-да 90+ балл алды.</p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {["ҰБТ сарапшысы", "10+ жыл", "500+ оқушы", "4.9 рейтинг"].map((b) => (
                <span key={b} style={{ background: "rgba(79,70,229,0.1)", color: "#4f46e5", fontSize: "0.75rem", fontWeight: 500, padding: "0.25rem 0.75rem", borderRadius: "100px" }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" style={{ padding: "5rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ color: "#4f46e5", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "3px", marginBottom: "0.5rem" }}>ПІКІРЛЕР</div>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#1e1b4b" }}>Оқушылар не дейді?</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {[
            { name: "Аяша Нұрланова", score: "96 балл", text: "ҰБТ-да 96 балл алдым! Жасұлан аға өте түсінікті түсіндіреді.", avatar: "АН" },
            { name: "Дәурен Қалиев", score: "88 балл", text: "Математикадан қорқатынмын, бірақ курс арқылы бәрі түсінді болды.", avatar: "ДҚ" },
            { name: "Жанар Ерланқызы", score: "91 балл", text: "Тест жүйесі керемет! Қатені бірден көрсетіп, түсіндіреді.", avatar: "ЖЕ" },
          ].map((r) => (
            <div key={r.name} style={{ background: "white", border: "1px solid rgba(79,70,229,0.1)", borderRadius: "1.5rem", padding: "1.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div style={{ color: "#facc15", fontSize: "1.1rem", marginBottom: "0.75rem" }}>★★★★★</div>
              <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1rem" }}>{r.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "white" }}>{r.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#1e1b4b" }}>{r.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#4f46e5", fontWeight: 500 }}>ҰБТ: {r.score}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="form" style={{ padding: "5rem 2rem", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ background: "#4f46e5", borderRadius: "1.5rem", padding: "3rem", boxShadow: "0 20px 60px rgba(79,70,229,0.3)" }}>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "3px", marginBottom: "0.5rem" }}>ТЕГІН</div>
          <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "white", marginBottom: "0.75rem" }}>Алғашқы сабаққа тіркелу</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2rem" }}>Аты-жөніңіз бен телефоныңызды қалдырыңыз</p>
          {formSent ? (
            <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: "1rem", padding: "1rem", color: "white", fontSize: "1.1rem", fontWeight: 600 }}>
              Сатті жіберілді! Жакында хабарласамыз.
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1rem" }}>
                <input type="text" placeholder="Аты-жөніңіз" value={formName} onChange={(e) => setFormName(e.target.value)} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: "white", outline: "none", minWidth: "180px" }} />
                <input type="tel" placeholder="Телефон нөмірі" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: "white", outline: "none", minWidth: "180px" }} />
              </div>
              <button onClick={handleFormSubmit} disabled={formLoading} style={{ background: "white", color: "#4f46e5", padding: "0.75rem 2rem", borderRadius: "0.75rem", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "1rem", opacity: formLoading ? 0.7 : 1 }}>
                {formLoading ? "Жіберілуде..." : "Тегін тіркелу"}
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="faq" style={{ padding: "4rem 2rem", maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ color: "#4f46e5", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "3px", marginBottom: "0.5rem" }}>FAQ</div>
          <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#1e1b4b" }}>Жиі қойылатын сұрақтар</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { q: "Курс қанша уақытқа созылады?", a: "3-тен 6 айға дейін. Интенсив бағдарламасы 3 ай." },
            { q: "Төлемді қалай жасауға болады?", a: "WhatsApp арқылы хабарласыңыз, төлем мәліметтерін береміз." },
            { q: "Тегін сабақ қандай?", a: "Тіркелгеннен кейін алғашқы 3 сабақ тегін." },
            { q: "Нәтиже болмаса ақша қайтарыла ма?", a: "Иә, 14 күн ішінде толық ақша қайтарылады." },
          ].map((f) => (
            <div key={f.q} style={{ background: "white", border: "1px solid rgba(79,70,229,0.1)", borderRadius: "1rem", padding: "1.25rem", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
              <div style={{ fontWeight: 700, color: "#1e1b4b", marginBottom: "0.5rem" }}>{f.q}</div>
              <div style={{ fontSize: "0.875rem", color: "#9ca3af" }}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      <a href="https://wa.me/87075687067?text=Салем! Курс туралы суракым бар." target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", width: "56px", height: "56px", borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1.5rem", textDecoration: "none", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", zIndex: 50 }}>
        W
      </a>

      <footer style={{ borderTop: "1px solid rgba(79,70,229,0.1)", textAlign: "center", padding: "2rem", color: "#9ca3af", fontSize: "0.875rem", marginTop: "2rem" }}>
        2025 IQ Math. Барлық құқықтар қорғалған.
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "0.75rem" }}>
          <Link href="/login" style={{ color: "#9ca3af", textDecoration: "none" }}>Кіру</Link>
          <Link href="/dashboard" style={{ color: "#9ca3af", textDecoration: "none" }}>Дашборд</Link>
          <Link href="/tests" style={{ color: "#9ca3af", textDecoration: "none" }}>Тесттер</Link>
          <Link href="/admin" style={{ color: "#9ca3af", textDecoration: "none" }}>Админ</Link>
        </div>
      </footer>

    </main>
  )
} 