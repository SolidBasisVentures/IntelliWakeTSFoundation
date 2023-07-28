import {ESTTodayDateTimeLabel, TimeOnly} from '../src/DateManager'
import {ConstrainObject} from '../src/ObjectConstraint'
import {CleanNumberNull} from '../src/Functions'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

// const dates = ['1960-01-01', '1970-01-01', 'blah', 'Not a date']
//
// dates.forEach((date) => console.log(date, '=', DateOnlyNull(date)))

console.log(
	CleanNumberNull('0.00'),
	ConstrainObject(
		{
			id: '1',
			value: '0.00'
		} as any,
		{
			id: {type: 'number', nullable: false, default: 0},
			value: {type: 'number', default: 0, nullable: true}
		}
	)
)

console.timeEnd('Consoles')
