import {ESTTodayDateTimeLabel, IANAOffset, YYYY_MM_DD_HH_mm_ss} from '../src/DateManager'

require('source-map-support').install()

console.info('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log('IA', IANAOffset('America/Chicago'))
console.log('IA NY', IANAOffset('America/New_York'))
console.log('DT', YYYY_MM_DD_HH_mm_ss('now', {timezoneSource: 'America/Chicago'}))
console.log('DT NY', YYYY_MM_DD_HH_mm_ss('now', {timezoneSource: 'America/New_York'}))

console.timeEnd('Consoles')
