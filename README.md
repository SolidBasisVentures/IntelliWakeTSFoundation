# IntelliWakeTSFoundation
IntelliwakeTSFoundation, short for the IntelliWake TypeScript Foundation Library provides multiple helper functions that are not present in vanilla JavaScript.

Documentation on how to use these features can be found on our [WIKI](https://github.com/SolidBasisVentures/IntelliWakeTSFoundation/wiki)

This library is meant to be used both on the client side and the server side.

## Date and Date/Time Utilities
The basic premise of the date/time functions is that you can provide any format you like as an input (Javascript Date object, date string (MM/DD/YYYY, YYYY-MM-DD), date/time string, time string, ISO date time string (in a variety of flavors)) and it can parse, manipulate, compare and format them.

## Format Utilities
Sometimes you just need to do some simple manipulation to format things nicely for users, but coming up with the right mechanism use isn't always straight forward.  These utilities provide some great ways to get strings and numbers formatted for common needs.

## Array Utilities
Javascript has an `array.sort()` function.  But, it's implementation is inconsistent (comparison by subtraction for numbers, trying to get strings to sort case-insensitive, comparing dates and/or times, binaries, etc.).  And then, if you want to sort by multiple conditions, the syntax is complicated to the point where it may not be obvious what the intent of the original developer was.

The idea behind this implementation is to handle sorts in a consistent way and vastly simplify the process of stacked sorting.

## Generic Functions
There are a few additional functions that provide other features, like checking additional values for a truthy condition, coalescing 0's and blank strings, and providing a promise based sleep function.

## Library Management

Use the following scripts found in the package.json to manage the repository:

To run unit tests:
```
pnpm run Vitest-Watch
```
Note: please update test scripts for any changes.

To run the `consoles.ts` file (with a watch for changes):
```
pnpm run TSNodeDev
```

To update the packages in the package.json:
```
pnpm run Intall-IntelliWake
```

After a significant change, update the minor version number with:
```
pnpm run Verision-Minor-Advance
```

To publish the repository to NPMJS:
```
pnpm run Publish
```
