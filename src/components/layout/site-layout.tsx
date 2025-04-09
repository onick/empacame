import { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

interface SiteLayoutProps {
  children: ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
} 