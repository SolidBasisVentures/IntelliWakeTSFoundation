export declare type TVariables = {
    [key: string]: any;
};
export declare const EvaluateString: (expression: string, variables?: TVariables | undefined) => string;
export declare const EvaluateCondition: (expression: string, variables?: TVariables | undefined) => boolean;
