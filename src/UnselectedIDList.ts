/**
 *
 *
 */
export type TNumberObject = number | object

/**
 *
 * @param item
 * @constructor
 *
 */
export const ToID = (item: TNumberObject): number => typeof item === 'number' ? item : (item as any).id as number

/**
 *
 *
 */
export namespace UnselectedIDList {

	/**
	 *
	 * @param item
	 * @param unselectedIDs
	 * @constructor
	 *
 */
	export const IsSelected = (item: TNumberObject, unselectedIDs: number[]): boolean => !unselectedIDs.includes(ToID(item))

	/**
	 *
	 * @param items
	 * @param unselectedIDs
	 * @constructor
	 *
 */
	export const SelectedIDs = (items: TNumberObject[], unselectedIDs: number[]): number[] => items.reduce<number[]>(
		(result, cur) => {
			const curID: number = ToID(cur)

			return (!unselectedIDs.find(id => id === curID) ? [...result, curID] : result)
		},
		[]
	)

	/**
	 *
	 * @param toggleID
	 * @param unselectedIDs
	 * @constructor
	 *
 */
	export const ToggleUnSelectedID = (toggleID: number, unselectedIDs: number[]): number[] => unselectedIDs.includes(toggleID) ? unselectedIDs.filter(id => id !== toggleID) : [...unselectedIDs, toggleID]

	/**
	 *
	 * @param ids
	 * @param unselectedIDs
	 * @constructor
	 *
 */
	export const SelectIDs = (ids: TNumberObject[], unselectedIDs: number[]): number[] =>
		unselectedIDs.filter(unselectedID => !ids.find(id => unselectedID === ToID(id)))

	/**
	 *
	 * @param ids
	 * @param unselectedIDs
	 * @constructor
	 *
 */
	export const UnSelectIDs = (ids: TNumberObject[], unselectedIDs: number[]): number[] =>
		[...unselectedIDs, ...(ids.map(id => ToID(id)))]

	/**
	 *
	 * @param allIDs
	 * @param lastID
	 * @param nextID
	 * @param unselectedIDs
	 * @constructor
	 *
 */
	export const SelectedBetween = (allIDs: TNumberObject[], lastID: number, nextID: number, unselectedIDs: number[]): number[] => {
		const allNumbers: number[] = allIDs.map(allID => ToID(allID))

		const select = !IsSelected(nextID, unselectedIDs)

		let betweenIDs: number[] = []
		let firstFound = false

		for (const checkID of allNumbers) {
			if (checkID === lastID || checkID === nextID) {
				betweenIDs.push(checkID)
				if (firstFound) {
					break
				}
				firstFound = true
			} else if (firstFound) {
				betweenIDs.push(checkID)
			}
		}

		return select ? SelectIDs(betweenIDs, unselectedIDs) : UnSelectIDs(betweenIDs, unselectedIDs)
	}
}

/**
 *
 * @param allIDs
 * @param lastID
 * @param nextID
 * @param inclusive
 * @constructor
 *
 */
export const SelectBetweenIDs = (allIDs: number[], lastID: number, nextID: number, inclusive: boolean = true): number[] => {
	let betweenIDs: number[] = []
	let firstFound = false

	for (const checkID of allIDs) {
		if (checkID === lastID || checkID === nextID) {
			if (inclusive) betweenIDs.push(checkID)
			if (firstFound) {
				break
			}
			firstFound = true
		} else if (firstFound) {
			betweenIDs.push(checkID)
		}
	}

	return betweenIDs
}
