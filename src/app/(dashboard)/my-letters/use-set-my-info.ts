import { User } from "@/app/api/db/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSetMyInfo = () => {
  const client = useQueryClient();

  const query = useMutation({
    mutationKey: ["setMyInfo"],
    mutationFn: (user: Partial<User>) =>
      fetch(`/api/users/update`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    onSuccess() {
      client.invalidateQueries(["myInfo"]);
    },
  });

  return query;
};
