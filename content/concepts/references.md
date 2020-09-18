---
title: Dataset References
description: dataset addressing system
---

These functions parse a string to create a dsref. We refer to a _human reference_ as one with only a username and dataset name, such as `my_user/my_dataset`. A _full reference_ can also contain a "concrete reference", which includes an optional profileID plus a network and a "commit hash".

The grammar is here:

```
 <dsref> = <humanFriendlyPortion> [ <concreteRef> ] | <concreteRef>
 <humanFriendlyPortion> = <validName> '/' <validName>
 <concretePath> = '@' [ <profileID> ] '/' <network> '/' <commitHash>
```

Some examples of valid references:
```
    me/dataset
    username/dataset
    @/ipfs/QmSome1Commit2Hash3
    @QmProfile4ID5/ipfs/QmSome1Commit2Hash3
    username/dataset@QmProfile4ID5/ipfs/QmSome1Commit2Hash3
```

An invalid reference:

```
    /ipfs/QmSome1Commit2Hash3
```