import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/types/user";

// Usuarios de prueba
const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Customer User",
    email: "customer@example.com",
    role: "customer",
    createdAt: new Date(),
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "ejemplo@correo.com" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Para propósitos de demostración/desarrollo
        if (credentials.email === "admin@example.com" && credentials.password === "admin123") {
          return users[0];
        } else if (credentials.email === "customer@example.com" && credentials.password === "customer123") {
          return users[1];
        }

        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as User).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "admin" | "customer";
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
