"use client";

import { User } from "@/app/api/db/schema";
import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { abi } from "@/lib/abi";
import { contract } from "@/lib/contract";
import { useQuery } from "@tanstack/react-query";
import { useContractWrite } from "wagmi";

export default function Page() {
  const { toast } = useToast();

  const { data, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users/get-all").then((res) => res.json()),
  });

  const handleSend = () => {
    //TODO: fetch all letters by a specific user and loop sending
    // sendLetter(letterId)
  };

  const { write: sendLetter, isLoading: isSending } = useContractWrite({
    abi: abi,
    address: contract,
    functionName: "sendLetter",
    chainId: 5001,
    onSuccess() {
      toast({
        title: "Let it go..",
        description: "Letter has been sent successfully",
      });
    },
  });

  return (
    <main className="container py-28 lg:py-32 lg:px-9">
      <H1 className="mb-10">Users</H1>
      {isLoading ? (
        <div className="">Loading...</div>
      ) : (
        <div className="">
          {data?.map((user) => (
            <div
              key={user.id}
              className="flex items-center glass-bg p-4 rounded-xl justify-between"
            >
              <div className="">
                <p className="text-sm opacity-60">{user.wallet}</p>
                <p className="text-xl font-bold">{user.fullName}</p>
              </div>
              <Button disabled onClick={handleSend}>
                Approve death
              </Button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
