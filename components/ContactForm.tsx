// components/ContactForm.tsx
"use client";
import { useState } from "react";

export function ContactForm({ defaultProduct }: { defaultProduct?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      address: data.get("address"),
      product: data.get("product"),
      quantity: data.get("quantity"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus("done");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "送信に失敗しました");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("通信エラーが発生しました");
    }
  }

  if (status === "done") {
    return (
      <div className="bg-green-50 p-6 rounded">
        <p className="font-bold">送信しました</p>
        <p className="text-gray-700 mt-2">
          折り返しご連絡いたします。しばらくお待ちください。
        </p>
        <p className="text-sm text-gray-500 mt-2">
          確認メールをお送りしておりますので、ご確認ください。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {errorMessage || "送信に失敗しました。時間をおいて再度お試しください。"}
        </p>
      )}
    </form>
  );
}
