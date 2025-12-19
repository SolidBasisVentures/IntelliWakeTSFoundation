import {expect, it} from 'vitest'
import {ArrayToImporterData, ImporterDataToArray, TImporterColumnDefinitions} from './ImporterFunctions'
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

it('ImporterFunctions', () => {
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

	const {results, rawData, rawDataValidColumnIndexes, columnMapping, warnings, errors, failedRequireds} =
		ImporterDataToArray(definition, datum, {
			alternateNames: {
				status: ['activeZ']
			}
		})

	const result = results[0]
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

	expect(results).toEqual([
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

	expect(rawData).toEqual([
		['id', 'alt', 'title', 'Rate', 'action_date', 'activeZ', 'Temp'],
		['1', 'ALTERNATE', 'First', '$1,111.111', '12/5/2025', 'Y', 'T1'],
		['2', 'NEXT', 'SecondZ', '', '', 'f', 'T2'],
		['', 'NEXT', 'Third', '', '', 'f', 'T3']
	])

	expect(rawDataValidColumnIndexes).toEqual([0, 2, 3, 4, 5, 6])

	expect(columnMapping).toEqual([
		{providedColumn: 'id', targetColumn: 'id'},
		{providedColumn: 'alt', targetColumn: null},
		{providedColumn: 'title', targetColumn: 'name'},
		{providedColumn: 'Rate', targetColumn: 'cost'},
		{providedColumn: 'action_date', targetColumn: 'action_date'},
		{providedColumn: 'activeZ', targetColumn: 'is_active'},
		{providedColumn: 'Temp', targetColumn: 'TEMP'},
		{providedColumn: null, targetColumn: 'other_date'}
	])

	expect(failedRequireds.length).toBe(0)

	expect(warnings.length).toBe(1)

	expect(errors.length).toBe(2)
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

	const {results, rawData, rawDataValidColumnIndexes, columnMapping, warnings, errors, failedRequireds} =
		ImporterDataToArray(
			{
				...definition,
				other_need: {
					description: 'Another needed column',
					columnType: 'integer',
					required: true
				}
			},
			datum,
			{
				alternateNames: {
					status: ['activeZ']
				}
			}
		)

	const result = results[0]
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

	expect(results).toEqual([])

	expect(rawData).toEqual([
		['id', 'alt', 'title', 'Rate', 'action_date', 'activeZ', 'Temp'],
		['1', 'ALTERNATE', 'First', '$1,111.111', '12/5/2025', 'Y', 'T1'],
		['2', 'NEXT', 'SecondZ', '', '', 'f', 'T2'],
		['', 'NEXT', 'Third', '', '', 'f', 'T3']
	])

	expect(rawDataValidColumnIndexes).toEqual([0, 2, 3, 4, 5, 6])

	expect(columnMapping).toEqual([
		{providedColumn: 'id', targetColumn: 'id'},
		{providedColumn: 'alt', targetColumn: null},
		{providedColumn: 'title', targetColumn: 'name'},
		{providedColumn: 'Rate', targetColumn: 'cost'},
		{providedColumn: 'action_date', targetColumn: 'action_date'},
		{providedColumn: 'activeZ', targetColumn: 'is_active'},
		{providedColumn: 'Temp', targetColumn: 'TEMP'},
		{providedColumn: null, targetColumn: 'other_date'},
		{providedColumn: null, targetColumn: 'other_need'}
	])

	expect(failedRequireds.length).toBe(0)

	expect(warnings.length).toBe(0)

	expect(errors.length).toBe(0)
})
