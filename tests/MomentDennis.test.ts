import {MomentTimeString} from '../src/Moment'

test('Moment Time from Time', () => {
	expect(MomentTimeString('01:00:00')).toBe('01:00:00');
})

test('Moment Time from Date Time', () => {
	expect(MomentTimeString('2020-01-01 01:00:00')).toBe('01:00:00');
})

test('Moment Time from Blank', () => {
	expect(MomentTimeString('')).toBe(null);
})

test('Moment Time from Date', () => {
	expect(MomentTimeString('2020-01-01')).toBe(null);
})
