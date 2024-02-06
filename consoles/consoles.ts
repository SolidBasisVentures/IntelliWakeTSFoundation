import {DateFormat, ESTTodayDateTimeLabel, NowISOString} from '../src/DateManager'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(DateFormat('ISOInput', 'now'))
console.log(DateFormat('ISO', 'now'))

console.timeEnd('Consoles')
