// app/layout.tsx
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

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
  // Organization構造化データ
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "mottECOグッズ.com",
    legalName: "the合同会社",
    url: "https://mottecogoods.com",
    logo: "https://mottecogoods.com/logo.png",
    email: "mottecogoods@gmail.com",
    address: {
      "@type": "PostalAddress",
      postalCode: "357-0123",
      addressRegion: "埼玉県",
      addressLocality: "飯能市",
      streetAddress: "中藤下郷23-21",
      addressCountry: "JP",
    },
  };

  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
    </html>
  );
}
