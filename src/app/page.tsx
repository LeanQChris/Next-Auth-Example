"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // Get session in client side
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  console.log(session);

  useEffect(() => {
    if (session.status === "authenticated") {
      redirect("/protected");
    }
  }, [session]);

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="flex flex-col items-center gap-5 animate-pulse">
        <Image
          height={100}
          width={100}
          alt="Logo"
          className=""
          src="/images/logo.svg"
        />
        <span className="text-3xl font-semibold text-primary-title">
          NEXT AUTH
        </span>
      </div>
    </div>
  );
}
