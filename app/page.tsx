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
    <main style={{ minHeight: "100vh", background: "white", color: "#1c1d1f", fontFamily: "Inter, sans-serif" }}>

      {/* NAVBAR */}
      <nav style={{ background: "white", borderBottom: "1px solid #d1d7dc", padding: "0 2rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#5624d0" }}>IQ Math</div>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.875rem", color: "#1c1d1f" }}>
          <a href="#courses" style={{ textDecoration: "none", color: "#1c1d1f", fontWeight: 500 }}>Курстар</a>
          <a href="#teacher" style={{ textDecoration: "none", color: "#1c1d1f", fontWeight: 500 }}>Мұғалім</a>
          <a href="#reviews" style={{ textDecoration: "none", color: "#1c1d1f", fontWeight: 500 }}>Пікірлер</a>
          <a href="#faq" style={{ textDecoration: "none", color: "#1c1d1f", fontWeight: 500 }}>FAQ</a>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Link href="/login" style={{ border: "1px solid #1c1d1f", padding: "0.5rem 1rem", borderRadius: "4px", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none", color: "#1c1d1f" }}>Кіру</Link>
          <Link href="/login" style={{ background: "#5624d0", color: "white", padding: "0.5rem 1rem", borderRadius: "4px", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none" }}>Тіркелу</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "#f7f9fa", padding: "4rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "#f4c150", color: "#1c1d1f", padding: "0.4rem 1rem", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "1.5rem", letterSpacing: "1px" }}>
            ҰБТ 2025 · МАТЕМАТИКА
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#1c1d1f", marginBottom: "1rem", lineHeight: 1.2 }}>
            ҰБТ математикасынан <span style={{ color: "#5624d0" }}>100 балл</span> алыңыз
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#6a6f73", marginBottom: "2rem", lineHeight: 1.7 }}>
            Өміртай Жасұланмен бірге ҰБТ-ға дайындалыңыз. Нақты әдіс, нәтижелі сабақтар.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#courses" style={{ background: "#5624d0", color: "white", padding: "1rem 2rem", borderRadius: "4px", fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}>
              Курсты бастау →
            </a>
            <a href="#form" style={{ background: "white", color: "#5624d0", border: "2px solid #5624d0", padding: "1rem 2rem", borderRadius: "4px", fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}>
              Тегін сабақ
            </a>
          </div>

          {/* STATS */}
          <div style={{ display: "flex", justifyContent: "center", gap: "3rem", marginTop: "3rem", flexWrap: "wrap" }}>
            {[["1200+", "Оқушы"], ["94%", "Нәтиже"], ["250+", "Видео сабақ"], ["500+", "ҰБТ тест"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#5624d0" }}>{num}</div>
                <div style={{ fontSize: "0.875rem", color: "#6a6f73" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "0.5rem" }}>Курстар</h2>
        <p style={{ color: "#6a6f73", marginBottom: "2rem" }}>Мақсатыңызға сәйкес курс таңдаңыз</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {[
            { tag: "Базалық", title: "Математика негіздері", desc: "Алгебра, геометрия негіздері. 9-сынып білімін қалпына келтіру.", price: "25 000", rating: "4.7", students: "342", hot: false },
            { tag: "Орта деңгей", title: "ҰБТ Толық дайындық", desc: "ҰБТ барлық тақырыптары, нақты емтихан тесттері, қателерді талдау.", price: "40 000", rating: "4.9", students: "687", hot: true },
            { tag: "Интенсив", title: "ҰБТ Экспресс: 100 балл", desc: "Жеделдетілген бағдарлама. Жеке коучинг, кепілдікті нәтиже.", price: "75 000", rating: "4.8", students: "219", hot: false },
          ].map((c) => (
            <div key={c.title} style={{ border: "1px solid #d1d7dc", borderRadius: "8px", overflow: "hidden", position: "relative" }}>
              {c.hot && <div style={{ position: "absolute", top: "12px", left: "12px", background: "#f4c150", color: "#1c1d1f", fontSize: "0.75rem", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: "4px" }}>BESTSELLER</div>}
              <div style={{ background: "#f7f9fa", height: "140px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: "3rem" }}>📐</div>
              </div>
              <div style={{ padding: "1rem" }}>
                <div style={{ fontSize: "0.75rem", color: "#5624d0", fontWeight: 700, marginBottom: "0.5rem" }}>{c.tag}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "0.5rem", lineHeight: 1.3 }}>{c.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#6a6f73", marginBottom: "0.75rem", lineHeight: 1.5 }}>{c.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <span style={{ color: "#b4690e", fontWeight: 700, fontSize: "0.875rem" }}>{c.rating} ★</span>
                  <span style={{ color: "#6a6f73", fontSize: "0.8rem" }}>({c.students} оқушы)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #d1d7dc", paddingTop: "0.75rem" }}>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1c1d1f" }}>{c.price} ₸<span style={{ fontSize: "0.8rem", fontWeight: 400, color: "#6a6f73" }}>/ай</span></div>
                  <a href={"https://wa.me/87075687067?text=Салем! " + c.title + " курсын алгым келеді. Багасы: " + c.price + " тенге/ай"} target="_blank" rel="noopener noreferrer" style={{ background: "#5624d0", color: "white", padding: "0.5rem 1rem", borderRadius: "4px", fontSize: "0.875rem", fontWeight: 700, textDecoration: "none" }}>
                    Сатып алу
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* МҰҒАЛІМ */}
      <section id="teacher" style={{ background: "#f7f9fa", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", gap: "3rem", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ width: "160px", height: "160px", borderRadius: "50%", background: "#5624d0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", fontWeight: 800, color: "white", flexShrink: 0 }}>ЖӨ</div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "#5624d0", fontWeight: 700, letterSpacing: "2px", marginBottom: "0.5rem" }}>МҰҒАЛІМ</div>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "0.25rem" }}>Өміртай Жасұлан</h2>
            <div style={{ color: "#6a6f73", marginBottom: "1rem", fontSize: "1rem" }}>Математика мұғалімі · ҰБТ сарапшысы</div>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 800, fontSize: "1.5rem", color: "#1c1d1f" }}>4.9</div>
                <div style={{ fontSize: "0.75rem", color: "#6a6f73" }}>Рейтинг</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 800, fontSize: "1.5rem", color: "#1c1d1f" }}>1200+</div>
                <div style={{ fontSize: "0.75rem", color: "#6a6f73" }}>Оқушы</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 800, fontSize: "1.5rem", color: "#1c1d1f" }}>10+</div>
                <div style={{ fontSize: "0.75rem", color: "#6a6f73" }}>Жыл тәжірибе</div>
              </div>
            </div>
            <p style={{ color: "#6a6f73", lineHeight: 1.7 }}>10 жылдан астам тәжірибе. 500+ оқушы ҰБТ-да 90+ балл алды. Авторлық әдіс бойынша оқытады.</p>
          </div>
        </div>
      </section>

      {/* ПІКІРЛЕР */}
      <section id="reviews" style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "2rem" }}>Оқушылар пікірлері</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {[
            { name: "Аяша Нұрланова", score: "96 балл", text: "ҰБТ-да 96 балл алдым! Жасұлан аға өте түсінікті түсіндіреді. Тесттер нақты емтиханға ұқсас.", avatar: "АН" },
            { name: "Дәурен Қалиев", score: "88 балл", text: "Математикадан қорқатынмын, бірақ курс арқылы бәрі түсінді болды. Өте ұсынамын!", avatar: "ДҚ" },
            { name: "Жанар Ерланқызы", score: "91 балл", text: "Тест жүйесі керемет! Қатені бірден көрсетіп, түсіндіреді. Рейтинг жүйесі ынталандырады.", avatar: "ЖЕ" },
          ].map((r) => (
            <div key={r.name} style={{ border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.5rem" }}>
              <div style={{ color: "#b4690e", fontSize: "1rem", marginBottom: "0.75rem" }}>★★★★★</div>
              <p style={{ color: "#1c1d1f", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1rem" }}>{r.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#5624d0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "white" }}>{r.avatar}</div>
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
      <section id="form" style={{ background: "#5624d0", padding: "4rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: "0.75rem" }}>Тегін сабаққа тіркелу</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "2rem" }}>Аты-жөніңіз бен телефоныңызды қалдырыңыз</p>
          {formSent ? (
            <div style={{ background: "#f4c150", borderRadius: "8px", padding: "1rem", color: "#1c1d1f", fontWeight: 700 }}>
              Сатті жіберілді! Жакында хабарласамыз.
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1rem" }}>
                <input type="text" placeholder="Аты-жөніңіз" value={formName} onChange={(e) => setFormName(e.target.value)} style={{ padding: "0.875rem 1rem", borderRadius: "4px", border: "none", fontSize: "1rem", minWidth: "200px", outline: "none" }} />
                <input type="tel" placeholder="Телефон нөмірі" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} style={{ padding: "0.875rem 1rem", borderRadius: "4px", border: "none", fontSize: "1rem", minWidth: "200px", outline: "none" }} />
              </div>
              <button onClick={handleFormSubmit} disabled={formLoading} style={{ background: "#f4c150", color: "#1c1d1f", padding: "0.875rem 2rem", borderRadius: "4px", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "1rem" }}>
                {formLoading ? "Жіберілуде..." : "Тегін тіркелу →"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "2rem" }}>Жиі қойылатын сұрақтар</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { q: "Курс қанша уақытқа созылады?", a: "3-тен 6 айға дейін. Интенсив бағдарламасы 3 ай." },
            { q: "Төлемді қалай жасауға болады?", a: "WhatsApp арқылы хабарласыңыз, төлем мәліметтерін береміз." },
            { q: "Тегін сабақ қандай?", a: "Тіркелгеннен кейін алғашқы 3 сабақ тегін." },
            { q: "Нәтиже болмаса ақша қайтарыла ма?", a: "Иә, 14 күн ішінде толық ақша қайтарылады." },
          ].map((f) => (
            <div key={f.q} style={{ border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
              <div style={{ fontWeight: 700, color: "#1c1d1f", marginBottom: "0.5rem" }}>{f.q}</div>
              <div style={{ fontSize: "0.9rem", color: "#6a6f73", lineHeight: 1.6 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHATSAPP */}
      <a href="https://wa.me/87075687067?text=Салем! Курс туралы суракым бар." target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", width: "56px", height: "56px", borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1.5rem", textDecoration: "none", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", zIndex: 50 }}>
        W
      </a>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #d1d7dc", textAlign: "center", padding: "2rem", color: "#6a6f73", fontSize: "0.875rem" }}>
        © 2025 <span style={{ color: "#5624d0", fontWeight: 700 }}>IQ Math</span> · Барлық құқықтар қорғалған
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "0.75rem" }}>
          <Link href="/login" style={{ color: "#6a6f73", textDecoration: "none" }}>Кіру</Link>
          <Link href="/dashboard" style={{ color: "#6a6f73", textDecoration: "none" }}>Дашборд</Link>
          <Link href="/tests" style={{ color: "#6a6f73", textDecoration: "none" }}>Тесттер</Link>
          <Link href="/admin" style={{ color: "#6a6f73", textDecoration: "none" }}>Админ</Link>
        </div>
      </footer>

    </main>
  )
} 