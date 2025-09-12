import {expect, test} from 'vitest'
import {Importer} from './Importer'

test('Importer', () => {
	const importer = new Importer({
		headers: ['id', 'Item #', 'name']
	}, '')

	// expect(RowHeaderIncludes(['id', 'itemno'], matches)).toBeTruthy()
	// expect(RowHeaderIncludes(['ID', 'item #'], matches)).toBeTruthy()
	// expect(RowHeaderIncludes(['ID', 'name'], matches)).toBeFalsy()
})
