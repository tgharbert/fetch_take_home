"use client";

import React from "react";
import { useState } from "react";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name: name, email: email }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className=" flex h-screen justify-center items-center  ">
      <form
        className="w-1/4 flex justify-center items-end flex-col gap-4 border-4 border-purple-900 p-4 rounded-lg bg-orange-200"
        onSubmit={handleSubmit}
      >
        <h2 className="text-purple-600 self-center font-extrabold ">
          Fetch Take Home Login:
        </h2>
        <div className="flex-row self-center">
          {/* <label className="text-black font-bold">Name: </label> */}
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
            className="text-black px-1 rounded-md ml-2"
            required
          ></input>
        </div>
        <div className="flex-row self-center">
          {/* <label className="text-black font-bold">Email: </label> */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            value={email}
            className="text-black px-1 rounded-md ml-2 "
            required
          ></input>
        </div>
        <button
          type="submit"
          className="bg-purple-700 font-bold text-white py-1 mt-2 px-4 rounded-md self-center"
        >
          Login
        </button>
      </form>
    </div>
  );
}
