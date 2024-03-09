import {ESTTodayDateTimeLabel, IANAZoneAbbr, TimeZoneOlsonsAmericaCommon} from '../src/DateManager'
import {SortCompares} from '../src/SortSearch'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(TimeZoneOlsonsAmericaCommon().map(olson => `${olson} : ${IANAZoneAbbr('2020-01-01', olson)}`))

console.timeEnd('Consoles')
