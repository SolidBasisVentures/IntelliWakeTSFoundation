import {CleanNumberNull, IsOn} from './Functions'
import {DateISO, DateOnly, DateOnlyNull, NowISOString, TimeOnly} from './DateManager'
import {ParseCSV} from './DataConstructs'

export type TDataImportProcessorTypescriptType = {
	string: string
	number: number
	integer: number
	date: string
	time: string
	datetime: string
	boolean: boolean
	custom: string
}

export type TDataImportProcessorColumnDefinition<
	T extends keyof TDataImportProcessorTypescriptType = keyof TDataImportProcessorTypescriptType
> = {
	columnType: T
	default?: string | null | ((row: string[]) => string | null)
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
export type TDataImportProcessorColumnDefinitions<FIELD extends string> = {
	[K in FIELD]: TDataImportProcessorColumnDefinition<keyof TDataImportProcessorTypescriptType>
}

export type TDataImportProcessorDataToArrayOptions = {
	alternateNames?: Record<string, string[]>
	includeRowsMissingRequireds?: boolean
}

export type TDataImportProcessorDataMessage<T extends TDataImportProcessorColumnDefinitions<Extract<keyof T, string>>> =
	{
		column: keyof T
		message: string
	}

export type TDataImportProcessor<T extends TDataImportProcessorColumnDefinitions<Extract<keyof T, string>>> =
	DataImportProcessor<T>

export type TDataImportProcessorResult<T extends TDataImportProcessorColumnDefinitions<Extract<keyof T, string>>> = {
	[K in keyof T]: T[K]['required'] extends true
		? TDataImportProcessorTypescriptType[T[K]['columnType']]
		: TDataImportProcessorTypescriptType[T[K]['columnType']] | null
}

/**
 * Class representing a generic data importer capable of parsing CSV input and transforming it into structured data
 * based on predefined column definitions.
 */
export class DataImportProcessor<T extends TDataImportProcessorColumnDefinitions<Extract<keyof T, string>>> {
	public definition: T
	public options: TDataImportProcessorDataToArrayOptions
	public columnMapping: {
		providedColumn: string | null
		targetColumn: keyof T | null
		required: boolean | null
	}[] = []
	public rawDataValidColumnIndexes: number[] = []
	public analysisRows: {
		rowRaw: string[]
		rowResult: TDataImportProcessorResult<T> | null
		isValid: boolean | null
		missingRequiredCells: TDataImportProcessorDataMessage<T>[]
		warnings: TDataImportProcessorDataMessage<T>[]
		errors: TDataImportProcessorDataMessage<T>[]
	}[] = []

	constructor(definition: T, options?: TDataImportProcessorDataToArrayOptions) {
		this.definition = definition
		this.options = options ?? {}
	}

	/**
	 * Populates the current object from a CSV string by parsing it into an array and populating the object accordingly.
	 *
	 * @param {string} csv - The CSV-formatted string containing the data to populate the object.
	 */
	public populateFromCSV(csv: string) {
		this.populateFromArray(ParseCSV(csv))
	}

	/**
	 * Populates the class with processed data from a two-dimensional array.
	 * @param data The raw data as a two-dimensional array.
	 */
	public populateFromArray(data: string[][]): void {
		if (data.length < 1) return

		// Map column index to FIELD key
		let colMap: {index: number; field: keyof T}[] = []
		let headerRowIndex = -1

		// Look for the header row
		for (let i = 0; i < data.length; i++) {
			const potentialHeaders = data[i]
			const currentMap: {index: number; field: keyof T}[] = []

			for (const [field, def] of Object.entries(this.definition) as [
				keyof T,
				TDataImportProcessorColumnDefinition
			][]) {
				const index = potentialHeaders.findIndex((h) => {
					const header = h.trim().toLowerCase()

					if (this.options?.alternateNames) {
						for (const [altKey, altValues] of Object.entries(this.options.alternateNames)) {
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

		if (headerRowIndex === -1) return

		this.rawDataValidColumnIndexes = Array.from(new Set(colMap.map((m) => m.index))).sort((a, b) => a - b)
		const headerRow = data[headerRowIndex]

		this.analysisRows.push({
			rowRaw: headerRow,
			rowResult: null,
			isValid: null,
			warnings: [],
			errors: [],
			missingRequiredCells: []
		})

		this.columnMapping = headerRow.map((providedColumn, index) => {
			const match = colMap.find((m) => m.index === index)
			const targetColumn = match ? match.field : null
			return {
				providedColumn,
				targetColumn,
				required: targetColumn ? this.definition[targetColumn].required ?? false : null
			}
		})

		// Add definitions that were not matched to any provided column
		for (const field of Object.keys(this.definition) as (keyof T)[]) {
			if (!colMap.some((m) => m.field === field)) {
				this.columnMapping.push({
					providedColumn: null,
					targetColumn: field,
					required: this.definition[field].required ?? false
				})
			}
		}

		const rows = data.slice(headerRowIndex + 1)

		rows.forEach((row) => {
			// Skip completely blank rows
			if (row.every((cell) => !cell || cell.trim() === '')) {
				return
			}

			// Skip rows that are a repeat of the header row
			if (
				row.length === headerRow.length &&
				row.every((cell, i) => cell.trim().toLowerCase() === headerRow[i].trim().toLowerCase())
			) {
				return
			}

			const record = {} as any
			let rowHasMissingRequired = false
			const rowFailedRequireds: TDataImportProcessorDataMessage<T>[] = []
			const rowWarnings: TDataImportProcessorDataMessage<T>[] = []
			const rowErrors: TDataImportProcessorDataMessage<T>[] = []

			for (const [field, def] of Object.entries(this.definition) as [
				keyof T,
				TDataImportProcessorColumnDefinition
			][]) {
				const colMatch = colMap.find((c) => c.field === field)
				const rawValue = colMatch !== undefined ? row[colMatch.index] ?? '' : ''

				if (def.warningMessage) {
					const message = def.warningMessage(rawValue, row)
					if (message) {
						rowWarnings.push({
							column: field,
							message
						})
					}
				}

				if (def.errorMessage) {
					const message = def.errorMessage(rawValue, row)
					if (message) {
						rowErrors.push({
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
							column: field,
							message: `Required field ${field.toString()} is empty`
						})
					}
				} else {
					switch (def.columnType) {
						case 'number':
							record[field] = CleanNumberNull(rawValue, def.decimals ?? 2)
							if (record[field] === null) {
								if (def.default !== undefined) {
									record[field] = CleanNumberNull(
										typeof def.default === 'function' ? def.default(row) : def.default,
										def.decimals ?? 2
									)
								} else if (def.required) {
									rowHasMissingRequired = true
									rowFailedRequireds.push({
										column: field,
										message: `Required field ${field.toString()} is empty`
									})
									record[field] = 0
								}
							}
							break
						case 'integer':
							record[field] = CleanNumberNull(rawValue)
							if (record[field] === null) {
								if (def.default !== undefined) {
									record[field] = CleanNumberNull(
										typeof def.default === 'function' ? def.default(row) : def.default
									)
								} else if (def.required) {
									rowHasMissingRequired = true
									rowFailedRequireds.push({
										column: field,
										message: `Required field ${field.toString()} is empty`
									})
									record[field] = 0
								}
							}
							break
						case 'boolean':
							if (!rawValue) {
								if (def.default !== null && def.default !== undefined) {
									record[field] = IsOn(
										typeof def.default === 'function' ? def.default(row) : def.default
									)
								} else if (def.required) {
									rowHasMissingRequired = true
									rowFailedRequireds.push({
										column: field,
										message: `Required field ${field.toString()} is empty`
									})
									record[field] = false
								} else {
									record[field] = null
								}
							} else {
								record[field] = IsOn(rawValue)
							}
							break
						case 'date':
							record[field] = DateOnlyNull(rawValue)
							if (record[field] === null) {
								if (def.default !== undefined) {
									record[field] = DateOnlyNull(
										typeof def.default === 'function' ? def.default(row) : def.default
									)
								} else if (def.required) {
									rowHasMissingRequired = true
									rowFailedRequireds.push({
										column: field,
										message: `Required field ${field.toString()} is empty`
									})
									record[field] = DateOnly('now')
								}
							}
							break
						case 'time':
							record[field] = TimeOnly(rawValue)
							if (record[field] === null) {
								if (def.default !== undefined) {
									record[field] = TimeOnly(
										typeof def.default === 'function' ? def.default(row) : def.default
									)
								} else if (def.required) {
									rowHasMissingRequired = true
									rowFailedRequireds.push({
										column: field,
										message: `Required field ${field.toString()} is empty`
									})
									record[field] = TimeOnly('now')
								}
							}
							break
						case 'datetime':
							record[field] = DateISO(rawValue)
							if (record[field] === null) {
								if (def.default !== undefined) {
									record[field] = DateISO(
										typeof def.default === 'function' ? def.default(row) : def.default
									)
								} else if (def.required) {
									rowHasMissingRequired = true
									rowFailedRequireds.push({
										column: field,
										message: `Required field ${field.toString()} is empty`
									})
									record[field] = NowISOString()
								}
							}
							break
						default:
							if (!rawValue) {
								if (def.default !== undefined) {
									record[field] = typeof def.default === 'function' ? def.default(row) : def.default
								} else if (def.required) {
									rowHasMissingRequired = true
									rowFailedRequireds.push({
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

			const isValid = !rowHasMissingRequired || (this.options?.includeRowsMissingRequireds ?? false)

			this.analysisRows.push({
				rowRaw: row,
				rowResult: record,
				isValid,
				warnings: rowWarnings,
				errors: rowErrors,
				missingRequiredCells: rowFailedRequireds
			})
		})
	}

	get validRows() {
		return this.analysisRows
			.filter(
				(
					row
				): row is typeof row & {
					rowResult: NonNullable<(typeof row)['rowResult']>
				} => !!(row.isValid && row.rowResult)
			)
			.map((row) => row.rowResult)
	}

	get rawRows() {
		return this.analysisRows.map((row) => row.rowRaw)
	}

	get missingRequiredHeaders() {
		return this.columnMapping
			.filter((mapping) => mapping.required && mapping.targetColumn && !mapping.providedColumn)
			.map((mapping) => mapping.targetColumn as keyof T)
	}

	get allWarnings() {
		return this.analysisRows.flatMap((row, index) =>
			row.warnings.map((warning) => ({
				...warning,
				rowIndex: index
			}))
		)
	}

	get allErrors() {
		return this.analysisRows.flatMap((row, index) =>
			row.errors.map((error) => ({
				...error,
				rowIndex: index
			}))
		)
	}
}

/**
 * Converts an array of records into a structured two-dimensional array based on the provided column definitions.
 *
 * @param {T} definitions - An object defining the structure, descriptions, and sample data for each column.
 *                          The keys represent the column headers.
 * @param {Record<string, any>[]} [data] - An optional array of records to be converted into a two-dimensional array.
 *                                         Each record should match the structure expected by the column definitions.
 * @return {string[][]} A two-dimensional array where the first row contains header names, followed by either:
 *                      - Rows constructed from the provided data.
 *                      - A default structure with descriptions and sample data when no records are provided.
 */
export function ArrayToImporterData<T extends TDataImportProcessorColumnDefinitions<Extract<keyof T, string>>>(
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
