import {DateFormatAny, DateOnlyNull, ESTTodayDateTimeLabel, TimeOnly} from '../src/DateManager'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(DateFormatAny('MMDDYYYY', '2023-04-05'))
console.log(DateFormatAny('HH:mm', '2023-04-05 08:00:00'))
console.log(DateFormatAny('HH:mm', '08:00:00'))

console.timeEnd('Consoles')
