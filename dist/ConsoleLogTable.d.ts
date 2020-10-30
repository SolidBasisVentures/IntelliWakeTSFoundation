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
export declare const consoleLogTable: (arrayData: any[][], tableDef?: TConsoleLogTableDef) => void;
