import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "김승훈 | Frontend Developer",
  description:
    "문제를 구조와 사용자 경험으로 해결해 온 프론트엔드 개발자 김승훈의 포트폴리오입니다.",
  openGraph: {
    title: "김승훈 | Frontend Developer",
    description: "문제를 구조와 사용자 경험으로 해결해 온 프론트엔드 개발자",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
        <ThemeProvider>
          <Nav />
          <main className="max-w-3xl mx-auto px-6 py-16">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
