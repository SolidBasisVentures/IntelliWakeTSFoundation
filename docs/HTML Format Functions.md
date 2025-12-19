The following functions perform manipulation on strings intended to provide safe and/or nicely formatted HTML.

## Clean Scripts
This is a dangerous function, so use with caution!

However, sometimes we need to show a user back what they have typed in our HTML page.  But we want to avoid cross-site attacks.  

Clean scripts attempts to pull out all scripts from string:
```
CleanScripts('<script>console.log(1)</script>blank')
```
'blank'

## TextToHTML
Just like it sounds, but leverages CleanScripts to make sure it is clean to display.
```
TextToHTML('This is a
Test')
```
`This is a<br/>Test`

## HTMLToText
In reverse, let's get some plain text out of an HTML string:
```
HTMLToText('<p>john doe</p>')
```
'john doe'

## Replace Links with valid A tag
Perhaps your user typed some URL's in a text box.  But, when you display it, you don't want it replacing the page your on, but instead load a new page.

```
ReplaceLinks('https://www.google.com', 'testClass')
```
`<a href='https://www.google.com' target='_blank' class='testClass'>https://www.google.com</a> `
