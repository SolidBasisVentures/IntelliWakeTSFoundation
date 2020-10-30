import moment from 'moment'
import 'moment-timezone/index'
import {consoleLogTable} from '../src/ConsoleLogTable'
import {
	MOMENT_FORMAT_DATE,
	MOMENT_FORMAT_DATE_TIME,
	MomentDateString,
	MomentDateTimeString,
	MomentDisplayDayDate,
	MomentDisplayDayDateTime, MomentDisplayTime, MomentTimeString
} from '../src/Moment'

export const runMoment = () => {
	const timeZones = ['UTC', 'America/New_York']
	
	const tests = [
		'2020-10-01',
		'2020-10-01T01:00:00Z'
	]
	
	const fxs: {name: string, function: ((value: string) => any)}[] = [
		{name: 'moment', function: (value) => moment(value)},
		{name: 'MomentDateString', function: (value) => MomentDateString(value)},
		{name: 'MomentDateString moment', function: (value) => MomentDateString(moment(value))},
		// {name: 'MomentTimeString', function: (value) => MomentTimeString(value)},
		// {name: 'MomentDateTimeString', function: (value) => MomentDateTimeString(value)},
		// {name: 'MomentDisplayDayDate', function: (value) => MomentDisplayDayDate(value)},
		// {name: 'MomentDisplayTime', function: (value) => MomentDisplayTime(value)},
		// {name: 'MomentDisplayDayDateTime', function: (value) => MomentDisplayDayDateTime(value)},
		// {name: 'MomentDateTimeString moment', function: (value) => MomentDateTimeString(moment(value))},
		// {name: 'MomentDisplayDayDate moment', function: (value) => MomentDisplayDayDate(moment(value))},
		// {name: 'MomentDisplayTime moment', function: (value) => MomentDisplayTime(moment(value))},
		// {name: 'MomentDisplayDayDateTime moment', function: (value) => MomentDisplayDayDateTime(moment(value))}
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
	
	//Servers run on UTC
	// moment.tz.setDefault("UTC")
	//
	// console.log(new Date())
	// console.log(moment().tz('America/New_York'))
	// console.log(moment.utc())
	//
	// //Simulate browser EST
	// moment.tz.setDefault("America/New_York")
	//
	// console.log(new Date())
	// console.log(moment())
	// console.log(moment.utc())
}
