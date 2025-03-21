import { Signer } from "ethers";
import { TUserPositions, Period, TTokenName } from "./types";
export interface Common {
    gasBalance: (address: string) => Promise<bigint>;
}
export interface Token {
    allowance: (address: string, symbol: TTokenName) => Promise<bigint>;
    balance: (address: string, symbol: TTokenName) => Promise<bigint>;
    approve: (signer: Signer, amount: bigint) => Promise<string | undefined>;
    stakingAllowance: (address: string, tokenName: TTokenName) => Promise<bigint>;
    stakingApprove: (signer: Signer, amount: bigint, tokenName: TTokenName) => Promise<string | undefined>;
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
    positions: (address: string, token: TTokenName) => Promise<TUserPositions>;
    metrics: (token: TTokenName) => Promise<any>;
    stake: (signer: Signer, amount: bigint, period: Period, token: TTokenName) => Promise<string | undefined>;
    closeStake: (signer: Signer, posIndex: number, token: TTokenName) => Promise<string | undefined>;
    withdrawRewards: (signer: Signer, posIndex: number, token: TTokenName) => Promise<string | undefined>;
}
//# sourceMappingURL=interfaces.d.ts.map