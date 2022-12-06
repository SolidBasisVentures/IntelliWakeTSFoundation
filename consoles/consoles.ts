import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {ArrayRange} from '../src/Functions'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

const sets: [number, number?, number?][] = [
	[10],
	[10, 2],
	[10, 2, 1],
	[-10],
	[-10, 2],
	[-10, 2, 1],
	[-10, 1, -1]
]

for (const set of sets) {
	console.log(set, ArrayRange(set[0], set[1], set[2]))
}

console.timeEnd('Consoles')
