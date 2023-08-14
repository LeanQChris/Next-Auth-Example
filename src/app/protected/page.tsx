import React from "react";
import { getServerSession } from "next-auth";

import { authOption } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protected Route",
};

export default async function ProtectedPage() {
  const session = await getServerSession(authOption);

  console.log(session);
  if (session?.user?.name === undefined) {
  }

  return (
    <div>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
