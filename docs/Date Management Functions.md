# DateOnly() function
The `DateOnly/DateOnlyNull(date, options)` functions provide a significant amount of power when you do not need to deal with dates.  DateOnly returns a value in 'YYYY-MM-DD' format (unless `{formatLocale: true}` is passed as an option, in which case it returns the date in the users local format (e.g. reversed M/D, D/M for US vs. Europe).  If the date is invalid, it will return today's date.  `DateOnlyNull()` will return a null if an invalid date is passed.

## Parsing
Some key parsing usages of `DateOny()` include...
```
DateOnly('1/1/2000') 
```
2000-01-01

```
DateOnly('2000-01-01')
```
2000-01-01

```
DateOnly('now')
```
```
DateOnly(null)
```
Both result in today's date.  I don't know what today's date is since I'm just a piece of documentation, you'll have to figure that out.

The `DateOnlyNull()` function does everything that `DateOnly()` does, except that invalid dates return a null:
```
DateOnlyNull('')
```
Since '' is invalid, it returns null.  Null is invalid, undefined is invalid, and 'Eggplant' (for instance) is an invalid date.

Adding the formatLocale option changes the format to something you can display to your user: 
```
DateOnly('2000-01-01', {formatLocale: true})
```
1/1/2000

Ever get a date from some ancient system in some weird format?  Well, you can tell `DateOnly()` how to interpret the string by providing a `fromFormat` option as follows:
```
DateOnly('20000101', {fromFormat: 'YYYYMMDD'})
```
1/1/2000

## Manipulation
Now for some fun stuff... `DateOnly()` can also perform a range of manipulations:
```
DateOnly('1/1/2000', {days: 1})
```
2000-01-02

```
DateOnly('1/1/2000', {days: -1})
```
1999-12-31

But even more neat is you can use other keys like `weeks`, `months`, `quarters`, and `years`:
```
DateOnly('1/1/2000', {weeks: 1})
```
2000-01-08 (Added 1 week)

You can also specify the `StartOf` or `EndOf` as `week`, `month`, `quarter` or `year`, like: 
```
DateOnly('12/29/1999', {week: 'EndOf'})
```
2000-01-01 
(Notice that it supports both `week` and `weeks`... you'll see why in a moment)

Now you probably noticed that the options is an object, so you can chain these things together, and they will be calculated in the order you provide them: 
```
DateOnly('01/01/2000', {years: 1, quarters: 2, weeks: 2, days: 2, week: 'EndOf', formatLocale: true})
```
7/21/2001
