import { TConfig } from "./types";

export const mainnetConfig: TConfig = {
    airdropAddress: "0xA1D2b601445C001CAb4Ec652c703d191856da627",
    chainId: 56n,
    tokenAddresses: {
        EMMET: "0x6b30f76CecE9F92D27f0e9Ad78312E77709E74A5",
        NTM: "0xb8AA2a3bA6bEbE4ed7107028b26fae85a1044B57",
        USDC: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
        USDT: "0x55d398326f99059ff775485246999027b3197955",
    },
    stakingAddress: {
        EMMET: "0x19Dc6ff2D315037adEa3a071C8aF9F2751B73b0A",
        NTM: "0x8746A45910D0aF7e15C13f5Df10F072913387197",

    },
    tokensales: {
        USDC: "0xAc6c21d476E6fAfdB462ceEC88225c1a24f59f26",
        USDT: "0x02D4c32a5D68ABEE334d68f21C81012C37D625b7"
    },
    rpcs: [
        "https://bnb.rpc.subquery.network/public",
        "https://bsc.rpc.blxrbdn.com",
        "https://bsc-rpc.publicnode.com",
        "https://bsc.blockrazor.xyz",
        "https://rpc-bsc.48.club",
        "https://bsc-dataseed1.ninicoin.io",
        "https://bsc-dataseed2.ninicoin.io",
        "https://bsc-dataseed3.ninicoin.io",
        "https://bsc-dataseed4.ninicoin.io",
        "https://bsc-dataseed1.bnbchain.org",
        "https://bsc-dataseed2.bnbchain.org",
        "https://bsc-dataseed3.bnbchain.org",
        "https://bsc-dataseed4.bnbchain.org",
        "https://bsc-pokt.nodies.app",
        "https://rpc-bsc.48.club",
        "https://0.48.club",
        "https://1rpc.io/bnb",
        "https://bsc-rpc.publicnode.com",
        "https://bsc-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf",
        "https://bsc.rpc.blxrbdn.com",
        "https://api.zan.top/bsc-mainnet",
        
    ],
}

export const testnetConfig: TConfig = {
    airdropAddress: "",
    chainId: 97n,
    tokenAddresses: {
        EMMET: "0xd455eba1b88d175778968c45d161bac6fd5c8e60",
        NTM: "",
        USDC: "",
        USDT: "0xe8ab99474b8bb70d0cf258623fcac8d8681a1e50",
    },
    stakingAddress: {
        EMMET: "0xD914c365f5177AaC9E91D3477e43d0Ca10768d52",
        NTM: "",
    },
    tokensales: {
        USDC: "",
        USDT: "0x4558C2a410538a5f3dF05fE75619c847c0aAed34"
    },
    rpcs: [
        "https://bsc-testnet-rpc.publicnode.com",
        "https://endpoints.omniatech.io/v1/bsc/testnet/public",
    ],
}