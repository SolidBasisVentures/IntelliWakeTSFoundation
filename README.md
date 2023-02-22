# IntelliWakeTSFoundation
 IntelliwakeTSFoundation, short for the IntelliWake TypeScript
Foundation Library provides a multitude of helper functions that
are not present in vanilla JavaScript.

## Installing
...
## Using
...
## Testing
...

Old Scripts

		"BuildDist": "tsc && vite build",
		"PublishDist": "tsc && vite build && pnpm version patch && git push && npm publish ./dist",
		"PublishTry": "tsc && vite build && pnpm version patch && git push",
		"BuildAndPublishOLD": "rm -rf dist/* && rollup -c && npm version patch --no-git-tag-version && npm publish",
