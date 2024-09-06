"use client"
import { useEffect, useState } from "react";
import { FaBell, FaPills, FaCalendarAlt, FaExclamationTriangle } from "react-icons/fa";
import Wrapper from "@/components/Wrapper";
import { collection, getDocs, deleteDoc, writeBatch } from "firebase/firestore";
import { db } from "@/app/firebase";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const medsQuerySnapshot = await getDocs(collection(db, "medications"));
      const apptsQuerySnapshot = await getDocs(collection(db, "appointments"));

      const medsData = medsQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const apptsData = apptsQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotifications((prevNotifications) => [
        ...prevNotifications,
        ...generateMedicationNotifications(medsData),
        ...generateAppointmentNotifications(apptsData),
      ]);
    };

    const generateMedicationNotifications = (medications: any[]) => {
      const currentHour = new Date().getHours();
      const currentMinutes = new Date().getMinutes();
      const currentTime = `${String(currentHour).padStart(2, "0")}:${String(currentMinutes).padStart(2, "0")}`;

      return medications.flatMap((med) =>
        med.schedule.map((time: string) => {
          if (time === currentTime) {
            return {
              type: "medication",
              message: `Time to take your ${med.name} (${med.dose})`,
              time: currentTime,
            };
          }
          return null;
        }).filter(Boolean)
      );
    };

    const generateAppointmentNotifications = (appointments: any[]) => {
      const notifications: { type: string; message: string; time: string; }[] = [];
      const now = new Date();

      appointments.forEach((appt) => {
        const startTime = new Date(appt.startTime);
        const endTime = new Date(appt.endTime);
        const thirtyMinutesAfterStart = new Date(startTime.getTime() + 30 * 60 * 1000);
        const oneHourAfterStart = new Date(startTime.getTime() + 60 * 60 * 1000);

        if (now >= thirtyMinutesAfterStart && now < oneHourAfterStart) {
          notifications.push({
            type: "appointment",
            message: `You have 30 minutes remaining for your appointment with ${appt.doctor}`,
            time: thirtyMinutesAfterStart.toLocaleTimeString(),
          });
        }

        if (now >= oneHourAfterStart) {
          notifications.push({
            type: "appointment",
            message: `Your appointment with ${appt.doctor} has ended.`,
            time: oneHourAfterStart.toLocaleTimeString(),
          });
        }
      });

      return notifications;
    };

    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const handleClearNotifications = async () => {
    const notificationsRef = collection(db, "notifications");
    const querySnapshot = await getDocs(notificationsRef);

    const batch = writeBatch(db);

    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    setNotifications([]);
  };

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
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
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
                ))
              ) : (
                <p>No notifications at the moment.</p>
              )}
            </ul>
            <button
              onClick={handleClearNotifications}
              className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Clear Notifications
            </button>
          </section>
        </div>
      </Wrapper>
    </main>
  );
}
