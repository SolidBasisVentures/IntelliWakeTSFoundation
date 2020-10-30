export declare type IChanges = {
    [key: string]: any;
};
export declare const initialChanges: {};
export declare type IIDChanges = {
    [key: number]: {
        [key: string]: any;
    };
};
export declare const initialIDChanges: {};
export declare const DataToCSVExport: (filename: string, csvData: any) => void;
export declare const DataToCSVExportNoQuotes: (filename: string, csvData: any) => void;
export declare const JSONParse: (json: string | null | undefined) => object | null;
export declare const RemoveDupProperties: (original: IChanges, propsToRemove: IChanges) => IChanges;
export declare const RemoveDupPropertiesByID: (original: IIDChanges, propsToRemove: IIDChanges) => IIDChanges;
export declare const RemoveDupPropertiesByIDArray: (original: IIDChanges, propsToRemoveArray: any[]) => IIDChanges;
export declare const ObjectDiffs: (compare: any, comparedTo: any, excludeKeys?: string[]) => any;
export declare const ReduceObjectToOtherKeys: (main: any, reduceTo: any, excludeKeys?: string[]) => any;
