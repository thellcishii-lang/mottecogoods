// components/OrderNotice.tsx
import Link from "next/link";

export function OrderNotice({
  productName,
  price,
}: {
  productName: string;
  price: number;
}) {
  return (
    <div className="mt-10 border-t pt-6">
      <h2 className="text-lg font-bold mb-3">ご注文方法</h2>
      <p className="text-gray-700 mb-4">
        現在はメールでのご注文のみ承っております。
        下記のフォームまたはメールにて、商品名・数量・お名前・ご住所をお知らせください。
      </p>

      <div className="bg-gray-50 p-4 rounded mb-4">
        <p className="text-sm text-gray-600">商品</p>
        <p className="font-bold">{productName}</p>
        <p className="text-sm text-gray-600 mt-2">価格</p>
        <p className="font-bold">¥{price.toLocaleString()}</p>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href={`/contact?product=${encodeURIComponent(productName)}`}
          className="block text-center bg-black text-white py-3 rounded"
        >
          注文フォームへ
        </Link>
        <a
          href={`mailto:mottecogoods@gmail.com?subject=${encodeURIComponent(`【ご注文】${productName}`)}&body=${encodeURIComponent(`商品名: ${productName}\n数量: \nお名前: \nご住所: \n`)}`}
          className="block text-center border border-black py-3 rounded"
        >
          メールで注文する
        </a>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        ※ お支払い方法は銀行振込となります。在庫確認後、振込先をご連絡いたします。
      </p>
    </div>
  );
}
