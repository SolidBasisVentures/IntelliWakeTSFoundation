type EnumKeys<Enum> = Exclude<keyof Enum, number>

const enumObject = <Enum extends Record<string, number | string>>(e: Enum) => {
	const copy = {...e} as { [K in EnumKeys<Enum>]: Enum[K] }
	Object.values(e).forEach(value => typeof value === 'number' && delete copy[value])
	return copy
}

/**
 *
 * @param e
 * @constructor
 */
export const EnumKeys = <Enum extends Record<string, number | string>>(e: Enum) => {
	return Object.keys(enumObject(e)) as EnumKeys<Enum>[]
}

/**
 *
 * @param e
 * @constructor
 */
export const EnumValues = <Enum extends Record<string, number | string>>(e: Enum) => {
	return [...(new Set(Object.values(enumObject(e))))] as Enum[EnumKeys<Enum>][]
}

/**
 *
 * @param e
 * @param value
 * @constructor
 */
export const EnumKeyFromValue = <Enum extends Record<string, number | string>>(e: Enum, value: Enum[EnumKeys<Enum>] | string | null | undefined): string | undefined =>
	(value === null || value === undefined) ? undefined : Object.keys(e)[Object.values(e).indexOf(value as any)] as unknown as string

/**
 *
 * @param e
 * @param key
 * @constructor
 */
export const EnumValueFromKey = <Enum extends Record<string, number | string>>(e: Enum, key: string | null | undefined): Enum[EnumKeys<Enum>] | undefined =>
	(key === null || key === undefined) ? undefined : Object.values(e)[Object.keys(e).indexOf(key as any)] as unknown as Enum[EnumKeys<Enum>]
