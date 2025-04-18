import { deleteProduct } from "@/actions/product.actions";
import ToastHandler from "@/components/ToastHandler";
import Link from 'next/link';
import { notFound } from 'next/navigation';
export const fetchCache = 'force-no-store';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const prod = await deleteProduct(parseInt(id));

  if (!prod) {
    notFound();
  }

  <ToastHandler message={`Product with ID ${id} has been successfully deleted.`} />
    return (
      <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Delete Product</h1>
        <form className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
          <p>Product with ID {id} has been deleted.</p>
          <Link href="/product"  className="text-blue-800 underline">Go back to product list</Link>
        </form>
      </div>


      </>
    );
  }



