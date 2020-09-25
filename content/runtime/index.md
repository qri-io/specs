---
title: Qri Runtime
description: Definition of an executing qri program
---

The qri runtime is a

## Instances
The core of a runnign qri program is an _instance_. A an instance is a composition of [_subsystems_](../subsystems) that make up core business logic of Qri in a running program. Instances are singletons, with only one running at a time in a given process, making them the ultimate lock on contested resources.

Instances manage configuration

Creating an instance requires a valid qri configuration, which includes

## Instance Methods

An _instance method_ (or just "method" for short) is a function defined on an instance. Methods are user-facing abstractions of business logic like `Save` or `Remove`.


## Methods
Qri _methods_ are a logical grouping of functions that relate to one another. Long-running qri processes can make methods available as Remote Procedure Calls (RPC) over a network socket. In this document we define methods as a gRPC service. For example:

```protobuf:title=Dataset Service
service DatasetWrite {
  rpc Save (SaveRequest) returns (SaveResponse) {}
  rpc Remove (RemoveRequest) returns (RemoveResponse) {}
  rpc Rename (RenameRequest) returns (RenameResponse) {}
}
```

## Protcol Buffers
This document expresses services & data structures as [protocol buffers](https://developers.google.com/protocol-buffers) to keep definitions language agnostic, but these are currently for presentational purposes only. The qri spec doesn't state that implementations use protocol buffers.