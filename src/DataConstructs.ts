import {ReplaceAll} from './StringManipulation'

export type IChanges = {[key: string]: any}
export const initialChanges = {}

export type IIDChanges = {[key: number]: {[key: string]: any}}
export const initialIDChanges = {}

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
export const RemoveDupPropertiesByIDArray = (original: IIDChanges, propsToRemoveArray: any[]): IIDChanges => {
	const result: any = {...original}
	
	for (const key in original) {
		if (original.hasOwnProperty(key)) {
			const propsToRemove = propsToRemoveArray.find((propsToRemove) => propsToRemove.ID === key)
			
			if (!!propsToRemove) {
				if (propsToRemove.hasOwnProperty(key)) {
					const subResult = RemoveDupProperties(result[key], propsToRemove)
					
					if (Object.keys(subResult).length === 0) {
						delete result[key]
					} else {
						result[key] = subResult
					}
				}
			}
		}
	}
	
	return result
}
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
export const ReduceObjectToOtherKeys = (main: any, reduceTo: any, excludeKeys: string[] = []): any => {
	let results: any = {}
	
	for (const key of Object.keys(main)) {
		if (!excludeKeys.includes(key) && reduceTo[key] !== undefined) {
			results[key] = main[key]
		}
	}
	
	return results
}
