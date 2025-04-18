import React from 'react';
import { artikal } from  "@/actions/artikli.actions";
import { redirect } from 'next/navigation';
import Link from 'next/link';
export const fetchCache = 'force-no-store';

export default async function  Artikli() {

  const artikali = await artikal();

 if (!artikali || artikali.length === 0) {
    redirect('/artikli');
 }
return (

      <div className="flex flex-col items-center justify-center min-h-screen">
         <Link className='text-emerald-900' href="/artikli/novi">Dodaj</Link>
        <h1 className="text-3xl font-bold mb-6">Artikli</h1>
        <table className="table-auto border-collapse border border-gray-300 w-full max-w-4xl">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Naziv</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Cijena</th>
              <th className="border border-gray-300 px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {artikali.map((artikal: { id: number; naziv: string; cijena: number }) => (
              <tr key={artikal.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{artikal.id}</td>
                <td className="border border-gray-300 px-4 py-2">{artikal.naziv}</td>
                <td className="border border-gray-300 px-4 py-2">${artikal.cijena}</td>
                <td>
                  <Link className='text-emerald-600' href={`/artikli/${artikal.id}/update`}>Prikaži</Link>
                  <Link className='text-amber-700' href={`/artikli/${artikal.id}/delete`}>Ukloni</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }





// export default async function Product() {
//   const products = await productsAll();

//   if (!products || products.length === 0) {
//     redirect('/product');
//   }

//   return (

//     <div className="flex flex-col items-center justify-center min-h-screen">
//        <Link className='text-emerald-900' href="/product/new">Add</Link>
//       <h1 className="text-3xl font-bold mb-6">Products</h1>
//       <table className="table-auto border-collapse border border-gray-300 w-full max-w-4xl">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
//             <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
//             <th className="border border-gray-300 px-4 py-2 text-left">cijena</th>
//             <th className="border border-gray-300 px-4 py-2 text-left"></th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product: { id: number; name: string; cijena: number }) => (
//             <tr key={product.id} className="hover:bg-gray-50">
//               <td className="border border-gray-300 px-4 py-2">{product.id}</td>
//               <td className="border border-gray-300 px-4 py-2">{product.name}</td>
//               <td className="border border-gray-300 px-4 py-2">${product.cijena}</td>
//               <td>
//                 <Link className='text-emerald-600' href={`/product/${product.id}/update`}>Edit</Link>
//                 <Link className='text-amber-700' href={`/product/${product.id}/delete`}>Delete</Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // // API handler moved to a separate file
// import React from 'react';
// import { artikal } from  "@/actions/product.actions";
// import { redirect } from 'next/navigation';
// import Link from 'next/link';
// export const fetchCache = 'force-no-store';

// export default async function  Artikli() {

//   const artikali = await artikal();

// //  if (!artikali || artikali.length === 0) {
// //     redirect('/artikli');
// //   }


// return (
//   <>
//   <p className='text-emerald-900'>Artikli</p>

//   </>
//   );
// }