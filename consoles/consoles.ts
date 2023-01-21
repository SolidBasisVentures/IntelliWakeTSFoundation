import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {SubsetFormEqual} from '../src/DeepEqual'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')


console.log(SubsetFormEqual({smsphone: '3344'}, {smsphone: '334455'}))

console.timeEnd('Consoles')
