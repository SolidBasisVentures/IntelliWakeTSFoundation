import {ApplyChange, ApplyIDChange} from '../src/DataConstructs'

test('ApplyChange New Prop', () => {
	expect(ApplyChange('name', 'Bob', {})).toEqual({name: 'Bob'})
})

test('ApplyChange Update Prop', () => {
	expect(ApplyChange('name', 'Bob', {name: 'John'})).toEqual({name: 'Bob'})
})

test('ApplyIDChange New ID', () => {
	expect(ApplyIDChange(1, 'name', 'Bob', {})).toEqual({1: {name: 'Bob'}})
})

test('ApplyIDChange Update ID', () => {
	expect(ApplyIDChange(1, 'name', 'Bob', {1: {name: 'John'}})).toEqual({1: {name: 'Bob'}})
})
