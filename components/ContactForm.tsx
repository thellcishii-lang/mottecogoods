// components/ContactForm.tsx
"use client";
import { useState } from "react";

export function ContactForm({ defaultProduct }: { defaultProduct?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch("https://formspree.io/f/xxxxxxx", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      setStatus("done");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="bg-green-50 p-6 rounded">
        <p className="font-bold">送信しました</p>
        <p className="text-gray-700 mt-2">
          折り返しご連絡いたします。しばらくお待ちください。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="_subject" value="【mottecogoods】ご注文" />

      <label>
        <span className="block text-sm mb-1">お名前 *</span>
        <input
          name="name"
          required
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label>
        <span className="block text-sm mb-1">メールアドレス *</span>
        <input
          name="email"
          type="email"
          required
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label>
        <span className="block text-sm mb-1">お電話番号</span>
        <input name="phone" className="w-full border rounded px-3 py-2" />
      </label>

      <label>
        <span className="block text-sm mb-1">ご住所 *</span>
        <input
          name="address"
          required
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label>
        <span className="block text-sm mb-1">ご注文商品 *</span>
        <input
          name="product"
          required
          defaultValue={defaultProduct}
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label>
        <span className="block text-sm mb-1">数量 *</span>
        <input
          name="quantity"
          type="number"
          min={1}
          defaultValue={1}
          required
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label>
        <span className="block text-sm mb-1">備考</span>
        <textarea
          name="message"
          rows={4}
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-black text-white py-3 rounded disabled:opacity-50"
      >
        {status === "sending" ? "送信中..." : "送信する"}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-sm">
          送信に失敗しました。時間をおいて再度お試しください。
        </p>
      )}
    </form>
  );
}
