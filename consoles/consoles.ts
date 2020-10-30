import moment from 'moment'
import {MomentDisplayDayDateTime} from '../src/Functions'
import {runMoment} from './consolesMoment'

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

