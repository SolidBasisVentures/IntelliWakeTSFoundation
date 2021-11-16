import {DateFormat} from '../src/DateManager'

require('source-map-support').install()

// console.log(NowISOString())
// console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
// console.log(DateFormat('2021-01-01T10:00:00-05:00', 'DisplayDateDoWTimeLong'))
// console.log(DateFormat('2021-01-01T10:00:00-05:00', 'DisplayDateDoWTimeLong', 'America/Los_Angeles'))
// console.log(DateFormat('2021-01-01 10:00:00', 'DisplayDateDoWTimeLong', 'America/Los_Angeles'))
console.log('NY', DateFormat('2021-01-01 10:00:00', 'DisplayDateDoWTimeLong'), '10')
console.log('NY', DateFormat('2021-01-01 10:00:00', 'DisplayDateDoWTimeLong', 'America/New_York'), '10')
console.log('LA', DateFormat('2021-01-01 10:00:00', 'DisplayDateDoWTimeLong', 'America/Los_Angeles'), '1p')
console.log('CA', DateFormat('2021-01-01 10:00:00', 'DisplayDateDoWTimeLong', 'America/Chicago'), '11a')
console.log('NY-LA', DateFormat('2021-01-01 10:00:00', 'DisplayDateDoWTimeLong', 'America/New_York', 'America/Los_Angeles'), '1p')
console.log('LA-NY', DateFormat('2021-01-01 10:00:00', 'DisplayDateDoWTimeLong', 'America/Los_Angeles', 'America/New_York'), '7a')
console.log('NY-CA', DateFormat('2021-01-01 10:00:00', 'DisplayDateDoWTimeLong', 'America/New_York', 'America/Chicago'), '11a')
console.log('LA-CA', DateFormat('2021-01-01 10:00:00', 'DisplayDateDoWTimeLong', 'America/Los_Angeles', 'America/Chicago'), '8a')
console.log('CA-NY', DateFormat('2021-01-01 09:00:00', 'DisplayDateDoWTimeLong', 'America/Chicago', 'America/New_York'), '8a')
console.log('CA-LA', DateFormat('2021-01-01 09:00:00', 'DisplayDateDoWTimeLong', 'America/Chicago', 'America/Los_Angeles'), '11a')

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
