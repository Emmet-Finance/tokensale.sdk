import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../contracts/common";
import type { EMMET, EMMETInterface } from "../contracts/EMMET";
type EMMETConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class EMMET__factory extends ContractFactory {
    constructor(...args: EMMETConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<EMMET & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): EMMET__factory;
    static readonly bytecode = "0x60a06040523060805234801561001457600080fd5b50608051611aca61003e60003960008181610d7301528181610d9c0152610f700152611aca6000f3fe60806040526004361061016a5760003560e01c806352d1902d116100cb578063a9059cbb1161007f578063d547741f11610059578063d547741f14610486578063dd62ed3e146104a6578063f72c0d8b1461050b57600080fd5b8063a9059cbb146103fd578063ad3cb1cc1461041d578063c4d66de81461046657600080fd5b806391d14854116100b057806391d148541461036e57806395d89b41146103d3578063a217fddf146103e857600080fd5b806352d1902d1461030457806370a082311461031957600080fd5b8063248a9ca311610122578063313ce56711610107578063313ce567146102b557806336568abe146102d15780634f1ef286146102f157600080fd5b8063248a9ca3146102445780632f2ff15d1461029357600080fd5b8063095ea7b311610153578063095ea7b3146101c657806318160ddd146101e657806323b872dd1461022457600080fd5b806301ffc9a71461016f57806306fdde03146101a4575b600080fd5b34801561017b57600080fd5b5061018f61018a36600461167f565b61053f565b60405190151581526020015b60405180910390f35b3480156101b057600080fd5b506101b96105d8565b60405161019b91906116e5565b3480156101d257600080fd5b5061018f6101e1366004611734565b6106ad565b3480156101f257600080fd5b507f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace02545b60405190815260200161019b565b34801561023057600080fd5b5061018f61023f36600461175e565b6106c5565b34801561025057600080fd5b5061021661025f36600461179a565b60009081527f02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800602052604090206001015490565b34801561029f57600080fd5b506102b36102ae3660046117b3565b6106eb565b005b3480156102c157600080fd5b506040516012815260200161019b565b3480156102dd57600080fd5b506102b36102ec3660046117b3565b610735565b6102b36102ff3660046117f5565b610786565b34801561031057600080fd5b506102166107a5565b34801561032557600080fd5b506102166103343660046118b7565b6001600160a01b031660009081527f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace00602052604090205490565b34801561037a57600080fd5b5061018f6103893660046117b3565b60009182527f02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800602090815260408084206001600160a01b0393909316845291905290205460ff1690565b3480156103df57600080fd5b506101b96107d4565b3480156103f457600080fd5b50610216600081565b34801561040957600080fd5b5061018f610418366004611734565b610825565b34801561042957600080fd5b506101b96040518060400160405280600581526020017f352e302e3000000000000000000000000000000000000000000000000000000081525081565b34801561047257600080fd5b506102b36104813660046118b7565b610833565b34801561049257600080fd5b506102b36104a13660046117b3565b610a4f565b3480156104b257600080fd5b506102166104c13660046118d2565b6001600160a01b0391821660009081527f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace016020908152604080832093909416825291909152205490565b34801561051757600080fd5b506102167f189ab7a9244df0848122154315af71fe140f3db0fe014031783b0946b8c9d2e381565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b0000000000000000000000000000000000000000000000000000000014806105d257507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b7f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace0380546060917f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace0091610629906118fc565b80601f0160208091040260200160405190810160405280929190818152602001828054610655906118fc565b80156106a25780601f10610677576101008083540402835291602001916106a2565b820191906000526020600020905b81548152906001019060200180831161068557829003601f168201915b505050505091505090565b6000336106bb818585610a93565b5060019392505050565b6000336106d3858285610aa0565b6106de858585610b55565b60019150505b9392505050565b60008281527f02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800602052604090206001015461072581610be6565b61072f8383610bf3565b50505050565b6001600160a01b0381163314610777576040517f6697b23200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6107818282610cc2565b505050565b61078e610d68565b61079782610e3a565b6107a18282610e64565b5050565b60006107af610f65565b507f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc90565b7f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace0480546060917f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace0091610629906118fc565b6000336106bb818585610b55565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00805468010000000000000000810460ff16159067ffffffffffffffff1660008115801561087e5750825b905060008267ffffffffffffffff16600114801561089b5750303b155b9050811580156108a9575080155b156108e0576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b84547fffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000166001178555831561092b57845468ff00000000000000001916680100000000000000001785555b61099f6040518060400160405280601381526020017f456d6d65742046696e616e636520546f6b656e000000000000000000000000008152506040518060400160405280600581526020017f454d4d4554000000000000000000000000000000000000000000000000000000815250610fc7565b6109a7610fd9565b6109af610fd9565b6109ba600087610bf3565b506109e57f189ab7a9244df0848122154315af71fe140f3db0fe014031783b0946b8c9d2e387610bf3565b506109fc866b033b2e3c9fd0803ce8000000610fe1565b8315610a4757845468ff000000000000000019168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050565b60008281527f02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b6268006020526040902060010154610a8981610be6565b61072f8383610cc2565b6107818383836001611030565b6001600160a01b0383811660009081527f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace016020908152604080832093861683529290522054600019811461072f5781811015610b46576040517ffb8f41b20000000000000000000000000000000000000000000000000000000081526001600160a01b038416600482015260248101829052604481018390526064015b60405180910390fd5b61072f84848484036000611030565b6001600160a01b038316610b98576040517f96c6fd1e00000000000000000000000000000000000000000000000000000000815260006004820152602401610b3d565b6001600160a01b038216610bdb576040517fec442f0500000000000000000000000000000000000000000000000000000000815260006004820152602401610b3d565b61078183838361115c565b610bf081336112c5565b50565b60008281527f02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800602081815260408084206001600160a01b038616855290915282205460ff16610cb8576000848152602082815260408083206001600160a01b03871684529091529020805460ff19166001179055610c6e3390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a460019150506105d2565b60009150506105d2565b60008281527f02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800602081815260408084206001600160a01b038616855290915282205460ff1615610cb8576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a460019150506105d2565b306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161480610e0157507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610df57f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b6001600160a01b031614155b15610e38576040517fe07c8dba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b7f189ab7a9244df0848122154315af71fe140f3db0fe014031783b0946b8c9d2e36107a181610be6565b816001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015610ebe575060408051601f3d908101601f19168201909252610ebb91810190611936565b60015b610eff576040517f4c9c8ce30000000000000000000000000000000000000000000000000000000081526001600160a01b0383166004820152602401610b3d565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc8114610f5b576040517faa1d49a400000000000000000000000000000000000000000000000000000000815260048101829052602401610b3d565b6107818383611352565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610e38576040517fe07c8dba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610fcf6113a8565b6107a1828261140f565b610e386113a8565b6001600160a01b038216611024576040517fec442f0500000000000000000000000000000000000000000000000000000000815260006004820152602401610b3d565b6107a16000838361115c565b7f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace006001600160a01b038516611094576040517fe602df0500000000000000000000000000000000000000000000000000000000815260006004820152602401610b3d565b6001600160a01b0384166110d7576040517f94280d6200000000000000000000000000000000000000000000000000000000815260006004820152602401610b3d565b6001600160a01b0380861660009081526001830160209081526040808320938816835292905220839055811561115557836001600160a01b0316856001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258560405161114c91815260200190565b60405180910390a35b5050505050565b7f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace006001600160a01b0384166111aa578181600201600082825461119f919061194f565b909155506112359050565b6001600160a01b03841660009081526020829052604090205482811015611216576040517fe450d38c0000000000000000000000000000000000000000000000000000000081526001600160a01b03861660048201526024810182905260448101849052606401610b3d565b6001600160a01b03851660009081526020839052604090209083900390555b6001600160a01b038316611253576002810180548390039055611272565b6001600160a01b03831660009081526020829052604090208054830190555b826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516112b791815260200190565b60405180910390a350505050565b60008281527f02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800602090815260408083206001600160a01b038516845290915290205460ff166107a1576040517fe2517d3f0000000000000000000000000000000000000000000000000000000081526001600160a01b038216600482015260248101839052604401610b3d565b61135b82611472565b6040516001600160a01b038316907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a28051156113a057610781828261151a565b6107a1611590565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a005468010000000000000000900460ff16610e38576040517fd7e6bcf800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6114176113a8565b7f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace007f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace0361146384826119b8565b506004810161072f83826119b8565b806001600160a01b03163b6000036114c1576040517f4c9c8ce30000000000000000000000000000000000000000000000000000000081526001600160a01b0382166004820152602401610b3d565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b6060600080846001600160a01b0316846040516115379190611a78565b600060405180830381855af49150503d8060008114611572576040519150601f19603f3d011682016040523d82523d6000602084013e611577565b606091505b50915091506115878583836115c8565b95945050505050565b3415610e38576040517fb398979f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6060826115dd576115d88261163d565b6106e4565b81511580156115f457506001600160a01b0384163b155b15611636576040517f9996b3150000000000000000000000000000000000000000000000000000000081526001600160a01b0385166004820152602401610b3d565b50806106e4565b80511561164d5780518082602001fd5b6040517f1425ea4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006020828403121561169157600080fd5b81357fffffffff00000000000000000000000000000000000000000000000000000000811681146106e457600080fd5b60005b838110156116dc5781810151838201526020016116c4565b50506000910152565b60208152600082518060208401526117048160408501602087016116c1565b601f01601f19169190910160400192915050565b80356001600160a01b038116811461172f57600080fd5b919050565b6000806040838503121561174757600080fd5b61175083611718565b946020939093013593505050565b60008060006060848603121561177357600080fd5b61177c84611718565b925061178a60208501611718565b9150604084013590509250925092565b6000602082840312156117ac57600080fd5b5035919050565b600080604083850312156117c657600080fd5b823591506117d660208401611718565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121561180857600080fd5b61181183611718565b9150602083013567ffffffffffffffff8082111561182e57600080fd5b818501915085601f83011261184257600080fd5b813581811115611854576118546117df565b604051601f8201601f19908116603f0116810190838211818310171561187c5761187c6117df565b8160405282815288602084870101111561189557600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b6000602082840312156118c957600080fd5b6106e482611718565b600080604083850312156118e557600080fd5b6118ee83611718565b91506117d660208401611718565b600181811c9082168061191057607f821691505b60208210810361193057634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561194857600080fd5b5051919050565b808201808211156105d257634e487b7160e01b600052601160045260246000fd5b601f821115610781576000816000526020600020601f850160051c810160208610156119995750805b601f850160051c820191505b81811015610a47578281556001016119a5565b815167ffffffffffffffff8111156119d2576119d26117df565b6119e6816119e084546118fc565b84611970565b602080601f831160018114611a1b5760008415611a035750858301515b600019600386901b1c1916600185901b178555610a47565b600085815260208120601f198616915b82811015611a4a57888601518255948401946001909101908401611a2b565b5085821015611a685787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60008251611a8a8184602087016116c1565b919091019291505056fea264697066735822122006eea667c528ca8b7170d4da5384d7d71b713954e1ab1ecb114f952e2093878364736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "AccessControlBadConfirmation";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "neededRole";
            readonly type: "bytes32";
        }];
        readonly name: "AccessControlUnauthorizedAccount";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "target";
            readonly type: "address";
        }];
        readonly name: "AddressEmptyCode";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "implementation";
            readonly type: "address";
        }];
        readonly name: "ERC1967InvalidImplementation";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ERC1967NonPayable";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "allowance";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "needed";
            readonly type: "uint256";
        }];
        readonly name: "ERC20InsufficientAllowance";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "balance";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "needed";
            readonly type: "uint256";
        }];
        readonly name: "ERC20InsufficientBalance";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "approver";
            readonly type: "address";
        }];
        readonly name: "ERC20InvalidApprover";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "receiver";
            readonly type: "address";
        }];
        readonly name: "ERC20InvalidReceiver";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "ERC20InvalidSender";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }];
        readonly name: "ERC20InvalidSpender";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "FailedInnerCall";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidInitialization";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NotInitializing";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "UUPSUnauthorizedCallContext";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "slot";
            readonly type: "bytes32";
        }];
        readonly name: "UUPSUnsupportedProxiableUUID";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Approval";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint64";
            readonly name: "version";
            readonly type: "uint64";
        }];
        readonly name: "Initialized";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "previousAdminRole";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "newAdminRole";
            readonly type: "bytes32";
        }];
        readonly name: "RoleAdminChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "RoleGranted";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "RoleRevoked";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Transfer";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "implementation";
            readonly type: "address";
        }];
        readonly name: "Upgraded";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "DEFAULT_ADMIN_ROLE";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "UPGRADER_ROLE";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "UPGRADE_INTERFACE_VERSION";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }];
        readonly name: "allowance";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "approve";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "balanceOf";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "decimals";
        readonly outputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "";
            readonly type: "uint8";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }];
        readonly name: "getRoleAdmin";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "grantRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "hasRole";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "initialHolder";
            readonly type: "address";
        }];
        readonly name: "initialize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "name";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "proxiableUUID";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "callerConfirmation";
            readonly type: "address";
        }];
        readonly name: "renounceRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "revokeRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "interfaceId";
            readonly type: "bytes4";
        }];
        readonly name: "supportsInterface";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "symbol";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "totalSupply";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "transfer";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "transferFrom";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newImplementation";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "upgradeToAndCall";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }];
    static createInterface(): EMMETInterface;
    static connect(address: string, runner?: ContractRunner | null): EMMET;
}
export {};
//# sourceMappingURL=EMMET__factory.d.ts.map