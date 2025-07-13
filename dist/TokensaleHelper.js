"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensaleHelper = TokensaleHelper;
const ethers_1 = require("ethers");
const factories_1 = require("./factories");
const utils_1 = require("./utils");
const Staking__factory_1 = require("./factories/Staking__factory");
const EmmetZealyAirdrop__factory_1 = require("./factories/EmmetZealyAirdrop__factory");
async function TokensaleHelper({ airdropAddress, chainId, rpcs, stakingAddress, tokenAddresses, tokensales, }) {
    const fetchProvider = (index) => {
        const randomRpcIndex = index > rpcs.length
            ? Math.floor(Math.random() * rpcs.length)
            : index;
        return new ethers_1.JsonRpcProvider(rpcs[randomRpcIndex], chainId);
    };
    const getAirdrop = (runner) => EmmetZealyAirdrop__factory_1.EmmetZealyAirdrop__factory.connect(airdropAddress, runner);
    const getTokensale = (runner, cash) => factories_1.Tokensale__factory.connect(tokensales[cash], runner);
    const getStaking = (runner, token) => Staking__factory_1.Staking__factory.connect(stakingAddress[token], runner);
    const getToken = (symbol, provider) => {
        return factories_1.EMMET__factory.connect(tokenAddresses[symbol], provider);
    };
    async function withRpcRotation(fn, attempt = 0, verbouse = false) {
        if (attempt >= rpcs.length)
            throw new Error("All RPCs failed");
        const provider = fetchProvider(attempt);
        if (verbouse) {
            console.log("provider URL:", rpcs[attempt], "attempt", attempt);
        }
        try {
            const result = await fn(provider);
            if (verbouse) {
                console.log("withRpcRotation result:", result);
            }
            return result;
        }
        catch {
            await (0, utils_1.sleep)(1000); // Wait before retrying
            return withRpcRotation(fn, attempt + 1);
        }
    }
    return {
        // -----------------------------------------------------------------
        // interface Airdrop
        // -----------------------------------------------------------------
        async claimableAirdrop(address) {
            return withRpcRotation(async (provider) => {
                const airdrop = getAirdrop(provider);
                return await airdrop.claimable(address);
            });
        },
        async claimAirdrop(signer) {
            const airdrop = getAirdrop(signer);
            const response = await airdrop.claim();
            const result = await response.wait(3);
            if (result && result.logs) {
                const topic = ethers_1.ethers.id("Claimed(address,uint256)");
                for (const log of result.logs) {
                    if (log.topics.includes(topic)) {
                        return log.transactionHash;
                    }
                }
            }
            return undefined;
        },
        async positionsAirdrop(address) {
            return withRpcRotation(async (provider) => {
                const airdrop = getAirdrop(provider);
                const reply = await airdrop.positions(address);
                // Convert bigint to number
                return {
                    locked: Number(reply.locked),
                    unlocked: Number(reply.unlocked),
                };
            });
        },
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
        async allowance(address, symbol, cash = "USDT") {
            return withRpcRotation(async (provider) => {
                const token = getToken(symbol, provider);
                return await token.allowance(address, tokensales[cash]);
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
        async approve(signer, amount, cash = "USDT") {
            const token = getToken(cash, signer);
            const response = await token.approve(tokensales[cash], amount);
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
        async claimable(address, cash) {
            return withRpcRotation(async (provider) => {
                const tokensale = getTokensale(provider, cash);
                return await tokensale.claimable(address);
            });
        },
        // -----------------------------------------------------------------
        async estimate(pay, cash) {
            return withRpcRotation(async (provider) => {
                const tokensale = getTokensale(provider, cash);
                return await tokensale.estimate(pay);
            });
        },
        // -----------------------------------------------------------------
        async isRegisteredRef(ref, cash) {
            if (ref) {
                return withRpcRotation(async (provider) => {
                    const tokensale = getTokensale(provider, cash);
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
        async buy(signer, pay, ref, cash) {
            const tokensale = getTokensale(signer, cash);
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
        async claim(signer, cash) {
            const _tokensale = getTokensale(signer, cash);
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
        async createReference(signer, ref, cash) {
            const tokensale = getTokensale(signer, cash);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9rZW5zYWxlSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1Rva2Vuc2FsZUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVNBLDBDQWlUQztBQTFURCxtQ0FBaUo7QUFFakosMkNBQWlFO0FBRWpFLG1DQUF1RjtBQUN2RixtRUFBZ0U7QUFDaEUsdUZBQW9GO0FBRzdFLEtBQUssVUFBVSxlQUFlLENBQUMsRUFDbEMsY0FBYyxFQUNkLE9BQU8sRUFDUCxJQUFJLEVBQ0osY0FBYyxFQUNkLGNBQWMsRUFDZCxVQUFVLEdBQ0o7SUFFTixNQUFNLGFBQWEsR0FBRyxDQUFDLEtBQWMsRUFBWSxFQUFFO1FBQy9DLE1BQU0sY0FBYyxHQUFXLEtBQWUsR0FBRyxJQUFJLENBQUMsTUFBTTtZQUN4RCxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN6QyxDQUFDLENBQUMsS0FBZSxDQUFDO1FBQ3RCLE9BQU8sSUFBSSx3QkFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDLENBQUM7SUFFRixNQUFNLFVBQVUsR0FBRyxDQUNmLE1BQXNCLEVBQ3hCLEVBQUUsQ0FBQyx1REFBMEIsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRWhFLE1BQU0sWUFBWSxHQUFHLENBQ2pCLE1BQXNCLEVBQ3RCLElBQW9CLEVBQ3RCLEVBQUUsQ0FBQyw4QkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRTFELE1BQU0sVUFBVSxHQUFHLENBQ2YsTUFBc0IsRUFDdEIsS0FBdUIsRUFDekIsRUFBRSxDQUFDLG1DQUFnQixDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFN0QsTUFBTSxRQUFRLEdBQUcsQ0FDYixNQUFrQixFQUNsQixRQUF3QixFQUNuQixFQUFFO1FBQ1AsT0FBTywwQkFBYyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEUsQ0FBQyxDQUFBO0lBRUQsS0FBSyxVQUFVLGVBQWUsQ0FDMUIsRUFBc0MsRUFDdEMsT0FBTyxHQUFHLENBQUMsRUFDWCxRQUFRLEdBQUcsS0FBSztRQUVoQixJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUUvRCxNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsSUFBRyxRQUFRLEVBQUMsQ0FBQztZQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEUsQ0FBQztRQUNELElBQUksQ0FBQztZQUFBLE1BQU0sTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25DLElBQUcsUUFBUSxFQUFDLENBQUM7Z0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNuRCxDQUFDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUFDLE1BQU0sQ0FBQztZQUNMLE1BQU0sSUFBQSxhQUFLLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyx1QkFBdUI7WUFDMUMsT0FBTyxlQUFlLENBQUMsRUFBRSxFQUFFLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1QyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU87UUFDSCxvRUFBb0U7UUFDcEUsb0JBQW9CO1FBQ3BCLG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTztZQUMxQixPQUFPLGVBQWUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ3RDLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDckMsT0FBTyxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNO1lBQ3JCLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxNQUFNLFFBQVEsR0FBZ0MsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDcEUsTUFBTSxNQUFNLEdBQXNDLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RSxJQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUM7Z0JBQ3RCLE1BQU0sS0FBSyxHQUFHLGVBQU0sQ0FBQyxFQUFFLENBQUMsMEJBQTBCLENBQUMsQ0FBQztnQkFDcEQsS0FBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUM7b0JBQzFCLElBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQzt3QkFDM0IsT0FBTyxHQUFHLENBQUMsZUFBZSxDQUFBO29CQUM5QixDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNELEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPO1lBQzFCLE9BQU8sZUFBZSxDQUFtQixLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ3hELE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDckMsTUFBTSxLQUFLLEdBQ2tDLE1BQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDOUUsMkJBQTJCO2dCQUMzQixPQUFPO29CQUNILE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDNUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2lCQUNmLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLGlDQUFpQztRQUNqQyxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPO1lBQ3BCLE9BQU8sZUFBZSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDdEMsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSx3Q0FBd0M7UUFDeEMsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEdBQUMsTUFBTTtZQUN4QyxPQUFPLGVBQWUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ3RDLE1BQU0sS0FBSyxHQUFVLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2hELE9BQU8sTUFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1RCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTTtZQUN6QixPQUFPLGVBQWUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ3RDLE1BQU0sS0FBSyxHQUFVLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2hELE9BQU8sTUFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxHQUFDLE1BQU07WUFDckMsTUFBTSxLQUFLLEdBQVUsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM1QyxNQUFNLFFBQVEsR0FBZ0MsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM1RixNQUFNLE1BQU0sR0FBc0MsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLElBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUMsQ0FBQztnQkFDdEIsTUFBTSxLQUFLLEdBQUcsb0VBQW9FLENBQUM7Z0JBQ25GLEtBQUksTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksRUFBQyxDQUFDO29CQUMxQixJQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7d0JBQzNCLE9BQU8sR0FBRyxDQUFDLGVBQWUsQ0FBQTtvQkFDOUIsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsc0NBQXNDO1FBQ3RDLG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVM7WUFDckMsT0FBTyxlQUFlLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUN0QyxNQUFNLEtBQUssR0FBVSxRQUFRLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLE1BQU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDckUsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTO1lBQzFDLE1BQU0sS0FBSyxHQUFVLFFBQVEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDakQsTUFBTSxRQUFRLEdBQWdDLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDckcsTUFBTSxNQUFNLEdBQXNDLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RSxJQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUM7Z0JBQ3RCLE1BQU0sS0FBSyxHQUFHLG9FQUFvRSxDQUFDO2dCQUNuRixLQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUMsQ0FBQztvQkFDMUIsSUFBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO3dCQUMzQixPQUFPLEdBQUcsQ0FBQyxlQUFlLENBQUE7b0JBQzlCLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLHNCQUFzQjtRQUN0QixvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSTtZQUN6QixPQUFPLGVBQWUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ3RDLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLE9BQU8sTUFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJO1lBQ3BCLE9BQU8sZUFBZSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDdEMsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDL0MsT0FBTyxNQUFNLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLElBQUk7WUFDM0IsSUFBRyxHQUFHLEVBQUMsQ0FBQztnQkFDSixPQUFPLGVBQWUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUU7b0JBQ3RDLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQy9DLE1BQU0sR0FBRyxHQUFHLElBQUEscUJBQWEsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0IsTUFBTSxLQUFLLEdBQUcsTUFBTSxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM5QyxJQUFHLEtBQUssS0FBSyxvQkFBVyxFQUFDLENBQUM7d0JBQ3RCLE9BQU8sSUFBSSxDQUFDO29CQUNoQixDQUFDO29CQUNELE9BQU8sS0FBSyxDQUFDO2dCQUNqQixDQUFDLENBQUMsQ0FBQztZQUVQLENBQUM7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtZQUM1QixNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzdDLE1BQU0sUUFBUSxHQUFnQyxNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVFLE1BQU0sTUFBTSxHQUFzQyxNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekUsSUFBRyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksRUFBQyxDQUFDO2dCQUN0QixNQUFNLEtBQUssR0FBRyxvRUFBb0UsQ0FBQztnQkFDbkYsS0FBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUM7b0JBQzFCLElBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQzt3QkFDM0IsT0FBTyxHQUFHLENBQUMsZUFBZSxDQUFBO29CQUM5QixDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJO1lBQ3BCLE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUMsTUFBTSxRQUFRLEdBQWdDLE1BQU0sVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZFLE1BQU0sTUFBTSxHQUFzQyxNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekUsSUFBRyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksRUFBQyxDQUFDO2dCQUN0QixNQUFNLEtBQUssR0FBRyxvRUFBb0UsQ0FBQztnQkFDbkYsS0FBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUM7b0JBQzFCLElBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQzt3QkFDM0IsT0FBTyxHQUFHLENBQUMsZUFBZSxDQUFDO29CQUMvQixDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSTtZQUNuQyxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzdDLE1BQU0sUUFBUSxHQUFnQyxNQUFNLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkYsTUFBTSxNQUFNLEdBQXNDLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RSxJQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUM7Z0JBQ3RCLE1BQU0sS0FBSyxHQUFHLG9FQUFvRSxDQUFDO2dCQUNuRixLQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUMsQ0FBQztvQkFDMUIsSUFBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO3dCQUMzQixPQUFPLEdBQUcsQ0FBQyxlQUFlLENBQUM7b0JBQy9CLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLHFCQUFxQjtRQUNyQixvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsS0FBSztZQUUxQixPQUFPLGVBQWUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ3RDLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzVDLE1BQU0sS0FBSyxHQUFHLE1BQU0sT0FBTyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN6RCxPQUFPLElBQUEsZ0NBQXdCLEVBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFFUCxDQUFDO1FBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLO1lBQ2YsT0FBTyxlQUFlLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUN0QyxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLEtBQUssR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDdEMsT0FBTyxJQUFBLG9CQUFZLEVBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSztZQUNyQyxJQUFHLENBQUMsTUFBTTtnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7WUFDL0UsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMxQyxJQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWU7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxtRUFBbUUsQ0FBQyxDQUFDO1lBRTlILE1BQU0sUUFBUSxHQUFXLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDO1lBQzNDLE1BQU0sTUFBTSxHQUFXLGlCQUFpQixDQUFDO1lBRXpDLE1BQU0sVUFBVSxHQUFZLEtBQUssS0FBSyxPQUFPLENBQUM7WUFDOUMsTUFBTSxjQUFjLEdBQUcsTUFBTSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDakQsTUFBTSxPQUFPLEdBQVcsTUFBTSxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNsRixNQUFNLFdBQVcsR0FBWSxPQUFPLElBQUksUUFBUSxDQUFDO1lBRWpELE1BQU0sVUFBVSxHQUFXLFVBQVUsSUFBSSxDQUFDLFdBQVc7Z0JBQ2pELENBQUMsQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCO2dCQUMzQixDQUFDLENBQUMsZ0JBQWdCLENBQUM7WUFFdkIsTUFBTSxVQUFVLEdBQVUsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLE1BQU0sTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQVcsQ0FBQztZQUVuRyxJQUFHLFVBQVUsR0FBRyxVQUFVLEVBQUMsQ0FBQztnQkFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO1lBQzVFLENBQUM7WUFFRCxNQUFNLFFBQVEsR0FBZ0MsVUFBVSxJQUFJLENBQUMsV0FBVztnQkFDcEUsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDO2dCQUN0RCxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMxQyxNQUFNLE1BQU0sR0FBc0MsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMzRixPQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDM0QsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSztZQUNwQyxJQUFHLENBQUMsTUFBTTtnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7WUFDakYsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMxQyxJQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx1RUFBdUUsQ0FBQyxDQUFDO1lBQzFILE1BQU0sUUFBUSxHQUFnQyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUUsTUFBTSxNQUFNLEdBQXNDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDM0YsT0FBTyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzNELENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUs7WUFDekMsSUFBRyxDQUFDLE1BQU07Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1lBQ3pGLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDMUMsSUFBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUZBQXVGLENBQUMsQ0FBQztZQUNsSixNQUFNLFFBQVEsR0FBZ0MsTUFBTSxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RGLE1BQU0sTUFBTSxHQUFzQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzNGLE9BQU8sTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMzRCxDQUFDO1FBQ0Qsb0VBQW9FO0tBQ3ZFLENBQUE7QUFFTCxDQUFDIn0=