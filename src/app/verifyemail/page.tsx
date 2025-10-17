"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [message, setMessage] = useState("Verifying...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage("Invalid verification link.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post("/api/users/verifyemail", { token });

        if (res.data.success) {
          setMessage("🎉 Email verified successfully! Redirecting to login...");
          setTimeout(() => router.push("/login"), 2000);
        } else {
          setMessage(res.data.error || "Verification failed.");
        }
      } catch (err) {
        console.error(err);
        setMessage("Server error. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-pink-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-pink-200 text-center">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">📧 Verify Email</h2>
        <p className="text-gray-700">{message}</p>
        {loading && <p className="text-pink-700 mt-2">Verifying...</p>}
      </div>
    </div>
  );
}
