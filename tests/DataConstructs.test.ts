import {AddChange, AddIDChange} from '../src/DataConstructs'

test('ApplyChange New Prop', () => {
	expect(AddChange('name', 'Bob', {})).toEqual({name: 'Bob'})
})

test('ApplyChange Update Prop', () => {
	expect(AddChange('name', 'Bob', {name: 'John'})).toEqual({name: 'Bob'})
})

test('ApplyIDChange New ID', () => {
	expect(AddIDChange(1, 'name', 'Bob', {})).toEqual({1: {name: 'Bob'}})
})

test('ApplyIDChange Update ID', () => {
	expect(AddIDChange(1, 'name', 'Bob', {1: {name: 'John'}})).toEqual({1: {name: 'Bob'}})
})
