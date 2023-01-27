import {ConstrainObject, ObjectFromFormData} from './ObjectConstraint'
import {ObjectConstraintTest, TestFormData} from './TestDatum'
import {test, expect} from 'vitest'

test('ObjectConstraint', () => {
	expect(ConstrainObject({
		id: '1',
		name: null,
		start_date: '1/1/2023',
		ids: '1',
		salary: '5000',
		is_active: 'false'
	} as any, ObjectConstraintTest)).toEqual({
		id: 1,
		name: '',
		start_date: '2023-01-01',
		ids: [1],
		salary: 10000,
		is_active: false
	})

	expect(ConstrainObject({
		id: '1',
		name: null,
		start_date: '1/1/2023',
		ids: ['1', 2, 0, null, ''],
		salary: '15000',
		is_active: 'false'
	} as any, ObjectConstraintTest)).toEqual({
		id: 1,
		name: '',
		start_date: '2023-01-01',
		ids: [1, 2],
		salary: 15000,
		is_active: false
	})

	expect(ConstrainObject({
		id: '1',
		name: null,
		start_date: '1/1/2023',
		ids: ['1', 2, 0, null, ''],
		salary: 25000,
		is_active: 'false'
	} as any, ObjectConstraintTest)).toEqual({
		id: 1,
		name: '',
		start_date: '2023-01-01',
		ids: [1, 2],
		salary: 20000,
		is_active: false
	})

	expect(ConstrainObject({
		id: '1',
		name: null,
		start_date: '1/1/2023',
		ids: ['1', 2, 0, null, ''],
		salary: null,
		is_active: 'false'
	}, {...ObjectConstraintTest, name: {...ObjectConstraintTest.name, nullable: true}, salary: {...ObjectConstraintTest.salary, nullable: true}})).toEqual({
		id: 1,
		name: null,
		start_date: '2023-01-01',
		ids: [1, 2],
		salary: null,
		is_active: false
	})

	expect(ConstrainObject({
		id: '1',
		name: '',
		start_date: '1/1/2023',
		ids: ['1', 2, 0, null, ''],
		salary: 0,
		is_active: 'false'
	}, {...ObjectConstraintTest, name: {...ObjectConstraintTest.name, nullable: true}, salary: {...ObjectConstraintTest.salary, nullable: true}})).toEqual({
		id: 1,
		name: null,
		start_date: '2023-01-01',
		ids: [1, 2],
		salary: null,
		is_active: false
	})
})

test('FormData', () => {
	expect(ObjectFromFormData(TestFormData())).toEqual({
		id: '1',
		features: ['One', 'Two', 'Three'],
		is_active: 'false'
	})

	expect(ObjectFromFormData(TestFormData(), {constraint: ObjectConstraintTest})).toEqual({
		id: 1,
		features: ['One', 'Two', 'Three'],
		is_active: false
	})

	expect(ObjectFromFormData(TestFormData(), {default: {
			id: 0,
			features: ['Zero'],
			is_active: true
		}})).toEqual({
		id: 1,
		features: ['One', 'Two', 'Three'],
		is_active: false
	})
})
