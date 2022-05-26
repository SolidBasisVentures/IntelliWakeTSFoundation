import {SortCompare, SortCompareNull, SortIndex, SortPerArray} from './SortSearch'

test('SortCompare', () => {
	expect([
		{id: 1, name: 'AAA', prioritized: false},
		{id: 2, name: 'ZZZ', prioritized: false},
		{id: 3, name: 'CCC', prioritized: true},
		{id: 4, name: 'BBB', prioritized: false}
	].sort((a, b) => SortCompareNull(b.prioritized, a.prioritized) ?? SortCompare(a.name, b.name))).toEqual([
		{id: 3, name: 'CCC', prioritized: true},
		{id: 1, name: 'AAA', prioritized: false},
		{id: 4, name: 'BBB', prioritized: false},
		{id: 2, name: 'ZZZ', prioritized: false}
	])
})

test('SortCompare Empty Bottom', () => {
	expect([
		{id: 3, name: 'CCC', prioritized: true},
		{id: 1, name: 'AAA', prioritized: undefined},
		{id: 4, name: 'BBB', prioritized: false},
		{id: 2, name: 'ZZZ', prioritized: undefined}
	].sort((a, b) => SortCompareNull(b.prioritized, a.prioritized, 'Bottom') ?? SortCompare(a.name, b.name))).toEqual([
		{id: 3, name: 'CCC', prioritized: true},
		{id: 4, name: 'BBB', prioritized: false},
		{id: 1, name: 'AAA', prioritized: undefined},
		{id: 2, name: 'ZZZ', prioritized: undefined}
	])
})

test('SortCompare Empty Top', () => {
	expect([
		{id: 3, name: 'CCC', prioritized: true},
		{id: 1, name: 'AAA', prioritized: undefined},
		{id: 2, name: 'ZZZ', prioritized: undefined},
		{id: 4, name: 'BBB', prioritized: false}
	].sort((a, b) => SortCompareNull(b.prioritized, a.prioritized, 'Top') ?? SortCompare(a.name, b.name))).toEqual([
		{id: 1, name: 'AAA', prioritized: undefined},
		{id: 2, name: 'ZZZ', prioritized: undefined},
		{id: 3, name: 'CCC', prioritized: true},
		{id: 4, name: 'BBB', prioritized: false}
	])
})

test('SortCompare Empty ID Bottom', () => {
	expect([
		{id: 1, name: 'AAA'},
		{id: null, name: 'ZZZ'},
		{id: null, name: 'CCC'},
		{id: 4, name: 'BBB'}
	].sort((a, b) => SortCompareNull(a.id, b.id, 'Bottom') ?? SortCompare(a.name, b.name))).toEqual([
		{id: 1, name: 'AAA'},
		{id: 4, name: 'BBB'},
		{id: null, name: 'CCC'},
		{id: null, name: 'ZZZ'}
	])
})

test('SortCompare Empty ID Top', () => {
	expect([
		{id: 1, name: 'AAA'},
		{id: null, name: 'ZZZ'},
		{id: null, name: 'CCC'},
		{id: 4, name: 'BBB'}
	].sort((a, b) => SortCompareNull(a.id, b.id, 'Top') ?? SortCompare(a.name, b.name))).toEqual([
		{id: null, name: 'CCC'},
		{id: null, name: 'ZZZ'},
		{id: 1, name: 'AAA'},
		{id: 4, name: 'BBB'}
	])
})

test('Sort Array', () => {
	expect([
		{id: 1, name: 'One'},
		{id: 2, name: 'Two'},
		{id: 3, name: 'Three'},
		{id: 4, name: 'Four'},
		{id: 5, name: 'Five'},
		{id: null, name: 'Empty'},
		{id: 7, name: 'Seven'},
		{id: 6, name: 'Six'}
	].sort((a, b) => SortPerArray(a.id, b.id, [4, 5, 3, 2, 1], 'Bottom'))).toEqual([
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
	expect([2, 4, 3, 1, 4]
		.sort((a, b) => SortIndex(a, b, [4, 3, 2, 1])))
		.toEqual([
			4, 4, 3, 2, 1
		])
})

test('Sort Index String', () => {
	expect(['Three', 'One', 'Four', 'One', 'Two']
		.sort((a, b) => SortIndex(a, b, ['One', 'Two', 'Three', 'Four'])))
		.toEqual([
			'One', 'One', 'Two', 'Three', 'Four'
		])
})
