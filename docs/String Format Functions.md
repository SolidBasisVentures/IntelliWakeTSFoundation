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

#### `shortenToMax` - Graph-friendly formatting (uses highest value as reference)
Perfect for chart axes where you want all values to use the same scale. The key difference from `shorten` is that `shortenToMax` uses the **highest** value to determine the scale, ensuring all numbers use the same format:
```typescript
// Example 1: All values stay in 'k' scale
const values = [500000, 1000000, 1500000]
ToNumberString(500000, { shortenToMax: values, currency: true })   // "$500k"
ToNumberString(1000000, { shortenToMax: values, currency: true })  // "$1,000k"
ToNumberString(1500000, { shortenToMax: values, currency: true })  // "$1,500k"

// Example 2: Difference between shorten (min) vs shortenToMax (max)
const values2 = [50000, 200000]
// With 'shorten' (uses lowest 50k): no shortening applied
ToNumberString(50000, { shorten: values2 })   // "50,000"
ToNumberString(200000, { shorten: values2 })  // "200,000"
// With 'shortenToMax' (uses highest 200k): 'k' scale applied to all
ToNumberString(50000, { shortenToMax: values2 })   // "50k"
ToNumberString(200000, { shortenToMax: values2 })  // "200k"

// Example 3: When highest value is very large (100M+), all use 'M' scale
const values3 = [500000, 1000000, 150000000]
ToNumberString(500000, { shortenToMax: values3, currency: true })   // "$1M"
ToNumberString(1000000, { shortenToMax: values3, currency: true })  // "$1M"
ToNumberString(150000000, { shortenToMax: values3, currency: true }) // "$150M"
```

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
