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
    product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
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

          {/* 注文案内（OrderNoticeをコンパクト化して配置） */}
          <OrderNotice productName={product.name} price={product.price} />

          {/* 商品説明 */}
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

      {/* 戻るリンク */}
      <div className="mt-12 text-center">
        <Link href="/products" className="text-sm underline text-gray-600">
          ← 商品一覧へ戻る
        </Link>
      </div>
    </div>
  );
}
