"use client";

import * as React from "react";
import { WagmiConfig } from "wagmi";

import { config } from "@/lib/wagmi";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

type Props = PropsWithChildren<ThemeProviderProps>;

export function Providers({ children, ...props }: Props) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <NextThemesProvider {...props}>
      <WagmiConfig config={config}>{mounted && children}</WagmiConfig>
    </NextThemesProvider>
  );
}
