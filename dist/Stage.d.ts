export declare enum Stages {
    Local = "local",
    Migrate = "migrate",
    Dev = "dev",
    Test = "test",
    QA = "qa",
    Demo = "demo",
    ProdSupport = "prodsupport",
    Prod = "prod"
}
/**
 * Determines whether the app in a particular stage.
 *
 * @example
 * // If the app is in 'local', it returns true
 * IsStage('local')
 */
export declare const IsStage: (stages: Stages | Stages[]) => boolean;
/**
 */
export declare const GetStage: () => Stages;
/**
 * Returns the full name of the stage.
 * @example
 * // return Development
 * GetStageName('dev')
 */
export declare const GetStageName: (stage?: Stages | undefined) => string;
/**
 * Determines whether the stage is one of the following: local, migrate, dev, qa
 */
export declare const IsStageDevFocused: () => boolean;
/**
 * Determines whether the stage is one of the following: qa, test
 */
export declare const IsStageTestFocused: () => boolean;
/**
 * Determines whether the stage is one of the following: local, migrate, dev, qa, test
 */
export declare const IsStageDevTestFocused: () => boolean;
