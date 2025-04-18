
'use client';

import { useState } from 'react';
import { createProduct } from "@/actions/product.actions";
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import productSchema from '@/types';

export default function NewProductPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const productSchema = z.object({
    //   name: z.string().min(4, 'Product name is required'),
    //   price: z
    //     .string()
    //     .regex(/^\d+(\.\d{1,2})?$/, 'Price must be a valid number with up to 2 decimal places'),
    // });
    try {
      // Validirajte unos pomoću Zod šeme
      productSchema.parse({ name, price });

      const priceNumber = parseFloat(price);

      await createProduct({ name, price: priceNumber });

      setMessage('Product created successfully!');

      router.push(`/product/`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Prikazivanje grešaka validacije
        setMessage(error.errors[0].message);
      } else {
        console.error('Error creating product:', error);
        setMessage('Failed to create product.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create New Product</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
}