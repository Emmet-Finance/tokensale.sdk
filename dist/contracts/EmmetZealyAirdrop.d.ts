import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "./common";
export declare namespace EmmetZealyAirdrop {
    type PositionStruct = {
        locked: BigNumberish;
        unlocked: BigNumberish;
    };
    type PositionStructOutput = [locked: bigint, unlocked: bigint] & {
        locked: bigint;
        unlocked: bigint;
    };
}
export interface EmmetZealyAirdropInterface extends Interface {
    getFunction(nameOrSignature: "addPosition" | "addPositions" | "admin" | "claim" | "claimable" | "emmet" | "lock" | "locked" | "positions" | "unlock" | "updateAdmin" | "withdrawUnclaimed"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AdminUpdated" | "Claimed" | "Locked" | "UnclaimedWithdrawn" | "Unlocked"): EventFragment;
    encodeFunctionData(functionFragment: "addPosition", values: [AddressLike, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "addPositions", values: [AddressLike[], EmmetZealyAirdrop.PositionStruct[]]): string;
    encodeFunctionData(functionFragment: "admin", values?: undefined): string;
    encodeFunctionData(functionFragment: "claim", values?: undefined): string;
    encodeFunctionData(functionFragment: "claimable", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "emmet", values?: undefined): string;
    encodeFunctionData(functionFragment: "lock", values?: undefined): string;
    encodeFunctionData(functionFragment: "locked", values?: undefined): string;
    encodeFunctionData(functionFragment: "positions", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "unlock", values?: undefined): string;
    encodeFunctionData(functionFragment: "updateAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "withdrawUnclaimed", values?: undefined): string;
    decodeFunctionResult(functionFragment: "addPosition", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addPositions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimable", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "emmet", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lock", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "locked", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "positions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unlock", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawUnclaimed", data: BytesLike): Result;
}
export declare namespace AdminUpdatedEvent {
    type InputTuple = [oldAdmin: AddressLike, newadmin: AddressLike];
    type OutputTuple = [oldAdmin: string, newadmin: string];
    interface OutputObject {
        oldAdmin: string;
        newadmin: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ClaimedEvent {
    type InputTuple = [user: AddressLike, amount: BigNumberish];
    type OutputTuple = [user: string, amount: bigint];
    interface OutputObject {
        user: string;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace LockedEvent {
    type InputTuple = [block: BigNumberish, timestamp: BigNumberish];
    type OutputTuple = [block: bigint, timestamp: bigint];
    interface OutputObject {
        block: bigint;
        timestamp: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace UnclaimedWithdrawnEvent {
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
export declare namespace UnlockedEvent {
    type InputTuple = [block: BigNumberish, timestamp: BigNumberish];
    type OutputTuple = [block: bigint, timestamp: bigint];
    interface OutputObject {
        block: bigint;
        timestamp: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface EmmetZealyAirdrop extends BaseContract {
    connect(runner?: ContractRunner | null): EmmetZealyAirdrop;
    waitForDeployment(): Promise<this>;
    interface: EmmetZealyAirdropInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    addPosition: TypedContractMethod<[
        user: AddressLike,
        locked_: BigNumberish,
        unlocked_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    addPositions: TypedContractMethod<[
        users: AddressLike[],
        positions_: EmmetZealyAirdrop.PositionStruct[]
    ], [
        void
    ], "nonpayable">;
    admin: TypedContractMethod<[], [string], "view">;
    claim: TypedContractMethod<[], [void], "nonpayable">;
    claimable: TypedContractMethod<[user: AddressLike], [bigint], "view">;
    emmet: TypedContractMethod<[], [string], "view">;
    lock: TypedContractMethod<[], [void], "nonpayable">;
    locked: TypedContractMethod<[], [boolean], "view">;
    positions: TypedContractMethod<[
        arg0: AddressLike
    ], [
        [bigint, bigint] & {
            locked: bigint;
            unlocked: bigint;
        }
    ], "view">;
    unlock: TypedContractMethod<[], [void], "nonpayable">;
    updateAdmin: TypedContractMethod<[admin_: AddressLike], [void], "nonpayable">;
    withdrawUnclaimed: TypedContractMethod<[], [void], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addPosition"): TypedContractMethod<[
        user: AddressLike,
        locked_: BigNumberish,
        unlocked_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "addPositions"): TypedContractMethod<[
        users: AddressLike[],
        positions_: EmmetZealyAirdrop.PositionStruct[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "admin"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "claim"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "claimable"): TypedContractMethod<[user: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "emmet"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "lock"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "locked"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "positions"): TypedContractMethod<[
        arg0: AddressLike
    ], [
        [bigint, bigint] & {
            locked: bigint;
            unlocked: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "unlock"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "updateAdmin"): TypedContractMethod<[admin_: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "withdrawUnclaimed"): TypedContractMethod<[], [void], "nonpayable">;
    getEvent(key: "AdminUpdated"): TypedContractEvent<AdminUpdatedEvent.InputTuple, AdminUpdatedEvent.OutputTuple, AdminUpdatedEvent.OutputObject>;
    getEvent(key: "Claimed"): TypedContractEvent<ClaimedEvent.InputTuple, ClaimedEvent.OutputTuple, ClaimedEvent.OutputObject>;
    getEvent(key: "Locked"): TypedContractEvent<LockedEvent.InputTuple, LockedEvent.OutputTuple, LockedEvent.OutputObject>;
    getEvent(key: "UnclaimedWithdrawn"): TypedContractEvent<UnclaimedWithdrawnEvent.InputTuple, UnclaimedWithdrawnEvent.OutputTuple, UnclaimedWithdrawnEvent.OutputObject>;
    getEvent(key: "Unlocked"): TypedContractEvent<UnlockedEvent.InputTuple, UnlockedEvent.OutputTuple, UnlockedEvent.OutputObject>;
    filters: {
        "AdminUpdated(address,address)": TypedContractEvent<AdminUpdatedEvent.InputTuple, AdminUpdatedEvent.OutputTuple, AdminUpdatedEvent.OutputObject>;
        AdminUpdated: TypedContractEvent<AdminUpdatedEvent.InputTuple, AdminUpdatedEvent.OutputTuple, AdminUpdatedEvent.OutputObject>;
        "Claimed(address,uint256)": TypedContractEvent<ClaimedEvent.InputTuple, ClaimedEvent.OutputTuple, ClaimedEvent.OutputObject>;
        Claimed: TypedContractEvent<ClaimedEvent.InputTuple, ClaimedEvent.OutputTuple, ClaimedEvent.OutputObject>;
        "Locked(uint256,uint256)": TypedContractEvent<LockedEvent.InputTuple, LockedEvent.OutputTuple, LockedEvent.OutputObject>;
        Locked: TypedContractEvent<LockedEvent.InputTuple, LockedEvent.OutputTuple, LockedEvent.OutputObject>;
        "UnclaimedWithdrawn(uint256)": TypedContractEvent<UnclaimedWithdrawnEvent.InputTuple, UnclaimedWithdrawnEvent.OutputTuple, UnclaimedWithdrawnEvent.OutputObject>;
        UnclaimedWithdrawn: TypedContractEvent<UnclaimedWithdrawnEvent.InputTuple, UnclaimedWithdrawnEvent.OutputTuple, UnclaimedWithdrawnEvent.OutputObject>;
        "Unlocked(uint256,uint256)": TypedContractEvent<UnlockedEvent.InputTuple, UnlockedEvent.OutputTuple, UnlockedEvent.OutputObject>;
        Unlocked: TypedContractEvent<UnlockedEvent.InputTuple, UnlockedEvent.OutputTuple, UnlockedEvent.OutputObject>;
    };
}
//# sourceMappingURL=EmmetZealyAirdrop.d.ts.map