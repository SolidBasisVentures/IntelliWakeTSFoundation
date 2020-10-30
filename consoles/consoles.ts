import moment from 'moment'
import {runMoment} from './consolesMoment'
import {MomentDisplayDayDateTime} from '../src/Moment'

require('source-map-support').install()

const startMoment = moment()

console.log('Started', MomentDisplayDayDateTime(startMoment))

runMoment()

console.log(
	MomentDisplayDayDateTime(startMoment),
	'to',
	MomentDisplayDayDateTime(moment()),
	' = ',
	moment.duration(startMoment.diff(moment())).humanize()
)

