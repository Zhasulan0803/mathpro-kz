import Link from "next/link"

export default function Course2() {
  return (
    <main style={{ minHeight: "100vh", background: "#f7f9fa", fontFamily: "Inter, sans-serif" }}>

      <nav style={{ background: "white", borderBottom: "1px solid #d1d7dc", padding: "0 1rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#5624d0", textDecoration: "none" }}>IQ Math</Link>
        <Link href="/#courses" style={{ fontSize: "0.875rem", color: "#5624d0", textDecoration: "none", fontWeight: 600 }}>Курстарға оралу</Link>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem 1rem" }}>

        <div style={{ fontSize: "0.75rem", color: "#5624d0", fontWeight: 700, marginBottom: "0.5rem" }}>ОРТА ДЕҢГЕЙ</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "1rem" }}>ҰБТ Толық дайындық</h1>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <span style={{ color: "#b4690e", fontWeight: 700 }}>4.9 ★</span>
          <span style={{ color: "#6a6f73" }}>687 оқушы</span>
          <span style={{ color: "#6a6f73" }}>6 ай</span>
          <span style={{ color: "#6a6f73" }}>90 сабақ</span>
        </div>
        <p style={{ color: "#1c1d1f", lineHeight: 1.7, marginBottom: "2rem" }}>
          ҰБТ барлық тақырыптары, нақты емтихан тесттері, қателерді талдау. Ең танымал курс!
        </p>

        <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "1rem" }}>Не үйренесіз?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {["Барлық ҰБТ тақырыптары", "Нақты емтихан тесттері", "Қателерді талдау", "Уақытты басқару", "100 балл стратегиясы", "Жеке кері байланыс"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem" }}>
                <span style={{ color: "#5624d0", fontWeight: 700 }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "1rem" }}>Курс бағдарламасы</h2>
          {[
            { title: "1-ай: Алгебра толық", lessons: "20 сабақ", topics: ["Теңдеулер", "Функциялар", "Логарифм"] },
            { title: "2-ай: Геометрия толық", lessons: "20 сабақ", topics: ["Планиметрия", "Стереометрия", "Векторлар"] },
            { title: "3-ай: Тригонометрия", lessons: "20 сабақ", topics: ["Формулалар", "Теңдеулер", "Графиктер"] },
            { title: "4-ай: Статистика", lessons: "15 сабақ", topics: ["Ықтималдық", "Комбинация", "Перестановка"] },
            { title: "5-6 ай: ҰБТ тесттері", lessons: "15 сабақ", topics: ["Нақты тесттер", "Қателер", "Стратегия"] },
          ].map((section, i) => (
            <div key={i} style={{ borderBottom: "1px solid #f7f9fa", paddingBottom: "1rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1c1d1f" }}>{section.title}</div>
                <div style={{ fontSize: "0.8rem", color: "#6a6f73" }}>{section.lessons}</div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {section.topics.map((t) => (
                  <span key={t} style={{ background: "#f7f9fa", border: "1px solid #d1d7dc", borderRadius: "4px", padding: "0.2rem 0.6rem", fontSize: "0.75rem", color: "#6a6f73" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "1rem" }}>Мұғалім</h2>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#5624d0", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "1.1rem", flexShrink: 0 }}>ЖӨ</div>
            <div>
              <div style={{ fontWeight: 700, color: "#1c1d1f" }}>Өміртай Жасұлан</div>
              <div style={{ fontSize: "0.875rem", color: "#5624d0" }}>Математика мұғалімі · 10+ жыл тәжірибе</div>
              <div style={{ fontSize: "0.8rem", color: "#6a6f73" }}>500+ оқушы · 4.9 ★ рейтинг</div>
            </div>
          </div>
        </div>

        <div style={{ background: "white", border: "2px solid #5624d0", borderRadius: "8px", padding: "1.5rem" }}>
          <div style={{ fontSize: "2rem", fontWeight: 900, color: "#1c1d1f", marginBottom: "1rem" }}>
            40 000 ₸<span style={{ fontSize: "1rem", fontWeight: 400, color: "#6a6f73" }}>/ай</span>
          </div>
          <a href="https://wa.me/87075687067?text=Салем! ҰБТ Толық дайындық курсын сатып алғым келеді. 40 000 тенге/ай" target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "#5624d0", color: "white", padding: "0.875rem", borderRadius: "4px", fontWeight: 700, textAlign: "center", textDecoration: "none", marginBottom: "0.75rem" }}>
            Сатып алу →
          </a>
          <a href="https://wa.me/87075687067?text=Салем! ҰБТ Толық дайындық туралы сұрақ бар." target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "white", color: "#5624d0", border: "2px solid #5624d0", padding: "0.875rem", borderRadius: "4px", fontWeight: 700, textAlign: "center", textDecoration: "none", marginBottom: "1.5rem" }}>
            Сұрақ қою
          </a>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {["📹 90 видео сабақ", "📄 60 PDF материал", "📝 200+ тест сұрақ", "💬 WhatsApp қолдау", "🏆 Сертификат", "♾️ Мәңгілік қолжетімділік", "✅ Нәтиже кепілдігі"].map((item) => (
              <div key={item} style={{ fontSize: "0.875rem", color: "#1c1d1f" }}>{item}</div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
} 