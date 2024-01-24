import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {ArrayParallelProcess} from '../src/Functions'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

ArrayParallelProcess(
	Array.from({length: 100000}, (_, i) => i + 1).map((a) => ({id: a, name: `Name: ${a}`})),
	async (chunk: {id: number; name: string}) => {
		console.log(chunk.id)
	}
).then(() => {
	console.timeEnd('Consoles')
})
