// const moment = require('moment-timezone')

import {IANAZoneAbbr, MomentID} from '../src/Moment'
import {IChanges, ObjectWithChanges} from '../src/DataConstructs'
import {CleanNumber, ToUpperCaseWords} from '../src/StringManipulation'

require('source-map-support').install()

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


