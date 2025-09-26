import {
	FindIsActive,
	isNullUndefined,
	ObjectContainsSearchTerms,
	PagesForRange,
	SearchRow,
	SearchRows,
	SortCompare,
	SortCompareNull,
	SortCompares,
	SortIndex,
	SortPerArray,
	SortSplitItems,
	SearchTerms
} from './SortSearch'
import {describe, expect, test} from 'vitest'

test('SortCompare', () => {
	expect(
		[
			{id: 1, name: 'AAA', prioritized: false},
			{id: 2, name: 'ZZZ', prioritized: false},
			{id: 3, name: 'CCC', prioritized: true},
			{id: 4, name: 'BBB', prioritized: false}
		].sort((a, b) => SortCompareNull(b.prioritized, a.prioritized) ?? SortCompare(a.name, b.name))
	).toEqual([
		{id: 3, name: 'CCC', prioritized: true},
		{id: 1, name: 'AAA', prioritized: false},
		{id: 4, name: 'BBB', prioritized: false},
		{id: 2, name: 'ZZZ', prioritized: false}
	])
})

test('SortCompare Empty Bottom', () => {
	expect(
		[
			{id: 3, name: 'CCC', prioritized: true},
			{id: 1, name: 'AAA', prioritized: undefined},
			{id: 4, name: 'BBB', prioritized: false},
			{id: 2, name: 'ZZZ', prioritized: undefined}
		].sort((a, b) => SortCompareNull(b.prioritized, a.prioritized, 'Bottom') ?? SortCompare(a.name, b.name))
	).toEqual([
		{id: 3, name: 'CCC', prioritized: true},
		{id: 4, name: 'BBB', prioritized: false},
		{id: 1, name: 'AAA', prioritized: undefined},
		{id: 2, name: 'ZZZ', prioritized: undefined}
	])
})

test('SortCompare Empty Top', () => {
	expect(
		[
			{id: 3, name: 'CCC', prioritized: true},
			{id: 1, name: 'AAA', prioritized: undefined},
			{id: 2, name: 'ZZZ', prioritized: undefined},
			{id: 4, name: 'BBB', prioritized: false}
		].sort((a, b) => SortCompareNull(b.prioritized, a.prioritized, 'Top') ?? SortCompare(a.name, b.name))
	).toEqual([
		{id: 1, name: 'AAA', prioritized: undefined},
		{id: 2, name: 'ZZZ', prioritized: undefined},
		{id: 3, name: 'CCC', prioritized: true},
		{id: 4, name: 'BBB', prioritized: false}
	])
})

test('SortCompare Empty ID Bottom', () => {
	expect(
		[
			{id: 1, name: 'AAA'},
			{id: null, name: 'ZZZ'},
			{id: null, name: 'CCC'},
			{id: 4, name: 'BBB'}
		].sort((a, b) => SortCompareNull(a.id, b.id, 'Bottom') ?? SortCompare(a.name, b.name))
	).toEqual([
		{id: 1, name: 'AAA'},
		{id: 4, name: 'BBB'},
		{id: null, name: 'CCC'},
		{id: null, name: 'ZZZ'}
	])
})

test('SortCompare Empty ID Top', () => {
	expect(
		[
			{id: 1, name: 'AAA'},
			{id: null, name: 'ZZZ'},
			{id: null, name: 'CCC'},
			{id: 4, name: 'BBB'}
		].sort((a, b) => SortCompareNull(a.id, b.id, 'Top') ?? SortCompare(a.name, b.name))
	).toEqual([
		{id: null, name: 'CCC'},
		{id: null, name: 'ZZZ'},
		{id: 1, name: 'AAA'},
		{id: 4, name: 'BBB'}
	])
})

test('SortCompares', () => {
	expect(
		[
			{id: 1, name: 'AAA', prioritized: false},
			{id: 2, name: 'ZZZ', prioritized: false},
			{id: 3, name: 'ccc', prioritized: true},
			{id: 4, name: 'BBB', prioritized: false}
		].sort((a, b) => SortCompares([[a.name, b.name]]))
	).toEqual([
		{id: 1, name: 'AAA', prioritized: false},
		{id: 4, name: 'BBB', prioritized: false},
		{id: 3, name: 'ccc', prioritized: true},
		{id: 2, name: 'ZZZ', prioritized: false}
	])

	expect(
		[
			{id: 1, name: 'AAA', prioritized: false},
			{id: 2, name: 'ZZZ', prioritized: false},
			{id: 3, name: 'AAA', prioritized: true},
			{id: 4, name: 'BBB', prioritized: false}
		].sort((a, b) =>
			SortCompares([
				[a.name, b.name],
				[a.id, b.id]
			])
		)
	).toEqual([
		{id: 1, name: 'AAA', prioritized: false},
		{id: 3, name: 'AAA', prioritized: true},
		{id: 4, name: 'BBB', prioritized: false},
		{id: 2, name: 'ZZZ', prioritized: false}
	])

	expect(
		[
			{id: 1, name: 'AAA', prioritized: false},
			{id: 2, name: 'ZZZ', prioritized: false},
			{id: 3, name: '', prioritized: true},
			{id: 4, name: 'BBB', prioritized: false}
		].sort((a, b) =>
			SortCompares([
				[a.name, b.name, 'Bottom'],
				[a.id, b.id]
			])
		)
	).toEqual([
		{id: 1, name: 'AAA', prioritized: false},
		{id: 4, name: 'BBB', prioritized: false},
		{id: 2, name: 'ZZZ', prioritized: false},
		{id: 3, name: '', prioritized: true}
	])

	expect(
		[
			{id: 1, name: 'AAA', prioritized: false},
			{id: 2, name: 'ZZZ', prioritized: false},
			{id: 3, name: '', prioritized: true},
			{id: 4, name: 'BBB', prioritized: false}
		].sort((a, b) =>
			SortCompares([
				[a.name, b.name, 'Top'],
				[a.id, b.id]
			])
		)
	).toEqual([
		{id: 3, name: '', prioritized: true},
		{id: 1, name: 'AAA', prioritized: false},
		{id: 4, name: 'BBB', prioritized: false},
		{id: 2, name: 'ZZZ', prioritized: false}
	])

	expect([0, 3, 1, 2].sort((a, b) => SortCompares([a, b]))).toEqual([0, 1, 2, 3])

	expect([0, 3, 2, 1].sort((a, b) => SortCompares([a, b, 'Bottom0']))).toEqual([1, 2, 3, 0])

	expect([0, 3, 2, 1].sort((a, b) => SortCompares([a, b, 'Bottom']))).toEqual([0, 1, 2, 3])

	expect([0, 3, null, 2, 1].sort((a, b) => SortCompares([a, b, 'Bottom']))).toEqual([0, 1, 2, 3, null])

	expect([0, 3, null, 2, 1].sort((a, b) => SortCompares([a, b, 'Bottom0']))).toEqual([1, 2, 3, 0, null])

	expect(
		[
			{id: 1, name: 'AAA', prioritized: false},
			{id: 2, name: 'ZZZ', prioritized: false},
			{id: 3, name: '', prioritized: true},
			{id: 4, name: 'BBB', prioritized: false}
		].sort((a, b) =>
			SortCompares([
				[a.name, b.name, ['ZZZ', 'AAA', 'BBB']],
				[a.id, b.id]
			])
		)
	).toEqual([
		{id: 3, name: '', prioritized: true},
		{id: 2, name: 'ZZZ', prioritized: false},
		{id: 1, name: 'AAA', prioritized: false},
		{id: 4, name: 'BBB', prioritized: false}
	])

	expect(
		[
			{id: 1, name: 'AAA', prioritized: false},
			{id: 2, name: 'ZZZ', prioritized: false},
			{id: 3, name: '', prioritized: true},
			{id: 4, name: 'BBB', prioritized: false}
		].sort((a, b) =>
			SortCompares([
				[a.name, b.name, 'Bottom', ['ZZZ', 'AAA', 'BBB']],
				[a.id, b.id]
			])
		)
	).toEqual([
		{id: 2, name: 'ZZZ', prioritized: false},
		{id: 1, name: 'AAA', prioritized: false},
		{id: 4, name: 'BBB', prioritized: false},
		{id: 3, name: '', prioritized: true}
	])
})

test('Sort Array', () => {
	expect(
		[
			{id: 1, name: 'One'},
			{id: 2, name: 'Two'},
			{id: 3, name: 'Three'},
			{id: 4, name: 'Four'},
			{id: 5, name: 'Five'},
			{id: null, name: 'Empty'},
			{id: 7, name: 'Seven'},
			{id: 6, name: 'Six'}
		].sort((a, b) => SortPerArray(a.id, b.id, [4, 5, 3, 2, 1], 'Bottom'))
	).toEqual([
		{id: 4, name: 'Four'},
		{id: 5, name: 'Five'},
		{id: 3, name: 'Three'},
		{id: 2, name: 'Two'},
		{id: 1, name: 'One'},
		{id: null, name: 'Empty'},
		{id: 6, name: 'Six'},
		{id: 7, name: 'Seven'}
	])
})

test('Sort Index Numeric', () => {
	expect([2, 4, 3, 1, 4].sort((a, b) => SortIndex(a, b, [4, 3, 2, 1]))).toEqual([4, 4, 3, 2, 1])
})

test('Sort Index String', () => {
	expect(
		['Three', 'One', 'Four', 'One', 'Two'].sort((a, b) => SortIndex(a, b, ['One', 'Two', 'Three', 'Four']))
	).toEqual(['One', 'One', 'Two', 'Three', 'Four'])
})

test('SearchTerms', () => {
	expect(SearchTerms('John Doe',)).toEqual(['john', 'doe'])
	expect(SearchTerms('John.Doe',)).toEqual(['john.doe'])
	expect(SearchTerms('1000.50',)).toEqual(['1000.50'])

})


test('Search', () => {
	expect(ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['24'])).toEqual(true)
	expect(ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['John'])).toEqual(true)
	expect(ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['John', '24'])).toEqual(true)
	expect(ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['Fred', '24'])).toEqual(false)
	expect(ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['Fred'])).toEqual(false)
	expect(ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['Fred', '24'], {matchSomeTerm: true})).toEqual(true)
	expect(ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['Fred', '24'], {matchFromTerm: 1})).toEqual(true)
	expect(ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['24', 'Fred'], {matchFromTerm: 1})).toEqual(false)
	expect(ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['Fred', '24'], {matchUntilTerm: 0})).toEqual(false)
	expect(
		ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['Fred', '24', 'Sally'], {
			matchFromTerm: 1,
			matchUntilTerm: 1
		})
	).toEqual(true)
	expect(
		ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['john', '25', 'doe'], {
			matchFromTerm: 1,
			matchUntilTerm: 1
		})
	).toEqual(false)
	expect(ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['24', 'Fred'], {matchFromTerm: 1})).toEqual(false)
	expect(ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['24', 'Fred'], {matchUntilTerm: 0})).toEqual(true)
	expect(SearchRow({user: 'john doe', age: 24}, '24 Fred', {matchUntilTerm: 0})).toEqual(true)
	expect(SearchRow({user: 'john doe', age: 24}, 'Fred 24', {matchUntilTerm: 0})).toEqual(false)
	expect(SearchRow({user: 'john doe', age: 24}, '24 Fred', {matchFromTerm: 1})).toEqual(false)
	expect(SearchRow({user: 'john doe', age: 24}, 'Fred 24', {matchFromTerm: 1})).toEqual(true)
	expect(SearchRow({user: 'john doe', age: 24}, '24 Fred', {matchFromTerm: 2})).toEqual(false)
	expect(
		SearchRows(
			[
				{user: 'john doe', age: 1},
				{user: 'john doe', age: 2},
				{user: 'john doe', age: 3},
				{user: 'john doe', age: 4},
				{user: 'john doe', age: 5}
			],
			'john',
			{limit: 2}
		)
	).toEqual([
		{user: 'john doe', age: 1},
		{user: 'john doe', age: 2}
	])
	expect(
		SearchRows(
			[
				{user: 'john doe', age: 1},
				{user: 'john doe', age: 2},
				{user: 'john doe', age: 3},
				{user: 'john doe', age: 4},
				{user: 'john doe', age: 5}
			],
			'john',
			{limit: 2,
				page: 1}
		)
	).toEqual([
		{user: 'john doe', age: 1},
		{user: 'john doe', age: 2}
	])
	expect(
		SearchRows(
			[
				{user: 'john doe', age: 1},
				{user: 'john doe', age: 2},
				{user: 'john doe', age: 3},
				{user: 'john doe', age: 4},
				{user: 'john doe', age: 5}
			],
			'john',
			{limit: 2,
				page: 2}
		)
	).toEqual([
		{user: 'john doe', age: 3},
		{user: 'john doe', age: 4}
	])
	expect(
		SearchRows(
			[
				{user: 'john doe', age: 1},
				{user: 'john doe', age: 2},
				{user: 'john doe', age: 3},
				{user: 'john doe', age: 4},
				{user: 'john doe', age: 5}
			],
			'john',
			{limit: 2,
				page: 3}
		)
	).toEqual([
		{user: 'john doe', age: 5}
	])
	expect(
		SearchRows(
			[
				{user: 'john doe', age: 1},
				{user: 'john doe', age: 2},
				{user: 'john doe', age: 3},
				{user: 'john doe', age: 4},
				{user: 'john doe', age: 5}
			],
			'john',
			{limit: 2,
				page: 4}
		)
	).toEqual([])
	expect(
		SearchRows(
			[
				{user: 'john doe', age: 1.1},
				{user: 'john doe', age: 2.2},
				{user: 'john doe', age: 3.3},
				{user: 'john doe', age: 2.21},
				{user: 'john doe 2.2', age: 5}
			],
			'2.2'
		)
	).toEqual([{user: 'john doe', age: 2.2}, {user: 'john doe', age: 2.21}, {user: 'john doe 2.2', age: 5}])
	const activeList = [
		{id: 1, is_active: true},
		{id: 2, is_active: false}
	]
	expect(activeList.filter((aL) => FindIsActive(aL.is_active, null))).toEqual(activeList)
	expect(activeList.filter((aL) => FindIsActive(aL.is_active, true))).toEqual([{id: 1, is_active: true}])
	expect(activeList.filter((aL) => FindIsActive(aL.is_active, false))).toEqual([{id: 2, is_active: false}])
	expect(
		[
			{id: 1, version: '1.1'},
			{id: 2, version: '1.10'},
			{id: 3, version: '1.2'}
		].sort((a, b) => SortSplitItems(a.version, b.version))
	).toEqual([
		{id: 1, version: '1.1'},
		{id: 3, version: '1.2'},
		{id: 2, version: '1.10'}
	])
})

describe('isNullUndefined', () => {
	test('should return true for null values', () => {
		expect(isNullUndefined(null)).toBe(true)
	})

	test('should return true for undefined values', () => {
		expect(isNullUndefined(undefined)).toBe(true)
	})

	test('should return false for non-null or non-undefined values', () => {
		expect(isNullUndefined(0)).toBe(false)
		expect(isNullUndefined(false)).toBe(false)
		expect(isNullUndefined('')).toBe(false)
		expect(isNullUndefined([])).toBe(false)
		expect(isNullUndefined({})).toBe(false)
	})
})

describe('PagesForRange', () => {
	test('Check spread of pages to display', () => {
		expect(PagesForRange(1, 10)).toEqual([1, 2, 3, null, 10])
		expect(PagesForRange(9, 10)).toEqual([1, null, 7, 8, 9, 10])
		expect(PagesForRange(1, 10, 3)).toEqual([1, 2, 3, 4, null, 10])
		expect(PagesForRange(50, 100)).toEqual([1, null, 49, 50, 51, null, 100])
		expect(PagesForRange(50, 100, 3)).toEqual([1, null, 48, 49, 50, 51, 52, null, 100])
	})
})
