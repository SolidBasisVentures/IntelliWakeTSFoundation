# IntelliWakeTSFoundation
IntelliwakeTSFoundation, short for the IntelliWake TypeScript Foundation Library provides multiple helper functions that are not present in vanilla JavaScript.

## Date helper functions
There are lots of date/time packages available, so why add those functions here?  The simple answer is that those packages that we used before either are no longer maintained, operated in old javascript paradigms that mutated the base object, or when we tried to switch to another package were missing some key feature we needed for some app that we had to code around.  Eventually, it was easier to take those code arounds and just build out the rest, so that's what we did!

The basic premise of these functions is that you can provide any format you like going in (Javascript Date object, date string, date/time string, time string, ISO date time string (in a variety of flavors)) and we can manipulate and format them.

## Using
...
## Testing
...

Old Scripts

		"BuildDist": "tsc && vite build",
		"PublishDist": "tsc && vite build && pnpm version patch && git push && npm publish ./dist",
		"PublishTry": "tsc && vite build && pnpm version patch && git push",
		"BuildAndPublishOLD": "rm -rf dist/* && rollup -c && npm version patch --no-git-tag-version && npm publish",
