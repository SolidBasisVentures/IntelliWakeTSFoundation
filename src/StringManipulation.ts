export const ToSnakeCase = (str: string): string => {
	if (str === 'ID') return 'id'
	
	let calcStr = str.replace('ID', '_id')
	
	return (
		calcStr[0].toLowerCase() +
		calcStr.slice(1, calcStr.length).replace(/[A-Z1-9]/g, (letter) => `_${letter.toLowerCase()}`)
	)
}
export const ReplaceAll = function(find: string, replace: string, subject: string): string {
	// eslint-disable-next-line no-useless-escape
	return subject.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'), 'g'), replace)
}
export const ReplaceLinks = function(subject: string): string {
	let str = subject.replace(/(?:\r\n|\r|\n)/g, '<br />')
	// noinspection HtmlUnknownTarget
	const target = '<a href=\'$1\' target=\'_blank\'>$1</a>'
	// noinspection RegExpRedundantEscape
	return str.replace(/(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/gi, target)
}
export const CleanScripts = function(subject: string): string {
	return subject.replace(/<.*?script.*?>.*?<\/.*?script.*?>/gim, '')
}
export const TextToHTML = function(subject: string): string {
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
export const ToDigits = function(value: any, decimals: number = 2): string {
	return CleanNumber(value).toLocaleString(undefined, {
		maximumFractionDigits: decimals,
		minimumFractionDigits: decimals
	})
}
export const ToDigitsBlank = function(value: any, decimals: number = 2) {
	if (!value || isNaN(value) || CleanNumber(value) === 0) {
		return ''
	}
	
	return CleanNumber(value).toLocaleString(undefined, {
		maximumFractionDigits: decimals,
		minimumFractionDigits: decimals
	})
}
export const ToDigitsDash = function(value: any, decimals: number = 2) {
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
