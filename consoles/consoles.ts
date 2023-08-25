import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {PrefixKeys} from '../src/Functions'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

// const dates = ['1960-01-01', '1970-01-01', 'blah', 'Not a date']
//
// dates.forEach((date) => console.log(date, '=', DateOnlyNull(date)))

const testObject = {
	id: 1,
	name: 'Dennis'
}

const result = PrefixKeys(testObject, 'employee_')

console.log(result)

console.timeEnd('Consoles')
