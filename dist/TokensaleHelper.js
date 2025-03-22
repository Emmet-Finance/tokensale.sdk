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
        // interface Common for Tokensale
        // -----------------------------------------------------------------
        async gasBalance(address) {
            return withRpcRotation(async (provider) => {
                return provider.getBalance(address);
            });
        },
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
            const _tokensale = getTokensale(signer);
            const response = await _tokensale.claim();
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
            const minBalance = isNotEmmet && !hasMinEmmet
                ? bnbFee + 193000000000000n
                : 193000000000000n;
            const gasBalance = (await signer.provider?.getBalance(await signer.getAddress()));
            if (gasBalance < minBalance) {
                throw new Error("Tokensale.SDK::stake Error: Insufficient BNB Balance");
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9rZW5zYWxlSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1Rva2Vuc2FsZUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU9BLDBDQXNQQztBQTdQRCxtQ0FBeUk7QUFFekksMkNBQWlFO0FBRWpFLG1DQUF1RjtBQUN2RixtRUFBZ0U7QUFFekQsS0FBSyxVQUFVLGVBQWUsQ0FBQyxFQUNsQyxPQUFPLEVBQ1AsSUFBSSxFQUNKLGNBQWMsRUFDZCxjQUFjLEVBQ2QsZ0JBQWdCLEdBQ1Y7SUFFTixNQUFNLGFBQWEsR0FBRyxDQUFDLEtBQWMsRUFBWSxFQUFFO1FBQy9DLE1BQU0sY0FBYyxHQUFXLEtBQWUsR0FBRyxJQUFJLENBQUMsTUFBTTtZQUN4RCxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN6QyxDQUFDLENBQUMsS0FBZSxDQUFDO1FBQ3RCLE9BQU8sSUFBSSx3QkFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDLENBQUM7SUFFRixNQUFNLFlBQVksR0FBRyxDQUFDLE1BQXNCLEVBQUUsRUFBRSxDQUFDLDhCQUFrQixDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUV0RyxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQXNCLEVBQUUsS0FBaUIsRUFBRSxFQUFFLENBQUMsbUNBQWdCLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUUxSCxNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQWtCLEVBQUUsUUFBd0IsRUFBUyxFQUFFO1FBQ3JFLE9BQU8sMEJBQWMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BFLENBQUMsQ0FBQTtJQUVELEtBQUssVUFBVSxlQUFlLENBQUksRUFBc0MsRUFBRSxPQUFPLEdBQUcsQ0FBQztRQUNqRixJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUUvRCxNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDO1lBQ0QsT0FBTyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBQUMsTUFBTSxDQUFDO1lBQ0wsTUFBTSxJQUFBLGFBQUssRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtZQUMxQyxPQUFPLGVBQWUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDTCxDQUFDO0lBRUQsT0FBTztRQUNILG9FQUFvRTtRQUNwRSxpQ0FBaUM7UUFDakMsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTztZQUNwQixPQUFPLGVBQWUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ3RDLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsd0NBQXdDO1FBQ3hDLG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQzNCLE9BQU8sZUFBZSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDdEMsTUFBTSxLQUFLLEdBQVUsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDaEQsT0FBTyxNQUFNLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDNUQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU07WUFDekIsT0FBTyxlQUFlLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUN0QyxNQUFNLEtBQUssR0FBVSxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLE1BQU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTTtZQUN4QixNQUFNLEtBQUssR0FBVSxRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzlDLE1BQU0sUUFBUSxHQUFnQyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDNUYsTUFBTSxNQUFNLEdBQXNDLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RSxJQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUM7Z0JBQ3RCLE1BQU0sS0FBSyxHQUFHLG9FQUFvRSxDQUFDO2dCQUNuRixLQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUMsQ0FBQztvQkFDMUIsSUFBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO3dCQUMzQixPQUFPLEdBQUcsQ0FBQyxlQUFlLENBQUE7b0JBQzlCLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLHNDQUFzQztRQUN0QyxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTO1lBQ3JDLE9BQU8sZUFBZSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDdEMsTUFBTSxLQUFLLEdBQVUsUUFBUSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxNQUFNLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUztZQUMxQyxNQUFNLEtBQUssR0FBVSxRQUFRLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELE1BQU0sUUFBUSxHQUFnQyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3JHLE1BQU0sTUFBTSxHQUFzQyxNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekUsSUFBRyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksRUFBQyxDQUFDO2dCQUN0QixNQUFNLEtBQUssR0FBRyxvRUFBb0UsQ0FBQztnQkFDbkYsS0FBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUM7b0JBQzFCLElBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQzt3QkFDM0IsT0FBTyxHQUFHLENBQUMsZUFBZSxDQUFBO29CQUM5QixDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxzQkFBc0I7UUFDdEIsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTztZQUNuQixPQUFPLGVBQWUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ3RDLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDekMsT0FBTyxNQUFNLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRztZQUNkLE9BQU8sZUFBZSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDdEMsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN6QyxPQUFPLE1BQU0sU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFHO1lBQ3JCLElBQUcsR0FBRyxFQUFDLENBQUM7Z0JBQ0osT0FBTyxlQUFlLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFO29CQUN0QyxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3pDLE1BQU0sR0FBRyxHQUFHLElBQUEscUJBQWEsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0IsTUFBTSxLQUFLLEdBQUcsTUFBTSxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM5QyxJQUFHLEtBQUssS0FBSyxvQkFBVyxFQUFDLENBQUM7d0JBQ3RCLE9BQU8sSUFBSSxDQUFDO29CQUNoQixDQUFDO29CQUNELE9BQU8sS0FBSyxDQUFDO2dCQUNqQixDQUFDLENBQUMsQ0FBQztZQUVQLENBQUM7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHO1lBQ3RCLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QyxNQUFNLFFBQVEsR0FBZ0MsTUFBTSxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM1RSxNQUFNLE1BQU0sR0FBc0MsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLElBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUMsQ0FBQztnQkFDdEIsTUFBTSxLQUFLLEdBQUcsb0VBQW9FLENBQUM7Z0JBQ25GLEtBQUksTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksRUFBQyxDQUFDO29CQUMxQixJQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7d0JBQzNCLE9BQU8sR0FBRyxDQUFDLGVBQWUsQ0FBQTtvQkFDOUIsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQ2QsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sUUFBUSxHQUFnQyxNQUFNLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2RSxNQUFNLE1BQU0sR0FBc0MsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLElBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUMsQ0FBQztnQkFDdEIsTUFBTSxLQUFLLEdBQUcsb0VBQW9FLENBQUM7Z0JBQ25GLEtBQUksTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksRUFBQyxDQUFDO29CQUMxQixJQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7d0JBQzNCLE9BQU8sR0FBRyxDQUFDLGVBQWUsQ0FBQztvQkFDL0IsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsR0FBRztZQUM3QixNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkMsTUFBTSxRQUFRLEdBQWdDLE1BQU0sU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRixNQUFNLE1BQU0sR0FBc0MsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLElBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUMsQ0FBQztnQkFDdEIsTUFBTSxLQUFLLEdBQUcsb0VBQW9FLENBQUM7Z0JBQ25GLEtBQUksTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksRUFBQyxDQUFDO29CQUMxQixJQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7d0JBQzNCLE9BQU8sR0FBRyxDQUFDLGVBQWUsQ0FBQztvQkFDL0IsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUscUJBQXFCO1FBQ3JCLG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxLQUFLO1lBRTFCLE9BQU8sZUFBZSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDdEMsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDNUMsTUFBTSxLQUFLLEdBQUcsTUFBTSxPQUFPLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pELE9BQU8sSUFBQSxnQ0FBd0IsRUFBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxDQUFDLENBQUMsQ0FBQztRQUVQLENBQUM7UUFDRCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUs7WUFDZixPQUFPLGVBQWUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ3RDLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzVDLE1BQU0sS0FBSyxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN0QyxPQUFPLElBQUEsb0JBQVksRUFBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLO1lBQ3JDLElBQUcsQ0FBQyxNQUFNO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztZQUMvRSxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFDLElBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZTtnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLG1FQUFtRSxDQUFDLENBQUM7WUFFOUgsTUFBTSxRQUFRLEdBQVcsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUM7WUFDM0MsTUFBTSxNQUFNLEdBQVcsaUJBQWlCLENBQUM7WUFFekMsTUFBTSxVQUFVLEdBQVksS0FBSyxLQUFLLE9BQU8sQ0FBQztZQUM5QyxNQUFNLGNBQWMsR0FBRyxNQUFNLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNqRCxNQUFNLE9BQU8sR0FBVyxNQUFNLFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2xGLE1BQU0sV0FBVyxHQUFZLE9BQU8sSUFBSSxRQUFRLENBQUM7WUFFakQsTUFBTSxVQUFVLEdBQVcsVUFBVSxJQUFJLENBQUMsV0FBVztnQkFDakQsQ0FBQyxDQUFDLE1BQU0sR0FBRyxnQkFBZ0I7Z0JBQzNCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztZQUV2QixNQUFNLFVBQVUsR0FBVSxDQUFDLE1BQU0sTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsTUFBTSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBVyxDQUFDO1lBRW5HLElBQUcsVUFBVSxHQUFHLFVBQVUsRUFBQyxDQUFDO2dCQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7WUFDNUUsQ0FBQztZQUVELE1BQU0sUUFBUSxHQUFnQyxVQUFVLElBQUksQ0FBQyxXQUFXO2dCQUNwRSxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUM7Z0JBQ3RELENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLE1BQU0sTUFBTSxHQUFzQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzNGLE9BQU8sTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMzRCxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLO1lBQ3BDLElBQUcsQ0FBQyxNQUFNO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztZQUNqRixNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFDLElBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHVFQUF1RSxDQUFDLENBQUM7WUFDMUgsTUFBTSxRQUFRLEdBQWdDLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM5RSxNQUFNLE1BQU0sR0FBc0MsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMzRixPQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDM0QsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSztZQUN6QyxJQUFHLENBQUMsTUFBTTtnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7WUFDekYsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMxQyxJQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWU7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx1RkFBdUYsQ0FBQyxDQUFDO1lBQ2xKLE1BQU0sUUFBUSxHQUFnQyxNQUFNLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEYsTUFBTSxNQUFNLEdBQXNDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDM0YsT0FBTyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzNELENBQUM7UUFDRCxvRUFBb0U7S0FDdkUsQ0FBQTtBQUVMLENBQUMifQ==