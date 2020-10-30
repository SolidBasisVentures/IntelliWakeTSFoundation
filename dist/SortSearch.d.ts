export declare function PagesForRange(current: number, length: number, spread?: number): (number | null)[];
export interface ISortColumn {
    primarySort: string;
    primaryAscending: boolean;
    primaryEmptyToBottom: null | 'string' | 'number' | 'null';
    secondarySort: string | null;
    secondaryAscending: boolean;
    secondaryEmptyToBottom: null | 'string' | 'number' | 'null';
}
export declare const initialSortColumn: ISortColumn;
export declare const SortColumnUpdate: (columnToSort: string, sortColumn: ISortColumn, firstClickAscending?: boolean, emptyToBottom?: null | 'string' | 'number' | 'null') => ISortColumn;
export declare const SortColumns: <T>(arrayTable: T[], sortColumn: ISortColumn) => T[];
export declare const SearchTerms: (search: string | null | undefined, toLowerCase?: boolean) => string[];
export declare const StringContainsSearchTerms: (value: string | null | undefined, searchTerms: string[]) => boolean;
export declare const StringContainsSearch: (value: string | null | undefined, search: string | null | undefined) => boolean;
export declare const ObjectContainsSearchTerms: (object: any | null | undefined, searchTerms: string[]) => boolean;
export declare const ObjectContainsSearch: (object: any | null | undefined, search: string | null | undefined) => boolean;
export declare const SearchRows: <T>(arrayTable: T[], search: string) => T[];
export declare const SearchRow: (searchItem: any, search: string) => boolean;
export declare const SearchSort: <T>(arrayTable: T[], search: string, sortColumn: ISortColumn) => T[];
