# Importer Usage Guide

This document outlines the workflow for using the `ImporterFunctions` to analyze, validate, and process incoming tabular data (e.g., from CSV or Excel).

## 1. Analyzing Incoming Data

The `ImporterDataToArray` function performs a multi-stage analysis of the provided 2D string array.

### Step A: Header Identification
The system scans rows to find a "Header Row" by matching cell values against your `TImporterColumnDefinitions` (including `alternateNames`).
- If no header row is found, the process returns an empty result set.
- Once a header is found, all subsequent non-empty rows are treated as data.

### Step B: Column Mapping
The analysis generates a `columnMapping` which shows:
- **Provided Columns:** What was found in the source data.
- **Target Columns:** Which internal field that column maps to.
- **Missing Columns:** Internal fields marked as `required` that were not found in the source headers.

## 2. Validation Priority & Ordering

When presenting feedback to users about invalid data, follow this order of severity:

### Priority 1: Structural Failures (`missingRequiredColumns`)
**Action:** Block the import immediately.
If a column marked `required: true` in the definition is missing from the headers entirely, the import cannot proceed. You should present a list of these missing column names to the user first.

### Priority 2: Data Integrity Failures (`errors` & `missingRequiredCells`)
**Action:** Identify specific rows/cells.
- **`missingRequiredCells`**: These occur when a required column exists, but a specific row has no value for it.
- **`errors`**: These are triggered by your custom `errorMessage` logic in the column definitions.
  The `invalidRawDataIndexes` array will track which rows failed these checks. By default, these rows are excluded from the `results` array.

### Priority 3: Data Quality Alerts (`warnings`)
**Action:** Inform the user, but allow the process to continue.
Warnings are triggered by the `warningMessage` logic. They represent "suspicious" data that is technically valid for the system but may require human review (e.g., a name that is unusually short).

## 3. The "Valid Import" Threshold

A "Valid Import" is defined by the following conditions:

1.  **Header Integrity:** `missingRequiredColumns` must be an empty array.
2.  **Row Integrity:** The `results` array contains the data you intend to save.
3.  **Error-Free:** Both `errors` and `missingRequiredCells` should be empty (or the user must acknowledge and choose to ignore the specific rows marked in `invalidRawDataIndexes`).

### Allowing Warnings
The import process is considered **successful** even if the `warnings` array is populated. Warnings are informative and do not block the transformation of data into the final TypeScript objects.

## 4. Usage Example

```typescript
const {
    results,
    errors,
    warnings,
    missingRequiredColumns
} = ImporterDataToArray(myDefinitions, rawCsvData);

if (missingRequiredColumns.length > 0) {
    // 1. Show "Missing Required Columns" UI
} else if (errors.length > 0) {
    // 2. Show "Data Errors" UI (blocking specific rows)
} else {
    // 3. Process 'results' (even if warnings.length > 0)
    if (warnings.length > 0) {
        console.log("Imported with warnings:", warnings);
    }
    saveToDatabase(results);
}
```
This guide focuses on the "Gatekeeper" logic: blocking on missing columns or errors, but allowing the import to proceed with warnings. Does this match the workflow you're looking to implement?
