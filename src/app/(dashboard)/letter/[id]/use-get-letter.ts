import { abi } from "@/lib/abi";
import { contract } from "@/lib/contract";
import { useQuery } from "@tanstack/react-query";
import { useAccount, useContractRead } from "wagmi";
import { Letter } from "../form";
import { isValidJson } from "@/lib/utils";
import { notFound } from "next/navigation";

type LetterResponse = {
  creator: string;
  payload: string;
  receivers: string[];
};

export const useGetLetter = (letterId: string) => {
  const { address: user } = useAccount();

  const id = BigInt(letterId);

  const contractQuery = useContractRead({
    enabled: false,
    abi: abi,
    address: contract,
    functionName: "getLetter",
    args: [id],
    chainId: 5001,
  });

  const letter = contractQuery.data as LetterResponse | undefined;
  const isValid = isValidJson(letter?.payload || "");

  const shouldProceed = letter && letter.creator === user && isValid;

  if (!shouldProceed) {
    notFound();
  }

  const decodeQuery = useQuery<Letter>({
    enabled: shouldProceed,
    queryKey: ["letter", letterId],
    queryFn: () =>
      fetch(`/api/letter/decode`, {
        method: "GET",
        body: letter?.payload,
      }).then((res) => res.json()),
  });

  return {
    isLoading: contractQuery.isLoading || decodeQuery.isLoading,
    data: decodeQuery.data,
  };
};
