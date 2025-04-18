import { deleteById} from "@/actions/index";
import ToastHandler from "@/components/ToastHandler";
import Link from 'next/link';
import { notFound } from 'next/navigation';
export const fetchCache = 'force-no-store';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const deletionResult = await deleteById(parseInt(id));

  if (deletionResult === undefined) {
    notFound();
  }

//   <ToastHandler message={`Product with ID ${id} has been successfully deleted.`} />
    return (
      <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Ukloni Korisnika</h1>
        <form className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
          <p>Korisnik sa ID {id} biće uklonjen.</p>
          <Link href="/admin/korisnici"  className="text-blue-800 underline">Vrati se na stranu Korisnici</Link>
        </form>
      </div>


      </>
    );
  }



