"use client";

import { useRouter } from "next/navigation";
import LetterForm from "../form";
import { useGetLetter } from "./use-get-letter";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const {
    data: { data, id },
    isLoading,
  } = useGetLetter(params.id);

  const router = useRouter();

  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !data) {
      toast({
        title: "Letter not found",
        description: "Yeah, this is demo, and letter was not found",
      });
      router.push("/my-letters");
    }
  }, [isLoading, data, router, toast]);

  if (isLoading)
    return (
      <main className="container py-28 lg:py-32 lg:px-9">
        <p>Loading...</p>{" "}
      </main>
    );

  return (
    <main className="container py-28 lg:py-32 lg:px-9">
      <LetterForm id={id} defaultValues={data} />
    </main>
  );
}

export const runtime = "edge";
