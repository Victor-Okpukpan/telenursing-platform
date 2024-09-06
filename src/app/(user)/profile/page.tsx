"use client";
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase"; // Make sure to have your Firebase setup here
import { useSession } from "next-auth/react";
import Wrapper from "@/components/Wrapper";

export default function UserProfilePage() {
  const { data: session, status } = useSession({
    required: true,
  });

  const [userInfo, setUserInfo] = useState<any>({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true); // Track loading state

  const userEmail = session?.user?.email;

  // Fetch user profile data when component mounts
  useEffect(() => {
    if (userEmail) {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, "users", userEmail); // Assuming the document ID is the user's email
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            setUserInfo(docSnap.data()); // Set user data
            setIsLoading(false); // Stop loading once data is fetched
          } else {
            console.log("No such document!");
            setIsLoading(false); // Stop loading even if there's no data
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsLoading(false); // Stop loading if there's an error
        }
      };

      fetchUserData();
    }
  }, [userEmail]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Save updated user profile data to Firestore
  const handleSaveProfile = async () => {
    if (!userEmail) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", userEmail); // Assuming the document ID is the user's email
      await updateDoc(userDocRef, userInfo);
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (status === "loading" || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Wrapper>
        <div className="py-10">
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
            <p className="mt-2 text-gray-600">
              Update your profile information.
            </p>
          </section>

          {/* User Profile Form */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Profile Information
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                disabled // Disable email field to prevent editing
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="phone">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaEdit className="mr-2" />
              Save Changes
            </button>
          </section>
        </div>
      </Wrapper>
    </main>
  );
}
