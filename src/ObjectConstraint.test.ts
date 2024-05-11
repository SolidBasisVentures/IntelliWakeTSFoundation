import {ConstrainObject, FormDataFromObject, ObjectFromFormData} from './ObjectConstraint'
import {ObjectConstraintTest, TestFormData} from './TestDatum'
import {expect, test} from 'vitest'
import {OmitProperty} from './Functions'

test('ObjectConstraint', () => {
	expect(
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
	).toEqual({
		id: 1,
		value: 0
	})
	expect(
		ConstrainObject(
			{
				id: '1',
				value: ''
			} as any,
			{
				id: {type: 'number', nullable: false, default: 0},
				value: {type: 'number', default: 0, nullable: true}
			}
		)
	).toEqual({
		id: 1,
		value: null
	})

	expect(
		ConstrainObject(
			{
				id: '1',
				is_active: false
			} as any,
			{
				id: {type: 'number', nullable: false, default: 0},
				is_active: {type: 'boolean', default: true, nullable: true}
			}
		)
	).toEqual({
		id: 1,
		is_active: false
	})

	expect(
		ConstrainObject(
			{
				id: '1',
				name: null,
				start_date: '1/1/2023',
				ids: '1',
				salary: '5000',
				is_active: 'false'
			} as any,
			ObjectConstraintTest
		)
	).toEqual({
		features: [],
		id: 1,
		name: '',
		start_date: '2023-01-01',
		ids: [1],
		salary: 10000,
		is_active: false
	})

	expect(
		ConstrainObject(
			{
				id: '1',
				is_active: null
			} as any,
			{
				id: {type: 'number', nullable: false, default: 0},
				is_active: {type: 'boolean', default: true, nullable: true}
			}
		)
	).toEqual({
		id: 1,
		is_active: null
	})

	expect(
		ConstrainObject(
			{
				id: '1',
				name: null,
				start_date: '1/1/2023',
				ids: ['1', 2, 0, null, ''],
				salary: '15000',
				is_active: 'false'
			} as any,
			ObjectConstraintTest
		)
	).toEqual({
		id: 1,
		name: '',
		start_date: '2023-01-01',
		features: [],
		ids: [1, 2, 0],
		salary: 15000,
		is_active: false
	})

	expect(
		ConstrainObject(
			{
				id: '1',
				name: null,
				start_date: '1/1/2023',
				ids: ['1', 2, 0, null, ''],
				salary: 25000,
				another_field: 'Test'
			} as any,
			ObjectConstraintTest
		)
	).toEqual({
		id: 1,
		name: '',
		start_date: '2023-01-01',
		features: [],
		ids: [1, 2, 0],
		salary: 20000,
		is_active: true
	})

	expect(
		ConstrainObject(
			{
				id: '1',
				name: null,
				start_date: '1/1/2023',
				ids: ['1', 2, 0, null, ''],
				salary: null,
				is_active: 'false'
			},
			{
				...ObjectConstraintTest,
				name: {...ObjectConstraintTest.name, nullable: true},
				salary: {...ObjectConstraintTest.salary, nullable: true}
			}
		)
	).toEqual({
		id: 1,
		name: null,
		start_date: '2023-01-01',
		features: [],
		ids: [1, 2, 0],
		salary: null,
		is_active: false
	})

	expect(
		ConstrainObject(
			{
				id: '1',
				name: '',
				start_date: '1/1/2023',
				ids: ['1', 2, '0', null, ''],
				salary: 0,
				is_active: 'false'
			},
			{
				...ObjectConstraintTest,
				name: {...ObjectConstraintTest.name, nullable: true},
				salary: {...ObjectConstraintTest.salary, nullable: true}
			}
		)
	).toEqual({
		id: 1,
		name: null,
		start_date: '2023-01-01',
		features: [],
		ids: [1, 2, 0],
		salary: 0,
		is_active: false
	})

	expect(
		ConstrainObject(
			{
				id: '1',
				name: '',
				start_date: '1/1/2023',
				ids: ['1', 2, '0', null, ''],
				salary: 0,
				is_active: 'false'
			},
			{
				...ObjectConstraintTest,
				name: {...ObjectConstraintTest.name, nullable: true},
				salary: OmitProperty({...ObjectConstraintTest.salary, nullIfFalsey: true}, 'minValue')
			}
		)
	).toEqual({
		id: 1,
		name: null,
		start_date: '2023-01-01',
		features: [],
		ids: [1, 2, 0],
		salary: null,
		is_active: false
	})

	expect(
		ConstrainObject(
			{
				id: '1',
				denorm_avg_cost: '1.1577777777777778'
			},
			{
				id: {type: 'number', length: 32, nullable: false},
				denorm_avg_cost: {
					type: 'number',
					length: 16,
					nullable: true
				}
			}
		)
	).toEqual({
		id: 1,
		denorm_avg_cost: 1.157777777777778
	})
})

test('FormData', () => {
	expect(ObjectFromFormData(TestFormData())).toEqual({
		id: '1',
		ids: ['0', '1', '2'],
		features: ['One', 'Two', 'Three'],
		is_active: 'false'
	})

	expect(ObjectFromFormData(TestFormData(), {constraint: ObjectConstraintTest})).toEqual({
		id: 1,
		ids: [0, 1, 2],
		features: ['One', 'Two', 'Three'],
		is_active: false,
		name: '',
		salary: 10000,
		start_date: null
	})

	expect(
		ObjectFromFormData(TestFormData(), {
			default: {
				id: 0,
				features: ['Zero'],
				is_active: true
			}
		})
	).toEqual({
		id: 1,
		features: ['One', 'Two', 'Three'],
		is_active: false
	})

	{
		const formData = FormDataFromObject({test: '1'})
		const testData = formData.get('test')
		expect(
			testData
		).toEqual('1')
	}
})
