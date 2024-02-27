# IntelliWakeTSFoundation
IntelliwakeTSFoundation, short for the IntelliWake TypeScript Foundation Library provides multiple helper functions that are not present in vanilla JavaScript.

Documentation on how to use these features can be found on our [WIKI](https://github.com/SolidBasisVentures/IntelliWakeTSFoundation/wiki)

## Publishing

Use the following scripts found in the package.json to manage the repository:

To run unit tests:
```
pnpm run Vitest-Watch
```
Note: please update test scripts for any changes.

To run the `consoles.ts` file (with a watch for changes):
```
pnpm run TSNodeDev
```

To update the packages in the package.json:
```
pnpm run Intall-IntelliWake
```

After a significant change, update the minor version number with:
```
pnpm run Verision-Minor-Advance
```

To publish the repository to NPMJS:
```
pnpm run Publish
```
