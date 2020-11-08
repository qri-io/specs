---
title: Oplogs
description: single-key append-only logs
---

```protobuf:title=Oplog
syntax = "proto3";

// OpType enumerates types of operations
enum OpType: byte { Unknown = 0, Init, Amend, Remove }

// flatbuffers in go presently don't support a vector of unions, so we can't
// break operations out into individual structs & union them, which would be
// the smart choice here. To get around this, the fields of operation itself
// are a union of all fields defined by operations. Thankfully there's a fair
// amount of overlap, even more if we abuse field names a bit.
// Not all operations will use all fields.
//
// I've opted to use "Operation" and reserve "Op"
// as a keyword for the day where we can do a vector of a union type
table Operation {
  type:OpType;        // type of operation
  model:uint;         // data model to operate on, designated by 4 bytes
  ref:string;         // identifier of data this operation is documenting
  prev:string;        // previous reference in a causal history
  relations:[string]; // references this operation relates. usage is operation type-dependant

  name:string;        // human-readable name for the reference
  authorID:string;    // identifier for author

  timestamp:long;     // operation timestamp, for annotation purposes only
  size:long;          // size of the referenced value in bytes
  note:string;        // operation annotation for users. eg: commit title
}

// Log is a list of operations
message Log {
  name string;        // human component of a log label, cached from opset
  identifier:string;  // canonical component of a log label, cached from opset
  signature:string;   // cryptographic signature of opset hash
  opset:[Operation];  // append-only list of operations being logged
  logs:[Log];         // logs can be arranged into hierarchies
}

// Book is an author's journal of logs
table Book {
  name:string;        // book author name, not in use at the moment
  identifier:string;  // book author identifier
  logs:[Log];         // collection of logsets in this book
}

root_type Book;
```