import {EnumKeyFromValue, EnumKeys, EnumValueFromKey, EnumValues} from './Enums'

enum ETest {
	TestOne = 'Test 1',
	TestTwo = 'Test 2'
}

test('Enums', () => {
	expect(EnumKeys(ETest)).toEqual(['TestOne', 'TestTwo'])
	expect(EnumValues(ETest)).toEqual(['Test 1', 'Test 2'])
	expect(EnumKeyFromValue(ETest, 'Test 1')).toEqual('TestOne')
	expect(EnumValueFromKey(ETest, 'TestTwo')).toEqual('Test 2')
})