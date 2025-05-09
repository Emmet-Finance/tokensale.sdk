import { Signer } from "ethers";
import { TUserPositions, Period, TTokenName } from "./types";

export type TAirdropPosition = {
    locked: number;
    unlocked: number;
}

export interface IAirdrop {
    claimableAirdrop: (address: string) => Promise<bigint>;
    claimAirdrop: (signer: Signer) => Promise<string | undefined>;
    positionsAirdrop: (address: string) => Promise<TAirdropPosition>;
}

export interface Common {
    gasBalance: (address: string) => Promise<bigint>;
}

export interface Token {
    // READ Tokensale
    allowance: (address: string, symbol: TTokenName) => Promise<bigint>;
    balance: (address: string, symbol: TTokenName) => Promise<bigint>;
    // WRITE Tokensale
    approve: (signer: Signer, amount: bigint) => Promise<string | undefined>;
    // --------------------------------------------------------------
    // READ Staking
    stakingAllowance: (address: string, tokenName: TTokenName) => Promise<bigint>;
    // WRITE Staking
    stakingApprove: (signer: Signer, amount: bigint, tokenName: TTokenName) => Promise<string | undefined>;
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
    // READ Staking
    positions: (address: string, token: TTokenName) => Promise<TUserPositions>;
    metrics: (token: TTokenName) => Promise<any>;
    // WRITE Staking
    stake: (signer: Signer, amount: bigint, period: Period, token: TTokenName) => Promise<string | undefined>;
    closeStake: (signer: Signer, posIndex: number, token: TTokenName) => Promise<string | undefined>;
    withdrawRewards: (signer: Signer, posIndex: number, token: TTokenName) => Promise<string | undefined>;

}