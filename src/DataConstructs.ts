import {ReplaceAll} from './StringManipulation'

export type IChanges = {[key: string]: any}
export const initialChanges = {}

export const AddChange = (name: string, value: any, changes: IChanges): IChanges => ({
	...changes,
	[name]: value
})

export type IIDChanges = {[key: number]: {[key: string]: any}}
export const initialIDChanges = {}

export const AddIDChange = (id: number, name: string, value: any, idChanges: IIDChanges): IIDChanges => ({
	...idChanges,
	[id]: {
		...idChanges[id],
		[name]: value
	}
})

/**
 * Converts Data to CSV. Creates a download link and triggers
 * click event on it to download the file.
 */
export const DataToCSVExport = function (filename: string, csvData: any) {
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
export const DataToCSVExportNoQuotes = function (filename: string, csvData: any) {
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
export const JSONParse = (json: string | null | undefined): object | null => {
	if (!json) {
		return null
	}

	let returnObj = null

	try {
		returnObj = JSON.parse(json)
	} catch (err) {
		console.log('JSONParse', err)
	}

	return returnObj
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
export const RemoveDupProperties = (original: IChanges, propsToRemove: IChanges): IChanges => {
	const result: any = {...original}

	for (const key in propsToRemove) {
		if (propsToRemove.hasOwnProperty(key)) {
			if (result.hasOwnProperty(key)) {
				if (propsToRemove[key] === result[key]) {
					delete result[key]
				}
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
export const RemoveDupPropertiesByID = (original: IIDChanges, propsToRemove: IIDChanges): IIDChanges => {
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
export const RemoveDupPropertiesByIDArray = (original: IIDChanges, propsToRemoveArray: any[]): IIDChanges => {
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
