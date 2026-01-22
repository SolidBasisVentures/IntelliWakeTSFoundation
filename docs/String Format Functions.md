## Strings to numbers
Let's start from the other direction first.  Sometimes users type all kinds of things in an input box, and you just need to store it in the database as number.  

We can clean all that up for you very simply with `CleanNumber(value, precision)`.  Try this, noting that the precision is optional:
```
CleanNumber('$12,345.674', 2)
```
12345.67


## Users Initials
Don't have a lot of space, and just want to show the initials from the beginning of each word, like a users name?
```
ToInitials('John Jones')
```
'JJ'


## To Upper Case Words
Have something crazy you just need to parse into words?
```
ToUpperCaseWords('this_is_a_Test')
```
'This Is A Test'


## To Camel Case
```
ToCamelCase('user_token')
```
'userToken'

## To Snake Case
```
ToSnakeCase('userToken')
```
'user_token'

## To Kebab Case
```
ToKebabCase('userToken')
```
'user-token'

## To Pascal Case
```
ToPascalCase('user-token')
```
'UserToken'

(Note: all of the proceeding are interchangeable, so that you can pass one case to transform it to another case)

## Number Formatting with ToNumberString
For advanced number formatting with fine-grained control, use `ToNumberString(value, options)`:

### Basic Usage
```typescript
ToNumberString(1234.5678)  // "1,234.5678"
ToNumberString(1234.5678, { fixedDecimals: 2 })  // "1,234.57"
ToNumberString(1234.5678, { currency: true })  // "$1,234.57"
ToNumberString(0.1234, { percent: true })  // "12%"
```

### Shortened Numbers for Graphs
When displaying numbers in graphs or charts where you want consistent scaling across all values:

#### `short` - Aggressive shortening (uses lowest value as reference)
```typescript
const values = [1000, 5000, 10000]
ToNumberString(1000, { short: values, currency: true })   // "$1.0k"
ToNumberString(5000, { short: values, currency: true })   // "$5.0k"
ToNumberString(10000, { short: values, currency: true })  // "$10.0k"
```

#### `shorten` - Conservative shortening (uses lowest value as reference)
```typescript
const values = [100000, 500000, 1000000]
ToNumberString(100000, { shorten: values })   // "100k"
ToNumberString(500000, { shorten: values })   // "500k"
ToNumberString(1000000, { shorten: values })  // "1,000k"
```

#### `shortConsistent` - Max 4-digit formatting with consistent scaling
Perfect for column alignment in tables and charts. Analyzes all values to ensure the maximum displays with no more than 4 digits before the decimal point, while maintaining consistent formatting across all values:
```typescript
// Example 1: Large values with no decimals needed
const values1 = [1234000, 123000, 12000, 0]
ToNumberString(1234000, { shortConsistent: values1 })  // "1,234k"
ToNumberString(123000, { shortConsistent: values1 })   // "123k"
ToNumberString(12000, { shortConsistent: values1 })    // "12k"
ToNumberString(0, { shortConsistent: values1 })        // "0k"

// Example 2: Medium values with 1 decimal for alignment
const values2 = [123400, 12300, 1234, 0]
ToNumberString(123400, { shortConsistent: values2 })   // "123.4k"
ToNumberString(12300, { shortConsistent: values2 })    // "12.3k"
ToNumberString(1234, { shortConsistent: values2 })     // "1.2k"
ToNumberString(0, { shortConsistent: values2 })        // "0.0k"

// Example 3: Small values with no shortening needed
const values3 = [123, 12, 1, 0]
ToNumberString(123, { shortConsistent: values3 })      // "123"
ToNumberString(12, { shortConsistent: values3 })       // "12"
ToNumberString(1, { shortConsistent: values3 })        // "1"
ToNumberString(0, { shortConsistent: values3 })        // "0"

// Example 4: Wide range requiring 2 decimals for smallest values
const values4 = [12345, 123, 12, 1]
ToNumberString(12345, { shortConsistent: values4 })    // "12.35k"
ToNumberString(123, { shortConsistent: values4 })      // "0.12k"
ToNumberString(12, { shortConsistent: values4 })       // "0.01k"
ToNumberString(1, { shortConsistent: values4 })        // "0.00k"

// Works with currency and percent options
const values5 = [123400, 12300, 1234]
ToNumberString(123400, { shortConsistent: values5, currency: true })  // "$123.4k"
ToNumberString(12300, { shortConsistent: values5, currency: true })   // "$12.3k"
ToNumberString(1234, { shortConsistent: values5, currency: true })    // "$1.2k"
```

The algorithm automatically determines:
- **Divisor**: Based on the maximum value (ensures max displays with ≤ 4 digits)
- **Decimal precision**: Based on the minimum value (minimizes decimals while maintaining meaningful display)
- **Threshold**: Values < 10,000 display without shortening

### Additional Options
- `zeroBlank` / `zeroDash` - Display blank or dash for zero values
- `nullBlank` / `nullDash` - Display blank or dash for null values
- `prefix` / `suffix` - Add custom prefix or suffix text
- `minDecimals` / `maxDecimals` - Control decimal places

## Address Formatting
Need an address formatted into a single row?  How about this?
```
AddressMultiRow({   address_1: '111 Main Street',   address_2: 'Suite 100',   city: 'Burr Ridge',   state: 'IL',   zip: '61257', })
```
111 Main Street\
Suite 100\
Burr Ridge, IL  61257

Note that `AddressMultiRow(object, prefix)` can accept a prefix, so if your object has a property like 'start_address_1', simply send 'start_' in the prefix argument.

Need an address formatted into a single row?
```
AddressSingleRow({   address_1: '111 Main Street',   address_2: 'Suite 100',   city: 'Burr Ridge',   state: 'IL',   zip: '61257', })
```
111 Main Street, Suite 100, Burr Ridge, IL  61257
