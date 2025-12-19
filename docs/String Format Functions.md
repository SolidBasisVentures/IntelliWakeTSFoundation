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
