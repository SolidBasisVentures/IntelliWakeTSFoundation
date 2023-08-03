import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {ToCurrencyBlank} from '../src/StringManipulation'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

// const dates = ['1960-01-01', '1970-01-01', 'blah', 'Not a date']
//
// dates.forEach((date) => console.log(date, '=', DateOnlyNull(date)))

console.log(ToCurrencyBlank('$-100', 2))

console.timeEnd('Consoles')
