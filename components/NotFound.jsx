"use client";

import React from "react";
import { useRouter } from "next/navigation";

function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900/20 flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 p-8">
        <div className="text-9xl font-bold text-blue-500 mb-4">404</div>

        <h1 className="text-3xl font-bold text-white mb-2">Page Not Found</h1>

        <p className="text-gray-400 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Go Back
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
