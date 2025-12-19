## Timezones
Timezones can be tricky things.  The users browser reports one time zone (only available on the browser), the server is generally set to UTC (Greenwich Mean Time through England), and then when the user is trying to manage a date/time in another timezone, things can get tricky!

First, it is important to understand the difference between a timezone you typically think of (like 'EST' and the timezones that javascript and databases work with), and the timezone qualifier that Javascript tends to work with called an IANA time-zone(which would be a value like 'America/New_York').  The most important difference to realize is that when an address in the 'America/New_York' IANA time zone moves through the year it can sometimes be in EST (Eastern Standard Time) and other times be in EDT (Eastern Daylight-Savings Time).  You do NOT want to save something like 'EST' in the timezone, because it will be off by an hour when daylight savings kicks in.  However, most users don't recognize the IANA label, and want to see it in the standard 'EST' format.  

## Users IANA Timezone
To get the users timezone from the browser in IANA format, use:
```
CurrentTimeZone()
```
America/New_York (for instance)

## Converting from IANA to a user-readable timezone label
Want to present that to a user so they can see what timezone they are in?  use:
```
IANAZoneAbbr('2022-12-01', 'America/New_York')
```
EST

Notice that you had to pass a date?  That is used to determine if they are in daylight savings or not.  So, for dates that are in daylight savings, it will return the correct value:
```
IANAZoneAbbr('2022-06-01', 'America/New_York')
```
EDT
## Difference between dates
To calculate the difference between two date/times, use the following function:
`DateDiff(from, to, granularity)`

```
DateDiff('2000-01-01T00:00:00.000Z', '2000-01-05T00:00:00.000Z', 'days')
```
4

```
DateDiff('2000-01-01T00:00:00.000Z', '2000-01-02T00:00:00.000Z', 'hours')
```
24

## Evaluation
Comparing two dates is easy:
```
DateCompare('1/1/2000 12:00:00', 'IsBefore', '1/18/2000 14:00:00', 'days')
```
true

However:
```
DateCompare('1/1/2000 12:00:00', 'IsBefore', '1/1/2000 14:00:00', 'days')
```
false

...because the first date is not a whole day before the second date, and the granularity specified was 'days'.

Options to compare include:
- IsSame
- IsBefore
- IsAfter
- IsSameOrBefore
- IsSameOrAfter

And options for the granularity to check against are:
- year(s)  
- quarter(s)
- month(s)
- week(s)
- day(s)
- hour(s)
- minute(s)
- second(s)
- millisecond(s)

## ISO Standard Format
Databases often want to work with ISO-standardized date strings.  These are a great way to handle date/times with Timezone information so that you're clear exactly what time you are referring to.  Remember, that the Z is Zulu time which is GMT.

To convert any valid date/time you throw at it into an ISO standard, use the `DateISO()` function (and leverage the manipulation capabilities, if needed):
```
DateISO('2021-01-31T00:00:00.000Z', {month: 1})
```
'2021-02-28T00:00:00.000Z'

## ISO Week Number
Another ISO standard is the Week of the Year.  This can get a little confusing because sometimes the first days in January or last days in December can belong to another year.  To get the ISO week use the following:
```
DateWeekISONumber('2021-01-01')
```
{year: 2020, week: 53}

And, in reverse, you can get the first date from an ISO Week number:
```
DateFromWeekNumber({year: 2021, week: 1})
```
'2021-01-04'

Or even the start and end dates:
```
DatesFromWeekNumber({year: 2021, week: 1})
```
{start: '2021-01-04', end: '2021-01-10'}

Also, see `MonthDatesFromDateISOWeeks()`

Need to advance or decrement a week number?  Check out:
```
WeekNumberAdjust({year: 2023, week: 1}, -1)
```
{year: 2022, week: 52}

## Working with Months and Quarters
What to know what dates are in a Quarter?
```
DatesQuarter(2021, 4)
```
{start: '2021-10-01', end: '2021-12-31'}

How about the quarter of a given date?
```
DateQuarter('2021-01-01')
```
{year: 2021, quarter: 1}

Also see `DateMonth()` for the month a date belongs to.

## Working for the Weekend
What to know if a date is a weekend?
```
DateIsWeekend('2022-09-10')
```
true

## Need to know when Easter falls for a year?
This function is crazy, but it works!
```
EasterDate(2029)
```
'2029-04-01'

## Quickly get the least or greatest date
Yes, with some of the other functions you could do this, but I think it is quicker to have a function that clearly describes what you're trying to do!

```
LeastDate('2023-04-02', '2023-04-01', '2023-03-31')
```
'2023-03-31'

```
GreaterDate('2023-04-02', '2023-04-01', '2023-03-31')
```
'2023-04-02'

