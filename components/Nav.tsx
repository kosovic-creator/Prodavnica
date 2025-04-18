import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import {  HomeIcon } from "lucide-react";


const Nav = async () => {
  const session = await getServerSession(options);
  //console.log(session);
  return (
    <header className="bg-black text-white">
      <nav className="flex justify-between items-center w-full px-10 py-4">
      <Link href="/"><HomeIcon/></Link>
        <div className="flex gap-10">


          {session?.user.role == "ADMIN" && (
            <Link href="/CreateUser">Dodaj Korisnika</Link>
          )}
          <Link href="/ClientMember"></Link>
          <Link href="/Member"></Link>
          <Link href="/Public"></Link>
          <Link href="/admin/artikli">Artikli</Link>
          <Link href="/admin/artikli/trazi">Traži</Link>
          {session ? (
            <>
              <p>{session.user.name}</p>
              {/* <p>{session.user.email}</p> */}
              <Link href="/api/auth/signout?callbackUrl=/">Odjavi se</Link>
            </>
          ) : (
            <Link href="/api/auth/signin">Prijavi se</Link>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Nav;
