import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roda da Sorte",
  description: "Tenta a tua sorte e ganha um prémio!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
