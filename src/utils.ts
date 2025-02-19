import { keccak256, toUtf8Bytes } from "ethers";
import { StakingStorage } from "./contracts/Staking";
import { Period, PeriodInSec, Terms, TPosition, TUserPositions } from "./types";

export function computeRefKey(ref: string): string {
  return keccak256(toUtf8Bytes(ref));
}

export function parsePositionsAndRewards(input: [StakingStorage.PositionStructOutput[], bigint, bigint, bigint] & {
  ps: StakingStorage.PositionStructOutput[];
  staked: bigint;
  ttlRewards: bigint;
  availableRewards: bigint;
}): TUserPositions {
  return {
    positions: input[0].map(items => {
      return {
        period: Number(items[0].toString()),
        start: Number(items[1].toString()),
        maturity: Number(items[2].toString()),
        locked: Number(items[3].toString()),
        claimed: Number(items[4].toString()),
      } as TPosition
    }),
    staked: Number(input[1].toString()),
    totalRewards: Number(input[2].toString()),
    claimed: Number(input[3].toString()),
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function timestampToDate(ts: number): string {
  return (new Date(ts * 1000)).toISOString()
}

export function timeToMaturity(ts: number) {
  const _now = Math.floor(Date.now() / 1000);
  const left = ts - _now;

  return {
    days: Math.floor(left / (24 * 3600)),
    hours: Math.floor((left % (24 * 3600)) / 3600),
    minutes: Math.floor((left % 3600) / 60),
    seconds: left % 60
  }
}

export function calculateTtlRewards(locked: bigint, period: number | Period): number {
  if (locked === 0n) return 0;

  return Number(locked
    * BigInt(PeriodInSec[period])
    * BigInt(Terms[period])
    / BigInt(PeriodInSec[3])
    / 10_000n);
}

export function computeUnclaimedRewards(
  locked: bigint,
  period: number | Period,
  claimed: bigint,
  start: number
): number {
  const ttlRewards: bigint = BigInt(calculateTtlRewards(locked, period));
  const _now = Date.now();
  const startMilliseconds:bigint = BigInt(start) * 1000n;
  const elapsed: bigint = BigInt(_now) - startMilliseconds;
  const maturity: bigint = startMilliseconds + BigInt(PeriodInSec[period]) * 1000n;
  let available: bigint = maturity > _now
    ? ttlRewards
    : ttlRewards * elapsed / BigInt(PeriodInSec[period]);
  return Number(available > claimed ? available - claimed : 0n);
}