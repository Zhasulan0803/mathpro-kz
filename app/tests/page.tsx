"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

const questions = [
  { question: "2x + 5 = 13 теңдеуін шешіңіз", options: ["x = 3", "x = 4", "x = 5", "x = 6"], correct: 1, explanation: "2x = 13 - 5 = 8, x = 8/2 = 4" },
  { question: "√144 = ?", options: ["11", "12", "13", "14"], correct: 1, explanation: "12 × 12 = 144, сондықтан √144 = 12" },
  { question: "Үшбұрыштың бұрыштары қосындысы неге тең?", options: ["90°", "180°", "270°", "360°"], correct: 1, explanation: "Кез келген үшбұрыштың бұрыштары қосындысы әрқашан 180°" },
  { question: "log₁₀(1000) = ?", options: ["2", "3", "4", "5"], correct: 1, explanation: "10³ = 1000, сондықтан log₁₀(1000) = 3" },
  { question: "sin(90°) = ?", options: ["0", "0.5", "1", "-1"], correct: 2, explanation: "sin(90°) = 1, бұл тригонометрияның негізгі мәні" },
  { question: "x² - 9 = 0 теңдеуін шешіңіз", options: ["x = 3", "x = ±3", "x = 9", "x = ±9"], correct: 1, explanation: "x² = 9, x = ±√9 = ±3" },
  { question: "Параллелограммның ауданы қалай есептеледі?", options: ["a × b", "a + b", "a × h", "2(a + b)"], correct: 2, explanation: "Параллелограммның ауданы = негіз × биіктік = a × h" },
  { question: "3! (3 факториал) = ?", options: ["3", "6", "9", "12"], correct: 1, explanation: "3! = 3 × 2 × 1 = 6" },
  { question: "cos(0°) = ?", options: ["0", "0.5", "-1", "1"], correct: 3, explanation: "cos(0°) = 1, бұл тригонометрияның негізгі мәні" },
  { question: "Егер a = 3, b = 4 болса, a² + b² = ?", options: ["7", "14", "25", "49"], correct: 2, explanation: "a² + b² = 3² + 4² = 9 + 16 = 25" },
  { question: "Арифметикалық прогрессия: 2, 5, 8, 11, ... Келесі сан?", options: ["12", "13", "14", "15"], correct: 2, explanation: "Айырым d = 3, сондықтан 11 + 3 = 14" },
  { question: "π (пи) санының шамамен мәні?", options: ["2.14", "3.14", "4.14", "5.14"], correct: 1, explanation: "π ≈ 3.14159... Математикада π ≈ 3.14 деп қолданылады" },
  { question: "Геометриялық прогрессия: 2, 6, 18, ... Келесі сан?", options: ["36", "48", "54", "72"], correct: 2, explanation: "Қатынас q = 3, сондықтан 18 × 3 = 54" },
  { question: "tg(45°) = ?", options: ["0", "0.5", "1", "√2"], correct: 2, explanation: "tg(45°) = sin(45°)/cos(45°) = 1" },
  { question: "Квадраттың ауданы 64 см². Қабырғасы қанша?", options: ["6 см", "7 см", "8 см", "9 см"], correct: 2, explanation: "A = a², a = √64 = 8 см" },
  { question: "2⁵ = ?", options: ["10", "16", "32", "64"], correct: 2, explanation: "2⁵ = 2 × 2 × 2 × 2 × 2 = 32" },
  { question: "Трапецияның ауданы: a = 6, b = 10, h = 4. Ауданы?", options: ["32", "64", "48", "24"], correct: 0, explanation: "A = (a + b)/2 × h = (6 + 10)/2 × 4 = 8 × 4 = 32" },
  { question: "lg(100) = ?", options: ["1", "2", "10", "100"], correct: 1, explanation: "lg(100) = log₁₀(100) = 2, себебі 10² = 100" },
  { question: "Дөңгелектің ауданы r = 5 болса?", options: ["10π", "25π", "50π", "5π"], correct: 1, explanation: "A = πr² = π × 5² = 25π" },
  { question: "sin²(x) + cos²(x) = ?", options: ["0", "2", "1", "π"], correct: 2, explanation: "Тригонометриялық негізгі тождество: sin²(x) + cos²(x) = 1" },
]

const TIME_PER_QUESTION = 60

export default function TestPage() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION)
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    if (selected !== null || finished) return
    if (timeLeft <= 0) {
      handleNext(-1)
      return
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, selected, finished])

  function handleAnswer(i: number) {
    if (selected !== null) return
    setSelected(i)
    setShowExplanation(true)
  }

  function handleNext(forcedAnswer?: number) {
    const ans = forcedAnswer !== undefined ? forcedAnswer : (selected ?? -1)
    const newAnswers = [...answers, ans]
    if (current + 1 >= questions.length) {
      setAnswers(newAnswers)
      setFinished(true)
    } else {
      setAnswers(newAnswers)
      setCurrent(current + 1)
      setSelected(null)
      setTimeLeft(TIME_PER_QUESTION)
      setShowExplanation(false)
    }
  }

  function restart() {
    setCurrent(0)
    setSelected(null)
    setAnswers([])
    setFinished(false)
    setTimeLeft(TIME_PER_QUESTION)
    setShowExplanation(false)
  }

  const score = answers.filter((a, i) => a === questions[i].correct).length
  const q = questions[current]
  const timerColor = timeLeft <= 10 ? "#dc2626" : timeLeft <= 20 ? "#f59e0b" : "#5624d0"

  if (finished) {
    const percent = Math.round((score / questions.length) * 100)
    return (
      <main style={{ minHeight: "100vh", background: "#f7f9fa", fontFamily: "Inter, sans-serif" }}>
        <nav style={{ background: "white", borderBottom: "1px solid #d1d7dc", padding: "0 1rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#5624d0", textDecoration: "none" }}>IQ Math</Link>
          <Link href="/dashboard" style={{ fontSize: "0.875rem", color: "#5624d0", textDecoration: "none", fontWeight: 600 }}>Дашборд</Link>
        </nav>

        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem 1rem" }}>
          <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "2rem", textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
              {percent >= 80 ? "🏆" : percent >= 60 ? "👍" : "📚"}
            </div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "0.5rem" }}>Нәтиже</h1>
            <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "#5624d0", marginBottom: "0.5rem" }}>
              {score}/{questions.length}
            </div>
            <div style={{ fontSize: "1.25rem", fontWeight: 700, color: percent >= 80 ? "#16a34a" : percent >= 60 ? "#d97706" : "#dc2626", marginBottom: "1rem" }}>
              {percent}% — {percent >= 80 ? "Керемет!" : percent >= 60 ? "Жақсы!" : "Тағы жаттығу керек!"}
            </div>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={restart} style={{ background: "#5624d0", color: "white", padding: "0.875rem 2rem", borderRadius: "4px", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "1rem" }}>
                Қайта тапсыру →
              </button>
              <Link href="/dashboard" style={{ background: "white", color: "#5624d0", border: "2px solid #5624d0", padding: "0.875rem 2rem", borderRadius: "4px", fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}>
                Дашборд
              </Link>
            </div>
          </div>

          <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.5rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1rem" }}>Қателер талдауы</h2>
            {questions.map((q, i) => (
              <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "0.875rem 0", borderBottom: "1px solid #f7f9fa" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: answers[i] === q.correct ? "#dcfce7" : "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", flexShrink: 0 }}>
                  {answers[i] === q.correct ? "✓" : "✗"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1c1d1f", marginBottom: "0.25rem" }}>{q.question}</div>
                  {answers[i] !== q.correct && (
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "#dc2626", marginBottom: "0.2rem" }}>
                        Сіздің жауабыңыз: {answers[i] >= 0 ? q.options[answers[i]] : "Уақыт өтті"}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#16a34a", marginBottom: "0.2rem" }}>
                        Дұрыс жауап: {q.options[q.correct]}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#6a6f73", background: "#f7f9fa", padding: "0.5rem", borderRadius: "4px" }}>
                        💡 {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f7f9fa", fontFamily: "Inter, sans-serif" }}>
      <nav style={{ background: "white", borderBottom: "1px solid #d1d7dc", padding: "0 1rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#5624d0", textDecoration: "none" }}>IQ Math</Link>
        <Link href="/dashboard" style={{ fontSize: "0.875rem", color: "#5624d0", textDecoration: "none", fontWeight: 600 }}>Дашборд</Link>
      </nav>

      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "1.5rem 1rem" }}>

        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div style={{ fontSize: "0.875rem", color: "#6a6f73", fontWeight: 500 }}>
            Сұрақ {current + 1} / {questions.length}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "0.5rem 0.875rem" }}>
            <span style={{ fontSize: "1rem" }}>⏱</span>
            <span style={{ fontSize: "1rem", fontWeight: 800, color: timerColor }}>{timeLeft}</span>
            <span style={{ fontSize: "0.75rem", color: "#6a6f73" }}>сек</span>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div style={{ height: "6px", background: "#e5e7eb", borderRadius: "3px", marginBottom: "1.25rem", overflow: "hidden" }}>
          <div style={{ height: "100%", width: ((current + 1) / questions.length * 100) + "%", background: "#5624d0", borderRadius: "3px", transition: "width 0.3s" }}></div>
        </div>

        {/* TIMER BAR */}
        <div style={{ height: "4px", background: "#fee2e2", borderRadius: "2px", marginBottom: "1.25rem", overflow: "hidden" }}>
          <div style={{ height: "100%", width: (timeLeft / TIME_PER_QUESTION * 100) + "%", background: timerColor, borderRadius: "2px", transition: "width 1s linear" }}></div>
        </div>

        {/* QUESTION */}
        <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "1.5rem", marginBottom: "1rem" }}>
          <div style={{ fontSize: "0.75rem", color: "#5624d0", fontWeight: 700, marginBottom: "0.75rem", letterSpacing: "1px" }}>ҰБТ ФОРМАТЫ</div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1c1d1f", marginBottom: "1.25rem", lineHeight: 1.4 }}>{q.question}</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {q.options.map((opt, i) => {
              let bg = "white"
              let border = "1px solid #d1d7dc"
              let color = "#1c1d1f"
              if (selected !== null) {
                if (i === q.correct) { bg = "#dcfce7"; border = "2px solid #16a34a"; color = "#166534" }
                else if (i === selected && i !== q.correct) { bg = "#fee2e2"; border = "2px solid #dc2626"; color = "#991b1b" }
                else { bg = "#f7f9fa"; color = "#9ca3af"; border = "1px solid #e5e7eb" }
              }
              return (
                <button key={i} onClick={() => handleAnswer(i)} style={{ background: bg, border, color, padding: "0.875rem 1rem", borderRadius: "4px", textAlign: "left", cursor: selected !== null ? "default" : "pointer", fontSize: "0.9rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.75rem", transition: "all 0.15s" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", border: "2px solid currentColor", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}>
                    {["A", "B", "C", "D"][i]}
                  </span>
                  {opt}
                </button>
              )
            })}
          </div>

          {/* EXPLANATION */}
          {showExplanation && (
            <div style={{ marginTop: "1rem", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "4px", padding: "0.875rem" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#166534", marginBottom: "0.25rem" }}>💡 Түсіндірме:</div>
              <div style={{ fontSize: "0.875rem", color: "#166534" }}>{q.explanation}</div>
            </div>
          )}
        </div>

        <button
          onClick={() => handleNext()}
          disabled={selected === null}
          style={{ width: "100%", background: selected !== null ? "#5624d0" : "#e5e7eb", color: selected !== null ? "white" : "#9ca3af", padding: "0.875rem", borderRadius: "4px", fontWeight: 700, border: "none", cursor: selected !== null ? "pointer" : "not-allowed", fontSize: "1rem" }}
        >
          {current + 1 === questions.length ? "Аяқтау →" : "Келесі сұрақ →"}
        </button>

      </div>
    </main>
  )
} 