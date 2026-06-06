"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit() {
    setLoading(true)
    setError("")
    if (isLogin) {
      router.push("/dashboard")
    } else {
      if (!name || !email || !password) {
        setError("Барлық өрістерді толтырыңыз")
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
        router.push("/dashboard")
      }
    }
    setLoading(false)
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f7f9fa", display: "flex", flexDirection: "column", fontFamily: "Inter, sans-serif" }}>

      <nav style={{ background: "white", borderBottom: "1px solid #d1d7dc", padding: "0 2rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#5624d0", textDecoration: "none" }}>IQ Math</Link>
        <button onClick={() => setIsLogin(!isLogin)} style={{ color: "#5624d0", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem" }}>
          {isLogin ? "Тіркелу" : "Кіру"}
        </button>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ background: "white", border: "1px solid #d1d7dc", borderRadius: "8px", padding: "2.5rem", width: "100%", maxWidth: "440px" }}>

          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1c1d1f", marginBottom: "0.25rem" }}>
            {isLogin ? "Кіру" : "Тіркелу"}
          </h1>
          <p style={{ color: "#6a6f73", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            {isLogin ? "IQ Math аккаунтыңызға кіріңіз" : "Жаңа аккаунт жасаңыз"}
          </p>

          {error && (
            <div style={{ background: "#fdecea", border: "1px solid #f5c6cb", borderRadius: "4px", padding: "0.75rem 1rem", color: "#842029", fontSize: "0.875rem", marginBottom: "1rem" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {!isLogin && (
              <div>
                <label style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1c1d1f", display: "block", marginBottom: "0.375rem" }}>Аты-жөні</label>
                <input
                  type="text"
                  placeholder="Аты-жөніңізді енгізіңіз"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid #d1d7dc", borderRadius: "4px", fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            )}
            <div>
              <label style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1c1d1f", display: "block", marginBottom: "0.375rem" }}>Email</label>
              <input
                type="email"
                placeholder="Email енгізіңіз"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid #d1d7dc", borderRadius: "4px", fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1c1d1f", display: "block", marginBottom: "0.375rem" }}>Пароль</label>
              <input
                type="password"
                placeholder="Пароль енгізіңіз"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid #d1d7dc", borderRadius: "4px", fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ background: "#5624d0", color: "white", padding: "0.875rem", borderRadius: "4px", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "1rem", opacity: loading ? 0.7 : 1 }}
            >
              {isLogin ? "Кіру" : "Тіркелу"}
            </button>
          </div>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem" }}>
            <Link href="/" style={{ color: "#5624d0", fontWeight: 700, textDecoration: "none" }}>Басты бетке оралу</Link>
          </p>

        </div>
      </div>

    </main>
  )
}  