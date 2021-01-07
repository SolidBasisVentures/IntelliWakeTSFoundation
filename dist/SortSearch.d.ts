/**
 * Returns an array of numbers to be used for pagination links.
 *
 * @example
 * // returns [1, 2, 3, null, 10]
 * PagesForRange(1, 10)
 *
 * // returns [1, null, 7, 8, 9, 10]
 * PagesForRange(9, 10)
 *
 * // returns [1, 2, 3, 4, null, 10]
 * PagesForRange(1, 10, 3)
 */
export declare function PagesForRange(current: number, length: number, spread?: number): (number | null)[];
export declare type TSortColumnToBottom = null | 'string' | 'number' | 'null' | 'timestamptz';
export interface ISortColumn {
    primarySort: string;
    primaryAscending: boolean;
    primaryEmptyToBottom: TSortColumnToBottom;
    secondarySort: string | null;
    secondaryAscending: boolean;
    secondaryEmptyToBottom: TSortColumnToBottom;
}
export declare const initialSortColumn: ISortColumn;
/**
 * Updates a the primary sort key of a sort column object, and returns the updated object.
 *
 * @example
 * // returns the updated object:
 * {
 *   primarySort: 'name',
 *   primaryAscending: true,
 *   primaryEmptyToBottom: null,
 *   secondarySort: '',
 *   secondaryAscending: true,
 *   secondaryEmptyToBottom: null
 * }
 * SortColumnUpdate('name', initialSortColumn)
 */
export declare const SortColumnUpdate: (columnToSort: string, sortColumn: ISortColumn, firstClickAscending?: boolean, emptyToBottom?: TSortColumnToBottom) => ISortColumn;
/**
 * Accepts an array of data and a sort column object, and returns the sorted array of data.
 *
 * @example
 * const sortColumn = SortColumnUpdate('name', initialSortColumn)
 * const data = [
 *   {id: 1, name: 'brad', age: 24},
 *   {id: 2, name: 'sally', age: 32},
 *   {id: 3, name: 'abby', age: 28}
 * ]
 *
 * // returns
 * [
 *   {id: 3, name: 'abby', age: 28}
 *   {id: 1, name: 'brad', age: 24},
 *   {id: 2, name: 'sally', age: 32},
 * ]
 * SortColumns(data, sortColumn)
 */
export declare const SortColumns: <T>(arrayTable: T[], sortColumn: ISortColumn) => T[];
/**
 * Returns a case-insensitive sort number of the .sort(a, b) function, or null if values are equal.  Handles booleans, numbers (including currency and percentages), and case-insensitive strings.
 *
 * @example
 * [
        {id: 1, name: 'AAA', prioritized: false},
        {id: 2, name: 'ZZZ', prioritized: false},
        {id: 3, name: 'CCC', prioritized: true},
        {id: 4, name: 'BBB', prioritized: false}
    ]
 .sort((a, b) =>
        SortCompare(a.name, b.name)) = [
        { id: 1, name: 'AAA', prioritized: false },
        { id: 4, name: 'BBB', prioritized: false },
        { id: 3, name: 'CCC', prioritized: true },
        { id: 2, name: 'ZZZ', prioritized: false }
    ]
 */
export declare const SortCompare: (beforeValue: any, afterValue: any, emptyTo?: null | 'Top' | 'Bottom') => number;
/**
 * Returns a case-insensitive sort number of the .sort(a, b) function, or null if values are equal.  Handles booleans, numbers (including currency and percentages), and case-insensitive strings.
 *
 * @example
 * [
        {id: 1, name: 'AAA', prioritized: false},
        {id: 2, name: 'ZZZ', prioritized: false},
        {id: 3, name: 'CCC', prioritized: true},
        {id: 4, name: 'BBB', prioritized: false}
    ]
 .sort((a, b) =>
        SortCompareNull(b.prioritized, a.prioritized)
        ?? SortCompare(a.name, b.name)) = [
        { id: 3, name: 'CCC', prioritized: true },
        { id: 1, name: 'AAA', prioritized: false },
        { id: 4, name: 'BBB', prioritized: false },
        { id: 2, name: 'ZZZ', prioritized: false }
    ]
 */
export declare const SortCompareNull: (beforeValue: any, afterValue: any, emptyTo?: null | 'Top' | 'Bottom') => number | null;
/**
 * Converts each word of a string to an array element for searching.
 *
 * @example
 * // returns ['john', 'doe', 'johndoe@mail.com']
 * SearchTerms('john doe johndoe@mail.com')
 */
export declare const SearchTerms: (search: string | null | undefined, toLowerCase?: boolean) => string[];
/**
 * Determines whether a string contains search terms.
 *
 * @example
 * // returns true
 * StringContainsSearchTerms('user age', ['user', 'age'])
 */
export declare const StringContainsSearchTerms: (value: string | null | undefined, searchTerms: string[]) => boolean;
/**
 * Determines whether a string contains search string.
 *
 * @example
 * // return true
 * StringContainsSearch('user age', 'user')
 *
 * // return false
 * StringContainsSearch('user age', 'address')
 */
export declare const StringContainsSearch: (value: string | null | undefined, search: string | null | undefined) => boolean;
/**
 * Determines whether an object contains search terms.
 *
 * @example
 * // returns true
 * ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['24'])
 *
 * // returns true
 * ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['john'])
 */
export declare const ObjectContainsSearchTerms: (object: object | null | undefined, searchTerms: string[]) => boolean;
/**
 * Determines whether an object contains search string.
 *
 * @example
 * // returns true
 * ObjectContainsSearch({user: 'john doe', age: 24}, '24')
 *
 * // returns true
 * ObjectContainsSearch({user: 'john doe', age: 24}, 'john')
 */
export declare const ObjectContainsSearch: (object: any | null | undefined, search: string | null | undefined) => boolean;
/**
 * Searches an array of objects with a given search string, and returns the list of objects that match.
 *
 * @example
 * let data = [{id: 1, user: 'john doe'}, {id: 2, user: 'john smith'}]
 *
 * // returns [{id: 1, user: 'john doe'}, {id: 2, user: 'john smith'}]
 * SearchRows(data, 'john')
 *
 * // returns [{id: 2, user: 'john smith'}]
 * SearchRows(data, 'smith')
 */
export declare const SearchRows: <T>(arrayTable: T[], search: string) => T[];
/**
 * Determines whether a search item object contains value from the search string.
 *
 * @example
 * // returns true
 * SearchRow({user: 'john doe', age: '24'}, 'john 24')
 */
export declare const SearchRow: (searchItem: object, search: string) => boolean;
/**
 * Accepts an array of data, a search string, and a sort column object. Returns the
 * sorted search results array.
 *
 * @example
 * const sortColumn = SortColumnUpdate('name', initialSortColumn)
 * const data = [
 *   {id: 1, name: 'john smith', age: 24},
 *   {id: 2, name: 'sally jones', age: 32},
 *   {id: 3, name: 'john doe', age: 28}
 * ]
 *
 * // returns [{id: 3, name: 'john doe', age: 28}, {id: 1, name: 'john smith', age: 24}]
 * SearchSort(data, 'john', sortColumn)
 *
 * // returns [{id: 1, name: 'john smith', age: 24}]
 * SearchSort(data, 'john 24', sortColumn)
 */
export declare const SearchSort: <T>(arrayTable: T[], search: string, sortColumn: ISortColumn) => T[];
