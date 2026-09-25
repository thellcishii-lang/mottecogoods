// app/legal/tokushoho/page.tsx
export const metadata = {
  title: "特定商取引法に基づく表記 | mottECOグッズ.com",
};

const items = [
  { label: "販売業者", value: "mottECOグッズ.com the合同会社" },
  { label: "代表責任者", value: "石井康仁" },
  {
    label: "所在地",
    value: "〒357-0123 埼玉県飯能市中藤下郷２３−２１",
  },
  { label: "電話番号", value: "050-5891-3992" },
  { label: "メールアドレス", value: "mottecogoods@gmail.com" },
  { label: "販売価格", value: "商品ごとに明記" },
  {
    label: "商品代金以外の必要料金",
    value: "配送料をご負担いただきます。",
  },
  { label: "支払方法および支払の時期", value: "注文時" },
  { label: "商品の引渡時期", value: "注文から５営業日以内に発送" },
  { label: "商品の引渡方法", value: "配送" },
  {
    label: "返品・不良品・キャンセルについて",
    value:
      "業務用につき基本返品不可とさせていただいております。但し、不良品につきましては交換させていただきますがご購入から１５日以内とさせていただきます。またその際の送料に関しましてはご負担いただきます。キャンセルにつきましては、発送前の場合のみ受付いたします。",
  },
];

export default function TokushohoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">
        特定商取引法に基づく表記
      </h1>

      <dl className="divide-y border-t border-b">
        {items.map((item) => (
          <div key={item.label} className="grid grid-cols-1 md:grid-cols-3 gap-2 py-4">
            <dt className="font-bold text-gray-800">{item.label}</dt>
            <dd className="md:col-span-2 text-gray-700 whitespace-pre-wrap">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="text-sm text-gray-500 mt-8">
        制定日：{new Date().toLocaleDateString("ja-JP")}
      </p>
    </div>
  );
}
