import {
	AddChange,
	AddIDChange,
	ArrayWithIDChanges,
	ChangeArrayByIDOrUUID,
	CombineArrayWithIDOrUUIDChanges,
	ObjectWithChanges,
	RemoveDupPropertiesByIDArray
} from './DataConstructs'

test('Data Contructs', () => {
	expect(AddChange('name', 'Bob', {})).toEqual({name: 'Bob'})
	expect(AddChange('name', 'Bob', {name: 'John'})).toEqual({name: 'Bob'})
	expect(ObjectWithChanges({id: 1, name: 'Bob'}, {'name': 'John'})).toEqual({id: 1, name: 'John'})
	expect(AddIDChange(1, 'name', 'Bob', {})).toEqual({1: {name: 'Bob'}})
	expect(AddIDChange(1, 'name', 'Bob', {1: {name: 'John'}})).toEqual({1: {name: 'Bob'}})
	expect(ArrayWithIDChanges([{id: 1, name: 'Bob'}, {id: 2, name: 'John'}], {
		1: {'name': 'Bobby'},
		2: {'name': 'Johnny'}
	})).toEqual([{id: 1, name: 'Bobby'}, {id: 2, name: 'Johnny'}])
	expect(RemoveDupPropertiesByIDArray({
		1: {
			name: 'john doe',
			age: 24
		}
	}, [
		{id: 1, user: 'john smith', age: 24},
		{id: 2, user: 'sally jones', age: 32}
	])).toEqual({
		1: {
			name: 'john doe'
		}
	})
	
	expect(ChangeArrayByIDOrUUID([{id: 1, name: 'Bob', age: 35}, {uuid: 'abcd', name: 'John', age: 40}] as any[], {
		id: 1,
		name: 'Bobby'
	}, {}))
		.toEqual([{id: 1, name: 'Bobby', age: 35}, {uuid: 'abcd', name: 'John', age: 40}])
	
	expect(ChangeArrayByIDOrUUID([
		{id: 1, name: 'Bob', age: 35}, {
			uuid: 'abcd',
			name: 'John',
			age: 40
		}
	] as any[], {uuid: 'abcd', age: 42}, {}))
		.toEqual([{id: 1, name: 'Bob', age: 35}, {uuid: 'abcd', name: 'John', age: 42}])
	
	expect(CombineArrayWithIDOrUUIDChanges([
		{id: 1, name: 'Bob', age: 35}, {
			id: 2,
			name: 'Sally',
			age: 25
		}
	] as any[], [{id: 1, name: 'Bobby'}, {uuid: 'abcd', age: 42}] as any[], {}))
		.toEqual([{id: 1, name: 'Bobby', age: 35}, {id: 2, name: 'Sally', age: 25}, {uuid: 'abcd', age: 42}])
})
