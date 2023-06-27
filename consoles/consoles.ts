import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {StringCompares} from '../src/StringManipulation'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

const start = [1, 2, 3, 4, 7, 8].map((id) => `Test${id}`).join('\r\n')
const end = [1, 2, 5, 6, 8].map((id) => `Test${id}`).join('\r\n')

console.log(StringCompares(start, end))

console.timeEnd('Consoles')
