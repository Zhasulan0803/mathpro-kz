"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [accessCode, setAccessCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showCodeInput, setShowCodeInput] = useState(false)
  const router = useRouter()

  const ACCESS_CODE = "IQMATH2025"

  async function handleSubmit() {
    setLoading(true)
    setError("")

    if (!email || !password) {
      setError("Email мен паролді толтырыңыз")
      setLoading(false)
      return
    }

    if (isLogin) {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        localStorage.setItem("user", JSON.stringify(data.user))
        router.push("/")
      }
    } else {
      if (!name) {
        setError("Аты-жөніңізді жазыңыз")
        setLoading(false)
        return
      }
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        localStorage.setItem("user", JSON.stringify(data.user))
        router.push("/")
      }
    }
    setLoading(false)
  }

function handleAccessCode() {
  const code = accessCode.toUpperCase().trim()
  if (code === "BASIC2025") {
    localStorage.setItem("purchased", "true")
    localStorage.setItem("package", "basic")
    router.push("/dashboard")
  } else if (code === "FULL2025") {
    localStorage.setItem("purchased", "true")
    localStorage.setItem("package", "full")
    router.push("/dashboard")
  } else if (code === "VIP2025") {
    localStorage.setItem("purchased", "true")
    localStorage.setItem("package", "vip")
    router.push("/dashboard")
  } else {
    setError("Код қате! Мұғалімнен дұрыс код алыңыз.")
  }
}
  return (
    <main style={{ minHeight: "100vh", background: "#f7f9fa", display: "flex", flexDirection: "column", fontFamily: "Inter, sans-serif" }}>
      <nav style={{ background: "white", borderBottom: "1px solid #d1d7dc", padding: "0 1rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#5624d0", textDecoration: "none" }}>IQ Math</Link>
        <button onClick={() => { setIsLogin(!isLogin); setError("") }} style={{ color: "#5624d0", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem" }}>
          {isLogin ? "Тіркелу" : "Кіру"}
        </button>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
        <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "2rem", width: "100%", maxWidth: "420px" }}>

          {!showCodeInput ? (
            <>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "0.25rem" }}>
                {isLogin ? "Кіру" : "Тіркелу"}
              </h1>
              <p style={{ color: "#6a6f73", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                {isLogin ? "IQ Math аккаунтыңызға кіріңіз" : "Жаңа аккаунт жасаңыз"}
              </p>

              {error && (
                <div style={{ background: "#fdecea", border: "1px solid #f5c6cb", borderRadius: "4px", padding: "0.75rem", color: "#842029", fontSize: "0.875rem", marginBottom: "1rem" }}>
                  {error}
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {!isLogin && (
                  <div>
                    <label style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1c1d1f", display: "block", marginBottom: "0.375rem" }}>Аты-жөні</label>
                    <input type="text" placeholder="Аты-жөніңізді енгізіңіз" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d7dc", borderRadius: "4px", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }} />
                  </div>
                )}
                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1c1d1f", display: "block", marginBottom: "0.375rem" }}>Email</label>
                  <input type="email" placeholder="Email енгізіңіз" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d7dc", borderRadius: "4px", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1c1d1f", display: "block", marginBottom: "0.375rem" }}>Пароль</label>
                  <input type="password" placeholder={isLogin ? "Паролді енгізіңіз" : "Кемінде 6 таңба"} value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSubmit()} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d7dc", borderRadius: "4px", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }} />
                </div>
                <button onClick={handleSubmit} disabled={loading} style={{ background: "#5624d0", color: "white", padding: "0.875rem", borderRadius: "4px", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "1rem", opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Жүктелуде..." : isLogin ? "Кіру" : "Тіркелу"}
                </button>
              </div>

              <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
                <button onClick={() => { setShowCodeInput(true); setError("") }} style={{ background: "none", border: "none", color: "#5624d0", fontWeight: 700, cursor: "pointer", fontSize: "0.875rem" }}>
                  Курс коды бар ма? →
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "0.25rem" }}>Курс коды</h1>
              <p style={{ color: "#6a6f73", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                Мұғалімнен алған кодыңызды енгізіңіз
              </p>

              {error && (
                <div style={{ background: "#fdecea", border: "1px solid #f5c6cb", borderRadius: "4px", padding: "0.75rem", color: "#842029", fontSize: "0.875rem", marginBottom: "1rem" }}>
                  {error}
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1c1d1f", display: "block", marginBottom: "0.375rem" }}>Курс коды</label>
                  <input type="text" placeholder="Мысалы: IQMATH2025" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAccessCode()} style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d7dc", borderRadius: "4px", fontSize: "0.95rem", outline: "none", boxSizing: "border-box", textTransform: "uppercase", letterSpacing: "2px" }} />
                </div>
                <button onClick={handleAccessCode} style={{ background: "#5624d0", color: "white", padding: "0.875rem", borderRadius: "4px", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "1rem" }}>
                  Дашбордқа кіру →
                </button>
              </div>

              <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
                <button onClick={() => { setShowCodeInput(false); setError("") }} style={{ background: "none", border: "none", color: "#5624d0", fontWeight: 700, cursor: "pointer", fontSize: "0.875rem" }}>
                  ← Артқа оралу
                </button>
              </div>

              <div style={{ marginTop: "1.25rem", background: "#f7f9fa", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "0.875rem" }}>
                <div style={{ fontSize: "0.78rem", color: "#6a6f73", lineHeight: 1.6 }}>
                  💡 Код алу үшін WhatsApp-та хабарласыңыз:<br />
                  <a href="https://wa.me/77075687067" style={{ color: "#5624d0", fontWeight: 700 }}>+7 707 568 7067</a>
                </div>
              </div>
            </>
          )}

          <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.875rem" }}>
            <Link href="/" style={{ color: "#5624d0", fontWeight: 700, textDecoration: "none" }}>← Басты бетке оралу</Link>
          </p>
        </div>
      </div>
    </main>
  )
}   