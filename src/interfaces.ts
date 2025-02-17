import { Signer } from "ethers";
import { TUserPositions, Period } from "./types";

export type TSymbol = "EMMET" | "USDT";

export interface Token {
    // READ
    allowance: (address: string, symbol: TSymbol) => Promise<bigint>;
    balance: (address: string, symbol: TSymbol) => Promise<bigint>;
    // WRITE
    approve: (signer: Signer, amount: bigint) => Promise<string | undefined>;
}

export interface Tokensale {
    // READ
    claimable: (address: string) => Promise<bigint>;
    estimate: (pay: bigint) => Promise<bigint>;
    isRegisteredRef: (ref: string) => Promise<boolean>;
    // WRITE
    buy: (signer: Signer, pay: bigint, ref: string) => Promise<string | undefined>;
    claim: (signer: Signer) => Promise<string | undefined>;
    createReference: (signer: Signer, ref: string) => Promise<string | undefined>;
}

export interface IStaking {
    // READ
    positions: (address: string) => Promise<TUserPositions>;
    // WRITE
    stake: (signer: Signer, amount: bigint, period: Period) => Promise<string | undefined>;
    unstake: (signer: Signer, posIndex: number) => Promise<string | undefined>;
    withdrawRewards: (signer: Signer, posIndex: number) => Promise<string | undefined>;
}