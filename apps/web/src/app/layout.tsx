import type { Metadata } from "next";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Achieva — Partage tes réussites",
  description: "Le réseau social de tes accomplissements. Publie, gagne des tokens, grimpe dans le classement.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
