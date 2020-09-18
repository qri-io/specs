---
title: Glossary
description: terms used & description links
---


| term | description |
| ---- | ----------- |
| [cid](https://github.com/multiformats/cid) | "Content IDentifiers" is a hashing technique that embeds additional info about the hash in question |
| dscache | DataSet Cache - a replacement for refstore, based upon logbook and initids. Will store all the info that a dataset needs to be listed, and all the information to look it up, such as fsi path. In theory, should be able to be regenerated if deleted, by re-traversing logbook, and scanning the entire filesystem. In actually, there’s some additional state in there that we don’t really store anywhere else (like currIndex) that we will probably keep there until we figure out how Collections work |
| [dsref](./concepts/references) | a dataset reference - a string like “dustmop/info_about_cats” that references a dataset in my (or someone else’s) collection, and also a structured representation of that string after it is parsed |
| fsi | FileSystem Integration - a mode of using qri wherein a user has a “working directory” that reflects the editable contents of a dataset. Created using “init” (to make a new dataset) or “checkout” (for an existing dataset). For command-line, commands can be used without explicitly providing a reference to a dataset, as long as the user is in the working directory. Implemented using a hidden “.qri-ref” file in that directory. |
| initid | Initialization Identifier - the new way that we want to refer to datasets. Derived from logbook activity, basically a hash of the first entry in a logbook created when a dataset gets a name first reserved for it. Is stable, will never change if a dataset gets renamed, or if a user rotates their private key, etc. |
| [IPFS](https://ipfs.io) | an external dependency that we use as our data storage layer. Immutable, content-addressable, p2p system built-in |
| [libp2p](https://libp2p.io) | the peer-2-peer networking stack qri is built atop. Libp2p was initially factored out of the IPFS networking stack. |
| [logbook](./subsystems/logbook) |  our basis for coordination and collaboration. Tracks the changes that a user makes to their collection of datasets, recording only the minimum amount of information. A linear / append-only record of history. Should be cheap to write and trade, safe to push and pull as often as possible |
| [qfs](./subsystems/qfs) | Qri’s FileSystem - another abstraction that wraps filesystems in general. Used to coordinate between your normal, local filesystem, a cafs-style filesystem (including IPFS), and a cloud based filesystem (over http or other protocol) |
