import moment from 'moment-timezone'
import {consoleLogTable} from '../src/ConsoleLogTable'
import {
	MomentDateString,
	MomentDateTimeString,
	MomentDisplayDayDate,
	MomentDisplayDayDateTime, MomentDisplayTime,
	MomentTimeString
} from '../src/Moment'

export const runMoment = () => {
	const timeZones = ['UTC', 'America/New_York']
	
	const tests = [
		'2020-10-01',
		'2020-10-01T01:00:00Z',
		'2020-10-01 01:00:00',
		'2019-10-01T01:00:00Z',
		'2019-10-01 01:00:00',
		moment()
	]
	
	const fxs: {name: string, function: ((value: any) => any)}[] = [
		{name: 'moment', function: (value) => moment(value)},
		{name: 'MomentDateTimeString', function: (value) => MomentDateTimeString(value)},
		{name: 'MomentDateString', function: (value) => MomentDateString(value)},
		{name: 'MomentTimeString', function: (value) => MomentTimeString(value)},
		{name: 'MomentDisplayDayDateTime', function: (value) => MomentDisplayDayDateTime(value)},
		{name: 'MomentDisplayDayDate', function: (value) => MomentDisplayDayDate(value)},
		{name: 'MomentDisplayTime', function: (value) => MomentDisplayTime(value)}
	]
	
	let results: any[][] = [
		['Test Function', ...timeZones]
	]
	
	let firstLine = true
	
	for (const test of tests) {
		if (!firstLine) results.push([' '])
		results.push([`  ${test}`])
		for (const fx of fxs) {
			
			let result: any[] = [fx.name]
			
			for (const timeZone of timeZones) {
				moment.tz.setDefault(timeZone)
				result.push(fx.function(test))
			}
			
			results.push(result)
		}
		
		firstLine = false
	}
	
	consoleLogTable(results)
}
