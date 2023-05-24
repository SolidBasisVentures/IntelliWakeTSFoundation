import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {ConstrainObject} from '../src/ObjectConstraint'
import {ObjectConstraintTest} from '../src/TestDatum'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(
	ConstrainObject(
		{
			id: '1',
			name: null,
			start_date: '1/1/2023',
			ids: ['1', 2, 0, null, ''],
			ids_null: [],
			salary: '15000',
			is_active: 'false'
		} as any,
		ObjectConstraintTest
	)
)

console.log(
	ConstrainObject(
		{
			id: '1',
			name: null,
			start_date: '1/1/2023',
			ids: ['1', 2, 0, null, ''],
			ids_null: null,
			salary: '15000',
			is_active: 'false'
		} as any,
		ObjectConstraintTest
	)
)

console.timeEnd('Consoles')
