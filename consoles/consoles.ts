import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {EnumKeyNames} from '../src/Enums'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

enum Gender {
	Male = 'm',
	Female = 'f'
}

console.log(EnumKeyNames(Gender))

console.timeEnd('Consoles')
