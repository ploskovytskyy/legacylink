"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAccount } from "wagmi";

export default function Nav() {
  const { isConnected } = useAccount();

  if (!isConnected) return null;

  return (
    <nav className="flex gap-1 flex-grow whitespace-nowrap">
      <Button variant="ghost" asChild className="px-2 h-8 lg:h-9 lg:px-3">
        <Link href="/my-letters">My letters</Link>
      </Button>
      <Button variant="ghost" asChild className="px-2 h-8 lg:h-9 lg:px-3">
        <Link href="/received-letters">Received letters</Link>
      </Button>
    </nav>
  );
}
