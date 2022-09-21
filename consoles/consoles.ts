import {DateFormatAny, DateFromWeekNumber, DateOnly, DateWeekNumber} from '../src/DateManager'
import {CleanNumberNull} from '../src/Functions'

require('source-map-support').install()

console.time('Consoles')

console.log(DateOnly('now'), DateWeekNumber(), DateFromWeekNumber(CleanNumberNull(DateFormatAny('YYYY', 'now')) ?? 2022, DateWeekNumber() ?? 0))
console.log(DateWeekNumber('2022-09-20'))
console.log(DateWeekNumber('2022-09-13'))
console.log(DateWeekNumber('now', {week: -1}))

console.log(DateFromWeekNumber(2022, 38))

console.timeEnd('Consoles')
