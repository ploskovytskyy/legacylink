"use client";

import { toast } from "@/components/ui/use-toast";
import { abi } from "@/lib/abi";
import { contract } from "@/lib/contract";
import { useRouter } from "next/navigation";
import { useContractWrite, useQueryClient } from "wagmi";

export default function useDeleteLetter() {
  const client = useQueryClient();
  const router = useRouter();

  const mutation = useContractWrite({
    abi: abi,
    address: contract,
    functionName: "deleteLetter",
    chainId: 5001,
    onError(error) {
      toast({
        variant: "destructive",
        title: "Well...some error",
        description: error.message,
      });
    },
    onSuccess() {
      client.getQueriesData(["letters"]).forEach((letter) => {
        client.invalidateQueries(letter[0]);
      });
      router.refresh();
    },
  });

  return mutation;
}
