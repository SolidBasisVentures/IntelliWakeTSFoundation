import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {GetPropertyValueCaseInsensitive} from '../src/Functions'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(GetPropertyValueCaseInsensitive({One: 1}, 'One'))

console.timeEnd('Consoles')
