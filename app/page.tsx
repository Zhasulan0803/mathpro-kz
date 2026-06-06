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
    <main className="min-h-screen bg-white text-gray-900">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-4 md:px-12 py-4 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="text-xl font-black text-blue-600">IQ<span className="text-gray-900"> Math</span></div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#courses" className="hover:text-blue-600 transition">Курстар</a>
          <a href="#teacher" className="hover:text-blue-600 transition">Мұғалім</a>
          <a href="#reviews" className="hover:text-blue-600 transition">Пікірлер</a>
          <a href="#faq" className="hover:text-blue-600 transition">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-blue-700 transition">
            Кіру
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700 text-2xl">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 flex flex-col gap-4 px-6 py-4 md:hidden shadow-lg">
            <a href="#courses" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-blue-600">Курстар</a>
            <a href="#teacher" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-blue-600">Мұғалім</a>
            <a href="#reviews" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-blue-600">Пікірлер</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-blue-600">FAQ</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="text-center py-20 md:py-32 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="inline-block bg-blue-100 text-blue-600 text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-widest">
          ҰБТ 2025 · МАТЕМАТИКА
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-gray-900">
          ҰБТ-да математикадан <br />
          <span className="text-blue-600">100 балл</span> алыңыз
        </h1>
        <p className="text-gray-500 text-base md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Өміртай Жасұланмен бірге ҰБТ-ға дайындалыңыз. Нақты әдіс, нәтижелі сабақтар.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            Курсты бастау →
          </Link>
          <a href="#form" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition">
            Тегін сабақ
          </a>
        </div>

        {/* STATS */}
        <div className="flex justify-center gap-8 md:gap-16 mt-16 flex-wrap">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-blue-600">1200+</div>
            <div className="text-gray-400 text-sm mt-1">Оқушы</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-blue-600">94%</div>
            <div className="text-gray-400 text-sm mt-1">Нәтижені жақсартты</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-blue-600">250+</div>
            <div className="text-gray-400 text-sm mt-1">Видео сабақ</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-blue-600">500+</div>
            <div className="text-gray-400 text-sm mt-1">ҰБТ тест</div>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-blue-600 text-sm font-bold tracking-widest mb-2">КУРСТАР</div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">Мақсатыңызға сәйкес курс таңдаңыз</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-100 rounded-3xl p-6 hover:shadow-xl hover:border-blue-100 transition">
            <div className="text-blue-600 text-xs font-bold bg-blue-50 px-3 py-1 rounded-full inline-block mb-4">Базалық</div>
            <h3 className="text-xl font-black mb-2 text-gray-900">Математика негіздері</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">Алгебра, геометрия негіздері. 9-сынып білімін қалпына келтіру.</p>
            <div className="flex gap-4 text-xs text-gray-400 mb-6">
              <span>📹 45 сабақ</span><span>⏱ 3 ай</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-2xl font-black text-gray-900">25 000 ₸<span className="text-sm text-gray-400 font-normal">/ай</span></div>
              <Link href="/login" className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition">Сатып алу</Link>
            </div>
          </div>

          <div className="border-2 border-blue-600 rounded-3xl p-6 relative shadow-xl shadow-blue-100">
            <div className="absolute -top-3 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">⭐ Хит</div>
            <div className="text-blue-600 text-xs font-bold bg-blue-50 px-3 py-1 rounded-full inline-block mb-4">Орта деңгей</div>
            <h3 className="text-xl font-black mb-2 text-gray-900">ҰБТ Толық дайындық</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">ҰБТ барлық тақырыптары, нақты емтихан тесттері, қателерді талдау.</p>
            <div className="flex gap-4 text-xs text-gray-400 mb-6">
              <span>📹 90 сабақ</span><span>⏱ 6 ай</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-blue-100">
              <div className="text-2xl font-black text-blue-600">40 000 ₸<span className="text-sm text-gray-400 font-normal">/ай</span></div>
              <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition">Сатып алу</Link>
            </div>
          </div>

          <div className="border border-gray-100 rounded-3xl p-6 hover:shadow-xl hover:border-blue-100 transition">
            <div className="text-blue-600 text-xs font-bold bg-blue-50 px-3 py-1 rounded-full inline-block mb-4">Интенсив</div>
            <h3 className="text-xl font-black mb-2 text-gray-900">ҰБТ Экспресс: 100 балл</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">Жеделдетілген бағдарлама. Жеке коучинг, кепілдікті нәтиже.</p>
            <div className="flex gap-4 text-xs text-gray-400 mb-6">
              <span>📹 120 сабақ</span><span>🎯 Ментор</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-2xl font-black text-gray-900">75 000 ₸<span className="text-sm text-gray-400 font-normal">/ай</span></div>
              <Link href="/login" className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition">Сатып алу</Link>
            </div>
          </div>
        </div>
      </section>

      {/* МҰҒАЛІМ */}
      <section id="teacher" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="bg-blue-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-28 h-28 md:w-40 md:h-40 rounded-3xl bg-blue-600 flex items-center justify-center text-4xl md:text-5xl font-black text-white flex-shrink-0">
            ЖӨ
          </div>
          <div className="text-center md:text-left">
            <div className="text-blue-600 text-sm font-bold tracking-widest mb-1">МҰҒАЛІМ</div>
            <h2 className="text-2xl md:text-3xl font-black mb-1 text-gray-900">Өміртай Жасұлан</h2>
            <div className="text-blue-600 text-sm mb-4 font-medium">Математика мұғалімі · ҰБТ сарапшысы</div>
            <p className="text-gray-500 mb-6 leading-relaxed text-sm md:text-base">
              10 жылдан астам тәжірибе. 500+ оқушы ҰБТ-да 90+ балл алды. Авторлық әдіс бойынша оқытады.
            </p>
            <div className="flex gap-2 flex-wrap justify-center md:justify-start">
              <span className="bg-white border border-blue-100 text-blue-600 text-xs px-3 py-1.5 rounded-full font-medium">🏆 ҰБТ сарапшысы</span>
              <span className="bg-white border border-blue-100 text-blue-600 text-xs px-3 py-1.5 rounded-full font-medium">📚 10+ жыл</span>
              <span className="bg-white border border-blue-100 text-blue-600 text-xs px-3 py-1.5 rounded-full font-medium">👨‍🎓 500+ оқушы</span>
              <span className="bg-white border border-blue-100 text-blue-600 text-xs px-3 py-1.5 rounded-full font-medium">⭐ 4.9 рейтинг</span>
            </div>
          </div>
        </div>
      </section>

      {/* ПІКІРЛЕР */}
      <section id="reviews" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-blue-600 text-sm font-bold tracking-widest mb-2">ПІКІРЛЕР</div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">Оқушылар не дейді?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Аяша Нұрланова", score: "96 балл", text: "ҰБТ-да математикадан 96 балл алдым! Жасұлан аға өте түсінікті түсіндіреді.", avatar: "АН", color: "bg-blue-600" },
            { name: "Дәурен Қалиев", score: "88 балл", text: "Математикадан қорқатынмын, бірақ курс арқылы бәрі түсінді болды.", avatar: "ДҚ", color: "bg-indigo-600" },
            { name: "Жанар Ерланқызы", score: "91 балл", text: "Тест жүйесі керемет! Қатені бірден көрсетіп, түсіндіреді.", avatar: "ЖЕ", color: "bg-sky-600" },
          ].map((r) => (
            <div key={r.name} className="border border-gray-100 rounded-3xl p-6 hover:shadow-lg transition">
              <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center text-xs font-bold text-white`}>{r.avatar}</div>
                <div>
                  <div className="font-bold text-sm text-gray-900">{r.name}</div>
                  <div className="text-blue-600 text-xs font-medium">ҰБТ: {r.score}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ТІРКЕЛУ ФОРМАСЫ */}
      <section id="form" className="py-20 px-4 md:px-8 max-w-2xl mx-auto text-center">
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-blue-200 text-sm font-bold tracking-widest mb-2">ТЕГІН</div>
          <h2 className="text-2xl md:text-3xl font-black mb-3">Алғашқы сабаққа тіркелу</h2>
          <p className="text-blue-100 mb-8 text-sm md:text-base">Аты-жөніңіз бен телефоныңызды қалдырыңыз</p>
          {formSent ? (
            <div className="bg-white/20 text-white px-6 py-4 rounded-2xl text-lg font-semibold">
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
                  className="w-full sm:w-auto bg-white/20 border border-white/30 text-white placeholder-blue-200 px-4 py-3 rounded-xl outline-none focus:border-white transition"
                />
                <input
                  type="tel"
                  placeholder="Телефон нөмірі"
                  value={formPhone}
                  onChange={e => setFormPhone(e.target.value)}
                  className="w-full sm:w-auto bg-white/20 border border-white/30 text-white placeholder-blue-200 px-4 py-3 rounded-xl outline-none focus:border-white transition"
                />
              </div>
              <button
                onClick={handleFormSubmit}
                disabled={formLoading}
                className="mt-4 w-full sm:w-auto bg-white hover:bg-blue-50 disabled:opacity-50 text-blue-600 px-8 py-3 rounded-xl font-bold transition"
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
          <div className="text-blue-600 text-sm font-bold tracking-widest mb-2">FAQ</div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">Жиі қойылатын сұрақтар</h2>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { q: "Курс қанша уақытқа созылады?", a: "3-тен 6 айға дейін. Интенсив бағдарламасы — 3 ай." },
            { q: "Төлемді қалай жасауға болады?", a: "Kaspi Pay, Halyk Pay немесе банктік карта арқылы." },
            { q: "Тегін сабақ қандай?", a: "Тіркелгеннен кейін алғашқы 3 сабақ тегін." },
            { q: "Нәтиже болмаса ақша қайтарыла ма?", a: "Иә, 14 күн ішінде толық ақша қайтарылады." },
          ].map((f) => (
            <div key={f.q} className="border border-gray-100 rounded-2xl p-5 hover:border-blue-100 hover:shadow-md transition">
              <div className="font-bold mb-2 text-gray-900 text-sm md:text-base">{f.q}</div>
              <div className="text-gray-400 text-sm">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 text-center py-8 text-gray-400 text-sm mt-10 px-4">
        © 2025 <span className="text-blue-600 font-bold">IQ Math</span> · Барлық құқықтар қорғалған
        <div className="flex justify-center gap-4 md:gap-6 mt-3 flex-wrap">
          <Link href="/login" className="hover:text-blue-600 transition">Кіру</Link>
          <Link href="/dashboard" className="hover:text-blue-600 transition">Дашборд</Link>
          <Link href="/tests" className="hover:text-blue-600 transition">Тесттер</Link>
          <Link href="/admin" className="hover:text-blue-600 transition">Админ</Link>
        </div>
      </footer>

    </main>
  )
} 