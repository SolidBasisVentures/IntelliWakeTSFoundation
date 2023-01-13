import {DateISO, DateOnly, DateOnlyNull, NowISOString, TimeOnly} from './DateManager'
import {CleanNumber, CleanNumberNull, IsOn, ToArray} from './Functions'

export type TObjectFieldConstraint = {
	type?: 'boolean' | 'string' | 'number' | 'date' | 'datetime' | 'time' | 'object'
	nullable?: boolean
	nullIfFalsey?: boolean
	default?: any
	length?: number
	precision?: number
	values?: any[]
	minValue?: any
	maxValue?: any
	isArray?: boolean
	arrayAllowFalsey?: boolean
}

export type TObjectConstraint<T extends Record<string, any> = Record<string, any | null>> = Record<keyof T, TObjectFieldConstraint>

const ConstrainType = (value: any, fieldConstraint: TObjectFieldConstraint): any => {
	if ((fieldConstraint.nullIfFalsey && !value) || value === null || value === undefined) {
		if (fieldConstraint.nullable || fieldConstraint.nullIfFalsey) {
			return null
		} else {
			return fieldConstraint.type === 'date' ? DateOnly(fieldConstraint.default ?? 'now') :
				fieldConstraint.type === 'datetime' ? DateISO(fieldConstraint.default ?? 'now') :
					fieldConstraint.type === 'time' ? TimeOnly(fieldConstraint.default ?? 'now') :
						fieldConstraint.type === 'number' ? CleanNumber(fieldConstraint.default) :
							fieldConstraint.type === 'boolean' ? IsOn(fieldConstraint.default ?? true) :
								fieldConstraint.type === 'object' ? (fieldConstraint.default ?? {}) :
									(fieldConstraint.default ?? '').toString()
		}
	}

	if (fieldConstraint.type === 'boolean') {
		if (typeof value !== 'boolean') return IsOn(value)
	} else if (fieldConstraint.type === 'number') {
		if (typeof value !== 'number') return fieldConstraint.nullable ? CleanNumberNull(value) : CleanNumber(value)
	} else if (fieldConstraint.type === 'date') {
		return fieldConstraint.nullable ? DateOnlyNull(value) : DateOnly(value)
	} else if (fieldConstraint.type === 'datetime') {
		return fieldConstraint.nullable ? DateISO(value) : (DateISO(value) ?? NowISOString())
	} else if (fieldConstraint.type === 'time') {
		return fieldConstraint.nullable ? TimeOnly(value) : (TimeOnly(value) ?? '00:00')
	} else if (fieldConstraint.type === 'object') {
		if (typeof value !== 'object') return {}
	} else {
		if (typeof value !== 'string') return !value ? '' : value.toString()
	}

	return value
}

export const ConstrainObject = <T extends Record<string, any | null>>(obj: T, constraint: TObjectConstraint<T>): T => {
	const newObj = obj as any

	for (const key of (Object.keys(obj) as (keyof T)[])) {
		const fieldConstraint = constraint[key] as TObjectFieldConstraint
		if (fieldConstraint) {
			if (fieldConstraint.isArray) {
				newObj[key] = ToArray(newObj[key])
					.map(value => ConstrainType(value, fieldConstraint))
					.filter(value => fieldConstraint.arrayAllowFalsey || !!value)
			} else {
				newObj[key] = ConstrainType(newObj[key], fieldConstraint)
			}
		}
	}

	return newObj
}
