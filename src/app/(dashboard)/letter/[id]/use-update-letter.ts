import { abi } from "@/lib/abi";
import { contract } from "@/lib/contract";
import { useContractWrite, usePublicClient } from "wagmi";
import { Letter } from "../form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateLetter = () => {
  const { toast } = useToast();
  const router = useRouter();

  const client = useQueryClient();

  const mutation = useContractWrite({
    abi,
    address: contract,
    functionName: "updateLetter",
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
      router.push("/my-letters");
    },
  });

  const update = async ({
    payload: { receivers, ...payload },
    id,
  }: {
    payload: Letter;
    id: bigint;
  }) => {
    const encryptedData = await fetch("/api/letter/encrypt", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((res) => res.json());

    const cleanReceivers = (receivers?.filter(Boolean) ?? []) as string[];

    mutation.write({
      args: [id, JSON.stringify(encryptedData), cleanReceivers],
    });
  };

  return { update, ...mutation };
};
