"use client";

import { useAccount } from "wagmi";
import { useMyInfo } from "../use-my-info";
import { FormSchema, InfoForm } from "./form";

const MyInfoForm = () => {
  const { address } = useAccount();

  const { data: myInfo, isLoading } = useMyInfo({
    address,
  });

  if (!address || isLoading)
    return (
      <div className="grid gap-4 glass-bg p-6 rounded-xl h-[400px] animate-pulse"></div>
    );

  const isError = !!(myInfo as unknown as { error: string }).error;

  const emptyUser: FormSchema = {
    id: undefined,
    fullName: "",
    email: "",
    wallet: address,
  };

  return (
    <InfoForm
      isNoUser={isError}
      defaultValues={isError ? emptyUser : myInfo ?? emptyUser}
    />
  );
};

export default MyInfoForm;
