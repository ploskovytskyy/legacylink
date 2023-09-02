import Logo from "@/components/logo";

export default function Home() {
  return (
    <main className="container grid h-screen items-center justify-center">
      <h1 className="text-[12vw] font-medium flex items-center">
        <Logo className="w-[9vw] mr-[1.5vw]" />
        LegacyLink
      </h1>
    </main>
  );
}
