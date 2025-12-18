import {CleanNumberNull, IsOn} from './Functions'
import {DateISO, DateOnly, DateOnlyNull, NowISOString, TimeOnly} from './DateManager'

export type TImporterTypescriptType = {
	string: string
	number: number
	integer: number
	date: string
	time: string
	datetime: string
	boolean: boolean
	custom: string
}

export type TImporterColumnDefinition<T extends keyof TImporterTypescriptType = keyof TImporterTypescriptType> = {
	columnType: T
	description?: string
	length?: number
	decimals?: number
	customConvertor?: (value: string, row: string[]) => any
	alternateNames?: string[]
	required?: boolean
	sampleData?: string | string[]
	errorMessage?: (value: string, row: string[]) => string | null
	warningMessage?: (value: string, row: string[]) => string | null
}

/**
 * Defines the structure of column definitions for an importer, where each field is mapped to its specific column definition.
 *
 * Usage: const definition = {
 *   key: {columnType: 'string'}
 * } satisfies TImporterColumnDefinitions<any>
 */
export type TImporterColumnDefinitions<FIELD extends string> = {
	[K in FIELD]: TImporterColumnDefinition<keyof TImporterTypescriptType>
}

export type TImportDataToArrayOptions = {
	alternateNames?: Record<string, string[]>
}

export type TImportDataMessage<T extends TImporterColumnDefinitions<Extract<keyof T, string>>> = {
	row: number
	column: keyof T
	message: string
}

export function ImporterDataToArray<T extends TImporterColumnDefinitions<Extract<keyof T, string>>>(
	definitions: T,
	data: string[][],
	options?: TImportDataToArrayOptions
): {
	results: {
		[K in keyof T]: T[K]['required'] extends true
			? TImporterTypescriptType[T[K]['columnType']]
			: TImporterTypescriptType[T[K]['columnType']] | null
	}[]
	warnings: TImportDataMessage<T>[]
	errors: TImportDataMessage<T>[]
	failedRequireds: TImportDataMessage<T>[]
} {
	if (data.length < 2) return {results: [], warnings: [], errors: [], failedRequireds: []}

	const headers = data[0]
	const rows = data.slice(1)
	const warnings: TImportDataMessage<T>[] = []
	const errors: TImportDataMessage<T>[] = []
	const failedRequireds: TImportDataMessage<T>[] = []

	// Map column index to FIELD key
	const colMap: {index: number; field: keyof T}[] = []

	for (const [field, def] of Object.entries(definitions) as [keyof T, TImporterColumnDefinition][]) {
		const index = headers.findIndex((h) => {
			const header = h.trim().toLowerCase()

			// Check options.alternateNames (Record<string, string[]>)
			if (options?.alternateNames) {
				for (const [altKey, altValues] of Object.entries(options.alternateNames)) {
					const altKeyLower = altKey.trim().toLowerCase()
					// Does the header match one of the values in the options record?
					if (altValues.some((v) => v.trim().toLowerCase() === header)) {
						// Does the key of that record match the field name or its alternate names?
						if (
							altKeyLower === (field as string).toLowerCase() ||
							def.alternateNames?.some((alt) => alt.trim().toLowerCase() === altKeyLower)
						) {
							return true
						}
					}
				}
			}

			return (
				header === (field as string).toLowerCase() ||
				def.alternateNames?.some((alt) => alt.trim().toLowerCase() === header)
			)
		})
		if (index !== -1) {
			colMap.push({index, field})
		}
	}

	const results = rows.map((row, idx) => {
		const reportRow = idx + 1

		const record = {} as any

		for (const [field, def] of Object.entries(definitions) as [keyof T, TImporterColumnDefinition][]) {
			const colMatch = colMap.find((c) => c.field === field)
			const rawValue = colMatch !== undefined ? row[colMatch.index] ?? '' : ''

			if (def.warningMessage) {
				const message = def.warningMessage(rawValue, row)
				if (message) {
					warnings.push({
						row: reportRow,
						column: field,
						message
					})
				}
			}

			if (def.errorMessage) {
				const message = def.errorMessage(rawValue, row)
				if (message) {
					errors.push({
						row: reportRow,
						column: field,
						message
					})
				}
			}

			if (def.customConvertor) {
				record[field] = def.customConvertor(rawValue, row)

				if (def.required && !record[field])
					failedRequireds.push({
						row: reportRow,
						column: field,
						message: `Required field ${field.toString()} is empty`
					})
			} else {
				switch (def.columnType) {
					case 'number':
						record[field] = CleanNumberNull(rawValue, def.decimals ?? 2)
						if (record[field] === null && def.required) {
							failedRequireds.push({
								row: reportRow,
								column: field,
								message: `Required field ${field.toString()} is empty`
							})
							record[field] = 0
						}
						break
					case 'integer':
						record[field] = CleanNumberNull(rawValue)
						if (record[field] === null && def.required) {
							failedRequireds.push({
								row: reportRow,
								column: field,
								message: `Required field ${field.toString()} is empty`
							})
							record[field] = 0
						}
						break
					case 'boolean':
						if (!rawValue && def.required) {
							failedRequireds.push({
								row: reportRow,
								column: field,
								message: `Required field ${field.toString()} is empty`
							})
							record[field] = false
						} else {
							record[field] = IsOn(rawValue)
						}
						break
					case 'date':
						record[field] = DateOnlyNull(rawValue)
						if (record[field] === null && def.required) {
							failedRequireds.push({
								row: reportRow,
								column: field,
								message: `Required field ${field.toString()} is empty`
							})
							record[field] = DateOnly('now')
						}
						break
					case 'time':
						record[field] = TimeOnly(rawValue)
						if (record[field] === null && def.required) {
							failedRequireds.push({
								row: reportRow,
								column: field,
								message: `Required field ${field.toString()} is empty`
							})
							record[field] = TimeOnly('now')
						}
						break
					case 'datetime':
						record[field] = DateISO(rawValue)
						if (record[field] === null && def.required) {
							failedRequireds.push({
								row: reportRow,
								column: field,
								message: `Required field ${field.toString()} is empty`
							})
							record[field] = NowISOString()
						}
						break
					default:
						if (!rawValue) {
							if (def.required) {
								failedRequireds.push({
									row: reportRow,
									column: field,
									message: `Required field ${field.toString()} is empty`
								})
								record[field] = ''
							} else {
								record[field] = null
							}
						} else {
							if (def.length) {
								record[field] = rawValue.toString().substring(0, def.length)
							} else {
								record[field] = rawValue
							}
						}
						break
				}
			}
		}

		return record
	})

	return {results, warnings, errors, failedRequireds}
}
