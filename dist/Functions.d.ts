export declare const Trunc: (subject: string, length: number) => string;
/**
 * Returns a google maps link with the given coordinates.
 *
 * @example
 * // returns "http://maps.google.com/maps?q=12345,12345"
 * GoogleMapsGPSLink({latitude: '12345', longitude: '12345'})
 */
export declare const GoogleMapsGPSLink: (dataArray: any, prefix?: string) => string;
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
export declare const GoogleMapsAddressLink: (dataArray: any, prefix?: string) => string;
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
export declare const IsValidInputDecimal: (value: string) => boolean;
/**
 * Generates a unique UID
 */
export declare const GenerateUUID: () => string;
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
export declare const IsOn: (value: any) => boolean;
export interface IAddress {
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    zip: string;
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
export declare const AddressCopy: (fromObject: any, fromPrefix: string, toObject: any, toPrefix: string, includeName?: boolean, includePhone?: boolean, includeTimeZone?: boolean, includeGPS?: boolean) => void;
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
export declare const AddressValid: (address: any, prefix?: string | undefined) => boolean;
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
export declare const AddressSingleRow: (object: any, prefix?: string | undefined) => string;
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
export declare const AddressMultiRow: (object: any, prefix?: string | undefined) => string;
export declare const ArrayToGuidString: (byteArray: any) => string;
export declare const StringToByteArray: (str: string) => any;
export declare const FormUrlEncoded: (x: any) => string;
export declare const RoundTo: (num: any, decimalPlaces?: number) => number;
export declare const ObjectToJSONString: (val: any) => string;
export declare const JSONStringToObject: <T = any>(val: string) => T;
/**
 * Takes in text, and adds an "s" to the end of it if the count is zero or > 1
 * @param text
 * @param count
 * @constructor
 */
export declare const AddS: (text?: string | null | undefined, count?: number | null | undefined) => string;
/**
 * ArrayBuffer to String
 * @param buf
 */
export declare const ab2str: (buf: ArrayBuffer) => string;
/**
 * String to ArrayBuffer
 * @param str
 */
export declare const str2ab: (str: string) => ArrayBuffer;
