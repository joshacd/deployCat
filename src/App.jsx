import React, { useState, useEffect } from "react";
import axios from "axios";

const CAT_API_URL = "https://api.thecatapi.com/v1/images/search";

export default function App() {
  const [catImage, setCatImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCatImage = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CAT_API_URL);
      const image = data[0];
      if (image?.url) {
        setCatImage(image.url);
      } else {
        throw new Error("Invalid image data");
      }
    } catch (err) {
      console.error("Error fetching cat image:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatImage();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start bg-gray-200 min-h-screen p-4">
      <div className="bg-gray-100 flex flex-row items-center gap-4 py-3 px-4 rounded-md shadow m-4">
        <h1 className="text-3xl font-bold text-gray-800">Purrrfect Cat</h1>
        <button
          onClick={fetchCatImage}
          className="bg-orange-500 text-white font-medium py-1 px-2 rounded-lg hover:bg-orange-600 transition-transform active:scale-95 shadow"
        >
          Get New Cat
        </button>
      </div>
      {/* Image section */}
      {loading ? (
        <p className="text-gray-500 text-2xl m-10">Loading...</p>
      ) : (
        <img
          src={catImage}
          alt="A random cat"
          className="max-w-full max-h-full rounded-lg shadow-md object-contain"
        />
      )}
    </div>
  );
}
