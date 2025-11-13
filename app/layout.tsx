import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blockbuster Video Store - 3D Experience",
  description: "A nostalgic 3D simulation of a classic Blockbuster video store",
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
