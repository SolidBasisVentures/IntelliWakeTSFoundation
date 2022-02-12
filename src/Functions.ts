/**
 * Truncates a string and replaces the remaining characters with ellipsis.
 *
 * @example
 * // returns "Welcome to&hellip;" and shown as "Welcome to..." in HTML
 * Trunc('Welcome to TSFoundation', 11)
 */

/**
 * Replace all occurences of a string.
 *
 * @example
 * // returns "john-doe-bob"
 * ReplaceAll(' ', '-', 'john doe bob')
 */
export const ReplaceAll = function(find: string | string[], replace: string, subject: string | null | undefined): string {
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

export const Trunc = (subject: string, length: number): string => {
	return subject.length > length ? subject.substr(0, length - 1) + '&hellip;' : subject
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
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
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
	
	return ['true', 'active', 'on', 'yes', 'y'].includes(value.toString().toLowerCase().trim())
}

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

export const ArrayToGuidString = (byteArray: any): string => {
	return Array.from(byteArray, function(byte: any) {
		return ('0' + (byte & 0xff).toString(16)).slice(-2)
	})
		.join('')
		.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5')
}

export const StringToByteArray = (str: string): any => {
	let decoded = atob(str)
	let i, il = decoded.length
	let array = new Uint8Array(il)
	
	for (i = 0; i < il; ++i) {
		array[i] = decoded.charCodeAt(i)
	}
	
	return array
}

export const FormUrlEncoded = (x: any) => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')

export const RoundTo = (num: any, decimalPlaces: number = 0, roundDir: 'round' | 'up' | 'down' = 'round') =>
	roundDir === 'round' ? +Math.round((CleanNumber(num) + Number.EPSILON) * (10 ** decimalPlaces)) / (10 ** decimalPlaces)
		: roundDir === 'down' ? +Math.floor((CleanNumber(num) + Number.EPSILON) * (10 ** decimalPlaces)) / (10 ** decimalPlaces) :
			+Math.ceil((CleanNumber(num) + Number.EPSILON) * (10 ** decimalPlaces)) / (10 ** decimalPlaces)

export const ObjectToJSONString = (val: any) => `json:${JSON.stringify(val)}`

export const JSONStringToObject = <T = any>(val: string): T => (!val ? undefined : val === 'json:undefined' ? undefined : val === 'json:null' ? null : JSONParse(val.toString().substr(5))) as T

// noinspection JSPotentiallyInvalidConstructorUsage
/**
 * Is ArrayBuffer
 * @param buf
 */
export const isAB = (buf: ArrayBuffer | string): boolean => buf instanceof (new Uint16Array()).constructor.prototype.__proto__.constructor

/**
 * ArrayBuffer to String
 * @param buf
 */
export const ab2str = (buf: ArrayBuffer | string): string => isAB(buf) ? String.fromCharCode.apply(null, new Uint16Array(buf as ArrayBuffer) as any) as any : buf as any

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
export const findAsync = async <T>(
	array: T[],
	predicate: (t: T) => Promise<boolean>
): Promise<T | undefined> => {
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
export const someAsync = async <T>(
	array: T[],
	predicate: (t: T) => Promise<boolean>
): Promise<boolean> => {
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
export const everyAsync = async <T>(
	array: T[],
	predicate: (t: T) => Promise<boolean>
): Promise<boolean> => {
	for (const t of array) {
		if (!await predicate(t)) {
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
export const filterAsync = async <T>(
	array: T[],
	predicate: (t: T) => Promise<boolean>
): Promise<T[]> => {
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
export const ToArray = <T>(value: T | T[]): T[] => !value ? [] : Array.isArray(value) ? value : [value]

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

export function OmitFalsey<T extends object, K extends Extract<keyof T, string>>(obj: T, ...keys: K[]): Omit<T, K> & Partial<K> {
	let ret: Omit<T, K> & Partial<K> = {...obj}
	const excludeSet: Set<string> = new Set(keys)
	
	for (let key in obj) {
		if (excludeSet.has(key) && !(ret as any)[key]) {
			delete (ret as any)[key]
		}
	}
	
	return ret
}

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

export function RemoveStarting(remove: string | string[] | null | undefined, value: string | null | undefined, recursive = false): string {
	if (!value || !remove) return ''
	
	const arrayRemove = ToArray(remove)
	
	let newValue = value
	
	do {
		for (const aRemove of arrayRemove) {
			if (newValue.startsWith(aRemove)) {
				newValue = newValue.substring(aRemove.length)
			}
		}
	} while (recursive && arrayRemove.some(aRemove => newValue.startsWith(aRemove)))
	
	return newValue
}

export function RemoveEnding(remove: string | string[] | null | undefined, value: string | null | undefined, recursive = false): string {
	if (!value || !remove) return ''
	
	const arrayRemove = ToArray(remove)
	
	let newValue = value
	
	do {
		for (const aRemove of arrayRemove) {
			if (newValue.endsWith(aRemove)) {
				newValue = newValue.substring(0, newValue.length - aRemove.length)
			}
		}
	} while (recursive && arrayRemove.some(aRemove => newValue.endsWith(aRemove)))
	
	return newValue
}

export function CoalesceFalsey<T>(checkVal: T, ...otherVals: T[]): T {
	if (!!checkVal || otherVals.length === 0) return checkVal
	
	for (const otherVal of otherVals) {
		if (!!otherVal) return otherVal
	}
	
	return otherVals[otherVals.length - 1]
}
