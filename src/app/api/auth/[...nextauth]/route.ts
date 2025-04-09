import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/types/user";

// Este es un ejemplo simple, en una implementación real
// deberías validar contra una base de datos

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

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // El nombre que se muestra en el botón de inicio de sesión
      name: "Credentials",
      // Las credenciales se utilizan para generar un formulario adecuado en la página de inicio de sesión
      credentials: {
        email: { label: "Email", type: "email", placeholder: "ejemplo@correo.com" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        // Aquí normalmente consultarías una base de datos
        // En este ejemplo, simplemente verificamos credenciales predefinidas
        
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
      // Cuando se inicia sesión, añade la información de usuario al token
      if (user) {
        token.id = user.id;
        token.role = (user as User).role;
      }
      return token;
    },
    async session({ session, token }) {
      // Envía propiedades del token al cliente
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "admin" | "customer";
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/register'
  },
});

export { handler as GET, handler as POST };