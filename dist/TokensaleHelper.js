"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensaleHelper = TokensaleHelper;
const ethers_1 = require("ethers");
const factories_1 = require("./factories");
const utils_1 = require("./utils");
async function TokensaleHelper({ chainId, emmetAddress, rpcs, tokensaleAddress, usdtAddress }) {
    const fetchProvider = (index) => {
        const randomRpcIndex = index ?? Math.floor(Math.random() * rpcs.length);
        return new ethers_1.JsonRpcProvider(rpcs[randomRpcIndex], chainId);
    };
    const getEmmet = (runner) => factories_1.EMMET__factory.connect(emmetAddress, runner);
    const getUsdt = (runner) => factories_1.EMMET__factory.connect(usdtAddress, runner);
    const getTokensale = (runner) => factories_1.Tokensale__factory.connect(tokensaleAddress, runner);
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
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9rZW5zYWxlSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1Rva2Vuc2FsZUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU9BLDBDQXFJQztBQTVJRCxtQ0FBNEg7QUFFNUgsMkNBQWlFO0FBRWpFLG1DQUFnQztBQUd6QixLQUFLLFVBQVUsZUFBZSxDQUFDLEVBQ2xDLE9BQU8sRUFDUCxZQUFZLEVBQ1osSUFBSSxFQUNKLGdCQUFnQixFQUNoQixXQUFXLEVBQ0w7SUFFTixNQUFNLGFBQWEsR0FBRyxDQUFDLEtBQWMsRUFBWSxFQUFFO1FBQy9DLE1BQU0sY0FBYyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEUsT0FBTyxJQUFJLHdCQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlELENBQUMsQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFHLENBQUMsTUFBc0IsRUFBRSxFQUFFLENBQUMsMEJBQWMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRTFGLE1BQU0sT0FBTyxHQUFHLENBQUMsTUFBc0IsRUFBRSxFQUFFLENBQUMsMEJBQWMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXhGLE1BQU0sWUFBWSxHQUFHLENBQUMsTUFBc0IsRUFBRSxFQUFFLENBQUMsOEJBQWtCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXRHLEtBQUssVUFBVSxlQUFlLENBQUksRUFBc0MsRUFBRSxPQUFPLEdBQUcsQ0FBQztRQUNqRixJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUUvRCxN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