---
title: Profiles
description: user information on qri
---


```go:title=profile
// ProfilePod is serializable plain-old-data that configures a qri profile
type ProfilePod struct {
	ID       string `json:"id"`
	PrivKey  string `json:"privkey,omitempty"`
	Peername string `json:"peername"`
	// Created timestamp
	Created time.Time `json:"created"`
	// Updated timestamp
	Updated time.Time `json:"updated"`
	// specifies weather this is a user or an organization
	Type string `json:"type"`
	// user's email address
	Email string `json:"email"`
	// user name field. could be first[space]last, but not strictly enforced
	Name string `json:"name"`
	// user-filled description of self
	Description string `json:"description"`
	// url this user wants the world to click
	HomeURL string `json:"homeurl"`
	// color this user likes to use as their theme color
	Color string `json:"color"`
	// Thumb path for user's thumbnail
	Thumb string `json:"thumb"`
	// Profile photo
	Photo string `json:"photo"`
	// Poster photo for users's profile page
	Poster string `json:"poster"`
	// Twitter is a peer's twitter handle
	Twitter string `json:"twitter"`
	// Online indicates if the user is currently connected to the qri network
	// Should not serialize to config.yaml
	Online bool `json:"online,omitempty"`
	// PeerIDs maps this profile to peer Identifiers in the form /[network]/peerID example:
	// /ipfs/QmSyDX5LYTiwQi861F5NAwdHrrnd1iRGsoEvCyzQMUyZ4W
	// where QmSy... is a peer identifier on the IPFS peer-to-peer network
	// Should not serialize to config.yaml
	PeerIDs []string `json:"peerIDs,omitempty"`
	// NetworkAddrs keeps a list of locations for this profile on the network as multiaddr strings
	// Should not serialize to config.yaml
	NetworkAddrs []string `json:"networkAddrs,omitempty"`
}
```