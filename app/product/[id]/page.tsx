import { getProductById } from "@/actions/product.actions";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } =await params;

  try {
    const product = await getProductById(Number(id));

    if (!product) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold mb-6">Product Not Found</h1>
          <p>No product found with ID {id}.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Product Details</h1>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4">{product.name}</h2>
          <p className="text-gray-700">Price: ${product.price}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <p>Failed to fetch product details. Please try again later.</p>
      </div>
    );
  }
}