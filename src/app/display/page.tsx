"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import { useRouter } from "next/navigation";
import 'react-calendar/dist/Calendar.css';

interface DiaryEntry {
  title?: string;
  content: string;
  date: string;
  palname?: string;
}

export default function DiaryCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentEntry, setCurrentEntry] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const fetchEntry = async (date: Date) => {
    setLoading(true);
    setMessage("");
    setCurrentEntry(null);

    try {
      const dateStr = date.toISOString().split("T")[0];
      const res = await axios.post(
        "/api/users/display",
        { date: dateStr },
        { withCredentials: true }
      );

      if (res.data.entry) {
        setCurrentEntry(res.data.entry);
      } else {
        setCurrentEntry(null);
        setMessage("No entry for this date.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch entry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntry(selectedDate);
  }, [selectedDate]);

  const handleAddNewEntry = () => {
    const dateStr = selectedDate.toISOString().split("T")[0];
    router.push(`/entry?date=${dateStr}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-pink-50 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">📅 Diary Calendar</h2>

      <Calendar
        onChange={(value) => {
          // runtime type checks
          if (value instanceof Date) {
            setSelectedDate(value);
          } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof Date) {
            setSelectedDate(value[0]); // pick start date if a range
          }
        }}
        value={selectedDate}
        className="mb-6"
      />

      {loading && <p className="text-pink-700 mb-4">Loading...</p>}

      {message && !loading && <p className="text-red-700 mb-4">{message}</p>}

      {currentEntry ? (
        <div className="bg-white p-4 rounded-2xl shadow-md border border-pink-200 mb-6">
          {currentEntry.title && (
            <h3 className="text-xl font-semibold text-pink-700 mb-1">
              {currentEntry.title}
            </h3>
          )}
          {currentEntry.palname && (
            <p className="text-pink-700 mb-2">Dear {currentEntry.palname},</p>
          )}
          <p className="text-gray-800 whitespace-pre-line">{currentEntry.content}</p>
          <p className="text-gray-500 text-sm mt-2">
            {new Date(currentEntry.date).toLocaleDateString()}
          </p>
        </div>
      ) : (
        !loading && (
          <div className="text-center">
            <p className="mb-4 text-gray-600">No diary entry for this date.</p>
            <button
              onClick={handleAddNewEntry}
              className="bg-pink-500 text-white p-3 rounded-lg font-bold hover:bg-pink-600 transition-colors"
            >
              Add New Entry
            </button>
          </div>
        )
      )}
    </div>
  );
}
