# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IntelliWakeTSFoundation is a TypeScript utility library providing foundational components for data manipulation, date/time management, formatting, and validation. It's designed for both client-side and server-side usage and published as an NPM package.

## Build and Development Commands

### Installation
```bash
pnpm install
```

### Testing
```bash
# Run tests in watch mode
pnpm run Vitest-Watch

# Run tests once (using vitest directly)
vitest run
```

### Building
```bash
# Compile TypeScript and build with Vite
pnpm run Build
```

### Development Console
```bash
# Run the development console script (consoles/consoles.ts)
pnpm run TSNodeDev
```

### Publishing
```bash
# Complete publish workflow: patch version, build, publish to NPM, push to git
pnpm run Publish
```

## Architecture

### Module Organization

The codebase is organized as flat modules in `src/`, each exporting related functionality:

- **DateManager.ts** (~114KB): Comprehensive date/time parsing, formatting, and manipulation with timezone support
- **SortSearch.ts**: Type-safe multi-property sorting with pagination utilities (`ISortColumn`, `IPaginatorRequest`, `IPaginatorResponse`)
- **ImporterFunctions.ts**: Tabular data validation and transformation (`DataImportProcessor` class, formerly called `Importer`)
- **Functions.ts**: Numeric utilities (clean division, averaging, constraints, validation)
- **StringManipulation.ts**: Formatting (currency, percentages, case conversion, HTML handling)
- **DataConstructs.ts**: Common data structures and type definitions
- **DeepEqual.ts**: Deep equality comparison utilities
- **Evaluator.ts**: Expression evaluation utilities
- **ObjectConstraint.ts**: Object validation and constraint checking
- **TimeTracker.ts**: Performance timing utilities
- **Enums.ts**: Enum manipulation utilities
- **Colors.ts**: Color manipulation utilities
- **ICS.ts**: iCalendar file generation
- **UnselectedIDList.ts**: ID selection state management

All modules are re-exported through `src/main.ts`, which serves as the library entry point.

### Build Configuration

- **TypeScript**: Strict mode enabled with ES2022 target
- **Bundler**: Vite with `vite-plugin-dts` for declaration file generation
- **Output**: `dist/main.js` (ESM) and `dist/main.umd.cjs` (UMD)
- **Test Framework**: Vitest with test files colocated as `*.test.ts`

## Key Implementation Patterns

### Date/Time Management

Always use `DateManager` functions for date operations to ensure timezone consistency. The module provides:
- Flexible parsing from various formats (JS Date, ISO strings, MM/DD/YYYY, etc.)
- Timezone-aware operations
- Formatting with predefined constants (`DATE_FORMAT_DATE`, `DATE_FORMAT_DATE_TIME_DISPLAY`, etc.)

### Data Import/Validation

When working with `DataImportProcessor` (in ImporterFunctions.ts):

1. **Validation Priority**: Always validate in this order:
   - Structural: Check `missingRequiredHeaders` first
   - Integrity: Check `allErrors` for required field violations and error messages
   - Quality: Check `allWarnings` for non-blocking alerts

2. **Column Definition Schema**:
   - `columnType`: Data type (string, number, integer, date, time, datetime, boolean)
   - `required`: Boolean indicating if column must exist and have values
   - `alternateNames`: Array of case-insensitive header name alternatives
   - `default`: Static value or function for empty cells
   - `errorMessage`: Function returning error string (blocking)
   - `warningMessage`: Function returning warning string (non-blocking)
   - `customConvertor`: Custom transformation function

3. **Usage Flow**:
   ```typescript
   const processor = new DataImportProcessor(definition, options);
   processor.populateFromCSV(csvString);
   // or processor.populateFromArray(array2D);

   if (processor.missingRequiredHeaders.length > 0) {
     // Block import - missing required columns
   }
   const validData = processor.validRows; // Only valid rows
   const allData = processor.analysisRows; // All rows with metadata
   ```

### Sorting and Pagination

Use `ISortColumn` with `SortColumns()` for type-safe, multi-property sorting:
- Supports nested property paths via dot notation
- `descending` flag for sort direction
- `sortToBottom` option to push null/empty values to end

`IPaginatorRequest` and `IPaginatorResponse` provide standardized pagination interfaces.

## Testing Conventions

- Test files are colocated with source files using `*.test.ts` naming
- Use Vitest for all tests
- Run tests in watch mode during development: `pnpm run Vitest-Watch`

## TypeScript Configuration

- **Strict Mode**: All strict checks enabled (noImplicitAny, strictNullChecks, noUnusedLocals, noUnusedParameters)
- **Module System**: ESNext modules with Node resolution
- **Source Maps**: Enabled for debugging
- **Declaration Files**: Auto-generated via vite-plugin-dts

## Documentation

- Full wiki available at: https://github.com/SolidBasisVentures/IntelliWakeTSFoundation/wiki
- Documentation markdown files in `docs/` directory
- `llms.txt` contains high-level reference for LLM consumption
