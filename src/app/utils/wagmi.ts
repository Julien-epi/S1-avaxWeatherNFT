import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { avalancheFuji } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    chains: [avalancheFuji],
    connectors: [
      walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [avalancheFuji.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
