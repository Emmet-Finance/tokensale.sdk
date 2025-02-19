import { IStaking, Token, Tokensale } from "./interfaces";

export type TConfig = {
    chainId: bigint,
    emmetAddress: string,
    rpcs: string[],
    stakingAddress: string,
    tokensaleAddress: string,
    usdtAddress: string
}

export type Helper = Token & Tokensale & IStaking;

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

export enum  Period {
    Quarter = 0,
    Half,
    Quarters3,
    Year
}

export const PeriodInSec: {[key: Period | number]: number} = {
    0: 7948800,
    1: 15811200,
    2: 23760000,
    3: 31622400,
}

export const Terms : {[key: Period | number]: number} = {
    0: 2400,
    1: 3200,
    2: 4000,
    3: 5000,
}
