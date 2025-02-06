import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "./common";
export interface TokensaleInterface extends Interface {
    getFunction(nameOrSignature: "CFO_ROLE" | "DEFAULT_ADMIN_ROLE" | "INTERVAL" | "LOCK_PERIOD" | "MANAGER_ROLE" | "RELEASE" | "UPGRADE_INTERFACE_VERSION" | "_admin_init" | "addPriceRange" | "buy" | "cash" | "cfo" | "claim" | "claimable" | "coinWithdraw" | "computeRefKey" | "createReference" | "decimals" | "discountGroups" | "discounts" | "estimate" | "getRefOwner" | "getRoleAdmin" | "grantRole" | "hasRole" | "initialize" | "locked" | "manager" | "pause" | "paused" | "proxiableUUID" | "references" | "renounceRole" | "revokeRole" | "rewards1" | "rewards2" | "sold" | "supportsInterface" | "unpause" | "updateCFO" | "updateManager" | "updatePriceRange" | "updateRewards" | "upgradeToAndCall" | "users" | "vesting" | "vestingStart" | "withdrawCash" | "withdrawToken"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "CashWithdrawn" | "Initialized" | "Paused" | "ReferenceCreated" | "RoleAdminChanged" | "RoleGranted" | "RoleRevoked" | "RoleUdated" | "TokensClaimed" | "TokensPurchased" | "TokensWithdrawn" | "Unpaused" | "Upgraded" | "Withdraw"): EventFragment;
    encodeFunctionData(functionFragment: "CFO_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "INTERVAL", values?: undefined): string;
    encodeFunctionData(functionFragment: "LOCK_PERIOD", values?: undefined): string;
    encodeFunctionData(functionFragment: "MANAGER_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "RELEASE", values?: undefined): string;
    encodeFunctionData(functionFragment: "UPGRADE_INTERFACE_VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "_admin_init", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "addPriceRange", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "buy", values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "cash", values?: undefined): string;
    encodeFunctionData(functionFragment: "cfo", values?: undefined): string;
    encodeFunctionData(functionFragment: "claim", values?: undefined): string;
    encodeFunctionData(functionFragment: "claimable", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "coinWithdraw", values?: undefined): string;
    encodeFunctionData(functionFragment: "computeRefKey", values: [string]): string;
    encodeFunctionData(functionFragment: "createReference", values: [string]): string;
    encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
    encodeFunctionData(functionFragment: "discountGroups", values?: undefined): string;
    encodeFunctionData(functionFragment: "discounts", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "estimate", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getRefOwner", values: [string]): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "initialize", values: [
        AddressLike,
        AddressLike,
        AddressLike,
        AddressLike,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "locked", values?: undefined): string;
    encodeFunctionData(functionFragment: "manager", values?: undefined): string;
    encodeFunctionData(functionFragment: "pause", values?: undefined): string;
    encodeFunctionData(functionFragment: "paused", values?: undefined): string;
    encodeFunctionData(functionFragment: "proxiableUUID", values?: undefined): string;
    encodeFunctionData(functionFragment: "references", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "rewards1", values?: undefined): string;
    encodeFunctionData(functionFragment: "rewards2", values?: undefined): string;
    encodeFunctionData(functionFragment: "sold", values?: undefined): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
    encodeFunctionData(functionFragment: "updateCFO", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "updateManager", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "updatePriceRange", values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "updateRewards", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "upgradeToAndCall", values: [AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "users", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "vesting", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "vestingStart", values?: undefined): string;
    encodeFunctionData(functionFragment: "withdrawCash", values?: undefined): string;
    encodeFunctionData(functionFragment: "withdrawToken", values?: undefined): string;
    decodeFunctionResult(functionFragment: "CFO_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "INTERVAL", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LOCK_PERIOD", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "MANAGER_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "RELEASE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "UPGRADE_INTERFACE_VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "_admin_init", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addPriceRange", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimable", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "coinWithdraw", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "computeRefKey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createReference", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "discountGroups", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "discounts", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "estimate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRefOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "locked", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "manager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxiableUUID", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "references", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rewards1", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rewards2", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sold", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateCFO", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updatePriceRange", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateRewards", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeToAndCall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "users", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vesting", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vestingStart", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawCash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawToken", data: BytesLike): Result;
}
export declare namespace CashWithdrawnEvent {
    type InputTuple = [amount: BigNumberish];
    type OutputTuple = [amount: bigint];
    interface OutputObject {
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
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
export declare namespace ReferenceCreatedEvent {
    type InputTuple = [owner: AddressLike, ref: string];
    type OutputTuple = [owner: string, ref: string];
    interface OutputObject {
        owner: string;
        ref: string;
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
export declare namespace TokensClaimedEvent {
    type InputTuple = [buyer: AddressLike, amount: BigNumberish];
    type OutputTuple = [buyer: string, amount: bigint];
    interface OutputObject {
        buyer: string;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TokensPurchasedEvent {
    type InputTuple = [
        buyer: AddressLike,
        released: BigNumberish,
        locked: BigNumberish
    ];
    type OutputTuple = [buyer: string, released: bigint, locked: bigint];
    interface OutputObject {
        buyer: string;
        released: bigint;
        locked: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TokensWithdrawnEvent {
    type InputTuple = [amount: BigNumberish];
    type OutputTuple = [amount: bigint];
    interface OutputObject {
        amount: bigint;
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
export interface Tokensale extends BaseContract {
    connect(runner?: ContractRunner | null): Tokensale;
    waitForDeployment(): Promise<this>;
    interface: TokensaleInterface;
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
    INTERVAL: TypedContractMethod<[], [bigint], "view">;
    LOCK_PERIOD: TypedContractMethod<[], [bigint], "view">;
    MANAGER_ROLE: TypedContractMethod<[], [string], "view">;
    RELEASE: TypedContractMethod<[], [bigint], "view">;
    UPGRADE_INTERFACE_VERSION: TypedContractMethod<[], [string], "view">;
    _admin_init: TypedContractMethod<[
        cfo_: AddressLike,
        manager_: AddressLike
    ], [
        void
    ], "nonpayable">;
    addPriceRange: TypedContractMethod<[
        min: BigNumberish,
        max: BigNumberish,
        price: BigNumberish
    ], [
        void
    ], "nonpayable">;
    buy: TypedContractMethod<[
        pay: BigNumberish,
        ref: string
    ], [
        void
    ], "nonpayable">;
    cash: TypedContractMethod<[], [string], "view">;
    cfo: TypedContractMethod<[], [string], "view">;
    claim: TypedContractMethod<[], [void], "nonpayable">;
    claimable: TypedContractMethod<[buyer: AddressLike], [bigint], "view">;
    coinWithdraw: TypedContractMethod<[], [void], "nonpayable">;
    computeRefKey: TypedContractMethod<[ref: string], [string], "view">;
    createReference: TypedContractMethod<[ref: string], [void], "nonpayable">;
    decimals: TypedContractMethod<[
    ], [
        [
            bigint,
            bigint,
            bigint
        ] & {
            soldDecimals: bigint;
            cashDecimals: bigint;
            delta: bigint;
        }
    ], "view">;
    discountGroups: TypedContractMethod<[], [bigint], "view">;
    discounts: TypedContractMethod<[
        arg0: BigNumberish
    ], [
        [bigint, bigint, bigint] & {
            min: bigint;
            max: bigint;
            price: bigint;
        }
    ], "view">;
    estimate: TypedContractMethod<[pay: BigNumberish], [bigint], "view">;
    getRefOwner: TypedContractMethod<[ref: string], [string], "view">;
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
        soldToken: AddressLike,
        payToken: AddressLike,
        soldDecimals: BigNumberish,
        cashDecimals: BigNumberish,
        endsInDays: BigNumberish
    ], [
        void
    ], "nonpayable">;
    locked: TypedContractMethod<[], [bigint], "view">;
    manager: TypedContractMethod<[], [string], "view">;
    pause: TypedContractMethod<[], [void], "nonpayable">;
    paused: TypedContractMethod<[], [boolean], "view">;
    proxiableUUID: TypedContractMethod<[], [string], "view">;
    references: TypedContractMethod<[ref: BytesLike], [string], "view">;
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
    rewards1: TypedContractMethod<[], [bigint], "view">;
    rewards2: TypedContractMethod<[], [bigint], "view">;
    sold: TypedContractMethod<[], [string], "view">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    unpause: TypedContractMethod<[], [void], "nonpayable">;
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
    updatePriceRange: TypedContractMethod<[
        min: BigNumberish,
        max: BigNumberish,
        price: BigNumberish,
        index: BigNumberish
    ], [
        void
    ], "nonpayable">;
    updateRewards: TypedContractMethod<[
        _rewards1: BigNumberish,
        _rewards2: BigNumberish
    ], [
        void
    ], "nonpayable">;
    upgradeToAndCall: TypedContractMethod<[
        newImplementation: AddressLike,
        data: BytesLike
    ], [
        void
    ], "payable">;
    users: TypedContractMethod<[user: AddressLike], [string], "view">;
    vesting: TypedContractMethod<[
        user: AddressLike
    ], [
        [
            bigint,
            bigint,
            bigint
        ] & {
            start: bigint;
            locked: bigint;
            claimed: bigint;
        }
    ], "view">;
    vestingStart: TypedContractMethod<[], [bigint], "view">;
    withdrawCash: TypedContractMethod<[], [void], "nonpayable">;
    withdrawToken: TypedContractMethod<[], [void], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "CFO_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "INTERVAL"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "LOCK_PERIOD"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "MANAGER_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "RELEASE"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "UPGRADE_INTERFACE_VERSION"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "_admin_init"): TypedContractMethod<[
        cfo_: AddressLike,
        manager_: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "addPriceRange"): TypedContractMethod<[
        min: BigNumberish,
        max: BigNumberish,
        price: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "buy"): TypedContractMethod<[
        pay: BigNumberish,
        ref: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "cash"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "cfo"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "claim"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "claimable"): TypedContractMethod<[buyer: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "coinWithdraw"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "computeRefKey"): TypedContractMethod<[ref: string], [string], "view">;
    getFunction(nameOrSignature: "createReference"): TypedContractMethod<[ref: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "decimals"): TypedContractMethod<[
    ], [
        [
            bigint,
            bigint,
            bigint
        ] & {
            soldDecimals: bigint;
            cashDecimals: bigint;
            delta: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "discountGroups"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "discounts"): TypedContractMethod<[
        arg0: BigNumberish
    ], [
        [bigint, bigint, bigint] & {
            min: bigint;
            max: bigint;
            price: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "estimate"): TypedContractMethod<[pay: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "getRefOwner"): TypedContractMethod<[ref: string], [string], "view">;
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
        soldToken: AddressLike,
        payToken: AddressLike,
        soldDecimals: BigNumberish,
        cashDecimals: BigNumberish,
        endsInDays: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "locked"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "manager"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "pause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "paused"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "proxiableUUID"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "references"): TypedContractMethod<[ref: BytesLike], [string], "view">;
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
    getFunction(nameOrSignature: "rewards1"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "rewards2"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "sold"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "unpause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "updateCFO"): TypedContractMethod<[candidate: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "updateManager"): TypedContractMethod<[candidate: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "updatePriceRange"): TypedContractMethod<[
        min: BigNumberish,
        max: BigNumberish,
        price: BigNumberish,
        index: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "updateRewards"): TypedContractMethod<[
        _rewards1: BigNumberish,
        _rewards2: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "upgradeToAndCall"): TypedContractMethod<[
        newImplementation: AddressLike,
        data: BytesLike
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "users"): TypedContractMethod<[user: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "vesting"): TypedContractMethod<[
        user: AddressLike
    ], [
        [
            bigint,
            bigint,
            bigint
        ] & {
            start: bigint;
            locked: bigint;
            claimed: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "vestingStart"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "withdrawCash"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "withdrawToken"): TypedContractMethod<[], [void], "nonpayable">;
    getEvent(key: "CashWithdrawn"): TypedContractEvent<CashWithdrawnEvent.InputTuple, CashWithdrawnEvent.OutputTuple, CashWithdrawnEvent.OutputObject>;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "Paused"): TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
    getEvent(key: "ReferenceCreated"): TypedContractEvent<ReferenceCreatedEvent.InputTuple, ReferenceCreatedEvent.OutputTuple, ReferenceCreatedEvent.OutputObject>;
    getEvent(key: "RoleAdminChanged"): TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
    getEvent(key: "RoleGranted"): TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
    getEvent(key: "RoleRevoked"): TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
    getEvent(key: "RoleUdated"): TypedContractEvent<RoleUdatedEvent.InputTuple, RoleUdatedEvent.OutputTuple, RoleUdatedEvent.OutputObject>;
    getEvent(key: "TokensClaimed"): TypedContractEvent<TokensClaimedEvent.InputTuple, TokensClaimedEvent.OutputTuple, TokensClaimedEvent.OutputObject>;
    getEvent(key: "TokensPurchased"): TypedContractEvent<TokensPurchasedEvent.InputTuple, TokensPurchasedEvent.OutputTuple, TokensPurchasedEvent.OutputObject>;
    getEvent(key: "TokensWithdrawn"): TypedContractEvent<TokensWithdrawnEvent.InputTuple, TokensWithdrawnEvent.OutputTuple, TokensWithdrawnEvent.OutputObject>;
    getEvent(key: "Unpaused"): TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
    getEvent(key: "Upgraded"): TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
    getEvent(key: "Withdraw"): TypedContractEvent<WithdrawEvent.InputTuple, WithdrawEvent.OutputTuple, WithdrawEvent.OutputObject>;
    filters: {
        "CashWithdrawn(uint256)": TypedContractEvent<CashWithdrawnEvent.InputTuple, CashWithdrawnEvent.OutputTuple, CashWithdrawnEvent.OutputObject>;
        CashWithdrawn: TypedContractEvent<CashWithdrawnEvent.InputTuple, CashWithdrawnEvent.OutputTuple, CashWithdrawnEvent.OutputObject>;
        "Initialized(uint64)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "Paused(address)": TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        Paused: TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        "ReferenceCreated(address,string)": TypedContractEvent<ReferenceCreatedEvent.InputTuple, ReferenceCreatedEvent.OutputTuple, ReferenceCreatedEvent.OutputObject>;
        ReferenceCreated: TypedContractEvent<ReferenceCreatedEvent.InputTuple, ReferenceCreatedEvent.OutputTuple, ReferenceCreatedEvent.OutputObject>;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        RoleAdminChanged: TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        "RoleGranted(bytes32,address,address)": TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        RoleGranted: TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        "RoleRevoked(bytes32,address,address)": TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        RoleRevoked: TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        "RoleUdated(address,address,string)": TypedContractEvent<RoleUdatedEvent.InputTuple, RoleUdatedEvent.OutputTuple, RoleUdatedEvent.OutputObject>;
        RoleUdated: TypedContractEvent<RoleUdatedEvent.InputTuple, RoleUdatedEvent.OutputTuple, RoleUdatedEvent.OutputObject>;
        "TokensClaimed(address,uint256)": TypedContractEvent<TokensClaimedEvent.InputTuple, TokensClaimedEvent.OutputTuple, TokensClaimedEvent.OutputObject>;
        TokensClaimed: TypedContractEvent<TokensClaimedEvent.InputTuple, TokensClaimedEvent.OutputTuple, TokensClaimedEvent.OutputObject>;
        "TokensPurchased(address,uint256,uint256)": TypedContractEvent<TokensPurchasedEvent.InputTuple, TokensPurchasedEvent.OutputTuple, TokensPurchasedEvent.OutputObject>;
        TokensPurchased: TypedContractEvent<TokensPurchasedEvent.InputTuple, TokensPurchasedEvent.OutputTuple, TokensPurchasedEvent.OutputObject>;
        "TokensWithdrawn(uint256)": TypedContractEvent<TokensWithdrawnEvent.InputTuple, TokensWithdrawnEvent.OutputTuple, TokensWithdrawnEvent.OutputObject>;
        TokensWithdrawn: TypedContractEvent<TokensWithdrawnEvent.InputTuple, TokensWithdrawnEvent.OutputTuple, TokensWithdrawnEvent.OutputObject>;
        "Unpaused(address)": TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
        Unpaused: TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
        "Upgraded(address)": TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
        Upgraded: TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
        "Withdraw(string,address)": TypedContractEvent<WithdrawEvent.InputTuple, WithdrawEvent.OutputTuple, WithdrawEvent.OutputObject>;
        Withdraw: TypedContractEvent<WithdrawEvent.InputTuple, WithdrawEvent.OutputTuple, WithdrawEvent.OutputObject>;
    };
}
//# sourceMappingURL=Tokensale.d.ts.map