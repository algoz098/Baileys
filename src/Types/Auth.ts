import type { Contact } from "./Contact"
import type { proto } from "../../WAProto"

export type KeyPair = { public: Uint8Array, private: Uint8Array }
export type SignedKeyPair = { keyPair: KeyPair, signature: Uint8Array, keyId: number }

export type ProtocolAddress = {
	name: string // jid
	deviceId: number
}
export type SignalIdentity = {
	identifier: ProtocolAddress
	identifierKey: Uint8Array
}

export type CollectionType = 'regular_high' | 'regular_low' | 'critical_unblock_low' | 'critical_block'

export type AuthenticationCreds = {
    noiseKey: KeyPair
    signedIdentityKey: KeyPair
    signedPreKey: SignedKeyPair
    registrationId: number
    advSecretKey: string
    me?: Contact
    account?: proto.ADVSignedDeviceIdentity
    signalIdentities?: SignalIdentity[]
    appStateSyncKeys?: proto.IAppStateSyncKey[]
    appStateVersion?: {
        [T in CollectionType]: number
    }

    firstUnuploadedPreKeyId: number
    serverHasPreKeys: boolean
    nextPreKeyId: number
}
type Awaitable<T> = T | Promise<T>
export type SignalKeyStore = {
    getPreKey: (keyId: number) => Awaitable<KeyPair>
    setPreKey: (keyId: number, pair: KeyPair | null) => Awaitable<void>

    getSession: (sessionId: string) => Awaitable<any>
    setSession: (sessionId: string, item: any | null) => Awaitable<void>

    getSenderKey: (id: string) => Awaitable<any>
    setSenderKey: (id: string, item: any | null) => Awaitable<void>
}

export type AuthenticationState = {
    creds: AuthenticationCreds
    keys: SignalKeyStore
}