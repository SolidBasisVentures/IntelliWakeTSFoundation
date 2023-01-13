import {ConstrainObject} from './ObjectConstraint'
import {ObjectConstraintTest} from '../consoles/TestDatum'

test('ObjectConstraint', () => {
	expect(ConstrainObject({
		id: '1',
		name: null,
		start_date: '1/1/2023',
		ids: '1',
		is_active: 'false'
	}, ObjectConstraintTest)).toEqual({
		id: 1,
		name: '',
		start_date: '2023-01-01',
		ids: [1],
		is_active: false
	})

	expect(ConstrainObject({
		id: '1',
		name: null,
		start_date: '1/1/2023',
		ids: ['1', 2, 0, null, ''],
		is_active: 'false'
	}, ObjectConstraintTest)).toEqual({
		id: 1,
		name: '',
		start_date: '2023-01-01',
		ids: [1, 2],
		is_active: false
	})
})
