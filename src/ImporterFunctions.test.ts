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
		errorMessage: (value) => (!value ? `Cost required` : null)
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
		['id', 'alt', 'title', 'Rate', 'action_date', 'activeZ'],
		['1', 'ALTERNATE', 'First', '$1,111.111', '12/5/2025', 'Y'],
		['id', 'alt', 'title', 'Rate', 'action_date', 'activeZ'],
		['2', 'NEXT', 'SecondZ', '', '', 'f'],
		['', 'NEXT', 'Third', '', '', 'f'],
		['', '', '', '', '', ''],
		[]
	]

	const {results, warnings, errors, failedRequireds} = ImporterDataToArray(definition, datum, {
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
			is_active: true
		},
		{
			id: 2,
			name: 'Second',
			cost: null,
			action_date: null,
			other_date: null,
			is_active: false
		}
	])

	expect(failedRequireds.length).toBe(0)

	expect(warnings.length).toBe(1)

	expect(errors.length).toBe(2)
})

it('Exporter Functions', () => {
	expect(ArrayToImporterData(definition)).toEqual([
		['id', 'name', 'cost', 'action_date', 'other_date', 'is_active'],
		[
			'Unique identifier (Required)',
			'Name of the entity',
			'Cost of item',
			'Date of the item',
			'Date of the item',
			'Indicates if the entity is active (Required)'
		],
		['1', 'Name', '', '', '', 'true']
	])

	expect(ArrayToImporterData(definition, [{id: 1}, {id: 2, title: 'Bob'}])).toEqual([
		['id', 'name', 'cost', 'action_date', 'other_date', 'is_active'],
		['1', '', '', '', '', ''],
		['2', 'Bob', '', '', '', '']
	])
})
