import { BigNumberish } from "ethers";
import { StakingStorage } from "./contracts/Staking";
import { Period, TMetrics, TUserPositions } from "./types";
export declare function computeRefKey(ref: string): string;
export declare function parsePositionsAndRewards(input: [StakingStorage.PositionStructOutput[], bigint, bigint, bigint] & {
    ps: StakingStorage.PositionStructOutput[];
    staked: bigint;
    ttlRewards: bigint;
    availableRewards: bigint;
}): TUserPositions;
export declare function parseMetrics(input: bigint[]): TMetrics | undefined;
export declare function sleep(ms: number): Promise<void>;
export declare function timestampToDate(ts: number): string;
export declare function timeToMaturity(ts: number): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};
export declare function calculateTtlRewards(locked: BigNumberish, period: number | Period): number;
export declare function computeUnclaimedRewards(locked: BigNumberish, period: number | Period, claimed: BigNumberish, start: number): number;
//# sourceMappingURL=utils.d.ts.map