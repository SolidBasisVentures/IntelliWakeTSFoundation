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
	includeRowsMissingRequireds?: boolean
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

	const warnings: TImportDataMessage<T>[] = []
	const errors: TImportDataMessage<T>[] = []
	const failedRequireds: TImportDataMessage<T>[] = []

	// Map column index to FIELD key
	let colMap: {index: number; field: keyof T}[] = []
	let headerRowIndex = -1

	// Look for the header row
	for (let i = 0; i < data.length; i++) {
		const potentialHeaders = data[i]
		const currentMap: {index: number; field: keyof T}[] = []

		for (const [field, def] of Object.entries(definitions) as [keyof T, TImporterColumnDefinition][]) {
			const index = potentialHeaders.findIndex((h) => {
				const header = h.trim().toLowerCase()

				if (options?.alternateNames) {
					for (const [altKey, altValues] of Object.entries(options.alternateNames)) {
						const altKeyLower = altKey.trim().toLowerCase()
						if (altValues.some((v) => v.trim().toLowerCase() === header)) {
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
				currentMap.push({index, field})
			}
		}

		if (currentMap.length > 0) {
			colMap = currentMap
			headerRowIndex = i
			break
		}
	}

	if (headerRowIndex === -1) return {results: [], warnings: [], errors: [], failedRequireds: []}

	const rows = data.slice(headerRowIndex + 1)

	const results: any[] = []

	rows.forEach((row, idx) => {
		const reportRow = idx + 1

		// Skip completely blank rows
		if (!options?.includeRowsMissingRequireds && row.every((cell) => !cell || cell.trim() === '')) {
			return
		}

		// Skip rows that are a repeat of the header row
		const headerRow = data[headerRowIndex]
		if (
			row.length === headerRow.length &&
			row.every((cell, i) => cell.trim().toLowerCase() === headerRow[i].trim().toLowerCase())
		) {
			return
		}

		const record = {} as any
		let rowHasMissingRequired = false
		const rowFailedRequireds: TImportDataMessage<T>[] = []
		const rowWarnings: TImportDataMessage<T>[] = []
		const rowErrors: TImportDataMessage<T>[] = []

		for (const [field, def] of Object.entries(definitions) as [keyof T, TImporterColumnDefinition][]) {
			const colMatch = colMap.find((c) => c.field === field)
			const rawValue = colMatch !== undefined ? row[colMatch.index] ?? '' : ''

			if (def.warningMessage) {
				const message = def.warningMessage(rawValue, row)
				if (message) {
					rowWarnings.push({
						row: reportRow,
						column: field,
						message
					})
				}
			}

			if (def.errorMessage) {
				const message = def.errorMessage(rawValue, row)
				if (message) {
					rowErrors.push({
						row: reportRow,
						column: field,
						message
					})
				}
			}

			if (def.customConvertor) {
				record[field] = def.customConvertor(rawValue, row)

				if (def.required && !record[field]) {
					rowHasMissingRequired = true
					rowFailedRequireds.push({
						row: reportRow,
						column: field,
						message: `Required field ${field.toString()} is empty`
					})
				}
			} else {
				switch (def.columnType) {
					case 'number':
						record[field] = CleanNumberNull(rawValue, def.decimals ?? 2)
						if (record[field] === null && def.required) {
							rowHasMissingRequired = true
							rowFailedRequireds.push({
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
							rowHasMissingRequired = true
							rowFailedRequireds.push({
								row: reportRow,
								column: field,
								message: `Required field ${field.toString()} is empty`
							})
							record[field] = 0
						}
						break
					case 'boolean':
						if (!rawValue && def.required) {
							rowHasMissingRequired = true
							rowFailedRequireds.push({
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
							rowHasMissingRequired = true
							rowFailedRequireds.push({
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
							rowHasMissingRequired = true
							rowFailedRequireds.push({
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
							rowHasMissingRequired = true
							rowFailedRequireds.push({
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
								rowHasMissingRequired = true
								rowFailedRequireds.push({
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

		if (rowHasMissingRequired && !options?.includeRowsMissingRequireds) {
			return
		}

		warnings.push(...rowWarnings)
		errors.push(...rowErrors)
		failedRequireds.push(...rowFailedRequireds)
		results.push(record)
	})

	return {results, warnings, errors, failedRequireds}
}

export function ArrayToImporterData<T extends TImporterColumnDefinitions<Extract<keyof T, string>>>(
	definitions: T,
	data?: Record<string, any>[]
): string[][] {
	const keys = Object.keys(definitions) as (keyof T)[]
	const headerRow = keys.map((key) => key.toString())
	const result: string[][] = [headerRow]

	if (data && data.length > 0) {
		// Process provided data
		for (const record of data) {
			const row: string[] = []

			for (const key of keys) {
				const def = definitions[key]
				let value = record[key as string]

				// If the primary key isn't in the record, check alternateNames
				if (value === undefined && def.alternateNames) {
					for (const alt of def.alternateNames) {
						if (record[alt] !== undefined) {
							value = record[alt]
							break
						}
					}
				}

				// Convert value to string, handling null/undefined
				if (value === null || value === undefined) {
					row.push('')
				} else if (typeof value === 'boolean') {
					row.push(value ? 'Y' : 'N')
				} else {
					row.push(value.toString())
				}
			}
			result.push(row)
		}
	} else {
		// Row 2: Descriptions
		const descriptionRow: string[] = []
		for (const key of keys) {
			const def = definitions[key]
			let desc = def.description ?? ''
			if (def.required) {
				desc = desc ? `${desc} (Required)` : '(Required)'
			}
			descriptionRow.push(desc)
		}
		result.push(descriptionRow)

		// Row 3: Sample data
		const sampleRow: string[] = []
		for (const key of keys) {
			const sample = definitions[key].sampleData
			if (Array.isArray(sample)) {
				sampleRow.push(sample[0]?.toString() ?? '')
			} else {
				sampleRow.push(sample?.toString() ?? '')
			}
		}
		result.push(sampleRow)
	}

	return result
}
