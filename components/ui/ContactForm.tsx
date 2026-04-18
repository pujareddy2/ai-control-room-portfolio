"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const canSend = useMemo(() => {
    const n = name.trim();
    const e = email.trim();
    const m = message.trim();
    return n.length > 1 && e.length > 3 && e.includes("@") && m.length > 4 && status !== "sending";
  }, [email, message, name, status]);

  return (
    <form
      className="mt-3 grid gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setStatus("sending");

        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ name, email, message }),
          });

          const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

          if (!res.ok || !data?.ok) {
            setStatus("error");
            setError(data?.error ?? "Failed to send message.");
            return;
          }

          setStatus("sent");
          setName("");
          setEmail("");
          setMessage("");
        } catch (err) {
          setStatus("error");
          setError(err instanceof Error ? err.message : "Failed to send message.");
        }
      }}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/80 outline-none focus:border-cyan-300/40"
        placeholder="Your name"
        autoComplete="name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/80 outline-none focus:border-cyan-300/40"
        placeholder="Your email"
        inputMode="email"
        autoComplete="email"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-[120px] w-full resize-none rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/80 outline-none focus:border-cyan-300/40"
        placeholder="Message"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="submit"
          disabled={!canSend}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : status === "sent" ? "Sent" : "Send"}
        </button>
        <div className="text-xs text-white/55">
          {status === "sent" ? (
            <span className="text-accent">Message delivered.</span>
          ) : error ? (
            <span className="text-red-300">{error}</span>
          ) : (
            "Secure contact endpoint"
          )}
        </div>
      </div>
    </form>
  );
}
