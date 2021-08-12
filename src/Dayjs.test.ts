import {
	IsDateString,
	DayjsCurrentTimeZone,
	DayjsDateString,
	DayjsDateTimeString,
	DayjsDisplayDayDate,
	DayjsDisplayDayDateDoW,
	DayjsDisplayDayDateTime,
	DayjsDisplayDayDateTimeDoW,
	DayjsDisplayTime,
	DayjsDurationLongText,
	DayjsDurationShortText,
	DayjsFormatString,
	DayjsFromString,
	DayjsStringToDateLocale,
	DayjsTimeString
} from './Dayjs'

// Timezone
test('Timezone UTC', () => {
	expect(DayjsCurrentTimeZone()).toBe('UTC')
})

test('DayjsFromString', () => {
	expect(DayjsFromString('2020-01-01')?.format('ll')).toBe('Jan 1, 2020')
})

test('DayjsFormatString', () => {
	expect(DayjsFormatString('2020-01-01', 'll')).toBe('Jan 1, 2020')
})

// Time Tests
test('Dayjs Time from Time', () => {
	expect(DayjsTimeString('01:00:00')).toBe('01:00:00')
})

test('Dayjs Time from Date Time', () => {
	expect(DayjsTimeString('2020-01-01 01:00:00')).toBe('01:00:00')
})

test('Dayjs Time from Blank', () => {
	expect(DayjsTimeString('')).toBe(null)
})

test('Dayjs Time from Date', () => {
	expect(DayjsTimeString('2020-01-01')).toBe(null)
})

// Date Tests
test('Dayjs Date from Time', () => {
	expect(DayjsDateString('01:00:00')).toBe(null)
})

test('Dayjs Date from Date Time', () => {
	expect(DayjsDateString('2020-01-01 01:00:00')).toBe('2020-01-01')
})

test('Dayjs Date from Blank', () => {
	expect(DayjsDateString('')).toBe(null)
})

test('Dayjs Date from Date', () => {
	expect(DayjsDateString('2020-01-01')).toBe('2020-01-01')
})

// Date Time Tests
test('Dayjs DateTime from Time', () => {
	expect(DayjsDateTimeString('01:00:00')).toBe(null)
})

test('Dayjs DateTime from Date Time', () => {
	expect(DayjsDateTimeString('2020-01-01 01:00:00')).toBe('2020-01-01 01:00:00')
})

test('Dayjs DateTime from Blank', () => {
	expect(DayjsDateTimeString('')).toBe(null)
})

test('Dayjs DateTime from Date', () => {
	expect(DayjsDateTimeString('2020-01-01')).toBe('2020-01-01 00:00:00')
})

// Display Day Date Time Tests
test('Dayjs Display Day Date Time from Blank', () => {
	expect(DayjsDisplayDayDateTime('')).toBe(null)
})

test('Dayjs Display Day Date Time from Date', () => {
	expect(DayjsDisplayDayDateTime('2020-01-01')).toBe('Jan 1, 2020')
})

test('Dayjs Display Day Date Time from Date Time', () => {
	expect(DayjsDisplayDayDateTime('2020-01-01 01:00:00')).toBe('Jan 1, 2020, 1:00 am')
})

test('Dayjs Display Day Date Time from Date DoW', () => {
	expect(DayjsDisplayDayDateTimeDoW('2020-01-01')).toBe('We, Jan 1, 2020')
})

test('Dayjs Display Day Date Time from Date Time DoW', () => {
	expect(DayjsDisplayDayDateTimeDoW('2020-01-01 01:00:00')).toBe('We, Jan 1, 2020, 1:00 am')
})

// Display Date Date Tests
test('Dayjs Display Day Date from Blank', () => {
	expect(DayjsDisplayDayDate('')).toBe(null)
})

test('Dayjs Display Day Date from Date', () => {
	expect(DayjsDisplayDayDate('2020-01-01')).toBe('Jan 1, 2020')
})

test('Dayjs Display Day Date from Date Time', () => {
	expect(DayjsDisplayDayDate('2020-01-01 01:00:00')).toBe('Jan 1, 2020')
})

test('Dayjs Display Day Date from Date', () => {
	expect(DayjsDisplayDayDateDoW('2020-01-01')).toBe('We, Jan 1, 2020')
})

test('Dayjs Display Day Date from Date Time', () => {
	expect(DayjsDisplayDayDateDoW('2020-01-01 01:00:00')).toBe('We, Jan 1, 2020')
})

test('Dayjs Locale', () => {
	expect(DayjsStringToDateLocale('2020-01-02')).toBe('01/02/2020')
})

// Dayjs Display Time Tests
test('Dayjs Display Time from Time', () => {
	expect(DayjsDisplayTime('00:00:00')).toBe('12:00 am')
})

test('Dayjs Display Time from Blank', () => {
	expect(DayjsDisplayTime('')).toBe(null)
})

test('Dayjs Display Time from Date', () => {
	expect(DayjsDisplayTime('2020-01-01')).toBe(null)
})

test('DayjsDurationShortText 30m 20s', () => {
	expect(DayjsDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20')).toBe('30m 20s')
})

test('DayjsDurationShortText 2M 10D', () => {
	expect(DayjsDurationShortText('2020-01-01 13:00:00', '2020-03-12 13:30:20')).toBe('2M 10D')
})

test('DayjsDurationLongText 30m 20s', () => {
	expect(DayjsDurationLongText('2020-01-01 13:00:00', '2020-01-01 13:30:20')).toBe('30 Minutes 20 Seconds')
})

test('DayjsDurationLongText 2d', () => {
	expect(DayjsDurationLongText('2020-01-01 13:00:00', '2020-01-03 13:00:00')).toBe('2 Days')
})

test('DayjsDurationLongText 20s', () => {
	expect(DayjsDurationLongText('2020-01-01 13:00:00', '2020-01-01 13:00:20')).toBe('20 Seconds')
})

test('DayjsDurationLongText 00s', () => {
	expect(DayjsDurationLongText('2020-01-01 13:00:00', '2020-01-01 13:00:00')).toBe('0 Seconds')
})

test('DayjsDurationLongText 20s trimSeconds', () => {
	expect(DayjsDurationLongText('2020-01-01 13:00:00', '2020-01-01 13:00:20', true)).toBe('0 Minutes')
})

test('DayjsDurationLongText 30m 20s trimSeconds', () => {
	expect(DayjsDurationLongText('2020-01-01 13:00:00', '2020-01-01 13:30:20', true)).toBe('30 Minutes')
})

test('DayjsDurationLongText 2M 10D', () => {
	expect(DayjsDurationLongText('2020-01-01 13:00:00', '2020-03-12 13:30:20')).toBe('2 Months 10 Days')
})

test('DayjsDisplayDayDateTime TZ EST', () => {
	expect(DayjsDisplayDayDateTime('2020-12-31 21:15:29.078-05')).toBe('Dec 31, 2020, 9:15 pm')
})

test('DayjsDisplayDayDateTime TZ UTC', () => {
	expect(DayjsDisplayDayDateTime('2021-01-01 02:15:29.078+00')).toBe('Dec 31, 2020, 9:15 pm')
})

test('IsDateString', () => {
	expect(IsDateString('2021-01-01')).toEqual(true)
})

test('IsDateString', () => {
	expect(IsDateString('2021-01-0')).toEqual(false)
})

test('IsDateString', () => {
	expect(IsDateString('Denn-Ja-Pe')).toEqual(false)
})
