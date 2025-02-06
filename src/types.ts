import { Token, Tokensale } from "./interfaces";

export type TConfig = {
    chainId: bigint,
    emmetAddress: string,
    rpcs: string[]
    tokensaleAddress: string,
    usdtAddress: string
}

export type Helper = Token & Tokensale;