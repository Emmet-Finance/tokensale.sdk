import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "./common";
export declare namespace StakingStorage {
    type PositionStruct = {
        period: BigNumberish;
        start: BigNumberish;
        maturity: BigNumberish;
        locked: BigNumberish;
        claimed: BigNumberish;
        unclaimed: BigNumberish;
    };
    type PositionStructOutput = [
        period: bigint,
        start: bigint,
        maturity: bigint,
        locked: bigint,
        claimed: bigint,
        unclaimed: bigint
    ] & {
        period: bigint;
        start: bigint;
        maturity: bigint;
        locked: bigint;
        claimed: bigint;
        unclaimed: bigint;
    };
}
export interface StakingInterface extends Interface {
    getFunction(nameOrSignature: "CFO_ROLE" | "DEFAULT_ADMIN_ROLE" | "HALF" | "MANAGER_ROLE" | "QUARTER" | "QUARTERS3" | "UPGRADE_INTERFACE_VERSION" | "YEAR" | "_admin_init" | "cfo" | "coinWithdraw" | "decimals" | "getRoleAdmin" | "grantRole" | "hasRole" | "initialize" | "manager" | "metrics" | "pause" | "paused" | "posCount" | "positions" | "positionsAndRewards" | "proxiableUUID" | "renounceRole" | "revokeRole" | "stake" | "supportsInterface" | "terms" | "token" | "unpause" | "unstake" | "updateCFO" | "updateManager" | "updateTerms" | "upgradeToAndCall" | "withdrawExcess" | "withdrawRewards"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized" | "Paused" | "RoleAdminChanged" | "RoleGranted" | "RoleRevoked" | "RoleUdated" | "Staked" | "TermsUpdated" | "Unpaused" | "Unstaked" | "Upgraded" | "Withdraw" | "WithdrawnRewards"): EventFragment;
    encodeFunctionData(functionFragment: "CFO_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "HALF", values?: undefined): string;
    encodeFunctionData(functionFragment: "MANAGER_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "QUARTER", values?: undefined): string;
    encodeFunctionData(functionFragment: "QUARTERS3", values?: undefined): string;
    encodeFunctionData(functionFragment: "UPGRADE_INTERFACE_VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "YEAR", values?: undefined): string;
    encodeFunctionData(functionFragment: "_admin_init", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "cfo", values?: undefined): string;
    encodeFunctionData(functionFragment: "coinWithdraw", values?: undefined): string;
    encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "initialize", values: [AddressLike, AddressLike, AddressLike, boolean]): string;
    encodeFunctionData(functionFragment: "manager", values?: undefined): string;
    encodeFunctionData(functionFragment: "metrics", values?: undefined): string;
    encodeFunctionData(functionFragment: "pause", values?: undefined): string;
    encodeFunctionData(functionFragment: "paused", values?: undefined): string;
    encodeFunctionData(functionFragment: "posCount", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "positions", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "positionsAndRewards", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "proxiableUUID", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "stake", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "terms", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "token", values?: undefined): string;
    encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
    encodeFunctionData(functionFragment: "unstake", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "updateCFO", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "updateManager", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "updateTerms", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "upgradeToAndCall", values: [AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "withdrawExcess", values?: undefined): string;
    encodeFunctionData(functionFragment: "withdrawRewards", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "CFO_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "HALF", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "MANAGER_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "QUARTER", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "QUARTERS3", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "UPGRADE_INTERFACE_VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "YEAR", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "_admin_init", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "coinWithdraw", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "manager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "metrics", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "posCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "positions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "positionsAndRewards", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxiableUUID", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "terms", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unstake", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateCFO", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateTerms", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeToAndCall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawExcess", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawRewards", data: BytesLike): Result;
}
export declare namespace InitializedEvent {
    type InputTuple = [version: BigNumberish];
    type OutputTuple = [version: bigint];
    interface OutputObject {
        version: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace PausedEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleAdminChangedEvent {
    type InputTuple = [
        role: BytesLike,
        previousAdminRole: BytesLike,
        newAdminRole: BytesLike
    ];
    type OutputTuple = [
        role: string,
        previousAdminRole: string,
        newAdminRole: string
    ];
    interface OutputObject {
        role: string;
        previousAdminRole: string;
        newAdminRole: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleGrantedEvent {
    type InputTuple = [
        role: BytesLike,
        account: AddressLike,
        sender: AddressLike
    ];
    type OutputTuple = [role: string, account: string, sender: string];
    interface OutputObject {
        role: string;
        account: string;
        sender: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleRevokedEvent {
    type InputTuple = [
        role: BytesLike,
        account: AddressLike,
        sender: AddressLike
    ];
    type OutputTuple = [role: string, account: string, sender: string];
    interface OutputObject {
        role: string;
        account: string;
        sender: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleUdatedEvent {
    type InputTuple = [
        old: AddressLike,
        updated: AddressLike,
        role: string
    ];
    type OutputTuple = [old: string, updated: string, role: string];
    interface OutputObject {
        old: string;
        updated: string;
        role: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace StakedEvent {
    type InputTuple = [
        staker: AddressLike,
        period: BigNumberish,
        amount: BigNumberish
    ];
    type OutputTuple = [staker: string, period: bigint, amount: bigint];
    interface OutputObject {
        staker: string;
        period: bigint;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TermsUpdatedEvent {
    type InputTuple = [period: BigNumberish, percentage: BigNumberish];
    type OutputTuple = [period: bigint, percentage: bigint];
    interface OutputObject {
        period: bigint;
        percentage: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace UnpausedEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace UnstakedEvent {
    type InputTuple = [
        staker: AddressLike,
        posIndex: BigNumberish,
        amount: BigNumberish,
        rewards: BigNumberish
    ];
    type OutputTuple = [
        staker: string,
        posIndex: bigint,
        amount: bigint,
        rewards: bigint
    ];
    interface OutputObject {
        staker: string;
        posIndex: bigint;
        amount: bigint;
        rewards: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace UpgradedEvent {
    type InputTuple = [implementation: AddressLike];
    type OutputTuple = [implementation: string];
    interface OutputObject {
        implementation: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace WithdrawEvent {
    type InputTuple = [symbol: string, recepient: AddressLike];
    type OutputTuple = [symbol: string, recepient: string];
    interface OutputObject {
        symbol: string;
        recepient: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace WithdrawnRewardsEvent {
    type InputTuple = [
        staker: AddressLike,
        posIndex: BigNumberish,
        rewards: BigNumberish
    ];
    type OutputTuple = [staker: string, posIndex: bigint, rewards: bigint];
    interface OutputObject {
        staker: string;
        posIndex: bigint;
        rewards: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface Staking extends BaseContract {
    connect(runner?: ContractRunner | null): Staking;
    waitForDeployment(): Promise<this>;
    interface: StakingInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    CFO_ROLE: TypedContractMethod<[], [string], "view">;
    DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;
    HALF: TypedContractMethod<[], [bigint], "view">;
    MANAGER_ROLE: TypedContractMethod<[], [string], "view">;
    QUARTER: TypedContractMethod<[], [bigint], "view">;
    QUARTERS3: TypedContractMethod<[], [bigint], "view">;
    UPGRADE_INTERFACE_VERSION: TypedContractMethod<[], [string], "view">;
    YEAR: TypedContractMethod<[], [bigint], "view">;
    _admin_init: TypedContractMethod<[
        cfo_: AddressLike,
        manager_: AddressLike
    ], [
        void
    ], "nonpayable">;
    cfo: TypedContractMethod<[], [string], "view">;
    coinWithdraw: TypedContractMethod<[], [void], "nonpayable">;
    decimals: TypedContractMethod<[], [bigint], "view">;
    getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;
    grantRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    hasRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        boolean
    ], "view">;
    initialize: TypedContractMethod<[
        cfo_: AddressLike,
        manager_: AddressLike,
        token_: AddressLike,
        isProduction: boolean
    ], [
        void
    ], "nonpayable">;
    manager: TypedContractMethod<[], [string], "view">;
    metrics: TypedContractMethod<[
    ], [
        [
            bigint,
            bigint,
            bigint,
            bigint
        ] & {
            locked: bigint;
            rewards: bigint;
            claimed: bigint;
            delta: bigint;
        }
    ], "view">;
    pause: TypedContractMethod<[], [void], "nonpayable">;
    paused: TypedContractMethod<[], [boolean], "view">;
    posCount: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    positions: TypedContractMethod<[
        arg0: AddressLike,
        arg1: BigNumberish
    ], [
        [
            bigint,
            bigint,
            bigint,
            bigint,
            bigint,
            bigint
        ] & {
            period: bigint;
            start: bigint;
            maturity: bigint;
            locked: bigint;
            claimed: bigint;
            unclaimed: bigint;
        }
    ], "view">;
    positionsAndRewards: TypedContractMethod<[
        staker: AddressLike
    ], [
        [
            StakingStorage.PositionStructOutput[],
            bigint,
            bigint,
            bigint
        ] & {
            ps: StakingStorage.PositionStructOutput[];
            staked: bigint;
            ttlRewards: bigint;
            availableRewards: bigint;
        }
    ], "view">;
    proxiableUUID: TypedContractMethod<[], [string], "view">;
    renounceRole: TypedContractMethod<[
        role: BytesLike,
        callerConfirmation: AddressLike
    ], [
        void
    ], "nonpayable">;
    revokeRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    stake: TypedContractMethod<[
        amount: BigNumberish,
        period: BigNumberish
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    terms: TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
    token: TypedContractMethod<[], [string], "view">;
    unpause: TypedContractMethod<[], [void], "nonpayable">;
    unstake: TypedContractMethod<[posIndex: BigNumberish], [void], "nonpayable">;
    updateCFO: TypedContractMethod<[
        candidate: AddressLike
    ], [
        void
    ], "nonpayable">;
    updateManager: TypedContractMethod<[
        candidate: AddressLike
    ], [
        void
    ], "nonpayable">;
    updateTerms: TypedContractMethod<[
        period: BigNumberish,
        percentage: BigNumberish
    ], [
        void
    ], "nonpayable">;
    upgradeToAndCall: TypedContractMethod<[
        newImplementation: AddressLike,
        data: BytesLike
    ], [
        void
    ], "payable">;
    withdrawExcess: TypedContractMethod<[], [void], "nonpayable">;
    withdrawRewards: TypedContractMethod<[
        posIndex: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "CFO_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "HALF"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "MANAGER_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "QUARTER"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "QUARTERS3"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "UPGRADE_INTERFACE_VERSION"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "YEAR"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "_admin_init"): TypedContractMethod<[
        cfo_: AddressLike,
        manager_: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "cfo"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "coinWithdraw"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "decimals"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getRoleAdmin"): TypedContractMethod<[role: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "grantRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "hasRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
        cfo_: AddressLike,
        manager_: AddressLike,
        token_: AddressLike,
        isProduction: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "manager"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "metrics"): TypedContractMethod<[
    ], [
        [
            bigint,
            bigint,
            bigint,
            bigint
        ] & {
            locked: bigint;
            rewards: bigint;
            claimed: bigint;
            delta: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "pause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "paused"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "posCount"): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "positions"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: BigNumberish
    ], [
        [
            bigint,
            bigint,
            bigint,
            bigint,
            bigint,
            bigint
        ] & {
            period: bigint;
            start: bigint;
            maturity: bigint;
            locked: bigint;
            claimed: bigint;
            unclaimed: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "positionsAndRewards"): TypedContractMethod<[
        staker: AddressLike
    ], [
        [
            StakingStorage.PositionStructOutput[],
            bigint,
            bigint,
            bigint
        ] & {
            ps: StakingStorage.PositionStructOutput[];
            staked: bigint;
            ttlRewards: bigint;
            availableRewards: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "proxiableUUID"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "renounceRole"): TypedContractMethod<[
        role: BytesLike,
        callerConfirmation: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "revokeRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "stake"): TypedContractMethod<[
        amount: BigNumberish,
        period: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "terms"): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "token"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "unpause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "unstake"): TypedContractMethod<[posIndex: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "updateCFO"): TypedContractMethod<[candidate: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "updateManager"): TypedContractMethod<[candidate: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "updateTerms"): TypedContractMethod<[
        period: BigNumberish,
        percentage: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "upgradeToAndCall"): TypedContractMethod<[
        newImplementation: AddressLike,
        data: BytesLike
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "withdrawExcess"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "withdrawRewards"): TypedContractMethod<[posIndex: BigNumberish], [void], "nonpayable">;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "Paused"): TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
    getEvent(key: "RoleAdminChanged"): TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
    getEvent(key: "RoleGranted"): TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
    getEvent(key: "RoleRevoked"): TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
    getEvent(key: "RoleUdated"): TypedContractEvent<RoleUdatedEvent.InputTuple, RoleUdatedEvent.OutputTuple, RoleUdatedEvent.OutputObject>;
    getEvent(key: "Staked"): TypedContractEvent<StakedEvent.InputTuple, StakedEvent.OutputTuple, StakedEvent.OutputObject>;
    getEvent(key: "TermsUpdated"): TypedContractEvent<TermsUpdatedEvent.InputTuple, TermsUpdatedEvent.OutputTuple, TermsUpdatedEvent.OutputObject>;
    getEvent(key: "Unpaused"): TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
    getEvent(key: "Unstaked"): TypedContractEvent<UnstakedEvent.InputTuple, UnstakedEvent.OutputTuple, UnstakedEvent.OutputObject>;
    getEvent(key: "Upgraded"): TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
    getEvent(key: "Withdraw"): TypedContractEvent<WithdrawEvent.InputTuple, WithdrawEvent.OutputTuple, WithdrawEvent.OutputObject>;
    getEvent(key: "WithdrawnRewards"): TypedContractEvent<WithdrawnRewardsEvent.InputTuple, WithdrawnRewardsEvent.OutputTuple, WithdrawnRewardsEvent.OutputObject>;
    filters: {
        "Initialized(uint64)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "Paused(address)": TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        Paused: TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        RoleAdminChanged: TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        "RoleGranted(bytes32,address,address)": TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        RoleGranted: TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        "RoleRevoked(bytes32,address,address)": TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        RoleRevoked: TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        "RoleUdated(address,address,string)": TypedContractEvent<RoleUdatedEvent.InputTuple, RoleUdatedEvent.OutputTuple, RoleUdatedEvent.OutputObject>;
        RoleUdated: TypedContractEvent<RoleUdatedEvent.InputTuple, RoleUdatedEvent.OutputTuple, RoleUdatedEvent.OutputObject>;
        "Staked(address,uint8,uint128)": TypedContractEvent<StakedEvent.InputTuple, StakedEvent.OutputTuple, StakedEvent.OutputObject>;
        Staked: TypedContractEvent<StakedEvent.InputTuple, StakedEvent.OutputTuple, StakedEvent.OutputObject>;
        "TermsUpdated(uint8,uint16)": TypedContractEvent<TermsUpdatedEvent.InputTuple, TermsUpdatedEvent.OutputTuple, TermsUpdatedEvent.OutputObject>;
        TermsUpdated: TypedContractEvent<TermsUpdatedEvent.InputTuple, TermsUpdatedEvent.OutputTuple, TermsUpdatedEvent.OutputObject>;
        "Unpaused(address)": TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
        Unpaused: TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
        "Unstaked(address,uint16,uint128,uint128)": TypedContractEvent<UnstakedEvent.InputTuple, UnstakedEvent.OutputTuple, UnstakedEvent.OutputObject>;
        Unstaked: TypedContractEvent<UnstakedEvent.InputTuple, UnstakedEvent.OutputTuple, UnstakedEvent.OutputObject>;
        "Upgraded(address)": TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
        Upgraded: TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
        "Withdraw(string,address)": TypedContractEvent<WithdrawEvent.InputTuple, WithdrawEvent.OutputTuple, WithdrawEvent.OutputObject>;
        Withdraw: TypedContractEvent<WithdrawEvent.InputTuple, WithdrawEvent.OutputTuple, WithdrawEvent.OutputObject>;
        "WithdrawnRewards(address,uint16,uint128)": TypedContractEvent<WithdrawnRewardsEvent.InputTuple, WithdrawnRewardsEvent.OutputTuple, WithdrawnRewardsEvent.OutputObject>;
        WithdrawnRewards: TypedContractEvent<WithdrawnRewardsEvent.InputTuple, WithdrawnRewardsEvent.OutputTuple, WithdrawnRewardsEvent.OutputObject>;
    };
}
//# sourceMappingURL=Staking.d.ts.map