import { Signer } from "ethers";
import { TUserPositions, Period } from "./types";
export type TSymbol = "EMMET" | "USDT";
export interface Token {
    allowance: (address: string, symbol: TSymbol) => Promise<bigint>;
    balance: (address: string, symbol: TSymbol) => Promise<bigint>;
    approve: (signer: Signer, amount: bigint) => Promise<string | undefined>;
    stakingAllowance: (address: string) => Promise<bigint>;
    stakingApprove: (signer: Signer, amount: bigint) => Promise<string | undefined>;
}
export interface Tokensale {
    claimable: (address: string) => Promise<bigint>;
    estimate: (pay: bigint) => Promise<bigint>;
    isRegisteredRef: (ref: string) => Promise<boolean>;
    buy: (signer: Signer, pay: bigint, ref: string) => Promise<string | undefined>;
    claim: (signer: Signer) => Promise<string | undefined>;
    createReference: (signer: Signer, ref: string) => Promise<string | undefined>;
}
export interface IStaking {
    positions: (address: string) => Promise<TUserPositions>;
    stake: (signer: Signer, amount: bigint, period: Period) => Promise<string | undefined>;
    closeStake: (signer: Signer, posIndex: number) => Promise<string | undefined>;
    withdrawRewards: (signer: Signer, posIndex: number) => Promise<string | undefined>;
}
//# sourceMappingURL=interfaces.d.ts.map