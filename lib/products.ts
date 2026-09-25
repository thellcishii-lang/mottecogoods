// lib/products.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
};

export const products: Product[] = [
  {
    id: "item-1",
    name: "商品A",
    price: 3000,
    description: "商品Aの説明文。",
    images: ["/images/item-1-a.jpg", "/images/item-1-b.jpg"],
  },
  {
    id: "item-2",
    name: "商品B",
    price: 1500,
    description: "商品Bの説明文。",
    images: ["/images/item-2.jpg"],
  },
];
