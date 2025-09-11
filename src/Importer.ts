import {ToArray} from './Functions'

export function RowHeaderIncludes(headerRow: readonly string[], headerName: string | readonly string[]) {
	const headerNames = ToArray(headerName).map(val => val.toLowerCase().trim())
	if (!headerNames.length) return false

	return headerRow.some(hr => headerNames.includes(hr.toLowerCase().trim()))
}
