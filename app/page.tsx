// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <div>
      {/* ヒーロー */}
      <section className="relative w-full">
        <Image
          src="/images/hero-01.jpg"
          alt="mottECOグッズ"
          width={1920}
          height={1080}
          priority
          className="w-full h-auto"
        />
      </section>

      {/* 商品一覧への導線 */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">
          mottECOグッズ販売
        </h1>
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
