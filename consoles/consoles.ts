import {ESTTodayDateTimeLabel, TimeOnly} from '../src/DateManager'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(TimeOnly('now'))

console.timeEnd('Consoles')
