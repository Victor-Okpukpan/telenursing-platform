// app/dashboard/page.tsx
import {
  FaHeartbeat,
  FaCalendarAlt,
  FaPills,
  FaChartLine,
} from "react-icons/fa";
import Wrapper from "@/components/Wrapper";

export default function DashboardPage() {
  // Mock data for glucose stats
  const glucoseStats = {
    current: 110, // Current glucose level
    average: 105, // Average glucose level
    trend: "stable", // Can be "rising", "falling", or "stable"
  };

  // Mock data for appointments and medication
  const upcomingAppointments = [
    {
      date: "2024-08-20",
      time: "10:00 AM",
      doctor: "Dr. Smith",
      type: "Consultation",
    },
    {
      date: "2024-08-25",
      time: "2:00 PM",
      doctor: "Dr. Johnson",
      type: "Follow-up",
    },
  ];

  const medicationReminders = [
    { name: "Metformin", dose: "500mg", time: "8:00 AM" },
    { name: "Insulin", dose: "20 units", time: "6:00 PM" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Wrapper>
        <div className="py-10">
          {/* Greeting and Overview */}
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, [User]!
            </h1>
            <p className="mt-2 text-gray-600">
              Here&apos;s an overview of your health stats and upcoming
              activities.
            </p>
          </section>

          {/* Glucose Monitoring Stats */}
          <section className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
              <FaHeartbeat className="text-indigo-600 w-10 h-10 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Current Glucose Level
                </h3>
                <p className="mt-1 text-2xl font-bold text-gray-800">
                  {glucoseStats.current} mg/dL
                </p>
                <p
                  className={`mt-1 text-sm ${
                    glucoseStats.trend === "rising"
                      ? "text-red-600"
                      : glucoseStats.trend === "falling"
                      ? "text-blue-600"
                      : "text-green-600"
                  }`}
                >
                  {glucoseStats.trend === "rising" && "Rising"}
                  {glucoseStats.trend === "falling" && "Falling"}
                  {glucoseStats.trend === "stable" && "Stable"}
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
                  {glucoseStats.average} mg/dL
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
              <FaHeartbeat className="text-indigo-600 w-10 h-10 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Last Check
                </h3>
                <p className="mt-1 text-lg text-gray-800">15 minutes ago</p>
              </div>
            </div>
          </section>

          {/* Upcoming Appointments */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Upcoming Appointments
            </h2>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              {upcomingAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg flex items-center"
                >
                  <FaCalendarAlt className="text-indigo-600 w-10 h-10 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {appointment.type}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {appointment.date} at {appointment.time}
                    </p>
                    <p className="text-sm text-gray-600">
                      With {appointment.doctor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Medication Reminders */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Medication Reminders
            </h2>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              {medicationReminders.map((reminder, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg flex items-center"
                >
                  <FaPills className="text-indigo-600 w-10 h-10 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {reminder.name}
                    </h3>
                    <p className="text-sm text-gray-600">{reminder.dose}</p>
                    <p className="text-sm text-gray-600">At {reminder.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Wrapper>
    </main>
  );
}
