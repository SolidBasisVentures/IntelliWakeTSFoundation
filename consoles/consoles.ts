import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {SubsetFormEqual} from '../src/DeepEqual'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(SubsetFormEqual({
	"id": "5",
	"name": "Nate Christensen",
	"email": "natechris13@outlook.com",
	"smsphone": "",
	"title": "",
	"is_active": "false",
	"features": []
}, {
	"id": 5,
	"name": "Nate Christensen",
	"email": "natechris13@outlook.com",
	"smsphone": "",
	"is_active": false,
	"features": [],
	"updated_ts": "2023-01-07 21:27:27.856-05",
	"title": ""
}))

console.timeEnd('Consoles')
