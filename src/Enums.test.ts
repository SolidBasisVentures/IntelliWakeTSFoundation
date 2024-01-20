import {EnumArray, EnumKeyFromValue, EnumKeys, EnumValidValue, EnumValueFromKey, EnumValues} from './Enums'
import {expect, test} from 'vitest'

enum ETest {
	TestOne = 'Test 1',
	TestTwo = 'Test 2'
}

test('Enums', () => {
	expect(EnumKeys(ETest)).toEqual(['TestOne', 'TestTwo'])
	expect(EnumValues(ETest)).toEqual(['Test 1', 'Test 2'])
	expect(EnumKeyFromValue(ETest, 'Test 1')).toEqual('TestOne')
	expect(EnumValueFromKey(ETest, 'TestTwo')).toEqual('Test 2')
	expect(EnumValidValue(ETest, ETest.TestOne)).toEqual(true)
	expect(EnumValidValue(ETest, 'Test 1')).toEqual(true)
	expect(EnumValidValue(ETest, 'TestOne')).toEqual(false)
	expect(EnumArray(ETest)).toEqual([
		{key: 'TestOne', value: 'Test 1'},
		{key: 'TestTwo', value: 'Test 2'}
	])
})
