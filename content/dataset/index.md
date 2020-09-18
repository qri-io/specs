---
title: Dataset
description: A structured data document made of components
---

Datasets take inspiration from HTML documents, deliniating semantic purpose to predefined tags of the document, but instead of orienting around presentational markup, dataset documents emphasize interoperability and composition. The principle encoding format for a dataset document is JSON.

### Alpha-Keys
Dataset documents are designed to produce consistent checksums when encoded for storage & transmission. To keep hashing consistent map keys are sorted lexographically for encoding. This applies to all fields of a dataset document except the body of a dataset, where users may need to dictate the ordering of map keys.