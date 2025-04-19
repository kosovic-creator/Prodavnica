'use client';
import { deleteById } from '@/app/test/action/actions';
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

export const fetchCache = 'force-no-store';

interface PageProps {
  params: { id: string };
}

export default function Delete({ params }: PageProps) {
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const handleDelete = async () => {
      try {
        await deleteById(parseInt(id)); // Ensure the deletion is completed
        router.push("/test"); // Navigate after deletion
      } catch (error) {
        console.error("Error deleting the item:", error);
      }
    };

    handleDelete();
  }, [id, router]);

  return null; // No UI is rendered
}



