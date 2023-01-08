import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {SubsetFormEqual} from '../src/DeepEqual'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(SubsetFormEqual({
	'id': '5',
	'name': 'Nate Christensen',
	'email': 'natechris13@outlook.com',
	'smsphone': '',
	'title': '',
	'is_active': 'true',
	'features': []
}, {
	'id': 5,
	'name': 'Nate Christensen',
	'email': 'natechris13@outlook.com',
	'smsphone': '',
	'is_active': true,
	'features': [],
	'updated_ts': '2022-11-08 12:23:06.389-05',
	'title': null
}))

console.timeEnd('Consoles')
