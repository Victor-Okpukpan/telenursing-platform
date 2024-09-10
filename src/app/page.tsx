"use client"
import Wrapper from "@/components/Wrapper";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FaHeartbeat, FaVideo, FaPills } from "react-icons/fa";

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  return (
    <main>
      <Wrapper>
        {/* Hero Section */}
        <section className="text-center py-16 md:py-24">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Manage Your Diabetes with Ease
          </h1>
          <p className="mt-4 text-lg text-gray-600 sm:text-xl md:text-2xl">
            Our platform provides glucose monitoring,
            teleconsultations, and more.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="/signup"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-8 md:py-24 bg-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Features
          </h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <FaHeartbeat className="text-indigo-600 w-12 h-12 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mt-4">
                Real-Time Glucose Monitoring
              </h3>
              <p className="mt-4 text-gray-600">
                Track your blood glucose levels with ease.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <FaVideo className="text-indigo-600 w-12 h-12 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mt-4">
                Teleconsultations
              </h3>
              <p className="mt-4 text-gray-600">
                Connect with healthcare providers anytime, anywhere.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <FaPills className="text-indigo-600 w-12 h-12 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mt-4">
                Medication Reminders
              </h3>
              <p className="mt-4 text-gray-600">
                Never miss a dose with our automated reminders.
              </p>
            </div>
          </div>
        </section>

       

        {/* Call to Action */}
        <section className="py-16 my-10 md:py-24 bg-indigo-600 text-white text-center">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mt-4 text-lg">
            Join us today and take control of your diabetes.
          </p>
          <div className="mt-8">
            <a
              href="/signup"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
            >
              Sign Up
            </a>
          </div>
        </section>
      </Wrapper>
    </main>
  );
}

Home.requireAuth = true;