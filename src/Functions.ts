export type IChanges = {[key: string]: any}
export const initialChanges = {}

export type IIDChanges = {[key: number]: {[key: string]: any}}
export const initialIDChanges = {}

export const ToSnakeCase = (str: string): string => {
	if (str === 'ID') return 'id'

	let calcStr = str.replace('ID', '_id')

	return (
		calcStr[0].toLowerCase() +
		calcStr.slice(1, calcStr.length).replace(/[A-Z1-9]/g, (letter) => `_${letter.toLowerCase()}`)
	)
}

export function PagesForRange(current: number, length: number, spread: number = 2): (number | null)[] {
	if (!(length > 0)) {
		return []
	}

	const current_adjusted = current < 1 ? 1 : current > length ? length : current
	const spread_adjusted = current < spread || current > length - spread ? spread : Math.ceil(spread / 2)

	let left = current_adjusted - spread_adjusted,
		right = current_adjusted + spread_adjusted,
		range: number[] = [],
		rangeWithNull: (number | null)[] = [],
		l

	for (let i = 1; i <= length; i++) {
		if (i === 1 || i === length || (i >= left && i <= right)) {
			range.push(i)
		}
	}

	for (let i of range) {
		if (l) {
			if (i - l === 2) {
				rangeWithNull.push(l + 1)
			} else if (i - l !== 1) {
				rangeWithNull.push(null)
			}
		}
		rangeWithNull.push(i)
		l = i
	}

	return rangeWithNull
}

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

export const ReplaceAll = function (find: string, replace: string, subject: string): string {
	// eslint-disable-next-line no-useless-escape
	return subject.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'), 'g'), replace)
}

export const ReplaceLinks = function (subject: string): string {
	let str = subject.replace(/(?:\r\n|\r|\n)/g, '<br />')
	// noinspection HtmlUnknownTarget
	const target = "<a href='$1' target='_blank'>$1</a>"
	// noinspection RegExpRedundantEscape
	return str.replace(/(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/gi, target)
}

export const CleanScripts = function (subject: string): string {
	return subject.replace(/<.*?script.*?>.*?<\/.*?script.*?>/gim, '')
}

export const TextToHTML = function (subject: string): string {
	let str = subject.replace(/(<([^>]+)>)/gi, '')
	return str.replace(/(?:\r\n|\r|\n)/g, '<br />')
}

export const LeftPad = (subject: string, length: number, padString: string): string => {
	let str = subject

	while (str.length < length) str = padString + str

	return str
}

export const RightPad = (subject: string, length: number, padString: string): string => {
	let str = subject

	while (str.length < length) str = str + padString

	return str
}

export const Trunc = (subject: string, length: number): string => {
	return subject.length > length ? subject.substr(0, length - 1) + '&hellip;' : subject
}

export const CleanNumber = (value: any): number => {
	if (!value) return 0

	let str = value.toString()
	str = ReplaceAll('$', '', str)
	str = ReplaceAll(',', '', str)
	str = ReplaceAll('%', '', str)
	if (isNaN(str)) return NaN
	return parseFloat(str)
}

export const ToCurrency = (value: any, decimals: number = 2): string => {
	return (
		'$' +
		CleanNumber(value).toLocaleString(undefined, {
			maximumFractionDigits: decimals,
			minimumFractionDigits: decimals
		})
	)
}

export const ToPercent = (value: any, decimals: number = 0): string => {
	return (
		(CleanNumber(value) * 100).toLocaleString(undefined, {
			maximumFractionDigits: decimals,
			minimumFractionDigits: decimals
		}) + '%'
	)
}

export const ToCurrencyBlank = (value: any, decimals: number = 2): string => {
	if (!value || isNaN(value) || CleanNumber(value) === 0) {
		return ''
	}

	return (
		'$' +
		CleanNumber(value).toLocaleString(undefined, {
			maximumFractionDigits: decimals,
			minimumFractionDigits: decimals
		})
	)
}

export const ToCurrencyDash = (value: any, decimals: number = 2): string => {
	if (!value || isNaN(value) || CleanNumber(value) === 0) {
		return '-'
	}

	return (
		'$' +
		CleanNumber(value).toLocaleString(undefined, {
			maximumFractionDigits: decimals,
			minimumFractionDigits: decimals
		})
	)
}

export const ToPercentBlank = (value: any, decimals: number = 2): string => {
	if (!value || isNaN(value) || CleanNumber(value) === 0) {
		return ''
	}

	return (
		(CleanNumber(value) * 100).toLocaleString(undefined, {
			maximumFractionDigits: decimals,
			minimumFractionDigits: decimals
		}) + '%'
	)
}

export const ToPercentDash = (value: any, decimals: number = 2): string => {
	if (!value || isNaN(value) || CleanNumber(value) === 0) {
		return '-'
	}

	return (
		(CleanNumber(value) * 100).toLocaleString(undefined, {
			maximumFractionDigits: decimals,
			minimumFractionDigits: decimals
		}) + '%'
	)
}

export const ToDigits = function (value: any, decimals: number = 2): string {
	return CleanNumber(value).toLocaleString(undefined, {
		maximumFractionDigits: decimals,
		minimumFractionDigits: decimals
	})
}

export const ToDigitsBlank = function (value: any, decimals: number = 2) {
	if (!value || isNaN(value) || CleanNumber(value) === 0) {
		return ''
	}

	return CleanNumber(value).toLocaleString(undefined, {
		maximumFractionDigits: decimals,
		minimumFractionDigits: decimals
	})
}

export const ToDigitsDash = function (value: any, decimals: number = 2) {
	if (!value || isNaN(value) || CleanNumber(value) === 0) {
		return '-'
	}

	return CleanNumber(value).toLocaleString(undefined, {
		maximumFractionDigits: decimals,
		minimumFractionDigits: decimals
	})
}

export const ToStringArray = (value: string | string[]): string[] => {
	if (!value) {
		return []
	}

	if (typeof value === 'string') {
		return [value]
	} else {
		return value
	}
}

export const GoogleMapsGPSLink = (dataArray: any, prefix: string = ''): string => {
	const latitude = dataArray[prefix + 'latitude'] ?? ''
	let longitude = dataArray[prefix + 'longitude'] ?? ''
	return 'http://maps.google.com/maps?q=' + latitude + ',' + longitude
}

export const GoogleMapsAddressLink = (dataArray: any, prefix: string = ''): string => {
	let address = (dataArray[prefix + 'address1'] ?? '') + ' '
	if (dataArray[prefix + 'address2']) {
		address += dataArray[prefix + 'address2'] + ' '
	}
	address += (dataArray[prefix + 'city'] ?? '') + ', '
	address += (dataArray[prefix + 'state'] ?? '') + ' '
	address += dataArray[prefix + 'zip'] ?? ''
	return 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(address)
}

export const IsValidInputDecimal = (value: string): boolean => {
	// noinspection RegExpUnexpectedAnchor
	const regEx = new RegExp('/^\\d{1,}(\\.\\d{0,4})?$/')

	return !value || regEx.test(value)
}

export const FormatPhoneNumber = (phone: string, forceNumeric: boolean = false) => {
	//Filter only numbers from the input
	const cleaned = forceNumeric ? ('' + phone).replace(/\D/g, '') : '' + phone

	//Check if the input is of correct
	const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)

	if (match) {
		//Remove the matched extension code
		//Change this to format for any country code.
		let intlCode = match[1] ? '+1 ' : ''
		return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
	}

	return phone
}

export const FormatPhoneNumberDots = (phone: string, forceNumeric: boolean = false) => {
	//Filter only numbers from the input
	const cleaned = forceNumeric ? ('' + phone).replace(/\D/g, '') : '' + phone

	//Check if the input is of correct
	const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)

	if (match) {
		//Remove the matched extension code
		//Change this to format for any country code.
		let intlCode = match[1] ? '+1 ' : ''
		return [intlCode, match[2], '.', match[3], '.', match[4]].join('')
	}

	return phone
}

export const FormatZip = (zip: string) => {
	//Filter only numbers from the input
	let cleaned = ('' + zip).replace(/\D/g, '')

	//Check if the input is of correct
	let match = cleaned.match(/^\d{5}$|^\d{5}-\d{4}$/)

	if (match) {
		return match.join('-')
	}

	return zip
}

export const FormatExternalURL = (url: string): string => {
	if (!!url) {
		if (!url.startsWith('http')) {
			return 'http://' + url
		}

		return url
	}

	return ''
}

export interface ISortColumn {
	primarySort: string
	primaryAscending: boolean
	primaryEmptyToBottom: null | 'string' | 'number' | 'null'
	secondarySort: string | null
	secondaryAscending: boolean
	secondaryEmptyToBottom: null | 'string' | 'number' | 'null'
}

export const initialSortColumn: ISortColumn = {
	primarySort: '',
	primaryAscending: true,
	primaryEmptyToBottom: null,
	secondarySort: null,
	secondaryAscending: true,
	secondaryEmptyToBottom: null
}

export const SortColumnUpdate = (
	columnToSort: string,
	sortColumn: ISortColumn,
	firstClickAscending: boolean = true,
	emptyToBottom: null | 'string' | 'number' | 'null' = null
): ISortColumn => {
	if (sortColumn.primarySort === columnToSort) {
		return {
			...sortColumn,
			primaryAscending: !sortColumn.primaryAscending,
			primaryEmptyToBottom: emptyToBottom
		}
	} else {
		return {
			primarySort: columnToSort,
			primaryAscending: firstClickAscending,
			primaryEmptyToBottom: emptyToBottom,
			secondarySort: sortColumn.primarySort,
			secondaryAscending: sortColumn.primaryAscending,
			secondaryEmptyToBottom: sortColumn.primaryEmptyToBottom
		}
	}
}

export const SortColumns = <T>(arrayTable: T[], sortColumn: ISortColumn): T[] => {
	return arrayTable.sort((a: any, b: any) =>
		!sortColumn.primarySort
			? 0
			: SortColumnResult(
					a[sortColumn.primarySort] ?? null,
					b[sortColumn.primarySort] ?? null,
					sortColumn.primaryAscending,
					sortColumn.primaryEmptyToBottom
			  ) ??
			  (!sortColumn.secondarySort
					? 0
					: SortColumnResult(
							a[sortColumn.secondarySort] ?? null,
							b[sortColumn.secondarySort] ?? null,
							sortColumn.secondaryAscending,
							sortColumn.secondaryEmptyToBottom
					  ))
	)
}

const SortColumnResult = (
	valueA: any,
	valueB: any,
	isAscending: boolean,
	emptyToBottom: null | 'string' | 'number' | 'null'
): number => {
	if (!!emptyToBottom) {
		if (!valueA && !!valueB) return 1
		if (!!valueA && !valueB) return -1
	}

	const numbA = CleanNumber(valueA)
	const numbB = CleanNumber(valueB)

	if (isNaN(numbA ?? 0) || isNaN(numbB ?? 0)) {
		return (valueA ?? '').localeCompare(valueB ?? '', undefined, {sensitivity: 'base'}) * (isAscending ? 1 : -1)
	}

	return (numbA - numbB) * (isAscending ? 1 : -1)
}

export const SearchTerms = (search: string | null | undefined, toLowerCase = true): string[] =>
	(search ?? '')
		.trim()
		.split(/(\s+)/)
		.map((term) => (toLowerCase ? term.trim().toLowerCase() : term.trim()))
		.filter((term) => !!term)

export const StringContainsSearchTerms = (value: string | null | undefined, searchTerms: string[]): boolean => {
	if (searchTerms.length === 0) return true

	if (!value) return false

	return searchTerms.every((term) => value.includes(term))
}

export const StringContainsSearch = (value: string | null | undefined, search: string | null | undefined): boolean => {
	if (!search) return true

	if (!value) return false

	const searchTerms = SearchTerms(search)

	return StringContainsSearchTerms(value, searchTerms)
}

export const ObjectContainsSearchTerms = (object: any | null | undefined, searchTerms: string[]): boolean => {
	if (searchTerms.length === 0) return true

	if (!object) return false

	return searchTerms.every((term) =>
		Object.keys(object).some((column) => (object[column] ?? '').toString().toLowerCase().includes(term))
	)
}

export const ObjectContainsSearch = (object: any | null | undefined, search: string | null | undefined): boolean => {
	if (!search) return true

	if (!object) return false

	const searchTerms = SearchTerms(search)

	return ObjectContainsSearchTerms(object, searchTerms)
}

export const SearchRows = <T>(arrayTable: T[], search: string): T[] => {
	const searchTerms = SearchTerms(search)

	if (searchTerms.length === 0) {
		return arrayTable
	}

	return (arrayTable ?? []).filter((arrayRow: any) => ObjectContainsSearchTerms(arrayRow, searchTerms))
}

export const SearchRow = (searchItem: any, search: string): boolean => {
	const searchTerms = SearchTerms(search)

	if (searchTerms.length === 0) {
		return true
	}

	return ObjectContainsSearchTerms(searchItem, searchTerms)
}

export const SearchSort = <T>(arrayTable: T[], search: string, sortColumn: ISortColumn): T[] => {
	return SortColumns(SearchRows(arrayTable, search), sortColumn)
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

export const GenerateUUID = () => {
	let d = new Date().getTime() //Timestamp
	let d2 = (performance && performance.now && performance.now() * 1000) || 0 //Time in microseconds since page-load or 0 if unsupported
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		let r = Math.random() * 16 //random number between 0 and 16
		if (d > 0) {
			//Use timestamp until depleted
			r = (d + r) % 16 | 0
			d = Math.floor(d / 16)
		} else {
			//Use microseconds since page-load if supported
			r = (d2 + r) % 16 | 0
			d2 = Math.floor(d2 / 16)
		}
		return (c === 'x' ? r : r & (0x3 | 0x8)).toString(16)
	})
}

export const DisplayNameFromFL = (first?: string, last?: string, middle?: string, suffix?: string): string => {
	let returnName = ''

	if (!!last) {
		returnName += last

		if (!!first) {
			returnName += ', ' + first

			if (!!middle) {
				returnName += ' ' + middle
			}
		} else if (!!middle) {
			returnName += ', ' + middle
		}
	} else {
		if (!!first) {
			returnName += first

			if (!!middle) {
				returnName += ' ' + middle
			}
		} else {
			if (!!middle) {
				returnName += middle
			}
		}
	}

	if (!!suffix) {
		if (!!returnName) {
			returnName += ', '
		}

		returnName += suffix
	}

	return returnName
}

export const DisplayNameFromObject = (object?: any, prefix?: string): string => {
	if (!object) return ''

	const actualPrefix = !!prefix ? `_${prefix}` : ''

	return DisplayNameFromFL(
		object[actualPrefix + 'first_name'],
		object[actualPrefix + 'last_name'],
		object[actualPrefix + 'middle_name'],
		object[actualPrefix + 'suffix_name']
	)
}

export const IsOn = (value: any): boolean => {
	if (!value) {
		return false
	}

	if (value === true) {
		return value
	}

	const floatValue = parseFloat(value)
	if (!isNaN(floatValue)) {
		return floatValue > 0
	}

	return ['true', 'active', 'on', 'yes', 'y'].includes(value.toString().toLowerCase().trim())
}

export const UCWords = (str: string | null): string | null => {
	if (!str) {
		return str
	}
	let strVal = ''
	const strItems = str.toLowerCase().split(' ')
	for (let chr = 0; chr < strItems.length; chr++) {
		strVal += strItems[chr].substring(0, 1).toUpperCase() + strItems[chr].substring(1, strItems[chr].length) + ' '
	}
	return strVal.trim()
}

export const RandomString = (length: number, validChars = 'ABCDEFGHJKLMNPQRTUVWXYZ2346789') => {
	const validCharLength = validChars.length - 1

	let result = ''
	for (let i = 0; i < length; i++) {
		result += validChars.substr(Math.floor(Math.random() * validCharLength), 1)
	}

	return result
}

export type TFindIsActive = boolean | null

export const AddressCopy = (
	fromObject: any,
	fromPrefix: string,
	toObject: any,
	toPrefix: string,
	includeName = true,
	includePhone = true,
	includeTimeZone = true,
	includeGPS = true
): void => {
	if (includeName && !!fromObject[toPrefix + 'name']) {
		toObject[toPrefix + 'name'] = fromObject[fromPrefix + 'name']
	}
	toObject[toPrefix + 'address_1'] = fromObject[fromPrefix + 'address_1']
	toObject[toPrefix + 'address_2'] = fromObject[fromPrefix + 'address_2']
	toObject[toPrefix + 'city'] = fromObject[fromPrefix + 'city']
	toObject[toPrefix + 'state'] = fromObject[fromPrefix + 'state']
	toObject[toPrefix + 'zip'] = fromObject[fromPrefix + 'zip']
	if (includePhone && !!fromObject[toPrefix + 'phone']) {
		toObject[toPrefix + 'phone'] = fromObject[fromPrefix + 'phone']
	}
	if (includeTimeZone && !!fromObject[toPrefix + 'timezone']) {
		toObject[toPrefix + 'timezone'] = fromObject[fromPrefix + 'timezone']
	}
	if (includeGPS && !!fromObject[toPrefix + 'latitude']) {
		toObject[toPrefix + 'latitude'] = fromObject[fromPrefix + 'latitude']
	}
	if (includeGPS && !!fromObject[toPrefix + 'longitude']) {
		toObject[toPrefix + 'longitude'] = fromObject[fromPrefix + 'longitude']
	}
}

export const AddressValid = (address: any, prefix?: string): boolean => {
	return !!address[(prefix ?? '') + 'address_1']
}

export const AddressSingleRow = (object: any, prefix?: string): string => {
	const usePrefix = prefix ?? ''

	let singleRow = (object[usePrefix + 'address_1'] ?? '').trim()

	if (!!(object[usePrefix + 'city'] ?? '')) singleRow += ', ' + object[usePrefix + 'city']
	if (!!(object[usePrefix + 'state'] ?? '')) singleRow += ', ' + object[usePrefix + 'state']
	if (!!(object[usePrefix + 'zip'] ?? '')) singleRow += ', ' + object[usePrefix + 'zip']

	return singleRow
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
