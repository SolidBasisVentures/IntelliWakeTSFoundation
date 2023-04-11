import {DateISO, ESTTodayDateTimeLabel, TimeOnly} from '../src/DateManager'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(DateISO('now'))
const testISO = '2023-04-11T13:47:58.969Z'
console.log(TimeOnly(testISO))
console.log(TimeOnly(testISO, {timezoneSource: 'America/New_York'}))
console.log(TimeOnly(testISO, {timezoneSource: 'America/Chicago'}))
console.log(TimeOnly(testISO, {timezoneSource: 'America/Denver'}))

console.timeEnd('Consoles')
