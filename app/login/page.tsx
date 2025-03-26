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
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="text-black px-1 rounded-md ml-2"
            required
          ></input>
        </div>
        <div className="flex-row self-center">
          {/* <label className="text-black font-bold">Email: </label> */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
