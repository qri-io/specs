---
title: FSI
description: File system Integration
---

FSI stands for _file system integration_. FSI is qri's way of representing a dataset as files in a directory on a user's computer. Using fsi, users can edit files as an interface for working with qri datasets.

A dataset is "linked" to a directory through a `.qri_ref` dotfile that connects the folder to a version history stored in the local qri repository.

Files in a linked directory follow naming conventions that map to components of a dataset. eg: a file named `meta.json` in a linked directory maps to the dataset meta component. This mapping can be used to construct a dataset for read and write actions.

A mode of using qri wherein a user has a “working directory” that reflects the editable contents of a dataset. Created using “init” (to make a new dataset) or “checkout” (for an existing dataset). For command-line, commands can be used without explicitly providing a reference to a dataset, as long as the user is in the working directory. Implemented using a hidden “.qri-ref” file in that directory.