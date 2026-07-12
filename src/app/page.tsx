import { auth } from "@/auth";
import SignIn from "@/components/SignIn";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/");
  return (
    <div>
      {session?.user ? (
        <div>
          <h1>Welcome, {session.user.name}</h1>
          <p>Email: {session.user.email}</p>
          <Image
            src={session.user.image!}
            alt={session.user.name ?? "User Avatar"}
            width={72}
            height={80}
            // className="rounded-full"
            loading="eager"
          />
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
