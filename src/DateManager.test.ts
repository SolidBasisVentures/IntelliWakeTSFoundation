import {DateAdjustTS, DateISO, DateParseTS} from './DateManager'

const isoLongDateString = '2021-01-01T00:00:00Z'
const dateTS = DateParseTS(isoLongDateString)

test('Date Managers', () => {
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
	expect(DateISO(isoLongDateString, {year: 1})).toEqual('2022-01-01T00:00:00.000Z')
	expect(DateISO(isoLongDateString, {month: 1})).toEqual('2021-02-01T00:00:00.000Z')
	expect(DateISO('2021-01-31T00:00:00.000Z', {month: 1})).toEqual('2021-02-28T00:00:00.000Z')
	expect(DateISO(isoLongDateString, {week: 1})).toEqual('2021-01-08T00:00:00.000Z')
	expect(DateISO(isoLongDateString, {day: 1})).toEqual('2021-01-02T00:00:00.000Z')
	expect(DateISO(isoLongDateString, {hour: 1})).toEqual('2021-01-01T01:00:00.000Z')
	expect(DateISO(isoLongDateString, {minute: 1})).toEqual('2021-01-01T00:01:00.000Z')
	expect(DateISO(isoLongDateString, {second: 1})).toEqual('2021-01-01T00:00:01.000Z')
})
