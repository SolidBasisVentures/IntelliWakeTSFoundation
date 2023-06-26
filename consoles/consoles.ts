import {DateFormat, DateOnly, ESTTodayDateTimeLabel} from '../src/DateManager'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

process.env.TZ = 'UTC'

console.log(DateFormat('Local', '2023-07-13'))
console.log(DateOnly('2023-07-13', {formatLocale: true}))

console.timeEnd('Consoles')
