import {DateISO, DateOnly, DateOnlyNull, NowISOString, TimeOnly} from './DateManager'
import {CleanNumber, CleanNumberNull, IsOn, JSONParse, ToArray} from './Functions'
import {ToDigits} from './StringManipulation'
import {isNullUndefined} from './SortSearch'

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
export type TObjectConstraint<T extends Record<string, any> = Record<string, any | null>> = Record<
	keyof T,
	TObjectFieldConstraint
>

const ConstrainType = (value: any, fieldConstraint: TObjectFieldConstraint): any => {
	if ((fieldConstraint.nullIfFalsey && !value) || value === null || value === undefined) {
		if (fieldConstraint.nullable || fieldConstraint.nullIfFalsey) {
			return null
		} else {
			return fieldConstraint.type === 'date'
				? DateOnly(fieldConstraint.default ?? 'now')
				: fieldConstraint.type === 'datetime'
				? DateISO(fieldConstraint.default ?? 'now')
				: fieldConstraint.type === 'time'
				? TimeOnly(fieldConstraint.default ?? 'now')
				: fieldConstraint.type === 'number'
				? CleanNumber(fieldConstraint.default)
				: fieldConstraint.type === 'boolean'
				? IsOn(fieldConstraint.default ?? true)
				: fieldConstraint.type === 'object'
				? typeof fieldConstraint.default === 'string'
					? JSONParse(fieldConstraint.default) ?? {}
					: fieldConstraint.default ?? {}
				: (fieldConstraint.default ?? '').toString()
		}
	}

	if (fieldConstraint.type === 'boolean') {
		if (typeof value !== 'boolean') return IsOn(value)
	} else if (fieldConstraint.type === 'number') {
		if (typeof value !== 'number') return fieldConstraint.nullable ? CleanNumberNull(value) : CleanNumber(value)
	} else if (fieldConstraint.type === 'date') {
		return fieldConstraint.nullable ? DateOnlyNull(value) : DateOnly(value)
	} else if (fieldConstraint.type === 'datetime') {
		return fieldConstraint.nullable ? DateISO(value) : DateISO(value) ?? NowISOString()
	} else if (fieldConstraint.type === 'time') {
		return fieldConstraint.nullable ? TimeOnly(value) : TimeOnly(value) ?? '00:00'
	} else if (fieldConstraint.type === 'object') {
		if (typeof value === 'string') return ! JSONParse(value) ?? (!!fieldConstraint.nullable ? null : {})
		if (typeof value !== 'object') return !!fieldConstraint.nullable ? null : {}
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
				const stringVal = value.toString()
				if (!stringVal.includes('.') && value.toString().length > fieldConstraint.length) {
					throw new Error(
						`Value ${value} longer than ${ToDigits(fieldConstraint.length)}, is ${stringVal.length}`
					)
				}

				if (stringVal.toString().length > fieldConstraint.length + 1) {
					const stringWhole = stringVal.split('.')[0]

					if (stringWhole.toString().length > fieldConstraint.length) {
						throw new Error(
							`Whole value ${value} longer than ${ToDigits(fieldConstraint.length)}, is ${
								stringVal.length
							}`
						)
					}

					newValue = CleanNumber(value, fieldConstraint.length - stringWhole.length)

					if (newValue.toString().length > fieldConstraint.length + 1) {
						throw new Error(
							`Value ${newValue} longer than ${ToDigits(fieldConstraint.length)}, is ${
								newValue.toString().length
							}`
						)
					}
				}
		}
	}

	if (!fieldConstraint.nullable || value) {
		if (fieldConstraint.values) {
			if (!fieldConstraint.values.includes(value)) return null
		}

		if (fieldConstraint.minValue !== undefined && fieldConstraint.minValue > value) return fieldConstraint.minValue

		if (fieldConstraint.maxValue !== undefined && fieldConstraint.maxValue < value) return fieldConstraint.maxValue
	}

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

	for (const key of Object.keys(obj) as (keyof T)[]) {
		const fieldConstraint = constraint[key] as TObjectFieldConstraint
		if (fieldConstraint) {
			if (fieldConstraint.isArray) {
				if (!newObj[key] && fieldConstraint.nullable) {
					newObj[key] = null
				} else {
					newObj[key] = ToArray(newObj[key])
						.filter(
							(value) => fieldConstraint.type !== 'number' || (value !== '' && !isNullUndefined(value))
						)
						.map((value) => ConstrainType(value, fieldConstraint))
						.filter(
							(value) =>
								fieldConstraint.arrayAllowFalsey ||
								(fieldConstraint.type === 'number' ? !isNullUndefined(value) : !!value)
						)
						.map((value) => ConstrainOthers(value, fieldConstraint))
						.filter(
							(value) =>
								fieldConstraint.arrayAllowFalsey ||
								(fieldConstraint.type === 'number' ? !isNullUndefined(value) : !!value)
						)
				}
			} else {
				newObj[key] = ConstrainOthers(ConstrainType(newObj[key], fieldConstraint), fieldConstraint)
			}

			if (
				!fieldConstraint.nullIfFalsey &&
				fieldConstraint.nullable &&
				(fieldConstraint.type === 'number' ? isNullUndefined(newObj[key]) || newObj[key] === '' : !newObj[key])
			) {
				if (typeof newObj[key] !== 'boolean') newObj[key] = null
			}

			if (fieldConstraint.nullIfFalsey && !newObj[key]) {
				newObj[key] = null
			}
		} else {
			delete newObj[key]
		}
	}

	for (const key of Object.keys(constraint)) {
		if (!(key in newObj)) {
			const fieldConstraint = constraint[key] as TObjectFieldConstraint
			if (fieldConstraint) {
				newObj[key] = ConstrainOthers(ConstrainType(newObj[key], fieldConstraint), fieldConstraint)
				if (fieldConstraint.isArray && !Array.isArray(newObj[key])) {
					newObj[key] = ToArray(newObj.key)
				}
			}
		}
	}

	return newObj
}

/**
 * Options when converting FormData to an Object
 */
export type TObjectFromFormDataOptions<T extends Record<string, any> = Record<string, any | null>> = {
	excludeColumns?: (keyof T)[]
	includeColumns?: (keyof T)[]
	arrayFormDataItems?: (keyof T)[]
	default?: T
	constraint?: TObjectConstraint<T> | null
}

/**
 * This function transforms FormData into an object of type T. It allows for selective inclusion or
 * exclusion of form data entries and provides functionality for default values and constraints.
 *
 * @template T - The type of the return object. Must extend Record<string, any | null>.
 *               Defaults to Record<string, any | null> if not provided.
 *
 * @param {FormData} formData - The FormData instance to transform into an object.
 * @param {TObjectFromFormDataOptions<T>} [options] - Optional configuration for the transformation.
 *   These options can include default values for keys, include/exclude certain keys, or set certain keys
 *   to be treated as array. It also allows to apply generic constraints on resulting object. If not provided,
 *   all keys and their respective values in the FormData will be included in the returned object.
 *
 * @returns {T} - The transformed input FormData as an object of type T.
 *
 * @example
 *  const formData = new FormData();
 *  formData.append("key1", "value1");
 *  formData.append("key2", "value2");
 *  const options = {
 *    default: {
 *      key1: "default1",
 *      key2: "default2",
 *    },
 *    includeColumns: ["key1"]
 *  };
 *  const obj = ObjectFromFormData(formData, options);
 */
export const ObjectFromFormData = <T extends Record<string, any | null> = Record<string, any | null>>(
	formData: FormData,
	options?: TObjectFromFormDataOptions<T>
): T => {
	let returnObject: any = {}

	if (options?.default) {
		for (const key of Object.keys(options.default).filter((key) => {
			if (options.includeColumns?.includes(key)) return true

			return !options.includeColumns && !options.excludeColumns?.includes(key)
		}) as (keyof T)[]) {
			let data =
				Array.isArray(options.default[key]) || options.arrayFormDataItems?.includes(key)
					? (formData.getAll(key as string) as any) ?? options?.default[key] ?? null
					: (formData.get(key as string) as any)

			if (data !== undefined && typeof options.default[key] === 'boolean') data = IsOn(data)

			if (data !== undefined && typeof options.default[key] === 'number') data = CleanNumber(data)

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

/**
 * Converts an object into a FormData instance. If the input is already an instance of FormData, returns the
 * given FormData instance.
 *
 * @param {Record<string, any> | FormData} obj - An object or FormData instance to be transformed into FormData.
 *
 * @returns {FormData} - The transformed input object as a FormData instance or the input FormData instance itself.
 *
 * @example
 *  const obj = {
 *    key1: "value1",
 *    key2: "value2",
 *  };
 *  const formData = FormDataFromObject(obj);
 *  // formData is now a FormData instance with key1 and key2 appended
 */
export const FormDataFromObject = (obj: Record<string, any> | FormData): FormData => {
	if (obj instanceof FormData) return obj

	const formData = new FormData()

	for (const key of Object.keys(obj)) {
		if (Array.isArray(obj[key])) {
			for (const item of obj[key]) {
				formData.append(key, item)
			}
		} else {
			formData.append(key, obj[key])
		}
	}

	return formData
}
