"use client";

import LetterForm from "../form";

export default function Page() {
  return (
    <main className="container py-28 lg:py-32 lg:px-9">
      <LetterForm isCreateMode />
    </main>
  );
}

export const runtime = "edge";
