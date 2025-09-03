"use client";
import { useState } from "react";

export default function Test() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    setReply("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      console.log("Groq AI Response:", data);
      setReply(data.reply || "⚠️ No reply received");
    } catch (err) {
      console.error("Fetch error:", err);
      setReply("❌ Failed to get AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4 text-black">
      <textarea
        className="border p-2 w-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask Groq AI something..."
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Thinking..." : "Send"}
      </button>

      {reply && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <strong>AI says:</strong> {reply}
        </div>
      )}
    </div>
  );
}
