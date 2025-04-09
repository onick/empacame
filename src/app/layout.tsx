import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tienda Online | Moda, Bolsos y Accesorios",
  description: "Descubre nuestra colección exclusiva de bolsos, accesorios y ropa. Diseños modernos y elegantes para todos los estilos.",
  keywords: ["tienda online", "bolsos", "accesorios", "moda", "personalización", "regalos"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
