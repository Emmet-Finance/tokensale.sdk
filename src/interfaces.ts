import { Signer } from "ethers";
import { TUserPositions, Period, TTokenName, TCashTokenName, TStakedTokenName } from "./types";

export type TAirdropPosition = {
    locked: number;
    unlocked: number;
}

export interface IAirdrop {
    claimableAirdrop: (address: string, cash: TCashTokenName) => Promise<bigint>;
    claimAirdrop: (signer: Signer) => Promise<string | undefined>;
    positionsAirdrop: (address: string) => Promise<TAirdropPosition>;
}

export interface Common {
    gasBalance: (address: string) => Promise<bigint>;
}

export interface Token {
    // READ Tokensale
    allowance: (address: string, symbol: TTokenName, cash?: TCashTokenName) => Promise<bigint>;
    balance: (address: string, symbol: TTokenName) => Promise<bigint>;
    // WRITE Tokensale
    approve: (signer: Signer, amount: bigint, cash?: TCashTokenName) => Promise<string | undefined>;
    // --------------------------------------------------------------
    // READ Staking
    stakingAllowance: (address: string, tokenName: TStakedTokenName) => Promise<bigint>;
    // WRITE Staking
    stakingApprove: (signer: Signer, amount: bigint, tokenName: TStakedTokenName) => Promise<string | undefined>;
}

export interface Tokensale {
    // READ
    claimable: (address: string, cash: TCashTokenName) => Promise<bigint>;
    estimate: (pay: bigint, cash: TCashTokenName) => Promise<bigint>;
    isRegisteredRef: (ref: string, cash: TCashTokenName) => Promise<boolean>;
    // WRITE
    buy: (signer: Signer, pay: bigint, ref: string, cash: TCashTokenName) => Promise<string | undefined>;
    claim: (signer: Signer, cash: TCashTokenName) => Promise<string | undefined>;
    createReference: (signer: Signer, ref: string, cash: TCashTokenName) => Promise<string | undefined>;
}

export interface IStaking {
    // READ Staking
    positions: (address: string, token: TStakedTokenName) => Promise<TUserPositions>;
    metrics: (token: TStakedTokenName) => Promise<any>;
    // WRITE Staking
    stake: (signer: Signer, amount: bigint, period: Period, token: TStakedTokenName) => Promise<string | undefined>;
    closeStake: (signer: Signer, posIndex: number, token: TStakedTokenName) => Promise<string | undefined>;
    withdrawRewards: (signer: Signer, posIndex: number, token: TStakedTokenName) => Promise<string | undefined>;

}