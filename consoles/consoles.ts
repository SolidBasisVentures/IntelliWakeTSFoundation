import {
	DateFormat,
	DateFormatAny,
	DateObject,
	DateOnly,
	DateOnlyNull,
	ESTTodayDateTimeLabel,
	TimeOnly
} from '../src/DateManager'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

process.env.TZ = 'UTC'

console.log(DateObject(`${DateOnly('now')} 12:00:00`))
console.log(DateObject(`${DateOnly('now')} 12:00:00`, {timezoneSource: 'America/New_York'}))
console.log(DateObject(`${DateOnly('now')} 12:00:00 America/New_York`))

console.timeEnd('Consoles')
