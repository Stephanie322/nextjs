"use client";
import { useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/users/changepassword", {
        token,
        newPassword: password,
      });

      if (res.data.success) {
        setMessage("Password changed successfully! Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMessage(res.data.error || "Something went wrong.");
      }
    } catch (err: any) {
      setMessage("Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-pink-50">
      <form
        onSubmit={handleChangePassword}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-pink-200"
      >
        <h2 className="text-2xl font-bold mb-4 text-pink-600 text-center">
          🔒 Reset Password
        </h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3 outline-pink-300"
          required
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 outline-pink-300"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>

        {message && (
          <p className="text-center mt-4 text-pink-700 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
}
