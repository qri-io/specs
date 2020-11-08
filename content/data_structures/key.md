---
title: Keys
description: qri's Public Key Infrastructure (PKI) scheme
---

Cryptographic Keys form the foundation for verifiable claims within Qri. Qri supports multiple key types, and defines a _key_ data structure that encapsulates key data and key type identifiers.

Keys follow the definition of an asymetric keypair from [libp2p](https://github.com/libp2p/go-libp2p-core/blob/master/crypto/pb/crypto.proto).

```protobuf:title=Key
syntax = "proto2";

package crypto.pb;

// KeyType enumeration order is defined by libp2p
// expression as strings is 
enum KeyType {
	RSA       = 0; // as a string: ”RS256”
	Ed25519   = 1; // as a string: ""
	Secp256k1 = 2; // as a string: ""
	ECDSA     = 3; // as a string: ”EdDSA”
}

message PublicKey {
	required KeyType Type = 1;
	required bytes   Data = 2;
}

message PrivateKey {
	required KeyType Type = 1;
	required bytes   Data = 2;
}
```

### Key Types

Key Types within Qri seek a "spec union" between `libp2p`, `multicodec prefixes`, `W3C decentralized Identifiers`, and fission `UCAN` tokens.

| Enum | Name      | String      | Multicodec Prefix | 
| ---- | --------- | ----------- | -------------------- |
|  0   | [RSA](https://simple.wikipedia.org/wiki/RSA_algorithm) | `"RS256"` | [`0x1200`](https://github.com/multiformats/multicodec/pull/195#issuecomment-691422576) _- not finalized_|
|  1   | **[Ed25519](https://en.wikipedia.org/wiki/EdDSA#Ed25519)**   | `"Ed25519"` | [`0xED`](https://github.com/multiformats/multicodec/blob/master/table.csv#L85) |
|  2   | Secp256k1 | ?           | [`0xe7`](https://github.com/multiformats/multicodec/blob/master/table.csv#L81) |
|  3   | [ECDSA](https://en.wikipedia.org/wiki/EdDSA)     | `EdDSA`     | ? |

While all of these key types SHOULD be supported, **Ed25519 Keys MUST be supported**, and are the preferred key type. RSA keys are considered a legacy format. Implementations should NOT create new keys with the RSA where possible.
