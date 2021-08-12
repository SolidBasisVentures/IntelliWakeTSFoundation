import {DayjsCurrentTimeZone, DayjsCurrentTimeZoneOlson, DayjsDisplayDayDateTime, DayjsTimeString} from '../src/Dayjs'

require('source-map-support').install()

// process.env.TZ = 'UTC'
process.env.TZ = 'Europe/Amsterdam'

console.log('Test', DayjsCurrentTimeZone())
console.log('Test', DayjsCurrentTimeZoneOlson())
console.log('2021-01-01 02:15:29.078+00', DayjsDisplayDayDateTime('2021-01-01 02:15:29.078+00'))
