Sometimes you just need to do some simple string manipulation, but coming up with the right mechanism use isn't always straight forward.  These utilities provide some great ways to get strings formatted for common needs.

## Common Examples
```
ToDigits(12345.67)
```
'12,346'


```
ToDigits(12345.67, 1)
```
'12,345.7'


```
ToCurrency(12345.67)
```
'$12,345.67'


```
ToPercent(0.125, 1)
```
'12.5%'


```
CleanNumber('$12,345.67')
```
12345.67


```
CleanNumbers(2, '$100', 12.234)
```
112.23


```
FormatPhoneNumber('5555551234')
```
'(555) 555-1234'


```
AddS('Category', 2, true)
```
'2 Categories'


```
ShortNumber(6666666666, 1)
```
'6.7B'


And, for the nerds out there...
```
ToCamelCase('user_token')
```
'userToken'

```
IsOn('Yes')
```
true


## Details
There are some functions that generally handle JavaScripts loosely-typed system: [[Generic Functions]]

Numbers need to be formatted to present to users in a friendly way.  Boy, are you in luck!  We've got a bunch of functions here: [[Numeric Format Functions]]

Numbers need to be manipulated, even if their source is providing them as a string.  Simplify the handling of those conditions with: [[Numeric Manipulation Functions]]

Strings also need to be parsed in a variety of ways, including into other string formats, and sometimes back into numbers.  Check these out: [[String Format Functions]]

HTML sometimes needs to be manipulated or displayed in a safe way, [[HTML Format Functions]]


