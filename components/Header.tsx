// components/Header.tsx
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="mottECO"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="font-bold text-lg tracking-wide">
            mott<span className="text-motteco-red">ECO</span>goods.com
          </span>
          <Image
            src="/sdgs.png"
            alt="SDGs"
            width={40}
            height={40}
            className="h-8 w-auto ml-2"
          />
        </Link>
      </div>
    </header>
  );
}
