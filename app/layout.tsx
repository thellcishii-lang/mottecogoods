import "./globals.css";
import { Footer } from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
