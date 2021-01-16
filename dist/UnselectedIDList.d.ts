export declare namespace UnselectedIDList {
    type TNumberObject = number | object;
    export const IsSelected: (item: TNumberObject, unselectedIDs: number[]) => boolean;
    export const SelectedIDs: (items: TNumberObject[], unselectedIDs: number[]) => number[];
    export const ToggleUnSelectedID: (toggleID: number, unselectedIDs: number[]) => number[];
    export const SelectIDs: (ids: TNumberObject[], unselectedIDs: number[]) => number[];
    export const UnSelectIDs: (ids: TNumberObject[], unselectedIDs: number[]) => number[];
    export const SelectedBetween: (allIDs: TNumberObject[], lastID: number, nextID: number, unselectedIDs: number[]) => number[];
    export {};
}
