---
title: Dataset
description: A structured data document made of components
---

A Dataset is a document for describing & storing structured data. Dataset documents are designed to satisfy the **FAIR** principle of being
_Findable, Accessible, Interoperable, and Reusable_, in relation to other dataset documents, and related-but-separate technologies such as data catalogs, HTTP API's, and data package formats Datasets are designed to be stored and distributed on content-addressed
(identify-by-hash) systems The dataset document definition is built from a research-first principle, valuing direct interoperability with existing standards over novel definitions or specifications.

_The main implementation of dataset is available at https://github.com/qri-io/dataset. If you have any concerns or questions, We'd be delighted if you filed an [issue](https://github.com/qri-io/dataset/issues)._

### Components

Datasets take inspiration from HTML documents, deliniating semantic purpose to predefined tags of the document, but instead of orienting around presentational markup, dataset documents emphasize interoperability and composition. The principle serialization format for a dataset document is JSON.

### Alpha-Keys
Dataset documents are designed to produce consistent checksums when encoded for storage & transmission. To keep hashing consistent map keys are sorted lexographically for encoding. This applies to all fields of a dataset document except the body of a dataset, where users may need to dictate the ordering of map keys.