import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {SubsetEqual} from '../src/DeepEqual'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

const item = {
	val1: true,
	val2: 1,
	val3: 'One',
	val4: {
		valA: 1,
		valB: 'Two'
	},
	val5: [
		'One',
		'Two'
	],
	val6: [
		{item1: 1, item2: 'One'},
		{item1: 2, item2: 'Two'}
	]
}

console.log(SubsetEqual(item, {...item, val1: 'true'}))

console.timeEnd('Consoles')
