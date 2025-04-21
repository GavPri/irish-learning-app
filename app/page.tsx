'use client'
import { UserButton} from "@clerk/nextjs";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {

  const {user, isLoaded} = useUser()

  if (!isLoaded){
    return <div>Loading...</div>
  }

  const SignedOutUserNavLinks = (
    <div>
      <Link href={"/auth/sign-up"}>Sign Up</Link>
      <Link href={"/auth/sign-in"}>Sign In</Link>
    </div>
  );


  return (
    <section>
      {user ? <UserButton/> : SignedOutUserNavLinks}
    </section>
  );
}
