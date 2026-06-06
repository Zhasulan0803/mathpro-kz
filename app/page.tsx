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
    <main className="min-h-screen text-white" style={{background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)"}}>

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-4 md:px-12 py-4 sticky top-0 z-50" style={{background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
        <div className="text-xl font-black">
          <span style={{color: "#a78bfa"}}>IQ</span>
          <span className="text-white"> Math</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
          <a href="#courses" className="hover:text-white transition">Курстар</a>
          <a href="#teacher" className="hover:text-white transition">Мұғалім</a>
          <a href="#reviews" className="hover:text-white transition">Пікірлер</a>
          <a href="#faq" className="hover:text-white transition">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="px-4 py-2 rounded-xl font-semibold text-sm transition" style={{background: "rgba(167,139,250,0.2)", border: "1px solid rgba(167,139,250,0.4)", color: "#a78bfa"}}>
            Кіру
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-2xl">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 flex flex-col gap-4 px-6 py-4 md:hidden" style={{background: "rgba(15,12,41,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
            <a href="#courses" onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-white">Курстар</a>
            <a href="#teacher" onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-white">Мұғалім</a>
            <a href="#reviews" onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-white">Пікірлер</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-white">FAQ</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="text-center py-20 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{background: "#7c3aed"}}></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{background: "#2563eb"}}></div>
        
        <div className="relative z-10">
          <div className="inline-block text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-widest" style={{background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)", color: "#a78bfa"}}>
            ҰБТ 2025 · МАТЕМАТИКА
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            ҰБТ-да математикадан <br />
            <span style={{background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>
              100 балл
            </span> алыңыз
          </h1>
          <p className="text-white/60 text-base md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Өміртай Жасұланмен бірге ҰБТ-ға дайындалыңыз. Нақты әдіс, нәтижелі сабақтар.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="px-8 py-4 rounded-2xl font-bold text-lg transition" style={{background: "linear-gradient(135deg, #7c3aed, #2563eb)", boxShadow: "0 0 30px rgba(124,58,237,0.4)"}}>
              Курсты бастау →
            </Link>
            <a href="#form" className="px-8 py-4 rounded-2xl font-bold text-lg transition text-white" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(10px)"}}>
              Тегін сабақ
            </a>
          </div>

          {/* STATS */}
          <div className="flex justify-center gap-6 md:gap-12 mt-16 flex-wrap">
            {[
              { num: "1200+", label: "Оқушы" },
              { num: "94%", label: "Нәтиже" },
              { num: "250+", label: "Видео сабақ" },
              { num: "500+", label: "ҰБТ тест" },
            ].map((s) => (
              <div key={s.label} className="text-center px-6 py-4 rounded-2xl" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)"}}>
                <div className="text-3xl font-black" style={{background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>{s.num}</div>
                <div className="text-white/50 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-sm font-bold tracking-widest mb-2" style={{color: "#a78bfa"}}>КУРСТАР</div>
          <h2 className="text-3xl md:text-4xl font-black">Мақсатыңызға сәйкес курс таңдаңыз</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tag: "Базалық", title: "Математика негіздері", desc: "Алгебра, геометрия негіздері. 9-сынып білімін қалпына келтіру.", lessons: "45 сабақ", duration: "3 ай", price: "25 000 ₸", hot: false },
            { tag: "Орта деңгей", title: "ҰБТ Толық дайындық", desc: "ҰБТ барлық тақырыптары, нақты емтихан тесттері, қателерді талдау.", lessons: "90 сабақ", duration: "6 ай", price: "40 000 ₸", hot: true },
            { tag: "Интенсив", title: "ҰБТ Экспресс: 100 балл", desc: "Жеделдетілген бағдарлама. Жеке коучинг, кепілдікті нәтиже.", lessons: "120 сабақ", duration: "Ментор", price: "75 000 ₸", hot: false },
          ].map((c) => (
            <div key={c.title} className="relative rounded-3xl p-6 transition" style={{background: "rgba(255,255,255,0.05)", border: c.hot ? "1px solid rgba(167,139,250,0.5)" : "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", boxShadow: c.hot ? "0 0 30px rgba(124,58,237,0.2)" : "none"}}>
              {c.hot && <div className="absolute -top-3 right-4 text-xs font-bold px-3 py-1 rounded-full" style={{background: "linear-gradient(135deg, #7c3aed, #2563eb)"}}>⭐ Хит</div>}
              <div className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-4" style={{background: "rgba(167,139,250,0.15)", color: "#a78bfa"}}>{c.tag}</div>
              <h3 className="text-xl font-black mb-2">{c.title}</h3>
              <p className="text-white/50 text-sm mb-4 leading-relaxed">{c.desc}</p>
              <div className="flex gap-4 text-xs text-white/40 mb-6">
                <span>📹 {c.lessons}</span>
                <span>⏱ {c.duration}</span>
              </div>
              <div className="flex items-center justify-between pt-4" style={{borderTop: "1px solid rgba(255,255,255,0.1)"}}>
                <div className="text-2xl font-black" style={{color: c.hot ? "#a78bfa" : "white"}}>{c.price}<span className="text-sm text-white/40 font-normal">/ай</span></div>
                <Link href="/login" className="px-4 py-2 rounded-xl text-sm font-semibold transition" style={{background: c.hot ? "linear-gradient(135deg, #7c3aed, #2563eb)" : "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)"}}>Сатып алу</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* МҰҒАЛІМ */}
      <section id="teacher" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)"}}>
          <div className="w-28 h-28 md:w-40 md:h-40 rounded-3xl flex items-center justify-center text-4xl font-black flex-shrink-0" style={{background: "linear-gradient(135deg, #7c3aed, #2563eb)"}}>
            ЖӨ
          </div>
          <div className="text-center md:text-left">
            <div className="text-sm font-bold tracking-widest mb-1" style={{color: "#a78bfa"}}>МҰҒАЛІМ</div>
            <h2 className="text-2xl md:text-3xl font-black mb-1">Өміртай Жасұлан</h2>
            <div className="text-sm mb-4 font-medium" style={{color: "#a78bfa"}}>Математика мұғалімі · ҰБТ сарапшысы</div>
            <p className="text-white/60 mb-6 leading-relaxed text-sm md:text-base">
              10 жылдан астам тәжірибе. 500+ оқушы ҰБТ-да 90+ балл алды. Авторлық әдіс бойынша оқытады.
            </p>
            <div className="flex gap-2 flex-wrap justify-center md:justify-start">
              {["🏆 ҰБТ сарапшысы", "📚 10+ жыл", "👨‍🎓 500+ оқушы", "⭐ 4.9 рейтинг"].map((b) => (
                <span key={b} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)", color: "#a78bfa"}}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ПІКІРЛЕР */}
      <section id="reviews" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-sm font-bold tracking-widest mb-2" style={{color: "#a78bfa"}}>ПІКІРЛЕР</div>
          <h2 className="text-3xl md:text-4xl font-black">Оқушылар не дейді?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Аяша Нұрланова", score: "96 балл", text: "ҰБТ-да математикадан 96 балл алдым! Жасұлан аға өте түсінікті түсіндіреді.", avatar: "АН" },
            { name: "Дәурен Қалиев", score: "88 балл", text: "Математикадан қорқатынмын, бірақ курс арқылы бәрі түсінді болды.", avatar: "ДҚ" },
            { name: "Жанар Ерланқызы", score: "91 балл", text: "Тест жүйесі керемет! Қатені бірден көрсетіп, түсіндіреді.", avatar: "ЖЕ" },
          ].map((r) => (
            <div key={r.name} className="rounded-3xl p-6" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)"}}>
              <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold" style={{background: "linear-gradient(135deg, #7c3aed, #2563eb)"}}>{r.avatar}</div>
                <div>
                  <div className="font-bold text-sm">{r.name}</div>
                  <div className="text-xs font-medium" style={{color: "#a78bfa"}}>ҰБТ: {r.score}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ТІРКЕЛУ ФОРМАСЫ */}
      <section id="form" className="py-20 px-4 md:px-8 max-w-2xl mx-auto text-center">
        <div className="rounded-3xl p-8 md:p-12 relative overflow-hidden" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(167,139,250,0.3)", backdropFilter: "blur(20px)"}}>
          <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{background: "linear-gradient(135deg, #7c3aed, #2563eb)"}}></div>
          <div className="relative z-10">
            <div className="text-sm font-bold tracking-widest mb-2" style={{color: "#a78bfa"}}>ТЕГІН</div>
            <h2 className="text-2xl md:text-3xl font-black mb-3">Алғашқы сабаққа тіркелу</h2>
            <p className="text-white/60 mb-8 text-sm md:text-base">Аты-жөніңіз бен телефоныңызды қалдырыңыз</p>
            {formSent ? (
              <div className="px-6 py-4 rounded-2xl text-lg font-semibold" style={{background: "rgba(74,222,128,0.2)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80"}}>
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
                    className="w-full sm:w-auto px-4 py-3 rounded-xl outline-none text-white placeholder-white/30"
                    style={{background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)"}}
                  />
                  <input
                    type="tel"
                    placeholder="Телефон нөмірі"
                    value={formPhone}
                    onChange={e => setFormPhone(e.target.value)}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl outline-none text-white placeholder-white/30"
                    style={{background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)"}}
                  />
                </div>
                <button
                  onClick={handleFormSubmit}
                  disabled={formLoading}
                  className="mt-4 w-full sm:w-auto px-8 py-3 rounded-xl font-bold transition"
                  style={{background: "linear-gradient(135deg, #7c3aed, #2563eb)", opacity: formLoading ? 0.5 : 1}}
                >
                  {formLoading ? "Жіберілуде..." : "Тегін тіркелу →"}
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4 md:px-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-sm font-bold tracking-widest mb-2" style={{color: "#a78bfa"}}>FAQ</div>
          <h2 className="text-2xl md:text-3xl font-black">Жиі қойылатын сұрақтар</h2>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { q: "Курс қанша уақытқа созылады?", a: "3-тен 6 айға дейін. Интенсив бағдарламасы — 3 ай." },
            { q: "Төлемді қалай жасауға болады?", a: "Kaspi Pay, Halyk Pay немесе банктік карта арқылы." },
            { q: "Тегін сабақ қандай?", a: "Тіркелгеннен кейін алғашқы 3 сабақ тегін." },
            { q: "Нәтиже болмаса ақша қайтарыла ма?", a: "Иә, 14 күн ішінде толық ақша қайтарылады." },
          ].map((f) => (
            <div key={f.q} className="rounded-2xl p-5" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)"}}>
              <div className="font-bold mb-2 text-sm md:text-base">{f.q}</div>
              <div className="text-white/50 text-sm">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-white/30 text-sm mt-10 px-4" style={{borderTop: "1px solid rgba(255,255,255,0.1)"}}>
        © 2025 <span style={{color: "#a78bfa"}} className="font-bold">IQ Math</span> · Барлық құқықтар қорғалған
        <div className="flex justify-center gap-4 md:gap-6 mt-3 flex-wrap">
          <Link href="/login" className="hover:text-white transition">Кіру</Link>
          <Link href="/dashboard" className="hover:text-white transition">Дашборд</Link>
          <Link href="/tests" className="hover:text-white transition">Тесттер</Link>
          <Link href="/admin" className="hover:text-white transition">Админ</Link>
        </div>
      </footer>

    </main>
  )
} 