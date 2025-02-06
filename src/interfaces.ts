import { Signer } from "ethers";

export type TSymbol = "EMMET" | "USDT";

export interface Token {
    // READ
    allowance: (address: string, symbol: TSymbol) => Promise<bigint>;
    balance: (address: string, symbol: TSymbol) => Promise<bigint>;
    // WRITE
    approve: (signer: Signer, amount: bigint) => Promise<string|undefined>;
}

export interface Tokensale {
    // READ
    claimable: (address: string) => Promise<bigint>;
    estimate: (pay: bigint) => Promise<bigint>;
    // WRITE
    buy: (signer: Signer, pay: bigint, ref: string) => Promise<string|undefined>;
    claim: (signer: Signer) => Promise<string|undefined>;
    createReference: (signer: Signer, ref: string) => Promise<string|undefined>;
}