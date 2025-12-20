import {expect, it} from 'vitest'
import {
	ArrayToImporterData,
	DataImportProcessor,
	TDataImportProcessorDataToArrayOptions,
	TDataImportProcessor,
	TDataImportProcessorColumnDefinitions,
	TDataImportProcessorResult
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
} satisfies TDataImportProcessorColumnDefinitions<any>

class ImporterTest extends DataImportProcessor<typeof definition> {
	constructor(options?: TDataImportProcessorDataToArrayOptions) {
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
	const importer: TDataImportProcessor<typeof definition> = new ImporterTest({
		alternateNames: {
			status: ['activeZ']
		}
	})

	importer.populateFromArray([
		['Header', 'Today'],
		[],
		[''],
		['id', 'alt', 'title', 'Rate', 'action_date', 'activeZ', 'Temp'],
		['1', 'ALTERNATE', 'First', '$1,111.111', '12/5/2025', 'Y', 'T1'],
		['id', 'alt', 'title', 'Rate', 'action_date', 'activeZ', 'Temp'],
		['2', 'NEXT', 'SecondZ', '333', '12/1/2025', 'f', 'T2'],
		['', '', '', '', '', ''],
		[]
	])

	const result = importer.analysisRows[1]?.rowResult
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

	const vRows: TDataImportProcessorResult<typeof definition>[] = importer.validRows

	expect(vRows).toEqual([
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
			cost: 333,
			action_date: '2025-12-01',
			other_date: null,
			is_active: false,
			TEMP: 'T2'
		}
	])

	expect(importer.isValid).toBeTruthy()

	expect(importer.rawRows).toEqual([
		['id', 'alt', 'title', 'Rate', 'action_date', 'activeZ', 'Temp'],
		['1', 'ALTERNATE', 'First', '$1,111.111', '12/5/2025', 'Y', 'T1'],
		['2', 'NEXT', 'SecondZ', '333', '12/1/2025' + '', 'f', 'T2']
	])

	expect(importer.analysisRows.filter((line) => !line.isValid).length).toBe(0)

	expect(importer.rawDataValidColumnIndexes).toEqual([0, 2, 3, 4, 5, 6])

	expect(
		importer.analysisRows.every((ar) =>
			ar.columns.every((col) => col?.columnDefinition?.columnType !== 'date' || col?.justify === 'right')
		)
	)

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

	expect(importer.missingRequiredHeaders).toEqual([])

	expect(importer.allWarnings.length).toBe(1)

	expect(importer.allErrors.length).toBe(0)
})

it('ImporterFunctions', () => {
	const importer: TDataImportProcessor<typeof definition> = new ImporterTest({
		alternateNames: {
			status: ['activeZ']
		}
	})

	importer.populateFromArray(datum)

	const result = importer.analysisRows[1]?.rowResult
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
		}
		// {
		// 	id: 2,
		// 	name: 'Second',
		// 	cost: 0,
		// 	action_date: null,
		// 	other_date: null,
		// 	is_active: false,
		// 	TEMP: 'T2'
		// }
	])

	expect(importer.isValid).toBeFalsy()

	expect(importer.rawRows).toEqual([
		['id', 'alt', 'title', 'Rate', 'action_date', 'activeZ', 'Temp'],
		['1', 'ALTERNATE', 'First', '$1,111.111', '12/5/2025', 'Y', 'T1'],
		['2', 'NEXT', 'SecondZ', '', '', 'f', 'T2'],
		['', 'NEXT', 'Third', '', '', 'f', 'T3']
	])

	expect(importer.analysisRows.filter((line) => !line.isValid).length).toEqual(2)

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

	expect(importer.missingRequiredHeaders).toEqual([])

	expect(importer.allWarnings.length).toBe(1)

	expect(importer.allErrors.length).toBe(4)
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
	const importer = new DataImportProcessor(
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

	const result = importer.analysisRows[1]?.rowResult
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

	expect(importer.rawRows).toEqual([
		['id', 'alt', 'title', 'Rate', 'action_date', 'activeZ', 'Temp'],
		['1', 'ALTERNATE', 'First', '$1,111.111', '12/5/2025', 'Y', 'T1'],
		['2', 'NEXT', 'SecondZ', '', '', 'f', 'T2'],
		['', 'NEXT', 'Third', '', '', 'f', 'T3']
	])

	expect(importer.isValid).toBeFalsy()

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

	expect(importer.missingRequiredHeaders).toEqual(['other_need'])

	expect(importer.allWarnings.length).toBe(1)

	expect(importer.allErrors.length).toBe(4)
})
