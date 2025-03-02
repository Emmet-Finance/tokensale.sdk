import { IStaking, Token, Tokensale } from "./interfaces";

export type TTokenName =
    "EMMET"
    | "NTM"
    | "USDT"
    ;

export type StakingAddresses = {
    EMMET: string,
    NTM: string,
    USDT: string
}

export type TokenAddresses = {
    EMMET: string,
    NTM: string,
    USDT: string
}

export type TConfig = {
    chainId: bigint,
    tokenAddresses: TokenAddresses,
    rpcs: string[],
    stakingAddress: StakingAddresses,
    tokensaleAddress: string,
}

export type Helper = Token & Tokensale & IStaking;

export type TMetrics = {
    locked: number,
    rewards: number,
    claimed: number,
    delta: number,
}

export type TPosition = {
    period: number,
    start: number,
    maturity: number,
    locked: number,
    claimed: number
}

export type TUserPositions = {
    positions: TPosition[],
    staked: number,
    totalRewards: number,
    claimed: number
}

export enum Period {
    Quarter = 0,
    Half,
    Quarters3,
    Year
}

export const PeriodInSec: { [key: Period | number]: number } = {
    0: 7948800,
    1: 15811200,
    2: 23760000,
    3: 31622400,
}

export const Terms: { [key: Period | number]: number } = {
    0: 2400,
    1: 3200,
    2: 4000,
    3: 5000,
}
