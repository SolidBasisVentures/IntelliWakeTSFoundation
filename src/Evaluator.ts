/**
 * Created by dennispeters on 6/7/17.
 *
 * This evaluator takes a proprietary string and performs calculations on it.
 *
 * EvaluateString(expression, variables) accepts a string, and processes variables against it.  Everything within square brackets [] will run through a calculation.
 *
 * EvaluateCondition(express, variables) accepts a string, processes variables against the entire string, and returns a boolean if the condition is true or false.
 *
 * Simple examples:
 *
 * EvaluateString("Hello, [Name]!", {Name: "Bob"}) = "Hello, Bob!"
 * EvaluateString("1 + SomeValue = [1 + [SomeValue]]", {SomeValue: 2}) = "1 + SomeValue = 3"
 * EvaluateCondition("1 = SomeValue", {SomeValue: 2}) = false
 * EvaluateCondition("2 = SomeValue", {SomeValue: 2}) = true
 *
 */
import {CleanNumber, CleanNumberNull, IsOn, ReplaceAll} from './Functions'
import {isNullUndefined} from './SortSearch'

const EvaluatorOperators = ['&&', '||', '!=', '<>', '>=', '<=', '=', '<', '>', '-', '+', '/', '*', '^']
const EvaluatorFunctions = ['abs', 'pow', 'int', 'round', 'includes', 'includesinarray']

export type TVariables = {[key: string]: any}

export type TProcessMathResults = {
	calculation: number | null
	missingVariables: string[]
	variables?: TVariables
	warnings: string[]
	errors: string[]
}

export type TProcessMathOptionsResponse =
		null | number | {
				value?: number | null
				warning?: string
				error?: string
		  }

export type TProcessMathOptions = {
	requestVariable?: (variable: string) => Promise<TProcessMathOptionsResponse>
}

export async function ProcessMath(
	expression: string,
	variables?: TVariables,
	options?: TProcessMathOptions
): Promise<TProcessMathResults> {
	let checkPattern = /\[(.*?)\]/g
	let missingVariables: string[] = []
	let match

	const useVariables = {...(variables ?? {})}
	const warnings: string[] = []
	const errors: string[] = []

	while ((match = checkPattern.exec(expression)) !== null) {
		if (useVariables[match[1]] === undefined) {
			if (options?.requestVariable) {
				const variableValue = await options.requestVariable(match[1])
				if (typeof variableValue === 'number' || typeof variableValue === 'string') {
					useVariables[match[1]] = CleanNumber(variableValue, 5)
				} else if (typeof variableValue === 'object') {
					if (!isNullUndefined(variableValue?.value)) {
						useVariables[match[1]] = CleanNumber(variableValue?.value, 5)
					} else {
						missingVariables.push(match[1])
					}
					if (variableValue?.warning) {
						warnings.push(variableValue.warning)
					}
					if (variableValue?.error) {
						errors.push(variableValue.error)
					}
				} else {
					missingVariables.push(match[1])
				}
			} else {
				missingVariables.push(match[1])
			}
		}
	}

	return {
		calculation: EvaluateMath(expression, useVariables),
		missingVariables,
		variables: useVariables,
		warnings,
		errors
	}
}

/**
 * Evaluates a mathematical expression and returns the result.
 * Variables enclosed in square braces are replaced by the appropriate variables.
 *
 * @param {string} expression - The expression to be evaluated.
 * @param {TVariables} [variables] - Variables to be used in the expression.
 * @returns {number | null} - The result of the evaluation, or null if the expression is invalid.
 */
export function EvaluateMath(expression: string, variables?: TVariables): number | null {
	return CleanNumberNull(EvaluateString(`[${expression}]`, variables))
}

/**
 * Accepts a string, and processes variables against it. Everything within square brackets [] will run through a calculation.
 *
 * @example
 * // returns "Hello, Bob"
 * EvaluateString("Hello, [Name]!", {Name: "Bob"})
 *
 * // returns "1 + SomeValue = 3"
 * EvaluateString("1 + SomeValue = [1 + [SomeValue]]", {SomeValue: 2})
 */
export const EvaluateString = (expression: string, variables?: TVariables): string => {
	let returnValue = expression

	if (!!variables) {
		for (const key of Object.keys(variables)) {
			returnValue = ReplaceAll(`[${key}]`, variables[key], returnValue)
		}
	}

	let innerSet = FindInnerSetLocations(returnValue, '[', ']')
	while (!!innerSet) {
		let beforeValue = returnValue.substring(0, innerSet[0]) ?? ''
		let replaceValue = ProcessPMDAS(returnValue.substring(innerSet[0] + 1, innerSet[1])) ?? ''
		let afterValue = returnValue.substring(innerSet[1] + 1) ?? ''

		returnValue = `${beforeValue}${replaceValue}${afterValue}`

		innerSet = FindInnerSetLocations(returnValue, '[', ']')
	}

	returnValue = ExecuteFunctions(returnValue)

	return returnValue
}

/**
 * Accepts a string, processes variables against the entire string, and returns a boolean if the condition is true or false.
 *
 * @example
 *
 * // returns false
 * EvaluateCondition("1 = SomeValue", {SomeValue: 2})
 *
 * // returns true
 * EvaluateCondition("2 = SomeValue", {SomeValue: 2}) = true
 */
export const EvaluateCondition = (expression: string, variables?: TVariables): boolean => {
	return IsOn(EvaluateString(`[${expression}]`, variables))
}

const FindInnerSetLocations = (
	stringItem: string | null,
	setStart: string,
	setEnd: string
): [number, number] | null => {
	if (!!stringItem) {
		const len = stringItem.length
		let openingLocation = null as number | null

		for (let i = 0; i < len; i++) {
			if (stringItem.substring(i, i + 1) === setStart) {
				openingLocation = i
			} else if (openingLocation !== null && stringItem.substring(i, i + 1) === setEnd) {
				return [openingLocation, i]
			}
		}
	}

	return null
}

const FindOuterSetLocation = (stringItem: string | null, setStart: string, setEnd: string): [number, number] | null => {
	if (!!stringItem) {
		const firstSetIDX = stringItem.indexOf(setStart)
		if (firstSetIDX >= 0) {
			let internalSetCount = 0
			for (let i = firstSetIDX + 1; i < stringItem.length; i++) {
				if (stringItem.charAt(i) === setStart) {
					internalSetCount++
				} else if (stringItem.charAt(i) === setEnd) {
					if (internalSetCount) {
						internalSetCount--
					} else {
						return [firstSetIDX, i]
					}
				}
			}
		}
	}

	return null
}

export function StringGetSets(stringItem: string | null, setStart: string, setEnd: string): string[] {
	if (!stringItem) return []

	let evaluateString = stringItem
	const returnStrings: string[] = []

	let inners = FindOuterSetLocation(evaluateString, setStart, setEnd)

	while (inners) {
		returnStrings.push(evaluateString.substring(inners[0] + 1, inners[1]))

		evaluateString = evaluateString.substring(inners[1] + 1)

		inners = FindOuterSetLocation(evaluateString, setStart, setEnd)
	}

	return returnStrings
}

const ProcessPMDAS = (expression: string): string => {
	let returnValue = ExecuteFunctions(expression)

	returnValue = ReplaceAll(' ', '', returnValue)

	const preOperators = [...EvaluatorOperators, '(']

	const postOperators = [...EvaluatorOperators, ')']

	let innerSet = FindInnerSetLocations(returnValue, '(', ')')
	while (!!innerSet) {
		let newExpression = returnValue.substring(0, innerSet[0])
		if (
			newExpression.length > 0 &&
			preOperators.indexOf(newExpression.substring(newExpression.length - 1)) === -1 &&
			preOperators.indexOf(newExpression.substring(newExpression.length - 2)) === -1
		) {
			newExpression = newExpression.concat('*')
		}
		newExpression = newExpression.concat(
			ProcessPMDAS(returnValue.substring(innerSet[0] + 1, innerSet[0] + 1 + (innerSet[1] - innerSet[0] - 1)))
		)
		let lastSegment = returnValue.substring(innerSet[1] + 1, innerSet[1] + 1 + (returnValue.length - innerSet[1]))
		if (
			lastSegment.length > 0 &&
			postOperators.indexOf(lastSegment.substring(0, 1)) === -1 &&
			postOperators.indexOf(lastSegment.substring(0, 2)) === -1
		) {
			newExpression = newExpression.concat('*')
		}

		returnValue = newExpression.concat(lastSegment)

		innerSet = FindInnerSetLocations(returnValue, '(', ')')
	}

	for (const operator of EvaluatorOperators) {
		let processOperator = operator
		let nextOperator = operator
		let items = returnValue.split(operator)

		if (items.length > 1) {
			if (operator === '-' && EvaluatorOperators.indexOf(items[0].substring(items[0].length - 1)) > -1) {
				processOperator = items[0].substring(items[0].length - 1)
				items[0] = items[0].substring(0, items[0].length - 1)
				items[1] = '-' + items[1]
			}
			let result = ProcessPMDAS(items[0])
			for (let itempos = 1; itempos < items.length; itempos++) {
				nextOperator = operator
				if (
					operator === '-' &&
					EvaluatorOperators.indexOf(items[itempos].substring(items[itempos].length - 1)) > -1
				) {
					nextOperator = items[itempos].substring(items[itempos].length - 1)
					items[itempos] = items[itempos].substring(0, items[itempos].length - 1)
					items[itempos + 1] = '-' + items[itempos + 1]
				}

				let itemposValue = ProcessPMDAS(items[itempos])

				const floatResult = parseFloat(result)
				const floatItemPosValue = parseFloat(itemposValue)
				const bothNumeric = !isNaN(floatResult) && !isNaN(floatItemPosValue)

				switch (processOperator) {
					case '^':
						if (bothNumeric) {
							result = Math.pow(floatResult, floatItemPosValue).toString()
						} else {
							result = itemposValue
						}
						break
					case '*':
						if (bothNumeric) {
							result = (floatResult * floatItemPosValue).toString()
						} else {
							result = itemposValue
						}
						break
					case '/':
						if (bothNumeric) {
							if (floatItemPosValue === 0) {
								result = '0'
							} else {
								result = (floatResult / floatItemPosValue).toString()
							}
						}
						break
					case '+':
						if (bothNumeric) {
							result = (floatResult + floatItemPosValue).toString()
						} else {
							result = itemposValue
						}
						break
					case '-':
						if (bothNumeric) {
							result = (floatResult - floatItemPosValue).toString()
						} else {
							result = `-${itemposValue}`
						}
						break
					case '<=':
						if (bothNumeric) {
							result = floatResult <= floatItemPosValue ? '1' : '0'
						} else {
							result = result <= itemposValue ? '1' : '0'
						}
						break
					case '>=':
						if (bothNumeric) {
							result = floatResult >= floatItemPosValue ? '1' : '0'
						} else {
							result = result >= itemposValue ? '1' : '0'
						}
						break
					case '<':
						if (bothNumeric) {
							result = floatResult < floatItemPosValue ? '1' : '0'
						} else {
							result = result < itemposValue ? '1' : '0'
						}
						break
					case '>':
						if (bothNumeric) {
							result = floatResult > floatItemPosValue ? '1' : '0'
						} else {
							result = result > itemposValue ? '1' : '0'
						}
						break
					case '=':
						result = result === itemposValue ? '1' : '0'
						break
					case '!=':
						result = result !== itemposValue ? '1' : '0'
						break
					case '||':
						result = result || itemposValue
						break
					case '&&':
						result = result && itemposValue
						break
					default:
						result = itemposValue
				}

				processOperator = nextOperator
			}

			// result = ExecuteFunctions(result);

			return result
		}
	}

	// returnValue = ExecuteFunctions(returnValue);

	return returnValue
}

interface IFoundFunction {
	expression: string
	pos: number
	pre: string
	post: string
	function: string
	argumentText: string
	arguments: string[]
}

const FindFunction = (expression: string, startPosition: number): IFoundFunction | null => {
	if (!expression) return null

	for (const evaluatorFunction of EvaluatorFunctions) {
		const pos = ('' + expression.toLowerCase()).indexOf(evaluatorFunction + '(', startPosition)

		if (pos >= 0) {
			const postFunctionName = expression.substring(pos + evaluatorFunction.length).toLowerCase()
			const parens = FindInnerSetLocations(postFunctionName, '(', ')')
			if (!!parens) {
				const argumentText = postFunctionName.substring(1, parens[1])

				return {
					expression: expression,
					pos: pos,
					pre: expression.substring(0, pos).trim(),
					post: postFunctionName.substring(parens[1] + 1).trim(),
					function: evaluatorFunction,
					argumentText: argumentText,
					arguments: argumentText.split(',').map((arg) => arg.trim())
				}
			}
		}
	}

	return null
}

const ExecuteFunction = (foundFunction: IFoundFunction): string => {
	const arg1 = parseFloat(EvaluateString(`[${foundFunction.arguments[0] ?? '0'}]`))
	const arg2 = parseFloat(EvaluateString(`[${foundFunction.arguments[1] ?? '0'}]`))

	switch (foundFunction.function) {
		case 'abs':
			if (!isNaN(arg1)) {
				return Math.abs(arg1).toString()
			}
			break
		case 'pow':
			if (!isNaN(arg1) && !isNaN(arg2)) {
				return Math.pow(arg1, arg2).toString()
			}
			break
		case 'int':
			if (!isNaN(arg1)) {
				return parseInt(foundFunction.arguments[0]).toString()
			}
			break
		case 'round':
			if (!isNaN(arg1) && !isNaN(arg2)) {
				const factor = Math.pow(10, arg2)
				const tempNumber = arg1 * factor
				const roundedTempNumber = Math.round(tempNumber)
				return (roundedTempNumber / factor).toString()
			}
			break
		case 'includes':
			let index = 1
			let arrayValues = []

			// get array values from the 2nd argument and so on...
			while (foundFunction.arguments[index] !== undefined) {
				arrayValues.push(foundFunction.arguments[index])
				index++
			}

			return arrayValues.join(',').includes(foundFunction.arguments[0]) ? '1' : '0'
		case 'includesinarray':
			let key = 1
			let arrValues = []

			// get array values from the 2nd argument and so on...
			while (foundFunction.arguments[key] !== undefined) {
				arrValues.push(foundFunction.arguments[key])
				key++
			}

			return arrValues.includes(foundFunction.arguments[0]) ? '1' : '0'
	}

	return ''
}

const ExecuteFunctions = (expression: string): string => {
	let updatedExpression = expression

	let foundFunction = FindFunction(updatedExpression, 0)

	while (!!foundFunction) {
		updatedExpression = foundFunction.pre + ExecuteFunction(foundFunction) + foundFunction.post

		foundFunction = FindFunction(updatedExpression, 0)
	}

	return updatedExpression
}
