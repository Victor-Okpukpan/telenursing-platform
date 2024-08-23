// app/admin/page.tsx
import { FaUsers, FaServer, FaClipboardList, FaChartLine } from "react-icons/fa";
import Wrapper from "@/components/Wrapper";

export default function AdminPage() {
  // Mock data for system metrics
  const systemMetrics = [
    { label: "Active Users", value: 1245 },
    { label: "Server Uptime", value: "99.98%" },
    { label: "Daily Logins", value: 356 },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Wrapper>
        <div className="py-10">
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage users, monitor system health, and review activity logs.</p>
          </section>

          {/* User Management */}
          <section className="mb-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Management</h2>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <FaUsers className="mr-2" />
              View All Users
            </button>
          </section>

          {/* System Health */}
          <section className="mb-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">System Health</h2>
            <ul className="space-y-4">
              {systemMetrics.map((metric, index) => (
                <li key={index} className="flex items-center">
                  <FaChartLine className="text-indigo-600 w-6 h-6 mr-4" />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{metric.label}</p>
                    <p className="text-gray-700">{metric.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Activity Logs */}
          <section className="bg-white p-6```tsx
          rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Activity Logs</h2>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <FaClipboardList className="mr-2" />
              View Logs
            </button>
          </section>
        </div>
      </Wrapper>
    </main>
  );
}
