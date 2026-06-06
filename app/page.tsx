export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A1628] text-white">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-yellow-500/20">
        <div className="text-xl font-bold">⭐ MathPro KZ</div>
        <div className="flex gap-6 text-sm text-gray-300">
          <a href="#courses">Курстар</a>
          <a href="#teacher">Мұғалім</a>
          <a href="#faq">FAQ</a>
        </div>
        <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold text-sm">
          Кіру
        </button>
      </nav>

      {/* HERO */}
      <section className="text-center py-24 px-4">
        <h1 className="text-5xl font-black mb-6 leading-tight">
          ҰБТ математикасынан <br />
          <span className="text-yellow-400">100 балл</span> алыңыз
        </h1>
        <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
          Тәжірибелі мұғалімдермен, ҰБТ форматындағы тесттермен нәтижеге жетіңіз
        </p>
        <button className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-lg mr-4">
          Курсты бастау →
        </button>
        <button className="border border-white/30 px-8 py-4 rounded-xl font-semibold">
          Тегін сабақ
        </button>

        {/* STATS */}
        <div className="flex justify-center gap-12 mt-16">
          <div><div className="text-4xl font-black text-yellow-400">1200+</div><div className="text-gray-400 text-sm">Оқушы</div></div>
          <div><div className="text-4xl font-black text-yellow-400">94%</div><div className="text-gray-400 text-sm">Нәтиже</div></div>
          <div><div className="text-4xl font-black text-yellow-400">250+</div><div className="text-gray-400 text-sm">Видео сабақ</div></div>
        </div>
      </section>
{/* COURSES */}
      <section id="courses" className="py-20 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-yellow-400 text-sm font-semibold tracking-widest mb-2">КУРСТАР</div>
          <h2 className="text-4xl font-black">Мақсатыңызға сәйкес курс таңдаңыз</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Курс 1 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-500/50 transition">
            <div className="text-yellow-400 text-xs font-bold bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full inline-block mb-4">Базалық</div>
            <h3 className="text-xl font-bold mb-2">Математика негіздері</h3>
            <p className="text-gray-400 text-sm mb-4">Алгебра, геометрия негіздері. 9-сынып білімін қалпына келтіру.</p>
            <div className="flex gap-4 text-xs text-gray-400 mb-4">
              <span>📹 45 сабақ</span>
              <span>⏱ 3 ай</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="text-2xl font-black text-yellow-400">25 000 ₸<span className="text-sm text-gray-400 font-normal">/ай</span></div>
              <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-semibold transition">Сатып алу</button>
            </div>
          </div>

          {/* Курс 2 — хит */}
          <div className="bg-white/5 border-2 border-yellow-500 rounded-2xl p-6 relative">
            <div className="absolute -top-3 right-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">⭐ Хит</div>
            <div className="text-yellow-400 text-xs font-bold bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full inline-block mb-4">Орта деңгей</div>
            <h3 className="text-xl font-bold mb-2">ҰБТ Толық дайындық</h3>
            <p className="text-gray-400 text-sm mb-4">ҰБТ барлық тақырыптары, нақты емтихан тесттері, қателерді талдау.</p>
            <div className="flex gap-4 text-xs text-gray-400 mb-4">
              <span>📹 90 сабақ</span>
              <span>⏱ 6 ай</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="text-2xl font-black text-yellow-400">40 000 ₸<span className="text-sm text-gray-400 font-normal">/ай</span></div>
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-semibold transition">Сатып алу</button>
            </div>
          </div>

          {/* Курс 3 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-500/50 transition">
            <div className="text-yellow-400 text-xs font-bold bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full inline-block mb-4">Интенсив</div>
            <h3 className="text-xl font-bold mb-2">ҰБТ Экспресс: 100 балл</h3>
            <p className="text-gray-400 text-sm mb-4">Жеделдетілген бағдарлама. Жеке коучинг, кепілдікті нәтиже.</p>
            <div className="flex gap-4 text-xs text-gray-400 mb-4">
              <span>📹 120 сабақ</span>
              <span>🎯 Ментор</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="text-2xl font-black text-yellow-400">75 000 ₸<span className="text-sm text-gray-400 font-normal">/ай</span></div>
              <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-semibold transition">Сатып алу</button>
            </div>
          </div>

        </div>
      </section>
      {/* МҰҒАЛІМ */}
      <section id="teacher" className="py-20 px-8 max-w-6xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 flex gap-10 items-center">
          <div className="w-40 h-40 rounded-2xl bg-blue-900 border-2 border-yellow-500/30 flex items-center justify-center text-5xl font-black text-yellow-400 flex-shrink-0">
            АС
          </div>
          <div>
            <div className="text-yellow-400 text-sm font-semibold tracking-widest mb-1">МҰҒАЛІМ</div>
            <h2 className="text-3xl font-black mb-1">Өміртай Жасұлан</h2>
            <div className="text-yellow-400 text-sm mb-4">Математика мұғалімі · ҰБТ сарапшысы</div>
            <p className="text-gray-300 mb-6 leading-relaxed">10 жылдан астам тәжірибе. 500+ оқушы ҰБТ-да 90+ балл алды. ҚазҰУ математика факультетін бітірген, педагогика магистрі.</p>
            <div className="flex gap-3 flex-wrap">
              <span className="bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs px-3 py-1 rounded-full">🏆 ҰБТ сарапшысы</span>
              <span className="bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs px-3 py-1 rounded-full">📚 10+ жыл тәжірибе</span>
              <span className="bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs px-3 py-1 rounded-full">👨‍🎓 500+ оқушы</span>
              <span className="bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs px-3 py-1 rounded-full">⭐ 4.9 рейтинг</span>
            </div>
          </div>
        </div>
      </section>

      {/* ПІКІРЛЕР */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-yellow-400 text-sm font-semibold tracking-widest mb-2">ПІКІРЛЕР</div>
          <h2 className="text-4xl font-black">Оқушылар не дейді?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Аяша Нұрланова", score: "96 балл", text: "ҰБТ-да математикадан 96 балл алдым! Асылбек аға өте түсінікті түсіндіреді, тесттер нақты емтиханға ұқсас.", avatar: "А", color: "bg-yellow-500" },
            { name: "Дәурен Қалиев", score: "88 балл", text: "Математикадан қорқатынмын, бірақ курс арқылы бәрі түсінді болды. Видео сабақтарды қайта-қайта қарауға болады.", avatar: "Д", color: "bg-blue-500" },
            { name: "Жанар Ерланқызы", score: "91 балл", text: "Тест жүйесі керемет! Қатені бірден көрсетіп, түсіндіреді. Рейтинг жүйесі бәсекелестікті арттырады.", avatar: "Ж", color: "bg-green-500" },
          ].map((r) => (
            <div key={r.name} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${r.color} flex items-center justify-center text-sm font-bold text-white`}>{r.avatar}</div>
                <div>
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-yellow-400 text-xs">ҰБТ: {r.score}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ТІРКЕЛУ ФОРМАСЫ */}
      <section id="faq" className="py-20 px-8 max-w-2xl mx-auto text-center">
        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/20 border border-yellow-500/20 rounded-3xl p-12">
          <div className="text-yellow-400 text-sm font-semibold tracking-widest mb-2">ТЕГІН</div>
          <h2 className="text-3xl font-black mb-3">Алғашқы сабаққа тіркелу</h2>
          <p className="text-gray-300 mb-8">Аты-жөніңіз бен телефоныңызды қалдырыңыз</p>
          <div className="flex gap-3 flex-wrap justify-center">
            <input type="text" placeholder="Аты-жөніңіз" className="bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-3 rounded-xl outline-none focus:border-yellow-500 transition" />
            <input type="tel" placeholder="Телефон нөмірі" className="bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-3 rounded-xl outline-none focus:border-yellow-500 transition" />
          </div>
          <button className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-xl font-bold transition">
            Тегін тіркелу →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 text-center py-8 text-gray-500 text-sm">
        © 2025 <span className="text-yellow-400">MathPro KZ</span> · Барлық құқықтар қорғалған
      </footer>
    </main>
  );
}