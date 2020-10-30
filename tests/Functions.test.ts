import {IsOn} from '../src/Functions'

test('IsOn 1', () => {
	expect(IsOn(1)).toBe(true);
})

test('IsOn null', () => {
	expect(IsOn(null)).toBe(false);
})
