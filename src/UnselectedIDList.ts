export namespace UnselectedIDList {
	type TNumberObject = number | object
	
	const ToID = (item: TNumberObject): number => typeof item === 'number' ? item : (item as any).id as number
	
	export const IsSelected = (item: TNumberObject, unselectedIDs: number[]): boolean => !unselectedIDs.includes(ToID(item))
	
	export const SelectedIDs = (items: TNumberObject[], unselectedIDs: number[]): number[] => items.reduce<number[]>(
		(result, cur) => {
			const curID: number = ToID(cur)
			
			return (!unselectedIDs.find(id => id === curID) ? [...result, curID] : result)
		},
		[]
	)
	
	export const ToggleUnSelectedID = (toggleID: number, unselectedIDs: number[]): number[] => unselectedIDs.includes(toggleID) ? unselectedIDs.filter(id => id !== toggleID) : [...unselectedIDs, toggleID]
	
	export const SelectIDs = (ids: TNumberObject[], unselectedIDs: number[]): number[] =>
		unselectedIDs.filter(unselectedID => !ids.find(id => unselectedID === ToID(id)))
	
	export const UnSelectIDs = (ids: TNumberObject[], unselectedIDs: number[]): number[] =>
		[...unselectedIDs, ...(ids.map(id => ToID(id)))]
	
	export const SelectedBetween = (allIDs: TNumberObject[], lastID: number, nextID: number, unselectedIDs: number[]): number[] => {
		const allNumbers: number[] = allIDs.map(allID => ToID(allID))
		
		const select = !IsSelected(nextID, unselectedIDs)
		
		let betweenIDs: number[] = [lastID, nextID]
		let firstFound = false
		
		for (const checkID of allNumbers) {
			if (checkID === lastID || checkID === nextID) {
				if (firstFound) {
					betweenIDs.push(checkID)
					break
				}
				firstFound = true
			} else if (firstFound) {
				betweenIDs.push(checkID)
			}
		}
		
		return select ? SelectedIDs(betweenIDs, unselectedIDs) : UnSelectIDs(betweenIDs, unselectedIDs)
	}
}
