import {DateOnlyNull, ESTTodayDateTimeLabel} from '../src/DateManager'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(DateOnlyNull('2023-04-05'))
console.log(DateOnlyNull('20230405', {fromFormat: 'YYYYMMDD'}))
console.log(DateOnlyNull('04052023', {fromFormat: 'MMDDYYYY'}))
console.log(DateOnlyNull('230405', {fromFormat: 'YYMMDD'}))

console.timeEnd('Consoles')
