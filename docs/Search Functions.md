Users often want to be able to search a table of data that you are presenting them.  But doing it in a way that their search text provides the expected results is sometimes a little daunting.  For instance, if we had the following data:

```
[  
   {id: 1, first_name: 'John', last_name: 'Jones', age: 27, roles: ['Director', 'VP']},  
   {id: 2, first_name: 'Sally', last_name: 'Ride', age: 33, roles: ['VP']},  
   {id: 3, first_name: 'George', last_name: 'Jetson', age: 105, roles: ['Button Pusher']},  
   {id: 4, first_name: 'Jack', last_name: 'Johnson', age: 42, roles: ['Manager', 'Button Pusher']}  
]  
```

The user when searching these items would expect the following results from the following search strings:
| Search Criteria| Resulting ID's | Reason |
| --- | --- | --- |
| John | 1, 4 | First or last name |
| Johnson | 4 | Last name only |
| JOHN JACK | 4 | First and last name |
| vp | 1, 2 | People with the VP role |
| button | 3, 4 | People with Button in the role |
| john 2 | 1, 4 | First or last name, and has a 2 in age |
| 2 | 1, 2 & 4 | ID or age has a 2 |

In order to accomplish this, you would need to handle the following cases:
- Search every field value
- Search array's within a fields value
- Search partial strings
- deal with strings in a case in-sensitive manner
- Search numbers just like strings
- Make sure each line that is valid met all the conditions of each word the user provided

## SearchRows(array, search string) function
The `SearchRows()` function performs all of this analysis very quickly, and returns an array of rows that meet all the criteria of the search string:

```
SearchRows(people, 'John')
```
[  
   {id: 1, first_name: 'John', last_name: 'Jones', age: 27, roles: ['Director', 'VP']},  
   {id: 4, first_name: 'Jack', last_name: 'Johnson', age: 42, roles: ['Manager', 'Button Pusher']}  
]  

Additionally, you may need to search just one Row as part of another computation, like maybe in a `.reduce()` function so that you don't have to filter the array twice.  In that case you can use the `SearchRow(object, search string)` function which simply returns a boolean letting you know if the object meets the criteria of the search string