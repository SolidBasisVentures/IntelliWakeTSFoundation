import {ToArray} from './Functions'

export type TImporterDefinition<HEADERS extends readonly string[]> = {
	headers: HEADERS
	aliases?: Partial<Record<HEADERS[number], readonly string[]>>
	required?: readonly HEADERS[number][]
	descriptions?: Partial<Record<HEADERS[number], string>>
	examples?: Partial<Record<HEADERS[number], readonly string[]>>
	constraints?: Partial<Record<HEADERS[number], 'integer' | 'decimal' | ((val: unknown) => unknown)>>
}

export class Importer<HEADERS extends readonly string[]> {
	private readonly definition: TImporterDefinition<HEADERS>
	private readonly csv: string

	constructor(
		definition: TImporterDefinition<HEADERS>, csv: string
	) {
		this.definition = definition
		this.csv = csv
	}

	public RowHeaderIncludes(headerRow: readonly string[], headerName: string | readonly string[]) {
		const headerNames = ToArray(headerName).map(val => val.toLowerCase().trim())
		if (!headerNames.length) return false

		return headerRow.some(hr => headerNames.includes(hr.toLowerCase().trim()))
	}
}
