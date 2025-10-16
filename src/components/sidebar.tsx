'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Sidebar() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get('/api/users/logout'); // call the API
      toast.success("Logged out successfully!");

      // Redirect to login and refresh to reset server-side state
      router.push('/login');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen w-72 bg-pink-900 text-white p-4">
      <div>
        <Link href="/" className="flex items-center mb-4 text-white text-xl font-bold">
          Content
        </Link>

        <ul className="flex flex-col space-y-2">
          <li className="hover:bg-pink-400">
            <Link href="/app/entry" className="nav-link text-white">Me</Link>
          </li>
          <li className="hover:bg-pink-400">
            <Link href="/display" className="nav-link text-white">Entries Display</Link>
          </li>
          <li className="hover:bg-pink-400">
            <Link href="/entry" className="nav-link text-white">Entry</Link>
          </li>
        </ul>
      </div>

      <button
        onClick={logout}
        className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br
                   font-medium rounded-lg px-5 py-2.5 text-center text-white"
      >
        Logout
      </button>
    </div>
  );
}
