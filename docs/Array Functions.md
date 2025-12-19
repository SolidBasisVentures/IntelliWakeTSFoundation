Just some nice functions to handle basic array functions.

## Convert a single item or array to an array of the same type
I like the paradigm for some function arguments to be able to pass either a single value, or an array of values.

`ToArray()` would be the first function I'd call to convert either condition to an array so I can iterate through either the one or the many:

```
ToArray(100)
```
[100]

```
ToArray([100, 200])
```
[100, 200]


## Generate an Range of Values
Later versions of javascript have made this easier with ES6, but I still like `ArrayRange(end, increment, start)` because it has parameters that allow for simplicity and power:

```
ArrayRange(10)
```
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

```
ArrayRange(-10, 2, -1)
```
[-1, -3, -5, -7, -9]
