import {
	MomentCurrentTimeZone,
	MomentDateString,
	MomentDateTimeString,
	MomentDisplayDayDate,
	MomentDisplayDayDateTime,
	MomentDisplayTime,
	MomentFormatString,
	MomentFromString,
	MomentTimeString
} from '../src/Moment'

// Timezone
test('Timezone UTC', () => {
	expect(MomentCurrentTimeZone()).toBe('UTC')
})

test('MomentFromString', () => {
	expect(MomentFromString('2020-01-01')?.format('ll')).toBe('Jan 1, 2020')
})

test('MomentFormatString', () => {
	expect(MomentFormatString('2020-01-01', 'll')).toBe('Jan 1, 2020')
})

// Time Tests
test('Moment Time from Time', () => {
	expect(MomentTimeString('01:00:00')).toBe('01:00:00')
})

test('Moment Time from Date Time', () => {
	expect(MomentTimeString('2020-01-01 01:00:00')).toBe('01:00:00')
})

test('Moment Time from Blank', () => {
	expect(MomentTimeString('')).toBe(null)
})

test('Moment Time from Date', () => {
	expect(MomentTimeString('2020-01-01')).toBe(null)
})

// Date Tests
test('Moment Date from Time', () => {
	expect(MomentDateString('01:00:00')).toBe(null)
})

test('Moment Date from Date Time', () => {
	expect(MomentDateString('2020-01-01 01:00:00')).toBe('2020-01-01')
})

test('Moment Date from Blank', () => {
	expect(MomentDateString('')).toBe(null)
})

test('Moment Date from Date', () => {
	expect(MomentDateString('2020-01-01')).toBe('2020-01-01')
})

// Date Time Tests
test('Moment DateTime from Time', () => {
	expect(MomentDateTimeString('01:00:00')).toBe(null)
})

test('Moment DateTime from Date Time', () => {
	expect(MomentDateTimeString('2020-01-01 01:00:00')).toBe('2020-01-01 01:00:00')
})

test('Moment DateTime from Blank', () => {
	expect(MomentDateTimeString('')).toBe(null)
})

test('Moment DateTime from Date', () => {
	expect(MomentDateTimeString('2020-01-01')).toBe('2020-01-01 00:00:00')
})

// Display Day Date Time Tests
test('Moment Display Day Date Time from Blank', () => {
	expect(MomentDisplayDayDateTime('')).toBe(null)
})

test('Moment Display Day Date Time from Date', () => {
	expect(MomentDisplayDayDateTime('2020-01-01')).toBe('Wed, Jan 1, 12:00 am')
})

test('Moment Display Day Date Time from Date Time', () => {
	expect(MomentDisplayDayDateTime('2020-01-01 01:00:00')).toBe('Wed, Jan 1, 1:00 am')
})

test('Moment Display Day Date Time Show Year', () => {
	expect(MomentDisplayDayDateTime('2020-01-01', true)).toBe('Wed, Jan 1, 2020, 12:00 am')
})

// Display Date Date Tests
test('Moment Display Day Date from Blank', () => {
	expect(MomentDisplayDayDate('')).toBe(null)
})

test('Moment Display Day Date from Date', () => {
	expect(MomentDisplayDayDate('2020-01-01')).toBe('Wed, Jan 1')
})

test('Moment Display Day Date from Date Time', () => {
	expect(MomentDisplayDayDate('2020-01-01 01:00:00')).toBe('Wed, Jan 1')
})

test('Moment Display Day Date Show Year', () => {
	expect(MomentDisplayDayDate('2020-01-01', true)).toBe('Wed, Jan 1, 2020')
})

// Moment Display Time Tests
test('Moment Display Time from Time', () => {
	expect(MomentDisplayTime('00:00:00')).toBe('12:00 am')
})

test('Moment Display Time from Blank', () => {
	expect(MomentDisplayTime('')).toBe(null)
})

test('Moment Display Time from Date', () => {
	expect(MomentDisplayTime('2020-01-01')).toBe(null)
})
