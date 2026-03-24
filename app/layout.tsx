import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linkus Newsletter",
  description: "Internal newsletter site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-serif font-bold">Linkus Newsletter</h1>
            <p className="text-gray-600 mt-1">팀 소식 및 중요 공지</p>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
