"use client";

import LetterForm from "../form";
import { useGetLetter } from "./use-get-letter";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useGetLetter(params.id);

  if (isLoading) return <p>Loading...</p>;

  console.log(data);

  return (
    <main className="container py-28 lg:py-32 lg:px-9">
      <LetterForm />
    </main>
  );
}

export const runtime = "edge";
