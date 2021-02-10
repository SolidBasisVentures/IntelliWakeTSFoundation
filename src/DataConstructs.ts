import {ReplaceAll} from './StringManipulation'

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
export const DataToCSVExport = function(filename: string, csvData: any) {
	const csvString = csvData
		.map((row: any) =>
			row
				.map((item: any) =>
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
 * A wrapper function for JSON.parse with try/catch.
 */
export const JSONParse = <T = any>(json: any): T | null => {
	if (!json) {
		return null
	}
	
	let returnObj = null
	
	try {
		returnObj = JSON.parse(json)
	} catch (err) {
		// console.log('JSONParse', err)
		
		return null
	}
	
	return returnObj
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
			if (propsToRemove[key] === result[key]) {
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
			const propsToRemove = propsToRemoveArray.find((propsToRemove) => propsToRemove.id === key)
			
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
