export declare type IChanges = {
    [key: string]: any;
};
export declare const initialChanges: {};
export declare const AddChange: (name: string, value: any, changes: IChanges) => IChanges;
export declare type IIDChanges = {
    [key: number]: {
        [key: string]: any;
    };
};
export declare const initialIDChanges: {};
export declare const AddIDChange: (id: number, name: string, value: any, idChanges: IIDChanges) => IIDChanges;
/**
 * Converts Data to CSV. Creates a download link and triggers
 * click event on it to download the file.
 */
export declare const DataToCSVExport: (filename: string, csvData: any) => void;
/**
 * Converts Data to CSV without quotes. Creates a download link and triggers
 * click event on it to download the file.
 */
export declare const DataToCSVExportNoQuotes: (filename: string, csvData: any) => void;
/**
 * A wrapper function for JSON.parse with try/catch.
 */
export declare const JSONParse: (json: string | null | undefined) => object | null;
/**
 * Removes properties from an object having the same value.
 *
 * @example
 * let data = {
 *   name: 'john doe',
 *   age: 24,
 * }
 *
 * let data2 = {
 *   name: 'john smith',
 *   age: 24,
 * }
 *
 * // returns {name: 'john doe}
 * RemoveDupProperties(data, data2)
 */
export declare const RemoveDupProperties: (original: IChanges, propsToRemove: IChanges) => IChanges;
/**
 * Removes properties from an object having the same value by ID.
 *
 * @example
 * let data = {
 *   1: {
 *     name: 'john doe',
 *     age: 24,
 *   }
 * }
 *
 * let data2 = {
 *   1: {
 *     name: 'john smith',
 *     age: 24,
 *   }
 * }
 *
 * // returns {1: {name: 'john doe}}
 * RemoveDupPropertiesByID(data, data2)
 */
export declare const RemoveDupPropertiesByID: (original: IIDChanges, propsToRemove: IIDChanges) => IIDChanges;
/**
 * Removes properties from an object having the same value by an array of objects.
 *
 * @example
 * let data = {
 *   1: {
 *     name: 'john doe',
 *     age: 24,
 *   }
 * }
 *
 * let data2 = [
 *   {id: '1', user: 'john smith', age: 24},
 *   {id: '2', user: 'sally jones', age: 32}
 * ]
 *
 * // returns {1: {name: 'john doe}}
 * RemoveDupPropertiesByIDArray(data, data2)
 */
export declare const RemoveDupPropertiesByIDArray: (original: IIDChanges, propsToRemoveArray: any[]) => IIDChanges;
/**
 * Returns the difference of two objects.
 *
 * @example
 * let data = {id: 1, user: 'john doe', age: 24}
 * let data2 = {id: 2, user: 'john doe', age: 23}
 *
 * // returns {id: 1, age: 24}
 * ObjectDiffs(data, data2)
 *
 * // returns {age: 24}
 * ObjectDiffs(data, data2, 'id')
 */
export declare const ObjectDiffs: (compare: any, comparedTo: any, excludeKeys?: string[]) => any;
/**
 * Returns a reduces object to other keys.
 *
 * @example
 * let data = {id: 1, user: 'john doe', age: 24}
 * let data2 = {user: 'john doe'}
 *
 * // returns {user: '', age: ''}
 * ReduceObjectToOtherKeys(data, data2)
 *
 * // returns {user: ''}
 * ReduceObjectToOtherKeys(data, data2, ['age'])
 */
export declare const ReduceObjectToOtherKeys: (main: any, reduceTo: any, excludeKeys?: string[]) => any;
