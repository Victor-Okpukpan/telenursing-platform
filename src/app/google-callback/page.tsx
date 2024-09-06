"use client"
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getTokens } from "../googleClient";

export default function GoogleCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        try {
          const tokens = await getTokens(code);
          console.log("Tokens obtained:", tokens);
          // Store tokens securely, then redirect or show success message
          router.push("/teleconsultation");
        } catch (error) {
          console.error("Error obtaining tokens:", error);
        }
      }
    };
    handleCallback();
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-lg text-gray-700">Processing Google authentication...</p>
    </main>
  );
}
