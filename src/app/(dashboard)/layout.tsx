import { Connect } from "@/components/connect";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="pb-20">
      <header className="z-20 sticky top-4 container">
        <div className="flex justify-between py-3 px-6 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-xl shadow-md shadow-black/[0.025]">
          <Link href="/" className="text-2xl self-center font-black">
            LOGO
          </Link>
          <div className="flex gap-2">
            <ThemeToggle />
            <Separator orientation="vertical" className="h-full" />
            <Connect />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
};

export default Layout;
