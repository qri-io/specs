---
title: Data Types
description: Qri data types
---

## Scalar Types 

| name    | description | example |
| ------- | ----------- | ------- |
| null    | The set of values that do not exist | `null` |
| byte    | an unsigned 8 bit integer | `0xF` |
| integer | 64-bit int | `-3000` |
| float   | 64-bit floating point number | `45.5678908765`|
| string  | UTF-8 string | `"apples"` |

## Compound Types

| name    | description | example |
| ------- | ----------- | ------- |
| map     | key-value dictionary of all other types | `{ "foo" : "bar" }` |
| array   | ordered list of heterogenous elements | `[null,5,"hello"]` |
| byte array | 

## Complex Types

Complex types blend data structures with behaviour. 

| name   | description | example |
| ------ | ----------- | ------- |
| link   | string reference to a foreign type | |
| stream | a typed iterator | |

Streams are a runtime-only type that serialize to an array when persisted.