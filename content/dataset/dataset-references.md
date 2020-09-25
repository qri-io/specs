---
title: Dataset References
description: dataset addressing system
---

References are user-focused ways of referring to a dataset. 

```protobuf:title=DatasetReference
message DsRef {
  // canonical identifer for a dataset history
  string InitID = 1;
  // Username of dataset owner
  string Username = 2;
  // Unique name reference for this dataset
  string Name = 3;
  // ProfileID of dataset owner
  string ProfileID = 4;
  // Content-addressed path for this dataset
  string Path = 5;
}
```

# Reference Parsing

We refer to a _human reference_ as one with only a username and dataset name, such as `my_user/my_dataset`. A _full reference_ can also contain a "concrete reference", which includes an optional profileID plus a network and a "commit hash".

Expressed in [ABNF](https://en.wikipedia.org/wiki/Augmented_Backus–Naur_form), the grammar is:

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

### Reference Resolution

