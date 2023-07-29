import {
	ArrayRange,
	AverageNumber,
	AverageNumberNull,
	CleanDivide,
	CleanDivideNull,
	CleanNumber,
	CleanNumberNull,
	CleanNumbers,
	CleanSubtractNumbers,
	CoalesceFalsey,
	ConsoleAsyncTime,
	GetPropertyValueCaseInsensitive,
	GreaterNumber,
	GreaterNumberNull,
	IsOn,
	JSONParse,
	JSONStringToObject,
	LeastNumber,
	LeastNumberNull,
	ObjectToJSONString,
	OmitFalsey,
	OmitProperty,
	OmitUndefined,
	PickProperty,
	RemoveEnding,
	RemoveStarting,
	ReplaceAll,
	ReplaceAllMultiple,
	RoundTo,
	Sleep,
	ToArray,
	ValidNumbers
} from './Functions'
import {describe, expect, test} from 'vitest'

test('IsOn', () => {
	expect(IsOn(1)).toBe(true)
	expect(IsOn(0)).toBe(false)
	expect(IsOn(null)).toBe(false)
	expect(IsOn('active')).toBe(true)
	expect(IsOn('inactive')).toBe(false)
	expect(IsOn('t')).toBe(true)
	expect(IsOn('f')).toBe(false)
	expect(IsOn('true')).toBe(true)
	expect(IsOn('false')).toBe(false)
	expect(IsOn('no')).toBe(false)
	expect(IsOn('no', {nos: ['no']})).toBe(false)
	expect(IsOn('yes')).toBe(true)
	expect(IsOn('y')).toBe(true)
	expect(IsOn('yes', {nos: ['yes']})).toBe(false)
	expect(IsOn('new')).toBe(false)
	expect(IsOn('new', {yeses: ['new']})).toBe(true)
})

test('RoundTo', () => {
	expect(RoundTo(10.15, 1)).toBe(10.2)
	expect(RoundTo(10.14, 1)).toBe(10.1)
	expect(RoundTo(10.15, 0)).toBe(10)
	expect(RoundTo(10.5, 0)).toBe(11)
	expect(CleanNumbers(2, '$1,000', 12.236)).toBe(1012.24)
	expect(CleanNumbers(2, '$100', 12.234)).toBe(112.23)
	expect(CleanNumbers(0, '$1,000', 12.236)).toBe(1012)
	expect(CleanNumbers(0, '$1,000', [10, 2.236])).toBe(1012)
})

test('CleanNumber', () => {
	expect(CleanNumber('$', undefined, true)).toBe(NaN)
	expect(CleanNumber('$100')).toBe(100)
	expect(CleanNumber('1,000')).toBe(1000)
	expect(CleanNumber('50%')).toBe(50)
	expect(CleanNumber(1.234)).toBe(1.234)
	expect(CleanNumber(1.234, 0)).toBe(1)
	expect(CleanNumber(1.234, 1)).toBe(1.2)
	expect(CleanNumber(1.254, 1)).toBe(1.3)
})

// const omitObject = {
// 	id: 1,
// 	name: 'My Name',
// 	is_active: true
// }

// const omittedObject = OmitProperty(omitObject, 'id',  'is_active')

test('Omits', () => {
	expect(
		OmitProperty(
			{
				id: 1,
				name: 'My Name',
				is_active: true
			},
			'id',
			'is_active'
		)
	).toEqual({name: 'My Name'})
})

test('Picks', () => {
	expect(
		PickProperty(
			{
				id: 1,
				name: 'My Name',
				is_active: true
			},
			'name'
		)
	).toEqual({name: 'My Name'})
	expect(
		OmitUndefined({
			id: 1,
			name: undefined,
			is_active: false
		})
	).toEqual({id: 1, is_active: false})
})

test('JSONParse', () => {
	expect(JSONParse('{"id": 1}')).toEqual({id: 1})
	expect(JSONParse(undefined)).toEqual(null)
	expect(JSONParse('Test')).toEqual(null)
})

test('JSONString', () => {
	expect(ObjectToJSONString({id: 1})).toEqual('json:{"id":1}')
	expect(ObjectToJSONString(null)).toEqual('json:null')
	expect(ObjectToJSONString(undefined)).toEqual('json:undefined')
	expect(JSONStringToObject(ObjectToJSONString({id: 1}))).toEqual({id: 1})
	expect(JSONStringToObject(ObjectToJSONString(null))).toEqual(null)
	expect(JSONStringToObject(ObjectToJSONString(undefined))).toEqual(undefined)
})

test('ToArray', () => {
	expect(ToArray(null)).toEqual([])
	expect(ToArray(1)).toEqual([1])
	expect(ToArray([1])).toEqual([1])
	expect(ToArray([1, 2, 3])).toEqual([1, 2, 3])
	expect(ToArray([0, 1, 2, 3])).toEqual([0, 1, 2, 3])
})

test('RemoveStartEnd', () => {
	expect(RemoveStarting('/', '/Test/Case/')).toEqual('Test/Case/')
	expect(RemoveStarting('/', 'Test/Case/')).toEqual('Test/Case/')
	expect(RemoveStarting('/', '//Test/Case/')).toEqual('/Test/Case/')
	expect(RemoveStarting('/', '//Test/Case/', true)).toEqual('Test/Case/')
	expect(RemoveStarting(['/', 'Te'], '/Test/Case/', true)).toEqual('st/Case/')
	expect(RemoveStarting(['/', 'Te'], '//Test/Case/', true)).toEqual('st/Case/')
	expect(RemoveEnding('/', '/Test/Case/')).toEqual('/Test/Case')
	expect(RemoveEnding('/', '/Test/Case')).toEqual('/Test/Case')
	expect(RemoveEnding('/', '/Test/Case//')).toEqual('/Test/Case/')
	expect(RemoveEnding('/', '/Test/Case//', true)).toEqual('/Test/Case')
	expect(RemoveEnding(['/', 'se'], '/Test/Case/', true)).toEqual('/Test/Ca')
	expect(RemoveEnding(['/', 'se'], '/Test/Case//', true)).toEqual('/Test/Ca')
})

describe('ReplaceAll', () => {
	test('should replace all occurrences of a string with another', () => {
		expect(ReplaceAll('foo', 'bar', 'foo foo foo')).toBe('bar bar bar')
		expect(ReplaceAll('foo', 'baz', 'foo bar foo')).toBe('baz bar baz')
		expect(ReplaceAll('foo', '', 'foo bar foo')).toBe(' bar ')
		expect(ReplaceAll('foo', 'ba$r', 'foo $foo foo')).toBe('ba$r $ba$r ba$r')
	})

	test('should handle arrays of strings to replace', () => {
		expect(ReplaceAll(['foo'], 'bar', 'foo foo foo')).toBe('bar bar bar')
		expect(ReplaceAll(['foo', 'bar'], 'baz', 'foo bar foo bar baz foo baz')).toBe('baz baz baz baz baz baz baz')
	})

	test('should return an empty string if the input subject is null or undefined', () => {
		expect(ReplaceAll('foo', 'bar', null)).toBe('')
		expect(ReplaceAll('foo', 'bar', undefined)).toBe('')
	})
})

describe('ReplaceAllMultiple', () => {
	test('replaces multiple substrings with corresponding replacements', () => {
		const findReplace = [
			['foo', 'bar'],
			['baz', 'qux']
		]
		const subject = 'foo baz'
		expect(ReplaceAllMultiple(findReplace, subject)).toEqual('bar qux')
	})

	test('replaces multiple substrings with corresponding replacements in object format', () => {
		const findReplace = [{foo: 'bar'}, {baz: 'qux'}]
		const subject = 'foo baz'
		expect(ReplaceAllMultiple(findReplace, subject)).toEqual('bar qux')
	})

	test('returns empty string if findReplace is falsy or empty', () => {
		const subject = 'foo baz'
		expect(ReplaceAllMultiple(null, subject)).toEqual('')
		expect(ReplaceAllMultiple([], subject)).toEqual('')
	})

	test('returns the original subject if it is null or undefined', () => {
		const findReplace = [
			['foo', 'bar'],
			['baz', 'qux']
		]
		expect(ReplaceAllMultiple(findReplace, null)).toBe('')
		expect(ReplaceAllMultiple(findReplace, undefined)).toBe('')
	})
})

test('GetPropertyValueCaseInsensitive', () => {
	expect(GetPropertyValueCaseInsensitive({One: 1}, 'One')).toEqual(1)
	expect(GetPropertyValueCaseInsensitive({One: 1}, 'one')).toEqual(1)
	expect(GetPropertyValueCaseInsensitive({One: 1}, 'ONE')).toEqual(1)
	expect(GetPropertyValueCaseInsensitive({one: 1}, 'One')).toEqual(1)
	expect(GetPropertyValueCaseInsensitive({'one ': 1}, 'one')).toEqual(1)
	expect(GetPropertyValueCaseInsensitive({one: 1}, 'ONE ')).toEqual(1)
	expect(GetPropertyValueCaseInsensitive({One: 1}, ['Two', 'ONE'])).toEqual(1)
	expect(GetPropertyValueCaseInsensitive({One: 1}, ['Two', 'TWO'])).toEqual(undefined)
	expect(GetPropertyValueCaseInsensitive({one: 1}, ['Two', 'ONE'])).toEqual(1)
	expect(GetPropertyValueCaseInsensitive({one: 1}, ['Two', 'TWO'])).toEqual(undefined)
	expect(GetPropertyValueCaseInsensitive({one: 1, two: ' '}, ['Two', 'ONE'])).toEqual(1)
	expect(GetPropertyValueCaseInsensitive({one: 1, two: null}, ['Two', 'ONE'])).toEqual(1)
	expect(GetPropertyValueCaseInsensitive({one: 1, two: 2}, ['Two', 'ONE'])).toEqual(2)
	expect(GetPropertyValueCaseInsensitive({one: 1, two: 2}, ['one', 'tWo'])).toEqual(1)
	expect(GetPropertyValueCaseInsensitive({one: '', two: ''}, ['one', 'tWo'])).toEqual('')
})

test('Other', async () => {
	expect(OmitFalsey({id: 1, name: 'Test', description: ''}, 'name', 'description')).toEqual({id: 1, name: 'Test'})
	expect(OmitFalsey({id: 1, name: 'Test', description: ''}, 'name')).toEqual({id: 1, name: 'Test', description: ''})
	expect(OmitFalsey({id: 0, name: 'Test', description: ''}, 'name', 'id')).toEqual({name: 'Test', description: ''})
	expect(CoalesceFalsey(undefined)).toEqual(undefined)
	expect(CoalesceFalsey(undefined, 'Other')).toEqual('Other')
	expect(CoalesceFalsey('Original', 'Other')).toEqual('Original')
	expect(CoalesceFalsey(undefined, null)).toEqual(null)
	expect(CoalesceFalsey('Original', null, 'Other')).toEqual('Original')
	expect(CoalesceFalsey(null, 'Original', null, 'Other')).toEqual('Original')
	expect(CoalesceFalsey(null, null, null, 'Other')).toEqual('Other')
	expect(GreaterNumberNull('asdf', ['qwer', 'zxcv'])).toEqual(null)
	expect(GreaterNumberNull('asdf', ['5', 'zxcv'])).toEqual(5)
	expect(GreaterNumberNull(2, ['5', 'zxcv'])).toEqual(5)
	expect(GreaterNumberNull('2', ['qwer', 'zxcv'])).toEqual(2)
	expect(GreaterNumberNull('2', 5)).toEqual(5)
	expect(GreaterNumberNull(5, 2)).toEqual(5)
	expect(GreaterNumber('asdf', ['qwer', 'zxcv'])).toEqual(0)
	expect(GreaterNumber('asdf', ['5', 'zxcv'])).toEqual(5)
	expect(GreaterNumber(2, ['5', 'zxcv'])).toEqual(5)
	expect(GreaterNumber('2', ['qwer', 'zxcv'])).toEqual(2)
	expect(GreaterNumber('2', 5)).toEqual(5)
	expect(GreaterNumber(5, 2)).toEqual(5)
	expect(GreaterNumber(-1, 0)).toEqual(0)
	expect(LeastNumberNull('asdf', ['qwer', 'zxcv'])).toEqual(null)
	expect(LeastNumberNull('asdf', ['5', 'zxcv'])).toEqual(5)
	expect(LeastNumberNull(2, ['5', 'zxcv'])).toEqual(2)
	expect(LeastNumberNull('2', ['qwer', 'zxcv'])).toEqual(2)
	expect(LeastNumberNull('2', 5)).toEqual(2)
	expect(LeastNumberNull(5, 2)).toEqual(2)
	expect(LeastNumber('asdf', ['qwer', 'zxcv'])).toEqual(0)
	expect(LeastNumber('asdf', ['5', 'zxcv'])).toEqual(5)
	expect(LeastNumber(2, ['5', 'zxcv'])).toEqual(2)
	expect(LeastNumber('2', ['qwer', 'zxcv'])).toEqual(2)
	expect(LeastNumber('2', 5)).toEqual(2)
	expect(LeastNumber(5, 2)).toEqual(2)
	expect(LeastNumber(null, 5, 2)).toEqual(2)
	expect(LeastNumber(5, 2, null)).toEqual(2)
	expect(CleanNumberNull('')).toEqual(null)
	expect(CleanNumberNull('a')).toEqual(null)
	expect(CleanNumberNull('$')).toEqual(null)
	expect(CleanNumberNull('0')).toEqual(0)
	expect(CleanNumberNull(0, 2)).toEqual(0)
	expect(CleanDivideNull(1, 2)).toEqual(0.5)
	expect(CleanDivideNull(1, 0)).toEqual(null)
	expect(CleanDivideNull(1, null)).toEqual(null)
	expect(CleanDivideNull(null, 2)).toEqual(null)
	expect(CleanDivideNull('', 2)).toEqual(null)
	expect(CleanDivideNull('a', 2)).toEqual(null)
	expect(CleanDivideNull('$', 2)).toEqual(null)
	expect(CleanDivideNull('0', 2)).toEqual(0)
	expect(CleanDivideNull(0, 2)).toEqual(0)
	expect(CleanDivide(1, 2)).toEqual(0.5)
	expect(CleanDivide(1, 2, 1)).toEqual(0.5)
	expect(CleanDivide(1, 2, 0)).toEqual(1)
	expect(CleanDivide(1, 4)).toEqual(0.25)
	expect(CleanDivide(1, 4, 1)).toEqual(0.3)
	expect(CleanDivide(1, 4, 0)).toEqual(0)
	expect(CleanDivide(1, 0)).toEqual(0)
	expect(CleanDivide(1, null)).toEqual(0)
	expect(CleanDivide(null, 2)).toEqual(0)
	expect(CleanDivide(0, 2)).toEqual(0)
	expect(CleanNumbers(0, [1, 2, 3, null])).toEqual(6)
	expect(CleanNumbers(0, 1, [1, 2, 3, null])).toEqual(7)
	expect(CleanNumbers(0, null)).toEqual(0)
	expect(CleanSubtractNumbers(0, [5, 2, 1, null])).toEqual(2)
	expect(CleanSubtractNumbers(0, 10, [5, 2, 1, null])).toEqual(2)
	expect(CleanSubtractNumbers(0, null)).toEqual(0)
	expect(AverageNumberNull(0, [1, 2, '3', null])).toEqual(2)
	expect(AverageNumberNull(1, [1, '2', 4, null])).toEqual(2.3)
	expect(AverageNumberNull(1, 5, ['6', null])).toEqual(5.5)
	expect(AverageNumberNull(1, null)).toEqual(null)
	expect(AverageNumber(0, [1, 2, '3', null])).toEqual(2)
	expect(AverageNumber(1, [1, '2', 4, null])).toEqual(2.3)
	expect(AverageNumber(1, 5, ['6', null])).toEqual(5.5)
	expect(AverageNumber(1, null)).toEqual(0)
	expect(ArrayRange(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
	expect(ArrayRange(10, 2)).toEqual([0, 2, 4, 6, 8])
	expect(ArrayRange(10, 1, 1)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
	expect(ArrayRange(-10)).toEqual([0, -1, -2, -3, -4, -5, -6, -7, -8, -9])
	expect(ArrayRange(-10, 2)).toEqual([0, -2, -4, -6, -8])
	expect(ArrayRange(-10, 2, -1)).toEqual([-1, -3, -5, -7, -9])
	expect(ValidNumbers(0, 1, 2)).toEqual([0, 1, 2])
	expect(ValidNumbers([0, 1], 2)).toEqual([0, 1, 2])
	expect(ValidNumbers([0, '1'], 2, 'Dennis')).toEqual([0, 1, 2])

	async function timesTwo(x: number): Promise<number> {
		await Sleep(200)
		return x * 2
	}

	expect(await ConsoleAsyncTime('Test Time', timesTwo(2))).toEqual(4)
})
