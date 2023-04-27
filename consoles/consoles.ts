import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {TimeTracker} from '../src/TimeTracker'
import {Sleep} from '../src/Functions'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

const timeTracker = new TimeTracker({offendingMS: 350, warnAutomatically: false})

Sleep(300)
	.then(() => timeTracker.mark('First Event'))
	.then(() => Sleep(400))
	.then(() => timeTracker.mark('Second Event'))
	.then(() => Sleep(600))
	.then(() => timeTracker.mark('Third Event'))
	.then(() =>
		timeTracker.markResolved(
			'Sleep Two-Fifty',
			Sleep(250).then(() => 'Sleep 250')
		)
	)
	.then((res) => console.log('Resolved', res))
	.then(() =>
		timeTracker.markResolved(
			'Sleep Four Hundred',
			Sleep(400).then(() => 'Sleep 400')
		)
	)
	.then((res) => console.log('Resolved', res))
	.then(() =>
		timeTracker.durationOffends({label: 'Test Event', offendingMS: 1000, warnAutomatically: true, showAll: true})
	)
	.then(() => console.timeEnd('Consoles'))
