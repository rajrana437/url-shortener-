'use client'

import axios from "axios";
import React, { useState } from "react";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    if (!url) {
      alert("Please enter a URL.");
      return;
    }

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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold text-center mb-4">URL Shortener</h1>
        <input
          type="text"
          placeholder="Enter your URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <button
          onClick={handleShorten}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Shorten URL
        </button>
        {shortUrl && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
            <p>Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {shortUrl}
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(shortUrl)}
              className="ml-4 text-sm text-white bg-blue-500 px-2 py-1 rounded hover:bg-blue-600"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
