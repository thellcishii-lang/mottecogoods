// components/Footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-20 py-8 text-sm text-gray-600">
      <div className="max-w-5xl mx-auto px-4 flex flex-wrap gap-6">
        <Link href="/about">About</Link>
        <Link href="/products">商品一覧</Link>
        <Link href="/contact">ご注文・お問い合わせ</Link>
        <Link href="/legal/tokushoho">特定商取引法に基づく表記</Link>
      </div>
      <p className="max-w-5xl mx-auto px-4 mt-4 text-xs text-gray-400">
        © {new Date().getFullYear()} mottECOグッズ.com the合同会社
      </p>
    </footer>
  );
}
