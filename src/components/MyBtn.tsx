import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface Props {
  title: string;
  style?: string;
  [key: string]: unknown;
}

export default async function MyBtn({
  title,
  style = "cursor-pointer border-primary text-text hover:text-foreground hover:bg-primary px-4 py-2 rounded-md font-semibold text-sm border-t-2 border-b-2",
  ...props
}: Props): Promise<React.ReactNode> {
  const session = await auth();

  if (session?.user && title === "Login")
    return (
      <Avatar>
        <AvatarImage src={session.user?.image || undefined} />
        <AvatarFallback>
          {session.user?.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
    );
  return (
    <button className={`${style}`} {...props}>
      {title}
    </button>
  );
}
