import {TObjectConstraint} from './ObjectConstraint'

/**
 *
 *
 */
export type TConstaintTest = {
	id: number
	name: string
	start_date: string | null
	ids: number[]
	features: string[]
	salary: number
	is_active: boolean
}

/**
 *
 *
 */
export const ObjectConstraintTest: TObjectConstraint<TConstaintTest> = {
	id: {type: 'number', nullable: false, default: 0},
	name: {type: 'string', nullable: false, default: ''},
	start_date: {type: 'date', nullable: true, default: 'now'},
	ids: {type: 'number', nullable: false, isArray: true},
	features: {type: 'string', nullable: false, isArray: true},
	salary: {type: 'number', nullable: false, minValue: 10000, maxValue: 20000},
	is_active: {type: 'boolean', default: true}
}

/**
 *
 * @constructor
 *
 */
export const TestFormData = (): FormData => {
	const formData = new URLSearchParams()

	formData.append('id', '1')
	formData.append('ids', '0')
	formData.append('ids', '1')
	formData.append('ids', '2')
	formData.append('features', 'One')
	formData.append('features', 'Two')
	formData.append('features', 'Three')
	formData.append('is_active', 'false')

	return formData as FormData
}
