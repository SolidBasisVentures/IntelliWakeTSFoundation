import {DateISO, DateOnly, ESTTodayDateTimeLabel, TimeOnly} from '../src/DateManager'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(DateOnly('2023-03-08', {week: 'StartOf', timezoneDisplay: 'America/New_York'}))

console.timeEnd('Consoles')
