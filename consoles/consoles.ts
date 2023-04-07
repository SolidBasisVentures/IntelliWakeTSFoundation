import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {DeepEqual} from '../src/DeepEqual'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(DeepEqual({quantity_form_id: '28360'}, {quantity_form_id: '28361'}))

console.timeEnd('Consoles')
