'use server'

import { db } from "@/prisma/db";


export async function artikal() {
  try {
    return await db.artikal.findMany({
        orderBy: {
            cijena: "desc",
        }
        });
  } catch (error) {
    console.error("Error fetching artikals:", error);
    throw error;
  }
}


export async function dodajArtikal(data: { naziv: string; cijena: number }) {
  try {
    return await db.artikal.create({
      data,
    });
  } catch (error) {
    console.error("Error creating artikal:", error);
    throw error;
  }
}


export async function izmjeniArtikal(id: number, data: { naziv?: string; cijena?: number }) {
  try {
    return await db.artikal.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Greška u izmjeni podataka:", error);
    throw error;
  }
}

export async function ukloniArtikal(id: number) {
  try {
    return await db.artikal.delete({
      where: { id },
    }
  );

  } catch (error) {
    console.error("Error deleting artikal:", error);
    throw error;
  }
}
export async function prikaziArtikalId(id: number) {
  try {
    return await db.artikal.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching artikal by ID:", error);
    throw error;
  }
}
export async function prikaziArtiklPoNazivu(naziv: string) {
  try {
    return await db.artikal.findFirst({
      where: { naziv },
    });
  } catch (error) {
    console.error("Error fetching artikal by naziv:", error);
    throw error;
  }
}
// export async function getartikalBynazivOrcijena(naziv: string, cijena: number) {
//   try {
//     return await db.artikal.findFirst({
//       where: {
//        OR: [{ naziv: naziv }, { cijena: cijena }]

//       },
//     });
//   } catch (error) {
//     console.error("Error fetching artikal by naziv and cijena:", error);
//     throw error;
//   }
// }
