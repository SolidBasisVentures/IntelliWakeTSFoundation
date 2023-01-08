import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {SubsetEqual, SubsetFormEqual} from '../src/DeepEqual'

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
	],
	valBlank: ''
}

console.log(SubsetFormEqual(item, {...item, valBlank: null}))

console.timeEnd('Consoles')
