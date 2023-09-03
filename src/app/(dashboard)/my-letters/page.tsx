import { H1 } from "@/components/typography";

import MyInfoForm from "./my-info-form";

import Letters from "./letters";

export const runtime = "edge";

export default function Home() {
  return (
    <main className="container lg:px-9 py-28 lg:py-32 grid lg:grid-cols-[2fr_1fr] gap-16">
      <div className="">
        <div className="flex justify-between items-center mb-10">
          <H1>My letters</H1>
        </div>
        <Letters />
      </div>
      <div className="">
        <H1 className="mb-10">My contact info</H1>
        <MyInfoForm />
      </div>
    </main>
  );
}
