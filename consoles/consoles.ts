import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {ConstrainObject} from '../src/ObjectConstraint'
import {ObjectConstraintTest} from './TestDatum'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')


console.log(ConstrainObject({
	id: '1',
	name: null,
	start_date: '1/1/2023',
	ids: ['1', 2, ''],
	is_active: 'false'
}, ObjectConstraintTest))

console.timeEnd('Consoles')
