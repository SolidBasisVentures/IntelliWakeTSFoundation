import {DateAdjustTS, DateCompare, DateDiff, DateDiffComponents, DateFormat, DateISO, DateParseTS} from './DateManager'

const isoLongDateString = '2021-01-01T00:00:00Z'
const dateTS = DateParseTS(isoLongDateString)

test('Date Managers', () => {
	expect(DateFormat(isoLongDateString, 'DisplayDateDoWTimeLong')).toEqual('Thursday, December 31, 2020, 7:00 pm')
	expect(DateFormat(isoLongDateString, 'DisplayDateDoWTimeLong', 'America/Los_Angeles')).toEqual('Thursday, December 31, 2020, 4:00 pm')
	expect(DateFormat('2021-01-01 10:00:00', 'DisplayDateDoWTimeLong', 'America/New_York', 'America/Los_Angeles')).toEqual('Friday, January 1, 2021, 1:00 pm')
	expect(DateFormat('2021-01-01 09:00:00', 'DisplayDateDoWTimeLong', 'America/Los_Angeles', 'America/Chicago')).toEqual('Friday, January 1, 2021, 7:00 am')
	expect(DateFormat('2021-01-01 10:00:00', 'DisplayDateDoWTimeLong')).toEqual('Friday, January 1, 2021, 10:00 am')
	expect(DateFormat('2021-01-01 10:00:00', 'DisplayDateDoWTimeLong', 'America/Chicago')).toEqual('Friday, January 1, 2021, 11:00 am')
	expect(DateFormat('2021-01-01 10:00:00', 'DisplayDateDoWTimeLong', 'America/Los_Angeles')).toEqual('Friday, January 1, 2021, 1:00 pm')
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
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSame', '2021-01-01T00:00:00Z')).toEqual(true)
	expect(DateCompare('2021-01-01T00:00:00Z', 'IsSame', '2021-01-01T00:00:00Z', 'year')).toEqual(true)
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
	expect(DateCompare('2999-11-18', 'IsBefore', null, 'day')).toEqual(false)
	expect(DateCompare('2999-11-18', 'IsAfter', null, 'day')).toEqual(true)
})
