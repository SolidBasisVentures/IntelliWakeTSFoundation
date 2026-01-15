import {CleanNumber, GreaterNumber, ObjectKeys, OmitProperty} from './Functions'

/**
 * Returns an array of numbers to be used for pagination links.
 *
 * @param {number} current - The current page number.
 * @param {number} length - The total length of pages.
 * @param {number} [spread=2] - The spread of pages to include on either side of the current page.
 *
 * @returns {(number | null)[]} An array of pages. The pages outside of the spread will have gaps represented by nulls.
 *
 * @example
 * PagesForRange(1, 10)
 * // returns [1, 2, 3, null, 10]
 *
 * PagesForRange(9, 10)
 * // returns [1, null, 7, 8, 9, 10]
 *
 * PagesForRange(1, 10, 3)
 * // returns [1, 2, 3, 4, null, 10]
 *
 * PagesForRange(50, 100)
 * // returns [1, null, 49, 50, 51, null, 100]
 *
 * @remarks If the length is not greater than 0, the function will return an empty array.
 * If the current page is less than 1 it's set to 1. If it's greater than length, then it's set to be equal to length.
 * The spread is either equal to the given spread if it doesn't exceed the length or half, if it exceeds.
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

/**
 * Represents a sorting column type to the bottom for SQL statements.  This helps the SQL generator know how to handlesorting conditions
 * @typedef {null | 'string' | 'number' | 'null' | 'timestamptz' | 'date'} TSortColumnToBottom
 *
 * @example
 * let nameSortOrder: TSortColumnToBottom = 'string';
 * let ageSortOrder: TSortColumnToBottom = 'number';
 *
 * @remarks This type can be used to define the type of column used for sorting operations.
 */
export type TSortColumnToBottom = null | 'string' | 'number' | 'null' | 'timestamptz' | 'date'

/**
 * Interface representing the sort details of a column.
 *
 * @typeParam T - An indexable type, defaulting to an object with string keys mapped to any value.
 *
 * @property {keyof T} primarySort - The primary key used for sorting.
 * @property {boolean} primaryAscending - Whether the primary sorting is in ascending order.
 * @property {TSortColumnToBottom} primaryEmptyToBottom - The sort order of the primary column with empty values.
 * @property {keyof T | null} secondarySort - The secondary key used for sorting.
 * @property {boolean} secondaryAscending - Whether the secondary sorting is in ascending order.
 * @property {TSortColumnToBottom} secondaryEmptyToBottom - The sort order of the secondary column with empty values.
 *
 * @example
 *  const sortColumn: ISortColumn = {
 *      primarySort: 'name',
 *      primaryAscending: true,
 *      primaryEmptyToBottom: 'string',
 *      secondarySort: 'age',
 *      secondaryAscending: false,
 *      secondaryEmptyToBottom: 'number',
 *  };
 *
 * @remarks
 * This interface can be used to provide better structure and typing for sorting operations.
 * Note: Use with initialSortColumn to create an instance, such as {...initialSortColumn, primarySort: 'name'}
 * Be aware that the primarySort is required, as initialSortColumn does not contain this value
 */
export interface ISortColumn<T = Record<string, any>> {
	primarySort: keyof T
	primaryAscending: boolean
	primaryEmptyToBottom: TSortColumnToBottom
	secondarySort: keyof T | null
	secondaryAscending: boolean
	secondaryEmptyToBottom: TSortColumnToBottom
}

/**
 * Omit<ISortColumn, 'primarySort'>
 */
export const initialSortColumn: any = {
	primaryAscending: true,
	primaryEmptyToBottom: null,
	secondarySort: null as any,
	secondaryAscending: true,
	secondaryEmptyToBottom: null
}

/**
 * Type that allows for showing all items (null), active items (true), or inactive items (false)
 */
export type TFindIsActive = boolean | null

/**
 * Function to run in an [array].filter() to determine whether or not to show the item
 * @param findIsActive
 * @param isActive
 * @constructor
 */
export const FindIsActive = (isActive: boolean, findIsActive: TFindIsActive): boolean =>
	findIsActive === null || isActive === findIsActive

/**
 * Converts Find Is Active type to a string
 * @param findIsActive
 * @constructor
 */
export const FindIsActiveString = (findIsActive: TFindIsActive): string => {
	switch (findIsActive) {
		case true:
			return 'true'
		case false:
			return 'false'
		default:
			return 'null'
	}
}

/**
 * Converts string to Find Is Active type
 * @param findIsActiveString
 * @constructor
 */
export const StringFindIsActive = (findIsActiveString: string): TFindIsActive => {
	switch (findIsActiveString) {
		case 'true':
			return true
		case 'false':
			return false
		default:
			return null
	}
}

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
export interface IPaginatorRequest<SORT = Record<string, any>, FILTER = Record<string, any>> {
	page: number
	countPerPage: number
	search: string
	sortColumns: ISortColumn<SORT>
	active: TFindIsActive
	filterValues: FILTER
}

/**
 *
 */
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
 * page = The actual page returned, which may be different from the page requested if fewer pages exist than the page that was requested.
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
 * Updates the primary sort key of a sort column object, and returns the updated object.
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
	return [
		...arrayTable.sort((a: any, b: any) =>
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
	]
}

/**
 * Checks if a value is empty.
 *
 * @param {*} val - The value to check for emptiness.
 * @returns {boolean} True if the value is empty, false otherwise.
 */
const isEmpty = (val: any) => val === null || val === undefined || val === ''

/**
 * Checks whether a value is null or undefined
 *
 * @param {*} val - The value to check
 * @returns {boolean} - Returns true if the value is null or undefined, else false.
 */
export const isNullUndefined = (val: any) => val === null || val === undefined

/**
 *
 * @param beforeValue
 * @param afterValue
 * @param indexes
 * @param emptyTo
 * @constructor
 */
export const SortIndexNull = <T>(
	beforeValue: T | null | undefined,
	afterValue: T | null | undefined,
	indexes: T[],
	emptyTo: 'Top' | 'Bottom' = 'Top'
): number | null => {
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

/**
 *
 * @param beforeValue
 * @param afterValue
 * @param indexes
 * @param emptyTo
 * @constructor
 */
export const SortIndex = <T>(
	beforeValue: T | null | undefined,
	afterValue: T | null | undefined,
	indexes: T[],
	emptyTo: 'Top' | 'Bottom' = 'Top'
): number => SortIndexNull(beforeValue, afterValue, indexes, emptyTo) ?? 0

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
export const SortCompareNull = (
	beforeValue: any,
	afterValue: any,
	emptyToOrArray: null | 'Top' | 'Bottom' | 'Top0' | 'Bottom0' | any[] = null,
	arrayOrder: null | any[] = null
): number | null => {
	const verboseConsole = false //!!emptyTo

	if (beforeValue === afterValue) {
		if (verboseConsole) console.log('Sames', beforeValue, afterValue)
		return null
	}

	if (!!emptyToOrArray) {
		if (Array.isArray(emptyToOrArray)) {
			return SortPerArray(beforeValue, afterValue, emptyToOrArray)
		} else if (Array.isArray(arrayOrder)) {
			return SortPerArray(beforeValue, afterValue, arrayOrder, emptyToOrArray)
		} else if (emptyToOrArray.endsWith('0')) {
			if (!beforeValue && !!afterValue) {
				if (verboseConsole) console.log('Before Empty', beforeValue, afterValue)

				if (typeof afterValue === 'boolean') return emptyToOrArray === 'Top0' ? 1 : -1
				return emptyToOrArray === 'Top0' ? -1 : 1
			}
			if (!afterValue && !!beforeValue) {
				if (verboseConsole) console.log('After Empty', beforeValue, afterValue)

				if (typeof beforeValue === 'boolean') return emptyToOrArray === 'Top0' ? -1 : 1
				return emptyToOrArray === 'Top0' ? 1 : -1
			}
		} else {
			if (isEmpty(beforeValue) && !isEmpty(afterValue)) {
				if (verboseConsole) console.log('Before Empty', beforeValue, afterValue)

				if (typeof afterValue === 'boolean') return emptyToOrArray === 'Top' ? 1 : -1
				return emptyToOrArray === 'Top' ? -1 : 1
			}
			if (isEmpty(afterValue) && !isEmpty(beforeValue)) {
				if (verboseConsole) console.log('After Empty', beforeValue, afterValue)

				if (typeof beforeValue === 'boolean') return emptyToOrArray === 'Top' ? -1 : 1
				return emptyToOrArray === 'Top' ? 1 : -1
			}
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

	if (verboseConsole)
		console.log(
			'Strings',
			beforeValue,
			afterValue,
			(beforeValue ?? '')
				.toString()
				.localeCompare((afterValue ?? '').toString(), undefined, {sensitivity: 'base'})
		)

	return (beforeValue ?? '').toString().localeCompare((afterValue ?? '').toString(), undefined, {sensitivity: 'base'})
}

/**
 * Returns a case-insensitive sort number of the .sort(a, b) function, or 0 if values are equal.  Handles booleans, numbers (including currency and percentages), and case-insensitive strings.
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
export const SortCompare = (
	beforeValue: any,
	afterValue: any,
	emptyToOrArray: null | 'Top' | 'Bottom' | 'Top0' | 'Bottom0' | any[] = null,
	arrayOrder: null | any[] = null
): number => {
	return SortCompareNull(beforeValue, afterValue, emptyToOrArray, arrayOrder) ?? 0
}

export type TSortComparesItem = [
	beforeValue: any,
	afterValue: any,
	emptyTo?: null | 'Top' | 'Bottom' | 'Top0' | 'Bottom0' | any[]
]

/**
 * Sorts and compares values.
 *
 * @param {TSortComparesItem|TSortComparesItem[]} values - The values to be sorted and compared.
 * @returns {number} - The result of the comparison.
 *
 * @example
 * The following examples sorts first by name, then if those are the same, sorts by id
 * [
 * 		{id: 1, name: 'AAA', prioritized: false},
 * 		{id: 2, name: 'ZZZ', prioritized: false},
 * 		{id: 3, name: 'AAA', prioritized: true},
 * 		{id: 4, name: 'BBB', prioritized: false}
 * 	]
 *  .sort((a, b) =>
 *  		SortCompares([[a.name, b.name], [a.id, b.id]])) = [
 * 		{ id: 1, name: 'AAA', prioritized: false },
 * 		{ id: 3, name: 'AAA', prioritized: true },
 * 		{ id: 4, name: 'BBB', prioritized: false },
 * 		{ id: 2, name: 'ZZZ', prioritized: false }
 * 	]
 */
export function SortCompares(values: TSortComparesItem | TSortComparesItem[]) {
	if (Array.isArray(values.at(0))) {
		for (const value of values) {
			const result = SortCompare(value[0], value[1], value[2], value[3])
			if (result) return result
		}

		return 0
	} else {
		return SortCompare(values[0], values[1], values[2] as any, values[3])
	}
}

/**
 * Returns a case-insensitive sort number of the .sort(a, b) function, or null if values are equal specifically for strings that likely contain version that need to be sorted as [1.1, 1.2, 1.10] instead of [1.1, 1.10, 1.2]
 *
 * @example
 * [
		{id: 1, version: '1.1'},
		{id: 2, version: '1.10'},
		{id: 3, version: '1.2'}
	]
 .sort((a, b) =>
 		SortSplitItemsNull(a.version, b.version)) = [
		{id: 1, version: '1.1'},
		{id: 3, version: '1.2'},
		{id: 2, version: '1.10'}
 ]
 */
export const SortSplitItemsNull = (
	beforeValue: any,
	afterValue: any,
	split = '.',
	emptyTo: null | 'Top' | 'Bottom' | 'Top0' | 'Bottom0' = null
): number | null => {
	const beforeValues = (beforeValue ?? '').toString().split(split)
	const afterValues = (afterValue ?? '').toString().split(split)

	const highestCount = GreaterNumber(beforeValues.length, afterValues.length)

	for (let i = 0; i < highestCount; i++) {
		const sortResult = SortCompare(beforeValues[i], afterValues[i], emptyTo)

		if (sortResult !== 0) return sortResult
	}

	return null
}

/**
 * Returns a case-insensitive sort number of the .sort(a, b) function, or 0 if values are equal specifically for strings that likely contain version that need to be sorted as [1.1, 1.2, 1.10] instead of [1.1, 1.10, 1.2]
 *
 * @example
 * [
		{id: 1, version: '1.1'},
		{id: 2, version: '1.10'},
		{id: 3, version: '1.2'}
	]
 .sort((a, b) =>
 		SortSplitItems(a.version, b.version)) = [
		{id: 1, version: '1.1'},
		{id: 3, version: '1.2'},
		{id: 2, version: '1.10'}
 ]
 */
export const SortSplitItems = (
	beforeValue: any,
	afterValue: any,
	split = '.',
	emptyTo: null | 'Top' | 'Bottom' | 'Top0' | 'Bottom0' = null
): number => {
	return SortSplitItemsNull(beforeValue, afterValue, split, emptyTo) ?? 0
}

/**
 * Sorts the provided array with a "sort_order" column and re-defines the increments
 *
 * @param items
 * @param sortIncrement
 * @constructor
 */
export const ReSortOrder = <
	T extends {
		[key: string]: any
		sort_order: number
	}
>(
	items: T[],
	sortIncrement = 10
): T[] => {
	let newSort = 0

	return items
		.sort((a, b) => SortCompare(a.sort_order, b.sort_order))
		.map(
			(item) => ({
				...item,
				sort_order: (newSort += sortIncrement)
			}),
			[]
		)
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
export const SortPerArrayNull = <T>(
	beforeValue: T,
	afterValue: T,
	order: T[],
	emptyTo: 'Top' | 'Bottom' | 'Top0' | 'Bottom0' = 'Top'
): number | null => {
	if (beforeValue == afterValue) return null

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
export const SortPerArray = <T>(
	beforeValue: T,
	afterValue: T,
	order: T[],
	emptyTo: 'Top' | 'Bottom' | 'Top0' | 'Bottom0' = 'Top'
): number => SortPerArrayNull(beforeValue, afterValue, order, emptyTo) ?? 0

const SortColumnResult = (valueA: any, valueB: any, isAscending: boolean, emptyToBottom: TSortColumnToBottom): number =>
	SortCompare(
		isAscending ? valueA : valueB,
		isAscending ? valueB : valueA,
		!!emptyToBottom ? (isAscending ? 'Bottom0' : 'Top0') : undefined
	)
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
export const SearchTerms = (
	search: string | null | undefined,
	toLowerCase = true,
	limit: number | null = 8
): string[] =>
	(search ?? '')
		.trim()
		.split(/(\s+)/)
		.map((term) => (toLowerCase ? term.trim().toLowerCase() : term.trim()))
		.filter((term) => !!term)
		.filter((_, idx) => !limit || idx < limit)

/**
 * Converts multiple elements into a single string
 *
 * @example
 * TermsToSearch(['One ', null, 'Two '])
 * // returns 'One Two'
 */
export const TermsToSearch = (
	terms: string | (string | null | undefined)[] | null | undefined,
	spacer = ' ',
	toLowerCase = true
): string => {
	if (!terms) return ''

	let search: string

	if (!Array.isArray(terms)) {
		search = terms.trim()
	} else {
		search = terms
			.map((term) => (term ?? '').trim())
			.filter((item) => !!item)
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
 *
 */
export interface ISearchOptions<T extends object> {
	matchSomeTerm?: boolean
	matchFromTerm?: number
	matchUntilTerm?: number
	limit?: number
	page?: number
	searchKeys?: (keyof T)[]
	excludeSearchKeys?: (keyof T)[]
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
export const ObjectContainsSearchTerms = <T extends object>(
	checkObject: T | null | undefined | T[],
	searchTerms: string[],
	options?: ISearchOptions<T>
): boolean => {
	if (searchTerms.length === 0) return true

	if (!checkObject) return false

	if (typeof checkObject === 'object' && (checkObject as any).type?.toString().includes('react.')) return false

	const match = (term: string) => {
		return ObjectKeys(checkObject)
			.filter(
				(key) =>
					!options?.excludeSearchKeys?.some((esk) => esk === key) &&
					(!options?.searchKeys || options?.searchKeys?.some((sk) => sk === key))
			)
			.some((column) => {
				const columnValue = (checkObject as any)[column]
				const typeofColumn = typeof columnValue

				if (!Array.isArray(columnValue) && ['number', 'bigint', 'string'].includes(typeofColumn)) {
					return columnValue.toString().toLowerCase().includes(term.toLowerCase())
				}

				if (Array.isArray(columnValue)) {
					for (const obj of columnValue) {
						if (
							ObjectContainsSearchTerms(
								obj,
								[term],
								!options ? options : OmitProperty(options, 'searchKeys', 'excludeSearchKeys')
							)
						)
							return true
					}
				}

				if (typeofColumn === 'object') {
					return ObjectContainsSearchTerms(
						columnValue,
						[term],
						!options ? options : OmitProperty(options, 'searchKeys', 'excludeSearchKeys')
					)
				}

				return false
			})
	}

	let useSearchTerms = searchTerms

	if (options?.matchUntilTerm !== undefined) {
		if (options?.matchFromTerm !== undefined) {
			if (options.matchFromTerm < options.matchUntilTerm)
				throw new Error(`Could not match terms from ${options.matchFromTerm} to ${options.matchUntilTerm}`)
			if (options.matchFromTerm + 1 > searchTerms.length) return false
			useSearchTerms = useSearchTerms.slice(options.matchFromTerm, options.matchUntilTerm + 1)
		} else {
			useSearchTerms = useSearchTerms.slice(0, options.matchUntilTerm + 1)
		}
	} else {
		if (options?.matchFromTerm !== undefined) {
			if (options.matchFromTerm + 1 > searchTerms.length) return false
			useSearchTerms = useSearchTerms.slice(options.matchFromTerm)
		}
	}

	return options?.matchSomeTerm ? useSearchTerms.some(match) : useSearchTerms.every(match)
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
export const ObjectContainsSearch = <T extends object>(
	object: T | null | undefined,
	search: string | null | undefined,
	options?: ISearchOptions<T>
): boolean => {
	if (!search) return true

	if (!object) return false

	const searchTerms = SearchTerms(search)

	return ObjectContainsSearchTerms(object, searchTerms, options)
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
export const SearchRows = <T extends object>(arrayTable: T[], search: string, options?: ISearchOptions<T>): T[] => {
	const searchTerms = SearchTerms(search)

	let limit = CleanNumber(options?.limit)

	if (searchTerms.length === 0 && !limit) {
		return arrayTable
	}

	let start = !options?.page ? 0 : CleanNumber(options.page - 1) * (limit ?? 0)

	return !limit
		? (arrayTable ?? []).filter((arrayRow: any) => ObjectContainsSearchTerms(arrayRow, searchTerms, options))
		: (arrayTable ?? []).reduce<T[]>((results, arrayRow: any, idx) => {
				if (idx < start || results.length >= limit) return results
				if (!searchTerms.length || ObjectContainsSearchTerms(arrayRow, searchTerms, options)) {
					return [...results, arrayRow]
				} else {
					return results
				}
		  }, [])
}

/**
 * Determines whether a search item object contains value from the search string.
 *
 * @example
 * // returns true
 * SearchRow({user: 'john doe', age: '24'}, 'john 24')
 */
export const SearchRow = <T extends object>(searchItem: T, search: string, options?: ISearchOptions<T>): boolean => {
	const searchTerms = SearchTerms(search)

	if (searchTerms.length === 0) {
		return true
	}

	return ObjectContainsSearchTerms(searchItem, searchTerms, options)
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
export const SearchSort = <T extends object>(
	arrayTable: T[],
	search: string,
	sortColumn: ISortColumn<T>,
	options?: ISearchOptions<T>
): T[] => {
	return !!options?.limit
		? SearchRows(SortColumns(arrayTable, sortColumn), search, options)
		: SortColumns(SearchRows(arrayTable, search, options), sortColumn)
}
