import {
	DateAdjustTS,
	DateCompare,
	DateDiff,
	DateDiffComponents,
	DateFormat,
	DateFormatAny,
	DateFromWeekNumber,
	DateISO,
	DateIsWeekend,
	DateMonth,
	DateObject,
	DateOnly,
	DateOnlyNull,
	DateParseTS,
	DateQuarter,
	DatesBetween,
	DatesFromWeekNumber,
	DatesQuarter,
	DateWeekISONumber,
	EasterDate,
	IANADescription,
	IANAZoneAbbr,
	LeastDate,
	ManualParse,
	MonthDatesFromDateISOWeeks,
	SortCompareDate,
	SortCompareDateNull,
	TimeFloorMinute,
	TimeOnly,
	TimeSeries,
	WeekNumberAdjust
} from './DateManager'
import {expect, test} from 'vitest'

const isoLongDateString = '2021-01-01T00:00:00Z'
const dt = '2021-12-22T14:41:24Z'
const dateTS = DateParseTS(isoLongDateString)
const times = [
	['20:00:00', '20:00:00'],
	['20:00', '20:00:00'],
	['8:00 pm', '20:00:00'],
	['8:00 am', '08:00:00'],
	['8:00', '08:00:00'],
	['08:00 pm', '20:00:00']
]

test('Date Managers', () => {
	expect(DateParseTS('2000-01-01 08:00')).toEqual(DateParseTS('2000-01-01 08:00:00'))
	expect(DateFormat('DisplayDateDoWTimeLong', isoLongDateString)).toEqual('Thursday, December 31, 2020, 7:00 pm')
	expect(DateFormat('DisplayDateDoWTimeLong', isoLongDateString, 'America/Los_Angeles')).toEqual(
		'Thursday, December 31, 2020, 4:00 pm'
	)
	expect(
		DateFormat('DisplayDateDoWTimeLong', '2021-01-01 10:00:00', 'America/New_York', 'America/Los_Angeles')
	).toEqual('Friday, January 1, 2021, 1:00 pm')
	expect(
		DateFormat('DisplayDateDoWTimeLong', '2021-01-01 09:00:00', 'America/Los_Angeles', 'America/Chicago')
	).toEqual('Friday, January 1, 2021, 7:00 am')
	expect(DateFormat('DisplayDateDoWTimeLong', '2021-01-01 10:00:00')).toEqual('Friday, January 1, 2021, 10:00 am')
	expect(DateFormat('DisplayDateDoWTimeLong', '2021-01-01 10:00:00', 'America/Chicago', 'EST')).toEqual(
		'Friday, January 1, 2021, 9:00 am'
	)
	expect(DateFormat('DisplayDateDoWTimeLong', '2021-01-01 10:00:00', 'America/Los_Angeles', 'EST')).toEqual(
		'Friday, January 1, 2021, 7:00 am'
	)
	expect(DateParseTS(isoLongDateString)).toEqual(1609459200000)
	expect(dateTS).toEqual(1609459200000)
	expect(
		DateAdjustTS(dateTS, {
			weeks: 1,
			days: -1,
			hours: 1,
			minutes: 1,
			seconds: 1,
			milliseconds: 1
		})
	).toEqual(1609459200000 + 7 * 24 * 60 * 60 * 1000 - 24 * 60 * 60 * 1000 + 60 * 60 * 1000 + 60 * 1000 + 1000 + 1)
	expect(DateISO('2021-01-01 10:00:00')).toEqual('2021-01-01T15:00:00.000Z')
	expect(DateISO('2021-01-01 10:30:00')).toEqual('2021-01-01T15:30:00.000Z')
	expect(DateISO('2021-01-01 10:30')).toEqual('2021-01-01T15:30:00.000Z')
	expect(DateISO('2021-01-01 10:30:00 America/New_York')).toEqual('2021-01-01T15:30:00.000Z')
	expect(DateISO('2021-01-01 10:30 America/New_York')).toEqual('2021-01-01T15:30:00.000Z')
	expect(DateISO('2021-01-01 10:30 America/Chicago')).toEqual('2021-01-01T16:30:00.000Z')
	expect(DateISO('2021-01-01 10:00:00', {timezoneSource: 'America/Chicago'})).toEqual('2021-01-01T16:00:00.000Z')
	expect(DateISO('2021-01-01 10:00', {timezoneSource: 'America/Chicago'})).toEqual('2021-01-01T16:00:00.000Z')
	expect(DateISO(isoLongDateString, {year: 1})).toEqual('2022-01-01T00:00:00.000Z')
	expect(DateISO(isoLongDateString, {month: 1})).toEqual('2021-02-01T00:00:00.000Z')
	expect(DateISO('2021-01-31T00:00:00.000Z', {month: 1})).toEqual('2021-02-28T00:00:00.000Z')
	expect(DateISO(isoLongDateString, {week: 1})).toEqual('2021-01-08T00:00:00.000Z')
	expect(DateISO(isoLongDateString, {day: 1})).toEqual('2021-01-02T00:00:00.000Z')
	expect(DateISO(isoLongDateString, {day: -1})).toEqual('2020-12-31T00:00:00.000Z')
	expect(DateISO(isoLongDateString, {hour: 1})).toEqual('2021-01-01T01:00:00.000Z')
	expect(DateISO(isoLongDateString, {minute: 1})).toEqual('2021-01-01T00:01:00.000Z')
	expect(DateISO(isoLongDateString, {second: 1})).toEqual('2021-01-01T00:00:01.000Z')
	expect(DateISO(isoLongDateString, {second: -1})).toEqual('2020-12-31T23:59:59.000Z')
	expect(DateDiff(isoLongDateString, '2022-01-01T00:00:00.000Z', 'year')).toEqual(1)
	expect(DateDiff(isoLongDateString, '2022-01-01T00:00:00.001Z', 'year')).toEqual(1)
	expect(DateDiff(isoLongDateString, '2020-01-01T00:00:00.000Z', 'year')).toEqual(-1)
	expect(DateDiff(isoLongDateString, '2021-02-01T00:00:00.000Z', 'month')).toEqual(1)
	expect(DateDiff('2021-01-31T00:00:00.000Z', '2021-02-28T00:00:00.000Z', 'month')).toEqual(1)
	expect(DateDiff(isoLongDateString, '2021-01-08T00:00:00.000Z', 'week')).toEqual(1)
	expect(DateDiff(isoLongDateString, '2021-01-02T00:00:00.000Z', 'day')).toEqual(1)
	expect(DateDiff(isoLongDateString, '2021-01-01T01:00:00.000Z', 'hour')).toEqual(1)
	expect(DateDiff(isoLongDateString, '2020-12-31T23:00:00.000Z', 'hour')).toEqual(-1)
	expect(DateDiff(isoLongDateString, '2021-01-01T00:01:00.000Z', 'minute')).toEqual(1)
	expect(DateDiff(isoLongDateString, '2021-01-01T00:00:02.000Z', 'second')).toEqual(2)
	expect(DateDiff('2021-01-01T00:00:02.000Z', isoLongDateString, 'second')).toEqual(-2)
	expect(DateDiff('2020-12-31T23:59:59.000Z', isoLongDateString, 'second')).toEqual(1)
	expect(DateDiff(isoLongDateString, '2020-12-31T23:59:59.000Z', 'second')).toEqual(-1)
	expect(DateDiff(isoLongDateString, '2020-12-31T00:00:00.000Z', 'day')).toEqual(-1)
	expect(DateDiffComponents(isoLongDateString, '2022-02-02T01:01:01.000Z')).toEqual({
		year: 1,
		month: 1,
		day: 1,
		hour: 1,
		minute: 1,
		second: 1,
		millisecond: 0
	})
	expect(DateDiffComponents('2021-04-15T00:00:00Z', '2022-05-16T01:01:01.000Z')).toEqual({
		year: 1,
		month: 1,
		day: 1,
		hour: 1,
		minute: 1,
		second: 1,
		millisecond: 0
	})
	expect(DateDiffComponents('2021-04-15T00:00:00Z', '2020-03-13T22:58:59.000Z')).toEqual({
		year: -1,
		month: -1,
		day: -1,
		hour: -1,
		minute: -1,
		second: -1,
		millisecond: 0
	})
	// expect(DateWeekNumber('2021-01-01')).toEqual({year: 2021, week: 1})
	// expect(DateWeekNumber('2021-01-02')).toEqual({year: 2021, week: 1})
	// expect(DateWeekNumber('2021-01-03')).toEqual({year: 2021, week: 2})
	// expect(DateWeekNumber('2021-01-09')).toEqual({year: 2021, week: 2})
	// expect(DateWeekNumber('2021-01-10')).toEqual({year: 2021, week: 3})
	// expect(DateWeekNumber('2023-01-01')).toEqual({year: 2023, week: 1})
	// expect(DateWeekNumber('2023-01-03')).toEqual({year: 2023, week: 2})
	// expect(DateWeekNumber('2023-01-08')).toEqual({year: 2023, week: 2})
	expect(DateWeekISONumber('2021-01-01')).toEqual({year: 2020, week: 53})
	expect(DateWeekISONumber('2021-01-02')).toEqual({year: 2020, week: 53})
	expect(DateWeekISONumber('2021-01-03')).toEqual({year: 2020, week: 53})
	expect(DateWeekISONumber('2021-01-04')).toEqual({year: 2021, week: 1})
	expect(DateWeekISONumber('2021-01-09')).toEqual({year: 2021, week: 1})
	expect(DateWeekISONumber('2021-01-10')).toEqual({year: 2021, week: 1})
	expect(DateWeekISONumber('2021-01-11')).toEqual({year: 2021, week: 2})
	expect(DateWeekISONumber('2023-01-01')).toEqual({year: 2022, week: 52})
	expect(DateWeekISONumber('2023-01-03')).toEqual({year: 2023, week: 1})
	expect(DateWeekISONumber('2023-01-08')).toEqual({year: 2023, week: 1})
	expect(DateWeekISONumber('2023-01-09')).toEqual({year: 2023, week: 2})
	expect(DateFromWeekNumber({year: 2023, week: 5})).toEqual('2023-01-30')
	expect(DateFromWeekNumber({year: 2020, week: 52})).toEqual('2020-12-21')
	expect(DateFromWeekNumber({year: 2020, week: 53})).toEqual('2020-12-28')
	expect(DateFromWeekNumber({year: 2021, week: 1})).toEqual('2021-01-04')
	expect(DateFromWeekNumber({year: 2022, week: 52})).toEqual('2022-12-26')
	expect(DateFromWeekNumber({year: 0, week: 52})).toEqual(null)
	expect(DatesFromWeekNumber({year: 2023, week: 5})).toEqual({start: '2023-01-30', end: '2023-02-05'})
	expect(DatesFromWeekNumber({year: 2021, week: 1})).toEqual({start: '2021-01-04', end: '2021-01-10'})
	expect(MonthDatesFromDateISOWeeks('2023-01-10')).toEqual({start: '2023-01-02', end: '2023-02-05'})
	expect(MonthDatesFromDateISOWeeks('2023-02-10')).toEqual({start: '2023-02-06', end: '2023-03-05'})
	expect(WeekNumberAdjust({year: 2022, week: 52}, 1)).toEqual({year: 2023, week: 1})
	expect(WeekNumberAdjust({year: 2023, week: 1}, -1)).toEqual({year: 2022, week: 52})
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSame', '2021-01-01T00:00:00Z')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSame', '2021-01-01T00:00:00Z', 'year')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSame', '2021-01-01T10:00:00Z', 'day')).toEqual(true)
	expect(DateCompare('2021-01-01', 'IsSame', '2021-01-01T10:00:00Z', 'day')).toEqual(true)
	expect(DateCompare('2021-01-02', 'IsSame', '2021-01-01T10:00:00Z', 'day')).toEqual(false)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSame', '2021-01-01T00:00:00Z', 'second')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSame', '2021-01-01T00:00:00Z', 'millisecond')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrBefore', '2021-01-01T00:00:00Z')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrBefore', '2021-01-01T00:00:00Z', 'year')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrBefore', '2021-01-01T00:00:00Z', 'second')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrBefore', '2021-01-01T00:00:00Z', 'millisecond')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrAfter', '2021-01-01T00:00:00Z')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrAfter', '2021-01-01T00:00:00Z', 'year')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrAfter', '2021-01-01T00:00:00Z', 'second')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrAfter', '2021-01-01T00:00:00Z', 'millisecond')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrAfter', '2021-01-01T00:00:00Z')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrAfter', '2021-01-01T00:00:00Z', 'year')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrAfter', '2021-01-01T00:00:00Z', 'second')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrAfter', '2021-01-01T00:00:00Z', 'millisecond')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSame', '2021-01-01T00:01:00Z')).toEqual(false)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSame', '2021-01-01T00:01:00Z', 'second')).toEqual(false)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSame', '2021-01-01T00:01:00Z', 'minute')).toEqual(false)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSame', '2021-01-01T00:01:00Z', 'hour')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSame', '2021-01-01T00:01:00Z', 'day')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrBefore', '2023-01-01T00:01:00Z', 'year')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrAfter', '2023-01-01T00:01:00Z', 'year')).toEqual(false)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrBefore', '2018-01-01T00:01:00Z', 'year')).toEqual(false)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrAfter', '2018-01-01T00:01:00Z', 'year')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrBefore', '2021-01-01T00:01:00Z', 'second')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSameOrAfter', '2021-01-01T00:01:00Z', 'second')).toEqual(false)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsAfter', '2021-01-01T00:01:00Z', 'millisecond')).toEqual(false)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsBefore', '2021-01-01T00:01:00Z', 'millisecond')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsAfter', '2021-01-01T00:01:00Z')).toEqual(false)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsBefore', '2021-01-01T00:01:00Z')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsAfter', '2021-01-01T00:01:00Z', 'day')).toEqual(false)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsBefore', '2021-01-01T00:01:00Z', 'day')).toEqual(false)
	expect(DateCompare('2999-11-18', 'IsBefore', 'now', 'day')).toEqual(false)
	expect(DateCompare('2999-11-18', 'IsAfter', 'now', 'day')).toEqual(true)
	expect(DateParseTS('Not a date')).toEqual(null)
	expect(ManualParse('2021-11-12 14:08:54.71-05')).toEqual(1636744134710)
	expect(
		DateISO('2021-11-12 14:08:54.71', {
			timezoneSource: 'America/New_York'
		})
	).toEqual('2021-11-12T19:08:54.710Z')
	expect(
		DateISO('2021-11-12 14:08:54.71', {
			timezoneSource: 'America/Chicago'
		})
	).toEqual('2021-11-12T20:08:54.710Z')
	expect(
		DateFormat(
			'LocalDateTime',
			DateISO('2021-11-12 00:00:00.00', {
				timezoneSource: 'America/New_York'
			}),
			'America/New_York'
		)
	).toEqual('11/12/2021 12:00 am')
	expect(
		DateFormat(
			'LocalDateTime',
			DateISO('2021-11-12 01:00:00.00', {
				timezoneSource: 'America/New_York'
			}),
			'America/New_York'
		)
	).toEqual('11/12/2021 1:00 am')
	expect(
		DateFormat(
			'LocalDateTime',
			DateISO('2021-11-12 11:00:00.00', {
				timezoneSource: 'America/New_York'
			}),
			'America/New_York'
		)
	).toEqual('11/12/2021 11:00 am')
	expect(
		DateFormat(
			'LocalDateTime',
			DateISO('2021-11-12 11:59:59.00', {
				timezoneSource: 'America/New_York'
			}),
			'America/New_York'
		)
	).toEqual('11/12/2021 11:59 am')
	expect(
		DateFormat(
			'LocalDateTime',
			DateISO('2021-11-12 12:01:00.00', {
				timezoneSource: 'America/New_York'
			}),
			'America/New_York'
		)
	).toEqual('11/12/2021 12:01 pm')
	expect(
		DateFormat(
			'LocalDateTime',
			DateISO('2021-11-12 12:00:00.00', {
				timezoneSource: 'America/New_York'
			}),
			'America/New_York'
		)
	).toEqual('11/12/2021 12:00 pm')
	expect(
		DateFormat(
			'LocalDateTime',
			DateISO('2021-11-12 13:00:00.00', {
				timezoneSource: 'America/New_York'
			}),
			'America/New_York'
		)
	).toEqual('11/12/2021 1:00 pm')
	expect(DateFormat('Date', DateISO('0021-01-24 01:00:00.00'))).toEqual('0021-01-24')

	expect(DateOnlyNull('1970-01-01')).toEqual('1970-01-01')
	expect(DateOnlyNull('2023-04-05')).toEqual('2023-04-05')
	expect(DateOnlyNull('20230405', {fromFormat: 'YYYYMMDD'})).toEqual('2023-04-05')
	expect(DateOnlyNull('04052023', {fromFormat: 'MMDDYYYY'})).toEqual('2023-04-05')
	expect(DateOnlyNull('230405', {fromFormat: 'YYMMDD'})).toEqual('2023-04-05')
	expect(DateOnlyNull('040523', {fromFormat: 'MMDDYY'})).toEqual('2023-04-05')
	expect(DateOnlyNull('040500', {fromFormat: 'MMDDYY'})).toEqual(null)

	expect(DateFormatAny('HH:mm', '2023-04-05 08:00:00')).toEqual('08:00')
	expect(DateFormatAny('HH:mm', '08:00:00')).toEqual('08:00')

	expect(SortCompareDateNull('2021-01-01', '2021-01-02')).toEqual(-1)
	expect(SortCompareDateNull('2021-01-02', '2021-01-01')).toEqual(1)
	expect(SortCompareDateNull('2021-01-01', '2021-01-01')).toEqual(null)
	expect(SortCompareDate('2021-01-01', '2021-01-02')).toEqual(-1)
	expect(SortCompareDate('2021-01-02', '2021-01-01')).toEqual(1)
	expect(SortCompareDate('2021-01-01', '2021-01-01')).toEqual(0)
	expect(SortCompareDate('2021-01-01 08:00:00', '2021-01-01 08:00:00')).toEqual(0)
	expect(SortCompareDate('2021-01-01 08:00:00', '2021-01-01 08:01:00')).toEqual(-1)
	expect(SortCompareDate('2021-01-01 08:00:00', '2021-01-01 08:01:00', 'day')).toEqual(0)
	expect(DateFormat('DisplayTime', '2021-12-22 14:41:24.404782-05')).toEqual('2:41 pm')
	expect(DateISO(dt, {year: 'StartOf'})).toEqual('2021-01-01T00:00:00.000Z')
	expect(DateISO(dt, {year: 'EndOf'})).toEqual('2021-12-31T23:59:59.999Z')
	expect(DateISO(dt, {quarter: 'StartOf'})).toEqual('2021-10-01T00:00:00.000Z')
	expect(DateISO(dt, {quarter: 'EndOf'})).toEqual('2021-12-31T23:59:59.999Z')
	expect(DateISO(dt, {month: 'StartOf'})).toEqual('2021-12-01T00:00:00.000Z')
	expect(DateISO(dt, {month: 'EndOf'})).toEqual('2021-12-31T23:59:59.999Z')
	expect(DateISO(dt, {day: 'StartOf'})).toEqual('2021-12-22T00:00:00.000Z')
	expect(DateISO(dt, {day: 'EndOf'})).toEqual('2021-12-22T23:59:59.999Z')
	expect(DateISO(dt, {week: 'StartOf'})).toEqual('2021-12-19T00:00:00.000Z')
	expect(DateISO(dt, {week: 'EndOf'})).toEqual('2021-12-25T23:59:59.999Z')
	expect(DateISO(dt, {hour: 'StartOf'})).toEqual('2021-12-22T14:00:00.000Z')
	expect(DateISO(dt, {hour: 'EndOf'})).toEqual('2021-12-22T14:59:59.999Z')
	expect(DateISO(dt, {minute: 'StartOf'})).toEqual('2021-12-22T14:41:00.000Z')
	expect(DateISO(dt, {minute: 'EndOf'})).toEqual('2021-12-22T14:41:59.999Z')
	expect(DateISO(dt, {second: 'StartOf'})).toEqual('2021-12-22T14:41:24.000Z')
	expect(DateISO(dt, {second: 'EndOf'})).toEqual('2021-12-22T14:41:24.999Z')
	expect(DatesQuarter(2021, 4)).toEqual({start: '2021-10-01', end: '2021-12-31'})
	expect(DatesQuarter(2021, 3)).toEqual({start: '2021-07-01', end: '2021-09-30'})
	expect(DatesQuarter(2021, 2)).toEqual({start: '2021-04-01', end: '2021-06-30'})
	expect(DatesQuarter(2021, 1)).toEqual({start: '2021-01-01', end: '2021-03-31'})
	expect(DateQuarter('2021-01-01')).toEqual({year: 2021, quarter: 1})
	expect(DateQuarter('2021-02-01')).toEqual({year: 2021, quarter: 1})
	expect(DateQuarter('2021-04-01')).toEqual({year: 2021, quarter: 2})
	expect(DateQuarter('2021-07-01')).toEqual({year: 2021, quarter: 3})
	expect(DateQuarter('2021-10-01')).toEqual({year: 2021, quarter: 4})
	expect(DateQuarter('2021-12-31')).toEqual({year: 2021, quarter: 4})
	expect(DateMonth('2021-01-01')).toEqual({year: 2021, monthOneBased: 1})
	expect(DateMonth('2021-12-31')).toEqual({year: 2021, monthOneBased: 12})
	expect(DateCompare(new Date(), 'IsSame', new Date(), 'day')).toEqual(true)
	expect(DateCompare(new Date(), 'IsBefore', new Date(), 'day')).toEqual(false)
	expect(DateCompare(new Date(), 'IsSame', {seconds: -2}, 'day')).toEqual(true)
	expect(DateCompare(new Date(), 'IsSame', {days: -2}, 'day')).toEqual(false)
	expect(DateCompare(new Date(), 'IsAfter', {days: -2}, 'day')).toEqual(true)
	expect(DateFormatAny('YYYY-MM', '2022-02-01 03:26:13.670000 +00:00', 'America/Los_Angeles')).toEqual('2022-01')
	expect(TimeOnly('2023-04-11T13:47:58.969Z', {timezoneSource: 'America/New_York'})).toEqual('09:47:58')
	expect(TimeOnly('2023-04-11T13:47:58.969Z', {hours: 1, timezoneSource: 'America/New_York'})).toEqual('10:47:58')
	expect(TimeOnly('11:00:00', {hours: 2})).toEqual('13:00:00')
	expect(TimeOnly('11:00:00', {hours: 23})).toEqual('10:00:00')
	expect(TimeOnly('2023-04-11T13:47:58.969Z', {timezoneSource: 'America/Chicago'})).toEqual('08:47:58')
	expect(TimeOnly('2023-04-11T13:47:58.969Z', {timezoneSource: 'America/Denver'})).toEqual('07:47:58')
	expect(TimeOnly('')).toEqual(null)
	expect(TimeOnly(null)).toEqual(null)
	expect(TimeOnly('blah')).toEqual(null)
	expect(DateOnly('2022-07-02', {week: 'StartOf'})).toEqual('2022-06-26')
	expect(DateOnly('2023-03-08', {week: 'StartOf'})).toEqual('2023-03-05')
	expect(DateOnly('2023-03-08', {week: 'StartOf', timezoneDisplay: 'America/New_York'})).toEqual('2023-03-05')
	expect(DateOnly('2022-07-03', {week: 'StartOf'})).toEqual('2022-07-03')
	expect(DateOnly('2022-07-04', {week: 'StartOf'})).toEqual('2022-07-03')
	expect(DateOnly('2022-07-05', {week: 'StartOf'})).toEqual('2022-07-03')
	expect(DateOnly('2022-07-03', {days: 1, weeks: 'StartOfMon'})).toEqual('2022-07-04')
	expect(DateOnly('2022-07-03', {weeks: 'StartOfMon'})).toEqual('2022-06-27')
	expect(DateOnly('2022-07-04', {week: 'StartOfMon'})).toEqual('2022-07-04')
	expect(DateOnly('2022-07-05', {week: 'StartOfMon'})).toEqual('2022-07-04')
	const otz = process.env.TZ
	expect(DateObject(`${DateOnly('now')} 12:00:00`, {timezoneSource: 'America/New_York'})).toEqual(
		DateObject(`${DateOnly('now')} 12:00:00 America/New_York`)
	)
	expect(DateFormatAny('YYYY-MM-DD HH:mm', '2022-06-01 00:14:33.903000 +00:00', 'America/Los_Angeles')).toEqual(
		'2022-05-31 17:14'
	)
	expect(DateFormat('DisplayDateDoWTime', '2022-01-06 17:07:47.315-05', 'America/New_York')).toEqual(
		'Th, Jan 6, 2022, 5:07 pm'
	)
	expect(DateFormat('Local', '2022-01-06')).toEqual('1/6/2022')
	expect(DateOnly('02/17/2022', {days: -1})).toEqual('2022-02-16')
	expect(DateOnly('2022-02-01', {days: -1})).toEqual('2022-01-31')
	expect(DateOnly('2022-02-17', {weeks: 'StartOf'})).toEqual('2022-02-13')
	expect(DateOnly('2022-02-17', {weeks: 'EndOf'})).toEqual('2022-02-19')
	expect(DateOnly('2022-02-17', {weeks: 'EndOf', formatLocale: true})).toEqual('2/19/2022')
	expect(DateOnly('2022-02-17', {days: 'StartOf'})).toEqual('2022-02-17')
	expect(DateOnly('2022-02-17', {days: 'EndOf'})).toEqual('2022-02-17')
	expect(DateOnly('2022-02-17', {day: -1, days: 'StartOf'})).toEqual('2022-02-16')
	expect(DateOnly('2022-02-17', {day: -1, days: 'EndOf'})).toEqual('2022-02-16')
	expect(DateOnly('today')).toEqual(
		`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date()
			.getDate()
			.toString()
			.padStart(2, '0')}`
	)
	expect(DateOnly('today', {day: 'StartOf'})).toEqual(
		`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date()
			.getDate()
			.toString()
			.padStart(2, '0')}`
	)
	expect(DateOnly('today', {day: 'EndOf'})).toEqual(
		`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date()
			.getDate()
			.toString()
			.padStart(2, '0')}`
	)
	// expect(DateOnly(null, {timezoneDisplay: process.env.TZ ?? 'America/New_York'})).toEqual(new Date().toISOString().substring(0, 10))
	// expect(DateOnly(null, {formatLocale: true, timezoneDisplay: process.env.TZ ?? 'America/New_York'})).toEqual(
	// 	CleanNumber(new Date().toISOString().substring(5, 7)).toString() +
	// 		'/' +
	// 		CleanNumber(new Date().toISOString().substring(8, 10)).toString() +
	// 		'/' +
	// 		new Date().toISOString().substring(0, 4)
	// )
	times.forEach((time) => expect(TimeOnly(time[0])).toEqual(time[1]))
	process.env.TZ = 'Asia/Tehran'
	expect(DateObject(`${DateOnly('now')} 12:00:00`, {timezoneSource: 'America/New_York'})).toEqual(
		DateObject(`${DateOnly('now')} 12:00:00 America/New_York`)
	)
	expect(DateFormatAny('YYYY-MM-DD HH:mm', '2022-06-01 00:14:33.903000 +00:00', 'America/Los_Angeles')).toEqual(
		'2022-05-31 17:14'
	)
	expect(DateFormat('DisplayDateDoWTime', '2022-01-06 17:07:47.315-05', 'America/New_York')).toEqual(
		'Th, Jan 6, 2022, 5:07 pm'
	)
	expect(DateFormat('Local', '2022-01-06')).toEqual('1/6/2022')
	expect(DateOnly('02/17/2022', {days: -1})).toEqual('2022-02-16')
	expect(DateOnly('2022-02-01', {days: -1})).toEqual('2022-01-31')
	expect(DateOnly('2022-02-17', {weeks: 'StartOf'})).toEqual('2022-02-13')
	expect(DateOnly('2022-02-17', {weeks: 'EndOf'})).toEqual('2022-02-19')
	expect(DateOnly('2022-02-17', {weeks: 'EndOf', formatLocale: true})).toEqual('2/19/2022')
	expect(DateOnly('2022-02-17', {days: 'StartOf'})).toEqual('2022-02-17')
	expect(DateOnly('2022-02-17', {days: 'EndOf'})).toEqual('2022-02-17')
	expect(DateOnly('2022-02-17', {day: -1, days: 'StartOf'})).toEqual('2022-02-16')
	expect(DateOnly('2022-02-17', {day: -1, days: 'EndOf'})).toEqual('2022-02-16')
	expect(DateOnly('today')).toEqual(
		`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date()
			.getDate()
			.toString()
			.padStart(2, '0')}`
	)
	expect(DateOnly('today', {day: 'StartOf'})).toEqual(
		`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date()
			.getDate()
			.toString()
			.padStart(2, '0')}`
	)
	expect(DateOnly('today', {day: 'EndOf'})).toEqual(
		`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date()
			.getDate()
			.toString()
			.padStart(2, '0')}`
	)
	times.forEach((time) => expect(TimeOnly(time[0])).toEqual(time[1]))
	process.env.TZ = 'America/New_York'
	expect(DateObject(`${DateOnly('now')} 12:00:00`, {timezoneSource: 'America/New_York'})).toEqual(
		DateObject(`${DateOnly('now')} 12:00:00 America/New_York`)
	)
	expect(DateFormatAny('YYYY-MM-DD HH:mm', '2022-06-01 00:14:33.903000 +00:00', 'America/Los_Angeles')).toEqual(
		'2022-05-31 17:14'
	)
	expect(DateFormat('DisplayDateDoWTime', '2022-01-06 17:07:47.315-05', 'America/New_York')).toEqual(
		'Th, Jan 6, 2022, 5:07 pm'
	)
	expect(DateFormat('LocalDateTime', '2022-02-01T15:18:37.633-05:00')).toEqual('2/1/2022 3:18 pm')
	expect(TimeOnly('2022-02-01T15:18:37.633-05:00', {formatLocale: true})).toEqual('3:18 pm')
	expect(DateFormat('LocalDateTime', '1970-01-01T00:00:00-05:00')).toEqual('1/1/1970 12:00 am')
	expect(DateFormat('LocalDateTime', '1970-01-01T08:00:00-05:00')).toEqual('1/1/1970 8:00 am')
	expect(DateFormat('Local', '1970-01-01T08:00:00-05:00')).toEqual('1/1/1970')
	expect(DateFormat('Local', '1970-01-01')).toEqual('1/1/1970')
	expect(DateFormat('Local', '2022-01-06')).toEqual('1/6/2022')
	expect(DateOnly('02/17/2022', {days: -1})).toEqual('2022-02-16')
	expect(DateOnly('2022-02-01', {days: -1})).toEqual('2022-01-31')
	expect(DateOnly('2022-02-17', {weeks: 'StartOf'})).toEqual('2022-02-13')
	expect(DateOnly('2022-02-17', {weeks: 'EndOf'})).toEqual('2022-02-19')
	expect(DateOnly('2022-02-17', {weeks: 'EndOf', formatLocale: true})).toEqual('2/19/2022')
	expect(DateOnly('2022-02-17', {days: 'StartOf'})).toEqual('2022-02-17')
	expect(DateOnly('2022-02-17', {days: 'EndOf'})).toEqual('2022-02-17')
	expect(DateOnly('2022-02-17', {day: -1, days: 'StartOf'})).toEqual('2022-02-16')
	expect(DateOnly('2022-02-17', {day: -1, days: 'EndOf'})).toEqual('2022-02-16')
	expect(DateOnly('today')).toEqual(
		`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date()
			.getDate()
			.toString()
			.padStart(2, '0')}`
	)
	expect(DateOnly('today', {day: 'StartOf'})).toEqual(
		`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date()
			.getDate()
			.toString()
			.padStart(2, '0')}`
	)
	expect(DateOnly('today', {day: 'EndOf'})).toEqual(
		`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date()
			.getDate()
			.toString()
			.padStart(2, '0')}`
	)
	times.forEach((time) => expect(TimeOnly(time[0])).toEqual(time[1]))
	expect(IANAZoneAbbr('2022-06-01', 'America/New_York')).toEqual('EDT')
	expect(IANAZoneAbbr('2022-12-01', 'America/New_York')).toEqual('EST')
	process.env.TZ = 'America/Los_Angeles'
	expect(TimeOnly('2022-02-01T15:18:37.633-05:00', {formatLocale: true})).toEqual('3:18 pm')
	expect(
		TimeOnly('2022-02-01T15:18:37.633-05:00', {formatLocale: true, timezoneSource: 'America/Los_Angeles'})
	).toEqual('12:18 pm')
	expect(DateObject(`${DateOnly('now')} 12:00:00`, {timezoneSource: 'America/New_York'})).toEqual(
		DateObject(`${DateOnly('now')} 12:00:00 America/New_York`)
	)
	expect(DateFormatAny('YYYY-MM-DD HH:mm', '2022-06-01 00:14:33.903000 +00:00', 'America/Los_Angeles')).toEqual(
		'2022-05-31 17:14'
	)
	expect(DateFormat('DisplayDateDoWTime', '2022-01-06 17:07:47.315-05', 'America/New_York')).toEqual(
		'Th, Jan 6, 2022, 5:07 pm'
	)
	expect(DateFormat('Local', '2022-01-06')).toEqual('1/6/2022')
	expect(DateOnly('02/17/2022', {days: -1})).toEqual('2022-02-16')
	expect(DateOnly('2021-7-9')).toEqual('2021-07-09')
	expect(DateOnly('2022-02-01', {days: -1})).toEqual('2022-01-31')
	expect(DateOnly('2022-02-17', {weeks: 'StartOf'})).toEqual('2022-02-13')
	expect(DateOnly('2022-02-17', {weeks: 'EndOf'})).toEqual('2022-02-19')
	expect(DateOnly('2022-02-17', {weeks: 'EndOf', formatLocale: true})).toEqual('2/19/2022')
	expect(DateOnly('2022-02-17', {days: 'StartOf'})).toEqual('2022-02-17')
	expect(DateOnly('2022-02-17', {days: 'EndOf'})).toEqual('2022-02-17')
	expect(DateOnly('2022-02-17', {day: -1, days: 'StartOf'})).toEqual('2022-02-16')
	expect(DateOnly('2022-02-17', {day: -1, days: 'EndOf'})).toEqual('2022-02-16')
	expect(DateOnly('today')).toEqual(
		`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date()
			.getDate()
			.toString()
			.padStart(2, '0')}`
	)
	expect(DateOnly('today', {day: 'StartOf'})).toEqual(
		`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date()
			.getDate()
			.toString()
			.padStart(2, '0')}`
	)
	expect(DateOnly('today', {day: 'EndOf'})).toEqual(
		`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date()
			.getDate()
			.toString()
			.padStart(2, '0')}`
	)
	times.forEach((time) => expect(TimeOnly(time[0])).toEqual(time[1]))
	if (!!otz) {
		process.env.TZ = otz
	} else {
		delete process.env.TZ
	}
	expect(TimeSeries(30, '08:00', '10:00')).toEqual(['08:00:00', '08:30:00', '09:00:00', '09:30:00'])
	expect(TimeFloorMinute('08:28', 15)).toEqual('08:15:00')
	expect(TimeFloorMinute('2022-05-10T12:28:00Z', 15)).toEqual('2022-05-10T12:15:00.000Z')
	expect(DateIsWeekend('2022-09-12')).toEqual(false)
	expect(DateIsWeekend('2022-09-11')).toEqual(true)
	expect(DateIsWeekend('2022-09-10')).toEqual(true)
	expect(DateIsWeekend('2022-09-09')).toEqual(false)
	expect(IANAZoneAbbr('2000-01-01', 'America/Puerto_Rico')).toEqual('AST')
	expect(IANAZoneAbbr('2022-06-01', 'America/New_York')).toEqual('EDT')
	expect(IANAZoneAbbr('2022-12-01', 'America/New_York')).toEqual('EST')
	expect(IANAZoneAbbr('2022-06-01', 'America/Denver')).toEqual('MDT')
	expect(IANAZoneAbbr('2022-12-01', 'America/Denver')).toEqual('MST')
	expect(IANADescription('America/New_York', {forDate: '2020-01-01'})).toEqual('America/New York (EST)')
	expect(IANADescription('America/New_York', {hideIANA: true, forDate: '2020-01-01'})).toEqual('EST')
	expect(IANADescription('America/New_York', {removePrefix: true, forDate: '2020-01-01'})).toEqual('New York (EST)')

	expect(DatesBetween('2023-03-31', '2023-04-02')).toEqual(['2023-03-31', '2023-04-01', '2023-04-02'])
	expect(DatesBetween('2023-04-02', '2023-03-31')).toEqual(['2023-04-02', '2023-04-01', '2023-03-31'])
	expect(IANAZoneAbbr('2022-06-01', 'America/New_York')).toEqual('EDT')

	expect(LeastDate('2023-04-02', '2023-04-01', '2023-03-31')).toEqual('2023-03-31')
})

test('Easters', () => {
	expect(EasterDate(2022)).toEqual('2022-04-17')
	expect(EasterDate(2023)).toEqual('2023-04-09')
	expect(EasterDate(2024)).toEqual('2024-03-31')
	expect(EasterDate(2025)).toEqual('2025-04-20')
	expect(EasterDate(2026)).toEqual('2026-04-05')
	expect(EasterDate(2027)).toEqual('2027-03-28')
	expect(EasterDate(2028)).toEqual('2028-04-16')
	expect(EasterDate(2029)).toEqual('2029-04-01')
	expect(EasterDate(2030)).toEqual('2030-04-21')
	expect(EasterDate(2031)).toEqual('2031-04-13')
	expect(EasterDate(2032)).toEqual('2032-03-28')
	expect(EasterDate(2033)).toEqual('2033-04-17')
	expect(EasterDate(2034)).toEqual('2034-04-09')
})

// test('Pesachs (Passovers)', () => {
// 	expect(PesachDate(2024)).toEqual('2024-04-22')
// 	expect(PesachDate(2025)).toEqual('2025-04-12')
// 	expect(PesachDate(2026)).toEqual('2026-04-01')
// 	expect(PesachDate(2027)).toEqual('2027-04-21')
// 	expect(PesachDate(2028)).toEqual('2028-04-10')
// 	expect(PesachDate(2029)).toEqual('2029-03-30')
// 	expect(PesachDate(2030)).toEqual('2030-04-17')
// 	expect(PesachDate(2031)).toEqual('2031-04-07')
// 	expect(PesachDate(2032)).toEqual('2032-03-26')
// 	expect(PesachDate(2033)).toEqual('2033-04-13')
// 	expect(PesachDate(2034)).toEqual('2034-04-03')
// 	expect(PesachDate(2035)).toEqual('2035-04-23')
// 	expect(PesachDate(2036)).toEqual('2036-04-11')
// 	expect(PesachDate(2037)).toEqual('2037-03-30')
// 	expect(PesachDate(2038)).toEqual('2038-04-19')
// 	expect(PesachDate(2039)).toEqual('2039-04-08')
// 	expect(PesachDate(2040)).toEqual('2040-03-28')
// })
