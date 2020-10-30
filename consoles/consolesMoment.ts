import moment from 'moment'
import 'moment-timezone/index'
import {consoleLogTable} from '../src/ConsoleLogTable'
import {
	MOMENT_FORMAT_DATE,
	MOMENT_FORMAT_DATE_TIME,
	MomentDisplayDayDate,
	MomentDisplayDayDateTime
} from '../src/Functions'

export const runMoment = () => {
	const timeZones = ['UTC', 'America/New_York']
	
	const tests = [
		'2020-10-01',
		'2020-10-01 01:00:00'
	]
	
	const fxs: {name: string, function: ((value: string) => any)}[] = [
		{name: 'Moment', function: (value) => moment(value)},
		{name: 'MFD', function: (value) => moment(value).format(MOMENT_FORMAT_DATE)},
		{name: 'MFDT', function: (value) => moment(value).format(MOMENT_FORMAT_DATE_TIME)},
		{name: 'DD', function: (value) => MomentDisplayDayDate(value)},
		{name: 'DDNUTC', function: (value) => MomentDisplayDayDate(value, false)},
		{name: 'DDT', function: (value) => MomentDisplayDayDateTime(value)},
		{name: 'DDTNUTC', function: (value) => MomentDisplayDayDateTime(value, false)},
		{name: 'MDD', function: (value) => MomentDisplayDayDate(moment(value))},
		{name: 'MDDNUTC', function: (value) => MomentDisplayDayDate(moment(value), false)},
		{name: 'MDDT', function: (value) => MomentDisplayDayDateTime(moment(value))},
		{name: 'MDDTNUTC', function: (value) => MomentDisplayDayDateTime(moment(value), false)}
	]
	
	let results: any[][] = [
		['Test', ...timeZones]
	]
	
	for (const test of tests) {
		results.push([test])
		for (const fx of fxs) {
			
			let result: any[] = [fx.name]
			
			for (const timeZone of timeZones) {
				moment.tz.setDefault(timeZone)
				result.push(fx.function(test))
			}
			
			results.push(result)
		}
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
