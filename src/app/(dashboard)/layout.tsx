import { Account } from "@/components/account";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Nav from "./nav";
import Logo from "@/components/logo";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header className="z-50 fixed top-4 w-full">
        <div className="container px-2 lg:px-4">
          <div className="flex justify-between py-3 pr-2 pl-4 lg:px-6 rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-md shadow-black/[0.025]">
            <div className="self-center flex items-center">
              <Link
                href="/"
                className="text-2xl font-black mr-2 lg:mr-6 uppercase"
              >
                <Logo className="w-6" />
              </Link>
              <Nav />
            </div>
            <div className="flex gap-1 lg:gap-2">
              <ThemeToggle />
              <Separator orientation="vertical" className="h-full" />
              <Account />
            </div>
          </div>
        </div>
      </header>
      {children}
    </>
  );
};

export default Layout;
