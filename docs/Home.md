# IntelliWakeTSFoundation
IntelliwakeTSFoundation, short for the IntelliWake TypeScript Foundation Library provides multiple helper functions that are not present in vanilla JavaScript.

This library is meant to be used both on the client side and the server side.

## Generic Functions
Here are a few basic functions that are nice to re-use in multiple scenarios.

[[Generic Functions]]

## Date and Date/Time Utilities
The basic premise of the date/time functions is that you can provide any format you like as an input (Javascript Date object, date string (MM/DD/YYYY, YYYY-MM-DD), date/time string, time string, ISO date time string (in a variety of flavors)) and it can parse, manipulate, compare and format them.

[[Date-Time Utilities]]


## Format Utilities
Sometimes you just need to do some simple manipulation to format things nicely for users, but coming up with the right mechanism use isn't always straight forward.  These utilities provide some great ways to get strings and numbers formatted for common needs.

[[Format Utilities]]

## Array Utilities
Javascript has an `array.sort()` function.  But, it's implementation is inconsistent (comparison by subtraction for numbers, trying to get strings to sort case-insensitive, comparing dates and/or times, binaries, etc.).  And then, if you want to sort by multiple conditions, the syntax is complicated to the point where it may not be obvious what the intent of the original developer was.

The idea behind this implementation is to handle sorts in a consistent way and vastly simplify the process of stacked sorting.

[[Array and Object Utilities]]

## Paginator Utilities
Pagination is critical for handling large amounts of data effectively in web browser.  However, implementing pagination takes a fair bit of coordination between the client and server side components so that the user is presented with a simple list of available page numbers with the server handling the complexity of querying the database effectively.

Since pagination is integrated and highly reliant on the back-end, the documentation for these utilities has been consolidated in our IntelliWake Node library:

[IntelliWake Node Paginator](https://github.com/SolidBasisVentures/IntelliWakeTSNode/wiki/Paginator-Utilities)