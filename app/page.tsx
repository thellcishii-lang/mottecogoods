// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <div>
      {/* ヒーロー */}
      <section className="relative w-full h-[60vh] md:h-[80vh] min-h-[400px]">
        {/* 背景画像 */}
        <Image
          src="/images/hero-01.jpg"
          alt="mottECOグッズ"
          fill
          priority
          className="object-cover"
        />

        {/* 暗いオーバーレイ（文字を読みやすく） */}
        <div className="absolute inset-0 bg-black/30" />

        {/* 文字とボタン */}
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
            食べきれなかったらmottECO!!
          </h1>
          <p className="text-sm md:text-lg lg:text-xl mb-8 max-w-3xl drop-shadow-md leading-relaxed">
            環境省が推進する「mottECO」モッテコのロゴをアレンジした
            ペーパーボックスなど、mottECOグッズ満載！
          </p>
          <Link
            href="/about"
            className="inline-block bg-white/90 text-black px-6 py-3 md:px-8 md:py-4 rounded hover:bg-white transition font-bold"
          >
            MOTTECOをお店に導入してみる
          </Link>
        </div>
      </section>

      {/* 商品一覧への導線 */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">mottECOグッズ販売</h2>
        <p className="text-gray-700 mb-8">
          お店もお客様も、楽しくSDGsに参加できるグッズをお届けします。
        </p>
        <Link
          href="/products"
          className="inline-block bg-black text-white px-8 py-3 rounded"
        >
          商品を見る
        </Link>
      </section>

      {/* 商品ハイライト */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-xl font-bold mb-6">商品</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.slice(0, 6).map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="group">
              <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                {p.images[0] && (
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover group-hover:opacity-90"
                  />
                )}
              </div>
              <p className="mt-3 font-bold">{p.name}</p>
              <p className="text-gray-700">¥{p.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
