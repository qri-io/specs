---
title: Collaboration
description: How users collaborate on Qri
---

1. Anyone can create a key whenever they like
2. Anyone can create a log whenever they want
3. Oplogs are signed by the _last author in the history_.
4. Inclusion in a dataset history requires an _access token_, proving the keypair is a collaborator.
5. Log histories form a CRDT based on semantices defined by _automerge_. Histories are merged in a last-writer-wins merge strategy.

### Collaboration Example

Creat / Push / Pull Overview:

| # | User/Action                        | Data Structures Created | Data Structures Modified | Data Structures Moved |
|---| ---------------------------------- | ----------------------- | ------------------------ | --------------------- |
| 1 | A `qri setup`                      | `PrivKeyA`, `PubKeyA`, `ProfileA`, `ProfileLogA` | | |
| 2 | A `qri save a/ds1`                 | `/ipfs/Hash1`, `DatasetLogA`, `BranchLogA` | | |
| 3 | A `qri connect`                    | | | `PubKeyB` |
| 4 | A `qri access allow write B a/ds1` | `AccessTokenAtoB` | | |
| 5 | A `qri push --remote=B`            | | `BranchLogA` | `/ipfs/Hash1`, `DatasetLogA`, `BranchLogA`, `AccessTokenAtoB` |
| 6 | B `qri save a/ds1`                 | `/ipfs/Hash2`, `BranchLogB` | |
| 7 | A `qri pull -remote=B a/ds1`       | | | `/ipfs/Hash2`, `BranchLogB` |
| 8 | C `qri pull -remote=B a/ds1`       | | | `/ipfs/Hash2`, `AccessTokenAtoB`, `DatasetLogA`, `BranchLogA`, `BranchLogB`|

Yeah, so just talking to this introduce data structures, I run setup that makes some stuff. And I run save, which does this and this is all exists right now we as soon as I run save the first time, I created dataset log, which contains the name of the data set, and who made it. And then inside of that is actually a branch log, which is where the commit itself lives. So the branch log is the description of Hey, this is how this, this is where hash one was created. And then when I typed query log, what I'm really looking at is the branch log, as it is right now, that's going to get more complicated in a second.

In this quick connect step, this needs to be part of this conversation, but it's actually quite fluid. In practice, what needs to happen is query node A needs to acquire knowledge of these public keys somehow. But in this example, I'm just saying I'm gonna run Quick Connect. And it's so happens that those two nodes are online. And I acquire knowledge of keys public key B.

> There is a high degree of overlap with the current definition of peers of the peers subsystem. And this new identity management subsystem. Right now we have a thing inside of query that when you come into contact with other gray peers, we write down a join of your profile information and your public key that is associated with that. That's a some actually, I think, is the best current foundation for a lot of this work. We have a new peer to peer based profile exchange service, which could be a really great which plugs directly into all of this and is already populating and hydrating that system.

I'm going to use this key, and I'm going to write is the thing that I'm delegating. So I'm saying, Hey, I'm going to give right access to this thing to this user. And that will generate this token, which embeds both their public key and my public key and creates this new thing.

So we have to coordinate tzose those somehow. Which is why in Step five, the biggest change from now, the way query works right now. So the way query will need to work to make this properly function is what I typed, when I do a push, I now need to piggyback out problem, we probably want to piggyback on top of that, the transmission of relevant access tokens, right. So hey, I'm gonna push datasets to query in this in this example, PRP is set up as a remote, so I can push them, I'm going to actually modify branch a in this before I even send branch a to include the nut the information that I've pushed, this is the way the query currently works. Basically, every time we push, we say, Hey, I pushed it here, I pushed it there

> There is maybe semantics about what tokens are accepted in stores. And we need to be careful about that. Because if we just say any user will accept any access token that becomes a security from where I could fill up your hard drive by sending you thousands 1000 facts.

-- --

But to go through the list, we have keys, we have profiles, we have three flavors of logs, which we'll talk about, because that may not necessarily need to exist, and we have access tokens. They're generally five distinct things. Profiles are _not_ part of the collaboration process, which is built solely on public keys.

But it should know that basically, in step one, when I run create setup, I get a lot of things right at the gates, I get the both a key pair, and a definition of a profile, which gives me a username that I can share with other people. And I get this profile log, which is a description of changes to my log of my profile over time, and will be a place where I will eventually do stuff like key rotation. Again, we're not I don't think we're going to get wildly into it today, just a profile log is going to be an append only log. And so each of these things, the three flavors of logs that we're talking about profile, branch and data set, sorry, in in the proper order, the profile, data set, and branch are all append only logs that have a single author,

#### Capability Tokens

The last new thing is this notion of a _capability token_. For our purposes, we are heavily considering this to be something called a UCAN, which is a thing that an access. So you can for us is or an access token is going to be a data structure that is signed with your with the private key of the person issuing. But it is going to be always targeted at a person. So that's why I've named this access token A to B. And so it is an explicit thing. And I know a verifiable data structure that delegates some capability described inside of the destructor itself, from user a to user B. And it to be even more specific from key pair a to key pair B. So access token A to B takes the public key of B and uses that as the basis for creating the token.

Collaborator tokens must be issued by the dataset owner or a key delegated by the dataset owner. Tokens are external to oplog data structures.

And so that's, that's been one of the newest things that we have, and is going to be the sort of biggest lifting load that the identity system and delegations, collaboration subsystem that we're going to have to design will have to hang on to.

#### Merging Histories

The decision of which branches to use should be the authentication subsystems job. And it should basically say, Hey, I would like a user is now asking me for the definitive history of data set a slash GS one. And I currently don't have it in a cache. So I have to go calculate it from all of the login data that I have presently. And so I'm first going to go ask the identity subs or the authentication subsystem say, hey, which users which public keys are collaborating in this data set. And then I'm going to go, I need some mechanism to extract from logbook all of the branches that are authored by those keys, and then run all of those through the magical merge machine and come up with a canonical history. 

#### Revoking Access

how do I eject somebody from that history? Basically, I gave me permission to do stuff and I no longer want to get permission to be to do stuff. And this is where I would write into either the dataset log or the users the owner of the does, that's branch log, that a something called a tombstone, which says, I am nullifying accident there, I'm revoking the rights of access token A to B. And so when that operation syncs with other people, and that subsystem then says, Hey, I want to know which branches I can use, we need to basically know that we should delete access token A to B or not use access token A to B, because logbook contains information that says, hey, I need to reject this. That part, the recording of Tomb stoning of keys inside of logbook is admittedly kind of gross. But there are no there is no existing, decent, reliable research or writing in academia that I'm able to find that has a better answer for the key revocation problem, other than to use some common, commonly understood source of state for tracking where we should get rid of stuff. That's a big open question for the discussion because it creates a really tight coupling between the logbook information and identity information. For me, I personally hate it. But it's probably just got to be the case. And I think it really speaks to some of the stuff that Dustin has been saying where logbooks should really contain should be a little bit stupid about the information, it's it's recording shouldn't actually know shouldn't be doing a ton of stuff. It should basically just record the offers and stay transformed. 

#### Determining Collaborators & Capabilities

The collaborator membership function needs to wrap a store of some kind, and say, for this given thing, please produce for me this the set of public keys that are members that are collaborators on this data, or this subject, right? That's, that's the the responsibility that that new system really needs to have, if that makes sense. And so we can ask more nuanced questions like, you know, please proves for me the set of collaborators with right access, please produce, for me the set of operators with whatever. And that's the sort of the other side of object capability definition where this this right, access allow, right, is doing a lot of lifting in this conversation where we really need to define the different permission semantics and what can and cannot be allowed.

we should define the authentication spec such that it the collaborate, I should say, the collaborator, membership spec, such that you just need, you basically need proof. And, and we and the proof could come from many places, and yeah, that's a really good


#### Roles

It ideally it maps under roles. Yeah. And that's it. So from the perspective of this discussion, what we really need to make sure we do is we make that system of capability definition and capability and granting definition, something that can evolve over time. So we can start really small and say, there's people with the right access, and there's people, and everybody who has the data has read access.


#### Encrypted Datasets

What we haven't touched on at all here is encryption, and the idea of like, encrypting data sets at rest, and how that will play against this system.

To touch on that very briefly, I genuinely think it's another separate subsystem serves as the coordination of encryption keys, they may be backed by the same store under the hood. But what I think we should have is that access token should delegate and the existence of an access token should delegate whether or not I am, I should transmit the shared secret for this encrypted data set to somebody else. And that's how I think it should be modeled as we move forward. But I will readily admit that that is not a finished thought.

#### Eventual Consistency

using our current definition of only pull latest version, when c guys does query pull from remote B, remote B actually has to calculate the merged history of what it knows to produce the result of what is the latest version that you're going to send, are going to give to actually know that calculation happens on C. So when Cory poll happens, it's a two step process. The first one is a log sync. It's sounds like it's going to become a three step process where it's a log sync, a token sync, and a login again, in any number of necessary tokens. And then finally, a, a, node C will decide what versions is one of polls, by default, everybody only pulls the latest version. And so it will run the calculation locally of the merge calculation locally, using the information that was just literally delivered from AMD. And find out that, hey, hash two is the latest version. And it only gets hash two. And I think that's what what's worth pointing out here is this setup robustly handles the problem of D synchronization as it as it kind of sounds between different peers, right. And so the upside of using our append only log merge strategy stuff is this, this set of steps is consistent with the axiom that so long as everybody has seen the same messages, they get the same result. So if C, were to try and pull from a before a had pulled, had done Step seven, or they pull it from B, they would actually get ipfs hash one branch log a and access token and they wouldn't maybe get access token B that would be a spec of limitation question. Probably they probably should. And if by some other external mechanism, node c ended up with node B's branch log, and the access token, all of that is commutes properly. And so basically, you can acquire this information from disparate sources and in disparate ways, and you will end up as long as you get the same messages, you get the same results. Which is another way of saying eventually, consistency. We are not in in the step between six and seven nodes B and A are in disparate states, where B actually has knowledge of a commit that a does not have knowledge of which is a way to get works right now, this is why we have to type query or get pull to get the latest. And that's fine. The system is totally cool with that. And it doesn't hurt anything. It's not it's not a bad or erroneous state. It's simply the case that you haven't been on the network recently. 


#### Space Consumption calculations



## Future Research

* Logbook Tail Compaction

-- --

Things an Identity subsystem needs to do:
* Store Tokens
* And in Step six, I do I create a, I run query save and this time I make the target of that to be GS one, under the hood query is going to use validation logic to say, hey, you're trying to say from A to B, so we better have some token present. To allow that to happen. From a, that's a purely a user interface perspective, basically, that's not the actual security guarantee of all of this, which we'll get into in a second. But we can't we do have all the ingredients we need, at this step to say, Hey, does B have the right to save to dead set a slash DS one. When they do save, I'm going to create two new things, I'm going to create hash two, which will be the actual data representing the new version of the data set. And I'm going to create a new branch log. And branch log B will be a new append only log that contains my information about my contributions to data set a slash DS one, by my in this case, I've just become the over overnight CPUs. And I just think of myself, I wonder why.
* The decision on what to include in the list to merge has to be dictated by this external system, this external system that carries access tokens.

Things the Identity system doesn't need to do:
* Store Encryption keys

Things Logbook Needs to Do:
*  so there will be some mechanism for combining any number of collaborators and branches into a single branch. And there also needs to be a new mechanism for caching the results of that, because it'll probably be relatively expensive to calculate. Or at least it would be much snappier if we just calculated histories one time and cache them, and knew how to invalidate them when we got new information.

Registry as a source of delegation

### 