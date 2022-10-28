export const EnumValues = <T extends object>(enumumerator: T): T[] => Object.values(enumumerator) as T[]

export const EnumKeys = <T extends object>(enumerator: T) => Object.keys(enumerator)

export const EnumKeyFromValue = <T extends object>(enumumerator: T, value: T | string): string | undefined => Object.keys(enumumerator)[Object.values(enumumerator).indexOf(value as any)] as unknown as string

export const EnumValueFromKey = <T extends object>(enumumerator: T, value: string): T | undefined => Object.values(enumumerator)[Object.keys(enumumerator).indexOf(value as any)] as unknown as T
