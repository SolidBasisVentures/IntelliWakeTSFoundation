import {CleanNumber} from './StringManipulation'

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
export const SearchTerms = (search: string | null | undefined, toLowerCase = true): string[] =>
	(search ?? '')
		.trim()
		.split(/(\s+)/)
		.map((term) => (toLowerCase ? term.trim().toLowerCase() : term.trim()))
		.filter((term) => !!term)
export const StringContainsSearchTerms = (value: string | null | undefined, searchTerms: string[]): boolean => {
	if (searchTerms.length === 0) return true
	
	if (!value) return false
	
	return searchTerms.every((term) => value.includes(term))
}
export const StringContainsSearch = (value: string | null | undefined, search: string | null | undefined): boolean => {
	if (!search) return true
	
	if (!value) return false
	
	const searchTerms = SearchTerms(search)
	
	return StringContainsSearchTerms(value, searchTerms)
}
export const ObjectContainsSearchTerms = (object: any | null | undefined, searchTerms: string[]): boolean => {
	if (searchTerms.length === 0) return true
	
	if (!object) return false
	
	return searchTerms.every((term) =>
		Object.keys(object).some((column) => (object[column] ?? '').toString().toLowerCase().includes(term))
	)
}
export const ObjectContainsSearch = (object: any | null | undefined, search: string | null | undefined): boolean => {
	if (!search) return true
	
	if (!object) return false
	
	const searchTerms = SearchTerms(search)
	
	return ObjectContainsSearchTerms(object, searchTerms)
}
export const SearchRows = <T>(arrayTable: T[], search: string): T[] => {
	const searchTerms = SearchTerms(search)
	
	if (searchTerms.length === 0) {
		return arrayTable
	}
	
	return (arrayTable ?? []).filter((arrayRow: any) => ObjectContainsSearchTerms(arrayRow, searchTerms))
}
export const SearchRow = (searchItem: any, search: string): boolean => {
	const searchTerms = SearchTerms(search)
	
	if (searchTerms.length === 0) {
		return true
	}
	
	return ObjectContainsSearchTerms(searchItem, searchTerms)
}
export const SearchSort = <T>(arrayTable: T[], search: string, sortColumn: ISortColumn): T[] => {
	return SortColumns(SearchRows(arrayTable, search), sortColumn)
}
