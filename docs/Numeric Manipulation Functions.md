We included this in this section because numbers passed to the client app often have strings thrown at them when they were meant to be numbers.  When trying to parse these with vanilla javascript, it can get confusing.  

One example is the plus sign.  In javascript this either adds two numbers, or concatenates two strings.  How many times have you had something like 100 + 10 come out as '10010'.  Yikes!  Let's deal with this...

## CleanNumbers() for Addition
To add a bunch of numbers together without worrying about the actual data type, use `CleanNumbers(round, number...)`:
```
CleanNumbers(2, '$100', 12.234)
```
112.23

Note that you can provide as many arguments as you like, and they will all be summed appropriately.

## CleanSubtractNumbers() for Subtraction
Sometimes we just need to subtract.  It's not a negative thing, it's a good thing!
```
CleanSubtractNumbers(2, '$100', 12.234)
```
87.77

Again, you can provide as many arguments as you like.


## Array of Valid Numbers
Simply provide `ValidNumbers(...values)` with as many arguments you like in whatever format you like to get back real numbers:
```
ValidNumbers(1, '2', 3)
```
[1, 2, 3]

## Average numbers
`AverageNumber(precision, values...)` can average a whole boat-load array of numbers for you to a certain precision:
```
AverageNumber(2, 3, 4, 5, 6)
```
4.50 (2 decimal places)

Note, there is also an `AverageNumberNull(precision, values..)` that will return a null (instead of zero) if needed.


## Clean Division (Handle by Zero)
I know, I know... dividing by zero is an imaginary number.  But sometimes you  get users giving you crazy values and you don't need their browser blowing up with errors.  So, either return a zero with `CleanDivide(numerator, denominator, decimals)` or return a null with `CleanDivideNull(numerator, denominator, decimals)`:
```
CleanDivide(5, 0, 1)
```
0

```
CleanDivide(5, 2, 1)
```
2.5
