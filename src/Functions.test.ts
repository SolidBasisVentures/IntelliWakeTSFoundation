import {AddS, CleanNumber, DeepEqual, IsOn, JSONParse, OmitProperty, ReplaceAll, RoundTo} from './Functions'

test('IsOn 1', () => {
	expect(IsOn(1)).toBe(true)
})

test('IsOn null', () => {
	expect(IsOn(null)).toBe(false)
})

test('IsOn active', () => {
	expect(IsOn('active')).toBe(true)
})

test('RoundTo 10.15, 1', () => {
	expect(RoundTo(10.15, 1)).toBe(10.2)
})

test('RoundTo 10.14, 1', () => {
	expect(RoundTo(10.14, 1)).toBe(10.1)
})

test('RoundTo 10.15, 0', () => {
	expect(RoundTo(10.15, 0)).toBe(10)
})

test('RoundTo 10.5, 0', () => {
	expect(RoundTo(10.5, 0)).toBe(11)
})

test('AddS 0 True', () => {
	expect(AddS('Row', 0)).toBe('Rows')
})

test('AddS 1 False', () => {
	expect(AddS('Row', 1)).toBe('Row')
})

test('AddS 2 True', () => {
	expect(AddS('Row', 2)).toBe('Rows')
})

const item = {
	val1: true,
	val2: 1,
	val3: 'One',
	val4: {
		valA: 1,
		valB: 'Two'
	},
	val5: [
		'One',
		'Two'
	],
	val6: [
		{item1: 1, item2: 'One'},
		{item1: 2, item2: 'Two'}
	]
}

test('Deep Equal', () => {
	expect(DeepEqual(item, {...item})).toBe(true)
})

test('Deep Equal - Fail Property', () => {
	expect(DeepEqual(item, {...item, val1: false})).toBe(false)
})

test('Deep Equal - Fail Object', () => {
	expect(DeepEqual(item, {...item, val4: {...item.val4, valA: 2}})).toBe(false)
})

test('Deep Equal - Fail Array', () => {
	expect(DeepEqual(item, {...item, val5: ['Two', 'One']})).toBe(false)
})

test('Deep Equal - Fail Array Size', () => {
	expect(DeepEqual(item, {...item, val5: ['One']})).toBe(false)
})

test('ReplaceAll', () => {
	expect(ReplaceAll(' ', '-', 'one two three four')).toBe('one-two-three-four')
})

test('CleanNumber NaN', () => {
	expect(CleanNumber('$')).toBe(NaN)
})

test('CleanNumber $', () => {
	expect(CleanNumber('$100')).toBe(100)
})

test('CleanNumber ,', () => {
	expect(CleanNumber('1,000')).toBe(1000)
})

test('CleanNumber %', () => {
	expect(CleanNumber('50%')).toBe(50)
})

test('CleanNumber(1.234)', () => {
	expect(CleanNumber(1.234)).toBe(1.234)
})
test('CleanNumber(1.234, 0)', () => {
	expect(CleanNumber(1.234, 0)).toBe(1)
})
test('CleanNumber(1.234, 1)', () => {
	expect(CleanNumber(1.234, 1)).toBe(1.2)
})


// const omitObject = {
// 	id: 1,
// 	name: 'My Name',
// 	is_active: true
// }

// const omittedObject = OmitProperty(omitObject, 'id',  'is_active')

test('Omits', () => {
	expect(OmitProperty({
		id: 1,
		name: 'My Name',
		is_active: true
	}, 'id',  'is_active')).toEqual({name: 'My Name'})
})

test('JSONParse valid', () => {
	expect(JSONParse('{"id": 1}')).toEqual({id: 1})
})

test('JSONParse empty', () => {
	expect(JSONParse(undefined)).toEqual(null)
})

test('JSONParse string', () => {
	expect(JSONParse('Test')).toEqual(null)
})


