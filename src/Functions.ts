import {DateDiffLongDescription} from './DateManager'

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
 *
 * @param values
 * @constructor
 */
export const GreaterNumberNull = (...values: (any | any[])[]): number | null =>
	ValidNumbers(values).reduce<number | null>(
		(result, value) => (result === null || value > result ? value : result),
		null
	)

/**
 *
 * @param values
 * @constructor
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
 *
 * @param values
 * @constructor
 */
export const LeastNumber = (...values: (any | any[])[]): number => LeastNumberNull(...values) ?? 0

/**
 *
 * @param values
 * @constructor
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
 *
 * @param decimals
 * @param values
 * @constructor
 */
export const AverageNumberNull = (decimals: number, ...values: (any | any[])[]): number | null => {
	const valids = ValidNumbers(values)

	if (valids.length === 0) return null

	return CleanNumber(CleanNumbers(decimals, valids) / valids.length, decimals)
}

/**
 *
 * @param decimals
 * @param values
 * @constructor
 */
export const AverageNumber = (decimals: number, ...values: (any | any[])[]): number =>
	AverageNumberNull(decimals, ...values) ?? 0

/**
 *
 * @param numerator
 * @param denominator
 * @param decimals
 * @constructor
 */
export const CleanDivideNull = (numerator: any, denominator: any, decimals?: number): number | null => {
	if (numerator === undefined || numerator === null) return null

	const useDenominator = CleanNumber(denominator)

	if (useDenominator === 0) return null

	return decimals !== undefined
		? CleanNumber(CleanNumber(numerator) / useDenominator, decimals)
		: CleanNumber(numerator) / useDenominator
}

/**
 *
 * @param numerator
 * @param denominator
 * @param decimals
 * @constructor
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
	if (value === undefined || value === null) return null

	let parsed = CleanNumber(value, roundClean, true)

	if (isNaN(parsed)) return null

	return parsed
}

/**
 * A wrapper function for JSON.parse with try/catch.
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

/**
 * Determines a value is active or on. Returns true when the value
 * is one of the following:
 * 'true', 'active', 'on', 'yes', 'y'
 *
 * @example
 * // return true
 * IsOn('active')
 *
 * // return false
 * IsOn('inactive')
 */
export const IsOn = (value: any): boolean => {
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

	return ['true', 'active', 'on', 'yes', 'y', 't'].includes(value.toString().toLowerCase().trim())
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
	if (!!(object[usePrefix + 'zip'] ?? '')) singleRow += '  ' + object[usePrefix + 'zip']

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
	if (!!(object[usePrefix + 'zip'] ?? '')) multiRow += '  ' + object[usePrefix + 'zip']

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
		const validIdx = values.findIndex((val) => !!val)
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
