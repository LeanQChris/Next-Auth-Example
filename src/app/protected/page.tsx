import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function ProtectedPage() {
  const session = await getServerSession(authOption);
  console.log(session);
  return (
    <div>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
