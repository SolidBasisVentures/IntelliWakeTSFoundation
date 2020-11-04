import {EDateAndOrTime, MomentFromString} from '../src/Moment'

require('source-map-support').install()

console.log(MomentFromString('2020-10-10', EDateAndOrTime.TIME))
