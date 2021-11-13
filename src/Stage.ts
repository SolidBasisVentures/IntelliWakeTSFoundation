import {UCWords} from './StringManipulation'

export enum Stages {
	Local = 'local',
	Migrate = 'migrate',
	Dev = 'dev',
	Test = 'test',
	QA = 'qa',
	Demo = 'demo',
	ProdSupport = 'prodsupport',
	Prod = 'prod'
}

/**
 * Determines whether the app in a particular stage.
 *
 * @example
 * // If the app is in 'local', it returns true
 * IsStage('local')
 */
export const IsStage = (stages: Stages | Stages[]): boolean => {
	let envs: Stages[]

	if (typeof stages === 'string') {
		envs = [stages as Stages]
	} else {
		envs = stages as Stages[]
	}

	return !!envs.find((env) => GetStage() === env)
}

/**
 */
export const GetStage = (): Stages => {
	return (process.env.SVELTE_APP_STAGE ?? process.env.REACT_APP_STAGE ?? process.env.STAGE ?? Stages.Local) as Stages
}

/**
 * Returns the full name of the stage.
 * @example
 * // return Development
 * GetStageName('dev')
 */
export const GetStageName = (stage?: Stages): string => {
	const workingStage = stage ?? GetStage()

	switch (workingStage) {
		case Stages.Dev:
			return 'Development'
		case Stages.QA:
			return 'QA'
		case Stages.ProdSupport:
			return 'Production Support'
		case Stages.Prod:
			return 'Production'
		default:
			return UCWords(workingStage) ?? 'Local'
	}
}

/**
 * Determines whether the stage is one of the following: local, migrate, dev, qa
 */
export const IsStageDevFocused = (): boolean => {
	return IsStage([Stages.Local, Stages.Migrate, Stages.Dev, Stages.QA])
}

/**
 * Determines whether the stage is one of the following: qa, test
 */
export const IsStageTestFocused = (): boolean => {
	return IsStage([Stages.QA, Stages.Test])
}

/**
 * Determines whether the stage is one of the following: local, migrate, dev, qa, test
 */
export const IsStageDevTestFocused = (): boolean => {
	return IsStageDevFocused() || IsStageTestFocused()
}
