// app/profile/page.tsx
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaCalendarAlt } from "react-icons/fa";
import Wrapper from "@/components/Wrapper";

export default function ProfilePage() {
  // Mock data for the patient's profile
  const patientProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 123 456 7890",
    birthdate: "1980-05-20",
    address: "123 Main St, Anytown, USA",
    medicalHistory: [
      { condition: "Diabetes Type 2", diagnosed: "2015" },
      { condition: "Hypertension", diagnosed: "2018" },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Wrapper>
        <div className="py-10">
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
            <p className="mt-2 text-gray-600">Manage your personal information and medical history.</p>
          </section>

          {/* Personal Information */}
          <section className="mb-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center">
                <FaUser className="text-indigo-600 w-6 h-6 mr-4" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">Name</p>
                  <p className="text-gray-700">{patientProfile.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-indigo-600 w-6 h-6 mr-4" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">Email</p>
                  <p className="text-gray-700">{patientProfile.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-indigo-600 w-6 h-6 mr-4" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-700">{patientProfile.phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-indigo-600 w-6 h-6 mr-4" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">Birthdate</p>
                  <p className="text-gray-700">{patientProfile.birthdate}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            </div>
          </section>

          {/* Medical History */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical History</h2>
            <ul>
              {patientProfile.medicalHistory.map((record, index) => (
                <li key={index} className="mb-4">
                  <p className="text-lg font-semibold text-gray-900">{record.condition}</p>
                  <p className="text-gray-700">Diagnosed: {record.diagnosed}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Wrapper>
    </main>
  );
}
