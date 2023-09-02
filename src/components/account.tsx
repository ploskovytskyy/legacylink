"use client";

import { User } from "lucide-react";
import { useAccount, useEnsName } from "wagmi";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Connect } from "./connect";

export function shortenAddress(address: string) {
  const prefixLength = 6; // Number of characters to keep at the beginning of the address
  const suffixLength = 4; // Number of characters to keep at the end of the address
  const ellipsis = "..."; // Ellipsis to indicate omitted characters

  if (address.length <= prefixLength + suffixLength) {
    return address; // Return the original address if it's already shorter than the desired length
  } else {
    const prefix = address.substring(0, prefixLength);
    const suffix = address.substring(address.length - suffixLength);
    return prefix + ellipsis + suffix;
  }
}

export function Account() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  if (!isConnected) {
    return <Connect />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" asChild>
          <div className="flex gap-2 items-center self-center">
            <User className="w-5" />
            <span className="hidden lg:block">
              {ensName ?? shortenAddress(address || "")}
              {ensName ? ` (${shortenAddress(address || "")})` : null}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Connect />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
