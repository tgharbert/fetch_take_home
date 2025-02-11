"use client";

import React from "react";
import { useState } from "react";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("response", response);
    } catch (error) {
      console.error(error);
    }

    return (
      <div className=" flex h-screen justify-center items-center  ">
        <form
          className="w-1/4 flex justify-center items-end flex-col gap-4 border-4 border-purple-900 p-4 rounded-lg bg-orange-200"
          onSubmit={handleSubmit}
        >
          <h2 className="text-purple-600">Fetch Take Home Login:</h2>
          <div className="flex-row">
            <label className="text-black font-bold">Name: </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="text-black px-1 rounded-md ml-2"
              required
            ></input>
          </div>
          <div className="flex-row">
            <label className="text-black font-bold">Email: </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="text-black px-1 rounded-md ml-2 "
              required
            ></input>
          </div>
          <button className="bg-purple-700 font-bold text-white px-1 py-1 mt-2 w-1/4 rounded-md">
            Login
          </button>
        </form>
      </div>
    );
  };
}
