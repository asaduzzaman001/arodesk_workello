import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import MyBtn from "./MyBtn";

interface NavLink {
  name: string;
  href: string;
}
const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Workspaces", href: "/workspaces" },
  { name: "Login", href: "/login" },
];
export default function Navbar(): React.ReactNode {
  return (
    <nav className="flex items-center justify-between border-b-2 border-border px-5 py-2 md:px-10 md:py-5 lg:px-20 xl:px-40">
      <div className="text-2xl font-bold text-primary">Workello</div>
      <div className="flex items-center gap-5">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} className="mx-2">
            <MyBtn title={link.name} />
          </Link>
        ))}
        <ModeToggle />
      </div>
    </nav>
  );
}
