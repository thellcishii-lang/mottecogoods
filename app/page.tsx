// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <div>
      {/* ヒーロー */}
<section className="relative w-full h-[60vh] md:h-[80vh] min-h-[400px]">
  <Image
    src="/images/hero-01.jpg"
    alt="mottECOグッズ"
    fill
    priority
    className="object-cover"
  />
  <div className="absolute inset-0 bg-black/30" />

  <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
      食べきれなかったら
      <br className="md:hidden" />
      mott<span className="text-motteco-red">ECO</span>!!
    </h1>
    <p className="text-sm md:text-lg lg:text-xl mb-8 max-w-3xl drop-shadow-md leading-relaxed">
      環境省が推進する「mott<span className="text-motteco-red">ECO</span>」
      モッテコのロゴをアレンジした
      ペーパーボックスなど、mott<span className="text-motteco-red">ECO</span>グッズ満載！
    </p>
    <Link
      href="/about"
      className="inline-block bg-white/90 text-black px-6 py-3 md:px-8 md:py-4 rounded hover:bg-white transition font-bold"
    >
      MOTTECOをお店に導入してみる
    </Link>
  </div>
</section>

      // app/page.tsx のヒーローの下に追加
<section className="max-w-5xl mx-auto px-4 py-16">
  <div className="grid md:grid-cols-2 gap-10 items-start">
    {/* 左：ロゴ */}
    <div className="flex justify-center md:justify-start">
      <Image
        src="/logo.png"
        alt="mottECO"
        width={400}
        height={400}
        className="w-64 md:w-80 h-auto"
      />
    </div>

    {/* 右：説明文 */}
    <div className="text-gray-700 leading-relaxed">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">
        食べきれなかったら　mott<span className="text-motteco-red">ECO</span>!!
      </h2>

      <p className="mb-4">
        環境省は2020年10月9日、飲食店で食べ残した料理を持ち帰る取り組みを
        「もっとエコ」「持って行こう」との意味が込められているという
        「mott<span className="text-motteco-red">ECO</span>（モッテコ）」の呼称で普及させていくと発表いたしました。
      </p>

      <p className="mb-4">
        まだ食べられるのに捨てられる食品（食品ロス）の削減につながる。食品ロスは国内で年600万トンを超え、政府は10月を削減月間として対策を進めています。
      </p>

      <p className="mb-4">
        環境省では
        <span className="font-bold">SDGs</span>
        (エスディージーズ)の一助として、取り組みを呼びかけおります。
      </p>

      <p className="mb-4">
        皆さんで、身近なことからSDGsの取り組みに参加していきましょう！
      </p>

      <p className="mb-6">
        商品についてのご質問などお問わせに関しましてはmailにて受付しております。
      </p>

      <p className="font-bold">
        <a href="mailto:mottecogoods@gmail.com" className="underline">
          mottecogoods@gmail.com
        </a>
      </p>
    </div>
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
