import {TObjectConstraint} from '../src/ObjectConstraint'

export type TConstaintTest = {
	id: number
	name: string
	start_date: string | null
	ids: number[]
	is_active: boolean
}

export const ObjectConstraintTest: TObjectConstraint<TConstaintTest> = {
	id: {type: 'number', nullable: false, default: 0},
	name: {type: 'string', nullable: false, default: ''},
	start_date: {type: 'date', nullable: true, default: 'now'},
	ids: {type: 'number', nullable: false, isArray: true},
	is_active: {type: 'boolean', default: true}
}
