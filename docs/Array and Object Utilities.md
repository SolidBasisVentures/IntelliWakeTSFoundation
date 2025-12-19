The basic premise of these functions is to offer simplicity for some of the more complex array and object related tasks in Javascript.

We couldn't find a way to simplify [].reduce()... sorry!  But, what a great function!  Learn it if you don't know how to use it already.

But these other functions provide some nice consistency and readability.

## Common Examples
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

```
SearchRows([  
   {id: 1, name: 'AAA'},  
   {id: 2, name: 'ZZZ'},  
   {id: 3, name: 'ccc'},  
   {id: 4, name: 'BBB'}  
], 'zz') 
```
[  
  { id: 2, name: 'ZZZ' }  
]
## Details

General object functions are here: [[Object Functions]]

General array functions are here: [[Array Functions]]

Sorting is the first area we simplified.  Trust me, you want to use this function EVERY TIME YOU SORT: [[Sort Functions]]

Often a user wants to filter an array of objects and uncover items that meet their criteria across multiple fields: [[Search Functions]]

Working with enums is frowned upon by some developers... but I like them.  Here are some utilities to make you an enum pro: [[Enum Functions]]

