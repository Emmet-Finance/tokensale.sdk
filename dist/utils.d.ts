import { StakingStorage } from "./contracts/Staking";
import { Period, TUserPositions } from "./types";
export declare function computeRefKey(ref: string): string;
export declare function parsePositionsAndRewards(input: [StakingStorage.PositionStructOutput[], bigint, bigint, bigint] & {
    ps: StakingStorage.PositionStructOutput[];
    staked: bigint;
    ttlRewards: bigint;
    availableRewards: bigint;
}): TUserPositions;
export declare function sleep(ms: number): Promise<void>;
export declare function timestampToDate(ts: number): string;
export declare function timeToMaturity(ts: number): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};
export declare function calculateTtlRewards(locked: bigint, period: number | Period): bigint;
export declare function computeUnclaimedRewards(locked: bigint, period: number | Period, claimed: bigint, start: bigint): bigint;
//# sourceMappingURL=utils.d.ts.map