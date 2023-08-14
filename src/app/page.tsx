import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/Buttons";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOption);
  console.log(session);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />

        <h1>Server Session</h1>
        <pre>{JSON.stringify(session)}</pre>
      </div>
    </main>
  );
}
