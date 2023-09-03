import { User } from "@/app/api/db/schema";
import { useQuery } from "@tanstack/react-query";

export const useMyInfo = ({ address }: { address?: string }) => {
  const query = useQuery<User>({
    queryKey: ["myInfo"],
    queryFn: () =>
      fetch(`/api/users/get-by-wallet?wallet=${address}`).then((res) =>
        res.json()
      ),
    enabled: !!address,
  });

  return query;
};
