"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, DogIcon, PawPrint } from "lucide-react";

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
        throw new Error("Network response was not ok");
      }
      router.push("/dogs");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 bg-orange-100">
      <div className="w-full max-w-md">
        {/* Logo/Brand Container */}
        <div className="mb-8 text-center items-center">
          {/* <div className="mb-2"></div> */}

          <h1 className="text-4xl font-extrabold text-purple-600 flex items-center gap-2 ml-2">
            Fetch
            <PawPrint className="h-12 w-12 pb-2" />
          </h1>

          <p className="text-orange-600 mt-2 font-semibold text-lg">
            Find your new best friend!
          </p>
        </div>

        {/* Login Form */}
        <form
          className="bg-white shadow-xl rounded-xl overflow-hidden"
          onSubmit={handleSubmit}
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
            <h2 className="text-white font-bold text-xl flex items-center">
              Sign In
              <DogIcon className="h-6 w-6 text-white mr-2 ml-2" />
            </h2>
          </div>

          {/* Form Inputs */}
          <div className="p-6 space-y-6">
            {/* Name input with lucide icon */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 block"
              >
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
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
                  <Mail className="h-5 w-5 text-gray-400" />
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
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-center">
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
