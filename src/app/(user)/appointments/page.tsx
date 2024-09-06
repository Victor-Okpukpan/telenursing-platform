"use client";
import { useState, useEffect, useCallback } from "react";
import { FaVideo, FaCalendarPlus, FaCalendarCheck } from "react-icons/fa";
import Wrapper from "@/components/Wrapper";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useSession } from "next-auth/react";
import ics, { createEvent, EventAttributes } from "ics";

export default function TeleconsultationPage() {
  const { data: session, status } = useSession({
    required: true,
  });

  const [upcomingConsultations, setUpcomingConsultations] = useState<any[]>([]);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  const userEmail = session?.user?.email;

  // Fetch consultations for the authenticated user
  const fetchConsultations = useCallback(async () => {
    if (!userEmail) return;

    const consultationsQuery = query(
      collection(db, "consultations"),
      where("userEmail", "==", userEmail)
    );

    const querySnapshot = await getDocs(consultationsQuery);
    const consultationsData = querySnapshot.docs.map((doc) => doc.data());
    setUpcomingConsultations(consultationsData);
  }, [userEmail]);

  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  const handleScheduleConsultation = async () => {
    if (!userEmail) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      const startTime = new Date(`${date}T${time}`);
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 1);

      const response = await fetch("/api/googleCalendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: `Consultation with Doctor`,
          description: reason,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          allowAnyone: true,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const newConsultation = {
          date: startTime.toLocaleDateString(),
          startTime: startTime.toLocaleTimeString(),
          endTime: endTime.toLocaleTimeString(),
          meetLink: data.meetLink,
          reason: reason,
          userEmail: userEmail, // Save the user's email with the consultation
        };

        // Save the consultation to Firestore
        await addDoc(collection(db, "consultations"), newConsultation);

        setUpcomingConsultations([...upcomingConsultations, newConsultation]);

        // Generate the .ics file
        const event: EventAttributes = {
          start: [
            startTime.getFullYear(),
            startTime.getMonth() + 1,
            startTime.getDate(),
            startTime.getHours(),
            startTime.getMinutes(),
          ],
          end: [
            endTime.getFullYear(),
            endTime.getMonth() + 1,
            endTime.getDate(),
            endTime.getHours(),
            endTime.getMinutes(),
          ],
          title: "Consultation with Doctor",
          description: reason,
          location: "Online",
          url: data.meetLink,
          status: "CONFIRMED",
          busyStatus: "BUSY",
          organizer: { name: "Doctor", email: "doctor@example.com" },
        };

        createEvent(event, (error, value) => {
          if (error) {
            console.log("Error creating .ics file", error);
            return;
          }

          const blob = new Blob([value], { type: "text/calendar" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `Consultation_${date}.ics`;
          a.click();
          window.URL.revokeObjectURL(url);
        });
      } else {
        console.error("Failed to schedule consultation:", data.error);
      }
    } catch (error) {
      console.error("Error scheduling consultation:", error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Wrapper>
        <div className="py-10">
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Teleconsultation
            </h1>
            <p className="mt-2 text-gray-600">
              Schedule or join your video consultations with healthcare providers.
            </p>
          </section>

          {/* Schedule New Consultation */}
          <section className="mb-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Schedule a New Consultation
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="time">
                Time
              </label>
              <input
                type="time"
                id="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="reason">
                Reason for Consultation
              </label>
              <input
                type="text"
                id="reason"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter the reason for your consultation"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <button
              onClick={handleScheduleConsultation}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaCalendarPlus className="mr-2" />
              Schedule Consultation
            </button>
          </section>

          {/* Upcoming Consultations */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Upcoming Consultations
            </h2>
            <ul>
              {upcomingConsultations.map((consultation, index) => (
                <li
                  key={index}
                  className="mb-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-lg font-semibold text-gray-900 capitalize">
                      {consultation.reason}
                    </p>
                    <p className="text-gray-700">
                      <FaCalendarCheck className="inline mr-2 text-indigo-600" />
                      {consultation.date} at {consultation.startTime}
                    </p>
                  </div>
                  <a
                    href={consultation.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FaVideo className="mr-2" />
                    Join Consultation
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Wrapper>
    </main>
  );
}
