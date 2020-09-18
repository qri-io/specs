---
title: dsync
description: point-to-point merkledag synchronization
---

Package dsync implements point-to-point merkle-DAG-syncing between a local instance and remote source. It's like rsync, but specific to merkle-DAGs. dsync operates over HTTP and libp2p connections.

dsync by default can push & fetch DAGs to another dsync instance, called the "remote". Dsync instances that want to accept merkle-DAGs must opt into operating as a remote by configuring a dsync.Dsync instance to do so

Dsync is structured as bring-your-own DAG vetting. All push requests are run through two "check" functions called at the beginning and and of the push process. Each check function supplies details about the push being requested or completed