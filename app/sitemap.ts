// app/sitemap.ts
import { MetadataRoute } from "next";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mottecogoods.com";

  // 固定ページ
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/legal/tokushoho`, lastModified: new Date(), priority: 0.3 },
    { url: `${baseUrl}/legal/privacy`, lastModified: new Date(), priority: 0.3 },
  ];

  // 商品ページ
  const productPages = products.map((p) => ({
    url: `${baseUrl}/products/${p.id}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
