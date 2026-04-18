import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Puja Midde - AI Portfolio",
  description:
    "Applied AI and Machine Learning portfolio with cinematic 3D experience, project case studies, and verified internship achievements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
