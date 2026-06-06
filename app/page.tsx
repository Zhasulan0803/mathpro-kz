"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Home() {
  const [formName, setFormName] = useState("")
  const [formPhone, setFormPhone] = useState("")
  const [formLoading, setFormLoading] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) setUser(JSON.parse(userData))
  }, [])

  function handleLogout() {
    localStorage.removeItem("user")
    localStorage.removeItem("purchased")
    setUser(null)
  }

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

  const courses = [
    { id: 1, tag: "Базалық", title: "Математика негіздері", desc: "Алгебра, геометрия негіздері. 9-сынып білімін қалпына келтіру.", price: "25 000", rating: "4.7", students: "342", hot: false },
    { id: 2, tag: "Орта деңгей", title: "ҰБТ Толық дайындық", desc: "ҰБТ барлық тақырыптары, нақты емтихан тесттері, қателерді талдау.", price: "40 000", rating: "4.9", students: "687", hot: true },
    { id: 3, tag: "Интенсив", title: "ҰБТ Экспресс: 100 балл", desc: "Жеделдетілген бағдарлама. Жеке коучинг, кепілдікті нәтиже.", price: "75 000", rating: "4.8", students: "219", hot: false },
  ]

  return (
    <main style={{ minHeight: "100vh", background: "white", color: "#1c1d1f", fontFamily: "Inter, sans-serif" }}>

      {/* NAVBAR */}
      <nav style={{ background: "white", borderBottom: "1px solid #d1d7dc", padding: "0 1rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#5624d0" }}>IQ Math</div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {user ? (
            <>
              <Link href="/dashboard" style={{ background: "#5624d0", color: "white", padding: "0.4rem 0.75rem", borderRadius: "4px", fontWeight: 700, fontSize: "0.8rem", textDecoration: "none" }}>
                Дашборд
              </Link>
              <div
                onClick={handleLogout}
                title="Шығу"
                style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#5624d0", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}
              >
                {user.name?.[0]?.toUpperCase()}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" style={{ border: "1px solid #1c1d1f", padding: "0.4rem 0.75rem", borderRadius: "4px", fontWeight: 700, fontSize: "0.8rem", textDecoration: "none", color: "#1c1d1f" }}>Кіру</Link>
              <Link href="/login" style={{ background: "#5624d0", color: "white", padding: "0.4rem 0.75rem", borderRadius: "4px", fontWeight: 700, fontSize: "0.8rem", textDecoration: "none" }}>Тіркелу</Link>
            </>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#1c1d1f", padding: "0.25rem" }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div style={{ position: "absolute", top: "64px", left: 0, right: 0, background: "white", borderBottom: "1px solid #d1d7dc", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem", zIndex: 50 }}>
            <a href="#courses" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", color: "#1c1d1f", fontWeight: 500 }}>Курстар</a>
            <a href="#teacher" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", color: "#1c1d1f", fontWeight: 500 }}>Мұғалім</a>
            <a href="#reviews" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", color: "#1c1d1f", fontWeight: 500 }}>Пікірлер</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", color: "#1c1d1f", fontWeight: 500 }}>FAQ</a>
            {user && (
              <button onClick={handleLogout} style={{ background: "none", border: "none", color: "#dc2626", fontWeight: 600, cursor: "pointer", textAlign: "left", fontSize: "1rem", padding: 0 }}>
                Шығу
              </button>
            )}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ background: "#f7f9fa", padding: "3rem 1rem", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "#f4c150", color: "#1c1d1f", padding: "0.4rem 1rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, marginBottom: "1.25rem", letterSpacing: "1px" }}>
            ҰБТ 2025 · МАТЕМАТИКА
          </div>
          <h1 style={{ fontSize: "clamp(1.75rem, 6vw, 3rem)", fontWeight: 800, color: "#1c1d1f", marginBottom: "1rem", lineHeight: 1.2 }}>
            ҰБТ математикасынан <span style={{ color: "#5624d0" }}>100 балл</span> алыңыз
          </h1>
          <p style={{ fontSize: "1rem", color: "#6a6f73", marginBottom: "1.5rem", lineHeight: 1.7 }}>
            Өміртай Жасұланмен бірге ҰБТ-ға дайындалыңыз. Нақты әдіс, нәтижелі сабақтар.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#courses" style={{ background: "#5624d0", color: "white", padding: "0.875rem 1.5rem", borderRadius: "4px", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
              Курсты бастау →
            </a>
            <a href="#form" style={{ background: "white", color: "#5624d0", border: "2px solid #5624d0", padding: "0.875rem 1.5rem", borderRadius: "4px", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
              Тегін сабақ
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "2rem", maxWidth: "400px", margin: "2rem auto 0" }}>
            {[["1200+", "Оқушы"], ["94%", "Нәтиже"], ["250+", "Видео сабақ"], ["500+", "ҰБТ тест"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center", background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1rem" }}>
                <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#5624d0" }}>{num}</div>
                <div style={{ fontSize: "0.8rem", color: "#6a6f73" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" style={{ padding: "3rem 1rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "0.5rem" }}>Курстар</h2>
        <p style={{ color: "#6a6f73", marginBottom: "1.5rem", fontSize: "0.9rem" }}>Мақсатыңызға сәйкес курс таңдаңыз</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          {courses.map((c) => (
            <div key={c.title} style={{ border: "1px solid #d1d7dc", borderRadius: "8px", overflow: "hidden", position: "relative" }}>
              {c.hot && <div style={{ position: "absolute", top: "12px", left: "12px", background: "#f4c150", color: "#1c1d1f", fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "4px" }}>BESTSELLER</div>}
              <div style={{ background: "#f7f9fa", height: "120px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem" }}>📐</div>
              <div style={{ padding: "1rem" }}>
                <div style={{ fontSize: "0.75rem", color: "#5624d0", fontWeight: 700, marginBottom: "0.4rem" }}>{c.tag}</div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "0.4rem", lineHeight: 1.3 }}>{c.title}</h3>
                <p style={{ fontSize: "0.8rem", color: "#6a6f73", marginBottom: "0.75rem", lineHeight: 1.5 }}>{c.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <span style={{ color: "#b4690e", fontWeight: 700, fontSize: "0.8rem" }}>{c.rating} ★</span>
                  <span style={{ color: "#6a6f73", fontSize: "0.75rem" }}>({c.students} оқушы)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #d1d7dc", paddingTop: "0.75rem" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1c1d1f" }}>{c.price} ₸<span style={{ fontSize: "0.75rem", fontWeight: 400, color: "#6a6f73" }}>/ай</span></div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Link href={"/courses/" + c.id} style={{ background: "white", color: "#5624d0", border: "1px solid #5624d0", padding: "0.4rem 0.75rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, textDecoration: "none" }}>
                      Толығырақ
                    </Link>
                    <a href={"https://wa.me/87075687067?text=Салем! " + c.title + " курсын алгым келеді. Багасы: " + c.price + " тенге/ай"} target="_blank" rel="noopener noreferrer" style={{ background: "#5624d0", color: "white", padding: "0.4rem 0.75rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, textDecoration: "none" }}>
                      Сатып алу
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* МҰҒАЛІМ */}
      <section id="teacher" style={{ background: "#f7f9fa", padding: "3rem 1rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "1.5rem" }}>Мұғалім туралы</h2>
          <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.5rem", display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "#5624d0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: 800, color: "white", flexShrink: 0 }}>ЖӨ</div>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "0.25rem" }}>Өміртай Жасұлан</h3>
              <div style={{ color: "#5624d0", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.75rem" }}>Математика мұғалімі · ҰБТ сарапшысы</div>
              <div style={{ display: "flex", gap: "1.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                {[["4.9 ★", "Рейтинг"], ["1200+", "Оқушы"], ["10+", "Жыл"]].map(([val, lab]) => (
                  <div key={lab}>
                    <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#1c1d1f" }}>{val}</div>
                    <div style={{ fontSize: "0.75rem", color: "#6a6f73" }}>{lab}</div>
                  </div>
                ))}
              </div>
              <p style={{ color: "#6a6f73", lineHeight: 1.6, fontSize: "0.875rem" }}>500+ оқушы ҰБТ-да 90+ балл алды. Авторлық әдіс бойынша оқытады.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ПІКІРЛЕР */}
      <section id="reviews" style={{ padding: "3rem 1rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "1.5rem" }}>Оқушылар пікірлері</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          {[
            { name: "Аяша Нұрланова", score: "96 балл", text: "ҰБТ-да 96 балл алдым! Жасұлан аға өте түсінікті түсіндіреді.", avatar: "АН" },
            { name: "Дәурен Қалиев", score: "88 балл", text: "Математикадан қорқатынмын, бірақ курс арқылы бәрі түсінді болды.", avatar: "ДҚ" },
            { name: "Жанар Ерланқызы", score: "91 балл", text: "Тест жүйесі керемет! Қатені бірден көрсетіп, түсіндіреді.", avatar: "ЖЕ" },
          ].map((r) => (
            <div key={r.name} style={{ border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
              <div style={{ color: "#b4690e", fontSize: "0.9rem", marginBottom: "0.75rem" }}>★★★★★</div>
              <p style={{ color: "#1c1d1f", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1rem" }}>{r.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#5624d0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: "white" }}>{r.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#1c1d1f" }}>{r.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#5624d0", fontWeight: 600 }}>ҰБТ: {r.score}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ТІРКЕЛУ ФОРМАСЫ */}
      <section id="form" style={{ background: "#5624d0", padding: "3rem 1rem", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "white", marginBottom: "0.75rem" }}>Тегін сабаққа тіркелу</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>Аты-жөніңіз бен телефоныңызды қалдырыңыз</p>
          {formSent ? (
            <div style={{ background: "#f4c150", borderRadius: "8px", padding: "1rem", color: "#1c1d1f", fontWeight: 700 }}>
              Сәтті жіберілді! Жақында хабарласамыз.
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
                <input type="text" placeholder="Аты-жөніңіз" value={formName} onChange={(e) => setFormName(e.target.value)} style={{ padding: "0.875rem 1rem", borderRadius: "4px", border: "none", fontSize: "1rem", outline: "none", width: "100%", boxSizing: "border-box" }} />
                <input type="tel" placeholder="Телефон нөмірі" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} style={{ padding: "0.875rem 1rem", borderRadius: "4px", border: "none", fontSize: "1rem", outline: "none", width: "100%", boxSizing: "border-box" }} />
              </div>
              <button onClick={handleFormSubmit} disabled={formLoading} style={{ background: "#f4c150", color: "#1c1d1f", padding: "0.875rem 2rem", borderRadius: "4px", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "1rem", width: "100%" }}>
                {formLoading ? "Жіберілуде..." : "Тегін тіркелу →"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "3rem 1rem", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "1.5rem" }}>Жиі қойылатын сұрақтар</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            { q: "Курс қанша уақытқа созылады?", a: "3-тен 6 айға дейін. Интенсив бағдарламасы 3 ай." },
            { q: "Төлемді қалай жасауға болады?", a: "WhatsApp арқылы хабарласыңыз, төлем мәліметтерін береміз." },
            { q: "Тегін сабақ қандай?", a: "Тіркелгеннен кейін алғашқы 3 сабақ тегін." },
            { q: "Нәтиже болмаса ақша қайтарыла ма?", a: "Иә, 14 күн ішінде толық ақша қайтарылады." },
          ].map((f) => (
            <div key={f.q} style={{ border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1rem" }}>
              <div style={{ fontWeight: 700, color: "#1c1d1f", marginBottom: "0.375rem", fontSize: "0.9rem" }}>{f.q}</div>
              <div style={{ fontSize: "0.875rem", color: "#6a6f73", lineHeight: 1.6 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHATSAPP */}
      <a href="https://wa.me/87075687067?text=Салем! Курс туралы суракым бар." target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", width: "52px", height: "52px", borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1.25rem", textDecoration: "none", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", zIndex: 50 }}>
        W
      </a>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #d1d7dc", textAlign: "center", padding: "1.5rem 1rem", color: "#6a6f73", fontSize: "0.8rem" }}>
        © 2025 <span style={{ color: "#5624d0", fontWeight: 700 }}>IQ Math</span> · Барлық құқықтар қорғалған
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/login" style={{ color: "#6a6f73", textDecoration: "none" }}>Кіру</Link>
          <Link href="/dashboard" style={{ color: "#6a6f73", textDecoration: "none" }}>Дашборд</Link>
          <Link href="/tests" style={{ color: "#6a6f73", textDecoration: "none" }}>Тесттер</Link>
        </div>
      </footer>

    </main>
  )
} 