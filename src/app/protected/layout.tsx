"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = useSession({
  // required: true,
  // onUnauthenticated() {
  // redirect("/auth/login");
  // },
  // });

  // if (session)
  return <section>{children}</section>;
  // else return <>Loading</>;
}
