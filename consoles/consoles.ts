// const moment = require('moment-timezone')

import {MomentID} from '../src/Moment'
import {IChanges, ObjectWithChanges} from '../src/DataConstructs'

require('source-map-support').install()

console.log(MomentID())

interface IEmployee {
	id: number,
	name: string,
	is_active: boolean
}

let employee: IEmployee = {
	id: 1,
	name: 'Bob',
	is_active: true
}

let changes: IChanges<IEmployee> = {}

changes.name = 'Sally'

console.log(employee.name)

let employeeChanged = ObjectWithChanges(employee, changes)

console.log(employeeChanged.name)
