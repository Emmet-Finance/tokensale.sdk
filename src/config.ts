import { TConfig } from "./types";

export const mainnetConfig: TConfig = {
    chainId: 56n,
    emmetAddress: "0x6b30f76CecE9F92D27f0e9Ad78312E77709E74A5",
    tokensaleAddress: "",
    rpcs: [
        "https://binance.llamarpc.com",
        "https://bsc-rpc.publicnode.com",
        "https://bsc.blockrazor.xyz",
    ],
    usdtAddress: "0x55d398326f99059ff775485246999027b3197955"
}

export const testnetConfig: TConfig = {
    chainId: 97n,
    emmetAddress: "0xd455eba1b88d175778968c45d161bac6fd5c8e60",
    tokensaleAddress: "0x4558C2a410538a5f3dF05fE75619c847c0aAed34",
    rpcs: [
        // "https://api.zan.top/bsc-testnet",
        "https://bsc-testnet-rpc.publicnode.com",
        "https://endpoints.omniatech.io/v1/bsc/testnet/public",
    ],
    usdtAddress: "0xe8ab99474b8bb70d0cf258623fcac8d8681a1e50"
}