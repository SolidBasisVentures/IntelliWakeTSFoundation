// const moment = require('moment-timezone')

import {RemoveDupProperties} from '../src/DataConstructs'
import {ToCamelCase, ToPascalCase} from '../src/StringManipulation'

require('source-map-support').install()

const changes = {item_one: null, item_two: 2}

console.log('Camel', ToCamelCase('Service Extensions'))
console.log('Pascal', ToPascalCase('Service Extensions'))

console.log(changes, RemoveDupProperties(changes, changes))

// console.log(MomentID())
//
// interface IEmployee {
// 	id: number,
// 	name: string,
// 	is_active: boolean
// }
//
// let employee: IEmployee = {
// 	id: 1,
// 	name: 'Bob',
// 	is_active: true
// }
//
// let changes: IChanges<IEmployee> = {}
//
// changes.name = 'Sally'
//
// console.log(employee.name)
//
// let employeeChanged = ObjectWithChanges(employee, changes)
//
// console.log(employeeChanged.name)
//
// console.log('IANA NY', IANAZoneAbbr('America/New_York'))
//
// console.log('IANA Ind', IANAZoneAbbr('America/Indiana/Indianapolis'))
//
// console.log('test_table_identifier_id', ToUpperCaseWords('test_table_identifier_id'))

// const rand = RandomString(128)
//
// console.log(rand.length)
// console.log(rand)

// console.log('--- Wednesday')
// for (let i = 0; i < 7; i++) {
// 	console.log('WeekDays', i, MomentDisplayDayDateDoW(MomentAddWeekDays(i)))
// }
// for (let i = 0; i < 7; i++) {
// 	console.log('WeekDays', i, MomentDisplayDayDateDoW(MomentAddWeekDays(i)), MomentWeekDays(null, MomentAddWeekDays(i)))
// }
//
// console.log('--- Saturday')
// for (let i = 0; i < 7; i++) {
// 	console.log('WeekDays', i, MomentDisplayDayDateDoW(MomentAddWeekDays(i, '2021-03-20')))
// }
// for (let i = 0; i < 7; i++) {
// 	console.log('WeekDays', i, MomentDisplayDayDateDoW(MomentAddWeekDays(i, '2021-03-20')), MomentWeekDays('2021-03-20', MomentAddWeekDays(i, '2021-03-20')))
// }

// let times = ['2020-12-31 21:15:29.078-05', '2021-01-01 02:15:29.078+00']
//
// console.log(MomentCurrentTimeZone())
//
// times.forEach(time => {
// 	console.log('-------- ', time)
// 	console.log(MomentFromString(time))
// 	console.log(MomentDisplayDayDateTime(time))
// })
//
// console.log(RandomString(12))
