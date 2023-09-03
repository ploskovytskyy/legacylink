import { abi } from "@/lib/abi";
import { contract } from "@/lib/contract";
import { useAccount, useContractRead } from "wagmi";

export const useMyLetters = () => {
  const { address: user } = useAccount();

  const query = useContractRead({
    enabled: !!user,
    abi,
    address: contract,
    functionName: "getLetters",
    args: [user],
    chainId: 5001,
  });

  return query;
};
