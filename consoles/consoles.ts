import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {SortCompares} from '../src/SortSearch'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log([0, 3, 1, 2].sort((a, b) => SortCompares([a, b])))

console.timeEnd('Consoles')
