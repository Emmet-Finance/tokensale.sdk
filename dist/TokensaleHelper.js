"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensaleHelper = TokensaleHelper;
const ethers_1 = require("ethers");
const factories_1 = require("./factories");
const utils_1 = require("./utils");
const Staking__factory_1 = require("./factories/Staking__factory");
async function TokensaleHelper({ chainId, emmetAddress, rpcs, stakingAddress, tokensaleAddress, usdtAddress }) {
    const fetchProvider = (index) => {
        const randomRpcIndex = index > rpcs.length
            ? Math.floor(Math.random() * rpcs.length)
            : index;
        return new ethers_1.JsonRpcProvider(rpcs[randomRpcIndex], chainId);
    };
    const getEmmet = (runner) => factories_1.EMMET__factory.connect(emmetAddress, runner);
    const getUsdt = (runner) => factories_1.EMMET__factory.connect(usdtAddress, runner);
    const getTokensale = (runner) => factories_1.Tokensale__factory.connect(tokensaleAddress, runner);
    const getStaking = (runner) => Staking__factory_1.Staking__factory.connect(stakingAddress, runner);
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
    const getToken = (symbol, provider) => {
        return symbol == "EMMET"
            ? getEmmet(provider)
            : getUsdt(provider);
    };
    return {
        // -----------------------------------------------------------------
        // interface Token (ERC20)
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
        async positions(address) {
            return withRpcRotation(async (provider) => {
                const staking = getStaking(provider);
                const reply = await staking.positionsAndRewards(address);
                return (0, utils_1.parsePositionsAndRewards)(reply);
            });
        },
        // -----------------------------------------------------------------
        async stake(signer, amount, period) {
            const staking = getStaking(signer);
            const response = await staking.stake(amount, period);
            const result = await response.wait(3);
            return result && result.hash ? result.hash : undefined;
        },
        // -----------------------------------------------------------------
        async unstake(signer, posIndex) {
            const staking = getStaking(signer);
            const response = await staking.unstake(posIndex);
            const result = await response.wait(3);
            return result && result.hash ? result.hash : undefined;
        },
        // -----------------------------------------------------------------
        async withdrawRewards(signer, posIndex) {
            const staking = getStaking(signer);
            const response = await staking.withdrawRewards(posIndex);
            const result = await response.wait(3);
            return result && result.hash ? result.hash : undefined;
        },
        // -----------------------------------------------------------------
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9rZW5zYWxlSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1Rva2Vuc2FsZUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVFBLDBDQTRMQztBQXBNRCxtQ0FBeUk7QUFFekksMkNBQWlFO0FBRWpFLG1DQUF5RTtBQUV6RSxtRUFBZ0U7QUFFekQsS0FBSyxVQUFVLGVBQWUsQ0FBQyxFQUNsQyxPQUFPLEVBQ1AsWUFBWSxFQUNaLElBQUksRUFDSixjQUFjLEVBQ2QsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDTDtJQUVOLE1BQU0sYUFBYSxHQUFHLENBQUMsS0FBYyxFQUFZLEVBQUU7UUFDL0MsTUFBTSxjQUFjLEdBQVcsS0FBZSxHQUFHLElBQUksQ0FBQyxNQUFNO1lBQ3hELENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxLQUFlLENBQUM7UUFDdEIsT0FBTyxJQUFJLHdCQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlELENBQUMsQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFHLENBQUMsTUFBc0IsRUFBRSxFQUFFLENBQUMsMEJBQWMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRTFGLE1BQU0sT0FBTyxHQUFHLENBQUMsTUFBc0IsRUFBRSxFQUFFLENBQUMsMEJBQWMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXhGLE1BQU0sWUFBWSxHQUFHLENBQUMsTUFBc0IsRUFBRSxFQUFFLENBQUMsOEJBQWtCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXRHLE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBc0IsRUFBRSxFQUFFLENBQUMsbUNBQWdCLENBQUMsT0FB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