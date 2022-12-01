import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {AsteriskMatch} from '../src/StringManipulation'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

const sets: [string, string][] = [
	['Dennis', 'De*is'],
	['Dennis', 'Dez*is'],
	['Dennis', '*De*is*'],
	['Dennis', '*z*is']

]

for (const set of sets) {
	console.log(set[0], set[1], AsteriskMatch(set[0], set[1]))
}

console.timeEnd('Consoles')
