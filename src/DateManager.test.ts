import {
	DateAdjustTS,
	DateCompare,
	DateDiff,
	DateDiffComponents,
	DateFormat,
	DateISO,
	DateParseTS,
	DateQuarter,
	DatesQuarter,
	DateWeekNumber,
	ManualParse,
	SortCompareDate,
	SortCompareDateNull
} from './DateManager'

const isoLongDateString = '2021-01-01T00:00:00Z'
const dt = '2021-12-22T14:41:24Z'
const dateTS = DateParseTS(isoLongDateString)

test('Date Managers', () => {
	expect(DateParseTS('2000-01-01 08:00')).toEqual(DateParseTS('2000-01-01 08:00:00'))
	expect(DateFormat('DisplayDateDoWTimeLong', isoLongDateString)).toEqual('Thursday, December 31, 2020, 7:00 pm')
	expect(DateFormat('DisplayDateDoWTimeLong', isoLongDateString, 'America/Los_Angeles')).toEqual('Thursday, December 31, 2020, 4:00 pm')
	expect(DateFormat('DisplayDateDoWTimeLong', '2021-01-01 10:00:00', 'America/New_York', 'America/Los_Angeles')).toEqual('Friday, January 1, 2021, 1:00 pm')
	expect(DateFormat('DisplayDateDoWTimeLong', '2021-01-01 09:00:00', 'America/Los_Angeles', 'America/Chicago')).toEqual('Friday, January 1, 2021, 7:00 am')
	expect(DateFormat('DisplayDateDoWTimeLong', '2021-01-01 10:00:00')).toEqual('Friday, January 1, 2021, 10:00 am')
	expect(DateFormat('DisplayDateDoWTimeLong', '2021-01-01 10:00:00', 'America/Chicago', 'EST')).toEqual('Friday, January 1, 2021, 9:00 am')
	expect(DateFormat('DisplayDateDoWTimeLong', '2021-01-01 10:00:00', 'America/Los_Angeles', 'EST')).toEqual('Friday, January 1, 2021, 7:00 am')
	expect(DateParseTS(isoLongDateString)).toEqual(1609459200000)
	expect(dateTS).toEqual(1609459200000)
	expect(DateAdjustTS(dateTS, {
		weeks: 1,
		days: -1,
		hours: 1,
		minutes: 1,
		seconds: 1,
		milliseconds: 1
	})).toEqual(1609459200000 + (7 * 24 * 60 * 60 * 1000) - (24 * 60 * 60 * 1000) + (60 * 60 * 1000) + (60 * 1000) + 1000 + 1)
	expect(DateISO('2021-01-01 10:00:00')).toEqual('2021-01-01T15:00:00.000Z')
	expect(DateISO('2021-01-01 10:00:00', {timezoneSource: 'America/Chicago'})).toEqual('2021-01-01T16:00:00.000Z')
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
	expect(DateWeekNumber('2021-01-01')).toEqual(1)
	expect(DateWeekNumber('2021-01-02')).toEqual(1)
	expect(DateWeekNumber('2021-01-03')).toEqual(2)
	expect(DateWeekNumber('2021-01-09')).toEqual(2)
	expect(DateWeekNumber('2021-01-10')).toEqual(3)
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
	expect(DateISO('2021-11-12 14:08:54.71', {
		timezoneSource: 'America/New_York'
	})).toEqual('2021-11-12T19:08:54.710Z')
	expect(DateISO('2021-11-12 14:08:54.71', {
		timezoneSource: 'America/Chicago'
	})).toEqual('2021-11-12T20:08:54.710Z')
	expect(DateFormat('LocalDateTime', DateISO('2021-11-12 00:00:00.00', {
		timezoneSource: 'America/New_York'
	}), 'America/New_York')).toEqual('11/12/2021 12:00 am')
	expect(DateFormat('LocalDateTime', DateISO('2021-11-12 01:00:00.00', {
		timezoneSource: 'America/New_York'
	}), 'America/New_York')).toEqual('11/12/2021 1:00 am')
	expect(DateFormat('LocalDateTime', DateISO('2021-11-12 11:00:00.00', {
		timezoneSource: 'America/New_York'
	}), 'America/New_York')).toEqual('11/12/2021 11:00 am')
	expect(DateFormat('LocalDateTime', DateISO('2021-11-12 11:59:59.00', {
		timezoneSource: 'America/New_York'
	}), 'America/New_York')).toEqual('11/12/2021 11:59 am')
	expect(DateFormat('LocalDateTime', DateISO('2021-11-12 12:01:00.00', {
		timezoneSource: 'America/New_York'
	}), 'America/New_York')).toEqual('11/12/2021 12:01 pm')
	expect(DateFormat('LocalDateTime', DateISO('2021-11-12 12:00:00.00', {
		timezoneSource: 'America/New_York'
	}), 'America/New_York')).toEqual('11/12/2021 12:00 pm')
	expect(DateFormat('LocalDateTime', DateISO('2021-11-12 13:00:00.00', {
		timezoneSource: 'America/New_York'
	}), 'America/New_York')).toEqual('11/12/2021 1:00 pm')
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
	expect(DateCompare(new Date(), 'IsSame', new Date(), 'day')).toEqual(true)
	expect(DateCompare(new Date(), 'IsBefore', new Date(), 'day')).toEqual(false)
	expect(DateCompare(new Date(), 'IsSame', {seconds: -2}, 'day')).toEqual(true)
	expect(DateCompare(new Date(), 'IsSame', {days: -2}, 'day')).toEqual(false)
	expect(DateCompare(new Date(), 'IsAfter', {days: -2}, 'day')).toEqual(true)
	const otz = process.env.TZ
	expect(DateFormat('DisplayDateDoWTime', '2022-01-06 17:07:47.315-05', 'America/New_York')).toEqual('Th, Jan 6, 2022, 5:07 pm')
	expect(DateFormat('Local', '2022-01-06')).toEqual('1/6/2022')
	process.env.TZ = 'Asia/Tehran'
	expect(DateFormat('DisplayDateDoWTime', '2022-01-06 17:07:47.315-05', 'America/New_York')).toEqual('Th, Jan 6, 2022, 5:07 pm')
	expect(DateFormat('Local', '2022-01-06')).toEqual('1/6/2022')
	process.env.TZ = 'America/New_York'
	expect(DateFormat('DisplayDateDoWTime', '2022-01-06 17:07:47.315-05', 'America/New_York')).toEqual('Th, Jan 6, 2022, 5:07 pm')
	expect(DateFormat('LocalDateTime', '2022-02-01T15:18:37.633-05:00')).toEqual('2/1/2022 3:18 pm')
	expect(DateFormat('Local', '2022-01-06')).toEqual('1/6/2022')
	process.env.TZ = 'America/Las_Angeles'
	expect(DateFormat('DisplayDateDoWTime', '2022-01-06 17:07:47.315-05', 'America/New_York')).toEqual('Th, Jan 6, 2022, 5:07 pm')
	expect(DateFormat('Local', '2022-01-06')).toEqual('1/6/2022')
	if (!!otz) {
		process.env.TZ = otz
	} else {
		delete process.env.TZ
	}
})

// '2021-12-22T14:41:24Z'
