"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeRefKey = computeRefKey;
exports.sleep = sleep;
const ethers_1 = require("ethers");
function computeRefKey(ref) {
    return (0, ethers_1.keccak256)((0, ethers_1.toUtf8Bytes)(ref));
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxzQ0FFQztBQUVELHNCQUVDO0FBUkQsbUNBQWdEO0FBRWhELFNBQWdCLGFBQWEsQ0FBQyxHQUFXO0lBQ3JDLE9BQU8sSUFBQSxrQkFBUyxFQUFDLElBQUEsb0JBQVcsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFFRCxTQUFnQixLQUFLLENBQUMsRUFBVTtJQUM5QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDM0QsQ0FBQyJ9