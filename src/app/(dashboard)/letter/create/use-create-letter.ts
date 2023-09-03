import { abi } from "@/lib/abi";
import { contract } from "@/lib/contract";
import { useContractWrite } from "wagmi";
import { Letter } from "../form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const useCreateLetter = () => {
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useContractWrite({
    abi,
    address: contract,
    functionName: "createLetter",
    chainId: 5001,
    onError(error) {
      if (error.name === "InvalidArrayError") {
        toast({
          variant: "destructive",
          title: "Receivers are empty",
          description: "Please provide at least one valid receiver address",
        });
      }
    },
    onSuccess() {
      router.push("/my-letters");
    },
  });

  const create = async ({ receivers, ...payload }: Letter) => {
    const encryptedData = await fetch("/api/letter/encrypt", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((res) => res.json());

    const cleanReceivers = (receivers?.filter(Boolean) ?? []) as string[];

    mutation.write({
      args: [JSON.stringify(encryptedData), cleanReceivers],
    });
  };

  return { create, ...mutation };
};
