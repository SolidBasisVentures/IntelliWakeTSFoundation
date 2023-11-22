import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {ObjectToFixedFields} from '../src/StringManipulation'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(
	'ObjToFix',
	ObjectToFixedFields({id: 1, name: 'Test', description: 'Test One'}, [
		{property: 'id', length: 3, rightJustify: true, padCharacter: '0'},
		{property: 'name', length: 10},
		{property: 'description', length: 10}
	])
)

console.timeEnd('Consoles')
