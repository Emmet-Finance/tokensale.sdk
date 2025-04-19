import { Common, IAirdrop, IStaking, Token, Tokensale } from "./interfaces";
export type TTokenName = "EMMET" | "NTM" | "USDT";
export type StakingAddresses = {
    EMMET: string;
    NTM: string;
    USDT: string;
};
export type TokenAddresses = {
    EMMET: string;
    NTM: string;
    USDT: string;
};
export type TConfig = {
    airdropAddress: string;
    chainId: bigint;
    tokenAddresses: TokenAddresses;
    rpcs: string[];
    stakingAddress: StakingAddresses;
    tokensaleAddress: string;
};
export type Helper = IAirdrop & Common & Token & Tokensale & IStaking;
export type TMetrics = {
    locked: number;
    rewards: number;
    claimed: number;
    delta: number;
};
export type TPosition = {
    period: number;
    start: number;
    maturity: number;
    locked: number;
    claimed: number;
};
export type TUserPositions = {
    positions: TPosition[];
    staked: number;
    totalRewards: number;
    claimed: number;
};
export declare enum Period {
    Quarter = 0,
    Half = 1,
    Quarters3 = 2,
    Year = 3
}
export declare const PeriodInSec: {
    [key: Period | number]: number;
};
export declare const Terms: {
    [key: Period | number]: number;
};
//# sourceMappingURL=types.d.ts.map