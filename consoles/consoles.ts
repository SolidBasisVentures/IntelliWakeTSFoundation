import {
	DateCompare,
	DateDiff,
	DateDiffLongDescription,
	DateISO,
	DateParseTS,
	ESTTodayDateTimeLabel,
	ManualParse
} from '../src/DateManager'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(DateCompare('1/1/2000 12:00:00', 'IsBefore', '1/18/2000 14:00:00', 'days'))

console.timeEnd('Consoles')
