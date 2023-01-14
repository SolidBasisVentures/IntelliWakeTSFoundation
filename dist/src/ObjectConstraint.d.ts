/**
 * Defines the constraints to be placed on a field of an object
 */
export declare type TObjectFieldConstraint = {
    type?: 'boolean' | 'string' | 'number' | 'date' | 'datetime' | 'time' | 'object';
    nullable?: boolean;
    nullIfFalsey?: boolean;
    default?: any;
    length?: number;
    values?: any[];
    minValue?: any;
    maxValue?: any;
    isArray?: boolean;
    arrayAllowFalsey?: boolean;
};
/**
 * Defines the constraints to be placed on an object
 */
export declare type TObjectConstraint<T extends Record<string, any> = Record<string, any | null>> = Record<keyof T, TObjectFieldConstraint>;
/**
 * Takes an object and returns an object that matches the types provided by the constraint
 *
 * @param obj
 * @param constraint
 * @constructor
 */
export declare const ConstrainObject: <T extends Record<string, any>>(obj: T, constraint: Record<keyof T, TObjectFieldConstraint>) => T;
export declare type TObjectFromFormDataOptions<T extends Record<string, any> = Record<string, any | null>> = {
    excludeColumns?: (keyof T)[];
    includeColumns?: (keyof T)[];
    arrayFormDataItems?: (keyof T)[];
    default?: T;
    constraint?: TObjectConstraint<T>;
};
/**
 * Converts FormData to an object... Recommend using "constraint" option
 *
 * @param formData
 * @param options
 * @constructor
 */
export declare const ObjectFromFormData: <T extends Record<string, any> = Record<string, any>>(formData: FormData, options?: TObjectFromFormDataOptions<T> | undefined) => T;
