import {CleanNumber, CleanNumberNull, ToArray} from './Functions'
import {DateCompare, DateOnlyNull} from './DateManager'


export enum EDefaultCheck {
	Required = 'Required',
	AtLeast1Character = 'AtLeast1Character',
	AtLeast5Characters ='AtLeast5Characters',
	GreaterThan0 ='GreaterThan0',
	GreaterOrEqual0 = 'GreaterOrEqual0',
	IsDate = 'IsDate',
	IsPastDate = 'IsPastDate',
	IsFutureDate = 'IsFutureDate',
	IsNumber = 'IsNumber',
	IsEmail = 'IsEmail'
}

export type TObjectFieldValidator<T extends Record<string, any> = Record<string, any | null>> =
	({[key in EDefaultCheck]?: string}) |
	((val: any, vals: T) => string | null) |
	(({[key in EDefaultCheck]?: string}) | ((val: any, vals: T) => string | null))[]

export type TObjectValidator<T extends Record<string, any> = Record<string, any | null>> = Partial<Record<
	keyof T,
	TObjectFieldValidator<T>
>>

export type TObjectValidatorErrors<T extends Record<string, any> = Record<string, any | null>> =
	Partial<Record<keyof T, string[]>>


// Validator function (obj with data, validator object)
export const Validator = <T extends Record<string, any | null>>(data: T, objectValidator: TObjectValidator<T>): TObjectValidatorErrors<T> => {
	let errors: TObjectValidatorErrors<T> = {}

	/*if ('id' in errors) {
		errors[field].push('Second error')
	} else {
		errors[field] = ['This is an error']
	}*/

	const fields = Object.keys(objectValidator) as (keyof  typeof objectValidator)[]
	for (const field of fields) {
		if(field in objectValidator) {
			const validations = ToArray(objectValidator[field] as any) as TObjectFieldValidator<T>[]
			for (const validation of validations) {
				if (typeof validation === 'function') {
					const result = validation(data[field], data)
					if (!!result) {
						if(field in errors) {
							console.log(result,field, 'funcif')
							errors?[field].push(result as never) : ''
						}
						else{
							console.log(result ,field, 'funcelse')
							errors[field] = [result]
						}
					}
				} else {
					const defaultChecks = Object.keys(validation) as (keyof typeof validation)[]
					for (const defaultCheck of defaultChecks) {
						switch (defaultCheck) {
							case EDefaultCheck.Required:
								if (!data[field]) {
									if (field in errors) {
										console.log(validation[defaultCheck],field, '1if')
										errors?[field].push(validation[defaultCheck]) : ''
									} else {
										errors[field] = [validation[defaultCheck]]
										console.log(validation[defaultCheck],field, '1else')
									}
								}
								//console.log(validation[defaultCheck],field, '1none')
								break

							case EDefaultCheck.AtLeast1Character:
								if ((data[field]?.length ?? 0) < 1) {
									if (field in errors) {
										 console.log(validation[defaultCheck],field, '2if')
										errors?['id'].push(validation[defaultCheck]): ''
									} else {
										errors[field] = [validation[defaultCheck]]
										console.log(validation[defaultCheck],field, '2else')
									}
								}
								//console.log(validation[defaultCheck],field, '2none')
								break

							case EDefaultCheck.AtLeast5Characters:
								if ((data[field]?.length ?? 0) < 5) {
									if (field in errors) {
										errors ? [field].push(validation[defaultCheck]) : ''
									} else {
										errors[field] = [validation[defaultCheck]]
									}
								}
								break

							case EDefaultCheck.GreaterThan0:
								if (CleanNumber(data[field]) <= 0) {
									if (field in errors) {
										errors ? [field].push(validation[defaultCheck]) : ''
									} else {
										errors[field] = [validation[defaultCheck]]
									}
								}
								break

							case EDefaultCheck.GreaterOrEqual0:
								if (CleanNumber(data[field]) < 0) {
									if (field in errors) {
										errors ? [field].push(validation[defaultCheck]) : ''
									} else {
										errors[field] = [validation[defaultCheck]]
									}
								}
								break

							case EDefaultCheck.IsDate:
								if (!DateOnlyNull(data[field])) {
									if (field in errors) {
										errors ? [field].push(validation[defaultCheck]) : ''
									} else {
										errors[field] = [validation[defaultCheck]]
									}
								}
								break

							case EDefaultCheck.IsPastDate:
								if (!DateCompare(data[field], 'IsBefore', 'now', 'millisecond')) {
									if (field in errors) {
										errors ? [field].push(validation[defaultCheck]) : ''
									} else {
										errors[field] = [validation[defaultCheck]]
									}
								}
								break

							case EDefaultCheck.IsFutureDate:
								if (!DateCompare(data[field], 'IsAfter', 'now', 'millisecond')) {
									if (field in errors) {
										errors ? [field].push(validation[defaultCheck]) : ''
									} else {
										errors[field] = [validation[defaultCheck]]
									}
								}
								break

							case EDefaultCheck.IsNumber:
								if (CleanNumberNull(data[field]) === null) {
									if (field in errors) {
										errors ? [field].push(validation[defaultCheck]) : ''
									} else {
										errors[field] = [validation[defaultCheck]]
									}
								}
								break

							case EDefaultCheck.IsEmail:
								if (!(/@.*\./.test(data[field]))) {
									if(field in errors) {
										errors?[field].push(validation[defaultCheck]) : ''
									}
									else{
										errors[field] = [validation[defaultCheck]]
									}
								}
								break
						}
						console.log(errors)
					}
				}
			}
		}
	}
	return errors
}


