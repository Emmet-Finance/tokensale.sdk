import { keccak256, toUtf8Bytes } from "ethers";

export function computeRefKey(ref: string): string {
    return keccak256(toUtf8Bytes(ref));
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}