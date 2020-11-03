export const Trunc = (subject: string, length: number): string => {
	return subject.length > length ? subject.substr(0, length - 1) + '&hellip;' : subject
}

export const GoogleMapsGPSLink = (dataArray: any, prefix: string = ''): string => {
	const latitude = dataArray[prefix + 'latitude'] ?? ''
	let longitude = dataArray[prefix + 'longitude'] ?? ''
	return 'http://maps.google.com/maps?q=' + latitude + ',' + longitude
}

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

export const IsValidInputDecimal = (value: string): boolean => {
	// noinspection RegExpUnexpectedAnchor
	const regEx = new RegExp('/^\\d{1,}(\\.\\d{0,4})?$/')

	return !value || regEx.test(value)
}

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
 *
 * @param value
 * @constructor
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
	if (includeName && !!fromObject[toPrefix + 'name']) {
		toObject[toPrefix + 'name'] = fromObject[fromPrefix + 'name']
	}
	toObject[toPrefix + 'address_1'] = fromObject[fromPrefix + 'address_1']
	toObject[toPrefix + 'address_2'] = fromObject[fromPrefix + 'address_2']
	toObject[toPrefix + 'city'] = fromObject[fromPrefix + 'city']
	toObject[toPrefix + 'state'] = fromObject[fromPrefix + 'state']
	toObject[toPrefix + 'zip'] = fromObject[fromPrefix + 'zip']
	if (includePhone && !!fromObject[toPrefix + 'phone']) {
		toObject[toPrefix + 'phone'] = fromObject[fromPrefix + 'phone']
	}
	if (includeTimeZone && !!fromObject[toPrefix + 'timezone']) {
		toObject[toPrefix + 'timezone'] = fromObject[fromPrefix + 'timezone']
	}
	if (includeGPS && !!fromObject[toPrefix + 'latitude']) {
		toObject[toPrefix + 'latitude'] = fromObject[fromPrefix + 'latitude']
	}
	if (includeGPS && !!fromObject[toPrefix + 'longitude']) {
		toObject[toPrefix + 'longitude'] = fromObject[fromPrefix + 'longitude']
	}
}

export const AddressValid = (address: any, prefix?: string): boolean => {
	return !!address[(prefix ?? '') + 'address_1']
}

export const AddressSingleRow = (object: any, prefix?: string): string => {
	const usePrefix = prefix ?? ''

	let singleRow = (object[usePrefix + 'address_1'] ?? '').trim()

	if (!!(object[usePrefix + 'city'] ?? '')) singleRow += ', ' + object[usePrefix + 'city']
	if (!!(object[usePrefix + 'state'] ?? '')) singleRow += ', ' + object[usePrefix + 'state']
	if (!!(object[usePrefix + 'zip'] ?? '')) singleRow += ', ' + object[usePrefix + 'zip']

	return singleRow
}

