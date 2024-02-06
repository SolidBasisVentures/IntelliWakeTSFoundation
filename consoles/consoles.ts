import {EasterDate, ESTTodayDateTimeLabel} from '../src/DateManager'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(EasterDate(2024))

console.timeEnd('Consoles')
