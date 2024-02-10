# IntelliWakeTSFoundation
IntelliwakeTSFoundation, short for the IntelliWake TypeScript Foundation Library provides multiple helper functions that are not present in vanilla JavaScript.

## Date helper functions
There are lots of date/time packages available, so why add those functions here?
The simple answer is that those packages that we used before either are no longer maintained, operated in old javascript paradigms that mutated the base object, or when we tried to switch to another package were missing some key feature we needed for some app that we had to code around.
Eventually, it was easier to take those code arounds and just build out the rest, so that's what we did!

The basic premise of these functions is that you can provide any format you like as an input (Javascript Date object, date string (MM/DD/YYYY, YYYY-MM-DD), date/time string, time string, ISO date time string (in a variety of flavors)) and it can parse, manipulate and format them.
***
### Date-only function
The `DateOnly/DateOnlyNull(date, options)` function provides a significant amount of power when you do not need to deal with times.  DateOnly returns a value in 'YYYY-MM-DD' format (unless `{formatLocale: true}` is passed as an option, in which case it returns the date in the users local format (e.g. reversed M/D, D/M for US vs. Europe).  If the date is invalid, it will return today's date.  `DateOnlyNull()` will return a null if an invalid date is passed.

#### Date-only parsing
Some key parsing usages of `DateOny()` include...
```
DateOnly('1/1/2000') 
```
Result: 2000-01-01

```
DateOnly('2000-01-01')
```
Will also result in 2000-01-01

```
DateOnly('now')
```
```
DateOnly(null)
```
Both result in today's date.  I don't know what today's date is since I'm just a piece of documentation, you'll have to figure that out.

Adding the formatLocale option changes the format to something you can display to your user: 
```
DateOnly('2000-01-01', {formatLocale: true})
```
Result: 1/1/2000

#### Date-only manipulation
Now for some fun stuff... `DateOnly()` can also perform a range of manipulations:
```
DateOnly('1/1/2000', {days: 1})
```
Result: 2000-01-02

```
DateOnly('1/1/2000', {days: -1})
```
Result: 1999-12-31

But even more neat is you can use other keys like `weeks`, `months`, `quarters`, and `years`:
```
DateOnly('1/1/2000', {weeks: 1})
```
Result: 2000-01-08 (Added 1 week)

You can also specify the `StartOf` or `EndOf` as `week`, `month`, `quarter` or `year`, like: 
```
DateOnly('12/29/1999', {week: 'EndOf'})
```
Result: 2000-01-01 
(Notice that it supports both `week` and `weeks`... you'll see why in a moment)

Now you probably noticed that the options is an object, so you can chain these things together, and they will be calculated in the order you provide them: 
```
DateOnly('01/01/2000', {years: 1, quarters: 2, weeks: 2, days: 2, week: 'EndOf', formatLocale: true})
```
Result: 7/21/2001