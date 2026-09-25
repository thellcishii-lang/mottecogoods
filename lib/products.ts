// lib/products.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  details?: string;
  note?: string;
  images: string[];
};

export const products: Product[] = [
  {
    id: "craftbox",
    name: "mottECOオリジナルクラフトBOX",
    price: 11000,
    originalPrice: 12100,
    description: `mottECOグッズ.comのオリジナルデザインのクラフトBOX。

持ち帰りの注意事項などを裏面に記載して、お客様に安全にmottECOしていただけるようデザインしてあります。1枚あたり55円税抜！

白とmottECOの赤でツートンデザインで可愛く仕上げてあります。

蓋はカギになって引っかかるようになっておりますが、紙の上から止められるシールも環境省の方でデザインされていたので、48枚のシールが1シートにつくったシールも5シート付いてきます。

【ポスター特典】
ご購入いただいたお客様に、下記を無料でお付けしております。
・ポスター店舗様用
・お客様向け注意ポスター「安全においしくいただくためのお約束」
・店内用シール`,
    details: `サイズ（全て内寸）　底面 115×150mm　上面 133×170mm　深さ60mm
内容量　1400ml
数量　200枚入り　@55税抜
mottECOシール　5シート入り　1シートあたり48枚シール付き`,
    note: "注文数が多い場合、「配送はご利用いただけません」という表記が出て注文ができません。6ケース以上ご注文の場合は、mottecogoods@gmail.comよりお問い合わせください。",
    images: [
      "/images/craftbox-01.jpg",
      "/images/craftbox-02.jpg",
      "/images/craftbox-03.jpg",
    ],
  },
  {
    id: "craftbag",
    name: "mottECOオリジナルクラフトバッグ",
    price: 6600,
    description: `mottECOグッズ.comオリジナルのクラフトバッグ。

mottECOグッズオリジナルクラフトBOXが横にしないでスッポリ！

せっかくの持ち帰りが溢れてしまったり、中でぐちゃぐちゃになってしまったら、食べるのが・・・そんな思いからmottECOグッズ.comでは、クラフトBOXが横にならずにスッポリ入り、また、持って帰るのが嬉しくなるよう可愛いデザインに仕上げました！また、持ち帰った後も丁度いい大きさで何かと重宝するようしっかりとした素材で製作してあります。`,
    details: `サイズ　内寸 160mm × 250mm　深さ 200mm
数量　50枚入り　@120税別`,
    note: "注文数が多い場合、「配送はご利用いただけません」という表記が出て注文ができません。6ケース以上ご注文の場合は、mottecogoods@gmail.comよりお問い合わせください。",
    images: [
      "/images/craftbag-01.jpg",
      "/images/craftbag-02.jpg",
      "/images/craftbag-03.jpg",
    ],
  },
  {
    id: "startup-kit",
    name: "mottECOスタートアップキット",
    price: 22000,
    originalPrice: 30200,
    description: `mottECOを導入しようとしている店舗様必見！

mottECOスタートアップキットなら、お得にmottECOが始められます！

mottECOを始めるにあたり、店頭シールや店内ポスターなどもないとお客様に認知してもらえないですよね！そこでmottECOグッズ.comではそういったポスターなど必要なものを揃えたセットがお得にご購入いただけます。`,
    details: `【セット内容】
mottECOクラフトBOX　200枚
mottECOクラフトBAG　100枚
mottECOシール　5シート　防水仕様
店内ポスター　2枚
　└ ポスター店舗様用
　└ お客様向け注意ポスター「安全においしくいただくためのお約束」
店頭シール　1枚　防水仕様
　└ お店の入り口などに貼ることができます。
mottECOいいねボード　2枚

【価格】
通常30,200円相当
特別価格 ¥23,100円
さらに今なら ¥22,000円！`,
    note: "注文数が多い場合、「配送はご利用いただけません」という表記が出て注文ができません。3ケース以上ご注文の場合は、mottecogoods@gmail.comよりお問い合わせください。",
    images: [
      "/images/startup-kit-01.jpg",
      "/images/startup-kit-02.jpg",
    ],
  },
  {
    id: "sample-kit",
    name: "mottECOサンプルキット",
    price: 100,
    originalPrice: 1100,
    description: `mottECOグッズ.comの商品をまずは考えたい！

もし方にサンプルキットを100円にてご用意しております。

送料はご負担いただきます。

mottECOクラフトボックス 5個　mottECOクラフトバッグ 2枚

サンプルでご注文のお客様で本注文でクラフトボックス1000枚以上のご注文でサンプル代金（1100円税込送料込み）をお値引きいたします。`,
    images: [
      "/images/sample-kit-01.jpg",
      "/images/sample-kit-02.jpg",
      "/images/sample-kit-03.jpg",
    ],
  },
];
