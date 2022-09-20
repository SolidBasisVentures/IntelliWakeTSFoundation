import {DateFromWeekNumber, DateWeekNumber} from '../src/DateManager'

require('source-map-support').install()

console.time('Consoles')

console.log(DateWeekNumber())
console.log(DateWeekNumber('2022-09-20'))
console.log(DateWeekNumber('2022-09-13'))
console.log(DateWeekNumber('now', {week: -1}))

console.log(DateFromWeekNumber(2022, 38))

console.timeEnd('Consoles')
