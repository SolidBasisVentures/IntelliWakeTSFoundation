import {DateOnly, ESTTodayDateTimeLabel} from '../src/DateManager'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(DateOnly('01/01/2000', {years: 1, quarters: 2, weeks: 2, days: 2, week: 'EndOf', formatLocale: true}))

console.timeEnd('Consoles')
