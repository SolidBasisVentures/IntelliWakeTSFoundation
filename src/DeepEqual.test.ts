import {expect, test} from 'vitest'
import {DeepClone, DeepEqual, Differences, StringOrNumberEqual, SubsetEqual, SubsetFormEqual} from './DeepEqual'
import {OmitProperty, ReplaceAll} from './Functions'

const item = {
	val1: true,
	val2: 1,
	val3: 'One',
	val4: {
		valA: 1,
		valB: 'Two'
	},
	val5: ['One', 'Two'],
	val6: [
		{item1: 1, item2: 'One'},
		{item1: 2, item2: 'Two'}
	],
	valBlank: ''
}

test('StringOrNumberEqual', () => {
	expect(StringOrNumberEqual(1, 1)).toBe(true)
	expect(StringOrNumberEqual(1, 2)).toBe(false)
	expect(StringOrNumberEqual('1', '1')).toBe(true)
	expect(StringOrNumberEqual('1', '2')).toBe(false)
	expect(StringOrNumberEqual('A', 'A')).toBe(true)
	expect(StringOrNumberEqual('A', 'B')).toBe(false)
	expect(StringOrNumberEqual(1, '1')).toBe(true)
	expect(StringOrNumberEqual(1, '2')).toBe(false)
})

test('Differences', () => {
	expect(Differences(item, item)).toStrictEqual({})
	expect(Differences(item, {...item, val2: '1'})).toStrictEqual({})
	expect(Differences(item, {...item, val1: false})).toStrictEqual({val1: {val1: true, val2: false}})
	expect(Differences(item, OmitProperty(item, 'val1'))).toStrictEqual({val1: {val1: true}})
	expect(Differences(item, {...item, valOther: 'Here'})).toStrictEqual({valOther: {val2: 'Here'}})
})

test('Deep Equal', () => {
	expect(DeepEqual(item, {...item})).toBe(true)
	expect(DeepEqual(item, {...item, val1: false})).toBe(false)
	expect(DeepEqual(item, {...item, val2: '1'})).toBe(true)
	expect(DeepEqual(item, {...item, val4: {...item.val4, valA: 2}})).toBe(false)
	expect(DeepEqual(item, {...item, val5: ['Two', 'One']})).toBe(false)
	expect(DeepEqual(item, {...item, val5: ['One']})).toBe(false)
	expect(DeepEqual('2021-12-20T17:12:36.370Z', '2021-12-20 12:12:36.37-05')).toBe(true)
	expect(DeepEqual({quantity_form_id: '28360'}, {quantity_form_id: '28360'})).toBe(true)
	expect(DeepEqual({quantity_form_id: '28360'}, {quantity_form_id: '28361'})).toBe(false)
	expect(ReplaceAll(' ', '-', 'one two three four')).toBe('one-two-three-four')
})

test('Subset Equal', () => {
	expect(SubsetEqual(item, {...item})).toBe(true)
	expect(SubsetEqual(item, {...item, valZZZ: false})).toBe(true)
	expect(SubsetEqual(item, {...item, val3: 'Ones'})).toBe(false)
	expect(
		SubsetEqual(
			{
				id: '7',
				description: 'Audit Support'
			},
			{
				id: 7,
				description: 'Audit Support'
			}
		)
	).toBe(true)
	expect(
		SubsetEqual(
			{
				id: '7',
				description: 'Audit Support'
			},
			{
				id: 7,
				description: 'Audit Supports'
			}
		)
	).toBe(false)
	expect(SubsetEqual(item, {...item, val1: false})).toBe(false)
	expect(SubsetEqual({...item, val1: false}, item)).toBe(false)
	expect(SubsetEqual('2021-12-20T17:12:36.370Z', '2021-12-20 12:12:36.37-05')).toBe(true)
	expect(SubsetEqual(item, {...item, val1: false})).toBe(false)
	expect(SubsetEqual(item, {...item, val1: true})).toBe(true)
	expect(SubsetEqual(item, {...item, val1: 'true'})).toBe(true)
	expect(SubsetEqual(item, {...item, val1: 'false'})).toBe(false)
	expect(SubsetEqual(item, {...item, val1: 1})).toBe(true)
	expect(SubsetEqual(item, {...item, val1: 0})).toBe(false)
})

test('Subset Form Equal', () => {
	expect(SubsetFormEqual(item, {...item})).toBe(true)
	expect(SubsetFormEqual(item, {...item, valZZZ: false})).toBe(true)
	expect(SubsetFormEqual(item, {...item, val3: 'Ones'})).toBe(false)
	expect(
		SubsetFormEqual(
			{
				id: '7',
				description: 'Audit Support'
			},
			{
				id: 7,
				description: 'Audit Support'
			}
		)
	).toBe(true)
	expect(
		SubsetFormEqual(
			{
				id: '7',
				description: 'Audit Support'
			},
			{
				id: 7,
				description: 'Audit Supports'
			}
		)
	).toBe(false)
	expect(SubsetFormEqual(item, {...item, val1: false})).toBe(false)
	expect(SubsetFormEqual({...item, val1: false}, item)).toBe(false)
	expect(SubsetFormEqual('2021-12-20T17:12:36.370Z', '2021-12-20 12:12:36.37-05')).toBe(true)
	expect(SubsetFormEqual(item, {...item, val1: false})).toBe(false)
	expect(SubsetFormEqual(item, {...item, val1: true})).toBe(true)
	expect(SubsetFormEqual(item, {...item, val1: 'true'})).toBe(true)
	expect(SubsetFormEqual(item, {...item, val1: 'false'})).toBe(false)
	expect(SubsetFormEqual(item, {...item, val1: 1})).toBe(true)
	expect(SubsetFormEqual(item, {...item, val1: 0})).toBe(false)
	expect(SubsetFormEqual(item, {...item, val1: 0})).toBe(false)
	expect(SubsetFormEqual({...item, val1: false}, {...item, val1: 'false'})).toBe(true)
	expect(SubsetFormEqual(item, {...item, valBlank: null})).toBe(true)
	expect(SubsetFormEqual({smsphone: '3344'}, {smsphone: '3344'})).toBe(true)
	expect(SubsetFormEqual({smsphone: '3344'}, {smsphone: '334455'})).toBe(false)
})

test('DeepClone', () => {
	expect(DeepClone(1)).toStrictEqual(1)
	expect(DeepClone('Two')).toStrictEqual('Two')
	expect(DeepClone(null)).toStrictEqual(null)
	expect(DeepClone(undefined)).toStrictEqual(undefined)
	expect(DeepClone({})).toStrictEqual({})
	expect(DeepClone({one: 1})).toStrictEqual({one: 1})
	expect(DeepClone({one: 1, two: [1, 2]})).toStrictEqual({one: 1, two: [1, 2]})
	expect(DeepClone([])).toStrictEqual([])
	expect(DeepClone([1, 2])).toStrictEqual([1, 2])
	expect(DeepClone([1, {one: 1, two: [1, 2]}])).toStrictEqual([1, {one: 1, two: [1, 2]}])
})
