import {UnselectedIDList} from '../src/UnselectedIDList'

test('Un - SelectedIDs - num', () => {
	expect(UnselectedIDList.SelectedIDs([1, 2, 3, 4], [1, 3])).toEqual([2, 4])
})

test('Un - SelectedIDs - array', () => {
	expect(UnselectedIDList.SelectedIDs([{id: 1}, {id: 2}, {id: 3}, {id: 4}], [1, 3])).toEqual([2, 4])
})

test('Un - SelectedID - Unselect', () => {
	expect(UnselectedIDList.ToggleUnSelectedID(3, [1, 2])).toEqual([1, 2, 3])
})

test('Un - SelectedID - Reselect', () => {
	expect(UnselectedIDList.ToggleUnSelectedID(1, [1, 2, 3])).toEqual([2, 3])
})
