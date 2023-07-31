type EnumKeys<Enum> = Exclude<keyof Enum, number>

/**
 * A utility function that takes an enumeration as input and returns a new object,
 * with the keys and values from the original enumeration.
 * The returned object will only contain entries where the value is a string.
 *
 * @template Enum The enumeration object.
 * @param {Enum} e The object from which to create the new object.
 * @return { { [K in EnumKeys<Enum>]: Enum[K] } } The new object that contains only
 * string value entries from the original enumeration.
 *
 * @example
 *   const Gender = {
 *     Male: 'm',
 *     Female: 'f',
 *     Unknown: 0
 *   }
 *
 *   const copy = enumObject(Gender)
 *   // copy => { Male: 'm', Female: 'f' }
 */
const enumObject = <Enum extends Record<string, number | string>>(e: Enum) => {
	const copy = {...e} as {[K in EnumKeys<Enum>]: Enum[K]}
	Object.values(e).forEach((value) => typeof value === 'number' && delete copy[value])
	return copy
}

/**
 * A utility function that takes an enumeration as input and returns an array
 * of keys from the enumeration. The returned array will only contain keys of
 * entries where the value is a string.
 *
 * @template Enum The enumeration type.
 * @param {Enum} e The enumeration from which to retrieve the keys.
 * @return {EnumKeys<Enum>[]} An array of keys from the enumeration.
 *
 * @example
 *   const Gender = {
 *     Male: 'm',
 *     Female: 'f',
 *     Unknown: 0
 *   }
 *
 *   const keys = EnumKeys(Gender)
 *   // keys => ['Male', 'Female']
 */
export const EnumKeys = <Enum extends Record<string, number | string>>(e: Enum) => {
	return Object.keys(enumObject(e)) as EnumKeys<Enum>[]
}

/**
 * A utility function that takes an enumeration as an input and returns an array
 * of unique values from the enumeration. The returned array will only contain
 * values of entries where the value is a string.
 *
 * @template Enum The enumeration type.
 * @param {Enum} e The enumeration from which to retrieve the values.
 * @return {Enum[EnumKeys<Enum>][]} An array of unique values from the enumeration.
 *
 * @example
 *   const Gender = {
 *     Male: 'm',
 *     Female: 'f',
 *     Unknown: 0
 *   }
 *
 *   const values = EnumValues(Gender)
 *   // values => ['m', 'f']
 */
export const EnumValues = <Enum extends Record<string, number | string>>(e: Enum) => {
	return [...new Set(Object.values(enumObject(e)))] as Enum[EnumKeys<Enum>][]
}

/**
 * A utility function that, given an enumeration and a value, returns the key
 * corresponding to that value in the enumeration. Returns undefined if the value
 * is null, undefined, or not present in the enumeration.
 *
 * @template Enum The enumeration type.
 * @param {Enum} e The enumeration to locate the value in.
 * @param {Enum[EnumKeys<Enum>] | string | null | undefined} value The value to get the key for.
 * @return {string | undefined} The corresponding key from the enumeration, or undefined
 * if the value is null, undefined, or not present in the enumeration.
 *
 * @example
 *   const Gender = {
 *     Male: 'm',
 *     Female: 'f',
 *     Unknown: 0
 *   }
 *
 *   const key = EnumKeyFromValue(Gender, 'f')
 *   // key => 'Female'
 */
export const EnumKeyFromValue = <Enum extends Record<string, number | string>>(
	e: Enum,
	value: Enum[EnumKeys<Enum>] | string | null | undefined
): string | undefined =>
	value === null || value === undefined
		? undefined
		: (Object.keys(e)[Object.values(e).indexOf(value as any)] as unknown as string)

/**
 * A utility function that, given an enumeration and a key, returns the value
 * corresponding to that key within the enumeration. Returns undefined if the key
 * is null, undefined, or not present in the enumeration.
 *
 * @template Enum The enumeration type.
 * @param {Enum} e The enumeration to locate the key in.
 * @param {string | null | undefined} key The key to retrieve the value for.
 * @return {Enum[EnumKeys<Enum>] | undefined} The corresponding value from the enumeration,
 * or undefined if the key is null, undefined, or not present in the enumeration.
 *
 * @example
 *   const Gender = {
 *     Male: 'm',
 *     Female: 'f',
 *     Unknown: 0
 *   }
 *
 *   const value = EnumValueFromKey(Gender, 'Female')
 *   // value => 'f'
 */
export const EnumValueFromKey = <Enum extends Record<string, number | string>>(
	e: Enum,
	key: string | null | undefined
): Enum[EnumKeys<Enum>] | undefined =>
	key === null || key === undefined
		? undefined
		: (Object.values(e)[Object.keys(e).indexOf(key as any)] as unknown as Enum[EnumKeys<Enum>])

/**
 * A utility function that checks if a given value is a valid value within a
 * given enumeration. The function returns true if the value is found within
 * the enumeration; otherwise, it returns false.
 *
 * @template Enum The enumeration type.
 * @param {Enum} e The enumeration to check within.
 * @param {Enum[EnumKeys<Enum>] | string | null | undefined} value The value to validate.
 * @return {boolean} true if the value is found within the enumeration, false otherwise.
 *
 * @example
 *   const Gender = {
 *     Male: 'm',
 *     Female: 'f',
 *     Unknown: 0
 *   }
 *
 *   const isValidMale = EnumValidValue(Gender, 'm') => true
 *   const isValidOther = EnumValidValue(Gender, 'x') => false
 */
export function EnumValidValue<Enum extends Record<string, number | string>>(
	e: Enum,
	value: Enum[EnumKeys<Enum>] | string | null | undefined
) {
	return !!value && EnumValues(e).some((val) => val === value)
}
