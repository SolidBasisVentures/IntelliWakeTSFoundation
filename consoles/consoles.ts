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
import {DistributeEvenly} from '../src/Functions'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log('Dist', DistributeEvenly(100, [0, 0, 0]))

console.timeEnd('Consoles')
