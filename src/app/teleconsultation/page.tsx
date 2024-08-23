// app/teleconsultation/page.tsx
import { FaVideo, FaCalendarPlus, FaCalendarCheck, FaClock } from "react-icons/fa";
import Wrapper from "@/components/Wrapper";

export default function TeleconsultationPage() {
  // Mock data for upcoming consultations
  const upcomingConsultations = [
    { date: "2024-08-22", time: "3:00 PM", doctor: "Dr. Emily Carter" },
    { date: "2024-08-30", time: "11:00 AM", doctor: "Dr. James Lee" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Wrapper>
        <div className="py-10">
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Teleconsultation</h1>
            <p className="mt-2 text-gray-600">Schedule or join your video consultations with healthcare providers.</p>
          </section>

          {/* Schedule New Consultation */}
          <section className="mb-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Schedule a New Consultation</h2>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <FaCalendarPlus className="mr-2" />
              Schedule Consultation
            </button>
          </section>

          {/* Upcoming Consultations */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Consultations</h2>
            <ul>
              {upcomingConsultations.map((consultation, index) => (
                <li key={index} className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{consultation.doctor}</p>
                    <p className="text-gray-700">
                      <FaCalendarCheck className="inline mr-2 text-indigo-600" />
                      {consultation.date} at {consultation.time}
                    </p>
                  </div>
                  <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <FaVideo className="mr-2" />
                    Join Consultation
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Wrapper>
    </main>
  );
}
