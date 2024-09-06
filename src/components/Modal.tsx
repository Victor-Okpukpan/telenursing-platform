"use client"
import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProfileData) => void;
  profileData: ProfileData;
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  address: string;
}

export default function Modal({ isOpen, onClose, onSave, profileData }: ModalProps) {
  const [formData, setFormData] = useState(profileData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Profile</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <FaUser className="text-indigo-600 w-6 h-6 mr-4" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md p-2"
              placeholder="Name"
            />
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-indigo-600 w-6 h-6 mr-4" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md p-2"
              placeholder="Email"
            />
          </div>
          <div className="flex items-center">
            <FaPhone className="text-indigo-600 w-6 h-6 mr-4" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md p-2"
              placeholder="Phone"
            />
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="text-indigo-600 w-6 h-6 mr-4" />
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-indigo-600 w-6 h-6 mr-4" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md p-2"
              placeholder="Address"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
