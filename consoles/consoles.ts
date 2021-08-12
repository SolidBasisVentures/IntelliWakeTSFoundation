// const moment = require('moment-timezone')

import {MomentCurrentTimeZone, MomentCurrentTimeZoneOlson, MomentDisplayDayDateTime} from '../src/Moment'

require('source-map-support').install()

// const changes = {item_one: null, item_two: 2}
//
// console.log('Camel', ToCamelCase('Service Extensions'))
// console.log('Pascal', ToPascalCase('Service Extensions'))
//
// console.log(changes, RemoveDupProperties(changes, changes))
//
// console.log(HTMLToText('<p>john doe</p>'))

console.log('Test', MomentCurrentTimeZone())
console.log('Test', MomentCurrentTimeZoneOlson())
console.log('2021-01-01 02:15:29.078+00', MomentDisplayDayDateTime('2021-01-01 02:15:29.078+00'))


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
//
//
// // console.log(MomentID())
// //
// // interface IEmployee {
// // 	id: number,
// // 	name: string,
// // 	is_active: boolean
// // }
// //
// // let employee: IEmployee = {
// // 	id: 1,
// // 	name: 'Bob',
// // 	is_active: true
// // }
// //
// // let changes: IChanges<IEmployee> = {}
// //
// // changes.name = 'Sally'
// //
// // console.log(employee.name)
// //
// // let employeeChanged = ObjectWithChanges(employee, changes)
// //
// // console.log(employeeChanged.name)
// //
// // console.log('IANA NY', IANAZoneAbbr('America/New_York'))
// //
// // console.log('IANA Ind', IANAZoneAbbr('America/Indiana/Indianapolis'))
// //
// // console.log('test_table_identifier_id', ToUpperCaseWords('test_table_identifier_id'))
//
// // const rand = RandomString(128)
// //
// // console.log(rand.length)
// // console.log(rand)
//
// // console.log('--- Wednesday')
// // for (let i = 0; i < 7; i++) {
// // 	console.log('WeekDays', i, MomentDisplayDayDateDoW(MomentAddWeekDays(i)))
// // }
// // for (let i = 0; i < 7; i++) {
// // 	console.log('WeekDays', i, MomentDisplayDayDateDoW(MomentAddWeekDays(i)), MomentWeekDays(null, MomentAddWeekDays(i)))
// // }
// //
// // console.log('--- Saturday')
// // for (let i = 0; i < 7; i++) {
// // 	console.log('WeekDays', i, MomentDisplayDayDateDoW(MomentAddWeekDays(i, '2021-03-20')))
// // }
// // for (let i = 0; i < 7; i++) {
// // 	console.log('WeekDays', i, MomentDisplayDayDateDoW(MomentAddWeekDays(i, '2021-03-20')), MomentWeekDays('2021-03-20', MomentAddWeekDays(i, '2021-03-20')))
// // }
//
// // let times = ['2020-12-31 21:15:29.078-05', '2021-01-01 02:15:29.078+00']
// //
// // console.log(MomentCurrentTimeZone())
// //
// // times.forEach(time => {
// // 	console.log('-------- ', time)
// // 	console.log(MomentFromString(time))
// // 	console.log(MomentDisplayDayDateTime(time))
// // })
// //
// // console.log(RandomString(12))
//
// console.log(RemoveDupPropertiesByIDArray({
// 	1: {
// 		name: 'john doe',
// 		age: 24
// 	}
// }, [
// 	{id: 1, user: 'john smith', age: 24},
// 	{id: 2, user: 'sally jones', age: 32}
// ]))
