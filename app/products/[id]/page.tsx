// app/products/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/products";
import { OrderNotice } from "@/components/OrderNotice";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  const hasSale =
    product.originalPrice !== undefined && product.originalPrice > product.price;

  // ▼① Product構造化データ（Googleに商品情報を伝える）
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((img) => `https://mottecogoods.com${img}`),
    offers: {
      "@type": "Offer",
      url: `https://mottecogoods.com/products/${product.id}`,
      priceCurrency: "JPY",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "the合同会社",
      },
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* 構造化データ（画面には表示されない） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="grid md:grid-cols-2 gap-10">
        {/* 左：画像ギャラリー */}
        <div>
          <div className="aspect-square overflow-hidden rounded bg-gray-50 mb-3">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1).map((src, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded bg-gray-50 border"
                >
                  <Image
                    src={src}
                    alt={`${product.name} ${i + 2}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 右：商品情報 */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-2">
            <span
              className={`text-2xl font-bold ${
                hasSale ? "text-motteco-red" : ""
              }`}
            >
              ¥{product.price.toLocaleString()}
            </span>
            {hasSale && (
              <>
                <span className="text-gray-400 line-through">
                  ¥{product.originalPrice!.toLocaleString()}
                </span>
                <span className="bg-motteco-red text-white text-xs px-2 py-1 rounded">
                  セール
                </span>
              </>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-6">税込</p>

          <OrderNotice productName={product.name} price={product.price} />

          <div className="mt-8 space-y-4">
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {product.details && (
              <div className="border-t pt-4 mt-4">
                <h2 className="font-bold mb-2">商品詳細</h2>
                <p className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                  {product.details}
                </p>
              </div>
            )}

            {product.note && (
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-sm text-gray-700">
                <p className="whitespace-pre-wrap">※{product.note}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ▼② 商品ページ下部のFAQ */}
      <section className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-center">よくあるご質問</h2>
        <div className="space-y-3">
          <details className="border rounded-lg p-4">
            <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
              <span>配送料はいくらですか？</span>
              <span className="text-gray-400">▼</span>
            </summary>
            <p className="mt-3 text-gray-700 text-sm leading-relaxed">
              配送料はお客様のご負担となります。ご注文後、在庫確認のうえ送料をご案内いたします。
            </p>
          </details>

          <details className="border rounded-lg p-4">
            <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
              <span>支払い方法を教えてください。</span>
              <span className="text-gray-400">▼</span>
            </summary>
            <p className="mt-3 text-gray-700 text-sm leading-relaxed">
              現在は銀行振込にて承っております。ご注文後、在庫確認のうえ振込先をご案内いたします。振込手数料はお客様のご負担となります。
            </p>
          </details>

          <details className="border rounded-lg p-4">
            <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
              <span>注文から届くまでどのくらいかかりますか？</span>
              <span className="text-gray-400">▼</span>
            </summary>
            <p className="mt-3 text-gray-700 text-sm leading-relaxed">
              ご注文から5営業日以内に発送いたします。在庫状況により前後する場合がございます。
            </p>
          </details>

          <details className="border rounded-lg p-4">
            <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
              <span>返品はできますか？</span>
              <span className="text-gray-400">▼</span>
            </summary>
            <p className="mt-3 text-gray-700 text-sm leading-relaxed">
              業務用につき基本返品不可とさせていただいております。但し、不良品につきましては交換させていただきますが、ご購入から15日以内とさせていただきます。
            </p>
          </details>

          <details className="border rounded-lg p-4">
            <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
              <span>大量注文はできますか？</span>
              <span className="text-gray-400">▼</span>
            </summary>
            <p className="mt-3 text-gray-700 text-sm leading-relaxed">
              はい、承っております。6ケース以上ご注文の場合は、mottecogoods@gmail.com まで直接お問い合わせください。
            </p>
          </details>
        </div>
      </section>

      {/* 戻るリンク */}
      <div className="mt-12 text-center">
        <Link href="/products" className="text-sm underline text-gray-600">
          ← 商品一覧へ戻る
        </Link>
      </div>
    </div>
  );
}
