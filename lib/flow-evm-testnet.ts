import { defineChain } from "thirdweb/chains";

export const flowEvmTestnet = defineChain({
  id: 545,
  name: "Flow EVM Testnet",
  nativeCurrency: {
    name: "Flow",
    symbol: "FLOW",
    decimals: 18,
  },
  rpc: "https://545.rpc.thirdweb.com",
  rpcUrls: {
    default: { http: ["https://545.rpc.thirdweb.com"] },
    public: { http: ["https://545.rpc.thirdweb.com"] },
  },
  blockExplorers: [
    { name: "Flow Explorer", url: "https://testnet.flowscan.org/" },
  ],
  testnet: true,
});
