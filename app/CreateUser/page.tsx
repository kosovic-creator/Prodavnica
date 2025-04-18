"use client";

import { useFormState } from "react-dom";
import { createUserAction } from "@/actions";

const CreateUser = () => {
  const [formState, action] = useFormState(createUserAction, { message: "" });

  return (
    <form action={action} className="flex flex-col gap-3 w-1/2">
      <h1>Dodaj Novog Korisnika</h1>
      <label>Ime i Prezime</label>
      <input id="name" name="name" className="border rounded p-2 w-full" />

      <label>Korisničko Ime</label>
      <input
        id="username"
        name="username"
        className="border rounded p-2 w-full"
      />
       <label>Email</label>
      <input
        id="email"
        name="email"
        className="border rounded p-2 w-full"
      />
      <label>Password</label>
      <input
        id="password"
        name="password"
        type="password"
        className="border rounded p-2 w-full"
      />
      <input
        type="submit"
        value="Dodaj Korisnika"
        className="rounded p-2 bg-black text-zinc-50 hover:bg-slate-800e-200"
      />
      {formState.message && <p className="text-red-500">{formState.message}</p>}
    </form>
  );
};
export default CreateUser;
