import {ESTTodayDateTimeLabel, IANADescription, IANAZoneAbbr, TimeZoneOlsonsAmericaCommon} from '../src/DateManager'
import {SortCompares} from '../src/SortSearch'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(TimeZoneOlsonsAmericaCommon().map(olson => `${olson} : ${IANADescription(olson, {removePrefix: true})}`))

console.timeEnd('Consoles')
