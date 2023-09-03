"use client";

import { Button } from "@/components/ui/button";
import { Maximize } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { H3 } from "@/components/typography";
import { letterData } from "./letter-data";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const Letters = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  if (!isConnected) {
    router.push("/");
  }
  return (
    <div className="grid gap-5">
      <LetterCard id="1" name="Eth wallet and passwords" from="Sender Name" />
    </div>
  );
};

const LetterCard = ({
  id,
  name,
  from,
}: {
  id: string;
  name: string;
  from: string;
}) => {
  return (
    <div className="glass-bg px-3 lg:px-6 py-3 lg:py-4 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-3 max-w-sm">
        <div className="grid">
          <p className="opacity-60 text-sm">From: {from}</p>
          <p className="text-lg leading-snug line-clamp-1 font-semibold">
            {name}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2" variant="ghost">
              <Maximize className="w-4" />
              Open
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className="">
              <H3 className="mb-6">Sender Name</H3>
              <p className="border-l px-4 mb-12">{letterData.text}</p>
              <H3 className="mb-4">Wallets:</H3>
              <div className="border p-4 rounded-xl mb-10">
                {letterData.wallets.map((wallet, index) => (
                  <div className="mb-10 last-of-type:mb-0" key={index}>
                    <p className="opacity-60 mb-4 font-semibold">
                      {wallet.address}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {wallet.seedPhrase.map((seed, seedIndex) => (
                        <span
                          key={seedIndex}
                          className="p-2 border rounded-lg font-medium text-center bg-foreground/[0.01]"
                        >
                          {seed}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <H3 className="mb-4">Passwords:</H3>
              <div className="grid gap-2 border p-4 rounded-xl">
                {letterData.passwords.map((password, index) => (
                  <p className="font-semibold" key={index}>
                    {password.name}:{" "}
                    <span className="opacity-60">{password.password}</span>
                  </p>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Letters;
