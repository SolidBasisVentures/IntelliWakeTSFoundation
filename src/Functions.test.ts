import {AddS, IsOn, RoundTo} from './Functions'

test('IsOn 1', () => {
	expect(IsOn(1)).toBe(true);
})

test('IsOn null', () => {
	expect(IsOn(null)).toBe(false);
})

test('IsOn active', () => {
	expect(IsOn('active')).toBe(true);
})

test ('RoundTo 10.15, 1', () => {
	expect(RoundTo(10.15, 1)).toBe(10.2)
})

test ('RoundTo 10.14, 1', () => {
	expect(RoundTo(10.14, 1)).toBe(10.1)
})

test ('RoundTo 10.15, 0', () => {
	expect(RoundTo(10.15, 0)).toBe(10)
})

test ('RoundTo 10.5, 0', () => {
	expect(RoundTo(10.5, 0)).toBe(11)
})

test ('AddS 0 True', () => {
	expect(AddS('Row', 0)).toBe('Rows')
})

test ('AddS 1 False', () => {
	expect(AddS('Row', 1)).toBe('Row')
})

test ('AddS 2 True', () => {
	expect(AddS('Row', 2)).toBe('Rows')
})
