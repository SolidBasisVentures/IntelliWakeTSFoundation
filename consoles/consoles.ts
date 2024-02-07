import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {ConstrainObject} from '../src/ObjectConstraint'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

const obj = ConstrainObject(
	{
		id: '1',
		value: '{"test": "T"}'
	} as any,
	{
		id: {type: 'number', nullable: false, default: 0},
		value: {type: 'object', nullable: true}
	}
)

console.log(obj.value)

console.timeEnd('Consoles')
