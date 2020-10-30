import {consoleLogTable} from '../src/ConsoleLogTable'

export const runMoment = () => {
	let results: [string, any, any][] = [
		['TZ', 'UTC', 'America/New_York'],
		['First', 1, 'One'],
		['Second', 2, 'Two']
	]
	
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
