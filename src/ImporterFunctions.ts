import {CleanNumberNull, IsOn, ObjectKeys} from './Functions'
import {DateISO, DateOnly, DateOnlyNull, NowISOString, TimeOnly} from './DateManager'
import {ParseCSV} from './DataConstructs'
import {ToNumberString} from './StringManipulation'

export type TDataImportProcessorTypescriptType = {
	string: string
	number: number
	currency: number
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
	display?: (value: string | null, row: (string | null)[]) => string | null
	justify?: 'left' | 'right' | 'center' | null
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
		providedColumn: string | null
		targetColumn: keyof T | null
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
	private _colMap: {index: number; field: keyof T}[] = []
	private _headerRow: string[] = []
	public rawDataValidColumnIndexes: number[] = []
	public analysisRows: {
		isValid: boolean
		rowRaw: string[]
		columns: {
			rawData: string | null
			rawHeader: string | null
			columnDefinition: TDataImportProcessorColumnDefinition | null
			justify: 'left' | 'right' | 'center'
			resultData: any // This will hold the typed value
			display?: ((value: string | null, row: (string | null)[]) => string | null) | null
			isMissing: boolean
			errorMessage: string | null
			warningMessage: string | null
		}[]
		rowResult: TDataImportProcessorResult<T> | null
	}[] = []

	constructor(definition: T, options?: TDataImportProcessorDataToArrayOptions) {
		this.definition = definition
		this.options = options ?? {}
	}

	public get columnMapping() {
		if (this._headerRow.length === 0) return []

		const mapping: {
			providedColumn: string | null
			targetColumn: keyof T | null
			required: boolean | null
		}[] = this._headerRow.map((providedColumn, index) => {
			const match = this._colMap.find((m) => m.index === index)
			const targetColumn = match ? match.field : null
			return {
				providedColumn,
				targetColumn,
				required: targetColumn ? this.definition[targetColumn].required ?? false : null
			}
		})

		// Add definitions that were not matched to any provided column
		for (const field of Object.keys(this.definition) as (keyof T)[]) {
			if (!this._colMap.some((m) => m.field === field)) {
				mapping.push({
					providedColumn: null,
					targetColumn: field,
					required: this.definition[field].required ?? false
				})
			}
		}

		return mapping
	}

	/**
	 * Populates the current object from a CSV string by parsing it into an array and populating the object accordingly.
	 *
	 * @param {string} csv - The CSV-formatted string containing the data to populate the object.
	 */
	public populateFromCSV(csv: string) {
		this.populateFromArray(ParseCSV(csv))
	}

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
						(header === (field as string).toLowerCase() ||
							def.alternateNames?.some((alt) => alt.trim().toLowerCase() === header)) &&
						!ObjectKeys(this.options.alternateNames ?? {}).some(
							(key) =>
								field !== key &&
								this.options.alternateNames?.[key]?.some((an) => an.trim().toLowerCase() === header)
						)
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

		this._colMap = colMap
		this._headerRow = data[headerRowIndex]
		this.rawDataValidColumnIndexes = Array.from(new Set(colMap.map((m) => m.index))).sort((a, b) => a - b)
		const headerRow = this._headerRow

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
			let rowHasErrors = false

			// Pre-calculate mapped columns for this row
			// Pre-calculate mapped columns for this row
			const analysisColumns: (typeof this.analysisRows)[0]['columns'] = row.map((cell, index) => {
				const match = colMap.find((m) => m.index === index)
				const def = match ? this.definition[match.field] : null
				let justify: 'left' | 'right' | 'center' = def?.justify ?? 'left'

				if (def && !def.justify) {
					switch (def.columnType) {
						case 'boolean':
							justify = 'center'
							break
						case 'number':
						case 'currency':
						case 'integer':
						case 'date':
						case 'time':
						case 'datetime':
							justify = 'right'
							break
						default:
							justify = 'left'
					}
				}

				const display =
					def?.display ??
					(def?.columnType === 'currency'
						? (value: string | null) => ToNumberString(value, {currency: true, zeroBlank: true})
						: def?.columnType === 'boolean'
						? (value: string | null) => (!value ? '' : IsOn(value) ? 'True' : 'False')
						: null)

				return {
					rawData: cell,
					rawHeader: headerRow[index] ?? null,
					columnDefinition: def,
					display,
					justify,
					resultData: null,
					isMissing: false,
					errorMessage: null,
					warningMessage: null
				}
			})

			for (const [field, def] of Object.entries(this.definition) as [
				keyof T,
				TDataImportProcessorColumnDefinition
			][]) {
				const colMatchIndex = colMap.find((c) => c.field === field)?.index
				const rawValue = colMatchIndex !== undefined ? row[colMatchIndex] ?? '' : ''
				const colAnalysis = colMatchIndex !== undefined ? analysisColumns[colMatchIndex] : null

				if (def.warningMessage) {
					const message = def.warningMessage(rawValue, row)
					if (message && colAnalysis) {
						colAnalysis.warningMessage = message
					}
				}

				if (def.errorMessage) {
					const message = def.errorMessage(rawValue, row)
					if (message) {
						rowHasErrors = true
						if (colAnalysis) colAnalysis.errorMessage = message
					}
				}

				let resultValue: any = null
				let isMissing = false

				if (def.customConvertor) {
					resultValue = def.customConvertor(rawValue, row)
					if (def.required && !resultValue) {
						isMissing = true
						rowHasMissingRequired = true
					}
				} else {
					switch (def.columnType) {
						case 'number':
						case 'currency':
							resultValue = CleanNumberNull(rawValue, def.decimals ?? 2)
							if (resultValue === null) {
								if (def.default !== undefined) {
									resultValue = CleanNumberNull(
										typeof def.default === 'function' ? def.default(row) : def.default,
										def.decimals ?? 2
									)
								} else if (def.required) {
									isMissing = true
									rowHasMissingRequired = true
									resultValue = 0
								}
							}
							break
						case 'integer':
							resultValue = CleanNumberNull(rawValue)
							if (resultValue === null) {
								if (def.default !== undefined) {
									resultValue = CleanNumberNull(
										typeof def.default === 'function' ? def.default(row) : def.default
									)
								} else if (def.required) {
									isMissing = true
									rowHasMissingRequired = true
									resultValue = 0
								}
							}
							break
						case 'boolean':
							if (!rawValue) {
								if (def.default !== null && def.default !== undefined) {
									resultValue = IsOn(
										typeof def.default === 'function' ? def.default(row) : def.default
									)
								} else if (def.required) {
									isMissing = true
									rowHasMissingRequired = true
									resultValue = false
								} else {
									resultValue = null
								}
							} else {
								resultValue = IsOn(rawValue)
							}
							break
						case 'date':
							resultValue = DateOnlyNull(rawValue)
							if (resultValue === null) {
								if (def.default !== undefined) {
									resultValue = DateOnlyNull(
										typeof def.default === 'function' ? def.default(row) : def.default
									)
								} else if (def.required) {
									isMissing = true
									rowHasMissingRequired = true
									resultValue = DateOnly('now')
								}
							}
							break
						case 'time':
							resultValue = TimeOnly(rawValue)
							if (resultValue === null) {
								if (def.default !== undefined) {
									resultValue = TimeOnly(
										typeof def.default === 'function' ? def.default(row) : def.default
									)
								} else if (def.required) {
									isMissing = true
									rowHasMissingRequired = true
									resultValue = TimeOnly('now')
								}
							}
							break
						case 'datetime':
							resultValue = DateISO(rawValue)
							if (resultValue === null) {
								if (def.default !== undefined) {
									resultValue = DateISO(
										typeof def.default === 'function' ? def.default(row) : def.default
									)
								} else if (def.required) {
									isMissing = true
									rowHasMissingRequired = true
									resultValue = NowISOString()
								}
							}
							break
						default:
							if (!rawValue) {
								if (def.default !== undefined) {
									resultValue = typeof def.default === 'function' ? def.default(row) : def.default
								} else if (def.required) {
									isMissing = true
									rowHasMissingRequired = true
									resultValue = ''
								} else {
									resultValue = null
								}
							} else {
								if (def.length) {
									resultValue = rawValue.toString().substring(0, def.length)
								} else {
									resultValue = rawValue
								}
							}
							break
					}
				}

				record[field] = resultValue
				if (colAnalysis) {
					colAnalysis.resultData = resultValue
					colAnalysis.isMissing = isMissing
				}
			}

			const isValid =
				(!rowHasMissingRequired && !rowHasErrors) || (this.options?.includeRowsMissingRequireds ?? false)

			this.analysisRows.push({
				rowRaw: row,
				columns: analysisColumns,
				rowResult: record,
				isValid
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
		if (!this.analysisRows.length) return []
		return [this.analysisRows[0].columns.map((col) => col.rawHeader), ...this.analysisRows.map((row) => row.rowRaw)]
	}

	get missingRequiredHeaders() {
		return this.columnMapping
			.filter((mapping) => mapping.required && mapping.targetColumn && !mapping.providedColumn)
			.map((mapping) => mapping.targetColumn as keyof T)
	}

	get allWarnings() {
		return this.analysisRows.flatMap((row, rowIndex) =>
			row.columns
				.filter((col) => col.warningMessage)
				.map((col) => ({
					providedColumn: col.rawData, // Using rawData as the providedColumn name for message parity
					targetColumn:
						(Object.keys(this.definition) as (keyof T)[]).find(
							(key) => this.definition[key] === col.columnDefinition
						) ?? null,
					message: col.warningMessage!,
					rowIndex
				}))
		)
	}

	get allErrors() {
		return this.analysisRows.flatMap((row, rowIndex) =>
			row.columns
				.filter((col) => col.errorMessage || col.isMissing)
				.map((col) => ({
					providedColumn: col.rawData, // Using rawData as the providedColumn name for message parity
					targetColumn:
						(Object.keys(this.definition) as (keyof T)[]).find(
							(key) => this.definition[key] === col.columnDefinition
						) ?? null,
					message: col.errorMessage ?? 'Required field',
					rowIndex
				}))
		)
	}

	get isValid() {
		return !this.allErrors.length && !this.missingRequiredHeaders.length
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
