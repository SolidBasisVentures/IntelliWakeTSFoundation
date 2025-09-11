import {expect, test} from 'vitest'
import {RowHeaderIncludes} from './Importer'

test('Importer', () => {
	const matches = ['itemno', 'Item #'] as const

	expect(RowHeaderIncludes(['id', 'itemno'], matches)).toBeTruthy()
	expect(RowHeaderIncludes(['ID', 'item #'], matches)).toBeTruthy()
	expect(RowHeaderIncludes(['ID', 'name'], matches)).toBeFalsy()
})
