"use client";
import { useEffect, useState } from "react";
import { FaHeartbeat, FaCalendarAlt, FaPills, FaChartLine } from "react-icons/fa";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/app/firebase";
import Wrapper from "@/components/Wrapper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession({ required: true });

  useEffect(() => {
    if (session?.user?.email) {
      if (session.user.email === "vokpukpan@gmail.com") {
        router.push("/admin-dashboard");
      }
    }
  }, [session?.user?.email, router]);

  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);
  const [medicationReminders, setMedicationReminders] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  // Glucose stats states
  const [currentGlucose, setCurrentGlucose] = useState<number>(0);
  const [averageGlucose, setAverageGlucose] = useState<number>(0);
  const [glucoseTrend, setGlucoseTrend] = useState<string>("stable");

  // Set userEmail from session data and fetch user data
  useEffect(() => {
    if (session?.user?.email) {
      setUserEmail(session.user.email);
    }

    if(session?.user?.name){
      setUserName(session.user.name)
    }
  }, [session?.user?.email, session?.user?.name]);

  // Fetch user-specific data when userEmail changes
  useEffect(() => {
    if (userEmail) {
      fetchUserData(userEmail);
    }
  }, [userEmail]);

  // Fetch user-specific consultations and medications based on email
  const fetchUserData = async (email: string) => {
    try {
      // Fetch consultations
      const consultationsRef = collection(db, "consultations");
      const consultationsQuery = query(
        consultationsRef,
        where("userEmail", "==", email),
        orderBy("date", "desc"),
        orderBy("startTime", "desc")
      );
      const consultationsSnapshot = await getDocs(consultationsQuery);
      const consultationsData = consultationsSnapshot.docs.map((doc) => doc.data());
      setUpcomingAppointments(consultationsData);

      // Fetch medications
      const medicationsRef = collection(db, "medications");
      const medicationsQuery = query(
        medicationsRef,
        where("userEmail", "==", email),
        orderBy("schedule", "desc")
      );
      const medicationsSnapshot = await getDocs(medicationsQuery);
      const medicationsData = medicationsSnapshot.docs.map((doc) => doc.data());
      setMedicationReminders(medicationsData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to simulate random glucose levels
  const generateRandomGlucose = () => {
    const current = Math.floor(Math.random() * (140 - 70 + 1)) + 70; // Random between 70 and 140 mg/dL
    const average = Math.floor(Math.random() * (120 - 80 + 1)) + 80; // Random between 80 and 120 mg/dL
    const trend = current > average ? "rising" : current < average ? "falling" : "stable";

    setCurrentGlucose(current);
    setAverageGlucose(average);
    setGlucoseTrend(trend);
  };

  // Update glucose stats every 5 seconds
  useEffect(() => {
    generateRandomGlucose(); // Generate initial values
    const interval = setInterval(() => {
      generateRandomGlucose();
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []); // Run once on component mount

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Wrapper>
        <div className="py-10">
          {/* Greeting and Overview */}
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {userName || "User"}!
            </h1>
            <p className="mt-2 text-gray-600">
              Here&apos;s an overview of your health stats and upcoming activities.
            </p>
          </section>

          {/* Glucose Monitoring Stats */}
          <section className="mb-8 grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
              <FaHeartbeat className="text-indigo-600 w-10 h-10 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Current Glucose Level
                </h3>
                <p className="mt-1 text-2xl font-bold text-gray-800">
                  {currentGlucose} mg/dL
                </p>
                <p
                  className={`mt-1 text-sm ${
                    glucoseTrend === "rising"
                      ? "text-red-600"
                      : glucoseTrend === "falling"
                      ? "text-blue-600"
                      : "text-green-600"
                  }`}
                >
                  {glucoseTrend === "rising" && "Rising"}
                  {glucoseTrend === "falling" && "Falling"}
                  {glucoseTrend === "stable" && "Stable"}
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
              <FaChartLine className="text-indigo-600 w-10 h-10 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Average Glucose Level
                </h3>
                <p className="mt-1 text-2xl font-bold text-gray-800">
                  {averageGlucose} mg/dL
                </p>
              </div>
            </div>
            
          </section>

          {/* Upcoming Appointments */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Appointments</h2>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                    <FaCalendarAlt className="text-indigo-600 w-10 h-10 mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {appointment.type || "Appointment"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {appointment.date || "Date not set"} at {appointment.startTime || "Time not set"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No upcoming appointments.</p>
              )}
            </div>
          </section>

          {/* Medication Reminders */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Medication Reminders</h2>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              {medicationReminders.length > 0 ? (
                medicationReminders.map((reminder, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                    <FaPills className="text-indigo-600 w-10 h-10 mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {reminder.name || "Medication"}
                      </h3>
                      <p className="text-sm text-gray-600">{reminder.dose || "Dose not set"}</p>
                      <p className="text-sm text-gray-600">At {reminder.schedule?.join(", ") || "Time not set"}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No medication reminders.</p>
              )}
            </div>
          </section>
        </div>
      </Wrapper>
    </main>
  );
}
