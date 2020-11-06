---
title: Collaboration
description: How users collaborate on Qri
---

1. Anyone can create a key whenever they like
2. Anyone can create a log whenever they want
3. Oplogs are signed by the _last author in the history_.
4. Inclusion in a dataset history requires an _access token_, proving the keypair is a collaborator.
5. Log histories form a CRDT based on semantices defined by _automerge_. Histories are merged in a last-writer-wins merge strategy.

### Collaboration Examples

Creat / Push / Pull Overview:

| # | User/Action                     | Data Structures Created | Data Structures Modified | Data Structures Moved |
|---| ------------------------------ | ----------------------- | ------------------------ | --------------------- |
| 1 | A `qri setup`                | `PrivKeyA`, `PubKeyA`, `ProfileA`, `ProfileLogA` | | |
| 2 | A `qri save a/ds1`           | `/ipfs/Hash1`, `DatasetLogA`, `BranchLogA` | | |
| 3 | A `qri connect`              | | | `PubKeyB` |
| 4 | A `qri access allow write B` | `AccessTokenAtoB` | | |
| 5 | A `qri push --remote=B`      | | `BranchLogA` | `/ipfs/Hash1`, `BranchLogA`, `AccessTokenAtoB` |
| 6 | B `qri save a/ds1`           | `/ipfs/Hash2`, `BranchLogB` | |
| 7 | A `qri pull -remote=B a/ds1` | | | `/ipfs/Hash2`, `BranchLogB` |
| 8 | C `qri pull -remote=B a/ds1` | | | `/ipfs/Hash2`, `AccessTokenAtoB`, `DatasetLogA`, `BranchLogA`, `BranchLogB`|



Collaborator tokens must be issued by the dataset owner or a key delegated by the dataset owner. Tokens are external to oplog data structures.


Things an Identity subsystem needs to do:
* Store Tokens

Things the Identity system doesn't need to do:
* Store Encryption keys

Registry as a source of delegation

### Keys
Keys follow the definition of an asymetric keypair from [libp2p](https://github.com/libp2p/go-libp2p-core/blob/master/crypto/pb/crypto.proto)

```protobuf:title=Key
syntax = "proto2";

package crypto.pb;

enum KeyType {
	RSA = 0;
	Ed25519 = 1;
	Secp256k1 = 2;
	ECDSA = 3;
}

message PublicKey {
	required KeyType Type = 1;
	required bytes Data = 2;
}

message PrivateKey {
	required KeyType Type = 1;
	required bytes Data = 2;
}
```

### 