"use client";
import React from "react";
import Link from "next/link";
export default function Login() {
    const loginfunc = async (event) => {
      event.preventDefault(); // Prevent default form submission

      const formData = new FormData(event.target); // Collect form data
      const data = Object.fromEntries(formData.entries()); // Convert to object

      try {
        const response = await fetch("/api/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();
          alert(result.message);
        } else {
          const error = await response.json();
          alert(error.error || "An error occurred.");
        }
      } catch (err) {
        console.error("Submission error:", err);
        alert("An unexpected error occurred. Please try again.");
      }
    };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <svg className="w-24 h-24 mb-6" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="#4CAF50" />
      </svg>
      <main className="bg-white p-8 rounded-lg shadow-md w-11/12 max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="flex flex-col" onSubmit={loginfunc}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Login
          </button>
          <Link href="/">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Home
            </button>
          </Link>
        </form>
      </main>
    </div>
  );
}
