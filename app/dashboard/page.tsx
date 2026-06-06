export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#0A1628] text-white flex">

      {/* SIDEBAR */}
      <aside className="w-56 border-r border-white/10 p-5 flex flex-col gap-1">
        <div className="text-lg font-black mb-6">⭐ MathPro</div>
        {[
          { icon: "📊", label: "Дашборд", active: true },
          { icon: "🎬", label: "Сабақтар", active: false },
          { icon: "📝", label: "Тесттер", active: false },
          { icon: "📁", label: "Материалдар", active: false },
          { icon: "🏆", label: "Рейтинг", active: false },
          { icon: "📜", label: "Сертификаттар", active: false },
        ].map((item) => (
          <div key={item.label} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm transition ${item.active ? "bg-yellow-500/10 text-yellow-400" : "text-gray-400 hover:bg-white/5"}`}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
        <div className="mt-auto flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm text-gray-400 hover:bg-white/5">
          <span>⚙️</span><span>Параметрлер</span>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 p-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black">Сәлем, Жасулан! 👋</h1>
            <p className="text-gray-400 text-sm">Бүгін 2 жаңа сабақ бар</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black">Ж</div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Өткен сабақ", value: "47", icon: "🎬" },
            { label: "Тест тапсырды", value: "23", icon: "📝" },
            { label: "Рейтинг орны", value: "#12", icon: "🏆" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-3xl font-black text-yellow-400">{s.value}</div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* PROGRESS */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="font-bold mb-4">Прогресс</h2>
          {[
            { label: "Жалпы прогресс", value: 72, color: "bg-yellow-500" },
            { label: "Алгебра", value: 85, color: "bg-blue-500" },
            { label: "Геометрия", value: 60, color: "bg-green-500" },
            { label: "Тригонометрия", value: 45, color: "bg-purple-500" },
          ].map((p) => (
            <div key={p.label} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">{p.label}</span>
                <span className="text-yellow-400 font-semibold">{p.value}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full ${p.color} rounded-full`} style={{ width: `${p.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* LAST LESSONS */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="font-bold mb-4">Соңғы сабақтар</h2>
          {[
            { title: "Квадрат теңдеулер", time: "Бүгін, 14:00", done: true },
            { title: "Тригонометриялық функциялар", time: "Кеше, 16:30", done: true },
            { title: "Логарифм негіздері", time: "Ертең, 10:00", done: false },
          ].map((l) => (
            <div key={l.title} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${l.done ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                  {l.done ? "✓" : "▶"}
                </div>
                <div>
                  <div className="text-sm font-semibold">{l.title}</div>
                  <div className="text-xs text-gray-400">{l.time}</div>
                </div>
              </div>
              <button className="text-xs text-yellow-400 hover:underline">
                {l.done ? "Қайта көру" : "Бастау →"}
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}