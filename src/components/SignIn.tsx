import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <button type="submit" className="border cursor-pointer">
        Signin with Google
      </button>
    </form>
  );
}
