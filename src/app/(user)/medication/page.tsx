"use client";
import { useState, useEffect, useCallback } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Wrapper from "@/components/Wrapper";
import { db } from "@/app/firebase";
import { useSession } from "next-auth/react";

export default function MedicationPage() {
  const session = useSession({
    required: true,
  });

  const [medications, setMedications] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
    dose: "",
    schedule: [""], // Array for multiple times
    notes: "",
    id: null,
  });

  const userEmail = session.data?.user?.email;

  // Fetch medications from Firestore for the authenticated user
  const fetchMedications = useCallback(async () => {
    if (!userEmail) return;

    const medsQuery = query(
      collection(db, "medications"),
      where("userEmail", "==", userEmail)
    );

    const querySnapshot = await getDocs(medsQuery);
    const medsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMedications(medsData);
  }, [userEmail]);

  // Fetch medications when the component mounts or userEmail changes
  useEffect(() => {
    fetchMedications();
  }, [fetchMedications]);

  // Open the modal with either default or existing medication data
  const handleModalOpen = (
    medication = { name: "", dose: "", schedule: [""], notes: "", id: null }
  ) => {
    setModalData(medication);
    setIsModalOpen(true);
  };

  // Close the modal and reset the modal data
  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalData({ name: "", dose: "", schedule: [""], notes: "", id: null });
  };

  // Handle changes in the schedule input fields
  const handleScheduleChange = (index: number, value: string) => {
    const newSchedule = [...modalData.schedule];
    newSchedule[index] = value;
    setModalData({ ...modalData, schedule: newSchedule });
  };

  // Add a new time to the schedule array
  const addScheduleTime = () => {
    setModalData({ ...modalData, schedule: [...modalData.schedule, ""] });
  };

  // Remove a time from the schedule array
  const removeScheduleTime = (index: number) => {
    const newSchedule = modalData.schedule.filter((_, i) => i !== index);
    setModalData({ ...modalData, schedule: newSchedule });
  };

  // Save or update medication in Firestore
  const handleSaveMedication = async () => {
    if (!userEmail) {
      console.error("User is not authenticated.");
      return;
    }

    if (modalData.id) {
      // Update existing medication
      const medDoc = doc(db, "medications", modalData.id);
      await updateDoc(medDoc, {
        name: modalData.name,
        dose: modalData.dose,
        schedule: modalData.schedule,
        notes: modalData.notes,
      });
    } else {
      // Add new medication
      await addDoc(collection(db, "medications"), {
        name: modalData.name,
        dose: modalData.dose,
        schedule: modalData.schedule,
        notes: modalData.notes,
        userEmail, // Save the user's email with the medication
      });
    }
    handleModalClose();
    fetchMedications(); // Re-fetch medications after adding or updating
  };

  // Delete medication from Firestore
  const handleDeleteMedication = async (id: string) => {
    const medDoc = doc(db, "medications", id);
    await deleteDoc(medDoc);
    fetchMedications(); // Re-fetch medications after deletion
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Wrapper>
        <div className="py-10">
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Medication Management
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your medications, dosages, and schedules.
            </p>
          </section>

          {/* Add New Medication */}
          <section className="mb-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Add New Medication
            </h2>
            <button
              onClick={() => handleModalOpen()}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaPlus className="mr-2" />
              Add Medication
            </button>
          </section>

          {/* Current Medications */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Current Medications
            </h2>
            <ul>
              {medications.map((medication) => (
                <li key={medication.id} className="mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        {medication.name}
                      </p>
                      <p className="text-gray-700">Dose: {medication.dose}</p>
                      <p className="text-gray-700">
                        Schedule: {medication.schedule.join(", ")}
                      </p>
                      <p className="text-gray-700">Notes: {medication.notes}</p>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleModalOpen(medication)}
                        className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <FaEdit className="mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMedication(medication.id)}
                        className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    {modalData.id ? "Edit Medication" : "Add New Medication"}
                  </h3>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={modalData.name}
                      onChange={(e) =>
                        setModalData({ ...modalData, name: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Dose"
                      value={modalData.dose}
                      onChange={(e) =>
                        setModalData({ ...modalData, dose: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md mb-2"
                      />

                      {/* Schedule Time Inputs */}
                      {modalData.schedule.map((time, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="time"
                            value={time}
                            onChange={(e) =>
                              handleScheduleChange(index, e.target.value)
                            }
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                          {modalData.schedule.length > 1 && (
                            <button
                              onClick={() => removeScheduleTime(index)}
                              className="ml-2 text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={addScheduleTime}
                        className="mt-2 text-indigo-600 hover:text-indigo-800"
                      >
                        + Add another time
                      </button>

                      <textarea
                        placeholder="Notes"
                        value={modalData.notes}
                        onChange={(e) =>
                          setModalData({ ...modalData, notes: e.target.value })
                        }
                        className="w-full p-2 border border-gray-300 rounded-md mb-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-10">
                  <button
                    onClick={handleSaveMedication}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleModalClose}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    );
  }
