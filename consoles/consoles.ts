import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {ToArray, ValidNumbers} from '../src/Functions'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(ValidNumbers(-1, 0), ToArray(0))

console.timeEnd('Consoles')
