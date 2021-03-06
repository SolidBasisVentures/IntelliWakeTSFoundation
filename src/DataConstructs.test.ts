import {AddChange, AddIDChange, ArrayWithIDChanges, ObjectWithChanges} from './DataConstructs'

test('AddChange New Prop', () => {
	expect(AddChange('name', 'Bob', {})).toEqual({name: 'Bob'})
})

test('AddChange Update Prop', () => {
	expect(AddChange('name', 'Bob', {name: 'John'})).toEqual({name: 'Bob'})
})

test('ObjectWithChanges', () => {
	expect(ObjectWithChanges({id: 1, name: 'Bob'}, {'name': 'John'})).toEqual({id: 1, name: 'John'})
})

test('AddIDChange New ID', () => {
	expect(AddIDChange(1, 'name', 'Bob', {})).toEqual({1: {name: 'Bob'}})
})

test('AddIDChange Update ID', () => {
	expect(AddIDChange(1, 'name', 'Bob', {1: {name: 'John'}})).toEqual({1: {name: 'Bob'}})
})

test('ArrayWithIDChanges Update ID', () => {
	expect(ArrayWithIDChanges([{id: 1, name: 'Bob'}, {id: 2, name: 'John'}], {1: {'name': 'Bobby'}, 2: {'name': 'Johnny'}})).toEqual([{id: 1, name: 'Bobby'}, {id: 2, name: 'Johnny'}])
})
