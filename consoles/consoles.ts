import {ESTTodayDateTimeLabel, NowISOString} from '../src/DateManager'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(NowISOString())
console.log(NowISOString({day: 'StartOf'}))
console.log(NowISOString({day: 'StartOf', timezoneSource: 'America/New_York'}))

console.timeEnd('Consoles')
