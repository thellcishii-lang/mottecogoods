// app/products/page.tsx
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";

export default function ProductsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">商品一覧</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`} className="group">
            <Image
              src={p.images[0]}
              alt={p.name}
              width={600}
              height={600}
              className="rounded group-hover:opacity-90"
            />
            <p className="mt-3 font-bold">{p.name}</p>
            <p className="text-gray-700">¥{p.price.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
