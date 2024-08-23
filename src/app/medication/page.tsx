// app/medication/page.tsx
import { FaPills, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Wrapper from "@/components/Wrapper";

export default function MedicationPage() {
  // Mock data for medications
  const medications = [
    { name: "Metformin", dose: "500mg", schedule: "8:00 AM, 6:00 PM", notes: "Take with food" },
    { name: "Lisinopril", dose: "20mg", schedule: "10:00 AM", notes: "Take with water" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Wrapper>
        <div className="py-10">
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Medication Management</h1>
            <p className="mt-2 text-gray-600">Manage your medications, dosages, and schedules.</p>
          </section>

          {/* Add New Medication */}
          <section className="mb-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Medication</h2>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <FaPlus className="mr-2" />
              Add Medication
            </button>
          </section>

          {/* Current Medications */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Medications</h2>
            <ul>
              {medications.map((medication, index) => (
                <li key={index} className="mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{medication.name}</p>
                      <p className="text-gray-700">Dose: {medication.dose}</p>
                      <p className="text-gray-700">Schedule: {medication.schedule}</p>
                      <p className="text-gray-700">Notes: {medication.notes}</p>
                    </div>
                    <div className="flex space-x-4">
                      <button className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <FaEdit className="mr-2" />
                        Edit
                      </button>
                      <button className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <FaTrash className="mr-2" />
                        Delete
                      </button>
                    </div>
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
