'use client';

import axios from "axios";
import React, { useState } from "react";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleShorten = async () => {
    if (!url) {
      alert("Please enter a URL.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/url/shorten", { originalUrl: url });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        alert(error.response?.data?.message || "An error occurred");
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#FFF7D1] to-[#FFECC8]">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-[#FFB0B0] text-center mb-6">URL Shortener</h1>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Enter your URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 border text-gray-700 border-[#FFD09B] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFB0B0]"
          />
        </div>
        <button
          onClick={handleShorten}
          disabled={isLoading}
          className={`w-full px-4 py-3 text-white font-semibold rounded-lg shadow-md ${
            isLoading ? "bg-gray-300 cursor-not-allowed" : "bg-[#FFD09B] hover:bg-[#FFB0B0]"
          }`}
        >
          {isLoading ? "Shortening..." : "Shorten URL"}
        </button>

        {shortUrl && (
          <div className="mt-6 p-4 bg-[#FFECC8] text-[#FFB0B0] rounded-lg">
            <p className="text-sm font-semibold">Shortened URL:</p>
            <div className="flex items-center justify-between mt-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DEAA79] underline truncate"
              >
                {shortUrl}
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(shortUrl)}
                className="ml-4 text-sm text-white bg-[#FFD09B] px-3 py-1 rounded hover:bg-[#FFB0B0]"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
