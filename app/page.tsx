// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

const faqs = [
  {
    q: "mottECOとは何ですか？",
    a: "環境省が2020年10月9日に発表した、飲食店で食べ残した料理を持ち帰る取り組みの呼称です。「もっとエコ」「持って行こう」の意味が込められています。",
  },
  {
    q: "mottECOグッズはどこで使えますか？",
    a: "飲食店様をはじめ、小売店・イベント会場など、SDGsの取り組みを発信したい様々な場所でご活用いただけます。",
  },
  {
    q: "個人でも購入できますか？",
    a: "はい、個人のお客様もご購入いただけます。商品ページの注文フォームまたはメールにてご注文ください。",
  },
  {
    q: "注文から届くまでどのくらいかかりますか？",
    a: "ご注文から5営業日以内に発送いたします。在庫状況により前後する場合がございます。",
  },
  {
    q: "支払い方法を教えてください。",
    a: "現在は銀行振込にて承っております。ご注文後、在庫確認のうえ振込先をご案内いたします。",
  },
];

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

      <section className="max-w-3xl mx-auto px-4 py-8">
  <p className="text-gray-700 leading-relaxed">
    mottECOグッズ.comは、環境省が推進する「mottECO（モッテコ）」のオリジナルグッズを販売するサイトです。飲食店で食べ残した料理を持ち帰るためのクラフトBOXやバッグ、SNS投稿用のいいねボードなど、食品ロス削減とSDGsの取り組みを支援する商品を取り揃えています。ご注文はメールにて承っております。
  </p>
</section>

      {/* mottECOについて */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="flex justify-center md:justify-start">
            <Image
              src="/logo-01.png"
              alt="mottECO"
              width={400}
              height={400}
              className="w-64 md:w-80 h-auto"
            />
          </div>
          <div className="text-gray-700 leading-relaxed">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">
              食べきれなかったら　mott<span className="text-motteco-red">ECO</span>!!
            </h2>
            <p className="mb-4">
              環境省は2020年10月9日、飲食店で食べ残した料理を持ち帰る取り組みを「もっとエコ」「持って行こう」との意味が込められているという「mott<span className="text-motteco-red">ECO</span>（モッテコ）」の呼称で普及させていくと発表いたしました。
            </p>
            <p className="mb-4">
              まだ食べられるのに捨てられる食品（食品ロス）の削減につながる。食品ロスは国内で年600万トンを超え、政府は10月を削減月間として対策を進めています。
            </p>
            <p className="mb-4">
              環境省では<span className="font-bold">SDGs</span>
              (エスディージーズ)の一助として、取り組みを呼びかけおります。
            </p>
            <p className="mb-4">
              皆さんで、身近なことからSDGsの取り組みに参加していきましょう！
            </p>
            <p className="mb-6">
              商品についてのご質問などお問い合わせに関しましてはmailにて受付しております。
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
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
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
        </div>
      </section>

      {/* 商品ハイライト */}
<section className="max-w-5xl mx-auto px-4 pb-16">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* 左：スタートアップキット */}
    <div className="flex flex-col">
      <div className="aspect-square overflow-hidden rounded mb-4">
        <Image
          src="/images/product-kit.jpg"
          alt="mottECOグッズスタートアップキット"
          width={800}
          height={800}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-bold mb-3">
        mott<span className="text-motteco-red">ECO</span>グッズスタートアップキット　色々お得が満載！
      </h3>
      <div className="text-sm text-gray-700 leading-relaxed mb-4 space-y-3">
        <p>
          mott<span className="text-motteco-red">ECO</span>をお店に導入しようと考える店舗様必見！
        </p>
        <p>
          今ならスタートアップキットでお得にポスターや店頭に貼れるmott
          <span className="text-motteco-red">ECO</span>シールなど、持ち帰りの紙袋などお得にいたセットがスタートアップキットとしてご用意しております。今だけの特別価格になりますので、お早めにご注文ください！
        </p>
      </div>
      <Link
        href="/contact"
        className="mt-auto inline-block text-center border border-black px-4 py-3 text-sm rounded hover:bg-gray-50"
      >
        MOTTECOをお店に導入してみる
      </Link>
    </div>

    {/* 中：エコクラフトBOX */}
    <div className="flex flex-col">
      <div className="aspect-square overflow-hidden rounded mb-4">
        <Image
          src="/images/product-craftbox.jpg"
          alt="mottECOエコクラフトBOX"
          width={800}
          height={800}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-bold mb-3">
        mott<span className="text-motteco-red">ECO</span>エコクラフトBOX 1枚あたりなら50円!!
      </h3>
      <div className="text-sm text-gray-700 leading-relaxed mb-4 space-y-3">
        <p>
          mott<span className="text-motteco-red">ECO</span>のロゴ印刷でわかりやすく裏面には持ち帰りに関する注意事項などの記載もあり、安心して持ち帰りをして頂く事が可能です。
        </p>
        <p>
          また、持ち帰った後に消費者様により食品ロスへの関心、SDGsの取り組みへの関心を広く周知して頂くための一助となり、店舗様と共にmott
          <span className="text-motteco-red">ECO</span>
          における食品ロスへの問題に取り組んでいただきやすいように弊社では取り組んでおります。
        </p>
      </div>
      <Link
        href="/products"
        className="mt-auto inline-block text-center border border-black px-4 py-3 text-sm rounded hover:bg-gray-50"
      >
        MOTTECOクラフトBOXを見てみる
      </Link>
    </div>

    {/* 右：クラフトバッグ */}
    <div className="flex flex-col">
      <div className="aspect-square overflow-hidden rounded mb-4">
        <Image
          src="/images/product-bag.jpg"
          alt="mottECOクラフトバッグ"
          width={800}
          height={800}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-bold mb-3">
        mott<span className="text-motteco-red">ECO</span>クラフトバッグ
      </h3>
      <div className="text-sm text-gray-700 leading-relaxed mb-4 space-y-3">
        <p>
          食べきれなかったら「mott<span className="text-motteco-red">ECO</span>」（モッテコ）！！みんなでmott
          <span className="text-motteco-red">ECO</span>してます！をインスタにあげちゃおう！
        </p>
        <p>
          mott<span className="text-motteco-red">ECO</span>
          いいねボード投稿で、お得なキャンペーン準備中！
        </p>
        <p>今から始めよう！mott<span className="text-motteco-red">ECO</span>いいね投稿！</p>
        <p>乗り遅れないでね！</p>
      </div>
      <Link
        href="/products"
        className="mt-auto inline-block text-center border border-black px-4 py-3 text-sm rounded hover:bg-gray-50"
      >
        MOTTECOクラフトバッグを見てみる
      </Link>
    </div>
  </div>
</section>

      {/* SNS投稿セクション */}
      <section className="relative w-full h-[40vh] md:h-[50vh] min-h-[300px]">
        <Image
          src="/images/sns-banner.jpg"
          alt="mottECOいいねボードでSNS投稿"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
            mott<span className="text-motteco-red">ECO</span>いいねボードでSNS投稿！
          </h2>
          <p className="text-sm md:text-lg drop-shadow-md">
            mott<span className="text-motteco-red">ECO</span>いいねボードを使って、SNS投稿！
          </p>
          <p className="text-sm md:text-lg drop-shadow-md mt-1">
            お客様もSDGsの仲間入り！
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">よくあるご質問</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="border rounded-lg p-4 group"
            >
              <summary className="font-bold cursor-pointer flex items-start gap-3 list-none">
                <span className="text-motteco-red shrink-0">Q.</span>
                <span className="flex-1">{faq.q}</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0">
                  ▼
                </span>
              </summary>
              <div className="mt-3 flex items-start gap-3 text-gray-700">
                <span className="text-gray-400 shrink-0">A.</span>
                <p className="flex-1">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

   {/* 関連サービス（Push-taro / 代理店） */}
<section className="py-16 md:py-20 px-4 bg-[#0a0a0a]">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

    {/* 左：Push-taro */}
    <a
      href="https://push-taro.com"
      target="_blank"
      rel="noopener noreferrer"
      className="relative overflow-hidden block py-10 md:py-12 px-6 md:px-10 text-center group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1428] via-[#1a0f1f] to-[#5a1a1a]" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />

      <div className="relative z-10">
        <span className="inline-block bg-red-600/20 border border-red-500/40 text-red-300 text-[10px] md:text-xs px-3 py-1 rounded-full mb-4">
          2026年9月サービス開始予定・先行登録受付中
        </span>
        <h3 className="text-xl md:text-3xl lg:text-4xl font-black leading-tight text-white mb-5">
          既存客のリピートを、<br />
          <span className="text-[#ff5722]">"プッシュ通知 × CRM"</span>で仕組化。
        </h3>
        <span className="inline-flex items-center gap-2 bg-[#ff5722] group-hover:bg-[#e64a19] transition text-white font-bold px-6 py-3 text-sm md:text-base rounded">
          Push-taroを詳しく見る →
        </span>
      </div>
    </a>

    {/* 右：代理店 */}
    <a
      href="https://push-taro.com/partners"
      target="_blank"
      rel="noopener noreferrer"
      className="relative overflow-hidden block py-10 md:py-12 px-6 md:px-10 text-center group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1428] via-[#1a0f1f] to-[#5a1a1a]" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />

      <div className="relative z-10">
        <span className="inline-block bg-red-600/20 border border-red-500/40 text-red-300 text-[10px] md:text-xs px-3 py-1 rounded-full mb-4">
          2026年9月正式リリース予定・先行登録受付中
        </span>
        <h3 className="text-xl md:text-3xl lg:text-4xl font-black leading-tight text-white mb-5">
          みんなで広げる、<br />
          <span className="text-[#ff5722]">ストック収益</span>の新時代
        </h3>
        <span className="inline-flex items-center gap-2 bg-[#ff5722] group-hover:bg-[#e64a19] transition text-white font-bold px-6 py-3 text-sm md:text-base rounded">
          代理店プログラムを見る →
        </span>
      </div>
    </a>

  </div>
</section>

      {/* 3枚画像セクション */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="aspect-square overflow-hidden rounded">
            <Image
              src="/images/collage-01.jpg"
              alt="mottECOグッズを使う様子"
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded">
            <Image
              src="/images/collage-04.jpg"
              alt="mottECOロゴ"
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded">
            <Image
              src="/images/collage-03.jpg"
              alt="mottECOいいねボードを持つ様子"
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
