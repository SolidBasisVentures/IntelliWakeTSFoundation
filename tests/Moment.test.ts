import {MomentDateString, MomentDateTimeString, MomentTimeString} from '../src/Moment'

// Time Tests
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

// Date Tests
test('Moment Date from Time', () => {
	expect(MomentDateString('01:00:00')).toBe(null);
})

test('Moment Date from Date Time', () => {
	expect(MomentDateString('2020-01-01 01:00:00')).toBe('2020-01-01');
})

test('Moment Date from Blank', () => {
	expect(MomentDateString('')).toBe(null);
})

test('Moment Date from Date', () => {
	expect(MomentDateString('2020-01-01')).toBe('2020-01-01');
})

// Date Time Tests
test('Moment DateTime from Time', () => {
	expect(MomentDateTimeString('01:00:00')).toBe(null);
})

test('Moment DateTime from Date Time', () => {
	expect(MomentDateTimeString('2020-01-01 01:00:00')).toBe('2020-01-01 01:00:00');
})

test('Moment DateTime from Blank', () => {
	expect(MomentDateTimeString('')).toBe(null);
})

test('Moment DateTime from Date', () => {
	expect(MomentDateTimeString('2020-01-01')).toBe('2020-01-01 00:00:00');
})
