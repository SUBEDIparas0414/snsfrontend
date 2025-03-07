"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageMinus } from "lucide-react";
import Image from "next/image";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    if (!isLogin) {
      formData.append("name", name);
    }

    const response = await fetch(
      `/api/auth/${isLogin ? "login" : "register"}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      router.push("/dashboard");
    } else {
      console.error("Authentication failed");
    }
  }

  return (
    <div className=" py-16">
      <p className=" text-5xl font-bold text-[#2c2481] text-center">WELCOME</p>
     
      <form
        onSubmit={handleSubmit}
        className="mt-8 w-3/12 mx-auto space-y-6 border-2 border-gray-600/40 p-6 rounded-lg bg-slate-400/20 shadow-md shadow-slate-400/50 "
      >
        <div className=" mx-auto flex justify-around">
        {" "}
        <Image src="/snslogo.png" width={100} height={100} alt="logo" />
      </div>
        {!isLogin && (
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLogin ? "Sign in" : "Register"}
          </button>
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {isLogin
              ? "Need to create an account?"
              : "Already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}
