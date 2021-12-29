import {DateCompare, DateParseTS} from './DateManager'

function isObject(object: any) {
	return object !== null && object !== undefined && typeof object === 'object'
}

export const DeepEqual = (object1: any, object2: any): boolean => {
	if (object1 === undefined && object2 === undefined) return true
	if (object1 === null && object2 === null) return true
	
	if ((!object1 && !!object2) || (!!object1 && !object2) || typeof object1 !== typeof object2) return false
	
	if (Array.isArray(object1)) {
		if (object1.length !== object2.length) return false
		
		for (let i = 0; i < object1.length; i++) {
			if (!DeepEqual(object1[i], object2[i])) return false
		}
		
		return true
	}
	
	switch (typeof object1) {
		case 'function':
			return true
		case 'object':
			if (typeof object1 === 'object' && (object1 as any).type?.toString().includes('react.')) return true
			if (typeof object2 === 'object' && (object2 as any).type?.toString().includes('react.')) return true
			
			const keys1 = Object.keys(object1)
			const keys2 = Object.keys(object2)
			
			if (keys1.length !== keys2.length) {
				return false
			}
			
			for (const key of keys1) {
				const val1 = object1[key]
				const val2 = object2[key]
				
				if (typeof val1 !== typeof val2) return false
				
				const areObjects = isObject(val1) && isObject(val2)
				if (
					(areObjects && !DeepEqual(val1, val2)) ||
					(!areObjects && val1 !== val2)
				) {
					return false
				}
			}
			
			return true
		case 'string':
			if (typeof object2 === 'string') {
				const ts1 = DateParseTS(object1)
				if (!!ts1) {
					const ts2 = DateParseTS(object2)
					if (!!ts2) {
						return DateCompare(ts1, 'IsSame', ts2, 'second')
					}
				}
			}
			
			return object1 === object2
		default:
			return object1 === object2
	}
}
