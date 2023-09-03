import { abi } from "@/lib/abi";
import { contract } from "@/lib/contract";
import { useQuery } from "@tanstack/react-query";
import { useAccount, useContractRead } from "wagmi";
import { Letter } from "../form";
import { isValidJson } from "@/lib/utils";

type PayloadResponse = string;

export const useGetLetter = (letterId: string) => {
  const { address: user } = useAccount();

  const id = BigInt(letterId);

  const contractQuery = useContractRead({
    enabled: !!user,
    abi: abi,
    address: contract,
    functionName: "getLetterPayload",
    args: [id],
    chainId: 5001,
    cacheTime: 0,
  });

  const letter = contractQuery.data as PayloadResponse;

  const shouldProceed = !contractQuery.isLoading && isValidJson(letter);

  const decodeQuery = useQuery<Letter>({
    enabled: shouldProceed,
    queryKey: ["letters", letterId],
    queryFn: () =>
      fetch(`/api/letter/decrypt?payload=${letter}`).then((res) => res.json()),
    cacheTime: 0,
  });

  return {
    isLoading: contractQuery.isLoading || decodeQuery.isLoading,
    data: {
      id,
      data: decodeQuery.data,
    },
  };
};
