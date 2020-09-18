---
title: list
description: listing local datasets
---


### Person

```protobuf:title=.env
// env
message ListRequest {
  required string name = 1;
  required int32 id = 2;
  optional string email = 3;
}
```

```go
type PageParams struct {
  	ProfileID profile.ID
  	Term      string
  	Peername  string
  	OrderBy   string
  	Limit     int
  	Offset    int
  	// RPC is a horrible hack while we work to replace the net/rpc package
  	// TODO - remove this
  	RPC bool
  	// Public only applies to listing datasets, shows only datasets that are
  	// set to visible
  	Public bool
  	// ShowNumVersions only applies to listing datasets
  	ShowNumVersions bool
  	// EnsureFSIExists controls whether to ensure references in the repo have correct FSIPaths
  	EnsureFSIExists bool
  	// UseDscache controls whether to build a dscache to use to list the references
  	UseDscache bool
}
```