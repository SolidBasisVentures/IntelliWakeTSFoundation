import { expect, it } from 'vitest'
import { ImporterDataToArray, type TImporterColumnDefinitions } from '$lib/ImporterFunctions'
import { DateOnly, DeepEqual } from '@solidbasisventures/intelliwaketsfoundation'

it('ImporterFunctions', () => {
	const definition = {
		id: {
			description: 'Unique identifier',
			columnType: 'integer',
			alternateNames: ['identifier'],
			required: true
		},
		name: {
			description: 'Name of the entity',
			columnType: 'string',
			alternateNames: ['title', 'label', 'description'],
			length: 6,
			warningMessage: (value) => (value === 'SecondZ' ? `Value '${value}' not allowed` : null)
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
			columnType: 'date',
			required: true
		},
		is_active: {
			description: 'Indicates if the entity is active',
			columnType: 'boolean',
			alternateNames: ['active', 'status'],
			required: true
		}
	} satisfies TImporterColumnDefinitions<any>

	const datum: string[][] = [
		['id', 'alt', 'title', 'Rate', 'action_date', 'activeZ'],
		['1', 'ALTERNATE', 'First', '$1,111.111', '12/5/2025', 'Y'],
		['2', 'NEXT', 'SecondZ', '', '', 'f']
	]

	const { results, warnings, errors, failedRequireds } = ImporterDataToArray(definition, datum, {
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
		} = { ...result }

		expect(DeepEqual(result, item)).toBeTruthy()
	}

	expect(results).toEqual([
		{
			id: 1,
			name: 'First',
			cost: 1111.11,
			action_date: '2025-12-05',
			other_date: DateOnly('now'),
			is_active: true
		},
		{
			id: 2,
			name: 'Second',
			cost: null,
			action_date: null,
			other_date: DateOnly('now'),
			is_active: false
		}
	])

	expect(failedRequireds.length).toBe(2)

	expect(warnings.length).toBe(1)

	expect(errors.length).toBe(2)
})
