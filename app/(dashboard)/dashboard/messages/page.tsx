"use client";

import { useState } from "react";
import { clientMessages as initial } from "@/lib/client-data";
import type { Message } from "@/lib/client-data";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(initial);
  const [draft, setDraft] = useState("");

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages([
      ...messages,
      {
        id: `m${messages.length + 1}`,
        from: "client",
        author: "Emma Carter",
        body: draft.trim(),
        time: "Just now",
      },
    ]);
    setDraft("");
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col p-6 lg:p-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything about your project, in one thread.
        </p>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${
                m.from === "client" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  m.from === "team"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {m.author.charAt(0)}
              </div>
              <div
                className={`max-w-md rounded-2xl px-4 py-3 ${
                  m.from === "client"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-xs font-semibold opacity-80">{m.author}</p>
                <p className="mt-1 text-sm">{m.body}</p>
                <p className="mt-1 text-xs opacity-60">{m.time}</p>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={send}
          className="flex items-center gap-3 border-t border-border p-4"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write a message…"
            className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}