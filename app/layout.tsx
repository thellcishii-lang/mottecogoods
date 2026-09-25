// app/layout.tsx
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "mottECOグッズ.com",
  description:
    "環境省が推進するmottECOのオリジナルグッズ販売。お店もお客様も楽しくSDGsに参加できるグッズをお届けします。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
