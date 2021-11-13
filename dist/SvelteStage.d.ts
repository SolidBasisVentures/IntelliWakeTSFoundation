import { Stages } from './Stage';
/**
 * Determines whether the app in a particular stage.
 *
 * @example
 * // If the app is in 'local', it returns true
 * IsStage('local')
 */
export declare const IsSvelteStage: (stages: Stages | Stages[]) => boolean;
/**
 */
export declare const GetSvelteStage: () => Stages;
/**
 * Returns the full name of the stage.
 * @example
 * // return Development
 * GetStageName('dev')
 */
export declare const GetSvelteStageName: (stage?: Stages | undefined) => string;
/**
 * Determines whether the stage is one of the following: local, migrate, dev, qa
 */
export declare const IsSvelteStageDevFocused: () => boolean;
/**
 * Determines whether the stage is one of the following: qa, test
 */
export declare const IsSvelteStageTestFocused: () => boolean;
/**
 * Determines whether the stage is one of the following: local, migrate, dev, qa, test
 */
export declare const IsSvelteStageDevTestFocused: () => boolean;
