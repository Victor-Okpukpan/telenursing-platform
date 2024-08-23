// app/help-support/page.tsx
import { FaPhone, FaEnvelope, FaQuestionCircle, FaLifeRing } from "react-icons/fa";
import Wrapper from "@/components/Wrapper";

export default function HelpSupportPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Wrapper>
        <div className="py-10">
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
            <p className="mt-2 text-gray-600">Find answers to common questions or get in touch with our support team.</p>
          </section>

          {/* FAQ Section */}
          <section className="mb-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <p className="text-lg font-semibold text-gray-900">How do I reset my password?</p>
                <p className="text-gray-700">You can reset your password by going to the Settings page and selecting Change Password.</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">How do I contact support?</p>
                <p className="text-gray-700">You can contact support by filling out the form below or by phone or email.</p>
              </div>
            </div>
          </section>

          {/* Contact Support */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Support</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaPhone className="text-indigo-600 w-6 h-6 mr-4" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-700">Call us at +1 800 123 4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-indigo-600 w-6 h-6 mr-4" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">Email</p>
                  <p className="text-gray-700">Email us at support@example.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaLifeRing className="text-indigo-600 w-6 h-6 mr-4" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">Support Form</p>
                  <p className="text-gray-700">Fill out the form to get in touch with our support team.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Wrapper>
    </main>
  );
}
