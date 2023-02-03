import {
	AddChange,
	AddIDChange,
	ArrayWithIDChanges,
	ChangeArrayByIDOrUUID,
	CombineArrayWithIDOrUUIDChanges,
	IsEqual,
	ObjectWithChanges,
	RemoveDupProperties,
	RemoveDupPropertiesByIDArray
} from './DataConstructs'
import {ReSortOrder} from './SortSearch'

test('Data Contructs', () => {
	expect(AddChange('name', 'Bob', {})).toEqual({name: 'Bob'})
	expect(AddChange('name', 'Bob', {name: 'John'})).toEqual({name: 'Bob'})
	expect(ObjectWithChanges({id: 1, name: 'Bob'}, {name: 'John'})).toEqual({id: 1, name: 'John'})
	expect(AddIDChange(1, 'name', 'Bob', {})).toEqual({1: {name: 'Bob'}})
	expect(AddIDChange(1, 'name', 'Bob', {1: {name: 'John'}})).toEqual({1: {name: 'Bob'}})
	expect(
		ArrayWithIDChanges(
			[
				{id: 1, name: 'Bob'},
				{id: 2, name: 'John'}
			],
			{
				1: {name: 'Bobby'},
				2: {name: 'Johnny'}
			}
		)
	).toEqual([
		{id: 1, name: 'Bobby'},
		{id: 2, name: 'Johnny'}
	])
	expect(
		RemoveDupPropertiesByIDArray(
			{
				1: {
					name: 'john doe',
					age: 24
				}
			},
			[
				{id: 1, user: 'john smith', age: 24},
				{id: 2, user: 'sally jones', age: 32}
			]
		)
	).toEqual({
		1: {
			name: 'john doe'
		}
	})

	expect(IsEqual(undefined, undefined)).toBe(true)
	expect(IsEqual(null, null)).toBe(true)
	expect(IsEqual(null, undefined)).toBe(false)
	expect(IsEqual([1], 2)).toBe(false)
	expect(IsEqual(1, [2])).toBe(false)
	expect(IsEqual([1], [2])).toBe(false)
	expect(IsEqual([1], [])).toBe(false)
	expect(IsEqual([1], [1])).toBe(true)

	expect(
		ChangeArrayByIDOrUUID(
			[
				{id: 1, name: 'Bob', age: 35},
				{uuid: 'abcd', name: 'John', age: 40}
			] as any[],
			{
				id: 1,
				name: 'Bobby'
			},
			{}
		)
	).toEqual([
		{id: 1, name: 'Bobby', age: 35},
		{uuid: 'abcd', name: 'John', age: 40}
	])

	expect(
		ChangeArrayByIDOrUUID(
			[
				{id: 1, name: 'Bob', age: 35},
				{
					uuid: 'abcd',
					name: 'John',
					age: 40
				}
			] as any[],
			{uuid: 'abcd', age: 42},
			{}
		)
	).toEqual([
		{id: 1, name: 'Bob', age: 35},
		{uuid: 'abcd', name: 'John', age: 42}
	])

	expect(
		CombineArrayWithIDOrUUIDChanges(
			[
				{id: 1, name: 'Bob', age: 35},
				{
					id: 2,
					name: 'Sally',
					age: 25
				}
			] as any[],
			[
				{id: 1, name: 'Bobby'},
				{uuid: 'abcd', age: 42}
			] as any[],
			{}
		)
	).toEqual([
		{id: 1, name: 'Bobby', age: 35},
		{id: 2, name: 'Sally', age: 25},
		{uuid: 'abcd', age: 42}
	])

	expect(
		ReSortOrder([
			{id: 1, sort_order: 20},
			{id: 2, sort_order: 50},
			{id: 3, sort_order: 44},
			{id: 4, sort_order: 10},
			{id: 5, sort_order: 30}
		])
	).toEqual([
		{id: 4, sort_order: 10},
		{id: 1, sort_order: 20},
		{id: 5, sort_order: 30},
		{id: 3, sort_order: 40},
		{id: 2, sort_order: 50}
	])

	expect(
		RemoveDupProperties({id: 1, sts: '2021-12-20T17:28:01.130Z'}, {id: 2, sts: '2021-12-20 12:28:01.14-05'})
	).toEqual({id: 1})
	expect(
		RemoveDupProperties({id: 1, sts: '2021-12-20T17:28:01.130Z'}, {id: 2, sts: '2021-12-20 12:28:02.14-05'})
	).toEqual({id: 1, sts: '2021-12-20T17:28:01.130Z'})
	expect(RemoveDupProperties({id: 1, sts: '2021'}, {id: 2, sts: '2022'})).toEqual({id: 1, sts: '2021'})
	expect(RemoveDupProperties({is_item: false}, {is_item: false})).toEqual({})
	expect(RemoveDupProperties<{is_item: boolean | null}>({is_item: false}, {is_item: null})).toEqual({is_item: false})
	expect(RemoveDupProperties<{is_item: boolean | null}>({is_item: null}, {is_item: false})).toEqual({is_item: null})
})
