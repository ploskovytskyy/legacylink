import { Chain } from "wagmi";

export const mantle = {
  id: 5001,
  name: "Mantle Testnet",
  network: "mantle_testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BIT",
    symbol: "BIT",
  },
  rpcUrls: {
    public: { http: ["https://rpc.testnet.mantle.xyz"] },
    default: { http: ["https://rpc.testnet.mantle.xyz"] },
  },
  blockExplorers: {
    default: {
      name: "Mantle Testnet Explorer",
      url: "https://explorer.testnet.mantle.xyz",
    },
  },
  testnet: true,
} as const satisfies Chain;
