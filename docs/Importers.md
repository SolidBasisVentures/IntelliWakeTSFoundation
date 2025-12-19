# Importer Class Documentation

The `Importer` class is a generic TypeScript utility designed to parse, validate, and transform tabular data (CSV or 2D arrays) into structured objects based on a predefined schema.

## Core Concepts

- **Definition**: A schema object that defines expected columns, types, validation rules, and default values.
- **Analysis**: A multi-step process that identifies headers, maps columns, and validates individual rows.
- **Validation Layers**: Structural (missing columns), Integrity (errors/missing required cells), and Quality (warnings).

## Schema Definition (`TImporterColumnDefinitions`)

Define your schema using an object that satisfies `TImporterColumnDefinitions`. Each key represents an internal field name.

### Column Properties
- `columnType`: The expected data type (`string`, `number`, `integer`, `date`, `time`, `datetime`, `boolean`).
- `required`: Boolean. If `true`, the column must exist in the header, and cells must have values.
- `alternateNames`: Array of strings used to match source headers (case-insensitive).
- `default`: A static value or a function `(row: string[]) => any` used when a cell is empty.
- `errorMessage`: A function `(value: string, row: string[]) => string | null` for custom integrity checks.
- `warningMessage`: A function `(value: string, row: string[]) => string | null` for non-blocking alerts.
- `customConvertor`: A function `(value: string, row: string[]) => any` to manually handle data transformation.

```typescript
const myDefinition = {
    id: {
        columnType: 'integer',
        required: true,
        alternateNames: ['Identifier', 'ID_Num']
    },
    email: {
        columnType: 'string',
        errorMessage: (val) => !val.includes('@') ? 'Invalid email format' : null
    },
    isActive: {
        columnType: 'boolean',
        default: 'false'
    }
} satisfies TImporterColumnDefinitions<any>;
```


## Basic Usage

### 1. Initialization
You can use the `Importer` class directly or extend it for specific use cases.

```typescript
import { Importer } from './ImporterFunctions';

const importer = new Importer(myDefinition, {
    includeRowsMissingRequireds: false // Default behavior
});
```


### 2. Loading Data
Populate the importer from a raw CSV string or a 2D array of strings.

```typescript
// From CSV
importer.populateFromCSV("ID_Num,email\n1,test@example.com");

// From Array
importer.populateFromArray([
    ['Identifier', 'email'],
    ['1', 'test@example.com'],
    ['2', 'invalid-email']
]);
```


### 3. Accessing Results
The importer separates raw analysis from valid data.

- `importer.validRows`: Returns only processed objects that passed all "Required" and "Error" checks.
- `importer.analysisRows`: Returns every row processed, including its metadata (errors, warnings, valid status).
- `importer.missingRequiredHeaders`: Returns keys from your definition that were marked as `required` but were not found in the source headers.

## Validation Workflow

When integrating the importer into a UI or backend process, follow this validation priority:

1.  **Header Integrity**: Check `importer.missingRequiredHeaders`. If not empty, block the import.
2.  **Data Integrity**: Check `importer.allErrors`. These represent rows that failed `errorMessage` checks or are missing values in `required` columns.
3.  **Data Quality**: Check `importer.allWarnings`. These are non-blocking alerts from `warningMessage`.

```typescript
if (importer.missingRequiredHeaders.length > 0) {
    console.error("Missing columns:", importer.missingRequiredHeaders);
} else {
    const data = importer.validRows;
    console.log("Processed Data:", data);
}
```


## AI Query Metadata

- **Symbol**: `Importer<T>`
- **Namespace**: Data Transformation / Validation
- **Complexity**: O(N*M) where N is rows and M is columns.
- **Constraints**: Requires a header row to begin processing. Skips empty rows and duplicate header rows automatically.
