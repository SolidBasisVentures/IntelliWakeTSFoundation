import {CleanNumber} from './Functions'

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
	if (!(+length > 0)) {
		return []
	}
	
	const current_adjusted = +current < 1 ? 1 : +current > +length ? +length : +current
	const spread_adjusted = +current < +spread || +current > +length - +spread ? +spread : Math.ceil(+spread / 2)
	
	let left = +current_adjusted - +spread_adjusted,
		right = +current_adjusted + +spread_adjusted,
		range: number[] = [],
		rangeWithNull: (number | null)[] = [],
		l
	
	for (let i = 1; i <= +length; i++) {
		if (i === 1 || i === +length || (i >= left && i <= right)) {
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

export type TSortColumnToBottom = null | 'string' | 'number' | 'null' | 'timestamptz' | 'date'

/**
 * An interface that defines a primary and secondary sort.
 *
 * Use SortColumnUpdate() to automatically move the primary sort to the secondary
 */
export interface ISortColumn<T = Record<string, any>> {
	primarySort: keyof T
	primaryAscending: boolean
	primaryEmptyToBottom: TSortColumnToBottom
	secondarySort: keyof T | null
	secondaryAscending: boolean
	secondaryEmptyToBottom: TSortColumnToBottom
}

export const initialSortColumn: Omit<ISortColumn<any>, 'primarySort'> = {
	primaryAscending: true,
	primaryEmptyToBottom: null,
	secondarySort: null,
	secondaryAscending: true,
	secondaryEmptyToBottom: null
}

export type TFindIsActive = boolean | null

/**
 * A structure to pass to the server in an API REQUEST to tell it how to walk through pages of data.
 *
 * page = What page of data to retrieve
 * search = A search string if any
 * sortColumns = Tells the server how to sort the data
 * active = Tells the server whether to find active, inactive or all items
 * filterValues = Other filter data (of type T) to pass to the structure to limit result sets (e.g. customer_id = 1 for all items that match customer 1)
 *
 * IFilterSortPaginatorReturn should be in the RESPONSE of the API to tell the app about the data it received (e.g. how many pages there are, etc.)
 */
export interface IPaginatorRequest<T = Record<string, any>> {
	page: number
	countPerPage: number
	search: string
	sortColumns: ISortColumn<T>
	active: TFindIsActive
	filterValues: T
}

export const initialFilterSortPaginator: IPaginatorRequest<any> = {
	page: 1,
	countPerPage: 50,
	search: '',
	sortColumns: {...initialSortColumn, primarySort: ''},
	active: true,
	filterValues: {}
}

/**
 * A structure returned in an API RESPONSE that tells the app what kind of data the counts found.
 *
 * page = The actual page returned, which may be different than the page requested if fewer pages exist than the page that was requested.
 * pageCount = The total number of pages there would be based on the count of rows found
 * rowCount = The total number of rows found
 * countPerPage = How many rows make up a page
 * currentOffset = More used by the database, but this would be the offset (e.g. 51 on the second page of a set that had CountPerPage = 50 and RowCount > 50)
 */
export interface IPaginatorResponse<T = Record<string, any>> {
	page: number
	pageCount: number
	rowCount: number
	countPerPage: number
	currentOffset: number
	rows: T[]
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
export const SortColumnUpdate = <T = Record<string, any>>(
	columnToSort: keyof T,
	sortColumn: ISortColumn<T>,
	firstClickAscending: boolean = true,
	emptyToBottom: TSortColumnToBottom = null
): ISortColumn<T> => {
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
export const SortColumns = <T = Record<string, any>>(arrayTable: T[], sortColumn: ISortColumn<T>): T[] => {
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
					a[sortColumn.secondarySort as any] ?? null,
					b[sortColumn.secondarySort as any] ?? null,
					sortColumn.secondaryAscending,
					sortColumn.secondaryEmptyToBottom
				))
	)
}

const isEmpty = (val: any) => val === null || val === undefined || val === ''

export const SortIndexNull = <T>(beforeValue: T | null | undefined, afterValue: T | null | undefined, indexes: T[], emptyTo: 'Top' | 'Bottom' = 'Top'): number | null => {
	const verboseConsole = false //!!emptyTo
	
	if ((beforeValue ?? null) === (afterValue ?? null)) {
		if (verboseConsole) console.log('Sames', beforeValue, afterValue)
		return null
	}
	
	if (!afterValue) {
		if (verboseConsole) console.log('Before Empty', beforeValue, afterValue)
		
		return emptyTo === 'Top' ? -1 : 1
	}
	if (!beforeValue) {
		if (verboseConsole) console.log('After Empty', beforeValue, afterValue)
		
		return emptyTo === 'Top' ? 1 : -1
	}
	
	return indexes.indexOf(beforeValue) - indexes.indexOf(afterValue)
}

export const SortIndex = <T>(beforeValue: T | null | undefined, afterValue: T | null | undefined, indexes: T[], emptyTo: 'Top' | 'Bottom' = 'Top'): number =>
	SortIndexNull(beforeValue, afterValue, indexes, emptyTo) ?? 0

/**
 * Returns a case-insensitive sort number of the .sort(a, b) function, or null if values are equal.  Handles booleans (false comes BEFORE true), numbers (including currency and percentages), and case-insensitive strings.
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
	const verboseConsole = false //!!emptyTo
	
	if (beforeValue === afterValue) {
		if (verboseConsole) console.log('Sames', beforeValue, afterValue)
		return null
	}
	
	if (!!emptyTo) {
		if (isEmpty(beforeValue) && !isEmpty(afterValue)) {
			if (verboseConsole) console.log('Before Empty', beforeValue, afterValue)
			
			if (typeof afterValue === 'boolean') return emptyTo === 'Top' ? 1 : -1
			return emptyTo === 'Top' ? -1 : 1
		}
		if (isEmpty(afterValue) && !isEmpty(beforeValue)) {
			if (verboseConsole) console.log('After Empty', beforeValue, afterValue)
			
			if (typeof beforeValue === 'boolean') return emptyTo === 'Top' ? -1 : 1
			return emptyTo === 'Top' ? 1 : -1
		}
	}
	
	if (typeof beforeValue === 'boolean' && typeof afterValue === 'boolean') {
		return (beforeValue ? 1 : 0) - (afterValue ? 1 : 0)
	}
	
	const beforeNumber = CleanNumber(beforeValue, undefined, true)
	const afterNumber = CleanNumber(afterValue, undefined, true)
	
	if (!isNaN(beforeNumber) && !isNaN(afterNumber)) {
		if (verboseConsole) console.log('Numbers', beforeValue, beforeNumber, afterValue, afterNumber)
		
		return beforeNumber - afterNumber
	}
	
	if (verboseConsole) console.log('Strings', beforeValue, afterValue, ((beforeValue ?? '').toString()).localeCompare((afterValue ?? '').toString(), undefined, {sensitivity: 'base'}))
	
	return ((beforeValue ?? '').toString()).localeCompare((afterValue ?? '').toString(), undefined, {sensitivity: 'base'})
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
 * Sorts the provided array with a "sort_order" column and re-defines the increments
 *
 * @param items
 * @param sortIncrement
 * @constructor
 */
export const ReSortOrder = <T extends {[key: string]: any, sort_order: number}>(items: T[], sortIncrement = 10): T[] => {
	let newSort = 0
	
	return items.sort((a, b) => SortCompare(a.sort_order, b.sort_order)).map(item => ({
		...item,
		sort_order: newSort += sortIncrement
	}), [])
}


/**
 * Returns the sort value comparing the before and after as it relates to the order of the array.
 *
 * @example
 * [
		{id: 1, name: 'One'},
		{id: 2, name: 'Two'},
		{id: 3, name: 'Three'},
		{id: 4, name: 'Four'},
		{id: 5, name: 'Five'}
	]
 .sort((a, b) =>
 		SortPerArray(a.id, b.id, [4, 5, 3, 2, 1])) = [
		{id: 4, name: 'Four'},
		{id: 5, name: 'Five'},
		{id: 3, name: 'Three'},
		{id: 2, name: 'Two'},
 		{id: 1, name: 'One'}
]
 */
export const SortPerArray = <T>(beforeValue: T, afterValue: T, order: T[], emptyTo: 'Top' | 'Bottom' = 'Top'): number => {
	if (order.indexOf(beforeValue) < 0) {
		if (order.indexOf(afterValue) < 0) {
			return SortCompare(beforeValue, afterValue)
		} else {
			return emptyTo === 'Top' ? -1 : 1
		}
	} else {
		if (order.indexOf(afterValue) < 0) {
			return emptyTo === 'Top' ? 1 : -1
		}
	}
	
	if (isEmpty(beforeValue)) {
		if (isEmpty(afterValue)) {
			return 0
		} else {
			return emptyTo === 'Top' ? -1 : 1
		}
	} else {
		if (isEmpty(afterValue)) {
			return emptyTo === 'Top' ? 1 : -1
		} else {
			if (beforeValue === afterValue) return 0
			
			return order.indexOf(beforeValue) - order.indexOf(afterValue)
		}
	}
}

const SortColumnResult = (
	valueA: any,
	valueB: any,
	isAscending: boolean,
	emptyToBottom: TSortColumnToBottom
): number => SortCompare(isAscending ? valueA : valueB, isAscending ? valueB : valueA, !!emptyToBottom ? isAscending ? 'Bottom' : 'Top' : undefined)
// {
// 	if (!!emptyToBottom) {
// 		if (!valueA && !!valueB) return 1
// 		if (!!valueA && !valueB) return -1
// 	}
//
// 	const numbA = CleanNumber(valueA)
// 	const numbB = CleanNumber(valueB)
//
// 	if (isNaN(numbA ?? 0) || isNaN(numbB ?? 0)) {
// 		return (valueA ?? '').localeCompare(valueB ?? '', undefined, {sensitivity: 'base'}) * (isAscending ? 1 : -1)
// 	}
//
// 	return (numbA - numbB) * (isAscending ? 1 : -1)
// }

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
 * Converts multiple elements into a single string
 *
 * @example
 * TermsToSearch(['One ', null, 'Two '])
 * // returns 'One Two'
 */
export const TermsToSearch = (terms: string | (string | null | undefined)[] | null | undefined, spacer = ' ', toLowerCase = true): string => {
	if (!terms) return ''
	
	let search: string
	
	if (!Array.isArray(terms)) {
		search = terms.trim()
	} else {
		search = terms
			.map(term => (term ?? '').trim())
			.filter(item => !!item)
			.join(spacer)
			.trim()
	}
	
	if (toLowerCase) return search.toLowerCase()
	
	return search
}

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
export const ObjectContainsSearchTerms = (checkObject: object | null | undefined | object[], searchTerms: string[]): boolean => {
	if (searchTerms.length === 0) return true
	
	if (!checkObject) return false
	
	if (typeof checkObject === 'object' && (checkObject as any).type?.toString().includes('react.')) return false
	
	return searchTerms.every((term: string) => {
		return Object.keys(checkObject).some((column) => {
			const columnValue = (checkObject as any)[column]
			const typeofColumn = typeof columnValue
			
			if (!Array.isArray(columnValue) && ['number', 'bigint', 'string'].includes(typeofColumn)) {
				return columnValue.toString().toLowerCase().includes(term.toLowerCase())
			}
			
			if (Array.isArray(columnValue)) {
				for (const obj of columnValue) {
					if (ObjectContainsSearchTerms(obj, [term])) return true
				}
			}
			
			if (typeofColumn === 'object') {
				return ObjectContainsSearchTerms(columnValue, [term])
			}
			
			return false
		})
	})
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
export const SearchSort = <T>(arrayTable: T[], search: string, sortColumn: ISortColumn<T>): T[] => {
	return SortColumns(SearchRows(arrayTable, search), sortColumn)
}
