"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

export default function AddDiaryEntry() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(
        "/api/users/entry",
        { title, content, date },
        { withCredentials: true }
      );

      setMessage("✨ Diary entry added successfully!");
      setTitle("");
      setContent("");
    } catch (err: unknown) {
      // TypeScript-safe handling
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.error || "Something went wrong");
      } else if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("Network error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-pink-50 rounded-2xl shadow-lg">
      <h2 className="text-pink-900 text-3xl font-bold mb-4">📓 Add Diary Entry</h2>

      {message && (
        <p
          className={`mb-4 p-2 rounded ${
            message.includes("success")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="border border-pink-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-900"
        />

        <p className="text-pink-700 font-semibold mb-2">Dear diary</p>

        <textarea
          placeholder="Write your diary entry..."
          value={content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          className="border border-pink-300 p-3 rounded h-48 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-900"
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
          className="border border-pink-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-900"
        />

        <button
          type="submit"
          className={`bg-pink-500 text-white p-3 rounded-lg font-bold hover:bg-pink-600 transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Entry"}
        </button>
      </form>
    </div>
  );
}
