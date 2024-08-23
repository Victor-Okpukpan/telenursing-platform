// app/notifications/page.tsx
import { FaBell, FaPills, FaCalendarAlt, FaExclamationTriangle } from "react-icons/fa";
import Wrapper from "@/components/Wrapper";

export default function NotificationsPage() {
  // Mock data for notifications
  const notifications = [
    { type: "medication", message: "Time to take your Metformin (500mg)", time: "8:00 AM" },
    { type: "appointment", message: "Appointment with Dr. Smith tomorrow at 10:00 AM", time: "Tomorrow" },
    { type: "glucose", message: "Your glucose level is rising. Current: 180 mg/dL", time: "15 minutes ago" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Wrapper>
        <div className="py-10">
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Alerts and Notifications</h1>
            <p className="mt-2 text-gray-600">Stay on top of your health with timely alerts and notifications.</p>
          </section>

          {/* Notifications List */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Notifications</h2>
            <ul>
              {notifications.map((notification, index) => (
                <li key={index} className="mb-6 flex items-center">
                  {notification.type === "medication" && (
                    <FaPills className="text-indigo-600 w-8 h-8 mr-4" />
                  )}
                  {notification.type === "appointment" && (
                    <FaCalendarAlt className="text-indigo-600 w-8 h-8 mr-4" />
                  )}
                  {notification.type === "glucose" && (
                    <FaExclamationTriangle className="text-red-600 w-8 h-8 mr-4" />
                  )}
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{notification.message}</p>
                    <p className="text-gray-700">{notification.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Wrapper>
    </main>
  );
}
