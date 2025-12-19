These are functions that don't fit cleanly anywhere else, but provide some great value.

## Is On?
I'm not sure this fits here, but this is where it is going!  Truthy values in javascript can be anything that has a somewhat valid value.  So, the string 'false' in some cases, like  `!!'false'` evaluates to true!

`IsOn()` handles a wide variety of input values and turns them into more logical boolean values, which I think is particularly handy when dealing with environment variables, IMHO.

```
IsOn('Yes')
```
true

And, other supported conditions...
| True | False |
| --- | --- |
| true | false |
| 'true' | 'false' |
| 't' | 'f' |
| 'yes' | 'no' |
| 'y' | 'n' |
| 'active' | 'inactive' |
| 1 | 0 |
| '$1,000' | '-$1,000' |
| 'bob' | '' |
| 'sally' | null |


## Coalesce Falsey
JavaScript has added some nice coalescing capabilities, such as:
```
null ?? 5 = 5
```

But, what if you want the 5, but the first condition is a zero.  Well, the zero is falsey, but it is not null or undefined, so nullish coalescing won't work.  Instead you can use:

```
CoalesceFalsey(0, 5)
```
5

## Promise-based Sleep command
Usually needed for testing purposes, this provide a simple `Sleep(milliseconds)` capability that doesn't burn up your processor.
```
await Sleep(500)
```
...half a second later it keeps processing.