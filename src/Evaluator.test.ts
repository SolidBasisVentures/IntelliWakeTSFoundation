import {
	EvaluateCondition,
	EvaluateString,
	ProcessMath,
	StringGetSets,
	TProcessMathOptionsResponse,
	TProcessMathResults,
	TVariables
} from './Evaluator'
import {test, expect} from 'vitest'

const variables: TVariables = {
	Zero: '0',
	One: '1',
	OneAndHalf: '1.5',
	Two: '2',
	Three: '3',
	Four: '4',
	Five: '5',
	Name: 'Bob',
	Occupation: 'Journeyman',
	AmIHappy: 'Yes',
	AmISad: 'No',
	IAmTrue: 'True',
	IAmFalse: 'False',
	ArrayValue: 'Bob, Johnathan'
}

const evalStrings: [string, any][] = [
	['I am [Name].', 'I am Bob.'],
	['[Name] is a [Occupation]', 'Bob is a Journeyman'],
	['([Five] + 3) / [Four] = [([Five] + 3) / [Four]]', '(5 + 3) / 4 = 2'],
	['[OneAndHalf] * -1 = [[OneAndHalf] * -1]', '1.5 * -1 = -1.5'],
	['abs(-[Four] * [Two])', '8'],
	['[([Five] + 3) / [Four]]', '2'],
	['[[OneAndHalf] * -1]', '-1.5'],
	['[1 + 1]', '2'],
	['abs(-[Four] * [Two])', '8']
]

for (const evalString of evalStrings) {
	test(`EvalString ${evalString[0]}`, () => {
		expect(EvaluateString(evalString[0], variables)).toBe(evalString[1])
	})
}

const evalConditions: [string, any][] = [
	['[Name] = Bob', true],
	['[Name] != Bob', false],
	['[Name] = bob', false],
	['[Name] != bob', true],
	['([Five] + 3) / [Four]', true],
	['[OneAndHalf] * -1', false],
	['abs(-[Four] * [Two])', true],
	['[Five] >= [Five]', true],
	['[Five] > [Four]', true],
	['[Five] < [Four]', false],
	['[Five] = [Five]', true],
	['[Five] = [Four]', false],
	['includes(John, [ArrayValue])', true],
	['includes(Sam, [ArrayValue])', false],
	['includesInArray(John, [ArrayValue])', false],
	['includesInArray(Johnathan, [ArrayValue])', true]
]

for (const evalCondition of evalConditions) {
	test(`EvalCondition ${evalCondition[0]}`, () => {
		expect(EvaluateCondition(evalCondition[0], variables)).toBe(evalCondition[1])
	})
}

test('StringGetSets', () => {
	expect(StringGetSets('Test[1]-[2][3]-[4[1]][[1]5]', '[', ']')).toEqual(['1', '2', '3', '4[1]', '[1]5'])
})

const initialProcessMathResults: TProcessMathResults = {
	calculation: null,
	missingVariables: [],
	variables: {},
	warnings: [],
	errors: []
}

const processMaths: [string, TProcessMathResults, TVariables?][] = [
	['[1 + 1]', {...initialProcessMathResults, calculation: 2, missingVariables: ['1 + 1']}],
	['1 + 1', {...initialProcessMathResults, calculation: 2}],
	['[Two] * [Nine])', {...initialProcessMathResults, calculation: null, missingVariables: ['Nine']}],
	[
		'[Two] * [Warn])',
		{
			...initialProcessMathResults,
			calculation: null,
			missingVariables: ['Warn'],
			warnings: ['This is a warning']
		}
	],
	[
		'[Two] * [Err])',
		{
			...initialProcessMathResults,
			calculation: null,
			missingVariables: ['Err'],
			errors: ['This is an error']
		}
	],
	['abs(-[Four] * [Six])', {...initialProcessMathResults, calculation: 24}, {Six: 6}],
	[
		'abs(-[Four] * [Seven])',
		{
			...initialProcessMathResults,
			calculation: 28,
			warnings: ['Seven warning']
		},
		{Seven: 7}
	],
	['-[Four] * [Two]', {...initialProcessMathResults, calculation: -8}],
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
	test(`Process ${evalString[0]}`, async () => {
		const results = await ProcessMath(evalString[0], variables, {
			requestVariable: vars
		})
		expect(results).toEqual({...evalString[1], variables: {...variables, ...evalString[2]}})
	})
}
