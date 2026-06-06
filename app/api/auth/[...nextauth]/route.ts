import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null
        return { id: "1", email: credentials.email, name: "User" }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
})

export { handler as GET, handler as POST } 