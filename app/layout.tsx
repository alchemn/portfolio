import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ardiansyah Putra - Full Stack Developer & UI/UX Designer",
  description: "Professional portfolio showcasing web development projects, UI/UX design work, and creative digital experiences. Specializing in React, Next.js, and modern web technologies.",
  keywords: ["Ardiansyah Putra", "Full Stack Developer", "UI/UX Designer", "Web Development", "React", "Next.js", "Portfolio", "Frontend", "Backend"],
  authors: [{ name: "Ardiansyah Putra" }],
  openGraph: {
    title: "Ardiansyah Putra - Full Stack Developer & UI/UX Designer",
    description: "Professional portfolio showcasing web development projects and UI/UX design work",
    url: "https://johndoe.dev",
    siteName: "Ardiansyah Putra Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ardiansyah Putra - Full Stack Developer & UI/UX Designer",
    description: "Professional portfolio showcasing web development projects and UI/UX design work",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="dark"
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}