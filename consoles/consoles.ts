import {ESTTodayDateTimeLabel, TimeOnly} from '../src/DateManager'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

// const dates = ['1960-01-01', '1970-01-01', 'blah', 'Not a date']
//
// dates.forEach((date) => console.log(date, '=', DateOnlyNull(date)))

console.log(
	'Time',
	TimeOnly('2022-02-01T15:18:37.633-05:00', {formatLocale: true, timezoneSource: 'America/Los_Angeles'})
)

console.timeEnd('Consoles')
