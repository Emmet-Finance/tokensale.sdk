"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensaleHelper = TokensaleHelper;
const ethers_1 = require("ethers");
const factories_1 = require("./factories");
const utils_1 = require("./utils");
const Staking__factory_1 = require("./factories/Staking__factory");
async function TokensaleHelper({ chainId, rpcs, stakingAddress, tokenAddresses, tokensaleAddress, }) {
    const fetchProvider = (index) => {
        const randomRpcIndex = index > rpcs.length
            ? Math.floor(Math.random() * rpcs.length)
            : index;
        return new ethers_1.JsonRpcProvider(rpcs[randomRpcIndex], chainId);
    };
    const getTokensale = (runner) => factories_1.Tokensale__factory.connect(tokensaleAddress, runner);
    const getStaking = (runner, token) => Staking__factory_1.Staking__factory.connect(stakingAddress[token], runner);
    const getToken = (symbol, provider) => {
        return factories_1.EMMET__factory.connect(tokenAddresses[symbol], provider);
    };
    async function withRpcRotation(fn, attempt = 0) {
        if (attempt >= rpcs.length)
            throw new Error("All RPCs failed");
        const provider = fetchProvider(attempt);
        try {
            return await fn(provider);
        }
        catch {
            await (0, utils_1.sleep)(1000); // Wait before retrying
            return withRpcRotation(fn, attempt + 1);
        }
    }
    return {
        // -----------------------------------------------------------------
        // interface Token (ERC20) for Tokensale
        // -----------------------------------------------------------------
        async allowance(address, symbol) {
            return withRpcRotation(async (provider) => {
                const token = getToken(symbol, provider);
                return await token.allowance(address, tokensaleAddress);
            });
        },
        // -----------------------------------------------------------------
        async balance(address, symbol) {
            return withRpcRotation(async (provider) => {
                const token = getToken(symbol, provider);
                return await token.balanceOf(address);
            });
        },
        // -----------------------------------------------------------------
        async approve(signer, amount) {
            const token = getToken("USDT", signer);
            const response = await token.approve(tokensaleAddress, amount);
            const result = await response.wait(3);
            if (result && result.logs) {
                const topic = "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925";
                for (const log of result.logs) {
                    if (log.topics.includes(topic)) {
                        return log.transactionHash;
                    }
                }
            }
            return undefined;
        },
        // -----------------------------------------------------------------
        // interface Token (ERC20) for Staking
        // -----------------------------------------------------------------
        async stakingAllowance(address, tokenName) {
            return withRpcRotation(async (provider) => {
                const token = getToken(tokenName, provider);
                return await token.allowance(address, stakingAddress[tokenName]);
            });
        },
        // -----------------------------------------------------------------
        async stakingApprove(signer, amount, tokenName) {
            const token = getToken(tokenName, signer);
            const response = await token.approve(stakingAddress[tokenName], amount);
            const result = await response.wait(3);
            if (result && result.logs) {
                const topic = "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925";
                for (const log of result.logs) {
                    if (log.topics.includes(topic)) {
                        return log.transactionHash;
                    }
                }
            }
            return undefined;
        },
        // -----------------------------------------------------------------
        // interface Tokensale
        // -----------------------------------------------------------------
        async claimable(address) {
            return withRpcRotation(async (provider) => {
                const tokensale = getTokensale(provider);
                return await tokensale.claimable(address);
            });
        },
        // -----------------------------------------------------------------
        async estimate(pay) {
            return withRpcRotation(async (provider) => {
                const tokensale = getTokensale(provider);
                return await tokensale.estimate(pay);
            });
        },
        // -----------------------------------------------------------------
        async isRegisteredRef(ref) {
            if (ref) {
                return withRpcRotation(async (provider) => {
                    const tokensale = getTokensale(provider);
                    const key = (0, utils_1.computeRefKey)(ref);
                    const owner = await tokensale.references(key);
                    if (owner !== ethers_1.ZeroAddress) {
                        return true;
                    }
                    return false;
                });
            }
            return false;
        },
        // -----------------------------------------------------------------
        async buy(signer, pay, ref) {
            const tokensale = getTokensale(signer);
            const response = await tokensale.buy(pay, ref);
            const result = await response.wait(3);
            if (result && result.logs) {
                const topic = "0x8fafebcaf9d154343dad25669bfa277f4fbacd7ac6b0c4fed522580e040a0f33";
                for (const log of result.logs) {
                    if (log.topics.includes(topic)) {
                        return log.transactionHash;
                    }
                }
            }
            return undefined;
        },
        // -----------------------------------------------------------------
        async claim(signer) {
            const tokensale = getTokensale(signer);
            const response = await tokensale.claim();
            const result = await response.wait(3);
            if (result && result.logs) {
                const topic = "0x896e034966eaaf1adc54acc0f257056febbd300c9e47182cf761982cf1f5e430";
                for (const log of result.logs) {
                    if (log.topics.includes(topic)) {
                        return log.transactionHash;
                    }
                }
            }
            return undefined;
        },
        // -----------------------------------------------------------------
        async createReference(signer, ref) {
            const tokensale = getTokensale(signer);
            const response = await tokensale.createReference(ref);
            const result = await response.wait(3);
            if (result && result.logs) {
                const topic = "0x28c2042d47dae842c891381da79d653bd93fde6b1a3db536dfd0506d360237f8";
                for (const log of result.logs) {
                    if (log.topics.includes(topic)) {
                        return log.transactionHash;
                    }
                }
            }
            return undefined;
        },
        // -----------------------------------------------------------------
        // interface IStaking
        // -----------------------------------------------------------------
        async positions(address, token) {
            return withRpcRotation(async (provider) => {
                const staking = getStaking(provider, token);
                const reply = await staking.positionsAndRewards(address);
                return (0, utils_1.parsePositionsAndRewards)(reply);
            });
        },
        async metrics(token) {
            return withRpcRotation(async (provider) => {
                const staking = getStaking(provider, token);
                const reply = await staking.metrics();
                return (0, utils_1.parseMetrics)(reply);
            });
        },
        // -----------------------------------------------------------------
        async stake(signer, amount, period, token) {
            if (!signer)
                throw new Error("Tokensale.SDK::stake Error: signer is undefined");
            const staking = getStaking(signer, token);
            if (!staking || !staking.withdrawRewards)
                throw new Error("Tokensale.SDK::stake Error: staking or staking.stake is undefined");
            const minEmmet = 800n * 10n ** 18n;
            const bnbFee = 1200000000000000n;
            const isNotEmmet = token !== "EMMET";
            const stakingAddress = await signer.getAddress();
            const balance = await getToken("EMMET", signer).balanceOf(stakingAddress);
            const hasMinEmmet = balance >= minEmmet;
            const response = isNotEmmet && !hasMinEmmet
                ? await staking.stake(amount, period, { value: bnbFee })
                : await staking.stake(amount, period);
            const result = response ? await response.wait(3) : null;
            return result && result.hash ? result.hash : undefined;
        },
        // -----------------------------------------------------------------
        async closeStake(signer, posIndex, token) {
            if (!signer)
                throw new Error("Tokensale.SDK::unstake Error: signer is undefined");
            const staking = getStaking(signer, token);
            if (!staking || !staking.unpause)
                throw new Error("Tokensale.SDK::unstake Error: staking or staking.unpause is undefined");
            const response = await staking.unstake(posIndex);
            const result = response ? await response.wait(3) : null;
            return result && result.hash ? result.hash : undefined;
        },
        // -----------------------------------------------------------------
        async withdrawRewards(signer, posIndex, token) {
            if (!signer)
                throw new Error("Tokensale.SDK::withdrawRewards Error: signer is undefined");
            const staking = getStaking(signer, token);
            if (!staking || !staking.withdrawRewards)
                throw new Error("Tokensale.SDK::withdrawRewards Error: staking or staking.withdrawRewards is undefined");
            const response = await staking.withdrawRewards(posIndex);
            const result = response ? await response.wait(3) : null;
            return result && result.hash ? result.hash : undefined;
        },
        // -----------------------------------------------------------------
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9rZW5zYWxlSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1Rva2Vuc2FsZUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU9BLDBDQW9PQztBQTNPRCxtQ0FBeUk7QUFFekksMkNBQWlFO0FBRWpFLG1DQUF1RjtBQUN2RixtRUFBZ0U7QUFFekQsS0FBSyxVQUFVLGVBQWUsQ0FBQyxFQUNsQyxPQUFPLEVBQ1AsSUFBSSxFQUNKLGNBQWMsRUFDZCxjQUFjLEVBQ2QsZ0JBQWdCLEdBQ1Y7SUFFTixNQUFNLGFBQWEsR0FBRyxDQUFDLEtBQWMsRUFBWSxFQUFFO1FBQy9DLE1BQU0sY0FBYyxHQUFXLEtBQWUsR0FBRyxJQUFJLENBQUMsTUFBTTtZQUN4RCxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN6QyxDQUFDLENBQUMsS0FBZSxDQUFDO1FBQ3RCLE9BQU8sSUFBSSx3QkFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDLENBQUM7SUFFRixNQUFNLFlBQVksR0FBRyxDQUFDLE1BQXNCLEVBQUUsRUFBRSxDQUFDLDhCQUFrQixDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUV0RyxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQXNCLEVBQUUsS0FBaUIsRUFBRSxFQUFFLENBQUMsbUNBQWdCLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUUxSCxNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQWtCLEVBQUUsUUFBd0IsRUFBUyxFQUFFO1FBQ3JFLE9BQU8sMEJBQWMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BFLENBQUMsQ0FB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