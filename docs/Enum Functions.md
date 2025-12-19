Enums are a great way to constrain values that are passed around to a limited number of options.

Generally, we want to use enums with a <string, string> format. So, for the following examples, we're going to reference the following enum structure:
```
enum ETest {  
    TestOne = 'Test 1',  
    TestTwo = 'Test 2'  
}
```

## Getting the Keys
Getting the keys of a enum set is surprisingly difficult.  We don't think it should be.  So:
```
EnumKeys(ETest)
```
['TestOne', 'TestTwo']

## Getting the Values
We use the values MANY times when giving the user a drop-down list to select from.  Here's an easy way to get those values only:
```
EnumValues(ETest)
```
['Test 1', 'Test 2']

## Keys to Values or Values to Keys
Going back and forth between enum keys and values works like this:
```
EnumKeyFromValue(ETest, 'Test 1')
```
'TestOne'

And vice-versa:
```
EnumValueFromKey(ETest, 'TestTwo')
```
'Test 2'

## Sort by Enum order
Sometimes you may not want to sort alphabetically, but by the order you put them in the Enum definition.  After all, you probably put them in that order for a reason!

You'll use the `SortPerArray()` function from the [[Sort Functions]]:
```
['Test 2', 'Test 1'].sort((a, b) => SortPerArray(a, b, EnumValues(ETest))
```
['Test 1', 'Test 2']

You can also use `SortPerArrayNull()` to stack sorts.