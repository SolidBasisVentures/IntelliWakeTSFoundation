import {CleanNumberNull, GenerateUUID, ReplaceAll} from './Functions'
import {DATE_FORMAT_DATE, DateFormat, IsDateString} from './DateManager'

/**
 * IChanges provides a structure for tracking changes for an object.
 *
 * @example
 * const employee = {id: 1, name: 'Bob'}
 * const [changes, setChanges] = useState({} as IChanges)
 * setChanges(prevState => AddChange('name', 'John', prevState)) // result: {name: 'John'}
 * const updatedEmployee = ObjectWithChanges(employee, changes) // result: {id: 1, name: 'John'}
 */
export type IChanges<T> = Partial<T>
export const initialChanges = {}

/**
 * Applies a value to a name on a change object, and removes the value if it matches what was in the original
 *
 * @param value
 * @param name
 * @param setChanges
 * @param original
 * @constructor
 */
export const ChangeValueChanges = <T>(
	value: any,
	name?: keyof T,
	setChanges?: (prevState: (prevState: IChanges<T>) => IChanges<T>) => void,
	original?: T
) => {
	if (!!setChanges && !!name) {
		setChanges(prevState => {
			let nextState = {...prevState}
			
			if (!!original && IsEqual(original[name], value)) {
				delete nextState[name]
			} else {
				nextState[name] = value
			}
			
			return nextState
		})
	}
}

/**
 * Adds a change to the IChange object.
 *
 * @example
 * const employee = {id: 1, name: 'Bob'}
 * const [changes, setChanges] = useState({} as IChanges)
 *
 * setChanges(prevState => AddChange('name', 'John', prevState)) // result: {name: 'John'}
 *
 * const updatedEmployee = ObjectWithChanges(employee, changes) // result: {id: 1, name: 'John'}
 */
export const AddChange = <T>(name: keyof T, value: any, changes: IChanges<T>): IChanges<T> => ({
	...changes,
	[name]: value
})

/**
 * Returns the final state of an object with changes applied.
 *
 * @example
 * const employee = {id: 1, name: 'Bob'}
 * const [changes, setChanges] = useState({} as IChanges)
 * setChanges(prevState => AddChange('name', 'John', prevState)) // result: {name: 'John'}
 *
 * const updatedEmployee = ObjectWithChanges(employee, changes) // result: {id: 1, name: 'John'}
 */
export const ObjectWithChanges = <T>(item: T, changes: IChanges<T>): T => ({
	...item,
	...changes
} as T)

export type IIDObject = {
	id: number
}

/**
 * IIDChanges provides a structure for tracking changes across an array of items that have a unique "id" column.
 *
 * @example
 * const employees = [{id: 1, name: 'Bob'}, {id: 2, name: 'John'}]
 * const [idChanges, setIDChanges] = useState({} as IIDChanges)
 *
 * setIDChanges(prevState => AddIDChange(1, 'name', 'Bobby', prevState)) // result: {1: {'name', 'Bobby'}}
 * setIDChanges(prevState => AddIDChange(2, 'name', 'Johnny', prevState)) // result: {1: {'name', 'Johnny'}, 2: {'name', 'Johnny'}}
 *
 * const updatedEmployees = ArrayWithIDChanges(employees, idChanges) // result: [{id: 1, name: 'Bobby'}, {id: 2, name: 'Johnny'}]
 */
export type IIDChanges<T> = {[key: number]: IChanges<T>}
export const initialIDChanges = {}

/**
 * IIDChanges provides a structure for tracking changes across an array of items that have a unique "id" column.
 *
 * @example
 * const employees = [{id: 1, name: 'Bob'}, {id: 2, name: 'John'}]
 * const [idChanges, setIDChanges] = useState({} as IIDChanges)
 *
 * setIDChanges(prevState => AddIDChange(1, 'name', 'Bobby', prevState)) // result: {1: {'name', 'Bobby'}}
 *
 * setIDChanges(prevState => AddIDChange(2, 'name', 'Johnny', prevState)) // result: {1: {'name', 'Johnny'}, 2: {'name', 'Johnny'}}
 *
 * const updatedEmployees = ArrayWithIDChanges(employees, idChanges) // result: [{id: 1, name: 'Bobby'}, {id: 2, name: 'Johnny'}]
 */
export const AddIDChange = <T>(id: number, name: keyof T, value: any, idChanges: IIDChanges<T>): IIDChanges<T> => ({
	...idChanges,
	[id]: {
		...idChanges[id],
		[name]: value
	}
})

export const AddIDChanges = <T>(id: number, changes: IChanges<T>, idChanges: IIDChanges<T>): IIDChanges<T> => ({
	...idChanges,
	[id]: {
		...idChanges[id],
		...changes
	}
})

/**
 * Returns a new state for an array with elements uniquely identifiable by id or uuid, leaving it in the same order it found it.
 *
 * const [data, setData] = useState([{id: 1, name: 'Bob', age: 35}, {uuid: 'abcd', name: 'John', age: 40}])
 *
 * setData(prevState => ChangeArrayByIDOrUUID(prevState, {id: 1, name: 'Bobby'}))
 * setData(prevState => ChangeArrayByIDOrUUID(prevState, {uuid: 'abcd', age: 42}))
 *
 *
 * @param change
 * @param prevState
 * @param initial
 * @constructor
 */
export const ChangeArrayByIDOrUUID = <T extends {[key: string]: any, id?: number, uuid?: string}>(prevState: T[], change: Partial<T>, initial: T): T[] => {
	let newState = [...prevState]
	
	let idx = newState.findIndex(nS => (!!change.id && change.id === nS.id) || (!!change.uuid && change.uuid === nS.uuid))
	
	if (idx >= 0) {
		newState[idx] = {...newState[idx], ...change}
		return newState
	}
	
	let newVal = {...initial, ...change}
	
	if (!newVal.id && !newVal.uuid) newVal.uuid = GenerateUUID()
	
	return [...newState, {...newVal}]
}

/**
 * Combines original value arrays with changed values, and produces a new set, in order
 *
 * const original = [{id: 1, name: 'Bob', age: 35}, {id: 2, name: 'Sally', age: 25}]
 * const changes = [{id: 1, name: 'Bobby'}, {uuid: 'abcd', age: 42}]
 *
 * CombineArrayWithIDOrUUIDChanges(original, changes) = [{id: 1, name: 'Bobby', age: 35}, {id: 2, name: 'Sally', age: 25}, {uuid: 'abcd', age: 42}]
 *
 *
 * @constructor
 * @param original
 * @param changes
 * @param initial
 */
export const CombineArrayWithIDOrUUIDChanges = <T extends {[key: string]: any, id?: number, uuid?: string}>(original: T[], changes: Partial<T>[], initial: T): T[] =>
	changes.reduce<T[]>((result, change) => ChangeArrayByIDOrUUID(result, change, initial), original)

/**
 * IIDChanges provides a structure for tracking changes across an array of items that have a unique "id" column.
 *
 * @example
 * const employees = [{id: 1, name: 'Bob'}, {id: 2, name: 'John'}]
 * const [idChanges, setIDChanges] = useState({} as IIDChanges)
 *
 * setIDChanges(prevState => AddIDChange(1, 'name', 'Bobby', prevState)) // result: {1: {'name': 'Bobby'}}
 * setIDChanges(prevState => AddIDChange(2, 'name', 'Johnny', prevState)) // result: {1: {'name': 'Bobby'}, 2: {'name': 'Johnny'}}
 *
 * const updatedEmployees = ArrayWithIDChanges(employees, idChanges) // result: [{id: 1, name: 'Bobby'}, {id: 2, name: 'Johnny'}]
 */
export const ArrayWithIDChanges = <T extends IIDObject>(items: T[], idChanges: IIDChanges<T>): T[] => items.map(item => ({...item, ...idChanges[item.id]}))

/**
 * Converts Data to CSV. Creates a download link and triggers
 * click event on it to download the file.
 */
export const DataToCSVExport = function(filename: string, csvData: any, blankZeros = true) {
	const csvString = csvData
		.map((row: any) =>
			row
				.map((item: any) =>
					(blankZeros && ((typeof item === 'number' && !item) || item === '0')) ? '' :
						typeof item === 'string' ? '"' + ReplaceAll('"', '""', item) + '"' : (item ?? '').toString()
				)
				.join(',')
		)
		.join('\n')
	
	let pom = document.createElement('a')
	const blob = new Blob([csvString], {type: 'text/csv;charset=utf-8;'})
	pom.href = URL.createObjectURL(blob)
	pom.setAttribute('download', filename)
	pom.click()
}

/**
 * Converts Data to CSV without quotes. Creates a download link and triggers
 * click event on it to download the file.
 */
export const DataToCSVExportNoQuotes = function(filename: string, csvData: any) {
	const csvString = csvData
		.map((row: any) =>
			row.map((item: any) => (!!item && !isNaN(item) ? Math.round(item * 100) / 100 : item ?? '')).join(',')
		)
		.join('\n')
	
	let pom = document.createElement('a')
	const blob = new Blob([csvString], {type: 'text/csv;charset=utf-8;'})
	pom.href = URL.createObjectURL(blob)
	pom.setAttribute('download', filename)
	pom.click()
}

/**
 * Checks if a string is a valid JSON structure
 */
export const IsJSON = (json: any): boolean => {
	if (!json) return false
	
	if (typeof json !== 'string') return false
	
	try {
		const result = JSON.parse(json)
		const type = Object.prototype.toString.call(result)
		return type === '[object Object]' || type === '[object Array]'
	} catch (err) {
		return false
	}
}

export const IsEqual = (val1: any, val2: any, consoleLog = false): boolean => {
	if (val1 === val2) return true
	
	if (val1 === null) return val2 === null
	if (val2 === null) {
		if (consoleLog) console.log(val1, val2)
		return false
	}
	
	if (val1 === undefined) return val2 === undefined
	if (val2 === undefined) {
		if (consoleLog) console.log(val1, val2)
		return false
	}
	
	if (Array.isArray(val1)) {
		if (Array.isArray(val2)) {
			if (val1.length !== val2.length) {
				if (consoleLog) console.log('Lengths', val1, val2)
				return false
			}
			for (let i = 0; i < val1.length; i++) {
				if (!IsEqual(val1[i], val2[i])) {
					return false
				}
			}
			return true
		} else {
			if (consoleLog) console.log('Array/Not', val1, val2)
			return false
		}
	} else if (Array.isArray(val2)) {
		if (consoleLog) console.log('Array/Not', val1, val2)
		return false
	}
	
	if (typeof val1 === 'object' || typeof val2 === 'object') {
		const keys1 = Object.keys(val1)
		const keys2 = Object.keys(val2)
		
		if (keys1.length !== keys2.length) {
			if (consoleLog) console.log('Object Keys', val1, val2)
			return false
		}
	
		const idx = keys1.findIndex(key1 => !IsEqual(val1[key1], val2[key1]))
		
		if (idx === -1) return true
		
		if (consoleLog) {
			console.log(`Object Key`, keys1[idx], val1, val2)
			return false
		}
	} else if (val1 === val2) {
		return true
	} else {
		const firstNumber = CleanNumberNull(val1)
		if (firstNumber !== null) {
			const secondNumber = CleanNumberNull(val2)
			if (secondNumber !== null && firstNumber === secondNumber) {
				return true
			}
			if (consoleLog) console.log('Numbers1', val1, val2)
		} else if(CleanNumberNull(val2) !== null) {
			if (consoleLog) console.log('Numbers2', val1, val2)
			return false
		}
		
		if (IsDateString(val1)) {
			let pTRM = DateFormat(val1, DATE_FORMAT_DATE)
			if (!!pTRM) {
				if (IsDateString(val2)) {
					let rM = DateFormat(val2 as any, DATE_FORMAT_DATE)
					if (!!rM && pTRM === rM) {
						return true
					} else {
						if (consoleLog) console.log('Dates', val1, val2)
					}
				} else {
					if (consoleLog) console.log('Dates', val1, val2)
				}
			}
		}
	}
	
	if (consoleLog) console.log('Fallout', val1, val2)
	return false
}

/**
 * Removes properties from an object having the same value.
 *
 * @example
 * let data = {
 *   name: 'john doe',
 *   age: 24,
 * }
 *
 * let data2 = {
 *   name: 'john smith',
 *   age: 24,
 * }
 *
 * // returns {name: 'john doe}
 * RemoveDupProperties(data, data2)
 */
export const RemoveDupProperties = <T>(original: IChanges<T>, propsToRemove: IChanges<T>): IChanges<T> => {
	const result: IChanges<T> = {...original}
	
	for (const key in propsToRemove) {
		if (propsToRemove.hasOwnProperty(key)) {
			if (IsEqual(propsToRemove[key], result[key])) {
				delete result[key]
			}
		}
	}
	
	return result
}

/**
 * Removes properties from an object having the same value by ID.
 *
 * @example
 * let data = {
 *   1: {
 *     name: 'john doe',
 *     age: 24,
 *   }
 * }
 *
 * let data2 = {
 *   1: {
 *     name: 'john smith',
 *     age: 24,
 *   }
 * }
 *
 * // returns {1: {name: 'john doe}}
 * RemoveDupPropertiesByID(data, data2)
 */
export const RemoveDupPropertiesByID = <T>(original: IIDChanges<T>, propsToRemove: IIDChanges<T>): IIDChanges<T> => {
	const result: any = {...original}
	
	for (const key in propsToRemove) {
		if (propsToRemove.hasOwnProperty(key)) {
			if (result.hasOwnProperty(key)) {
				const subResult = RemoveDupProperties(result[key], propsToRemove[key])
				
				if (Object.keys(subResult).length === 0) {
					delete result[key]
				} else {
					result[key] = subResult
				}
			}
		}
	}
	
	return result
}

/**
 * Removes properties from an object having the same value by an array of objects.
 *
 * @example
 * let data = {
 *   1: {
 *     name: 'john doe',
 *     age: 24,
 *   }
 * }
 *
 * let data2 = [
 *   {id: '1', user: 'john smith', age: 24},
 *   {id: '2', user: 'sally jones', age: 32}
 * ]
 *
 * // returns {1: {name: 'john doe}}
 * RemoveDupPropertiesByIDArray(data, data2)
 */
export const RemoveDupPropertiesByIDArray = <T>(original: IIDChanges<T>, propsToRemoveArray: any[]): IIDChanges<T> => {
	const result: any = {...original}
	
	for (const key in original) {
		if (original.hasOwnProperty(key)) {
			const propsToRemove = propsToRemoveArray.find((propsToRemove) => propsToRemove.id == key)
			
			if (!!propsToRemove) {
				const subResult = RemoveDupProperties(result[key], propsToRemove)
				
				if (Object.keys(subResult).length === 0) {
					delete result[key]
				} else {
					result[key] = subResult
				}
			}
		}
	}
	
	return result
}

/**
 * Returns the difference of two objects.
 *
 * @example
 * let data = {id: 1, user: 'john doe', age: 24}
 * let data2 = {id: 2, user: 'john doe', age: 23}
 *
 * // returns {id: 1, age: 24}
 * ObjectDiffs(data, data2)
 *
 * // returns {age: 24}
 * ObjectDiffs(data, data2, 'id')
 */
export const ObjectDiffs = (compare: any, comparedTo: any, excludeKeys: string[] = []): any => {
	let results: any = {}
	
	for (const key of Object.keys(compare)) {
		if (!excludeKeys.includes(key)) {
			if (compare[key] !== comparedTo[key]) {
				results[key] = compare[key]
			}
		}
	}
	
	return results
}

/**
 * Returns a reduces object to other keys.
 *
 * @example
 * let data = {id: 1, user: 'john doe', age: 24}
 * let data2 = {user: 'john doe'}
 *
 * // returns {user: '', age: ''}
 * ReduceObjectToOtherKeys(data, data2)
 *
 * // returns {user: ''}
 * ReduceObjectToOtherKeys(data, data2, ['age'])
 */
export const ReduceObjectToOtherKeys = (main: any, reduceTo: any, excludeKeys: string[] = []): any => {
	let results: any = {}
	
	for (const key of Object.keys(main)) {
		if (!excludeKeys.includes(key) && reduceTo[key] !== undefined) {
			results[key] = main[key]
		}
	}
	
	return results
}
