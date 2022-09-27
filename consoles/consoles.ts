import {DatesBetween} from '../src/DateManager'

require('source-map-support').install()

console.time('Consoles')

console.log(DatesBetween('2022-01-01', '2022-03-01', {month: 1}))

console.timeEnd('Consoles')
