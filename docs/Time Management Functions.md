# TimeOnly() function
The `TimeOnly(time, options)` function parses just about any input, and returns a time in 24-hour format.

```
TimeOnly('2023-04-11T13:47:58.969Z', {timezoneSource:'America/New_York'})
```
'09:47:58'

You can also manipulate times, like this:
```
TimeOnly('11:00:00', {hours: 2})
```
'13:00:00'
