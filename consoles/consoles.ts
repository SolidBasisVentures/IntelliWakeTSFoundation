import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {ToArray, ValidNumbers} from '../src/Functions'
import {SubsetEqual} from '../src/DeepEqual'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(SubsetEqual({
	"id": "7",
	"description": "Audit Support"
}, {
	"id": 7,
	"description": "Audit Support"
}))

console.timeEnd('Consoles')
