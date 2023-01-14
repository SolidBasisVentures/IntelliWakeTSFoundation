export declare type TConsoleLogTableColumnDef = {
    characters: number;
    justify: 'L' | 'R';
    padWith?: string;
};
export declare type TConsoleLogTableDef = {
    firstRowIsHeader: boolean;
    surroundingLines: boolean;
    columns?: TConsoleLogTableColumnDef[];
};
export declare const initialConsoleLogTableDef: TConsoleLogTableDef;
export declare const ConsoleColor: {
    Reset: string;
    Underscore: string;
    Reverse: string;
    fg: {
        Black: string;
        Red: string;
        Green: string;
        Yellow: string;
        Blue: string;
        Magenta: string;
        Cyan: string;
        White: string;
        Crimson: string;
    };
    bg: {
        Black: string;
        Red: string;
        Green: string;
        Yellow: string;
        Blue: string;
        Magenta: string;
        Cyan: string;
        White: string;
        Crimson: string;
    };
};
/**
 * Formats an array of data into a table format and prints it in the console.
 *
 * @example
 * let data = [
 *   ['ID', 'User', 'Age'],
 *   ['1', 'john doe', '24'],
 *   ['2', 'sally jones', '32']
 * ]
 * // returns
 * ----------------------
 * ID   User          Age
 * ----------------------
 * 1   john doe       24
 * 2   sally jones    32
 * ----------------------
 *
 * consoleLogTable(data)
 */
export declare const consoleLogTable: (arrayData: any[][], tableDef?: TConsoleLogTableDef) => void;
