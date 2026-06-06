import Link from "next/link"

export default function Dashboard() {
  return (
    <main style={{ minHeight: "100vh", background: "#f7f9fa", fontFamily: "Inter, sans-serif" }}>

      {/* NAVBAR */}
      <nav style={{ background: "white", borderBottom: "1px solid #d1d7dc", padding: "0 2rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#5624d0", textDecoration: "none" }}>IQ Math</Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "0.875rem", color: "#6a6f73" }}>Сәлем, Жасұлан!</span>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#5624d0", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.875rem" }}>Ж</div>
        </div>
      </nav>

      <div style={{ display: "flex", maxWidth: "1200px", margin: "0 auto", padding: "2rem", gap: "2rem" }}>

        {/* SIDEBAR */}
        <aside style={{ width: "220px", flexShrink: 0 }}>
          <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", overflow: "hidden" }}>
            {[
              { icon: "📊", label: "Дашборд", active: true, href: "/dashboard" },
              { icon: "🎬", label: "Сабақтар", active: false, href: "/dashboard" },
              { icon: "📝", label: "Тесттер", active: false, href: "/tests" },
              { icon: "📁", label: "Материалдар", active: false, href: "/dashboard" },
              { icon: "🏆", label: "Рейтинг", active: false, href: "/dashboard" },
              { icon: "📜", label: "Сертификаттар", active: false, href: "/dashboard" },
            ].map((item) => (
              <Link key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem 1rem", textDecoration: "none", background: item.active ? "#f7f9fa" : "white", borderLeft: item.active ? "3px solid #5624d0" : "3px solid transparent", color: item.active ? "#5624d0" : "#1c1d1f", fontWeight: item.active ? 700 : 400, fontSize: "0.9rem", borderBottom: "1px solid #f7f9fa" }}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <div style={{ flex: 1 }}>

          {/* STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { icon: "🎬", label: "Өткен сабақ", value: "47" },
              { icon: "📝", label: "Тест тапсырды", value: "23" },
              { icon: "🏆", label: "Рейтинг орны", value: "#12" },
            ].map((s) => (
              <div key={s.label} style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.25rem" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{s.icon}</div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#5624d0" }}>{s.value}</div>
                <div style={{ fontSize: "0.875rem", color: "#6a6f73" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* PROGRESS */}
          <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1.25rem" }}>Прогресс</h2>
            {[
              { label: "Жалпы прогресс", value: 72, color: "#5624d0" },
              { label: "Алгебра", value: 85, color: "#a435f0" },
              { label: "Геометрия", value: 60, color: "#5624d0" },
              { label: "Тригонометрия", value: 45, color: "#a435f0" },
            ].map((p) => (
              <div key={p.label} style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.375rem" }}>
                  <span style={{ color: "#1c1d1f", fontWeight: 500 }}>{p.label}</span>
                  <span style={{ color: "#5624d0", fontWeight: 700 }}>{p.value}%</span>
                </div>
                <div style={{ height: "8px", background: "#f7f9fa", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: p.value + "%", background: p.color, borderRadius: "4px" }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* LAST LESSONS */}
          <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.5rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1.25rem" }}>Соңғы сабақтар</h2>
            {[
              { title: "Квадрат теңдеулер", time: "Бүгін, 14:00", done: true },
              { title: "Тригонометриялық функциялар", time: "Кеше, 16:30", done: true },
              { title: "Логарифм негіздері", time: "Ертең, 10:00", done: false },
            ].map((l) => (
              <div key={l.title} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 0", borderBottom: "1px solid #f7f9fa" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: l.done ? "#e0f5e9" : "#f0e6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>
                    {l.done ? "✓" : "▶"}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1c1d1f" }}>{l.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "#6a6f73" }}>{l.time}</div>
                  </div>
                </div>
                <button style={{ background: "none", border: "1px solid #5624d0", color: "#5624d0", padding: "0.375rem 0.875rem", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>
                  {l.done ? "Қайта көру" : "Бастау"}
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  )
} 