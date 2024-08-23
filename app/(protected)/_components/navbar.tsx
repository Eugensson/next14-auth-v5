"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center p-4 rounded-md w-full max-w-[600px] bg-secondary shadow-md">
      <ul className="flex items-center gap-x-4">
        <li>
          <Button
            asChild
            variant={pathname === "/server" ? "default" : "outline"}
          >
            <Link href="/server">Server</Link>
          </Button>
        </li>
        <li>
          <Button
            asChild
            variant={pathname === "/client" ? "default" : "outline"}
          >
            <Link href="/client">Client</Link>
          </Button>
        </li>
        <li>
          <Button
            asChild
            variant={pathname === "/admin" ? "default" : "outline"}
          >
            <Link href="/admin">Admin</Link>
          </Button>
        </li>
        <li>
          <Button
            asChild
            variant={pathname === "/settings" ? "default" : "outline"}
          >
            <Link href="/settings">Settings</Link>
          </Button>
        </li>
      </ul>
      <UserButton />
    </nav>
  );
};
