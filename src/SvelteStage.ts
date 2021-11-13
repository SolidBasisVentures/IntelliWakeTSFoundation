import {UCWords} from './StringManipulation'
import {Stages} from './Stage'
import {ToArray} from './Functions'

/**
 * Determines whether the app in a particular stage.
 *
 * @example
 * // If the app is in 'local', it returns true
 * IsStage('local')
 */
export const IsSvelteStage = (stages: Stages | Stages[]): boolean => {
	return ToArray(stages).some(env => GetSvelteStage() === env)
}

/**
 */
export const GetSvelteStage = (): Stages => {
	return (process.env.Svelte_APP_STAGE ?? Stages.Local) as Stages
}

/**
 * Returns the full name of the stage.
 * @example
 * // return Development
 * GetStageName('dev')
 */
export const GetSvelteStageName = (stage?: Stages): string => {
	const workingStage = stage ?? GetSvelteStage()

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
export const IsSvelteStageDevFocused = (): boolean => {
	return IsSvelteStage([Stages.Local, Stages.Migrate, Stages.Dev, Stages.QA])
}

/**
 * Determines whether the stage is one of the following: qa, test
 */
export const IsSvelteStageTestFocused = (): boolean => {
	return IsSvelteStage([Stages.QA, Stages.Test])
}

/**
 * Determines whether the stage is one of the following: local, migrate, dev, qa, test
 */
export const IsSvelteStageDevTestFocused = (): boolean => {
	return IsSvelteStageDevFocused() || IsSvelteStageTestFocused()
}
