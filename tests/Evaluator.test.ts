import {EvaluateCondition, EvaluateString, TVariables} from '../src/Evaluator'

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
