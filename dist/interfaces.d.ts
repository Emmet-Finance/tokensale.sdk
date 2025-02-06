import { Signer } from "ethers";
export type TSymbol = "EMMET" | "USDT";
export interface Token {
    allowance: (address: string, symbol: TSymbol) => Promise<bigint>;
    balance: (address: string, symbol: TSymbol) => Promise<bigint>;
    approve: (signer: Signer, amount: bigint) => Promise<string | undefined>;
}
export interface Tokensale {
    claimable: (address: string) => Promise<bigint>;
    estimate: (pay: bigint) => Promise<bigint>;
    buy: (signer: Signer, pay: bigint, ref: string) => Promise<string | undefined>;
    claim: (signer: Signer) => Promise<string | undefined>;
    createReference: (signer: Signer, ref: string) => Promise<string | undefined>;
}
//# sourceMappingURL=interfaces.d.ts.map