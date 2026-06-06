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
        message: `🆕 Жаңа тіркелу!\n👤 Аты: ${formName}\n📞 Телефон: ${formPhone}`,
      }),
    })
    setFormSent(true)
    setFormLoading(false)
  }

  return (
    <main className="min-h-screen" style={{background: "#f8f7ff", color: "#1e1b4b"}}>

      {/* NAVBAR */}
      <nav style={{background: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(79,70,229,0.1)"}} className="flex items-center justify-between px-4 md:px-12 py-4 sticky top-0 z-50">
        <div className="text-xl font-black">
          <span style={{color: "#4f46e5"}}>IQ</span>
          <span style={{color: "#1e1b4b"}}> Math</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium" style={{color: "#6b7280"}}>
          <a href="#courses" className="hover:text-indigo-600 transition">Курстар</a>
          <a href="#teacher" className="hover:text-indigo-600 transition">Мұғалім</a>
          <a href="#reviews" className="hover:text-indigo-600 transition">Пікірлер</a>
          <a href="#faq" className="hover:text-indigo-600 transition">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="px-4 py-2 rounded-xl font-semibold text-sm text-white transition" style={{background: "#4f46e5"}}>
            Кіру
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl" style={{color: "#1e1b4b"}}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 flex flex-col gap-4 px-6 py-4 md:hidden" style={{background: "white", borderBottom: "1px solid rgba(79,70,229,0.1)"}}>
            <a href="#courses" onClick={() => setMenuOpen(false)} style={{color: "#6b7280"}}>Курстар</a>
            <a href="#teacher" onClick={() => setMenuOpen(false)} style={{color: "#6b7280"}}>Мұғалім</a>
            <a href="#reviews" onClick={() => setMenuOpen(false)} style={{color: "#6b7280"}}>Пікірлер</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} style={{color: "#6b7280"}}>FAQ</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="text-center py-20 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full" style={{background: "linear-gradient(135deg, rgba(79,70,229,0.05) 0%, rgba(255,255,255,0) 60%)"}}></div>
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full" style={{background: "rgba(79,70,229,0.08)", filter: "blur(60px)"}}></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full" style={{background: "rgba(79,70,229,0.06)", filter: "blur(80px)"}}></div>

        <div className="relative z-10">
          <div className="inline-block text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-widest" style={{background: "rgba(79,70,229,0.1)", color: "#4f46e5"}}>
            ҰБТ 2025 · МАТЕМАТИКА
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight" style={{color: "#1e1b4b"}}>
            ҰБТ-да математикадан <br />
            <span style={{color: "#4f46e5"}}>100 балл</span> алыңыз
          </h1>
          <p className="text-base md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{color: "#6b7280"}}>
            Өміртай Жасұланмен бірге ҰБТ-ға дайындалыңыз. Нақты әдіс, нәтижелі сабақтар.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="px-8 py-4 rounded-2xl font-bold text-lg text-white transition" style={{background: "#4f46e5", boxShadow: "0 8px 30px rgba(79,70,229,0.3)"}}>
              Курсты бастау →
            </Link>
            <a href="#form" className="px-8 py-4 rounded-2xl font-bold text-lg transition" style={{background: "white", border: "2px solid #4f46e5", color: "#4f46e5", boxShadow: "0 4px 15px rgba(79,70,229,0.1)"}}>
              Тегін сабақ
            </a>
          </div>

          {/* STATS */}
          <div className="flex justify-center gap-6 md:gap-8 mt-16 flex-wrap">
            {[
              { num: "1200+", label: "Оқушы" },
              { num: "94%", label: "Нәтиже" },
              { num: "250+", label: "Видео сабақ" },
              { num: "500+", label: "ҰБТ тест" },
            ].map((s) => (
              <div key={s.label} className="text-center px-6 py-4 rounded-2xl" style={{background: "white", border: "1px solid rgba(79,70,229,0.1)", boxShadow: "0 4px 20px rgba(79,70,229,0.08)"}}>
                <div className="text-3xl font-black" style={{color: "#4f46e5"}}>{s.num}</div>
                <div className="text-sm mt-1" style={{color: "#9ca3af"}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-sm font-bold tracking-widest mb-2" style={{color: "#4f46e5"}}>КУРСТАР</div>
          <h2 className="text-3xl md:text-4xl font-black" style={{color: "#1e1b4b"}}>Мақсатыңызға сәйкес курс таңдаңыз</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tag: "Базалық", title: "Математика негіздері", desc: "Алгебра, геометрия негіздері. 9-сынып білімін қалпына келтіру.", lessons: "45 сабақ", duration: "3 ай", price: "25 000 ₸", hot: false },
            { tag: "Орта деңгей", title: "ҰБТ Толық дайындық", desc: "ҰБТ барлық тақырыптары, нақты емтихан тесттері, қателерді талдау.", lessons: "90 сабақ", duration: "6 ай", price: "40 000 ₸", hot: true },
            { tag: "Интенсив", title: "ҰБТ Экспресс: 100 балл", desc: "Жеделдетілген бағдарлама. Жеке коучинг, кепілдікті нәтиже.", lessons: "120 сабақ", duration: "Ментор", price: "75 000 ₸", hot: false },
          ].map((c) => (
            <div key={c.title} className="relative rounded-3xl p-6 transition" style={{background: "white", border: c.hot ? "2px solid #4f46e5" : "1px solid rgba(79,70,229,0.1)", boxShadow: c.hot ? "0 8px 40px rgba(79,70,229,0.15)" : "0 4px 20px rgba(0,0,0,0.05)"}}>
              {c.hot && <div className="absolute -top-3 right-4 text-xs font-bold px-3 py-1 rounded-full text-white" style={{background: "#4f46e5"}}>⭐ Хит</div>}
              <div className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-4" style={{background: "rgba(79,70,229,0.1)", color: "#4f46e5"}}>{c.tag}</div>
              <h3 className="text-xl font-black mb-2" style={{color: "#1e1b4b"}}>{c.title}</h3>
              <p className="text-sm mb-4 leading-relaxed" style={{color: "#9ca3af"}}>{c.desc}</p>
              <div className="flex gap-4 text-xs mb-6" style={{color: "#9ca3af"}}>
                <span>📹 {c.lessons}</span>
                <span>⏱ {c.duration}</span>
              </div>
              <div className="flex items-center justify-between pt-4" style={{borderTop: "1px solid rgba(79,70,229,0.08)"}}>
                <div className="text-2xl font-black" style={{color: c.hot ? "#4f46e5" : "#1e1b4b"}}>{c.price}<span className="text-sm font-normal" style={{color: "#9ca3af"}}>/ай</span></div>
                <Link href="/login" className="px-4 py-2 rounded-xl text-sm font-semibold transition text-white" style={{background: c.hot ? "#4f46e5" : "#1e1b4b"}}>Сатып алу</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* МҰҒАЛІМ */}
      <section id="teacher" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center" style={{background: "white", border: "1px solid rgba(79,70,229,0.1)", boxShadow: "0 4px 30px rgba(79,70,229,0.08)"}}>
          <div className="w-28 h-28 md:w-40 md:h-40 rounded-3xl flex items-center justify-center text-3xl md:text-4xl font-black text-white flex-shrink-0" style={{background: "#4f46e5"}}>
            ЖӨ
          </div>
          <div className="text-center md:text-left">
            <div className="text-sm font-bold tracking-widest mb-1" style={{color: "#4f46e5"}}>МҰҒАЛІМ</div>
            <h2 className="text-2xl md:text-3xl font-black mb-1" style={{color: "#1e1b4b"}}>Өміртай Жасұлан</h2>
            <div className="text-sm mb-4 font-medium" style={{color: "#4f46e5"}}>Математика мұғалімі · ҰБТ сарапшысы</div>
            <p className="mb-6 leading-relaxed text-sm md:text-base" style={{color: "#6b7280"}}>
              10 жылдан астам тәжірибе. 500+ оқушы ҰБТ-да 90+ балл алды. Авторлық әдіс бойынша оқытады.
            </p>
            <div className="flex gap-2 flex-wrap justify-center md:justify-start">
              {["🏆 ҰБТ сарапшысы", "📚 10+ жыл", "👨‍🎓 500+ оқушы", "⭐ 4.9 рейтинг"].map((b) => (
                <span key={b} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{background: "rgba(79,70,229,0.1)", color: "#4f46e5"}}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ПІКІРЛЕР */}
      <section id="reviews" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-sm font-bold tracking-widest mb-2" style={{color: "#4f46e5"}}>ПІКІРЛЕР</div>
          <h2 className="text-3xl md:text-4xl font-black" style={{color: "#1e1b4b"}}>Оқушылар не дейді?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Аяша Нұрланова", score: "96 балл", text: "ҰБТ-да математикадан 96 балл алдым! Жасұлан аға өте түсінікті түсіндіреді.", avatar: "АН" },
            { name: "Дәурен Қалиев", score: "88 балл", text: "Математикадан қорқатынмын, бірақ курс арқылы бәрі түсінді болды.", avatar: "ДҚ" },
            { name: "Жанар Ерланқызы", score: "91 балл", text: "Тест жүйесі керемет! Қатені бірден көрсетіп, түсіндіреді.", avatar: "ЖЕ" },
          ].map((r) => (
            <div key={r.name} className="rounded-3xl p-6" style={{background: "white", border: "1px solid rgba(79,70,229,0.1)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)"}}>
              <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
              <p className="text-sm leading-relaxed mb-4" style={{color: "#6b7280"}}>"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{background: "#4f46e5"}}>{r.avatar}</div>
                <div>
                  <div className="font-bold text-sm" style={{color: "#1e1b4b"}}>{r.name}</div>
                  <div className="text-xs font-medium" style={{color: "#4f46e5"}}>ҰБТ: {r.score}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ТІРКЕЛУ ФОРМАСЫ */}
      <section id="form" className="py-20 px-4 md:px-8 max-w-2xl mx-auto text-center">
        <div className="rounded-3xl p-8 md:p-12" style={{background: "#4f46e5", boxShadow: "0 20px 60px rgba(79,70,229,0.3)"}}>
          <div className="text-sm font-bold tracking-widest mb-2" style={{color: "rgba(255,255,255,0.7)"}}>ТЕГІН</div>
          <h2 className="text-2xl md:text-3xl font-black mb-3 text-white">Алғашқы сабаққа тіркелу</h2>
          <p className="mb-8 text-sm md:text-base" style={{color: "rgba(255,255,255,0.7)"}}>Аты-жөніңіз бен телефоныңызды қалдырыңыз</p>
          {formSent ? (
            <div className="px-6 py-4 rounded-2xl text-lg font-semibold text-white" style={{background: "rgba(255,255,255,0.2)"}}>
              ✅ Сәтті жіберілді! Жақында хабарласамыз.
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <input
                  type="text"
                  placeholder="Аты-жөніңіз"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl outline-none text-white"
                  style={{background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)"}}
                />
                <input
                  type="tel"
                  placeholder="Телефон нөмірі"
                  value={formPhone}
                  onChange={e => setFormPhone(e.target.value)}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl outline-none text-white"
                  style={{background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)"}}
                />
              </div>
              <button
                onClick={handleFormSubmit}
                disabled={formLoading}
                className="mt-4 w-full sm:w-auto px-8 py-3 rounded-xl font-bold transition"
                style={{background: "white", color: "#4f46e5", opacity: formLoading ? 0.7 : 1}}
              >
                {formLoading ? "Жіберілуде..." : "Тегін тіркелу →"}
              </button>
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4 md:px-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-sm font-bold tracking-widest mb-2" style={{color: "#4f46e5"}}>FAQ</div>
          <h2 className="text-2xl md:text-3xl font-black" style={{color: "#1e1b4b"}}>Жиі қойылатын сұрақтар</h2>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { q: "Курс қанша уақытқа созылады?", a: "3-тен 6 айға дейін. Интенсив бағдарламасы — 3 ай." },
            { q: "Төлемді қалай жасауға болады?", a: "Kaspi Pay, Halyk Pay немесе банктік карта арқылы." },
            { q: "Тегін сабақ қандай?", a: "Тіркелгеннен кейін алғашқы 3 сабақ тегін." },
            { q: "Нәтиже болмаса ақша қайтарыла ма?", a: "Иә, 14 күн ішінде толық ақша қайтарылады." },
          ].map((f) => (
            <div key={f.q} className="rounded-2xl p-5" style={{background: "white", border: "1px solid rgba(79,70,229,0.1)", boxShadow: "0 2px 10px rgba(0,0,0,0.03)"}}>
              <div className="font-bold mb-2 text-sm md:text-base" style={{color: "#1e1b4b"}}>{f.q}</div>
              <div className="text-sm" style={{color: "#9ca3af"}}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-sm mt-10 px-4" style={{borderTop: "1px solid rgba(79,70,229,0.1)", color: "#9ca3af"}}>
        © 2025 <span className="font-bold" style={{color: "#4f46e5"}}>IQ Math</span> · Барлық құқықтар қорғалған
        <div className="flex justify-center gap-4 md:gap-6 mt-3 flex-wrap">
          <Link href="/login" className="hover:text-indigo-600 transition">Кіру</Link>
          <Link href="/dashboard" className="hover:text-indigo-600 transition">Дашборд</Link>
          <Link href="/tests" className="hover:text-indigo-600 transition">Тесттер</Link>
          <Link href="/admin" className="hover:text-indigo-600 transition">Админ</Link>
        </div>
      </footer>

    </main>
  )
} 