import { ContractRunner, ContractTransactionReceipt, ContractTransactionResponse, ethers, JsonRpcProvider, Provider, ZeroAddress } from "ethers";
import { Helper, TCashTokenName, TConfig, TMetrics, TStakedTokenName, TTokenName, TUserPositions } from "./types";
import { EMMET__factory, Tokensale__factory } from "./factories";
import { EMMET } from "./contracts/EMMET";
import { computeRefKey, parseMetrics, parsePositionsAndRewards, sleep } from "./utils";
import { Staking__factory } from "./factories/Staking__factory";
import { EmmetZealyAirdrop__factory } from "./factories/EmmetZealyAirdrop__factory";
import { TAirdropPosition } from "./interfaces";

export async function TokensaleHelper({
    airdropAddress,
    chainId,
    rpcs,
    stakingAddress,
    tokenAddresses,
    tokensales,
}: TConfig): Promise<Helper> {

    const fetchProvider = (index?: number): Provider => {
        const randomRpcIndex: number = index as number > rpcs.length 
            ? Math.floor(Math.random() * rpcs.length) 
            : index as number;
        return new JsonRpcProvider(rpcs[randomRpcIndex], chainId);
    };

    const getAirdrop = (
        runner: ContractRunner
    ) => EmmetZealyAirdrop__factory.connect(airdropAddress, runner);

    const getTokensale = (
        runner: ContractRunner,
        cash: TCashTokenName
    ) => Tokensale__factory.connect(tokensales[cash], runner);

    const getStaking = (
        runner: ContractRunner,
        token: TStakedTokenName
    ) => Staking__factory.connect(stakingAddress[token], runner);

    const getToken = (
        symbol: TTokenName, 
        provider: ContractRunner
    ): EMMET => {
        return EMMET__factory.connect(tokenAddresses[symbol], provider);
    }

    async function withRpcRotation<T>(
        fn: (provider: Provider) => Promise<T>, 
        attempt = 0,
        verbouse = false
    ): Promise<T> {
        if (attempt >= rpcs.length) throw new Error("All RPCs failed");

        const provider = fetchProvider(attempt);
        if(verbouse){
            console.log("provider URL:", rpcs[attempt], "attempt", attempt);
        }
        try {const result = await fn(provider);
            if(verbouse){
                console.log("withRpcRotation result:", result);
            }
            return result;
        } catch {
            await sleep(1000); // Wait before retrying
            return withRpcRotation(fn, attempt + 1);
        }
    }

    return {
        // -----------------------------------------------------------------
        // interface Airdrop
        // -----------------------------------------------------------------
        async claimableAirdrop(address): Promise<bigint> {
            return withRpcRotation(async (provider) => {
                const airdrop = getAirdrop(provider);
                return await airdrop.claimable(address);
            });
        },
        async claimAirdrop(signer): Promise<string|undefined> {
            const airdrop = getAirdrop(signer);
            const response: ContractTransactionResponse = await airdrop.claim();
            const result: null | ContractTransactionReceipt = await response.wait(3);
            if(result && result.logs){
                const topic = ethers.id("Claimed(address,uint256)");
                for(const log of result.logs){
                    if(log.topics.includes(topic)){
                        return log.transactionHash
                    }
                }
            }
            return undefined;
        },
        async positionsAirdrop(address): Promise<TAirdropPosition> {
            return withRpcRotation<TAirdropPosition>(async (provider) => {
                const airdrop = getAirdrop(provider);
                const reply: [bigint, bigint] 
                    & { locked: bigint; unlocked: bigint } = await airdrop.positions(address);
                // Convert bigint to number
                return {
                    locked: Number(reply.locked),
                    unlocked: Number(reply.unlocked),
                } as TAirdropPosition;
            });
        },
        // -----------------------------------------------------------------
        // interface Common for Tokensale
        // -----------------------------------------------------------------
        async gasBalance(address): Promise<bigint> {
            return withRpcRotation(async (provider) => {
                return provider.getBalance(address);
            });
        },
        // -----------------------------------------------------------------
        // interface Token (ERC20) for Tokensale
        // -----------------------------------------------------------------
        async allowance(address, symbol, cash="USDT"): Promise<bigint> {
            return withRpcRotation(async (provider) => {
                const token: EMMET = getToken(symbol, provider);
                return await token.allowance(address, tokensales[cash]);
            });
        },
        // -----------------------------------------------------------------
        async balance(address, symbol): Promise<bigint> {
            return withRpcRotation(async (provider) => {
                const token: EMMET = getToken(symbol, provider);
                return await token.balanceOf(address);
            });
        },
        // -----------------------------------------------------------------
        async approve(signer, amount, cash="USDT"): Promise<string|undefined> {
            const token: EMMET = getToken(cash, signer);
            const response: ContractTransactionResponse = await token.approve(tokensales[cash], amount);
            const result: null | ContractTransactionReceipt = await response.wait(3);
            if(result && result.logs){
                const topic = "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925";
                for(const log of result.logs){
                    if(log.topics.includes(topic)){
                        return log.transactionHash
                    }
                }
            }
            return undefined;
        },
        // -----------------------------------------------------------------
        // interface Token (ERC20) for Staking
        // -----------------------------------------------------------------
        async stakingAllowance(address, tokenName): Promise<bigint> {
            return withRpcRotation(async (provider) => {
                const token: EMMET = getToken(tokenName, provider);
                return await token.allowance(address, stakingAddress[tokenName]);
            });
        },
        // -----------------------------------------------------------------
        async stakingApprove(signer, amount, tokenName): Promise<string | undefined> {
            const token: EMMET = getToken(tokenName, signer);
            const response: ContractTransactionResponse = await token.approve(stakingAddress[tokenName], amount);
            const result: null | ContractTransactionReceipt = await response.wait(3);
            if(result && result.logs){
                const topic = "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925";
                for(const log of result.logs){
                    if(log.topics.includes(topic)){
                        return log.transactionHash
                    }
                }
            }
            return undefined;
        },
        // -----------------------------------------------------------------
        // interface Tokensale
        // -----------------------------------------------------------------
        async claimable(address, cash): Promise<bigint> {
            return withRpcRotation(async (provider) => {
                const tokensale = getTokensale(provider, cash);
                return await tokensale.claimable(address);
            });
        },
        // -----------------------------------------------------------------
        async estimate(pay, cash): Promise<bigint> {
            return withRpcRotation(async (provider) => {
                const tokensale = getTokensale(provider, cash);
                return await tokensale.estimate(pay);
            });
        },
        // -----------------------------------------------------------------
        async isRegisteredRef(ref, cash): Promise<boolean> {
            if(ref){
                return withRpcRotation(async (provider) => {
                    const tokensale = getTokensale(provider, cash);
                    const key = computeRefKey(ref);
                    const owner = await tokensale.references(key);
                    if(owner !== ZeroAddress){
                        return true;
                    }
                    return false;
                });
                
            }
            return false;
        },
        // -----------------------------------------------------------------
        async buy(signer, pay, ref, cash): Promise<string|undefined> {
            const tokensale = getTokensale(signer, cash);
            const response: ContractTransactionResponse = await tokensale.buy(pay, ref);
            const result: null | ContractTransactionReceipt = await response.wait(3);
            if(result && result.logs){
                const topic = "0x8fafebcaf9d154343dad25669bfa277f4fbacd7ac6b0c4fed522580e040a0f33";
                for(const log of result.logs){
                    if(log.topics.includes(topic)){
                        return log.transactionHash
                    }
                }
            }
            return undefined;
        },
        // -----------------------------------------------------------------
        async claim(signer, cash): Promise<string|undefined> {
            const _tokensale = getTokensale(signer, cash);
            const response: ContractTransactionResponse = await _tokensale.claim();
            const result: null | ContractTransactionReceipt = await response.wait(3);
            if(result && result.logs){
                const topic = "0x896e034966eaaf1adc54acc0f257056febbd300c9e47182cf761982cf1f5e430";
                for(const log of result.logs){
                    if(log.topics.includes(topic)){
                        return log.transactionHash;
                    }
                }
            }
            return undefined;
        },
        // -----------------------------------------------------------------
        async createReference(signer, ref, cash): Promise<string|undefined> {
            const tokensale = getTokensale(signer, cash);
            const response: ContractTransactionResponse = await tokensale.createReference(ref);
            const result: null | ContractTransactionReceipt = await response.wait(3);
            if(result && result.logs){
                const topic = "0x28c2042d47dae842c891381da79d653bd93fde6b1a3db536dfd0506d360237f8";
                for(const log of result.logs){
                    if(log.topics.includes(topic)){
                        return log.transactionHash;
                    }
                }
            }
            return undefined;
        },
        // -----------------------------------------------------------------
        // interface IStaking
        // -----------------------------------------------------------------
        async positions(address, token): Promise<TUserPositions> {

            return withRpcRotation(async (provider) => {
                const staking = getStaking(provider, token);
                const reply = await staking.positionsAndRewards(address);
                return parsePositionsAndRewards(reply);
            });
            
        },
        async metrics(token): Promise<TMetrics|undefined>{
            return withRpcRotation(async (provider) => {
                const staking = getStaking(provider, token);
                const reply = await staking.metrics();
                return parseMetrics(reply);
            });
        },
        // -----------------------------------------------------------------
        async stake(signer, amount, period, token): Promise<string | undefined> {
            if(!signer) throw new Error("Tokensale.SDK::stake Error: signer is undefined");
            const staking = getStaking(signer, token);
            if(!staking || !staking.withdrawRewards) throw new Error("Tokensale.SDK::stake Error: staking or staking.stake is undefined");

            const minEmmet: bigint = 800n * 10n ** 18n;
            const bnbFee: bigint = 1200000000000000n;   

            const isNotEmmet: boolean = token !== "EMMET";
            const stakingAddress = await signer.getAddress();
            const balance: bigint = await getToken("EMMET", signer).balanceOf(stakingAddress);
            const hasMinEmmet: boolean = balance >= minEmmet;

            const minBalance: bigint = isNotEmmet && !hasMinEmmet
                ? bnbFee + 193000000000000n
                : 193000000000000n;

            const gasBalance:bigint = (await signer.provider?.getBalance(await signer.getAddress())) as bigint;

            if(gasBalance < minBalance){
                throw new Error("Tokensale.SDK::stake Error: Insufficient BNB Balance");
            }

            const response: ContractTransactionResponse = isNotEmmet && !hasMinEmmet
                ? await staking.stake(amount, period, {value: bnbFee})
                : await staking.stake(amount, period);
            const result: null | ContractTransactionReceipt = response ? await response.wait(3) : null;
            return result && result.hash ? result.hash : undefined;
        },
        // -----------------------------------------------------------------
        async closeStake(signer, posIndex, token): Promise<string | undefined> {
            if(!signer) throw new Error("Tokensale.SDK::unstake Error: signer is undefined");
            const staking = getStaking(signer, token);
            if(!staking || !staking.unpause) throw new Error("Tokensale.SDK::unstake Error: staking or staking.unpause is undefined");
            const response: ContractTransactionResponse = await staking.unstake(posIndex);
            const result: null | ContractTransactionReceipt = response ? await response.wait(3) : null;
            return result && result.hash ? result.hash : undefined;
        },
        // -----------------------------------------------------------------
        async withdrawRewards(signer, posIndex, token): Promise<string | undefined> {
            if(!signer) throw new Error("Tokensale.SDK::withdrawRewards Error: signer is undefined");
            const staking = getStaking(signer, token);
            if(!staking || !staking.withdrawRewards) throw new Error("Tokensale.SDK::withdrawRewards Error: staking or staking.withdrawRewards is undefined");
            const response: ContractTransactionResponse = await staking.withdrawRewards(posIndex);
            const result: null | ContractTransactionReceipt = response ? await response.wait(3) : null;
            return result && result.hash ? result.hash : undefined;
        },
        // -----------------------------------------------------------------
    }

}