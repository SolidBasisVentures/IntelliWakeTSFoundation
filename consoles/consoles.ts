import {DateOnly, ESTTodayDateTimeLabel} from '../src/DateManager'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(DateOnly('2022-12-11'))

console.timeEnd('Consoles')
