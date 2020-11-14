import {EDateAndOrTime, MomentDurationShortText, MomentDurationShortTextAligned, MomentFromString} from '../src/Moment'

require('source-map-support').install()

console.log(MomentDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20'))
console.log(MomentDurationShortTextAligned('2020-01-01 13:00:00', '2020-01-03 14:30:20'))
