import { ContractRunner, ContractTransactionReceipt, ContractTransactionResponse, JsonRpcProvider, Provider, ZeroAddress } from "ethers";
import { Helper, TConfig, TMetrics, TTokenName, TUserPositions } from "./types";
import { EMMET__factory, Tokensale__factory } from "./factories";
import { EMMET } from "./contracts/EMMET";
import { computeRefKey, parseMetrics, parsePositionsAndRewards, sleep } from "./utils";
import { Staking__factory } from "./factories/Staking__factory";

export async function TokensaleHelper({
    chainId,
    rpcs,
    stakingAddress,
    tokenAddresses,
    tokensaleAddress,
}: TConfig): Promise<Helper> {

    const fetchProvider = (index?: number): Provider => {
        const randomRpcIndex: number = index as number > rpcs.length 
            ? Math.floor(Math.random() * rpcs.length) 
            : index as number;
        return new JsonRpcProvider(rpcs[randomRpcIndex], chainId);
    };

    const getTokensale = (runner: ContractRunner) => Tokensale__factory.connect(tokensaleAddress, runner);

    const getStaking = (runner: ContractRunner, token: TTokenName) => Staking__factory.connect(stakingAddress[token], runner);

    const getToken = (symbol: TTokenName, provider: ContractRunner): EMMET => {
        return EMMET__factory.connect(tokenAddresses[symbol], provider);
    }

    async function withRpcRotation<T>(fn: (provider: Provider) => Promise<T>, attempt = 0): Promise<T> {
        if (attempt >= rpcs.length) throw new Error("All RPCs failed");

        const provider = fetchProvider(attempt);
        try {
            return await fn(provider);
        } catch {
            await sleep(1000); // Wait before retrying
            return withRpcRotation(fn, attempt + 1);
        }
    }

    return {
        // -----------------------------------------------------------------
        // interface Token (ERC20) for Tokensale
        // -----------------------------------------------------------------
        async allowance(address, symbol): Promise<bigint> {
            return withRpcRotation(async (provider) => {
                const token: EMMET = getToken(symbol, provider);
                return await token.allowance(address, tokensaleAddress);
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
        async approve(signer, amount): Promise<string|undefined> {
            const token: EMMET = getToken("USDT", signer);
            const response: ContractTransactionResponse = await token.approve(tokensaleAddress, amount);
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
        async claimable(address): Promise<bigint> {
            return withRpcRotation(async (provider) => {
                const tokensale = getTokensale(provider);
                return await tokensale.claimable(address);
            });
        },
        // -----------------------------------------------------------------
        async estimate(pay): Promise<bigint> {
            return withRpcRotation(async (provider) => {
                const tokensale = getTokensale(provider);
                return await tokensale.estimate(pay);
            });
        },
        // -----------------------------------------------------------------
        async isRegisteredRef(ref): Promise<boolean> {
            if(ref){
                return withRpcRotation(async (provider) => {
                    const tokensale = getTokensale(provider);
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
        async buy(signer, pay, ref): Promise<string|undefined> {
            const tokensale = getTokensale(signer);
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
        async claim(signer): Promise<string|undefined> {
            const tokensale = getTokensale(signer);
            const response: ContractTransactionResponse = await tokensale.claim();
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
        async createReference(signer, ref): Promise<string|undefined> {
            const tokensale = getTokensale(signer);
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