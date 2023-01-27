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
export declare type TSortColumnToBottom = null | 'string' | 'number' | 'null' | 'timestamptz' | 'date';
/**
 * An interface that defines a primary and secondary sort.
 *
 * Use SortColumnUpdate() to automatically move the primary sort to the secondary
 */
export interface ISortColumn<T = Record<string, any>> {
    primarySort: keyof T;
    primaryAscending: boolean;
    primaryEmptyToBottom: TSortColumnToBottom;
    secondarySort: keyof T | null;
    secondaryAscending: boolean;
    secondaryEmptyToBottom: TSortColumnToBottom;
}
/**
 * Omit<ISortColumn, 'primarySort'>
 */
export declare const initialSortColumn: any;
export declare type TFindIsActive = boolean | null;
/**
 * Converts Find Is Active type to a string
 * @param findIsActive
 * @constructor
 */
export declare const FindIsActiveString: (findIsActive: TFindIsActive) => string;
/**
 * Converts string to Find Is Active type
 * @param findIsActiveString
 * @constructor
 */
export declare const StringFindIsActive: (findIsActiveString: string) => TFindIsActive;
/**
 * A structure to pass to the server in an API REQUEST to tell it how to walk through pages of data.
 *
 * page = What page of data to retrieve
 * search = A search string if any
 * sortColumns = Tells the server how to sort the data
 * active = Tells the server whether to find active, inactive or all items
 * filterValues = Other filter data (of type T) to pass to the structure to limit result sets (e.g. customer_id = 1 for all items that match customer 1)
 *
 * IFilterSortPaginatorReturn should be in the RESPONSE of the API to tell the app about the data it received (e.g. how many pages there are, etc.)
 */
export interface IPaginatorRequest<SORT = Record<string, any>, FILTER = Record<string, any>> {
    page: number;
    countPerPage: number;
    search: string;
    sortColumns: ISortColumn<SORT>;
    active: TFindIsActive;
    filterValues: FILTER;
}
export declare const initialFilterSortPaginator: IPaginatorRequest<any>;
/**
 * A structure returned in an API RESPONSE that tells the app what kind of data the counts found.
 *
 * page = The actual page returned, which may be different from the page requested if fewer pages exist than the page that was requested.
 * pageCount = The total number of pages there would be based on the count of rows found
 * rowCount = The total number of rows found
 * countPerPage = How many rows make up a page
 * currentOffset = More used by the database, but this would be the offset (e.g. 51 on the second page of a set that had CountPerPage = 50 and RowCount > 50)
 */
export interface IPaginatorResponse<T = Record<string, any>> {
    page: number;
    pageCount: number;
    rowCount: number;
    countPerPage: number;
    currentOffset: number;
    rows: T[];
}
/**
 * Updates the primary sort key of a sort column object, and returns the updated object.
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
export declare const SortColumnUpdate: <T = Record<string, any>>(columnToSort: keyof T, sortColumn: ISortColumn<T>, firstClickAscending?: boolean, emptyToBottom?: TSortColumnToBottom) => ISortColumn<T>;
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
export declare const SortColumns: <T = Record<string, any>>(arrayTable: T[], sortColumn: ISortColumn<T>) => T[];
export declare const SortIndexNull: <T>(beforeValue: T | null | undefined, afterValue: T | null | undefined, indexes: T[], emptyTo?: 'Top' | 'Bottom') => number | null;
export declare const SortIndex: <T>(beforeValue: T | null | undefined, afterValue: T | null | undefined, indexes: T[], emptyTo?: 'Top' | 'Bottom') => number;
/**
 * Returns a case-insensitive sort number of the .sort(a, b) function, or null if values are equal.  Handles booleans (false comes BEFORE true), numbers (including currency and percentages), and case-insensitive strings.
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
export declare const SortCompareNull: (beforeValue: any, afterValue: any, emptyTo?: null | 'Top' | 'Bottom' | 'Top0' | 'Bottom0') => number | null;
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
export declare const SortCompare: (beforeValue: any, afterValue: any, emptyTo?: null | 'Top' | 'Bottom' | 'Top0' | 'Bottom0') => number;
/**
 * Sorts the provided array with a "sort_order" column and re-defines the increments
 *
 * @param items
 * @param sortIncrement
 * @constructor
 */
export declare const ReSortOrder: <T extends {
    [key: string]: any;
    sort_order: number;
}>(items: T[], sortIncrement?: number) => T[];
/**
 * Returns the sort value comparing the before and after as it relates to the order of the array.
 *
 * @example
 * [
        {id: 1, name: 'One'},
        {id: 2, name: 'Two'},
        {id: 3, name: 'Three'},
        {id: 4, name: 'Four'},
        {id: 5, name: 'Five'}
    ]
 .sort((a, b) =>
        SortPerArray(a.id, b.id, [4, 5, 3, 2, 1])) = [
        {id: 4, name: 'Four'},
        {id: 5, name: 'Five'},
        {id: 3, name: 'Three'},
        {id: 2, name: 'Two'},
        {id: 1, name: 'One'}
]
 */
export declare const SortPerArray: <T>(beforeValue: T, afterValue: T, order: T[], emptyTo?: 'Top' | 'Bottom') => number;
/**
 * Converts each word of a string to an array element for searching.
 *
 * @example
 * // returns ['john', 'doe', 'johndoe@mail.com']
 * SearchTerms('john doe johndoe@mail.com')
 */
export declare const SearchTerms: (search: string | null | undefined, toLowerCase?: boolean) => string[];
/**
 * Converts multiple elements into a single string
 *
 * @example
 * TermsToSearch(['One ', null, 'Two '])
 * // returns 'One Two'
 */
export declare const TermsToSearch: (terms: string | (string | null | undefined)[] | null | undefined, spacer?: string, toLowerCase?: boolean) => string;
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
export interface ISearchOptions {
    matchSomeTerm?: boolean;
    matchFromTerm?: number;
    matchUntilTerm?: number;
    limit?: number;
}
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
export declare const ObjectContainsSearchTerms: (checkObject: object | null | undefined | object[], searchTerms: string[], options?: ISearchOptions) => boolean;
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
export declare const ObjectContainsSearch: (object: any | null | undefined, search: string | null | undefined, options?: ISearchOptions) => boolean;
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
export declare const SearchRows: <T>(arrayTable: T[], search: string, options?: ISearchOptions) => T[];
/**
 * Determines whether a search item object contains value from the search string.
 *
 * @example
 * // returns true
 * SearchRow({user: 'john doe', age: '24'}, 'john 24')
 */
export declare const SearchRow: (searchItem: object, search: string, options?: ISearchOptions) => boolean;
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
export declare const SearchSort: <T>(arrayTable: T[], search: string, sortColumn: ISortColumn<T>, options?: ISearchOptions) => T[];
