# SortCompares() function
The `SortCompares()` function utilizes the javascript `array.sort()` function, but simplifies the calculation of conditions.

Why did we create a `SortCompares()` function?

Because when we tried using javascript natively out of the box we kept running into inconsistencies that were problematic for our users because we forgot to manage some conditions.  What kinds of things did we forget?  Stuff like:
- Making string compares case-insensitive
- Dealing with the situation where numbers are actually stored as strings, and so comparisons end up not sorting correctly
- Not sorting dates properly, particularly if they are in a M/D/YYYY format

Instead of having to remember to do those EVERY SINGLE TIME, use `SortCompares()` EVERY SINGLE TIME so the user experiences consistency.

The following is sorting in its simplest form.  We recommend using the `SortCompares()` consistently to avoid confusion.

This example sorts the array by the `name` property using a compare that is case-insensitive.
```
[  
   {id: 1, name: 'AAA'},  
   {id: 2, name: 'ZZZ'},  
   {id: 3, name: 'ccc'},  
   {id: 4, name: 'BBB'}  
]  
.sort((a, b) => SortCompares([a.name, b.name]))
```
[  
  { id: 1, name: 'AAA' },  
  { id: 4, name: 'BBB' },  
  { id: 3, name: 'ccc' },  
  { id: 2, name: 'ZZZ' }  
]

Note how easy it is to read.  It is very obvious what it is intending to do, without having to remember if +1 or -1 cause the sort to change.

Thus, sorting by reverse name order is as simple as reversing the a and b, as follows:
```
[  
   {id: 1, name: 'AAA'},  
   {id: 2, name: 'ZZZ'},  
   {id: 3, name: 'ccc'},  
   {id: 4, name: 'BBB'}  
]  
.sort((a, b) => SortCompares([b.name, a.name]))
```
[  
  { id: 2, name: 'ZZZ' },
  { id: 3, name: 'ccc' },  
  { id: 4, name: 'BBB' },
  { id: 1, name: 'AAA' }
]

Note: there is a `SortCompare()` function that does the same thing, but with arguments instead of an array.  However, for consistency with more complicated joins, please consider the following section.

## Stacked Sorting
From our previous example, let's say that two of the names where the same.  When sorting you might want to sort first by the `name` column, then by `id`.  In order to accomplish this, simply pass an array of arrays, like so:
```
[  
   {id: 1, name: 'AAA'},  
   {id: 2, name: 'ZZZ'},  
   {id: 3, name: 'AAA'},  
   {id: 4, name: 'BBB'}  
]  
.sort((a, b) => SortCompares([[a.name, b.name], [a.id, b.id]]))
```
[  
  { id: 1, name: 'AAA' },  
  { id: 3, name: 'AAA' },  
  { id: 4, name: 'BBB' },  
  { id: 2, name: 'ZZZ' }  
]

Again, this very simple to read.  The `SortCompares()` will first try to sort the `name` column.  But if two of those items are the same, it will move to the next condition, in this case the `id` column.

Please also note that the compares function is automatically handling numbers and strings appropriately.  Sometimes javascript can get confused and sort things the wrong way, like sorting '100' before '20' because it starts with a '1'.  SortCompares will determine that both strings being compared are actually numbers, and sort them appropriately.

Data types handled automatically by `SortCompares()` include:
- Numbers (including numbers as strings)
- Dates (including Date objects or even dates as strings)
- Times
- Date/Times
- String (automatically checking them case-insensitively)
- Booleans (false = 0, true = 1, meaning falses will come first, so plan accordingly!)

## Falsey values to top or bottom
Sometimes a group of values have some falsey (blank, zero and/or null) values in them.  When sorting the list, you might want all of the null values at the bottom, or maybe even all of the null and or zero items to the bottom.

In order to accomplish this, simply add a third item to the condition as so:
```
[0, 3, null, 2, 1].sort((a, b) => SortCompares([a, b, 'Bottom']))
```
This moves all the 'nulls' to the bottom, but keeps the 0's in order: `[0, 1, 2, 3, null]`

If you want the zero's to the bottoms, or even blank strings, use `Bottom0`:
```
[0, 3, null, 2, 1].sort((a, b) => SortCompares([a, b, 'Bottom0']))
```
`[1, 2, 3, 0, null]`

## Sorting by an given array order
Sometimes you need to sort by some other criteria, like maybe status, or whatever.  Wouldn't it be nice to provide an array, and then have the sort follow your array?

Try `SortPerArray()` to sort an array of objects by a given order:
```
[  
    {id: 1, name: 'One'},  
    {id: 2, name: 'Two'},  
    {id: 3, name: 'Three'},  
    {id: 4, name: 'Four'},  
    {id: 5, name: 'Five'},  
    {id: null, name: 'Empty'},  
    {id: 7, name: 'Seven'},  
    {id: 6, name: 'Six'}  
].sort((a, b) => SortPerArray(a.id, b.id, [4, 5, 3, 2, 1], 'Bottom'))
```
[  
    {id: 4, name: 'Four'},  
    {id: 5, name: 'Five'},  
    {id: 3, name: 'Three'},  
    {id: 2, name: 'Two'},  
    {id: 1, name: 'One'},  
    {id: null, name: 'Empty'},  
    {id: 6, name: 'Six'},  
    {id: 7, name: 'Seven'}  
]

Notice that null, 6, and 7 ended up at the 'Bottom' because they did not meet any of the criteria specified in the given order.

Need to sort by a set of Enums?  Check out our [[Enum Functions]]
## Legacy functions
You will also find some legacy functions that perform similar actions to `SortCompares()`, but they added a little more complexity, particularly when stacking sorts. In the past, stacking sorts required two functions: `SortCompareNull()` and `SortCompare()`

The sample of sort compares above was:
```
people.sort((a, b) => SortCompares([[a.name, b.name], [a.id, b.id]]))
```

The equivalent legacy functions would be:
```
people.sort((a, b) => SortCompareNull(a.name, b.name) ?? SortCompare(a.id, b.id))
```

`SortCompareNull()` would return a sort characteristic, or null if the two values were determined to be equal.  So then the condition would null coalesce to the `SortCompare()` function, which would always return an integer, including a 0 if the two values were equal.
