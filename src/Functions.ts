/**
 * Truncates a string and replaces the remaining characters with ellipsis.
 *
 * @example
 * // returns "Welcome to&hellip;" and shown as "Welcome to..." in HTML
 * Trunc('Welcome to TSFoundation', 11)
 */
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
	let address = (dataArray[prefix + 'address1'] ?? '') + ' '
	if (dataArray[prefix + 'address2']) {
		address += dataArray[prefix + 'address2'] + ' '
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

export type TFindIsActive = boolean | null

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
 *   city: 'Burr Ridge',
 *   state: 'IL',
 *   zip: '61257',
 * }
 *
 * // returns "Blk 1, Lot 2, Some Street, Burr Ridge, IL  61257"
 * AddressSingleRow(address1)
 */
export const AddressSingleRow = (object: any, prefix?: string): string => {
	const usePrefix = prefix ?? ''
	
	let singleRow = (object[usePrefix + 'address_1'] ?? '').trim()
	
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
