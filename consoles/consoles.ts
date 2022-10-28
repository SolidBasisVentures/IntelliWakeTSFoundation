import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {EnumKeyFromValue, EnumKeys, EnumValueFromKey, EnumValues} from '../src/Enums'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

enum ETest {
	TestOne = 'Test 1',
	TestTwo = 'Test 2'
}

const keys = EnumKeys(ETest)
const values = EnumValues(ETest)
const key1 = EnumKeyFromValue(ETest, 'Test 1')
const value2 = EnumValueFromKey(ETest, 'TestTwo')

console.log('Keys', keys)
console.log('Values', values)
console.log('Key 1', key1)
console.log('Value 2', value2)

console.timeEnd('Consoles')
