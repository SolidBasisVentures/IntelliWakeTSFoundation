import {DateDiffLongDescription} from './DateManager'
import {FormatZip} from './StringManipulation'
import {isNullUndefined} from './SortSearch'

/**
 * Replace all occurrences of a string.
 *
 * @example
 * // returns "john-doe-bob"
 * ReplaceAll(' ', '-', 'john doe bob')
 */
export const ReplaceAll = function (
	find: string | string[],
	replace: string,
	subject: string | null | undefined
): string {
	if (!subject) return ''

	if (Array.isArray(find)) {
		let result = subject
		for (const findItem of find) {
			result = ReplaceAll(findItem, replace, result)
		}
		return result
	}
	// eslint-disable-next-line no-useless-escape
	return subject.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'), 'g'), replace)
}

/**
 * Replaces multiple strings in a subject string.
 *
 * @param {([string, string] | Record<string, string>)[]} findReplace - Array of tuples or objects containing the strings to find and replace.
 * @param {string|null|undefined} subject - The subject string to perform replacements on.
 * @returns {string} - The subject string with all replacements made.
 */
export const ReplaceAllMultiple = function (
	findReplace: (string[] | Record<string, any>)[] | null | undefined,
	subject: string | null | undefined
): string {
	if (!findReplace || !findReplace.length) return ''

	const replaces = ToArray(findReplace)

	let newSubject = subject ?? ''

	for (const replace of replaces) {
		if (Array.isArray(replace)) {
			newSubject = ReplaceAll(replace[0], replace[1], newSubject)
		} else {
			newSubject = ReplaceAll(Object.keys(replace)[0], Object.values(replace)[0], newSubject)
		}
	}

	return newSubject
}

/**
 * Determines whether a given value is a number.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - Returns true if the value is a number; otherwise, returns false.
 */
export function IsNumber(value: any): boolean {
	const val = CleanNumber(value, undefined, true)

	return val !== null && !isNaN(val)
}

/**
 * Determines whether a given value is a whole number.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - Returns true if the value is a number; otherwise, returns false.
 */
export function IsWholeNumber(value: any): boolean {
	return IsNumber(value) && CleanNumber(value, 0) === CleanNumber(value, 8)
}

/**
 * Constrain a number based on an increment value and round to a given number of decimal places.
 *
 * @param {number} num - The input number to be constrained.
 * @param {number} increment - The value by which the input number should be constrained.
 * @param {number} [round=2] - The number of decimal places to round the constrained number to. Defaults to 2.
 * @returns {number | null} - The constrained number or null.
 */
export function NumberConstrainToIncrementNull(num: any, increment: number, round = 2) {
	return CleanNumberNull(num) === null
		? null
		: increment == 0
		? CleanNumber(num, 0)
		: CleanNumber(Math.round(CleanNumber(num) / CleanNumber(increment)) * CleanNumber(increment), round)
}

/**
 * Constrain a number based on an increment value and round to a given number of decimal places.
 *
 * @param {number} num - The input number to be constrained.
 * @param {number} increment - The value by which the input number should be constrained.
 * @param {number} [round=2] - The number of decimal places to round the constrained number to. Defaults to 2.
 * @returns {number} - The constrained number.
 */
export function NumberConstrainToIncrement(num: any, increment: number, round = 2) {
	return NumberConstrainToIncrementNull(num, increment, round) ?? 0
}

/**
 * Cleans a number with a symbol like '$', ',' or '%'.
 *
 * @example
 * // return 100
 * CleanNumber('$100')
 *
 * // return 1000
 * CleanNumber('1,000')
 *
 * // return 50
 * CleanNumber('50%')
 *
 * Add a rounding to round to a certain number of digits:
 *
 * // return 100.1
 * CleanNumber('100.12', 1)
 */
export const CleanNumber = (value: any, roundClean?: number, allowNaN?: boolean): number => {
	if (typeof value === 'number') {
		if (roundClean !== undefined) {
			return RoundTo(value, roundClean)
		}
		return value
	}

	if (!value) return 0

	if (roundClean === undefined) {
		const useValue = +value
		if (!Number.isNaN(useValue)) return useValue
	}

	let str = value.toString()
	str = ReplaceAll('$', '', str)
	str = ReplaceAll('"', '', str)
	str = ReplaceAll("'", '', str)
	str = ReplaceAll(',', '', str)
	str = ReplaceAll('%', '', str)
	if (str.trim().length === 0 || isNaN(str)) return !!allowNaN ? NaN : 0

	if (roundClean !== undefined) {
		return RoundTo(parseFloat(str), roundClean)
	}
	return parseFloat(str)
}

/**
 * Determines if two numbers are equal, by default to rounded 2 decimal places.
 *
 * @param {any} value1 - The first value to compare.
 * @param {any} value2 - The second value to compare.
 * @param {number} roundClean - The number of decimal places to round the numbers to. Default is 2.
 * @returns {boolean} Returns true if the numbers are equal, false otherwise.
 */
export const EqualNumber = (value1: any, value2: any, roundClean = 2): boolean =>
	CleanNumberNull(value1, roundClean) !== null &&
	CleanNumberNull(value1, roundClean) === CleanNumberNull(value2, roundClean)

/**
 * Count the number of decimal digits in a given number.
 *
 * @param {any} num - The number to count decimal digits for.
 * @returns {number} - The number of decimal digits.
 */
export function CountDecimalDigits(num: any) {
	let str = CleanNumber(num, 8).toString()
	let decimalIndex = str.indexOf('.')

	return decimalIndex === -1 ? 0 : str.length - decimalIndex - 1
}

/**
 * Returns the greatest number from the provided values.
 * If no valid numbers are found, null is returned.
 *
 * @param {...(any | any[])} values - The values to evaluate.
 * @returns {number | null} - The greatest number or null if no valid numbers are found.
 */
export const GreaterNumberNull = (...values: (any | any[])[]): number | null =>
	ValidNumbers(values).reduce<number | null>(
		(result, value) => (result === null || value > result ? value : result),
		null
	)

/**
 * Calculates the greater number among the given values.
 *
 * @param {...(any|any[])[]} values - The values to compare.
 * @returns {number} - The greater number among the given values. Returns 0 if no values are provided.
 */
export const GreaterNumber = (...values: (any | any[])[]): number => GreaterNumberNull(...values) ?? 0

/**
 * Finds and returns the first non-zero, non-null, and non-undefined value from the given list of values.
 * If no such value exists, returns 0.
 *
 * @param {...(any | any[])[]} values - A list of values or arrays of values to search through.
 * @return {number} The first valid (non-zero, non-null, non-undefined) number, or 0 if no such value exists.
 */
export function FirstNonZeroNull(...values: (any | any[])[]): number {
	return ValidNumbers(values).find((value) => value !== 0 && value !== null && value !== undefined) ?? 0
}

/**
 *
 * @param values
 * @constructor
 */
export const LeastNumberNull = (...values: (any | any[])[]): number | null =>
	ValidNumbers(values).reduce<number | null>(
		(result, value) => (result === null || value < result ? value : result),
		null
	)

/**
 * Calculates the least number among the given values.
 * If any of the values passed are arrays, it considers the minimum value within each array.
 * If no numbers are found, it returns 0.
 *
 * @param {...(any | any[])} values - The values to calculate the least number from.
 * @returns {number} - The least number among the values.
 */
export const LeastNumber = (...values: (any | any[])[]): number => LeastNumberNull(...values) ?? 0

/**
 * Returns an array of valid numbers from the given values.
 *
 * @param {...(any|any[])} values - One or more values or arrays of values.
 * @returns {number[]} - An array of valid numbers.
 */
export const ValidNumbers = (...values: (any | any[])[]): number[] => {
	let returnValues: number[] = []

	for (const value of values) {
		const valueArray = ToArray(value)
		for (const valueItem of valueArray) {
			const subArray = ToArray(valueItem)
			for (const subItem of subArray) {
				const calc = CleanNumberNull(subItem)
				if (calc !== null) {
					returnValues = [...returnValues, calc]
				}
			}
		}
	}

	return returnValues
}

/**
 * Calculates the average of a set of values or an array of values.
 * If no valid numbers are given, it returns `null`.
 * @param decimals - The number of decimal places to be used in the final average calculation result.
 * @param values - The spread parameter representing numbers, or array of numbers, whose average is to be calculated.
 * @returns The average of the provided numbers (based on the number of valid numbers). Returns `null` if no valid numbers are found.
 * @function AverageNumberNull
 * @example
 * AverageNumberNull(2, 3, 4, 5, 6); // Returns 4.50
 * AverageNumberNull(2, [3, 4, 5, 6]); // Returns 4.50
 * AverageNumberNull(2, null, undefined, "five"); // Returns null
 */
export const AverageNumberNull = (decimals: number, ...values: (any | any[])[]): number | null => {
	const valids = ValidNumbers(values)

	if (valids.length === 0) return null

	return CleanNumber(CleanNumbers(decimals, valids) / valids.length, decimals)
}

/**
 * Computes the arithmetic mean of a set of values or array of values and returns the result.
 * If the average is `null`, result will be `0`.
 * @param decimals - The number of decimal places to be used in the final average calculation result.
 * @param values - The spread parameter representing numbers whose average is to be calculated.
 * This may consist of individual numbers or arrays of numbers.
 * @returns The calculated average of the supplied numbers.
 * @function AverageNumber
 * @example
 * AverageNumber(2, 3, 4, 5, 6); // Returns 4.50
 * AverageNumber(2, [3, 4, 5, 6]); // Returns 4.50
 * AverageNumber(2, null, 4, 5, 6); // Returns 0
 */
export const AverageNumber = (decimals: number, ...values: (any | any[])[]): number =>
	AverageNumberNull(decimals, ...values) ?? 0

/**
 * Calculates the median number from an array of values.
 *
 * @param values - The values to calculate the median from.
 *
 * @returns The median number if the array is not empty, otherwise null.
 */
export function MedianNumber(...values: (any | any[])[]): number | null {
	const validNumbers = ValidNumbers(values)

	if (validNumbers.length === 0) {
		return null
	} else {
		const sorted = validNumbers.sort((a, b) => a - b)
		const middle = Math.floor(sorted.length / 2)
		return CleanNumber(sorted[middle])
	}
}

/**
 * Performs division operation and returns the quotient. Takes care of `null` and `0` denominator cases.
 *
 * @param numerator - The top number in a division.
 * @param denominator - The bottom number in a division.
 * @param decimals - The number of decimal places to include in the quotient. Optional.
 * @returns The resulting quotient of the division if denominator is not `0` or `null`, otherwise returns `null`.
 * @function CleanDivideNull
 * @example
 * CleanDivideNull(10, 2, 2); // Returns 5.00
 * CleanDivideNull(10, 0); // Returns null
 * CleanDivideNull(10, null); // Returns null
 * CleanDivideNull(null, 2); // Returns null
 */
export const CleanDivideNull = (numerator: any, denominator: any, decimals?: number): number | null => {
	const useNumerator = CleanNumberNull(numerator)
	if (useNumerator === null) return null

	const useDenominator = CleanNumber(denominator)

	if (useDenominator === 0) return null

	return decimals !== undefined ? CleanNumber(useNumerator / useDenominator, decimals) : useNumerator / useDenominator
}

/**
 * Performs division operation and returns the result. Takes care of `null` and `0` denominator cases.
 * @param numerator - The top number in a division.
 * @param denominator - The bottom number in a division.
 * @param decimals - The number of decimal places to include in the quotient. Optional.
 * @returns The quotient of the division if denominator is not `0` or `null`, otherwise returns `0`.
 * @function CleanDivide
 * @example
 * CleanDivide(5, 2, 1); // Returns 2.5
 * CleanDivide(5, 0); // Returns 0
 * CleanDivide(5, null); // Returns 0
 * CleanDivide(null, 2); // Returns 0
 */
export const CleanDivide = (numerator: any, denominator: any, decimals?: number): number =>
	CleanDivideNull(numerator, denominator, decimals) ?? 0

/**
 * Calculates the percentage complete based on the provided numerator and denominator, rounded to the specified number of decimals.
 * Returns a non-1 if the numerator is less than the denominator (even if it would have been rounded to 1).
 * Returns a non-0 if the numerator is greater than zero (even if it would have been rounded to 0).
 * Returns null if the result cannot be calculated.
 * Optionally logs detailed calculation information if verbose mode is enabled.
 *
 * @param {any} numerator The numerator value used in the percentage calculation.
 * @param {any} denominator The denominator value used in the percentage calculation.
 * @param {number} decimals The number of decimal places to which the result should be rounded.
 * @param {boolean} [verbose] Optional flag to enable detailed console logging for debugging purposes.
 * @return {number | null} The calculated percentage complete, truncated or rounded based on calculations, or null if the computation is invalid or results in an undefined value.
 */
export function CleanPercentCompleteNull(
	numerator: any,
	denominator: any,
	decimals: number,
	verbose?: boolean
): number | null {
	const result = CleanDivideNull(numerator, denominator, decimals)
	if (result === null) return null

	if (verbose) console.info('CleanPercentCompleteNull', numerator, denominator, decimals, result)
	if (verbose)
		console.info(
			'CleanPercentCompleteNull - Big Test',
			result >= 1,
			numerator,
			RoundTo(numerator, decimals + 6, 'down'),
			CleanNumber(denominator, decimals + 1),
			RoundTo(numerator, decimals + 6, 'down') < CleanNumber(denominator, decimals + 1),
			result >= 1 && RoundTo(numerator, decimals + 6, 'down') < CleanNumber(denominator, decimals + 1)
		)

	if (result >= 1 && RoundTo(numerator, decimals + 6, 'down') < CleanNumber(denominator, decimals + 1)) {
		// return .99999999 truncated to the number of "decimals"
		const scale = 10 ** Math.max(0, decimals)
		const almostOne = (scale - 1) / scale
		if (verbose) console.info('almostOne', almostOne)

		return CleanNumber(almostOne, decimals)
	}

	if (verbose)
		console.info(
			'CleanPercentCompleteNull - Small Test',
			result <= 0,
			RoundTo(numerator, decimals, 'up'),
			result <= 0 && RoundTo(numerator, decimals + 2, 'up') > 0
		)

	if (result <= 0 && RoundTo(numerator, decimals + 6, 'up') > 0) {
		// return .01, with the 1 being at the level of the decimals, like in this case would be 2 decimals
		const scale = 10 ** Math.max(0, decimals)
		const smallestPositive = 1 / scale
		if (verbose) console.info('smallestPositive', smallestPositive)

		return CleanNumber(smallestPositive, decimals)
	}

	return result
}

/**
 * Calculates the percentage complete based on the provided numerator and denominator, rounded to the specified number of decimals.
 * Returns a non-1 if the numerator is less than the denominator (even if it would have been rounded to 1).
 * Returns a non-0 if the numerator is greater than zero (even if it would have been rounded to 0).
 * Returns zero if the result cannot be calculated.
 * Optionally logs detailed calculation information if verbose mode is enabled. *
 * @param {any} numerator - The numerator used to calculate the percentage.
 * @param {any} denominator - The denominator used to calculate the percentage.
 * @param {number} decimals - The number of decimal places to round the percentage to.
 * @param {boolean} [verbose] - Optional flag to enable verbose output.
 * @return {number} The rounded percentage completed or 0 if the calculation fails.
 */
export function CleanPercentComplete(numerator: any, denominator: any, decimals: number, verbose?: boolean): number {
	return CleanPercentCompleteNull(numerator, denominator, decimals, verbose) ?? 0
}

/**
 * Cleans a multiple numbers, adding and rounds them
 *
 * @example
 * // return 112.23
 * CleanNumbers(2, '$100', 12.234)
 *
 * // return 1012.24
 * CleanNumbers(2, '$1,000', 12.236)
 *
 * // return 1012
 * CleanNumbers(0, '$1,000', 12.236)
 */
export const CleanNumbers = (roundTo: number, ...values: (any | any[])[]): number =>
	ValidNumbers(values).reduce<number>((result, value) => CleanNumber(result + value, roundTo), 0)

/**
 * Cleans a multiple numbers, subtracting and rounds them
 *
 */
export const CleanSubtractNumbers = (roundTo: number, ...values: (any | any[])[]): number =>
	ValidNumbers(values).reduce<number>(
		(result, value, idx) => (!idx ? value : CleanNumber(result - value, roundTo)),
		0
	)

/**
 * Cleans a number with a symbol like '$', ',' or '%'.
 *
 * @example
 * // return 100
 * CleanNumberNull('$100')
 *
 * // return 1000
 * CleanNumberNull('1,000')
 *
 * // return 50DataToCSVExport
 * CleanNumberNull('50%')
 *
 * Add a rounding to round to a certain number of digits:
 *
 * // return 100.1
 * CleanNumberNull('100.12', 1)
 */
export const CleanNumberNull = (value: any, roundClean?: number): number | null => {
	if (value === undefined || value === null || value === '') return null

	let parsed = CleanNumber(value, roundClean, true)

	if (isNaN(parsed)) return null

	return parsed
}

/**
 * Tries to parse a JSON string into an object and returns it.
 * If parsing fails or the input is not a valid JSON, it returns `null`.
 * Already parsed objects are returned as is.
 * @param json - The JSON string to parse.
 * @returns The parsed object of type `T` or `null` if parsing fails or input is not a valid JSON.
 * @template T - The expected type of the parsed object.
 * @function JSONParse
 * @example
 * JSONParse<{ name: string }>('{"name": "Bob"}'); // Returns { name: 'Bob' }
 * JSONParse('invalid JSON'); // Returns null
 * JSONParse(null); // Returns null
 */
export const JSONParse = <T = any>(json: any): T | null => {
	if (!json) {
		return null
	}

	if (typeof json === 'object') return json

	let returnObj = null

	try {
		returnObj = JSON.parse(json)
	} catch (err) {
		// console.log('JSONParse', err)

		return null
	}

	return returnObj
}

/**
 *
 * @param subject
 * @param length
 * @constructor
 */
export const Trunc = (subject: string, length: number): string => {
	return subject.length > length ? subject.substring(0, length - 1) + '&hellip;' : subject
}

/**
 * Returns a google maps link with the given coordinates.
 *
 * @example
 * // returns "http://maps.google.com/maps?q=12345,12345"
 * GoogleMapsGPSLink({latitude: '12345', longitude: '12345'})
 */
export const GoogleMapsGPSLink = (dataArray: any, prefix: string = ''): string => {
	const latitude = dataArray[prefix + 'latitude'] ?? ''
	let longitude = dataArray[prefix + 'longitude'] ?? ''
	return 'http://maps.google.com/maps?q=' + latitude + ',' + longitude
}

/**
 * Generates a Google Maps search link for a given address object.
 * Constructs the address string using the provided prefix and address fields.
 * Returns an empty string if required fields are missing.
 *
 * @param {object|null|undefined} address - The address object containing components such as address1, address2, city, state, and zip.
 * @param {string} [prefix=''] - An optional prefix used to access address fields in the object (e.g., 'billing_' for 'billing_address1').
 * @returns {string} A URL string for the Google Maps search query corresponding to the provided address.
 */
export const GoogleMapsAddressLink = (address: Record<string, any> | null | undefined, prefix: string = ''): string => {
	if (!address || !(address[prefix + 'address1'] ?? address[prefix + 'address_1']) || !address[prefix + 'zip'])
		return ''

	let addressStruct = (address[prefix + 'address1'] ?? address[prefix + 'address_1'] ?? '') + ' '
	if (!!address[prefix + 'address2'] || !!address[prefix + 'address_2']) {
		addressStruct += (address[prefix + 'address2'] ?? address[prefix + 'address_2']) + ' '
	}
	addressStruct += (address[prefix + 'city'] ?? '') + ', '
	addressStruct += (address[prefix + 'state'] ?? '') + ' '
	addressStruct += address[prefix + 'zip'] ?? ''
	return 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(addressStruct)
}

/**
 * Generates a Google Maps directions link between two addresses.
 *
 * @param {object | null | undefined} address1 - The first address (origin) object which contains address details such as address1, city, state, and zip.
 * @param {object | null | undefined} address2 - The second address (destination) object which contains address details such as address1, city, state, and zip.
 * @param {string} [prefix1=''] - The prefix to prepend to the property keys of the first address object (e.g., if keys are prefixed like "home_address1").
 * @param {string} [prefix2=''] - The prefix to prepend to the property keys of the second address object (e.g., if keys are prefixed like "work_address1").
 * @return {string} A URL string for Google Maps directions, or an empty string if any required parameters or address components are missing.
 */
export function GoogleMapsDirectionsLink(
	address1: object | null | undefined,
	address2: object | null | undefined,
	prefix1: string = '',
	prefix2: string = ''
): string {
	if (!address1 || !address2) return ''

	const formatAddress = (address: Record<string, any>, prefix: string): string => {
		if (!address || !(address[prefix + 'address1'] ?? address[prefix + 'address_1']) || !address[prefix + 'zip'])
			return ''
		return `${address[prefix + 'address1'] ?? address[prefix + 'address_1']}, ${address[prefix + 'city']}, ${
			address[prefix + 'state']
		} ${address[prefix + 'zip']}`
	}

	const originAddress = formatAddress(address1, prefix1)
	if (!originAddress) return ''
	const origin = encodeURIComponent(originAddress)

	const destinationAddress = formatAddress(address2, prefix2)
	if (!destinationAddress) return ''
	const destination = encodeURIComponent(destinationAddress)

	return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`
}

/**
 * Determines whether a value is a valid input decimal.
 *
 * @example
 * // returns true
 * IsValidInputDecimal('1')
 *
 * // returns false
 * IsValidInputDecimal('1%')
 */
export const IsValidInputDecimal = (value: string): boolean => {
	// noinspection RegExpUnexpectedAnchor
	const regEx = new RegExp('^\\d{1,}(\\.\\d{0,4})?$')

	return !value || regEx.test(value)
}

/**
 * Generates a unique UID
 */
export const GenerateUUID = () => {
	let d = new Date().getTime() //Timestamp
	let d2 = (performance && performance.now && performance.now() * 1000) || 0 //Time in microseconds since page-load or 0 if unsupported
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		let r = Math.random() * 16 //random number between 0 and 16
		if (d > 0) {
			//Use timestamp until depleted
			r = (d + r) % 16 | 0
			d = Math.floor(d / 16)
		} else {
			//Use microseconds since page-load if supported
			r = (d2 + r) % 16 | 0
			d2 = Math.floor(d2 / 16)
		}
		return (c === 'x' ? r : r & (0x3 | 0x8)).toString(16)
	})
}

export type TIsOnOptions = {
	yeses?: string[]
	nos?: string[]
}

/**
 * Function `IsOn` checks if a given value can be considered as a boolean 'true' value.
 * It performs various checks on the given value to determine if it can be considered 'on' or 'true'.
 * By default, the values considered as 'true' are 'true', 'active', 'on', 'yes', 'y', 't' and all positive numbers.
 * @param value - The value to be checked.
 * @param options - (Optional) An object that you can use to specify additional 'true' or 'false' values. 'nos' key for 'false' and 'yeses' key for 'true'.
 * @returns A boolean indicating whether the value can be considered as a 'true' or 'positive'.
 * @example
 *
 * const result = IsOn('active'); // result is true.
 * const result2 = IsOn(15); // result2 is true.
 * const result3 = IsOn('new', {yeses: ['new']}); // result3 is true.
 */
export const IsOn = (value: any, options?: TIsOnOptions): boolean => {
	if (!value) {
		return false
	}

	if (value === true) {
		return value
	}

	const floatValue = CleanNumberNull(value)
	if (floatValue !== null) {
		return floatValue > 0
	}

	let useValue = value.toString().toLowerCase().trim()

	return (
		!(options?.nos ?? []).some((no) => no.toString().toLowerCase().trim() === useValue) &&
		['true', 'active', 'on', 'yes', 'y', 't', ...(options?.yeses ?? [])].some(
			(yes) => yes.toString().toLowerCase().trim() === useValue
		)
	)
}

/**
 *
 */
export interface IAddress {
	address_1: string
	address_2: string
	city: string
	state: string
	zip: string
}

/**
 * Copies an address object to another object.
 *
 * Fields copied: address_1, address_2, city, state, zip, phone, timezone, latitude, longitude
 *
 * The "prefix" properties are simply appended: prefix: "employee_" results in "employee_address_1"
 *
 * @example
 * let address1 = {
 *   address_1: 'Blk 1, Lot 2, Some Street',
 *   address_2: 'Blk 2, Lot 3, Some Street',
 *   city: 'Burr Ridge',
 *   state: 'IL',
 *   zip: '61257',
 * }
 *
 * let address2 = {}
 * AddressCopy(address1, '', address2, '')
 * // address2 is now a copy of address1
 * console.log(address2)
 */
export const AddressCopy = (
	fromObject: any,
	fromPrefix: string,
	toObject: any,
	toPrefix: string,
	includeName = true,
	includePhone = true,
	includeTimeZone = true,
	includeGPS = true
): void => {
	if (includeName && !!fromObject[fromPrefix + 'name']) {
		toObject[toPrefix + 'name'] = fromObject[fromPrefix + 'name']
	}
	toObject[toPrefix + 'address_1'] = fromObject[fromPrefix + 'address_1']
	toObject[toPrefix + 'address_2'] = fromObject[fromPrefix + 'address_2']
	toObject[toPrefix + 'city'] = fromObject[fromPrefix + 'city']
	toObject[toPrefix + 'state'] = fromObject[fromPrefix + 'state']
	toObject[toPrefix + 'zip'] = fromObject[fromPrefix + 'zip']
	if (includePhone && !!fromObject[fromPrefix + 'phone']) {
		toObject[toPrefix + 'phone'] = fromObject[fromPrefix + 'phone']
	}
	if (includeTimeZone && !!fromObject[fromPrefix + 'timezone']) {
		toObject[toPrefix + 'timezone'] = fromObject[fromPrefix + 'timezone']
	}
	if (includeGPS && !!fromObject[fromPrefix + 'latitude']) {
		toObject[toPrefix + 'latitude'] = fromObject[fromPrefix + 'latitude']
	}
	if (includeGPS && !!fromObject[fromPrefix + 'longitude']) {
		toObject[toPrefix + 'longitude'] = fromObject[fromPrefix + 'longitude']
	}
}

/**
 * Determines whether an object has a property of "address_1".
 *
 * @example
 * // returns false
 * AddressValid({ address: 'Blk1, Lot1, Some street' })
 *
 * // returns false
 * AddressValid({ address_1: '' })
 *
 * // returns true
 * AddressValid({ address_1: 'Blk1, Lot1, Some street' })
 */
export const AddressValid = (address: any, prefix?: string): boolean => {
	return !!address[(prefix ?? '') + 'address_1']
}

/**
 * Combines an address object into a single row string.
 *
 * @example
 * let address1 = {
 *   address_1: 'Blk 1, Lot 2, Some Street',
 *   address_2: 'Suite 100',
 *   city: 'Burr Ridge',
 *   state: 'IL',
 *   zip: '61257',
 * }
 *
 * // returns "Blk 1, Lot 2, Some Street, Suite 100, Burr Ridge, IL  61257"
 * AddressSingleRow(address1)
 */
export const AddressSingleRow = (object: any, prefix?: string): string => {
	const usePrefix = prefix ?? ''

	let singleRow = (object[usePrefix + 'address_1'] ?? '').trim()
	if (!!(object[usePrefix + 'address_2'] ?? '')) singleRow += ', ' + object[usePrefix + 'address_2']
	if (!!(object[usePrefix + 'city'] ?? '')) singleRow += ', ' + object[usePrefix + 'city']
	if (!!(object[usePrefix + 'state'] ?? '')) singleRow += ', ' + object[usePrefix + 'state']
	if (!!(object[usePrefix + 'zip'] ?? '')) singleRow += '  ' + FormatZip(object[usePrefix + 'zip'])

	return singleRow
}

/**
 * Combines an address object into a multiline row string.
 *
 * @example
 * let address1 = {
 *   address_1: 'Blk 1, Lot 2, Some Street',
 *   address_2: 'Appt 1',
 *   city: 'Burr Ridge',
 *   state: 'IL',
 *   zip: '61257',
 * }
 *
 * // returns "
 * // Blk 1, Lot 2, Some Street
 * // Appt 1
 * // Burr Ridge, IL, 61257"
 * AddressMultiRow(address1)
 */
export const AddressMultiRow = (object: any, prefix?: string): string => {
	const usePrefix = prefix ?? ''

	let multiRow = (object[usePrefix + 'address_1'] ?? '').trim()
	if (!!object[usePrefix + 'address_2']) {
		multiRow += '\n' + (object[usePrefix + 'address_2'] ?? '').trim()
	}

	if (!!(object[usePrefix + 'city'] ?? '')) multiRow += '\n' + object[usePrefix + 'city']
	if (!!(object[usePrefix + 'state'] ?? '')) multiRow += ', ' + object[usePrefix + 'state']
	if (!!(object[usePrefix + 'zip'] ?? '')) multiRow += '  ' + FormatZip(object[usePrefix + 'zip'])

	return multiRow
}

/**
 *
 * @param byteArray
 * @constructor
 */
export const ArrayToGuidString = (byteArray: any): string => {
	return Array.from(byteArray, function (byte: any) {
		return ('0' + (byte & 0xff).toString(16)).slice(-2)
	})
		.join('')
		.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5')
}

/**
 *
 * @param str
 * @constructor
 */
export const StringToByteArray = (str: string): any => {
	let decoded = atob(str)
	let i,
		il = decoded.length
	let array = new Uint8Array(il)

	for (i = 0; i < il; ++i) {
		array[i] = decoded.charCodeAt(i)
	}

	return array
}

/**
 *
 * @param x
 * @constructor
 */
export const FormUrlEncoded = (x: any) => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')

/**
 * Rounds a number to the nearest integer if it is within a specified tolerance; otherwise,
 * rounds the number up to the nearest integer.
 *
 * @param {number} n - The number to be rounded.
 * @param {number} [tol=1e-9] - The tolerance value within which the number is considered
 * close enough to the nearest integer. Defaults to 1e-9.
 * @return {number} The nearest integer if the difference from the input number
 * is less than or equal to the tolerance; otherwise, the ceiling value of the number.
 */
export function CeilWithTolerance(n: any, tol = 1e-9) {
	const nearest = Math.round(n)
	return Math.abs(n - nearest) <= tol ? nearest : Math.ceil(n)
}

/**
 * Rounds a given number to a specified number of decimal places, using a specified rounding direction.
 *
 * @param {any} num - The number to be rounded. This will be converted to a numeric format if possible.
 * @param {number} [decimalPlaces=0] - The number of decimal places to round to. Defaults to 0 if not specified.
 * @param {'round' | 'up' | 'down'} [roundDir='round'] - The rounding direction to use: 'round' for standard rounding, 'up' for rounding up, and 'down' for rounding down. Defaults to 'round'.
 * @param {boolean} [verbose=false] - If true, logs verbose information about the rounding process to the console. Defaults to false.
 * @return {number} The rounded number.
 */
export function RoundTo(
	num: any,
	decimalPlaces: number = 0,
	roundDir: 'round' | 'up' | 'down' = 'round',
	verbose = false
) {
	const n = CleanNumber(num)
	if (verbose) console.info('RoundTo', num, decimalPlaces, roundDir, n)
	const factor = 10 ** decimalPlaces
	const scaled = n * factor

	if (roundDir === 'round') {
		// Use EPSILON only for standard rounding to avoid floating point tie issues.
		return Math.round(scaled + Number.EPSILON) / factor
	} else if (roundDir === 'down') {
		if (verbose) console.info('RoundTo', roundDir, scaled, factor, Math.floor(scaled) / factor)
		return Math.floor(scaled) / factor
	} else {
		if (verbose) console.info('RoundTo', roundDir, scaled, factor, CeilWithTolerance(scaled) / factor)
		return CeilWithTolerance(scaled) / factor
	}
}

/**
 *
 * @param val
 * @constructor
 */
export const ObjectToJSONString = (val: any) => `json:${JSON.stringify(val)}`

/**
 *
 * @param val
 * @constructor
 */
export const JSONStringToObject = <T = any>(val: string): T =>
	(!val
		? undefined
		: val === 'json:undefined'
		? undefined
		: val === 'json:null'
		? null
		: JSONParse(val.toString().substring(5))) as T

// noinspection JSPotentiallyInvalidConstructorUsage
/**
 * Is ArrayBuffer
 * @param buf
 */
export const isAB = (buf: ArrayBuffer | string): boolean =>
	buf instanceof new Uint16Array().constructor.prototype.__proto__.constructor

/**
 * ArrayBuffer to String
 * @param buf
 */
export const ab2str = (buf: ArrayBuffer | string): string =>
	isAB(buf) ? (String.fromCharCode.apply(null, new Uint16Array(buf as ArrayBuffer) as any) as any) : (buf as any)

/**
 * String to ArrayBuffer
 * @param str
 */
export const str2ab = (str: string): ArrayBuffer => {
	let buf = new ArrayBuffer(str.length * 2) // 2 bytes for each char
	let bufView = new Uint16Array(buf)
	for (var i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i)
	}
	return buf
}

/**
 * Async version of find
 * @param array
 * @param predicate
 */
export const findAsync = async <T>(array: T[], predicate: (t: T) => Promise<boolean>): Promise<T | undefined> => {
	for (const t of array) {
		if (await predicate(t)) {
			return t
		}
	}
	return undefined
}

/**
 * Async version of some
 * @param array
 * @param predicate
 */
export const someAsync = async <T>(array: T[], predicate: (t: T) => Promise<boolean>): Promise<boolean> => {
	for (const t of array) {
		if (await predicate(t)) {
			return true
		}
	}
	return false
}

/**
 * Async version of every
 * @param array
 * @param predicate
 */
export const everyAsync = async <T>(array: T[], predicate: (t: T) => Promise<boolean>): Promise<boolean> => {
	for (const t of array) {
		if (!(await predicate(t))) {
			return false
		}
	}
	return true
}

/**
 * Async version of filter
 * @param array
 * @param predicate
 */
export const filterAsync = async <T>(array: T[], predicate: (t: T) => Promise<boolean>): Promise<T[]> => {
	let returnArray: T[] = []

	for (const t of array) {
		if (await predicate(t)) {
			returnArray.push(t)
		}
	}

	return returnArray
}

/**
 * TToArrayOptions is a type describing optional configuration properties
 * for converting a collection or similar data structure into an array.
 * Each property affects how the resulting array is processed.
 *
 * @property {boolean} [distinct] - When true, ensures the resulting array contains unique values only.
 * @property {boolean} [removeFalsy] - When true, removes all falsy values (e.g., false, 0, '', null, undefined, NaN) from the resulting array.
 * @property {boolean} [removeNullUndefined] - When true, removes all null and undefined values from the resulting array.
 */
export type TToArrayOptions = {
	distinct?: boolean
	removeFalsy?: boolean
	removeNullUndefined?: boolean
}

/**
 * Converts a value or an array of values into an array with optional transformations
 * based on the provided options.
 *
 * @param {T: any | T: any[]} value - The value or array of values to be converted into an array.
 * @param {TToArrayOptions} [options] - Optional configuration object for modifying the returned array.
 *                                      - `removeFalsy` (boolean): Removes falsy values (e.g., 0, '', false) from the array if true.
 *                                      - `removeNullUndefined` (boolean): Removes null and undefined values if true.
 *                                      - `distinct` (boolean): Ensures only unique values are included if true.
 * @return {T: any[]} A processed array derived from the input value and options.
 */
export function ToArray<T>(value: T | readonly T[], options?: TToArrayOptions): T[] {
	let returnValue = (value === null || value === undefined ? [] : Array.isArray(value) ? value : [value]) as T[]

	if (!returnValue.length || !options) return returnValue

	return returnValue.reduce<T[]>((results, val) => {
		if (options.removeFalsy && !val) return results
		if (options.removeNullUndefined && isNullUndefined(val)) return results
		if (options.distinct && results.some((result) => result === val)) return results
		return [...results, val]
	}, [])
}

/**
 * Generates a range of numbers
 *
 * @param end
 * @param increment
 * @param start
 * @constructor
 */
export const ArrayRange = (end: number, increment = 1, start = 0): number[] => {
	const useIncrement =
		end > start
			? increment > 0
				? increment
				: GreaterNumber(increment * -1, 1)
			: increment < 0
			? increment
			: LeastNumber(increment * -1, -1)

	let results: number[] = []

	let value = start

	while (useIncrement > 0 ? end > value : end < value) {
		results.push(value)
		value += useIncrement
	}

	return results
}

/**
 * Converts a given string into an array of substrings, splitting based on whitespace by default
 * or using specified separators to ignore.
 *
 * @param {string} str - The input string to be split into an array.
 * @param {string} [ignoreSeparators=''] - Optional parameter representing characters that should not
 *                                         be treated as separators during the split operation.
 * @returns {string[]} Array of substrings derived from the input string, split based on specified rules.
 */
export const ArrayFromStringWS = (str: string, ignoreSeparators = ''): string[] => {
	const useSeparators = ',; :.\'"`|*\t\r\n'
		.split('') // Split the string into an array of characters
		.filter((char) => !ignoreSeparators.includes(char)) // Exclude any character present in `exclude`
		.join('') // Join the remaining characters back into a string

	const regex = new RegExp(`[${useSeparators}]`, 'g')
	return str.split(regex).filter((substring) => substring.trim().length > 0)
}

/**
 *
 * @param data
 * @param keys
 * @constructor
 */
export const PropertiesExist = <T extends object, K extends Extract<keyof T, string>>(data: T, ...keys: K[]) =>
	keys.every((key) => key in data)

/**
 *
 * @param data
 * @param keys
 */
export const PropertiesNotFalsey = <T extends object, K extends Extract<keyof T, string>>(data: T, ...keys: K[]) =>
	keys.every((key) => key in data && !!data[key])

/**
 * OmitProperty is a function that creates a new object by omitting the specified keys from the input object.
 *
 * @param {Record<any, any>} obj - The input object from which the keys will be omitted.
 * @param {any[]} keys - The keys to be omitted from the input object.
 * @return {Record<any, any>} - A new object that does not contain the specified keys.
 */
export function OmitProperty<T extends Record<any, any>, K extends Extract<keyof T, any>>(
	obj: T,
	...keys: K[]
): Omit<T, K> {
	let ret: any = {...obj}

	for (let key of keys) {
		delete ret[key]
	}

	return ret
}

/**
 * Remove properties with falsy values from an object, excluding specified keys.
 *
 * @param {object} obj - The object to omit falsey properties from.
 * @param {...string} keys - The keys to exclude from removal.
 * @returns {object} - A new object with falsey properties omitted, excluding the specified keys.
 */
export function OmitFalsey<T extends object, K extends Extract<keyof T, string>>(
	obj: T,
	...keys: K[]
): Omit<T, K> & Partial<K> {
	let ret: Omit<T, K> & Partial<K> = {...obj}
	const excludeSet: Set<string> = new Set(keys)

	for (let key in obj) {
		if (excludeSet.has(key) && !(ret as any)[key]) {
			delete (ret as any)[key]
		}
	}

	return ret
}

/**
 * OmitUndefined function eliminates the properties from an object that have undefined values.
 *
 * @param {object} obj - The object from which to omit undefined properties.
 * @returns {object} - A new object without the undefined properties.
 *
 * @example
 *
 * const obj = {
 *   name: 'John',
 *   age: 30,
 *   gender: undefined
 * };
 *
 * const result = OmitUndefined(obj);
 * // result is { name: 'John', age: 30 }
 */
export function OmitUndefined<T extends object>(obj: T): Partial<T> {
	let ret: Partial<T> = {...obj}

	for (let key in obj) {
		if (key in obj && (ret as any)[key] === undefined) {
			delete (ret as any)[key]
		}
	}

	return ret
}

/**
 * Picks specified properties from an object and returns a new object with just those properties.
 *
 * @param {Record<any, any>} obj - The object from which properties will be picked.
 * @param {...any} keys - The keys of the properties to be picked.
 * @returns {Object} - A new object containing only the specified properties.
 */
export function PickProperty<T extends Record<any, any>, K extends Extract<keyof T, any>>(
	obj: T,
	...keys: K[]
): Pick<T, K> {
	let ret: any = {}

	for (let key of keys) {
		if (key in obj) {
			ret[key] = obj[key]
		}
	}

	return ret
}

/**
 * Creates an object where the values are mirror copies of the keys.  This is to support Enum replacement.
 *
 * @param {T extends Record<string, unknown>} obj - An object containing the keys to be mirrored. The values of the object are ignored.
 * @return {Readonly<Record<keyof T: any & string, string>>} A frozen object where each key has the same string value as its key name.
 */
export function KeyMirror<T extends Record<string, unknown>>(obj: T) {
	return Object.freeze(
		Object.fromEntries(Object.keys(obj).map((k) => [k, k])) as {
			readonly [K in keyof T & string]: K
		}
	)
}

/**
 * Retrieves the value of the property or properties from a given object, comparing keys in a case-insensitive manner.
 * Works with a single property or an array of properties. The function returns the value of the first matching property found.
 * It can process null, undefined, or actual values for both input object and properties.
 *
 * @param obj - The object to examine. This can be any JS object, or null, or undefined.
 * @param props - The single string or array of strings specifying the name(s) of the property or properties to retrieve.
 * This also accepts null or undefined. The comparison with object keys is case-insensitive.
 *
 * @return The value of the first property found in the object that matches one of the input properties; `undefined` otherwise.
 */
export function GetPropertyValueCaseInsensitive(
	obj: any | null | undefined,
	props: string | string[] | null | undefined
): any {
	let values: any[] = []

	const useProps = ToArray(props)
		.map((prop) => prop?.toString().toLowerCase().trim())
		.filter((prop) => !!prop) as string[]
	if (obj && useProps.length) {
		const keys = Object.keys(obj)
		for (const prop of useProps) {
			for (const key of keys) {
				if (key.toLowerCase().trim() === prop) {
					values.push(obj[key])
				}
			}
		}
	}

	// console.info(obj, props, values)

	if (values.length) {
		// Prioritize fields with truthy values over falsey values, otherwise go with the first found value according to the list of props
		const validIdx = values.findIndex((val) => !!val && !!val.toString().trim().length)
		return validIdx >= 0 ? values[validIdx] : values[0]
	}

	return undefined
}

/**
 * Removes the starting substring(s) from a given value.
 *
 * @param {string|string[]|null|undefined} remove - The substring(s) to remove from the beginning of the value.
 * @param {string|null|undefined} value - The value from which to remove the starting substring(s).
 * @param {boolean} [recursive=false] - Indicates whether to recursively remove all possible starting substrings.
 * @return {string} The updated value with the starting substring(s) removed.
 */
export function RemoveStarting(
	remove: string | string[] | null | undefined,
	value: string | null | undefined,
	recursive = false
): string {
	if (!value || !remove) return ''

	const arrayRemove = ToArray(remove)

	let newValue = value

	do {
		for (const aRemove of arrayRemove) {
			if (newValue.startsWith(aRemove)) {
				newValue = newValue.substring(aRemove.length)
			}
		}
	} while (recursive && arrayRemove.some((aRemove) => newValue.startsWith(aRemove)))

	return newValue
}

/**
 * Removes specified endings from a given value.
 *
 * @param {string|string[]|null|undefined} remove - The ending(s) to be removed. Accepts a single ending as a string, multiple endings as an array, or null/undefined for no removal.
 * @param {string|null|undefined} value - The value from which the endings should be removed.
 * @param {boolean} [recursive=false] - Specifies whether to remove endings recursively.
 * @returns {string} - The resulting value after removing the specified endings.
 */
export function RemoveEnding(
	remove: string | string[] | null | undefined,
	value: string | null | undefined,
	recursive = false
): string {
	if (!value || !remove) return ''

	const arrayRemove = ToArray(remove)

	let newValue = value

	do {
		for (const aRemove of arrayRemove) {
			if (newValue.endsWith(aRemove)) {
				newValue = newValue.substring(0, newValue.length - aRemove.length)
			}
		}
	} while (recursive && arrayRemove.some((aRemove) => newValue.endsWith(aRemove)))

	return newValue
}

/**
 * CoalesceFalsey function coalesces the value provided with the other values,
 * returning the first non-falsey value encountered.
 * If checkVal is true, checkVal is returned immediately without checking otherVals.
 *
 * @template T
 * @param {T} checkVal - The value to be checked.
 * @param {...T[]} otherVals - Additional values to be checked.
 * @returns {T} - The first non-falsey value encountered, or the last element of otherVals if all are falsey.
 */
export function CoalesceFalsey<T>(checkVal: T, ...otherVals: T[]): T {
	if (!!checkVal || otherVals.length === 0) return checkVal

	for (const otherVal of otherVals) {
		if (!!otherVal) return otherVal
	}

	return otherVals[otherVals.length - 1]
}

/**
 * Get color brightness from RGB
 *
 * @param r
 * @param g
 * @param b
 * @constructor
 */
export const ColorBrightnessRGB = (r: number, g: number, b: number): number => r * 0.299 + g * 0.587 + b * 0.114

/**
 * Get RGB from hex
 *
 * @param hex
 * @constructor
 */
export const RBGFromHex = (hex: string): [r: number, g: number, b: number] => {
	if (hex.indexOf('#') === 0) {
		hex = hex.slice(1)
	}
	// convert 3-digit hex to 6-digits.
	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
	}
	if (hex.length !== 6) {
		return [0, 0, 0]
	}
	return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)]
}

/**
 * Get brightness from Hex color
 *
 * @param hex
 * @constructor
 */
export const ColorBrightnessHex = (hex: string): number => {
	const [r, g, b] = RBGFromHex(hex)

	return ColorBrightnessRGB(r, g, b)
}

/**
 * Inverts a RBG color, use the BW flag to set it to black or white
 *
 * @param r
 * @param g
 * @param b
 * @param bw
 * @constructor
 */
export function InvertColorRGB(r: number, g: number, b: number, bw = false) {
	if (bw) {
		return ColorBrightnessRGB(r, g, b) > 186 ? '#000000' : '#FFFFFF'
	}

	// invert color components
	const rs = (255 - r).toString(16),
		gs = (255 - g).toString(16),
		bs = (255 - b).toString(16)
	// pad each with zeros and return
	return '#' + rs.padStart(2, '0') + gs.padStart(2, '0') + bs.padStart(2, '0')
}

/**
 * Inverts a hex color, use the BW flag to set it to black or white
 *
 * @param hex
 * @param bw
 * @constructor
 */
export function InvertColorHex(hex: string, bw = false) {
	const [r, g, b] = RBGFromHex(hex)

	return InvertColorRGB(r, g, b, bw)
}

/**
 * Sleep function that pauses the execution for a given number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to sleep.
 * @returns {Promise<void>} A promise that resolves after the specified duration.
 */
export function Sleep(ms = 200) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function ConsoleAsyncTime<T>(name: string, asyncFunction: Promise<T>): Promise<T> {
	const start = new Date()

	const result = await asyncFunction

	console.log(name, DateDiffLongDescription(start, 'now'))

	return result
}

/**
 * `AddPrefixToObject` is a TypeScript utility type that adds a specified
 * string prefix to the keys of an object.
 *
 * @template T - The original object type.
 * @template P - The string prefix to be added to the keys of the object.
 *
 * @typedef {{
 *   [K in keyof T as K extends string ? `${P}${K}` : never]: T[K]
 * }} AddPrefixToObject
 *
 * @example
 * // If T is `{ foo: number, bar: boolean }` and P is `'prefix_'`,
 * // then `AddPrefixToObject<T, P>` will be `{ prefix_foo: number, prefix_bar: boolean }`.
 */
export type AddPrefixToObject<T, P extends string> = {
	[K in keyof T as K extends string ? `${P}${K}` : never]: T[K]
}

/**
 * Adds a prefix to each key in an object.
 * @param {Object} obj - The input object.
 * @param {string} prefix - The prefix to add.
 * @return {Object} - The object with the keys prefixed.
 */
export function PrefixKeys<T extends Record<string, any>, S extends string>(
	obj: T,
	prefix: S
): AddPrefixToObject<T, S> {
	return Object.keys(obj).reduce<AddPrefixToObject<T, S>>((acc: any, key) => {
		acc[`${prefix}${key}`] = obj[key]
		return acc
	}, {} as any)
}

/**
 * Represents a type that prefixes keys of an object with a specified string.
 * @template T - the original object type
 * @template U - the prefix string type
 */
export type PrefixedKeys<T, U extends string> = {
	[P in keyof T as P extends `${U}${infer Rest}` ? Rest : never]: T[P]
}

/**
 * Extracts all keys from an object that have a specified prefix.
 *
 * @param {Record<string, any>} obj - The object from which to extract keys.
 * @param {string} prefix - The prefix to match when extracting keys.
 * @returns {Record<string, any>} - An object containing the extracted keys and their values.
 */
export function ExtractPrefixedKeys<T extends Record<string, any>, S extends string>(
	obj: T,
	prefix: S
): PrefixedKeys<T, S> {
	const extracted: any = {}

	for (const key in obj) {
		if (key.startsWith(prefix)) {
			extracted[key.slice(prefix.length)] = obj[key]
		}
	}

	return extracted
}

/**
 * Extracts the whole and decimal parts from a given value.
 *
 * @param {any} value - The value to extract from.
 * @returns {{whole: number; decimal: number}} - An object containing the whole and decimal parts of the value.
 */
export function ExtractWholeDecimal(value: any): {whole: number; decimal: number} {
	const useValue = CleanNumber(value, 5)

	const whole = value < 0 ? Math.ceil(useValue) : Math.floor(useValue)

	const decimal = CleanSubtractNumbers(5, value, whole)

	return {
		whole,
		decimal
	}
}

export type TEvenDistribution = {
	percentage: number
	amount: number
}

/**
 * Distributes the given amount evenly among the values based on their percentages.
 *
 * @param {number} amount - The total amount to be distributed.
 * @param {number[]} values - An array of numbers representing the values.
 * @param {number} toDecimals - Number of decimal places
 * @returns {TEvenDistribution[]} - An array of objects representing the distribution.
 */
export function DistributeEvenly(amount: number, values: number[], toDecimals = 2): TEvenDistribution[] {
	if (amount === 0 || values.some((val) => val < 0) || !values.some((val) => !!val)) return []

	let total = values.reduce((sum, value) => sum + value, 0)

	let percentages = values.map((value) => CleanDivide(value, total) * 100)
	let distribution: TEvenDistribution[] = []

	// Get the last non-zero value
	let lastIndex = values.reverse().findIndex((value) => value !== 0)
	lastIndex = lastIndex < 0 ? 0 : values.length - 1 - lastIndex

	let remaining = amount
	percentages.forEach((percentage, index) => {
		let distributed = parseFloat((amount * (percentage / 100)).toFixed(toDecimals))
		remaining -= distributed

		if (index === lastIndex)
			// Add the remaining to the last non-zero value to take care of any cent discrepancy
			distributed = CleanNumbers(toDecimals, remaining, distributed)

		distribution.push({percentage, amount: distributed})
	})

	return distribution
}

/**
 * Retrieves the keys of the given object as an array.
 *
 * @param {T: object} obj - The object whose enumerable property keys are to be returned.
 * @return {Array<keyof T: object>} An array of the keys from the object.
 */
export function ObjectKeys<T extends object>(obj: T): Array<keyof T> {
	return Object.keys(obj) as Array<keyof T>
}
