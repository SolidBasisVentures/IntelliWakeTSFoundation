import {DateOnly, ESTTodayDateTimeLabel} from '../src/DateManager'

require('source-map-support').install()

console.info('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

const loop = 10000

console.time('New Date')
for (const i of Array(loop)) {
	new Date().valueOf()
}
console.timeEnd('New Date')

console.time('DateOnly Now')
for (const i of Array(loop)) {
	DateOnly('now')
}
console.timeEnd('DateOnly Now')

console.time('DateOnly Date')
for (const i of Array(loop)) {
	DateOnly('2025-01-01')
}
console.timeEnd('DateOnly Date')

console.timeEnd('Consoles')
