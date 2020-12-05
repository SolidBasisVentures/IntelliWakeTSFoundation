// const moment = require('moment-timezone')

import {SortCompare, SortCompareNull} from '../src/SortSearch'

require('source-map-support').install()

const items = [
	{id: 1, name: 'AAA', prioritized: false},
	{id: 2, name: 'ZZZ', prioritized: false},
	{id: 3, name: 'CCC', prioritized: true},
	{id: 4, name: 'BBB', prioritized: false}
]

// const itemsResult = [
// 	{ id: 3, name: 'CCC', prioritized: true },
// 	{ id: 1, name: 'AAA', prioritized: false },
// 	{ id: 4, name: 'BBB', prioritized: false },
// 	{ id: 2, name: 'ZZZ', prioritized: false }
// ]

console.log(items.map(item => item.name).sort())
console.log(items.sort((a, b) => SortCompareNull(b.prioritized, a.prioritized) ?? SortCompare(a.name, b.name)))
