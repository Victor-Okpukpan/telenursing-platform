"use client";
import { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaCalendarAlt,
  FaPills,
  FaHeartbeat,
} from "react-icons/fa";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/app/firebase";
import Wrapper from "@/components/Wrapper";
import { useSession } from "next-auth/react";

export default function AdminDashboardPage() {
  const { data: session, status } = useSession({ required: true });
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

  // Fetch all users on the platform
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Function to simulate random glucose levels
  const generateRandomGlucose = () => {
    const currentGlucose = Math.floor(Math.random() * (140 - 70 + 1)) + 70; // Random between 70-140
    const averageGlucose = Math.floor(Math.random() * (120 - 80 + 1)) + 80; // Random between 80-120
    return { currentGlucose, averageGlucose };
  };

  // Function to fetch all users' emails
  const fetchAllUsers = async () => {
    try {
      const usersRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersRef);
      const usersData = usersSnapshot.docs
        .map((doc) => doc.data())
        .filter((user) => user.email !== "vokpukpan@gmail.com"); // Exclude specific email

      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch specific user data when selected
  useEffect(() => {
    if (selectedUser) {
      fetchUserData(selectedUser);

      // Randomize glucose levels every 5 seconds
      const interval = setInterval(() => {
        setUserData((prevData: any) => ({
          ...prevData,
          userGlucoseLevels: generateRandomGlucose(),
        }));
      }, 5000);

      return () => clearInterval(interval); // Cleanup interval when component unmounts
    }
  }, [selectedUser]);

  // Fetch user-specific consultations, medications, and glucose levels based on email
  const fetchUserData = async (email: string) => {
    try {
      const userAppointmentsRef = collection(db, "consultations");
      const userMedicationsRef = collection(db, "medications");

      // Query appointments based on the selected user's email
      const appointmentsQuery = query(
        userAppointmentsRef,
        where("userEmail", "==", email),
        orderBy("date", "desc"),
        orderBy("startTime", "desc")
      );
      const appointmentsSnapshot = await getDocs(appointmentsQuery);
      const appointmentsData = appointmentsSnapshot.docs.map((doc) =>
        doc.data()
      );

      // Query medications based on the selected user's email
      const medicationsQuery = query(
        userMedicationsRef,
        where("userEmail", "==", email),
        orderBy("schedule", "desc")
      );
      const medicationsSnapshot = await getDocs(medicationsQuery);
      const medicationsData = medicationsSnapshot.docs.map((doc) => doc.data());

      // Random glucose levels
      const userGlucoseLevels = {
        currentGlucose: Math.floor(Math.random() * (140 - 70 + 1)) + 70,
        averageGlucose: Math.floor(Math.random() * (120 - 80 + 1)) + 80,
      };

      setUserData({ appointmentsData, medicationsData, userGlucoseLevels });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Wrapper>
        <div className="py-10">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            View and manage user health data on the platform.
          </p>

          {/* Users List */}
          <section className="my-6">
            <h2 className="text-2xl font-bold text-gray-900">Users</h2>
            <div className="mt-4 grid gap-6 lg:grid-cols-3">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg cursor-pointer flex items-center"
                    onClick={() => {setSelectedUser(user.email);
                      setSelectedUserName(user.name)
                    }} // Pass the email as the identifier
                  >
                    <FaUserCircle className="text-indigo-600 w-10 h-10 mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user.name || "User"}
                      </h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No users found.</p>
              )}
            </div>
          </section>

          {/* Selected User Data */}
          {selectedUser && userData && (
            <section className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900">
                User Data for {selectedUserName}
              </h2>

              {/* Glucose Levels */}
              <div className="my-6 grid gap-6 md:grid-cols-2">
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                  <FaHeartbeat className="text-indigo-600 w-10 h-10 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Current Glucose Level
                    </h3>
                    <p className="mt-1 text-2xl font-bold text-gray-800">
                      {userData.userGlucoseLevels.currentGlucose} mg/dL
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                  <FaHeartbeat className="text-indigo-600 w-10 h-10 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Average Glucose Level
                    </h3>
                    <p className="mt-1 text-2xl font-bold text-gray-800">
                      {userData.userGlucoseLevels.averageGlucose} mg/dL
                    </p>
                  </div>
                </div>
              </div>

              {/* Upcoming Appointments */}
              <section className="my-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Upcoming Appointments
                </h2>
                <div className="mt-4 grid gap-6 lg:grid-cols-2">
                  {userData?.appointmentsData?.length > 0 ? (
                    userData.appointmentsData.map(
                      (appointment: any, index: number) => (
                        <div
                          key={index}
                          className="bg-white p-6 rounded-lg shadow-lg flex items-center"
                        >
                          <FaCalendarAlt className="text-indigo-600 w-10 h-10 mr-4" />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {appointment.type || "Appointment"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {appointment.date || "Date not set"} at{" "}
                              {appointment.startTime || "Time not set"}
                            </p>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-gray-600">No upcoming appointments.</p>
                  )}
                </div>
              </section>

              {/* Medication Reminders */}
              <section className="my-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Medication Reminders
                </h2>
                <div className="mt-4 grid gap-6 lg:grid-cols-2">
                  {userData?.medicationsData?.length > 0 ? (
                    userData.medicationsData.map(
                      (reminder: any, index: number) => (
                        <div
                          key={index}
                          className="bg-white p-6 rounded-lg shadow-lg flex items-center"
                        >
                          <FaPills className="text-indigo-600 w-10 h-10 mr-4" />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {reminder.name || "Medication"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {reminder.dose || "Dose not set"}
                            </p>
                            <p className="text-sm text-gray-600">
                              At{" "}
                              {reminder.schedule?.join(", ") || "Time not set"}
                            </p>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-gray-600">No medication reminders.</p>
                  )}
                </div>
              </section>
            </section>
          )}
        </div>
      </Wrapper>
    </main>
  );
}
