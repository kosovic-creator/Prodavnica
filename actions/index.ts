"use server";

import { db } from "@/prisma/db";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";


export async function getAllUsers() {
  try {
    return await db.user.findMany({
      orderBy: {
        id: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}



export async function createUserAction(
  formState: { message: string },
  formData: FormData
) {
  try {
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    let password = formData.get("password") as string;
    const email = formData.get("email") as string;
    if (!name || !username || !password || !email) {
      return { message: "Sva polja su obavezna" };
    }

    const duplicate = await db.user.findUnique({
      where: {
        username: username,
      },
    });

    if (duplicate) {
      return { message: "Korisnik već pstoji." };
    }

    if (password.length < 5) {
      return { message: "Šifra je kratka." };
    }

    password = await bcrypt.hash(password, 10);

    await db.user.create({ data: { name, username,email, password } });
  } catch (err: unknown) {
    return {
      message: "Nepoznata greška!",
    };
  }
  redirect("/");
}

export async function deleteUserAction(
  formState: { message: string },
  formData: FormData
) {
  try {
    const id = formData.get("id") as string;
    if (!id) {
      return { message: "ID je obavezno." };
    }
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return { message: "ID mora biti broj." };
    }
    db.user.delete({ where: { id: numericId } });
  } catch (err: unknown) {
    return {
      message: "Nepoznata greška!",
    };
  }
  redirect("/");
}

export async function deleteById(id: number | string) {
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  if (!numericId || isNaN(numericId)) {
    throw new Error("Invalid ID provided.");
  }
  try {
    // Proverite da li korisnik postoji
    const user = await db.user.findUnique({
      where: { id: numericId },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    // Ako korisnik postoji, obrišite ga
    await db.user.delete({
      where: { id: numericId },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

export async function updateUserAction(
  formState: { message: string },
  formData: FormData
) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    let password = formData.get("password") as string;
    const email = formData.get("email") as string;

    if (!id || !name || !username || !password || !email) {
      return { message: "Sva polja su obavezna" };
    }

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return { message: "ID mora biti broj." };
    }

    password = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id: numericId },
      data: { name, username, email, password },
    });
  } catch (err: unknown) {
    return {
      message: "Nepoznata greška!",
    };
  }
  redirect("/");
}
export async function getUserById(id: number | string) {
  console.log("Received ID:", id); // Debugging line
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;

  if (!numericId || isNaN(numericId)) {
    throw new Error("Invalid ID provided.");
  }

  try {
    const user = await db.user.findUnique({
      where: { id: numericId },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
export async function updateUserById(
  id: number | string,
  data: { name?: string; username?: string; email?: string; password?: string }
): Promise<void> {
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;

  if (!numericId || isNaN(numericId)) {
    throw new Error("Invalid ID provided.");
  }

  try {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await db.user.update({
      where: { id: numericId },
      data,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
