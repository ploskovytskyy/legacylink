import { abi } from "@/lib/abi";
import { contract } from "@/lib/contract";
import { useQuery } from "@tanstack/react-query";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import { Letter } from "../letter/form";

export const useMyLetters = () => {
  const { address: user } = useAccount();

  const { data, isLoading } = useContractRead({
    abi,
    address: contract,
    chainId: 5001,
    enabled: !!user,
    functionName: "getLetters",
    args: [user],
    cacheTime: 0,
  });

  const letters = (data as bigint[]).filter((id) => id !== 0n);

  const { data: payloads, isLoading: isPayloadsLoading } = useContractReads({
    enabled: !!letters?.length,
    //@ts-ignore
    contracts: letters.map((letterId) => ({
      abi,
      address: contract,
      chainId: 5001,
      functionName: "getLetterPayload",
      args: [BigInt(letterId)],
    })),
    cacheTime: 0,
  });

  const payloadPromises = (payloads || [])
    .map((payload, index) => ({ ...payload, id: letters[index] }))
    .filter((payload) => payload.status === "success")
    .map((payload) =>
      fetch(`/api/letter/decrypt?payload=${payload.result}`)
        .then((res) => res.json())
        .then((result) => ({ id: payload.id, ...result }))
    );

  const decodeQuery = useQuery<(Letter & { id: bigint })[]>({
    enabled: !!payloadPromises.length,
    queryKey: ["letters"],
    queryFn: () => Promise.all(payloadPromises),
    cacheTime: 0,
  });

  return {
    data: decodeQuery.data,
    isLoading:
      isLoading ||
      (letters.length && (isPayloadsLoading || decodeQuery.isLoading)),
  };
};
