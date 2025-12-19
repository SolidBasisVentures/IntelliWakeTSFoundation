Getting numbers presented to the user in a way they can easily digest, with comma's, limited decimal places, etc. is the goal of these functions.

## Digits
Sometimes you just need a nicely formatted number:
```
ToDigits(12345.67)
```
'12,346'

And sometimes with decimal places, maybe in this case to 1 significant digit (the precision is optional):
```
ToDigits(12345.67, 1)
```
'12,345.7'

For zero value inputs, you sometimes want to show a `0` (which happens with `ToDigits()`), but you can also make it show a dash with `ToDigitsDash()` or blank with `ToDigitsBlank()`.

You can also optionally show decimal places up to a maximum number as follows:
```
ToDigitsMax(12345, 2)
```
'12,345'

```
ToDigitsMax(12345.123, 2)
```
'12,345.12'

## Shortened Number
Sometimes you have a really long number, and just don't have the space to show it.  Use this:
```
ShortNumber(6666666666, 1)
```
'6.7B'

## Describing the number of items with plurals
What if you have some number of categories, and want to display the label in a way that makes sense without having to do something hokey like 'category(s)'?  `AddS()` to the rescue!
```
AddS('Category', 2)
```
'Categories'

```
AddS('Category', 1)
```
'Category'

Add the true indicator at the end to show the number with the label, like this:
```
AddS('Category', 2000, true)
```
'2,000 Categories'

And, just to set you mind at ease, it handles all these conditions:
| Singular | Plural |
| --- | --- |
| Row | Rows |
| Patch | Patches |
| Journey | Journeys |
| Category | Categories |

## Currency
For currency it's as simple as (the precision is optional):
```
ToCurrency(12345.67, 2)
```
'$12,345.67'

Be sure to check out `ToCurrencyDash()` and `ToCurrencyBlank()` to replace a 0 value with a dash or blank string, or `ToCurrencyMax()` for a variable number of decimal places.

## Percents
Similar for Percents (again, the precision is optional, but in this cases happens further down the number):
```
ToPercent(0.125, 1)
```
'12.5%'

Again, check out `ToPercentDash()`, `ToPercentBlank()` and `ToPercentMax()`

## Ordinal Representation
Sometimes it's nice for the user to see who's on first, and what's on second:
```
DigitsNth(1)
```
'1st'

```
DigitsNth(11)
```
'11th'

## Phone Number
Store the numbers, display the readable format:
```
FormatPhoneNumber('5555551234')
```
'(555) 555-1234'

Need the E.164 format for texting?
```
FormatPhoneNumberE164US('5555551234')
```
'+15555551234'

## Zip Code
Again, store the numbers, display readable:
```
FormatZip('11111')
```
'11111'

```
FormatZip('111112222')
```
'11111-2222'

## Social Security Number
Again, store the numbers, display readable:
```
FormatSSN('111223333')
```
'111-22-3333'

## Business Tax ID
Again, store the numbers, display readable:
```
FormatTaxID('112222222')
```
'11-2222222'


## Extract the Whole and Decimal portions of a number
Ever need the whole and/or decimal parts of a number, but forget your middle school math class?
```
ExtractWholeDecimal(123.45)
```
{whole: 123, decimal: 0.45}