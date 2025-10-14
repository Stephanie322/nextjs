"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "@/components/sidebar";

export default function HomePage() {
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/users/me");
        setNickname(res.data.data.nickname);
      } catch (err: any) {
        console.error(err);
        toast.error(err.response?.data?.error || "Failed to load user");
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-100 to-pink-500">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main Content on the right */}
      <div className="flex flex-col flex-grow items-center justify-center py-10 text-center">
        <h1 className="font-black pb-6 text-4xl text-pink-700">Home Page</h1>
        
        <p className="text-8xl  font-semibold text-pink-800">
          WELCOME{" "}
          <span className="text-6xl p-3 ml-2 rounded bg-pink-500 text-white shadow-lg shadow-pink-300">
            {nickname || "Guest"}
          </span>
        </p>
      </div>
    </div>
  );
}
