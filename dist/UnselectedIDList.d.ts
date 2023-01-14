export declare type TNumberObject = number | object;
export declare const ToID: (item: TNumberObject) => number;
export declare namespace UnselectedIDList {
    const IsSelected: (item: TNumberObject, unselectedIDs: number[]) => boolean;
    const SelectedIDs: (items: TNumberObject[], unselectedIDs: number[]) => number[];
    const ToggleUnSelectedID: (toggleID: number, unselectedIDs: number[]) => number[];
    const SelectIDs: (ids: TNumberObject[], unselectedIDs: number[]) => number[];
    const UnSelectIDs: (ids: TNumberObject[], unselectedIDs: number[]) => number[];
    const SelectedBetween: (allIDs: TNumberObject[], lastID: number, nextID: number, unselectedIDs: number[]) => number[];
}
export declare const SelectBetweenIDs: (allIDs: number[], lastID: number, nextID: number, inclusive?: boolean) => number[];
