// components/Footer.tsx
import Link from "next/link";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/products", label: "商品一覧" },
  { href: "/about", label: "会社概要" },
  { href: "/contact", label: "ご注文・お問い合わせ" },
  { href: "/legal/tokushoho", label: "特定商取引法に基づく表記" },
  { href: "/legal/privacy", label: "プライバシーポリシー" },
];

export function Footer() {
  return (
    <footer className="border-t mt-20 py-10 text-sm text-gray-600">
      <div className="max-w-5xl mx-auto px-4">
        <ul className="flex flex-wrap gap-x-6 gap-y-3 mb-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} mottECOグッズ.com（運営：the合同会社）
        </p>
      </div>
    </footer>
  );
}
