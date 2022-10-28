type EnumKeys<Enum> = Exclude<keyof Enum, number>

const enumObject = <Enum extends Record<string, number | string>>(e: Enum) => {
	const copy = {...e} as { [K in EnumKeys<Enum>]: Enum[K] }
	Object.values(e).forEach(value => typeof value === 'number' && delete copy[value])
	return copy
}

export const EnumKeys = <Enum extends Record<string, number | string>>(e: Enum) => {
	return Object.keys(enumObject(e)) as EnumKeys<Enum>[]
}

export const EnumValues = <Enum extends Record<string, number | string>>(e: Enum) => {
	return [...(new Set(Object.values(enumObject(e))))] as Enum[EnumKeys<Enum>][]
}

export const EnumKeyFromValue = <Enum extends Record<string, number | string>>(e: Enum, value: Enum[EnumKeys<Enum>] | string | null | undefined): string | undefined => !value ? undefined : Object.keys(e)[Object.values(e).indexOf(value as any)] as unknown as string

export const EnumValueFromKey = <Enum extends Record<string, number | string>>(e: Enum, key: string | null | undefined): Enum[EnumKeys<Enum>] | undefined => !key ? undefined : Object.values(e)[Object.keys(e).indexOf(key as any)] as unknown as Enum[EnumKeys<Enum>]
