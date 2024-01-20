import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {EnumArray} from '../src/Enums'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

enum Gender {
	Male = 'm',
	Female = 'f'
}

console.log(EnumArray(Gender))

console.timeEnd('Consoles')
