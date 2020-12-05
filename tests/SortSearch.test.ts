import {SortCompare, SortCompareNull} from '../src/SortSearch'

test('SortCompare', () => {
	expect([
		{id: 1, name: 'AAA', prioritized: false},
		{id: 2, name: 'ZZZ', prioritized: false},
		{id: 3, name: 'CCC', prioritized: true},
		{id: 4, name: 'BBB', prioritized: false}
	].sort((a, b) => SortCompareNull(b.prioritized, a.prioritized) ?? SortCompare(a.name, b.name))).toEqual([
		{ id: 3, name: 'CCC', prioritized: true },
		{ id: 1, name: 'AAA', prioritized: false },
		{ id: 4, name: 'BBB', prioritized: false },
		{ id: 2, name: 'ZZZ', prioritized: false }
	]);
})
