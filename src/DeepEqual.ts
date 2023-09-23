import {DateCompare, DateParseTS} from './DateManager'
import {CleanNumberNull, IsOn} from './Functions'

function isObject(object: any) {
	return object !== null && object !== undefined && typeof object === 'object'
}

/**
 * A JavaScript function that checks whether two inputs are equal, considering only String and Number types. Other types return false. It cleans the input values before comparison using CleanNumberNull function.
 *
 * @param {any} object1 - The first object to compare
 * @param {any} object2 - The second object to compare
 * @returns {boolean} Returns true if the inputs are equal (considering only Strings and Numbers), otherwise false
 *
 * @example
 * StringOrNumberEqual('100', 100) // returns true
 * StringOrNumberEqual('abc', 'abc') // returns true
 * StringOrNumberEqual({a: 1}, {a: 1}) // returns false
 */
export const StringOrNumberEqual = (object1: any, object2: any): boolean => {
	switch (typeof object1) {
		case 'function':
		case 'object':
			return false
		default:
			const cn1 = CleanNumberNull(object1)
			const cn2 = cn1 === null ? null : CleanNumberNull(object2)

			if (cn1 !== null && cn2 !== null) {
				return cn1 == cn2
			}

			return object1 == object2
	}
}

export type TDifferences = Record<string, {val1?: any; val2?: any}>

/**
 * This JavaScript function compares two objects and generates a report of their differences. It only considers an object's own properties and not its inherited properties for the comparison. It used the DeepEqual function to check deep equality.
 *
 * @param {any} object1 - The first object to compare
 * @param {any} object2 - The second object to compare
 * @returns {TDifferences} A JavaScript object representing the differences. Each key-value pair in this object represents a differing key, with an object as its value showing the values in `object1` and `object2` respectively.
 *
 * @example
 *
 * Differences({a: 1, b: 2}, {a: 1, b: 3, c: 4})
 * // returns {b: {val1: 2, val2: 3}, c: {val2: 4}}
 */
export const Differences = (object1: any, object2: any): TDifferences => {
	const differences: TDifferences = {}

	if (isObject(object1)) {
		if (isObject(object2)) {
			Object.keys(object1).forEach((key) => {
				if (key in object2) {
					if (!DeepEqual(object1[key], object2[key])) {
						differences[key] = {val1: object1[key], val2: object2[key]}
					}
				} else {
					differences[key] = {val1: object1[key]}
				}
			})
			Object.keys(object2)
				.filter((key) => !(key in object1))
				.forEach((key) => {
					differences[key] = {val2: object2[key]}
				})
		} else {
			Object.keys(object1).forEach((key) => {
				differences[key] = {val1: object1[key]}
			})
		}
	} else {
		if (isObject(object2)) {
			Object.keys(object2).forEach((key) => {
				differences[key] = {val1: object2[key]}
			})
		}
	}

	return differences
}

/**
 * A JavaScript function that deeply compares two objects, whether they are primitive types, arrays, or complex objects. It functions recursively to navigate compound objects and arrays. It has special conditions to account for dates and React.
 *
 * @param object1 First object to compare. Can be of any type
 * @param object2 Second object to compare. Can be of any type
 * @returns {boolean} returns true if objects are deeply identical, false otherwise
 *
 * @example
 * DeepEqual({a: 1, b: 2}, {a: 1, b: 2}) // returns true
 * DeepEqual([1, 2, 3], [1, 2, 4]) // returns false
 * DeepEqual({a: {b: 1}}, {a: {b: 1}}) // returns true
 */
export const DeepEqual = (object1: any, object2: any): boolean => {
	if (object1 === undefined && object2 === undefined) return true
	if (object1 === null && object2 === null) return true

	if ((!object1 && !!object2) || (!!object1 && !object2) /* || typeof object1 !== typeof object2*/) return false
	if (Array.isArray(object1)) {
		if (object1.length !== object2.length) return false

		for (let i = 0; i < object1.length; i++) {
			if (!DeepEqual(object1[i], object2[i])) return false
		}

		return true
	}

	switch (typeof object1) {
		case 'function':
			return typeof object2 === 'function'
		case 'object':
			if (typeof object2 !== 'object') return false

			if (typeof object1 === 'object' && (object1 as any).type?.toString().includes('react.')) return true
			if (typeof object2 === 'object' && (object2 as any).type?.toString().includes('react.')) return true

			const keys1 = Object.keys(object1)
			const keys2 = Object.keys(object2)

			if (keys1.length !== keys2.length) {
				return false
			}

			for (const key of keys1) {
				if (!DeepEqual(object1[key], object2[key])) {
					return false
				}
			}

			return true
		case 'string': {
			if (typeof object2 === 'string' && (object1.includes('-') || object1.includes('/'))) {
				const ts1 = DateParseTS(object1)
				if (!!ts1) {
					const ts2 = DateParseTS(object2)
					if (!!ts2) {
						return DateCompare(ts1, 'IsSame', ts2, 'second')
					}
				}
			}

			return StringOrNumberEqual(object1, object2)
		}
		default:
			return StringOrNumberEqual(object1, object2)
	}
}

/**
 * A JavaScript function that checks whether the first object (subset) is a subset of the second object (superset). This deep comparison function handles multiple types including: arrays, functions, booleans, objects, and strings.
 *
 * @param {any} subset - The object that is checked to see if it is a subset
 * @param {any} superset - The object that is being checked against
 * @returns {boolean} Returns true if the subset is indeed a subset of the superset, otherwise false.
 *
 * @example
 * SubsetEqual({a: 1}, {a: 1, b: 2}) // returns true
 * SubsetEqual({a: 1, b: 2}, {a: 1}) // returns false
 * SubsetEqual('abc', 'abc') // returns true
 * SubsetEqual('abc', 'def') // returns false
 */
export const SubsetEqual = (subset: any, superset: any): boolean => {
	if (subset === undefined && superset === undefined) return true
	if (subset === null && superset === null) return true

	if ((!subset && !!superset) || (!!subset && !superset)) return false

	if (Array.isArray(subset)) {
		if (subset.length !== superset.length) return false

		for (let i = 0; i < subset.length; i++) {
			if (!SubsetEqual(subset[i], superset[i])) return false
		}

		return true
	}

	switch (typeof subset) {
		case 'function':
			return true
		case 'boolean':
			return IsOn(subset) === IsOn(superset)
		case 'object':
			if (typeof subset === 'object' && (subset as any).type?.toString().includes('react.')) return true
			if (typeof superset === 'object' && (superset as any).type?.toString().includes('react.')) return true

			const keysSub = Object.keys(subset)

			for (const key of keysSub) {
				if (!SubsetEqual(subset[key], superset[key])) return false
			}

			return true
		case 'string':
			if (typeof superset === 'boolean') {
				return IsOn(subset) === IsOn(superset)
			}

			if (typeof superset === 'string') {
				const ts1 = DateParseTS(subset)
				if (!!ts1) {
					const ts2 = DateParseTS(superset)
					if (!!ts2) {
						return DateCompare(ts1, 'IsSame', ts2, 'second')
					}
				}
			}

			if (typeof superset === 'number') {
				const cn1 = CleanNumberNull(subset)
				if (cn1 !== null) return superset === cn1
			}

			return subset == superset
		case 'number':
			if (typeof superset === 'string') {
				const cn1 = CleanNumberNull(superset)
				if (cn1 !== null) return subset === cn1
			}

			return subset == superset
		default:
			return subset == superset
	}
}

/**
 * Compares two objects that are forms, checking whether the first object (subset) is a subset of the second object (superset).
 * In a form context, it considers empty strings and null values as equal, as well as the string 'false' and the boolean value false.
 * Accepts arrays and deep-comparison of primitives (string, boolean, number, undefined and null) and objects.
 * Returns true if the first object is a subset of the second object. Returns false otherwise, also in case of different types.
 *
 * @param {any} subset - The object that might be a subset
 * @param {any} superset - The object to compare against
 * @returns {boolean} - The result of the subset comparison
 *
 * @example
 * SubsetFormEqual({a: 1}, {a: 1, b: 2}); // returns true
 * SubsetFormEqual({a: 1, b: 2}, {a: 1}); // returns false
 * SubsetFormEqual('abc', 'abc'); // returns true
 * SubsetFormEqual('abc', 'def'); // returns false
 * SubsetFormEqual('', null); // returns true
 * SubsetFormEqual('false', false); // returns true
 */
export const SubsetFormEqual = (subset: any, superset: any): boolean => {
	if (subset === undefined && superset === undefined) return true
	if (subset === null && superset === null) return true

	if ((subset === '' && superset === null) || (subset === null && superset === '')) return true
	if ((subset === 'false' && !superset) || (!subset && superset === 'false')) return true

	if ((!subset && !!superset) || (!!subset && !superset)) return false

	if (Array.isArray(subset)) {
		if (subset.length !== superset.length) return false

		for (let i = 0; i < subset.length; i++) {
			if (!SubsetFormEqual(subset[i], superset[i])) return false
		}

		return true
	}

	switch (typeof subset) {
		case 'function':
			return true
		case 'boolean':
			return IsOn(subset) === IsOn(superset)
		case 'object':
			if (typeof subset === 'object' && (subset as any).type?.toString().includes('react.')) return true
			if (typeof superset === 'object' && (superset as any).type?.toString().includes('react.')) return true

			const keysSub = Object.keys(subset)

			for (const key of keysSub) {
				if (!SubsetFormEqual(subset[key], superset[key])) return false
			}

			return true
		case 'string':
			if (typeof superset === 'boolean') {
				return IsOn(subset) === IsOn(superset)
			}

			if (typeof superset === 'string') {
				if (subset.includes('-') || subset.includes('/')) {
					const ts1 = DateParseTS(subset)
					if (!!ts1) {
						if (superset.includes('-') || superset.includes('/')) {
							const ts2 = DateParseTS(superset)
							if (!!ts2) {
								return DateCompare(ts1, 'IsSame', ts2, 'second')
							}
						}
					}
				}
			}

			if (typeof superset === 'number') {
				const cn1 = CleanNumberNull(subset)
				if (cn1 !== null) return superset === cn1
			}

			return subset == superset
		case 'number':
			if (typeof superset === 'string') {
				const cn1 = CleanNumberNull(superset)
				if (cn1 !== null) return subset === cn1
			}

			return subset == superset
		default:
			return subset == superset
	}
}

/**
 * Deep clone function for both primitive and reference data types including objects and arrays.
 *
 * @param {T} obj - The object to be cloned
 * @returns {T} - The cloned object.
 */
export function DeepClone<T>(obj: T): T {
	if (!obj) return obj

	// Handle Date
	if (obj instanceof Date) return new Date(obj.valueOf()) as unknown as T

	// Handle Array
	if (obj instanceof Array) {
		const copy = []
		for (let i = 0, len = obj.length; i < len; i++) {
			copy[i] = DeepClone(obj[i])
		}
		return copy as unknown as T
	}

	// Handle Object
	if (obj instanceof Object) {
		const copy = {}
		for (let attr in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, attr)) copy[attr as any] = DeepClone(obj[attr])
		}
		return copy as T
	}

	return obj
}
