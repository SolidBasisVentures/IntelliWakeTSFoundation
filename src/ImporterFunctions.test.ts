import {expect, it} from 'vitest'
import {
	ArrayToImporterData,
	Importer,
	TImportDataToArrayOptions,
	TImporter,
	TImporterColumnDefinitions
} from './ImporterFunctions'
import {DeepEqual} from './DeepEqual'

const definition = {
	id: {
		description: 'Unique identifier',
		columnType: 'integer',
		alternateNames: ['identifier'],
		required: true,
		sampleData: '1'
	},
	TEMP: {
		description: 'Temp Action',
		columnType: 'string',
		alternateNames: ['temporary'],
		sampleData: 'TempZ',
		default: (row) => (row[0] === '1' ? 'Fir' : '')
	},
	name: {
		description: 'Name of the entity',
		columnType: 'string',
		alternateNames: ['title', 'label', 'description'],
		length: 6,
		warningMessage: (value) => (value === 'SecondZ' ? `Value '${value}' not allowed` : null),
		sampleData: 'Name'
	},
	cost: {
		description: 'Cost of item',
		columnType: 'number',
		decimals: 2,
		alternateNames: ['amount', 'price', 'rate'],
		errorMessage: (value) => (!value ? `Cost required` : null),
		default: '0'
	},
	action_date: {
		description: 'Date of the item',
		columnType: 'date',
		errorMessage: (value) => (!value ? `Action Date required` : null)
	},
	other_date: {
		description: 'Date of the item',
		columnType: 'date'
	},
	is_active: {
		description: 'Indicates if the entity is active',
		columnType: 'boolean',
		alternateNames: ['active', 'status'],
		required: true,
		sampleData: 'true'
	}
} satisfies TImporterColumnDefinitions<any>

class ImporterTest extends Importer<typeof definition> {
	constructor(options?: TImportDataToArrayOptions) {
		super(definition, options)
	}
}

const datum: string[][] = [
	['Header', 'Today'],
	[],
	[''],
	['id', 'alt', 'title', 'Rate', 'action_date', 'activeZ', 'Temp'],
	['1', 'ALTERNATE', 'First', '$1,111.111', '12/5/2025', 'Y', 'T1'],
	['id', 'alt', 'title', 'Rate', 'action_date', 'activeZ', 'Temp'],
	['2', 'NEXT', 'SecondZ', '', '', 'f', 'T2'],
	['', 'NEXT', 'Third', '', '', 'f', 'T3'],
	['', '', '', '', '', ''],
	[]
]

it('ImporterFunctions', () => {
	const importer: TImporter<typeof definition> = new ImporterTest({
		alternateNames: {
			status: ['activeZ']
		}
	})

	importer.populateFromArray(datum)

	const result = importer.analysisRows[1]?.finalResult
	if (result) {
		const item: {
			id: number
			name: string | null
			cost: number | null
			action_date: string | null
			is_active: boolean
			TEMP: string | null
		} = {...result}

		expect(DeepEqual(result, item)).toBeTruthy()
	}

	expect(importer.validRows).toEqual([
		{
			id: 1,
			name: 'First',
			cost: 1111.11,
			action_date: '2025-12-05',
			other_date: null,
			is_active: true,
			TEMP: 'T1'
		},
		{
			id: 2,
			name: 'Second',
			cost: 0,
			action_date: null,
			other_date: null,
			is_active: false,
			TEMP: 'T2'
		}
	])

	expect(importer.analysisRows.map((result) => result.rawData)).toEqual([
		['id', 'alt', 'title', 'Rate', 'action_date', 'activeZ', 'Temp'],
		['1', 'ALTERNATE', 'First', '$1,111.111', '12/5/2025', 'Y', 'T1'],
		['2', 'NEXT', 'SecondZ', '', '', 'f', 'T2'],
		['', 'NEXT', 'Third', '', '', 'f', 'T3']
	])

	expect(importer.analysisRows.filter((line) => line.isValid === false).length).toEqual(1)

	expect(importer.rawDataValidColumnIndexes).toEqual([0, 2, 3, 4, 5, 6])

	expect(importer.columnMapping).toEqual([
		{providedColumn: 'id', targetColumn: 'id', required: true},
		{providedColumn: 'alt', targetColumn: null, required: null},
		{providedColumn: 'title', targetColumn: 'name', required: false},
		{providedColumn: 'Rate', targetColumn: 'cost', required: false},
		{providedColumn: 'action_date', targetColumn: 'action_date', required: false},
		{providedColumn: 'activeZ', targetColumn: 'is_active', required: true},
		{providedColumn: 'Temp', targetColumn: 'TEMP', required: false},
		{providedColumn: null, targetColumn: 'other_date', required: false}
	])

	// expect(importer.missingRequiredCells.length).toBe(0)

	// expect(warnings.length).toBe(1)

	// expect(errors.length).toBe(2)
})

it('Exporter Functions', () => {
	expect(ArrayToImporterData(definition)).toEqual([
		['id', 'TEMP', 'name', 'cost', 'action_date', 'other_date', 'is_active'],
		[
			'Unique identifier (Required)',
			'Temp Action',
			'Name of the entity',
			'Cost of item',
			'Date of the item',
			'Date of the item',
			'Indicates if the entity is active (Required)'
		],
		['1', 'TempZ', 'Name', '', '', '', 'true']
	])

	expect(ArrayToImporterData(definition, [{id: 1}, {id: 2, title: 'Bob', zzz: 'Junk'}])).toEqual([
		['id', 'TEMP', 'name', 'cost', 'action_date', 'other_date', 'is_active'],
		['1', '', '', '', '', '', ''],
		['2', '', 'Bob', '', '', '', '']
	])
})

it('ImporterFunctions Failing', () => {
	const importer = new Importer(
		{
			...definition,
			other_need: {
				description: 'Another needed column',
				columnType: 'integer',
				required: true
			}
		},
		{
			alternateNames: {
				status: ['activeZ']
			}
		}
	)

	importer.populateFromArray(datum)

	const result = importer.analysisRows[1]?.finalResult
	if (result) {
		const item: {
			id: number
			name: string | null
			cost: number | null
			action_date: string | null
			is_active: boolean
		} = {...result}

		expect(DeepEqual(result, item)).toBeTruthy()
	}

	expect(importer.validRows).toEqual([])

	expect(importer.analysisRows.map((result) => result.rawData)).toEqual([
		['id', 'alt', 'title', 'Rate', 'action_date', 'activeZ', 'Temp'],
		['1', 'ALTERNATE', 'First', '$1,111.111', '12/5/2025', 'Y', 'T1'],
		['2', 'NEXT', 'SecondZ', '', '', 'f', 'T2'],
		['', 'NEXT', 'Third', '', '', 'f', 'T3']
	])

	// expect(importer.invalidRawDataIndexes).toEqual([1, 2, 3])

	expect(importer.rawDataValidColumnIndexes).toEqual([0, 2, 3, 4, 5, 6])

	expect(importer.columnMapping).toEqual([
		{providedColumn: 'id', targetColumn: 'id', required: true},
		{providedColumn: 'alt', targetColumn: null, required: null},
		{providedColumn: 'title', targetColumn: 'name', required: false},
		{providedColumn: 'Rate', targetColumn: 'cost', required: false},
		{providedColumn: 'action_date', targetColumn: 'action_date', required: false},
		{providedColumn: 'activeZ', targetColumn: 'is_active', required: true},
		{providedColumn: 'Temp', targetColumn: 'TEMP', required: false},
		{providedColumn: null, targetColumn: 'other_date', required: false},
		{providedColumn: null, targetColumn: 'other_need', required: true}
	])

	// expect(importer.missingRequiredCells.length).toBe(0)

	// expect(importer.warnings.length).toBe(0)

	// expect(importer.errors.length).toBe(0)
})
