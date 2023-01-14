import {DateISO, DateOnly, DateOnlyNull, NowISOString, TimeOnly} from './DateManager'
import {CleanNumber, CleanNumberNull, IsOn, ToArray} from './Functions'
import {ToDigits} from './StringManipulation'

/**
 * Defines the constraints to be placed on a field of an object
 */
export type TObjectFieldConstraint = {
	type?: 'boolean' | 'string' | 'number' | 'date' | 'datetime' | 'time' | 'object'
	nullable?: boolean
	nullIfFalsey?: boolean
	default?: any
	length?: number
	// precision?: number
	values?: any[]
	minValue?: any
	maxValue?: any
	isArray?: boolean
	arrayAllowFalsey?: boolean
}

/**
 * Defines the constraints to be placed on an object
 */
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

const ConstrainOthers = (value: any, fieldConstraint: TObjectFieldConstraint): any => {
	let newValue = value

	if (fieldConstraint.length && value) {
		switch (typeof value) {
			case 'string':
				newValue = value.substring(0, fieldConstraint.length)
				break
			case 'number':
				if (value.toString().length > fieldConstraint.length) {
					throw new Error(`Value ${value} longer than ${ToDigits(fieldConstraint.length)}`)
				}
		}
	}

	if (fieldConstraint.values) {
		if (!fieldConstraint.values.includes(value)) return null
	}

	if (fieldConstraint.minValue !== undefined && fieldConstraint.minValue > value) return fieldConstraint.minValue

	if (fieldConstraint.maxValue !== undefined && fieldConstraint.maxValue < value) return fieldConstraint.maxValue

	return newValue
}

/**
 * Takes an object and returns an object that matches the types provided by the constraint
 *
 * @param obj
 * @param constraint
 * @constructor
 */
export const ConstrainObject = <T extends Record<string, any | null>>(obj: T, constraint: TObjectConstraint<T>): T => {
	const newObj = obj as any

	for (const key of (Object.keys(obj) as (keyof T)[])) {
		const fieldConstraint = constraint[key] as TObjectFieldConstraint
		if (fieldConstraint) {
			if (fieldConstraint.isArray) {
				newObj[key] = ToArray(newObj[key])
					.map(value => ConstrainType(value, fieldConstraint))
					.filter(value => fieldConstraint.arrayAllowFalsey || !!value)
					.map(value => ConstrainOthers(value, fieldConstraint))
					.filter(value => fieldConstraint.arrayAllowFalsey || !!value)
			} else {
				newObj[key] = ConstrainOthers(ConstrainType(newObj[key], fieldConstraint), fieldConstraint)
			}
		}
	}

	return newObj
}

export type TObjectFromFormDataOptions<T extends Record<string, any> = Record<string, any | null>> = {
	excludeColumns?: (keyof T)[]
	includeColumns?: (keyof T)[]
	arrayFormDataItems?: (keyof T)[]
	default?: T
	constraint?: TObjectConstraint<T>
}

/**
 * Converts FormData to an object... Recommend using "constraint" option
 *
 * @param formData
 * @param options
 * @constructor
 */
export const ObjectFromFormData = <T extends Record<string, any | null> = Record<string, any | null>>(formData: FormData, options?: TObjectFromFormDataOptions<T>): T => {
	let returnObject: any = {}

	if (options?.default) {
		for (const key of Object.keys(options.default).filter(key => {
			if (options.includeColumns?.includes(key)) return true

			return !options.includeColumns && !options.excludeColumns?.includes(key)
		}) as (keyof T)[]) {
			let data = (Array.isArray(options.default[key]) || options.arrayFormDataItems?.includes(key))
				? formData.getAll(key as string) as any ?? options?.default[key] ?? null
				: formData.get(key as string) as any

			if (data !== undefined && typeof options.default[key] === 'boolean')
				data = IsOn(data)

			if (data !== undefined && typeof options.default[key] === 'number')
				data = CleanNumber(data)

			returnObject[key] = data ?? options?.default[key] ?? null
		}
	} else {
		formData.forEach((value, key) => {
			const all = formData.getAll(key)
			if (Array.isArray(all) && all.length > 1) {
				returnObject[key] = all
			} else {
				returnObject[key] = value
			}
		})
	}

	if (options?.constraint) {
		returnObject = ConstrainObject(returnObject, options.constraint)
	}

	return returnObject
}
