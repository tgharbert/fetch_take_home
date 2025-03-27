"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email }),
      });
      if (!response.ok) {
        // HANDLE ERROR IN DOM
        throw new Error("Network response was not ok");
      }
      // redirect to '/'
      router.push("/dogs");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-purple-50 to-orange-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Container */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-purple-600">Fetch</h1>
          <p className="text-orange-600 mt-2">Find your new best friend!</p>
        </div>

        {/* Login Form */}
        <form
          className="bg-white shadow-xl rounded-xl overflow-hidden"
          onSubmit={handleSubmit}
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
            <h2 className="text-white font-bold text-xl">Sign In</h2>
            <p className="text-purple-100 text-sm mt-1">
              Please enter your credentials
            </p>
          </div>

          {/* Form Inputs */}
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 block"
              >
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 block"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2 px-6 rounded-md font-semibold shadow-md hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 ease-in-out"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Fetch Take Home Challenge</p>
        </div>
      </div>
    </div>
  );
}
