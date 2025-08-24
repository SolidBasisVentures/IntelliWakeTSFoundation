import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {RoundTo} from '../src/Functions'

require('source-map-support').install()

console.info('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

const val = 1.49999
const decimals = 1
const dir = 'round'
console.info('RoundTo Result', val, decimals, dir,
	RoundTo(val, decimals, dir, true))

console.timeEnd('Consoles')
