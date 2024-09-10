"use client";

import { FaEnvelope, FaLock } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import Wrapper from "@/components/Wrapper";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, db } from "@/app/firebase"; // Import Firestore db

import { updateProfile } from "firebase/auth";
import { BiPhone } from "react-icons/bi";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState<any>("");
  const [loading, setLoading] = useState(false);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <Wrapper>
        <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Create Your Account
          </h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const userCredential = await createUserWithEmailAndPassword(
                  auth,
                  email,
                  password
                );
                const user = userCredential.user;

                // Update user profile
                await updateProfile(user, { displayName: name });

                // Save user info to Firestore
                const userRef = doc(db, "users", user.uid);
                await setDoc(userRef, {
                  uid: user.uid,
                  email: user.email,
                  name: user.displayName || "Unknown",
                  phone: phone,
                  createdAt: new Date(),
                });

                router.push("/");
              } catch (err) {
                console.error(err);
              }
            }}
            className="mt-8 space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1 flex items-center">
                <IoMdPerson className="text-gray-400 mr-2" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1 flex items-center">
                <BiPhone className="text-gray-400 mr-2" />
                <input
                  id="phoneNumber"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1 flex items-center">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 flex items-center">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </Wrapper>
    </main>
  );
}
