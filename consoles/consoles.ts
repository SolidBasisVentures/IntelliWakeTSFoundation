import {ESTTodayDateTimeLabel, IANAZoneAbbr} from '../src/DateManager'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(IANAZoneAbbr('2022-06-01'))
console.log(IANAZoneAbbr('2022-06-01', 'America/Denver'))

console.timeEnd('Consoles')
