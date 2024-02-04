import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {ProcessMath, TProcessMathOptionsResponse, TProcessMathResults, TVariables} from '../src/Evaluator'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

const variables: TVariables = {
	Zero: '0',
	One: '1',
	OneAndHalf: '1.5',
	Two: '2',
	Three: '3',
	Four: '4',
	Five: '5'
}

const initialProcessMathResults: TProcessMathResults = {
	calculation: null,
	missingVariables: [],
	variables: {},
	warnings: [],
	errors: []
}

const processMaths: [string, TProcessMathResults][] = [
	['[1 + 1]', {...initialProcessMathResults, calculation: 2}],
	['1 + 1', {...initialProcessMathResults, calculation: 2}],
	['[Two] * [Nine])', {...initialProcessMathResults, calculation: 18}],
	['[Two] * [Warn])', {...initialProcessMathResults, calculation: 18}],
	['[Two] * [Err])', {...initialProcessMathResults, calculation: 18}],
	['abs(-[Four] * [Six])', {...initialProcessMathResults, calculation: 24}],
	['abs(-[Four] * [Seven])', {...initialProcessMathResults, calculation: 28}],
	['abs(-[Four] * [Two])', {...initialProcessMathResults, calculation: 8}]
]

async function vars(variable: string): Promise<TProcessMathOptionsResponse> {
	return variable === 'Six'
		? 6
		: variable === 'Seven'
		? {
				value: 7,
				warning: 'Seven warning'
		  }
		: variable === 'Warn'
		? {warning: 'This is a warning'}
		: variable === 'Err'
		? {error: 'This is an error'}
		: null
}

for (const evalString of processMaths) {
	ProcessMath(evalString[0], variables, {
		requestVariable: vars
	}).then((results) => {
		console.log(evalString[0], results)
	})
}

console.timeEnd('Consoles')
