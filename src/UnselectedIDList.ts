/**
 * The TNumberObject type represents a value that can either be a number or an object.
 * This type is used when we want to define a variable that can have either a number or an object as its value.
 *
 * @typedef {number|object} TNumberObject
 */
export type TNumberObject = number | object

/**
 * Function to retrieve the ID from an item.
 *
 * @param {TNumberObject} item - The item from which to retrieve the ID.
 * @returns {number} - The ID of the item.
 */
export const ToID = (item: TNumberObject): number => typeof item === 'number' ? item : (item as any).id as number

/**
 * A namespace for managing a list of unselected IDs.
 */
export namespace UnselectedIDList {

	/**
	 * Checks if the provided item is selected based on the unselected IDs list.
	 *
	 * @param {TNumberObject} item - The item to check if it is selected.
	 * @param {number[]} unselectedIDs - The list of unselected IDs.
	 * @returns {boolean} - Returns `true` if the item is selected, `false` otherwise.
	 */
	export const IsSelected = (item: TNumberObject, unselectedIDs: number[]): boolean => !unselectedIDs.includes(ToID(item))

	/**
	 * This function filters out selected IDs from a given list of items based on a list of unselected IDs.
	 *
	 * @param {TNumberObject[]} items - The list of items containing the IDs.
	 * @param {number[]} unselectedIDs - The list of IDs to be excluded from the selection.
	 *
	 * @returns {number[]} - The list of selected IDs after filtering.
	 */
	export const SelectedIDs = (items: TNumberObject[], unselectedIDs: number[]): number[] => items.reduce<number[]>(
		(result, cur) => {
			const curID: number = ToID(cur)

			return (!unselectedIDs.find(id => id === curID) ? [...result, curID] : result)
		},
		[]
	)

	/**
	 * Toggles the presence of a given ID in an array of unselected IDs.
	 *
	 * @param {number} toggleID - The ID to toggle.
	 * @param {number[]} unselectedIDs - The array of unselected IDs.
	 * @returns {number[]} - The updated array of unselected IDs.
	 */
	export const ToggleUnSelectedID = (toggleID: number, unselectedIDs: number[]): number[] => unselectedIDs.includes(toggleID) ? unselectedIDs.filter(id => id !== toggleID) : [...unselectedIDs, toggleID]

	/**
	 * Returns an array of selected IDs from the given list of IDs and unselected IDs.
	 *
	 * @param {TNumberObject[]} ids - The list of selected IDs.
	 * @param {number[]} unselectedIDs - The list of unselected IDs.
	 * @returns {number[]} - The array of selected IDs.
	 */
	export const SelectIDs = (ids: TNumberObject[], unselectedIDs: number[]): number[] =>
		unselectedIDs.filter(unselectedID => !ids.find(id => unselectedID === ToID(id)))

	/**
	 * Adds the unselected IDs to the given array of IDs.
	 *
	 * @param {TNumberObject[]} ids - The array of IDs to add unselected IDs to.
	 * @param {number[]} unselectedIDs - The array of unselected IDs to add.
	 * @returns {number[]} - The updated array of IDs with unselected IDs added.
	 */
	export const UnSelectIDs = (ids: TNumberObject[], unselectedIDs: number[]): number[] =>
		[...unselectedIDs, ...(ids.map(id => ToID(id)))]

	/**
	 * Filters an array of IDs and returns the IDs that are between the given lastID and nextID.
	 *
	 * @param {TNumberObject[]} allIDs - An array of TNumberObject containing all the IDs.
	 * @param {number} lastID - The last ID in the sequence.
	 * @param {number} nextID - The next ID in the sequence.
	 * @param {number[]} unselectedIDs - An array of numbers representing the unselected IDs.
	 * @returns {number[]} The modified array of numbers.
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
 * Filters an array of IDs and returns the IDs that are between the given lastID and nextID.
 *
 * @template T - Type of IDs (number or string).
 * @param {T[]} allIDs - Array of all IDs.
 * @param {T} lastID - The ID that comes before the desired range.
 * @param {T} nextID - The ID that comes after the desired range.
 * @param {boolean} [inclusive=true] - Indicates whether the lastID and nextID should be included in the result.
 * @returns {T[]} - Array of IDs between the lastID and nextID.
 */
export const SelectBetweenIDs = <T extends number | string>(allIDs: T[], lastID: T, nextID: T, inclusive: boolean = true): T[] => {
	let betweenIDs: T[] = []
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
