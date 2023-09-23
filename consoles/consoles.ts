import {
	DateFormat,
	DateFormatAny,
	DateObject,
	DateOnly,
	DateOnlyNull,
	ESTTodayDateTimeLabel,
	TimeOnly
} from '../src/DateManager'
import {StringGetSets} from '../src/Evaluator'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log('Sets', StringGetSets('Test[1]-[2][3]-[4[1]][[1]5]', '[', ']'))

console.timeEnd('Consoles')
