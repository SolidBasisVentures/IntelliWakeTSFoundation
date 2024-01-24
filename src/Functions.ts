import {DateDiffLongDescription} from './DateManager'
import {FormatZip} from './StringManipulation'
import {Readable} from 'node:stream'

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
	if (!value) return 0

	let str = value.toString()
	str = ReplaceAll('$', '', str)
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

	return decimals !== undefined
		? CleanNumber(CleanNumber(useNumerator) / useDenominator, decimals + 2)
		: CleanNumber(useNumerator) / useDenominator
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
 * Returns a google maps link with the given address
 *
 * @example
 * // returns https://www.google.com/maps/search/?api=1&query=Blk%201,%20Lot%202,%20Some%20Street...
 *	GoogleMapsAddressLink({
 *		address1: 'Blk 1, Lot 2, Some Street',
 *		address2: 'Blk 2, Lot 3, Some Street',
 *		city: 'Burr Ridge',
 *		state: 'IL',
 *		zip: '61257',
 *	})
 */
export const GoogleMapsAddressLink = (dataArray: any, prefix: string = ''): string => {
	let address = (dataArray[prefix + 'address1'] ?? dataArray[prefix + 'address_1'] ?? '') + ' '
	if (!!dataArray[prefix + 'address2'] || !!dataArray[prefix + 'address_2']) {
		address += (dataArray[prefix + 'address2'] ?? dataArray[prefix + 'address_2']) + ' '
	}
	address += (dataArray[prefix + 'city'] ?? '') + ', '
	address += (dataArray[prefix + 'state'] ?? '') + ' '
	address += dataArray[prefix + 'zip'] ?? ''
	return 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(address)
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

	const floatValue = parseFloat(value)
	if (!isNaN(floatValue)) {
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
 *
 * @param num
 * @param decimalPlaces
 * @param roundDir
 * @constructor
 */
export const RoundTo = (num: any, decimalPlaces: number = 0, roundDir: 'round' | 'up' | 'down' = 'round') =>
	roundDir === 'round'
		? +Math.round((CleanNumber(num) + Number.EPSILON) * 10 ** decimalPlaces) / 10 ** decimalPlaces
		: roundDir === 'down'
		? +Math.floor((CleanNumber(num) + Number.EPSILON) * 10 ** decimalPlaces) / 10 ** decimalPlaces
		: +Math.ceil((CleanNumber(num) + Number.EPSILON) * 10 ** decimalPlaces) / 10 ** decimalPlaces

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
 * Converts a single value or array of values to an array of values
 *
 * @example
 * ToArray([1, 2, 3]) = [1, 2, 3]
 * ToArray(1) = [1]
 *
 * @param value
 * @constructor
 */
export const ToArray = <T>(value: T | T[]): T[] =>
	value === null || value === undefined ? [] : Array.isArray(value) ? value : [value]

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
 *
 * @param obj
 * @param keys
 * @constructor
 */
export function OmitProperty<T extends object, K extends Extract<keyof T, string>>(obj: T, ...keys: K[]): Omit<T, K> {
	let ret: any = {}
	const excludeSet: Set<string> = new Set(keys)
	// TS-NOTE: Set<K> makes the obj[key] type check fail. So, loosing typing here.

	for (let key in obj) {
		// noinspection JSUnfilteredForInLoop
		if (!excludeSet.has(key)) {
			// noinspection JSUnfilteredForInLoop
			ret[key] = obj[key]
		}
	}
	return ret
}

/**
 *
 * @param obj
 * @param keys
 * @constructor
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
 *
 * @param obj
 * @constructor
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
 *
 * @param obj
 * @param keys
 * @constructor
 */
export function PickProperty<T extends object, K extends Extract<keyof T, string>>(obj: T, ...keys: K[]): Pick<T, K> {
	let ret: any = {}
	const includeSet: Set<string> = new Set(keys)
	// TS-NOTE: Set<K> makes the obj[key] type check fail. So, loosing typing here.

	for (let key in obj) {
		// noinspection JSUnfilteredForInLoop
		if (includeSet.has(key)) {
			// noinspection JSUnfilteredForInLoop
			ret[key] = obj[key]
		}
	}
	return ret
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
 *
 * @param remove
 * @param value
 * @param recursive
 * @constructor
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
 *
 * @param remove
 * @param value
 * @param recursive
 * @constructor
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
 *
 * @param checkVal
 * @param otherVals
 * @constructor
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
 *
 * @param ms
 * @constructor
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
 * @typedef {Object} TParallelProcessOptions
 * @template T
 * @property {number | null} [upperBound] - The upper bound of the parallel processing limit. Default value is null.
 * @property {number | null} [lowerBound] - The lower bound of the parallel processing limit. Default value is null.
 * @property {(chunk: T, err: any) => Promise<void>} [onError] - A callback function to handle errors that occur during processing. It takes two parameters: the chunk being processed and the error object. It returns a Promise<void>.
 * @property {boolean} [throwOnError] - A flag indicating whether an error should be thrown when an error occurs during processing. Default value is false.
 */
export type TParallelProcessOptions<T = any> = {
	upperBound?: number | null
	lowerBound?: number | null
	onError?: (chunk: T, err: any) => Promise<void>
	throwOnError?: boolean
}

/**
 * Executes a given action in parallel for each chunk of data from a readable stream.
 * @param {stream.Readable} stream - The readable stream from which to read data.
 * @param {Function} action - The action to be executed for each chunk of data. It should accept a single parameter, the chunk of data, and return a Promise that resolves when the action is complete.
 * @param {Object} options - Optional configuration options.
 * @param {number} options.upperBound - The maximum number of active processes. Defaults to 1000.
 * @param {number} options.lowerBound - The minimum number of active processes before resuming the stream. Defaults to half of the upper bound or 1, whichever is greater.
 * @param {Function} options.onError - A callback function to handle errors that occur during the action execution. It should accept two parameters: the chunk of data and the error object.
 * @param {boolean} options.throwOnError - If true, the ReadableParallelProcess function will reject the promise if an error occurs during the action execution. Defaults to false.
 * @returns {Promise<void>} - A promise that resolves when all chunks have been processed.
 */
export async function ReadableParallelProcess<T = any>(
	stream: Readable,
	action: (chunk: T) => Promise<void>,
	options?: TParallelProcessOptions<T>
) {
	return new Promise<void>((resolve, reject) => {
		let activeProcesses = 0
		const upperBound = options?.upperBound ?? 1000
		const lowerBound = GreaterNumber(options?.lowerBound ?? upperBound * 0.5, 1)

		stream.on('data', async (chunk: any) => {
			activeProcesses++

			if (activeProcesses >= upperBound) {
				stream.pause()
			}

			try {
				await action(chunk)
			} catch (err) {
				if (options?.onError) {
					options.onError(chunk, err)
				}
				if (options?.throwOnError) {
					reject({...err, chunk})
					stream.destroy()
				} else {
					console.info('Stream Error', chunk, err)
				}
			}

			activeProcesses--

			if (!stream.readableFlowing && activeProcesses <= lowerBound) {
				stream.resume()
			}
		})

		stream.on('end', async () => {
			while (activeProcesses > 0) {
				await Sleep()
			}
			resolve()
		})
	})
}

/**
 * Processes an array of elements in parallel using a provided action.
 *
 * @param {Array} array - The array of elements to process.
 * @param {Function} action - The action to perform on each element. This action should take a single parameter, representing an element from the array, and return a Promise that resolves once the action is completed.
 * @param {Object} options - Optional configuration options.
 * @param {number} options.upperBound - The maximum number of active processes. Defaults to 1000.
 * @param {number} options.lowerBound - The minimum number of active processes before resuming the stream. Defaults to half of the upper bound or 1, whichever is greater.
 * @param {Function} options.onError - A callback function to handle errors that occur during the action execution. It should accept two parameters: the chunk of data and the error object.
 * @param {boolean} options.throwOnError - If true, the ReadableParallelProcess function will reject the promise if an error occurs during the action execution. Defaults to false.
 * @returns {Promise<void>} - A Promise that resolves once all the elements in the array have been processed.
 */
export async function ArrayParallelProcess<T = any>(
	array: T[],
	action: (chunk: T) => Promise<void>,
	options?: TParallelProcessOptions<T>
): Promise<void> {
	return ReadableParallelProcess(Readable.from(array), action, options)
}
