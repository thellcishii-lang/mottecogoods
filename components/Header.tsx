// components/Header.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/products", label: "商品一覧" },
  { href: "/about", label: "会社概要" },
  { href: "/contact", label: "ご注文・お問い合わせ" },
  { href: "/legal/tokushoho", label: "特定商取引法に基づく表記" },
  { href: "/legal/privacy", label: "プライバシーポリシー" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 md:h-24 flex items-center justify-between">
        {/* ロゴ + サイト名 + SDGs */}
        <Link href="/" className="flex items-center gap-3 md:gap-5">
          <Image
            src="/logo.png"
            alt="mottECO"
            width={80}
            height={80}
            className="h-10 md:h-16 w-auto"
          />
          <span className="font-bold text-lg md:text-2xl lg:text-3xl tracking-wide">
            mott<span className="text-motteco-red">ECO</span>goods.com
          </span>
          <Image
            src="/sdgs.png"
            alt="SDGs"
            width={80}
            height={80}
            className="h-8 md:h-12 w-auto ml-1 md:ml-2 hidden sm:block"
          />
        </Link>

        {/* メニューボタン */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
          aria-expanded={open}
          className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 border border-gray-300 rounded hover:bg-gray-50 text-sm md:text-base"
        >
          <span>メニュー</span>
          <svg
            className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* ドロップダウンメニュー */}
      {open && (
        <nav className="border-t bg-white">
          <ul className="max-w-6xl mx-auto px-4 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 px-2 text-gray-700 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
