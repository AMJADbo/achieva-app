import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Achieva",
  description: "Share your achievements. Earn recognition.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
