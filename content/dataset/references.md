---
title: Components
description: Dataset Elements
---

A Dataset is broken into several _components_. Each component has a different purpose:

| component   | purpose  |
|-------------|----------|
| `body`      | location of dataset data. The _subject_ all other components are about |
| `readme`    | free-form text describing the dataset, supports markdown |
| `commit`    | versioning information for this dataset at a specific point in time |
| `meta`      | descriptive metadata |
| `structure` | machine-oriented metadata for interpreting body |
| `transform` | description of an executed script that resulted in this dataset |

Each component is described in detail below.


## Body
Body is the principle content of a dataset. A dataset body is the subject which all other fields describe and qualify.

Supported Data Formats:

* `csv` - _comma-separated values_
* `json` - _javascript object notation_
* `xlsx` - _microsoft excel open xml spreadsheet_
* `cbor` - _concise binary object representation_

The structure of the data stored is arbitrary, with one important exception: _the top level of body must be either an object or an array_. scalar types like int, bool, float, or strings are not valid types. Keep in mind that it's perfectly valid to wrap a scalar type (for example, a string) in an array to obtain a valid body.

## Commit
Commit encapsulates information about changes to a dataset in relation to other entries in a given history. Commit is directly analogous to the concept of a Commit Message in the git version control system. A full commit defines the administrative metadata of a dataset, answering _"who made this dataset, when, and why"_.

_commit fields:_

| name         | type     | description |
|--------------|----------|-------------|
| `author`     | `User`   | author of this commit |
| `message`    | `string` | an optional message that provides detail about changes made |
| `qri`        | `string` | this commit's qri kind, value should always be `cm:0` |
| `signature`  | `string` | base58-encoded bytes of body checksum |
| `timestamp`  | `string` | time this dataset was created with timezone offset |
| `title`      | `string` | title of the commit. should be a short description of |

_additional data types:_

#### `User`

_example_

<!--
docrun:
  filltype: json
-->
```json
  {
    "id": "user_id_12340584",
    "fullname": "sean carter",
    "email": "hova@jayz.com"
  }
```

## Meta

Meta contains human-readable descriptive metadata that qualifies and distinguishes a dataset.
Well-defined Meta should aid in making datasets Findable by describing a dataset in generalizable taxonomies that can aggregate across other dataset documents. Because dataset documents are intended to interoperate with many other data storage and cataloging systems, meta fields and conventions are derived from existing metadata formats whenever possible.

All of the meta fields below must be well-formed, valid values. However: _The Meta section of a dataset supports arbitrary metadata_. This means you can place additional values not listed here & qri will store them as-is, without any additional validation.

Another important note here: _qri software doesn't leverage things like identifier, downloadPath, homePath, etc._. Qri considers all fields here _descriptive_ metadata, as opposed to _structural_ metadata. In practice this means qri User interfaces may leverage the meta component for the purposes of _correlation_ and _display_. Information stored in the meta section is _not_ intended for use by machines to interpret the dataset. For example, setting the `identifier` is of no significance to qri, it's included here for interoperability with other specifications like [DCAT](https://www.w3.org/TR/vocab-dcat/#Property:dataset_identifier)

_meta fields:_

| name                  | type          | description   |
|-----------------------|---------------|---------------|
| `accessPath`          | `string`      | URL or location to access this dataset.   |
| `accrualPeriodicity`  | `string`      | frequency with which dataset changes. Must be an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Repeating_intervals) repeating duration   |
| `citations`           | `[]Citation`  | array of assets used to build this dataset   |
| `contributors`        | `[]User`      | description   |
| `description`         | `string`      | roughly a paragraph of human-readable text that provides context for the dataset |
| `downloadPath`        | `string`      | URL or other path string to where to download this dataset   |
| `homePath`            | `string`      | URL or other path string to a "landing page" resource that explains the dataset  |
| `identifier`          | `string`      | identifier for the dataset   |
| `keywords`            | `[]string`    | string of "tags" to connect this dataset with other datasets that carry similar keywords   |
| `language`            | `[]string`    | array of languages this dataset is written, in [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format, ordered by most-to-least dominant  |
| `license`             | `License`     | the legal licensing agreement this dataset is released under  |
| `title`               | `string`      | title of the dataset |
| `theme`               | `[]string`      | "categories" this dataset should be filed under. Keywords should draw out specific keywords, theme entires should speak to the broader family of datasets this dataset is part of  |
| `version`             | `string`      | version identifier string   |

_additional data types:_

#### `Citation`

_example:_

<!--
docrun:
  filltype: json
-->
```json
  {
    "name" : "sean carter",
    "url" : "https://jayz.com",
    "email" : "hova@jayz.com"
  }
```

#### `License`

_example:_

<!--
docrun:
  filltype: json
-->
```json
  {
    "type" : "CC-BY-2",
    "url" : "https://creativecommons.org/licenses/by/2.0/"
  }
```


## Structure
Structure defines the characteristics of a dataset document necessary for a machine to interpret the dataset body.
Structure fields are things like the encoding data format (JSON,CSV,etc.), length of the dataset body in bytes, stored in a rigid form intended for machine use. A well defined structure & accompanying software should allow the end user to spend more time focusing on the data itself.

Two dataset documents that both have a defined structure will have some degree of natural interoperability, depending first on the amount of detail provided in a dataset's structure, and then by the natural comparability of the datasets.

_structure fields:_

| name                | type          | description |
|---------------------|---------------|-------------|
| `checksum`          | `string`      | bas58-encoded multihash checksum of the entire data file. this structure points to. This is different from IPFS hashes, which are calculated after breaking the file into blocks |
| `compression`       | `string`      | specifies any compression on the source data, if empty assume no compression. _**warning:** not yet implemented in qri_ |
| `encoding`          | `string`      | specifics character encoding, assumes utf-8 if not specified |
| `errCount`          | `int`         | the number of errors returned by validating data against schema. |
| `entries`           | `int`         | number of top-level entries in the dataset. analogous to the number of rows in a table |
| `format`            | `string`      | specifies the format of the raw data type by file extension. Must be one of: `json` , `csv` , `xlsx`, `cbor` |
| `formatConfig`      | `object`      |  removes as much ambiguity as possible about how to interpret the speficied format. Properties of this object depend on the `format` field |
| `length`            | `int`         | length of the data object in bytes |
| `schema`            | `jsonSchema`  | the schema definition for the dataset body, schemas are defined using the IETF json-schema specification. for more info on json-schema see: https://json-schema.org |

## Transform
Transform is a record of executing a transformation on data. Transforms can theoretically be anything from an SQL query, a jupyter
notebook, the state of an ETL pipeline, etc, so long as the input is zero or more datasets, and the output is a single dataset
Ideally, transforms should contain all the machine-necessary bits to deterministicly execute the algorithm referenced in "ScriptPath".

_transform fields:_

| name                 | type     | description |
|----------------------|----------|-------------|
| `scriptPath`         | `string` | the path to the script that produced this transformation |
| `syntax`             | `string` | language this transform is written in. Only "skylark" is currently supported |
| `syntaxVersion`      | `string` | an identifier for the application and version number that produced the result |
| `config`             | `object` | any configuration that would affect the resulting hash. transformations may use values present in config to perform their operations |
| `resources`          | `object` |  map of all datasets transform depends on with both name and commit paths |
