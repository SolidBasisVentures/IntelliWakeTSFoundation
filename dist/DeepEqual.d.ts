export declare const DeepEqual: (object1: any, object2: any) => boolean;
export declare type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};
export declare type DeepNullable<T> = {
    [K in keyof T]: DeepNullable<T[K]> | null;
};
