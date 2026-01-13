# Date-Time Parsing functions
There are multiple functions that parse dates.  Each of these functions could interpret the output of any of the other functions, so the inputs could be a string, a number (Epoch format, which is the unix number of milliseconds since Jan 1, 1970), or a javascript Date object.  They all ultimately call the DateParseTS() function, but calling the individual function returns that data type.

Note: Any time you need today's date, use 'today'.  Any time you need today's date & time, use 'now'.

```
DateParseTS('1/1/2000 14:00:00')
```
Returns an integer which is the timestamp (thus the TS) in Epoch format (which is the unix number of milliseconds since Jan 1, 1970), or null if the date passed in cannot be parsed.

```
DateISO('1/1/2000 14:00:00')
```
Returns the date and time, but in ISO format, like: `2000-01-01T05:00:00.000Z` that is, if you were in the Eastern Time Zone.

```
DateObject('1/1/2000 14:00:00')
```
Returns the date and time, but in a javascript Date object.

```
DateICS('1/1/2000 14:00:00')
```
Returns the date and time in a format that can be used by ICS files, like: `20000101T050000Z`

Each of these inputs could also be the string 'now', which will return the current date and time.  If any of the values passed into the function are invalid, then a null is returned.

You can get the ISO week number like this:
```
DateWeekISONumberNull('2000-01-01T00:00:00.000Z')
```
`{ year: 1999, week: 52 }`

Or, you can go the other way, specifying the ISO week to get the date:
```
DateFromWeekNumber({week: 52, year: 1999})
```
`1999-12-27`

## Advance and Decrement Manipulations
Each of these functions can accept a second argument with various options.  In the following examples we'll focus on `DateISO()`, but the options work with any of them.

One set of the options are manipulation properties.  The following are valid manipulation properties that can be passed in:
- year(s)
- quarter(s)
- month(s)
- week(s)
- day(s)
- hour(s)
- minute(s)
- second(s)
- millisecond(s)

Each of these values could be positive or negative, and can be chained together.  For instance, the following adds 1 year, 2 months and -2 hours to the input:
```
DateISO('1/1/2000 13:00:00 -05:00', {years: 1, months: 2, hours: -2})
```
2001-02-28T22:00:00.000Z

## Start and End Manipulations
Another manipulation that can be performed is a `StartOf` or `EndOf` value on all options (except milliseconds) that move the date to the beginning or end of that period.  For instance `{year: 'StartOf'}` would move the date to the 1st of January for the year, and `{year: 'EndOf'}` would move it to the 31st of December.  This is a great way to find the start or end of quarters, months, weeks, and an easy way to manipulate times to the beginning or end of a day, hour, etc.
```
DateISO('2000-01-01T08:30:00.000Z', {hour: 'StartOf'})
```
`2000-01-01T08:00:00.000Z`

The one exception is for weeks, which sometimes need to have the start of Monday found, which would be the property: `StartOfMon`
```
DateISO('2000-01-01T00:00:00.000Z', {weeks: 'StartOfMon'})
```
`1999-12-27T00:00:00.000Z`

## Timezone Specification
You can also specify the source timezone if not specified so that the system knows how to return the right timezone value:
```
DateISO('2000-01-01 16:00:00.000', {timezoneSource: 'UTC'})
```
`2000-01-01T16:00:00.000Z`

```
DateISO('2000-01-01 16:00:00.000', {timezoneSource: 'America/New_York'})
```
`2000-01-01T21:00:00.000Z`

# Formating functions
The `DateFormat/DateFormatAny(format, date, time-zone display, time-zone source)` functions provide a significant amount of power when you do not need to deal with dates and times together.  While `DateFormat()` has typescript constraints that lead you to use the most used date/time formats when returned, `DateFormatAny()` allows for power and flexibility.

The primary formats that can be passed to `DateFormat()` are:
- Local
- LocalDoW
- LocalDateTime
- LocalDoWTime
- Date
- DateTime
- DisplayDate
- DisplayTime
- DisplayDateDoW
- DisplayDateTime
- DisplayDateDoWTime
- DisplayDateLong
- DisplayDateDoWLong
- DisplayDateTimeLong
- DisplayDateDoWTimeLong
- ISO
- ISOInput - Used to format a date/time for an HTML Input tag
```
DateFormat('LocalDoWTime', '2000-01-01T21:00:00.000Z')
```
'Sa, 1/1/2000 4:00 pm' (If you're in the Eastern Time Zone)

DoW stands for 'Day of Week'.

The `DateFormatAny()` function accepts the formats above, but can also handle any of the following in any combination:
- Date components: YYYY, YY, Q, Qo (1st), MMMM, MMM, MM, Mo (1st), M, DD, Do (1st), D
- Week components: d (DoW), do (1st), dd (Su), ddd (Sun), dddd, w
- Time components: HH (24 hour), H, hh (12 hour), h, mm, m, ss, s
- Meridian formats (like AM/PM): A, a

For example, the primary format above for `LocalDoWTime` actually is translated into: `dd, M/D/YYYY h:mm a`, which is then interpreted by `DateFormatAny()`.  This allows you to process any format you like.
```
DateFormat('dd, M/D/YYYY h:mm a', '2000-01-01T21:00:00.000Z')
```
'Sa, 1/1/2000 4:00 pm' (If you're in the Eastern Time Zone)

You can also get a description of the time passed between two dates:
```
DateDiffLongDescription('1/1/2000 12:00:00', '1/18/2000 14:00:00')
```
17 Days 2 Hours
