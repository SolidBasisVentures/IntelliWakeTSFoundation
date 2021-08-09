import {
	AddS,
	CleanNumber,
	DeepEqual,
	IsOn,
	JSONParse, JSONStringToObject,
	ObjectToJSONString,
	OmitProperty,
	ReplaceAll,
	RoundTo,
	ToArray
} from './Functions'

test('IsOn', () => {
	expect(IsOn(1)).toBe(true)
	expect(IsOn(null)).toBe(false)
	expect(IsOn('active')).toBe(true)
})

test('RoundTo', () => {
	expect(RoundTo(10.15, 1)).toBe(10.2)
	expect(RoundTo(10.14, 1)).toBe(10.1)
	expect(RoundTo(10.15, 0)).toBe(10)
	expect(RoundTo(10.5, 0)).toBe(11)
})

test('AddS', () => {
	expect(AddS('Row', 0)).toBe('Rows')
	expect(AddS('Row', 1)).toBe('Row')
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
	expect(DeepEqual(item, {...item, val1: false})).toBe(false)
	expect(DeepEqual(item, {...item, val4: {...item.val4, valA: 2}})).toBe(false)
	expect(DeepEqual(item, {...item, val5: ['Two', 'One']})).toBe(false)
	expect(DeepEqual(item, {...item, val5: ['One']})).toBe(false)
	expect(ReplaceAll(' ', '-', 'one two three four')).toBe('one-two-three-four')
})

test('CleanNumber', () => {
	expect(CleanNumber('$', undefined, true)).toBe(NaN)
	expect(CleanNumber('$100')).toBe(100)
	expect(CleanNumber('1,000')).toBe(1000)
	expect(CleanNumber('50%')).toBe(50)
	expect(CleanNumber(1.234)).toBe(1.234)
	expect(CleanNumber(1.234, 0)).toBe(1)
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

test('JSONParse', () => {
	expect(JSONParse('{"id": 1}')).toEqual({id: 1})
	expect(JSONParse(undefined)).toEqual(null)
	expect(JSONParse('Test')).toEqual(null)
})

test('JSONString', () => {
	expect(ObjectToJSONString({"id": 1})).toEqual('json:{"id":1}')
	expect(ObjectToJSONString(null)).toEqual('json:null')
	expect(ObjectToJSONString(undefined)).toEqual('json:undefined')
	expect(JSONStringToObject(ObjectToJSONString({"id": 1}))).toEqual({"id": 1})
	expect(JSONStringToObject(ObjectToJSONString(null))).toEqual(null)
	expect(JSONStringToObject(ObjectToJSONString(undefined))).toEqual(undefined)
})

test('ToArray', () => {
	expect(ToArray(null)).toEqual([])
	expect(ToArray(1)).toEqual([1])
	expect(ToArray([1])).toEqual([1])
	expect(ToArray([1, 2, 3])).toEqual([1, 2, 3])
})


