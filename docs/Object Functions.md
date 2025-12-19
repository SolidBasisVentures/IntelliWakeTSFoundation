ES6 has provided a lot of quick ways to manipulate objects.  But, there are still some functions that are nice to use:

## Omit Properties
Ever need an object, but just without a few pesky properties?  Get rid of one or more of them with ease:
```
OmitProperty({id: 1, name: 'Bob', age: 20}, 'id', 'age')
```
{name: 'Bob'}


## Pick Properties
In reverse, you can quickly just pick out the properties you want from an object:
```
PickProperty({id: 1, name: 'Bob', age: 20}, 'name')
```
{name: 'Bob'}