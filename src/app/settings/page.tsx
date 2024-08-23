// app/settings/page.tsx
import { FaBell, FaLock, FaUser, FaCog } from "react-icons/fa";
import Wrapper from "@/components/Wrapper";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Wrapper>
        <div className="py-10">
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="mt-2 text-gray-600">Manage your account settings and preferences.</p>
          </section>

          {/* Account Settings */}
          <section className="mb-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaUser className="text-indigo-600 w-6 h-6 mr-4" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">Profile</p>
                  <p className="text-gray-700">Update your personal information and change your password.</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaLock className="text-indigo-600 w-6 h-6 mr-4" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">Privacy</p>
                  <p className="text-gray-700">Manage your privacy settings and control data sharing.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Notification Settings */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notification Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaBell className="text-indigo-600 w-6 h-6 mr-4" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">Alerts</p>
                  <p className="text-gray-700">Choose which alerts and notifications you want to receive.</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaCog className="text-indigo-600 w-6 h-6 mr-4" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">General</p>
                  <p className="text-gray-700">Configure other settings such as language and time zone.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Wrapper>
    </main>
  );
}
