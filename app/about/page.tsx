// app/about/page.tsx
import Link from "next/link";

export const metadata = {
  title: "mottECOグッズ販売について | mottECOグッズ.com",
  description:
    "mottECOの取り組みに、お店もお客様も楽しく参加できる。mottECOグッズ.comは環境省に問い合わせてスタートしたSDGsプロジェクトです。",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-2">オリジナルmottECOグッズ販売</h1>
      <p className="text-gray-500 mb-10">mottECOグッズ販売に向けて</p>

      <div className="prose prose-gray max-w-none">
        <p>
          昨今、世界的に異常気象などにより環境問題などが非常に注目されている中、SDGsへの取り組みが加速しております。そうした中でこのmottECOの取り組みを知り、環境省に問い合わせさせて頂きまして事業をスタートしました。
        </p>

        <p>
          お店だけでなくお客様も楽しくmottECOの取り組みに参加できるようにSNSなどに活用しやすくする為、mottECOいいねボードを可愛くデザインして作成しました。このmottECOいいねボードを使いSNSで楽しく投稿などしていただけたらと思っております。店舗様にもお客様と一緒に楽しみながらmottECOを推進していければと思います。
        </p>

        <p>
          是非、皆様でmottECOを盛り上げていただき、これを機に皆様で環境問題への意識が高められたらと期待しながら、弊社でも精一杯mottECOの普及の一助となれますよう頑張って参ります。
        </p>

        <p>今後とも、mottECOグッズ.comをよろしくお願い致します。</p>
      </div>

      {/* 会社情報 */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-lg font-bold mb-4">会社情報</h2>
        <dl className="space-y-2 text-gray-700">
          <div className="flex">
            <dt className="w-24 font-bold">会社名</dt>
            <dd>the合同会社</dd>
          </div>
          <div className="flex">
            <dt className="w-24 font-bold">所在地</dt>
            <dd>〒357-0123 埼玉県飯能市中藤下郷23-21</dd>
          </div>
          <div className="flex">
            <dt className="w-24 font-bold">メール</dt>
            <dd>
              <a href="mailto:mottecogoods@gmail.com" className="underline">
                mottecogoods@gmail.com
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Link
          href="/products"
          className="text-center bg-black text-white px-6 py-3 rounded"
        >
          商品を見る
        </Link>
        <Link
          href="/contact"
          className="text-center border border-black px-6 py-3 rounded"
        >
          お問い合わせ
        </Link>
      </div>
    </div>
  );
}
