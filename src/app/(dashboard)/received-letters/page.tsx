import { H1 } from "@/components/typography";
import Letters from "./letters";

export const runtime = "edge";

export default function Page() {
  return (
    <main className="container lg:px-9 py-28 lg:py-32">
      <div className="flex justify-between items-center mb-8 lg:mb-10">
        <H1>Received letters</H1>
      </div>
      <div className="grid grid-cols-2 gap-16">
        <Letters />
      </div>
    </main>
  );
}
