'use server'

import { db } from "@/prisma/db";


export async function productsAll() {
  try {
    return await db.product.findMany({
        orderBy: {
            price: "desc",
        }
        });
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
// export async function productById(id: number) {
//   try {
//     return await prisma.product.findUnique({
//       where: { id },
//     });
//   } catch (error) {
//     console.error("Error fetching product by ID:", error);
//     throw error;
//   }
// }
// export async function productByName(name: string) {
//   try {
//     return await prisma.product.findFirst({
//       where: { name },
//     });
//   } catch (error) {
//     console.error("Error fetching product by name:", error);
//     throw error;
//   }
// }

export async function createProduct(data: { name: string; price: number }) {
  try {
    return await db.product.create({
      data,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}


export async function updateProduct(id: number, data: { name?: string; price?: number }) {
  try {
    return await db.product.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProduct(id: number) {
  try {
    return await db.product.delete({
      where: { id },
    }
  );

  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
export async function getProductById(id: number) {
  try {
    return await db.product.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
}
export async function getProductByName(name: string) {
  try {
    return await db.product.findFirst({
      where: { name },
    });
  } catch (error) {
    console.error("Error fetching product by name:", error);
    throw error;
  }
}
export async function getProductByNameOrprice(name: string, price: number) {
  try {
    return await db.product.findFirst({
      where: {
       OR: [{ name: name }, { price: price }]

      },
    });
  } catch (error) {
    console.error("Error fetching product by name and price:", error);
    throw error;
  }
}
