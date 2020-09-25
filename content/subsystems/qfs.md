---
title: QFS
description: qri file system abstraction
---

QFS is a _file system abstraction_ providing common interface to different stores capable of persisting _files_. The general design of QFS is a loose intepretation of the Unix Filesystem with additional design goals:

* **content addressing** - content added to a QFS filesytem can refer-by-hash
* **multiplexing** - differnt storage types can be composed
* **linked data** - files can contain _linked data_ in addition to byte streams
* **encryption** - files stored in QFS may be encrypted at rest

## Files

Because QFS is an abstraction over different filesystems, the definion of a file is an _interface_, and not a data structure. Filesystem types are free to arrange 

```go
type File interface {
  // inherited from the golang "fs" proposal:
  Stat() (os.FileInfo, error)
  Read([]byte) (int, error)
  Close() error

  IsLinkedData() bool
  LinkedData() (interface{}, error)
}

// A FileInfo describes a file and is returned by Stat and Lstat.
type FileInfo interface {
  Name() string       // base name of the file
  Size() int64        // length in bytes for regular files; system-dependent for others
  Mode() FileMode     // file mode bits
  ModTime() time.Time // modification time
  IsDir() bool        // abbreviation for Mode().IsDir()
  Sys() interface{}   // underlying data source (can return nil)
}
```

### Filesystem  Interface

```protobuf
service Filesystem {
  request Type() returns (string);                         // storage format prefix accessor
  request Has(string) returns (bool);                      // check for the existence of a path
  request OpenFile(string) returns (File);                 // get a file handle
  request OpenEncryptedFile (Key, string) returns (File);  // get a file handle that decrypts with Key
  request WriteFile(string) returns (File);                // put a file
  request WriteEncryptedFile (Key, string) returns (File); // put a file, & encrypt with key
  request Delete(string) returns (bool);                   // remove a file from
}
```

## Directories

There is no such thing as a directory in QFS. The role of a directory is replaced by a linked data file containing zero or more links.


## Paths

QFS paths are string references to files on a filesystem. Paths always use forward slashes `/` as a path separator (regardless of operating system). QFS paths do not support relative pathing, as such a path MUST begin with a forward slash `/`. All QFS paths must begin with a _prefix_ indicating the storage type.

```abnf:title=QFS_Path
qfs-path        = qfs-prefix qfs-path
qfs-prefix      = "/" 1*5ALPHA                ; unique, 1-5 char prefix
qfs-path        = (local-path / cid-path)     ; paths are either local or content-addressed
local-path      = 1*path-part                 ; at least 1 path
path-part       = "/" 1*VCHAR                 ; eg: "/apple", "/b"

cid-path        = "/" (cid1 / cidv0) [path-part] 
cidv1           = mb-prefix mc-cidv1 mc-content-type mh-content-addr
cidv0           = mh-content-addr

mb-prefix       = 1ALPHA
mc-cidv1        = 0x01
mc-content-type = 1*VARINT                             ; unsigned varint
mh-content-addr = hash-fn-code digest-size hash-output
hash-fn-code    = 2VARINT
digest-size     = 1*VARINT
hash-output     = *VARINT
```

### Location-addressed Paths 

### CID paths

All elements in a `cid-path` are a direct implementaion of the [multiformats Content IDentifier (CID)](https://github.com/multiformats/cid) spec. Hashes are represented in QFS with CIDS. The canonical source of 

| spec | key benefit |
| ---- | ----------- |
| [CID](https://github.com/multiformats/cid) | identify content-addressed content
| [Multibase](https://github.com/multiformats/multibase) | support different binary-to-ASCII encodings |
| [Multicodec](https://github.com/multiformats/multicodec) | support different content types |
| [Multihash](https://github.com/multiformats/multihash) | support different hashing algorithms |
| [Varint](https://github.com/multiformats/unsigned-varint) | define variadic integer byte representation |


## Content Addressing


when writing a file to a qfs, 
```go
interface Filesystem{
  func Put(file qfs.File) (Path, error)
}
```


## Storage Types

A Storage _type_ is a an abstraction from a format for reading & writing files with the QFS interface. Each storage type is uniquely identified by a string prefix.  QFS storage types must be either entirely content-addressed or not. All paths added to a content-addressed store must follow the `/prefix/CID` convention. Stores that are not content addressed must error when attempting to write a cid-path.

The following table is the canonical set of filesystem type prefixes:

| prefix   | content-addressed? | description        |
| -------- | ------------------ | ------------------ |
| `/mem`   | yes | ephemeral in-memory filesystem |
| `/ipfs`  | yes | files stored on IPFS |
| `/s3`    | yes | s3 and s3-like object stores that implement the S3 API |
| `/local` | no | local filesystem |



## Multiplexing (MuxFS)

A _multiplexed_ filesystem is a composition of zero or more storage types, allowing reading from multiple sources. _de-multiplex_  (demuxing) works by switching on path prefixes for both reading and writing.  

## Encryption

Only _files_ are capable of encryption within QFS, not directory structures. If a linked data file is being used as a directory in the path tree, it _must_ be represented as plaintext