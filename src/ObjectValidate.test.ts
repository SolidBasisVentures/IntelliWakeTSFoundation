import {Validator, EDefaultCheck} from './ObjectValidate'
import {expect, test} from 'vitest'
import {CleanNumber, CleanNumberNull} from './Functions'

test('ObjectValidate', () => {

	expect(
		Validator({
				id: '0',
				name: 'John',
				email: 'Johnnotanemail',
				hire_date: 'dennis',
				salary: '0'
			},
			{
				id: [{[EDefaultCheck.Required]: 'Must have an ID', [EDefaultCheck.AtLeast1Character]: 'Must have 1 char'},
					((_, vals) => CleanNumber(vals.id) < 1 ? `Must be greater than 1` : '')],
				name: [{[EDefaultCheck.Required]: 'Must have a name', [EDefaultCheck.AtLeast5Characters]: 'Must have 5 chars'}],
				email: [{[EDefaultCheck.Required]: 'Must have an email', [EDefaultCheck.IsEmail]: 'Not a valid email'}],
				hire_date: [{[EDefaultCheck.Required]:'Must have hire date', [EDefaultCheck.IsDate]: 'Not a valid date'}],
				salary: [{[EDefaultCheck.Required]: 'Must have salary', [EDefaultCheck.GreaterThan0]: 'Salary must be greater than 0'}]
			})
	).toEqual({
		"email": ["Not a valid email"],
		"hire_date": ["Not a valid date"],
		"id": ["Must be greater than 1"],
		"name": ["Must have 5 chars"],
		"salary": ["Salary must be greater than 0"],
	})

	expect(
	 	Validator({}, {
		    id: [{[EDefaultCheck.Required]: 'Must have an ID', [EDefaultCheck.AtLeast1Character]: 'Must have 1 char'},
			    ((_:any, vals: any) => (CleanNumberNull(vals?.id) as any < 1) ? `Must be greater than 1` : '')],
		    name: {[EDefaultCheck.Required]: 'Must have a name'}
	    })
	 ).toEqual({
		"id": ['Must have an ID', 'Must have 1 char', 'Must be greater than 1'],
		"name": ['Must have a name']
	})

	/**
	 * {
	 *     id: ['Must have an ID', 'Must have 1 char'],
	 *     name: ['Must have a name']
	 * }


	*/expect(
		Validator({id: '',
						name: ''},
			{
			id: [{[EDefaultCheck.Required]: 'Must have an ID', [EDefaultCheck.AtLeast1Character]: 'Must have 1 char'},
				((_, vals) => CleanNumber(vals.id) < 1 ? `Must be greater than 1` : '')],
			name: [{[EDefaultCheck.Required]: 'Must have a name', [EDefaultCheck.AtLeast1Character]: 'Must have 1 char'}]
		})
	).toEqual({
		"id": [
			"Must have an ID",
				"Must have 1 char",
				"Must be greater than 1",
			],
		"name": [
			"Must have a name",
				"Must have 1 char",
			],
	})

	expect(
		Validator({id: '0',
				name: ''},
			{
				id: [{[EDefaultCheck.Required]: 'Must have an ID', [EDefaultCheck.AtLeast1Character]: 'Must have 1 char'},
					((val) => CleanNumber(val) < 1 ? `Must be greater than 1` : '')],
				name: {[EDefaultCheck.Required]: 'Must have a name', [EDefaultCheck.AtLeast1Character]: 'Must have 1 char'}
			})
	).toEqual({
		"id": [
			"Must be greater than 1",
			],
		"name": [
			"Must have a name",
				"Must have 1 char",
			],
	})

	expect(
		Validator({id: '2',
						name: 'John Doe',
						email: 'John@thisemail.com',
						hire_date: '2021-11-12',
						salary: '100000'


			},
			{
				id: [{[EDefaultCheck.Required]: 'Must have an ID', [EDefaultCheck.AtLeast1Character]: 'Must have 1 char'},
					((_, vals) => CleanNumber(vals.id) < 1 ? `Must be greater than 1` : '')],
				name: [{[EDefaultCheck.Required]: 'Must have a name', [EDefaultCheck.AtLeast5Characters]: 'Must have 5 chars'}],
				email: [{[EDefaultCheck.Required]: 'Must have an email', [EDefaultCheck.IsEmail]: 'Not a valid email'}],
				hire_date: [{[EDefaultCheck.Required]:'Must have hire date', [EDefaultCheck.IsDate]: 'Not a valid date'}],
				salary: [{[EDefaultCheck.Required]: 'Must have salary', [EDefaultCheck.GreaterThan0]: 'Salary must be greater than 0'}]
			})
	).toEqual({

})


	expect(
		Validator({
				past_date: '2021-7-9',
				future_date: '2027-3-10'
			},
			{
				past_date: {[EDefaultCheck.IsFutureDate]: 'Not a future date'},
				future_date: {[EDefaultCheck.IsPastDate]: 'Not a past date'}
			})
	).toEqual({
		"future_date": [
			"Not a past date",
			],
		"past_date": [
			"Not a future date",
			],
	})

	expect(
		Validator({
				past_date: '2018-1-7',
				future_date: '2024-6-12'
			},
			{
				past_date: {[EDefaultCheck.IsPastDate]: 'Not a past date'},
				future_date: {[EDefaultCheck.IsFutureDate]: 'Not a future date'}
			})
	).toEqual({

})


})

