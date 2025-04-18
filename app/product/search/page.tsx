'use client';
import { useState } from "react";
import { getProductByName } from "@/actions/product.actions";

export default function SearchProductPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [product, setProduct] = useState<any>(null);
  const [message, setMessage] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setProduct(null);

    try {
      const result = await getProductByName(searchTerm);
      if (result) {
        setProduct(result);
      } else {
        setMessage("No product found with the given name.");
      }
    } catch (error) {
      console.error("Error searching for product:", error);
      setMessage("An error occurred while searching for the product.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Search Product</h1>
      <form onSubmit={handleSearch} className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {message && <p className="mt-4 text-red-500">{message}</p>}

      {product && (
        <div className="mt-6 bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">{product.name}</h2>
          <p className="text-gray-700">Price: ${product.price}</p>
        </div>
      )}
    </div>
  );
}