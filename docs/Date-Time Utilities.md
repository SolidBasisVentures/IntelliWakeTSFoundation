The basic premise of these functions is that you can provide any format you like as an input (Javascript Date object, date string (MM/DD/YYYY, YYYY-MM-DD), date/time string, time string, ISO date time string (in a variety of flavors)) and it can parse, manipulate, compare and format them.

## Common Examples
```
DateOnly('01/01/2000', {years: 1, quarters: 2, weeks: 2, days: 2, week: 'EndOf', formatLocale: true})
```
7/21/2001

```
DateFormat('LocalDoWTime', '2000-01-01T21:00:00.000Z')
```
'Sa, 1/1/2000 4:00 pm' (If you're in the Eastern Time Zone)

Other functions exist for handling day of week, comparisons, durations, etc.

## Details
There are lots of date/time packages available, so why add these functions here?

The simple answer is that those packages that we used before either are no longer maintained, operated in old javascript paradigms that mutated the base object, or when we tried to switch to another package were missing some key feature we needed for some app that we had to code around.  Eventually, it was easier to take those code arounds and just build out the rest, so that's what we did!

Functions that apply to dates only (no times) are here: [[Date Management Functions]]

Functions that apply to date/times (including timezones) are here: [[Date-Time Management Functions]]

Functions that apply to times only (no dates) are here: [[Time Management Functions]]

Advanced functions are found here: [[Advanced Date-Time Management]]




