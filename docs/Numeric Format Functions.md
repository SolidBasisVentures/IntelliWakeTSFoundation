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


## ToNumberString - Unified Number Formatting
The `ToNumberString` function provides a unified, flexible approach to formatting numbers with extensive options for currency, percentages, abbreviations, and more.

### Basic Usage
```typescript
ToNumberString(12345.67)
```
'12,345.67'

### Currency Formatting
```typescript
ToNumberString(12345.67, { currency: true })
```
'$12,345.67'

```typescript
ToNumberString(12345.67, { currency: true, fixedDecimals: 0 })
```
'$12,346'

### Percentage Formatting
```typescript
ToNumberString(0.1567, { percent: true })
```
'16%'

```typescript
ToNumberString(0.1567, { percent: true, maxDecimals: 2 })
```
'15.67%'

### Short Mode (with Array Support)
The `short` option abbreviates large numbers. When provided with an array of numbers, it uses the lowest value to determine consistent formatting across multiple values:

```typescript
// Single value
ToNumberString(5678900, { short: true })
```
'5.7M'

```typescript
// Array mode for consistent formatting
const values = [1234, 5678900];
ToNumberString(1234, { short: values })      // '1.2k'
ToNumberString(5678900, { short: values })   // '5678.9k'
```
Both values use 'k' suffix because the lowest value (1234) determines the format.

**Whole Number Behavior**: When `short: true` and the value is NOT being abbreviated (divisor = 1), decimal places are omitted for whole numbers:
```typescript
ToNumberString(100, { short: true })    // '100'  (no .0)
ToNumberString(100.5, { short: true })  // '100.5'
```

### Shorten Mode (with Array Support)
The `shorten` option is less aggressive than `short`, only abbreviating values above 99,999:

```typescript
// Single value
ToNumberString(5678900, { shorten: true })
```
'5679k'

```typescript
// Array mode for consistent formatting
const values = [150000, 5678900];
ToNumberString(150000, { shorten: values })    // '150k'
ToNumberString(5678900, { shorten: values })   // '5679k'
```

### Handling Null and Zero Values
```typescript
ToNumberString(null, { nullBlank: true })     // ''
ToNumberString(null, { nullDash: true })      // '-'
ToNumberString(0, { zeroBlank: true })        // ''
ToNumberString(0, { zeroDash: true })         // '-'
```

### Custom Prefix and Suffix
```typescript
ToNumberString(42, { prefix: 'Total: ', suffix: ' items' })
```
'Total: 42 items'

### Decimal Control
```typescript
// Fixed decimals (always shows exactly this many)
ToNumberString(12.5, { fixedDecimals: 3 })
```
'12.500'

```typescript
// Max decimals (shows up to this many, but can show fewer)
ToNumberString(12.5, { maxDecimals: 3 })
```
'12.5'

```typescript
// Min/Max decimals (shows between these bounds)
ToNumberString(12.5, { minDecimals: 1, maxDecimals: 4 })
```
'12.5'

### Complete Options Reference
```typescript
type TNumberStringOptions = {
  fixedDecimals?: number | null    // Forced number of digits (overrides min/max)
  minDecimals?: number | null      // Minimum decimals to show
  maxDecimals?: number | null      // Maximum decimals to show
  currency?: boolean               // Format as currency with $
  percent?: boolean                // Format as percent (multiplies by 100)
  short?: boolean | number[]       // Abbreviate (k, M, B). Array for consistent formatting
  shorten?: boolean | number[]     // Less aggressive abbreviation. Array for consistency
  zeroBlank?: boolean              // Return '' for zero values
  zeroDash?: boolean               // Return '-' for zero values
  nullBlank?: string | boolean     // Return '' for null values
  nullDash?: string | boolean      // Return '-' for null values
  prefix?: string | null           // Text to prepend when valid number
  suffix?: string | null           // Text to append when valid number
}
```

### Array Mode Details
When `short` or `shorten` receives an array:
1. Filters out NaN values from the array
2. Includes the input number in the calculation
3. Uses the **lowest** absolute value to determine the divisor/extension
4. Applies that format consistently to all numbers in the set

This ensures tables or lists display numbers with consistent units (e.g., all in 'k' or all in 'M').

## Extract the Whole and Decimal portions of a number
Ever need the whole and/or decimal parts of a number, but forget your middle school math class?
```
ExtractWholeDecimal(123.45)
```
{whole: 123, decimal: 0.45}