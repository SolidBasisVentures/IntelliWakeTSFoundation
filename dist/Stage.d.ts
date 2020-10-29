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
export declare const IsStage: (stages: Stages | Stages[]) => boolean;
export declare const GetStage: () => Stages;
export declare const GetStageName: (stage?: Stages | undefined) => string;
export declare const IsStageDevFocused: () => boolean;
export declare const IsStageTestFocused: () => boolean;
export declare const IsStageDevTestFocused: () => boolean;
