import {CleanNumber} from './StringManipulation'

/**
 * Returns an array of numbers to be used for pagination links.
 *
 * @example
 * // returns [1, 2, 3, null, 10]
 * PagesForRange(1, 10)
 *
 * // returns [1, null, 7, 8, 9, 10]
 * PagesForRange(9, 10)
 *
 * // returns [1, 2, 3, 4, null, 10]
 * PagesForRange(1, 10, 3)
 */
export function PagesForRange(current: number, length: number, spread: number = 2): (number | null)[] {
	if (!(length > 0)) {
		return []
	}

	const current_adjusted = current < 1 ? 1 : current > length ? length : current
	const spread_adjusted = current < spread || current > length - spread ? spread : Math.ceil(spread / 2)

	let left = current_adjusted - spread_adjusted,
		right = current_adjusted + spread_adjusted,
		range: number[] = [],
		rangeWithNull: (number | null)[] = [],
		l

	for (let i = 1; i <= length; i++) {
		if (i === 1 || i === length || (i >= left && i <= right)) {
			range.push(i)
		}
	}

	for (let i of range) {
		if (l) {
			if (i - l === 2) {
				rangeWithNull.push(l + 1)
			} else if (i - l !== 1) {
				rangeWithNull.push(null)
			}
		}
		rangeWithNull.push(i)
		l = i
	}

	return rangeWithNull
}

export interface ISortColumn {
	primarySort: string
	primaryAscending: boolean
	primaryEmptyToBottom: null | 'string' | 'number' | 'null'
	secondarySort: string | null
	secondaryAscending: boolean
	secondaryEmptyToBottom: null | 'string' | 'number' | 'null'
}

export const initialSortColumn: ISortColumn = {
	primarySort: '',
	primaryAscending: true,
	primaryEmptyToBottom: null,
	secondarySort: null,
	secondaryAscending: true,
	secondaryEmptyToBottom: null
}

/**
 * Updates a the primary sort key of a sort column object, and returns the updated object.
 *
 * @example
 * // returns the updated object:
 * {
 *   primarySort: 'name',
 *   primaryAscending: true,
 *   primaryEmptyToBottom: null,
 *   secondarySort: '',
 *   secondaryAscending: true,
 *   secondaryEmptyToBottom: null
 * }
 * SortColumnUpdate('name', initialSortColumn)
 */
export const SortColumnUpdate = (
	columnToSort: string,
	sortColumn: ISortColumn,
	firstClickAscending: boolean = true,
	emptyToBottom: null | 'string' | 'number' | 'null' = null
): ISortColumn => {
	if (sortColumn.primarySort === columnToSort) {
		return {
			...sortColumn,
			primaryAscending: !sortColumn.primaryAscending,
			primaryEmptyToBottom: emptyToBottom
		}
	} else {
		return {
			primarySort: columnToSort,
			primaryAscending: firstClickAscending,
			primaryEmptyToBottom: emptyToBottom,
			secondarySort: sortColumn.primarySort,
			secondaryAscending: sortColumn.primaryAscending,
			secondaryEmptyToBottom: sortColumn.primaryEmptyToBottom
		}
	}
}

/**
 * Accepts an array of data and a sort column object, and returns the sorted array of data.
 *
 * @example
 * const sortColumn = SortColumnUpdate('name', initialSortColumn)
 * const data = [
 *   {id: 1, name: 'brad', age: 24},
 *   {id: 2, name: 'sally', age: 32},
 *   {id: 3, name: 'abby', age: 28}
 * ]
 *
 * // returns
 * [
 *   {id: 3, name: 'abby', age: 28}
 *   {id: 1, name: 'brad', age: 24},
 *   {id: 2, name: 'sally', age: 32},
 * ]
 * SortColumns(data, sortColumn)
 */
export const SortColumns = <T>(arrayTable: T[], sortColumn: ISortColumn): T[] => {
	return arrayTable.sort((a: any, b: any) =>
		!sortColumn.primarySort
			? 0
			: SortColumnResult(
					a[sortColumn.primarySort] ?? null,
					b[sortColumn.primarySort] ?? null,
					sortColumn.primaryAscending,
					sortColumn.primaryEmptyToBottom
			  ) ??
			  (!sortColumn.secondarySort
					? 0
					: SortColumnResult(
							a[sortColumn.secondarySort] ?? null,
							b[sortColumn.secondarySort] ?? null,
							sortColumn.secondaryAscending,
							sortColumn.secondaryEmptyToBottom
					  ))
	)
}

/**
 * Returns a case-insensitive sort number of the .sort(a, b) function, or null if values are equal.  Handles booleans, numbers (including currency and percentages), and case-insensitive strings.
 *
 * @example
 * [
		{id: 1, name: 'AAA', prioritized: false},
		{id: 2, name: 'ZZZ', prioritized: false},
		{id: 3, name: 'CCC', prioritized: true},
		{id: 4, name: 'BBB', prioritized: false}
	]
 .sort((a, b) =>
 		SortCompare(a.name, b.name)) = [
		{ id: 1, name: 'AAA', prioritized: false },
		{ id: 4, name: 'BBB', prioritized: false },
		{ id: 3, name: 'CCC', prioritized: true },
		{ id: 2, name: 'ZZZ', prioritized: false }
	]
 */
export const SortCompare = (beforeValue: any, afterValue: any, emptyTo: null | 'Top' | 'Bottom' = null): number => {
	return SortCompareNull(beforeValue, afterValue, emptyTo) ?? 0
}

/**
 * Returns a case-insensitive sort number of the .sort(a, b) function, or null if values are equal.  Handles booleans, numbers (including currency and percentages), and case-insensitive strings.
 *
 * @example
 * [
		{id: 1, name: 'AAA', prioritized: false},
		{id: 2, name: 'ZZZ', prioritized: false},
		{id: 3, name: 'CCC', prioritized: true},
		{id: 4, name: 'BBB', prioritized: false}
	]
 .sort((a, b) =>
 		SortCompareNull(b.prioritized, a.prioritized)
 		?? SortCompare(a.name, b.name)) = [
		{ id: 3, name: 'CCC', prioritized: true },
		{ id: 1, name: 'AAA', prioritized: false },
		{ id: 4, name: 'BBB', prioritized: false },
		{ id: 2, name: 'ZZZ', prioritized: false }
	]
 */
export const SortCompareNull = (beforeValue: any, afterValue: any, emptyTo: null | 'Top' | 'Bottom' = null): number | null => {
	if (beforeValue === afterValue) return null
	
	if (!!emptyTo) {
		if ((beforeValue === null || beforeValue === undefined) && afterValue !== null && afterValue !== undefined) {
			return emptyTo === 'Top' ? -1 : 1
		}
		if ((afterValue === null || afterValue === undefined) && beforeValue !== null && beforeValue !== undefined) {
			return emptyTo === 'Top' ? 1 : -1
		}
	}
	
	if (typeof beforeValue === 'boolean' && typeof afterValue === 'boolean') {
		return (beforeValue ? 1 : 0) - (afterValue ? 1 : 0)
	}
	
	const beforeNumber = CleanNumber(beforeValue)
	const afterNumber = CleanNumber(afterValue)
	
	if (!isNaN(beforeNumber) && !isNaN(afterNumber)) {
		return beforeNumber - afterNumber
	}
	
	return ((beforeValue ?? '').toString()).localeCompare((afterValue ?? '').toString(), undefined, {sensitivity: 'base'})
}

const SortColumnResult = (
	valueA: any,
	valueB: any,
	isAscending: boolean,
	emptyToBottom: null | 'string' | 'number' | 'null'
): number => {
	if (!!emptyToBottom) {
		if (!valueA && !!valueB) return 1
		if (!!valueA && !valueB) return -1
	}

	const numbA = CleanNumber(valueA)
	const numbB = CleanNumber(valueB)

	if (isNaN(numbA ?? 0) || isNaN(numbB ?? 0)) {
		return (valueA ?? '').localeCompare(valueB ?? '', undefined, {sensitivity: 'base'}) * (isAscending ? 1 : -1)
	}

	return (numbA - numbB) * (isAscending ? 1 : -1)
}

/**
 * Converts each word of a string to an array element for searching.
 *
 * @example
 * // returns ['john', 'doe', 'johndoe@mail.com']
 * SearchTerms('john doe johndoe@mail.com')
 */
export const SearchTerms = (search: string | null | undefined, toLowerCase = true): string[] =>
	(search ?? '')
		.trim()
		.split(/(\s+)/)
		.map((term) => (toLowerCase ? term.trim().toLowerCase() : term.trim()))
		.filter((term) => !!term)

/**
 * Determines whether a string contains search terms.
 *
 * @example
 * // returns true
 * StringContainsSearchTerms('user age', ['user', 'age'])
 */
export const StringContainsSearchTerms = (value: string | null | undefined, searchTerms: string[]): boolean => {
	if (searchTerms.length === 0) return true

	if (!value) return false

	return searchTerms.every((term) => value.includes(term))
}

/**
 * Determines whether a string contains search string.
 *
 * @example
 * // return true
 * StringContainsSearch('user age', 'user')
 *
 * // return false
 * StringContainsSearch('user age', 'address')
 */
export const StringContainsSearch = (value: string | null | undefined, search: string | null | undefined): boolean => {
	if (!search) return true

	if (!value) return false

	const searchTerms = SearchTerms(search)

	return StringContainsSearchTerms(value, searchTerms)
}

/**
 * Determines whether an object contains search terms.
 *
 * @example
 * // returns true
 * ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['24'])
 *
 * // returns true
 * ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['john'])
 */
export const ObjectContainsSearchTerms = (object: object | null | undefined, searchTerms: string[]): boolean => {
	if (searchTerms.length === 0) return true

	if (!object) return false

	return searchTerms.every((term) =>
		Object.keys(object).some((column) => (object[column] ?? '').toString().toLowerCase().includes(term))
	)
}

/**
 * Determines whether an object contains search string.
 *
 * @example
 * // returns true
 * ObjectContainsSearch({user: 'john doe', age: 24}, '24')
 *
 * // returns true
 * ObjectContainsSearch({user: 'john doe', age: 24}, 'john')
 */
export const ObjectContainsSearch = (object: any | null | undefined, search: string | null | undefined): boolean => {
	if (!search) return true

	if (!object) return false

	const searchTerms = SearchTerms(search)

	return ObjectContainsSearchTerms(object, searchTerms)
}

/**
 * Searches an array of objects with a given search string, and returns the list of objects that match.
 *
 * @example
 * let data = [{id: 1, user: 'john doe'}, {id: 2, user: 'john smith'}]
 *
 * // returns [{id: 1, user: 'john doe'}, {id: 2, user: 'john smith'}]
 * SearchRows(data, 'john')
 *
 * // returns [{id: 2, user: 'john smith'}]
 * SearchRows(data, 'smith')
 */
export const SearchRows = <T>(arrayTable: T[], search: string): T[] => {
	const searchTerms = SearchTerms(search)

	if (searchTerms.length === 0) {
		return arrayTable
	}

	return (arrayTable ?? []).filter((arrayRow: any) => ObjectContainsSearchTerms(arrayRow, searchTerms))
}

/**
 * Determines whether a search item object contains value from the search string.
 *
 * @example
 * // returns true
 * SearchRow({user: 'john doe', age: '24'}, 'john 24')
 */
export const SearchRow = (searchItem: object, search: string): boolean => {
	const searchTerms = SearchTerms(search)

	if (searchTerms.length === 0) {
		return true
	}

	return ObjectContainsSearchTerms(searchItem, searchTerms)
}

/**
 * Accepts an array of data, a search string, and a sort column object. Returns the
 * sorted search results array.
 *
 * @example
 * const sortColumn = SortColumnUpdate('name', initialSortColumn)
 * const data = [
 *   {id: 1, name: 'john smith', age: 24},
 *   {id: 2, name: 'sally jones', age: 32},
 *   {id: 3, name: 'john doe', age: 28}
 * ]
 *
 * // returns [{id: 3, name: 'john doe', age: 28}, {id: 1, name: 'john smith', age: 24}]
 * SearchSort(data, 'john', sortColumn)
 *
 * // returns [{id: 1, name: 'john smith', age: 24}]
 * SearchSort(data, 'john 24', sortColumn)
 */
export const SearchSort = <T>(arrayTable: T[], search: string, sortColumn: ISortColumn): T[] => {
	return SortColumns(SearchRows(arrayTable, search), sortColumn)
}
