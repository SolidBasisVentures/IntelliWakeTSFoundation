# Search Functions

Type-safe search functions for filtering arrays of objects with intelligent multi-field matching: case-insensitive, partial matches, multi-word queries, and nested array/object searches.

## Quick Reference

```typescript
const people = [
   {id: 1, first_name: 'John', last_name: 'Jones', age: 27, roles: ['Director', 'VP']},
   {id: 2, first_name: 'Sally', last_name: 'Ride', age: 33, roles: ['VP']},
   {id: 3, first_name: 'George', last_name: 'Jetson', age: 105, roles: ['Button Pusher']},
   {id: 4, first_name: 'Jack', last_name: 'Johnson', age: 42, roles: ['Manager', 'Button Pusher']}
]

SearchRows(people, 'John')           // [1, 4] - matches first/last name
SearchRows(people, 'JOHN JACK')      // [4] - case-insensitive, all terms match
SearchRows(people, 'vp')             // [1, 2] - searches nested arrays
SearchRows(people, 'john 2')         // [1, 4] - "john" AND "2" both match
SearchRows(people, '2')              // [1, 2, 4] - numbers searched as strings
```

## API

### `SearchRows<T>(arrayTable, search, options?): T[]`

Returns array of objects matching all search terms (whitespace-delimited).

```typescript
// Limit to specific fields
SearchRows(people, 'John', { searchKeys: ['first_name', 'last_name'] })

// Exclude fields (e.g., prevent ID searches in UI)
SearchRows(people, '1', { excludeSearchKeys: ['id'] })

// Pagination
SearchRows(data, 'term', { limit: 10, page: 2 })

// OR logic (match ANY term instead of ALL)
SearchRows(people, 'john sally', { matchSomeTerm: true })
```

### `SearchRow<T>(searchItem, search, options?): boolean`

Tests if a single object matches. Use in `.reduce()`, `.map()`, or custom logic.

```typescript
SearchRow(people[0], 'john')  // true

people.reduce((acc, person) => {
  if (SearchRow(person, 'director', { searchKeys: ['roles'] })) {
    acc.push(person)
  }
  return acc
}, [])
```

## Options

```typescript
interface ISearchOptions<T extends object> {
  searchKeys?: (keyof T)[]        // Only search these keys (TypeScript-enforced)
  excludeSearchKeys?: (keyof T)[] // Exclude these keys (applied after searchKeys)
  matchSomeTerm?: boolean         // Match ANY term (OR) instead of ALL (AND)
  matchFromTerm?: number          // Start matching from term index
  matchUntilTerm?: number         // Stop matching at term index
  limit?: number                  // Max results
  page?: number                   // Page number (requires limit)
}
```

## Search Features

- **Case-insensitive**: "john" matches "John", "JOHN"
- **Partial matching**: "john" matches "Johnson"
- **Multi-word**: "john 2" → both "john" AND "2" must match (unless `matchSomeTerm: true`)
- **Numbers as strings**: 42 matches "42"
- **Recursive**: Searches nested arrays and objects
- **Type-safe**: TypeScript enforces valid `searchKeys`/`excludeSearchKeys`