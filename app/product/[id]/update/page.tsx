'use client';
import { updateProduct, getProductById } from "@/actions/product.actions";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export const fetchCache = "force-no-store";

export default function UpdateProductPage() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
    const router = useRouter();

  // Fetch current product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const product = await getProductById(Number(id));
        if (product) {
          setName(product.name);
          setPrice(product.price.toString());

        } else {
          setMessage("Product not found.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setMessage("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [id, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (!id) {
        setMessage("Product ID is missing.");
        return;
      }

      const updatedProduct = await updateProduct(Number(id), {
        name,
        price: parseFloat(price),
      });

      setMessage("Product updated successfully!");
      router.push(`/product/`);
      console.log("Updated Product:", updatedProduct);
    } catch (error) {
      setMessage("Failed to update product.");
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Update Product</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4 mt-4">
        <div>
          <label htmlFor="name" className="block font-medium">
            Product Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block font-medium">
            Product Price:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}