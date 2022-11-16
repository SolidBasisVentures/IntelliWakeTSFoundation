import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {EnumKeyFromValue, EnumKeys, EnumValueFromKey, EnumValues} from '../src/Enums'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

enum ETest {
	TestOne = 'Test 1',
	TestTwo = 'Test 2'
}

const keys: string[] = EnumKeys(ETest)
const values: ETest[] = EnumValues(ETest)
const key1: string | undefined = EnumKeyFromValue(ETest, 'Test 1')
const value2: ETest | undefined = EnumValueFromKey(ETest, 'TestTwo')

console.log('Keys', keys)
console.log('Values', values)
console.log('Key 1', key1)
console.log('Value 2', value2)

export enum EDispatcherPriority {
	TimeSensitive = 0,
	High = 1,
	Medium = 2,
	Low = 3
}

console.log('Keys', EnumKeys(EDispatcherPriority))
console.log('Values', EnumValues(EDispatcherPriority))
console.log('Key 1', EnumKeyFromValue(EDispatcherPriority, EDispatcherPriority.TimeSensitive))
console.log('Value 1', EnumValueFromKey(EDispatcherPriority, 'TimeSensitive'))

console.timeEnd('Consoles')
