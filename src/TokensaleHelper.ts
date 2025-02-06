import { ContractRunner, ContractTransactionReceipt, ContractTransactionResponse, JsonRpcProvider, Provider } from "ethers";
import { Helper, TConfig } from "./types";
import { EMMET__factory, Tokensale__factory } from "./factories";
import { EMMET } from "./contracts/EMMET";
import { sleep } from "./utils";
import { TSymbol } from "./interfaces";

export async function TokensaleHelper({
    chainId,
    emmetAddress,
    rpcs,
    tokensaleAddress,
    usdtAddress
}: TConfig): Promise<Helper> {

    const fetchProvider = (index?: number): Provider => {
        const randomRpcIndex = index ?? Math.floor(Math.random() * rpcs.length);
        return new JsonRpcProvider(rpcs[randomRpcIndex], chainId);
    };

    const getEmmet = (runner: ContractRunner) => EMMET__factory.connect(emmetAddress, runner);

    const getUsdt = (runner: ContractRunner) => EMMET__factory.connect(usdtAddress, runner);

    const getTokensale = (runner: ContractRunner) => Tokensale__factory.connect(tokensaleAddress, runner);

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

    const getToken = (symbol: TSymbol, provider: ContractRunner): EMMET => {
        return symbol == "EMMET"
            ? getEmmet(provider)
            : getUsdt(provider);
    }


    return {
        // -----------------------------------------------------------------
        // interface Token (ERC20)
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
        }
    }

}