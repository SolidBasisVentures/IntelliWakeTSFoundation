import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {ToInitials} from '../src/StringManipulation'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

const wordSets = [
	'Dennis Peters',
	'Dennis-Peters',
	'Dennis _ Peters',
	'DennisPeters',
	'Dennis J Peters',
	'DennisJPeters',
	'EmployeeID',
	'employee_id',
	'DENNISPeters',
	'EmployeeIDAssigned'
]

console.log('-----------Started')

for (const wordSet of wordSets) {
	console.log(wordSet, ToInitials(wordSet))
}

console.timeEnd('Consoles')
