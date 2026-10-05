// app/about/page.tsx
import Link from "next/link";

export const metadata = {
  title: "オリジナルmottECOグッズ販売について | mottECOグッズ.com",
  description:
    "環境省が推進する「mottECO」の普及に向け、オリジナルグッズを企画・販売しています。食品ロス削減とSDGsの達成に資する事業活動を通じて、持続可能な社会の実現に貢献します。",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-2">オリジナルmottECOグッズ販売</h1>
      <p className="text-gray-500 mb-10">mottECOグッズ販売に向けて</p>

      <div className="prose prose-gray max-w-none">
        <p>
          近年、気候変動をはじめとする地球規模の環境問題が深刻化する中、
          持続可能な開発目標（SDGs）の達成に向けた取り組みが、
          国際社会において喫緊の課題となっております。我が国においても、
          食品ロスの削減は重要な政策課題の一つとして位置づけられ、
          消費者・事業者・行政が一体となった取り組みが進められております。
        </p>

        <p>
          環境省は、令和2年（2020年）10月に「Newドギーバッグアイデアコンテスト」を開催し、
          飲食店で食べ残した料理を持ち帰る行為の新たな名称として
          「mottECO（モッテコ）」を選定いたしました。この名称には
          「もっとエコ」「持って帰ろう」というメッセージが込められており、
          食べ残しを持ち帰ることで、美味しさへの笑顔、無駄のなさへの笑顔、
          環境への貢献への笑顔——人々が笑顔になることを表現したロゴマークも
          作成されております。
        </p>

        <p>
          食品ロスをめぐる状況は、依然として深刻です。農林水産省及び環境省の推計によれば、
          令和6年度（2024年度）の国内食品ロス量は約461万トンに上り、
          そのうち事業系食品ロスが約237万トン、家庭系食品ロスが約224万トンとされています。
          また、食品ロスによる経済損失は年間約3.8兆円、
          温室効果ガス排出量は約978万トン-CO2と推計されており、
          環境面・経済面の双方から対策が急務となっております。
        </p>

        <p>
          このような社会的背景を踏まえ、当社はmottECOの取り組みに着目し、
          環境省への問い合わせを経て、令和3年（2021年）8月より
          オリジナルグッズの企画・販売事業を開始いたしました。
          食品ロス削減とSDGsの達成に資する事業活動を通じて、
          持続可能な社会の実現に貢献することを目指しております。
        </p>

        <p>
          当社が企画・販売するmottECOクラフトBOXは、
          環境に配慮したFSC認証紙を使用し、持ち帰りの注意事項を裏面に記載することで、
          消費者が安心して食品を持ち帰ることができるよう設計しております。
          また、クラフトBOXが横にならずに収まる専用のクラフトバッグや、
          店舗導入に必要な資材を一式揃えたスタートアップキットなど、
          飲食店様の導入ハードルを下げる商品ラインナップを展開しております。
        </p>

        <p>
          環境省では、2030年度までに2000年度比で家庭系食品ロス量を半減、
          事業系食品ロスを60%削減することを目標として掲げております。
          また、SDGsの目標12.3においても、2030年までに小売・消費レベルにおける
          世界全体の一人当たりの食料廃棄を半減させることが定められております。
        </p>

        <p>
          当社は、これらの目標達成の一助となるべく、
          mottECOグッズの普及を通じて、飲食店様とお客様が共に
          食品ロス削減に参加できる仕組みを提供してまいります。
          一人ひとりの小さな行動が、環境問題への意識を高め、
          持続可能な社会の実現につながると信じております。
        </p>

        <p>
          今後とも、mottECOグッズ.comをよろしくお願い申し上げます。
        </p>
      </div>

      {/* 会社情報 */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-lg font-bold mb-4">会社情報</h2>
        <dl className="space-y-2 text-gray-700">
          <div className="flex">
            <dt className="w-24 font-bold">運営会社</dt>
            <dd>the合同会社</dd>
          </div>
          <div className="flex">
            <dt className="w-24 font-bold">所在地</dt>
            <dd>〒357-0123 埼玉県飯能市中藤下郷23-21</dd>
          </div>
          <div className="flex">
            <dt className="w-24 font-bold">メール</dt>
            <dd>
              <a href="mailto:info@mottecogoods.com" className="underline">
                info@mottecogoods.com
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
