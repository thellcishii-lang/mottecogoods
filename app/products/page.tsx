// app/products/page.tsx
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";

export default function ProductsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">商品一覧</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => {
          const hasSale = p.originalPrice && p.originalPrice > p.price;
          return (
            <Link key={p.id} href={`/products/${p.id}`} className="group">
              <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover group-hover:opacity-90"
                />
              </div>
              <p className="mt-3 font-bold">{p.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={hasSale ? "text-motteco-red font-bold" : ""}>
                  ¥{p.price.toLocaleString()}
                </span>
                {hasSale && (
                  <span className="text-xs text-gray-400 line-through">
                    ¥{p.originalPrice!.toLocaleString()}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
