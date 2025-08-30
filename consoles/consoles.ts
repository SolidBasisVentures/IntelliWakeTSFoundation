import {DateDiff, ESTTodayDateTimeLabel} from '../src/DateManager'

require('source-map-support').install()

console.info('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log('Date Diff', DateDiff('9999-01-01', 'now', 'year'))

console.timeEnd('Consoles')
