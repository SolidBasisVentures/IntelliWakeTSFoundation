import {DateIsWeekend, DateOnly, WeeksFromLabel} from '../src/DateManager'

require('source-map-support').install()

console.time('Consoles')

console.log(WeeksFromLabel(DateOnly('now', {weeks: 'StartOf', week: -1}), 'StartOf'))
console.log('2022-09-12', DateIsWeekend('2022-09-12'))

console.timeEnd('Consoles')

// console.log('Sat to Sun', DateOnly('2022-07-02', {week: 'StartOf'}))
// console.log('Sun to Sun', DateOnly('2022-07-03', {week: 'StartOf'}))
// console.log('Mon to Sun', DateOnly('2022-07-04', {week: 'StartOf'}))
// console.log('Tue to Sun', DateOnly('2022-07-05', {week: 'StartOf'}))
//
// console.log('Mon to Mon', DateOnly('2022-07-03', {days: 1, weeks: 'StartOfMon'}))
// console.log('Sun to P Mon', DateOnly('2022-07-03', {weeks: 'StartOfMon'}))
// console.log('Mon to Mon', DateOnly('2022-07-04', {week: 'StartOfMon'}))
// console.log('Tue to Mon', DateOnly('2022-07-05', {week: 'StartOfMon'}))


// console.log(process.env.TZ)
//
// console.log('2022-06-01 00:14:33.903000 +00:00'
// 	, DateFormatAny('YYYY-MM-DD HH:mm', '2022-06-01 00:14:33.903000 +00:00', 'America/Los_Angeles'))
//
// process.env.TZ = 'America/Chicago'
// console.log('2022-06-01 00:14:33.903000 +00:00'
// 	, DateFormatAny('YYYY-MM-DD HH:mm', '2022-06-01 00:14:33.903000 +00:00', 'America/Los_Angeles'))
//
// process.env.TZ = 'Europe/London'
// console.log('2022-06-01 00:14:33.903000 +00:00'
// 	, DateFormatAny('YYYY-MM-DD HH:mm', '2022-06-01 00:14:33.903000 +00:00', 'America/Los_Angeles'))
//
// process.env.TZ = 'GMT'
// console.log('2022-06-01 00:14:33.903000 +00:00'
// 	, DateFormatAny('YYYY-MM-DD HH:mm', '2022-06-01 00:14:33.903000 +00:00', 'America/Los_Angeles'))

// console.log([1.1, 1.100, 1.2].sort(SortCompare))
// const strings = ['1', '100', '2']
// console.log(strings.sort(SortCompare))

// const minutes: number[] = [1, 5, 10, 15, 30, 60]
//
// minutes.forEach(minute => console.log('08:28', minute, TimeFloorMinute('08:28', minute)))
// minutes.forEach(minute => console.log('2022-05-10 08:28', minute, TimeFloorMinute('2022-05-10 08:28', minute)))

// console.log(TimeSeries(30, '08:00', '10:00'))

// const values = [{id: 1}, {id: null}, {id: 0}, {id: null}, {id: 2}]
//
// const sort1: ISortColumn<{id: number | null}> = {
// 	...initialSortColumn,
// 	primarySort: 'id',
// 	primaryAscending: true,
// 	primaryEmptyToBottom: 'number'
// }
//
// console.log(SortColumns(values, sort1))

// Array(100).fill(0)
// 	.map((_item, idx) => console.log(idx,
// 		DateObject('today', {months: idx}),
// 		TimeOnly('now'),
// 		DateFormat('DisplayDateDoWTimeLong', 'today'),
// 		DateFormat('Local', 'today'),
// 		DateCompare('today', 'IsSameOrBefore', DateOnly('today', {days: idx}))))


// Array(100).fill(0)
// 	.map((_item, idx) => console.log(idx,
// 		DateCompare('today', 'IsSameOrBefore', DateOnly('today', {days: idx}))))


// console.log('Here', DateOnly('today'))
// console.log('Here 2', DateOnly('02/17/2022', {days: -1}))

// const times = [
// 	['20:00:00', '20:00:00'],
// 	['20:00', '20:00:00'],
// 	['8:00 pm', '20:00:00'],
// 	['8:00 am', '08:00:00'],
// 	['8:00', '08:00:00'],
// 	['08:00 pm', '20:00:00']
// ]
//
// console.log('--------------')
//
// times.forEach(time => console.log(time[1], '---', TimeOnly(time[0])))

// console.log(DateDiff('2022-02-17', '2022-02-16', 'day'), DateDiff('now', '2022-02-16', 'day'))
// console.log(DateDiff('2022-02-17', '2022-02-17', 'day'), DateDiff('now', '2022-02-17', 'day'))
// console.log(DateDiff('2022-02-17', '2022-02-18', 'day'), DateDiff('now', '2022-02-18', 'day'))
// console.log(DateDiff('2022-02-17', '2022-02-19', 'day'), DateDiff('now', '2022-02-19', 'day'))

// console.log(DateObject( '2022-02-01T15:18:37.633-05:00'))
// console.log(DateFormat('Local', '2022-02-01T15:18:37.633-05:00'))
// console.log(DateFormat('LocalDateTime', '2022-02-01 15:18'))
// console.log(DateFormat('LocalDateTime', '2022-02-01T15:18:37.633-05:00'))

// interface ITemp {
// 	id: number,
// 	name: string,
// 	disabled?: boolean
// }
//
// const temp: ITemp = {id: 1, name: 'Den', disabled: false}
//
// const newTemp = OmitFalsey(temp, 'disabled', 'name')
//
// console.log(newTemp)

// console.log(DateQuarter('2021-01-01'))
// console.log(DateQuarter('2021-02-01'))
// console.log(DateQuarter('2021-04-01'))
// console.log(DateQuarter('2021-07-01'))
// console.log(DateQuarter('2021-10-01'))
// console.log(DateQuarter('2021-12-31'))

// const dt = '2021-11-22T14:41:24Z'
//
// console.log(dt)
// console.log('Start Quarter', DateISO(dt, {quarter: 'StartOf'}))
// console.log('End Quarter', DateISO(dt, {quarter: 'EndOf'}))

// Array(12).fill(0).map((_item, idx) => console.log((idx%3)))

// console.log('2021-12-20T17:12:36.370Z', DateObject('2021-12-20T17:12:36.370Z'))
// console.log(dt, DateObject(dt), DateFormat('DisplayTime', dt))
// console.log(DeepEqual('2021-12-20T17:12:36.370Z', '2021-12-20 12:12:36.37-05'))

// console.log(RandomString(8))
// console.log(RandomKey(18))

// console.log(DateWeekNumber('2021-01-02'))
// console.log(DateWeekNumber('2021-01-09'))

// const isoLongDateString = '2021-01-01T00:00:00Z'


// console.log('2021-12-20T17:12:36.370Z', DateObject('2021-12-20T17:12:36.370Z'))
// console.log('2021-12-20 12:12:36.37-05', DateObject('2021-12-20 12:12:36.37-05'))
// console.log(DeepEqual('2021-12-20T17:12:36.370Z', '2021-12-20 12:12:36.37-05'))
// console.log('B', '2021-12-20T18:54:32.926Z', DateObject('2021-12-20T18:54:32.926Z'))
// console.log('TSs', (DateParseTS('2021-12-20 13:54:32.926-05') ?? 0) - (DateParseTS('2021-12-20T18:54:32.926Z') ?? 0))


// for (const sig of [...Array(25).keys()]) {
// 	const val = RightPad('', sig, '6')
// 	console.log('Short', val, ShortNumber(val, 1))
// }

// console.log(DateWeekNumber('2021-12-31'))
// console.log(DateWeekNumber('2021-01-01'))
// console.log(DateWeekNumber('2021-01-02'))
// console.log(DateWeekNumber('2021-01-03'))
// console.log(DateCompare('2021-01-02', 'IsSame', '2021-01-01T10:00:00Z', 'day'))

// console.log('Manual', '2021-11-11 10:15:33.188-05', DateISO(ManualParse('2021-11-11 10:15:33.188-05')), DateFormat('DisplayDateTime', ManualParse('2021-11-11 10:15:33.188-05')))

// console.log(NowISOString())

// console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
// console.log(DateFormat('2021-01-01T10:00:00-05:00', 'DisplayDateDoWTimeLong'))
// console.log(DateFormat('2021-01-01T10:00:00-05:00', 'DisplayDateDoWTimeLong', 'America/Los_Angeles'))
// console.log(DateFormat('2021-01-01 10:00:00', 'DisplayDateDoWTimeLong', 'America/Los_Angeles'))
// console.log('NY', DateFormat('DisplayDateDoWTimeLong', '2021-01-01 10:00:00', ), '10')
// console.log('NY', DateFormat('DisplayDateDoWTimeLong', '2021-01-01 10:00:00', 'America/New_York'), '10')
// console.log('LA', DateFormat('DisplayDateDoWTimeLong', '2021-01-01 10:00:00', 'America/Los_Angeles'), '1p')
// console.log('CA', DateFormat('DisplayDateDoWTimeLong', '2021-01-01 10:00:00', 'America/Chicago'), '11a')
// console.log('NY-LA', DateFormat('DisplayDateDoWTimeLong', '2021-01-01 10:00:00', 'America/New_York', 'America/Los_Angeles'), '1p')
// console.log('LA-NY', DateFormat('DisplayDateDoWTimeLong', '2021-01-01 10:00:00', 'America/Los_Angeles', 'America/New_York'), '7a')
// console.log('NY-CA', DateFormat('DisplayDateDoWTimeLong', '2021-01-01 10:00:00', 'America/New_York', 'America/Chicago'), '11a')
// console.log('LA-CA', DateFormat('DisplayDateDoWTimeLong', '2021-01-01 10:00:00', 'America/Los_Angeles', 'America/Chicago'), '8a')
// console.log('CA-NY', DateFormat('DisplayDateDoWTimeLong', '2021-01-01 09:00:00', 'America/Chicago', 'America/New_York'), '8a')
// console.log('CA-LA', DateFormat('DisplayDateDoWTimeLong', '2021-01-01 09:00:00', 'America/Chicago', 'America/Los_Angeles'), '11a')

// console.log(DateISO())
// console.log(DateFormat(undefined, 'DisplayDateDoWTime'))
// console.log(DateISO('2021-01-01'))
// console.log(DateFormat('2021-01-01', 'DisplayDateDoW'))
// console.log(DateFormat('2021-01-01', 'DisplayDateDoWTime'))


// for (const mnth of [...Array(28).keys()]) {
// 	console.log(mnth - 14, DateISO('2021-01-31T00:00:00Z', {month: mnth - 14})?.substr(5, 5))
// }
//
// console.log('---------')
//
// for (const mnth of [...Array(28).keys()]) {
// 	console.log(mnth - 14, DateISO('2021-01-26T00:00:00Z', {month: mnth - 14})?.substr(5, 5))
// }
//
// console.log('---------')
//
// for (const mnth of [...Array(28).keys()]) {
// 	console.log(mnth - 14, DateISO('2021-01-30T00:00:00Z', {month: mnth - 14})?.substr(5, 5))
// }

// const changes = {item_one: null, item_two: 2}
//
// console.log('Camel', ToCamelCase('Service Extensions'))
// console.log('Pascal', ToPascalCase('Service Extensions'))
//
// console.log(changes, RemoveDupProperties(changes, changes))
//
// console.log(HTMLToText('<p>john doe</p>'))

// console.log([
// 	{id: 1, name: 'AAA', prioritized: false},
// 	{id: 2, name: 'ZZZ', prioritized: false},
// 	{id: 3, name: 'CCC', prioritized: true},
// 	{id: 4, name: 'BBB', prioritized: false}
// ].sort((a, b) =>
// 	SortCompareNull(b.prioritized, a.prioritized) ??
// 	SortCompare(a.name, b.name)))
//
// const testObject = {
// 	name: 'The quick brown fox',
// 	amount: 1234.56,
// 	subObj: {item: 'One', desc: 'Two'},
// 	subArr: ['Bird', 'Cat', 'Dog'],
// 	subArrObjs: [{counter: 1, description: 'First'}, {counter: 2, description: 'Second'}]
// }
//
// console.log(ObjectContainsSearchTerms(testObject, ['Quick', 'One', 'bird', 'first']))
// console.log(ObjectContainsSearchTerms(testObject, ['klak', 'Quick', 'One', 'bird', 'first']))
//
// console.log([
// 	{id: 1, name: 'AAA'},
// 	{id: null, name: 'ZZZ'},
// 	{id: null, name: 'CCC'},
// 	{id: 4, name: 'BBB'}
// ].sort((a, b) => SortCompareNull(a.id, b.id, 'Top') ?? SortCompare(a.name, b.name)))
