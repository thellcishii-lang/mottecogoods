// app/contact/page.tsx
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage({
  searchParams,
}: {
  searchParams: { product?: string };
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">ご注文・お問い合わせ</h1>
      <p className="text-gray-700 mb-8">
        下記フォームにご記入ください。在庫確認後、折り返しご連絡いたします。
      </p>
      <ContactForm defaultProduct={searchParams.product} />
    </div>
  );
}
