import { configureChains, createConfig } from "wagmi";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { publicProvider } from "wagmi/providers/public";
import { mantle } from "./mantle-chain";

const walletConnectProjectId = "82b51be0bbf054ce1022af5858fb0065";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mantle],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     projectId: walletConnectProjectId,
    //   },
    // }),
  ],
  publicClient,
  webSocketPublicClient,
});
