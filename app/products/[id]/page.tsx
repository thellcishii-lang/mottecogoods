// app/products/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import { OrderNotice } from "@/components/OrderNotice";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="grid gap-8">
        {product.images.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`${product.name} ${i + 1}`}
            width={800}
            height={800}
            className="rounded"
          />
        ))}
      </div>

      <h1 className="text-2xl font-bold mt-8">{product.name}</h1>
      <p className="text-xl mt-2">¥{product.price.toLocaleString()}</p>
      <p className="mt-4 text-gray-700">{product.description}</p>

      {/* ここが案2：常時表示の注文案内 */}
      <OrderNotice productName={product.name} price={product.price} />
    </div>
  );
}
