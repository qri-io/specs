---
title: stats
description: qri's dataset stats calculation
---

The qri dataset stats calculation is usually done on `qri save` and it's purpose is to provide an "at a glance" summary of a dataset.
It is also intended to be used for lightweight diff overviews between datasets and versions.

Stats are not intended to be a final summary and record of a dataset and are implemented to be probabalistic. As such they work quite fast and for very large dataset sizes with little resources but do have tradeoffs:
- For numeric columns we calculate a probabalistic histogram which approximates the distributions of values and thus produces a non-exact output, but should be fairly low on the error bound even for large datasets (~1%)
- Median calculation is done using the above histogram and while usually quite around the real median, it has a tendency to lean to the right
- For string values, we approximate the unique counts and sometimes they are under represented, should hover at <2% error for fairly large cardinality columns
- Frequency counting of unique values is limited to the top 10000 items and performs well in returning the highest occuring keys, it only tends to over represent in some cases and thus can return slightly higher counts. Should also be contained to ~1% error in normal usage


Significant deviation from the above should be treated as bad behavior and fine tuned if possible.