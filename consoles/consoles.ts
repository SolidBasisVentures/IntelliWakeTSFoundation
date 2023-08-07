import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {ToCurrencyBlank} from '../src/StringManipulation'
import {AddPrefixToObject} from '../src/Functions'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

// const dates = ['1960-01-01', '1970-01-01', 'blah', 'Not a date']
//
// dates.forEach((date) => console.log(date, '=', DateOnlyNull(date)))

console.log(ToCurrencyBlank('$-100', 2))

type TTest = AddPrefixToObject<{name: string}, 'test_'>

const test: TTest = {
	test_name: 'Test'
}

console.timeEnd('Consoles')
