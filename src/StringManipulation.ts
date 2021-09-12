/**
 * Converts a string to snake_case.
 *
 * @example
 * ToSnakeCase('UserToken')  // returns "user_token"
 */
import {CleanNumber, ReplaceAll, RoundTo} from './Functions'

export const ToSnakeCase = (str: string | undefined | null): string => {
	if (!str) return ''
	
	if (str === 'ID') return 'id'
	
	let calcStr = ReplaceAll('-', '_', str.replace('ID', '_id'))
	
	return (
		calcStr[0].toLowerCase() +
		calcStr.slice(1, calcStr.length).replace(/[A-Z1-9]/g, (letter) => `_${letter.toLowerCase()}`)
	)
}

/**
 * Converts a string to kebab-case.
 *
 * @example
 * ToSnakeCase('UserToken')  // returns "user-token"
 */
export const ToKebabCase = (str: string | undefined | null): string => ReplaceAll('_', '-', ToSnakeCase(str))

/**
 * Converts a string to camelCase.
 *
 * @example
 * ToCamelCase('user_token') //  returns "userToken
 */
export const ToCamelCase = (str: string | undefined | null): string => {
	if (!str) return ''
	
	if (str === 'id') return 'ID'
	
	let calcStr = ToSnakeCase(str).replace('_id', 'ID')
	
	return ReplaceAll('_', '', ReplaceAll(' ', '', calcStr.replace(/([-_ ][a-z])/gi, ($1) => {
		return $1.toUpperCase().replace('-', '').replace('_', '').replace(' ', '')
	})))
}

export const ToUpperCaseWords = (str: string | undefined | null): string => {
	let result = UCWords(ReplaceAll('_', ' ', ToSnakeCase(str) ?? '') ?? '') ?? ''
	
	if (result.endsWith(' Id')) {
		return result.substr(0, result.length - 1) + 'D'
	}
	
	return result
}

/**
 * Converts a string to PascalCase.
 *
 * @example
 * ToPascalCase('user_token') //  returns "UserToken
 */
export const ToPascalCase = (str: string | undefined | null): string => {
	let calcStr = ToCamelCase(str)
	
	return calcStr.substr(0, 1).toUpperCase() + calcStr.substr(1)
}

/**
 * Replaces links to an anchor tag.
 *
 * @example
 * // returns <a href='https://www.google.com' target='_blank'>https://www.google.com</a>
 * ReplaceLinks('https://www.google.com')
 */
export const ReplaceLinks = function(subject: string | undefined | null): string {
	if (!subject) return ''
	
	// noinspection RegExpUnnecessaryNonCapturingGroup
	let str = subject.replace(/(?:\r\n|\r|\n)/g, '<br />')
	// noinspection HtmlUnknownTarget
	const target = '<a href=\'$1\' target=\'_blank\'>$1</a>'
	// noinspection RegExpRedundantEscape
	return str.replace(/(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/gi, target)
}

/**
 * Removes script tags.
 *
 * @example
 * // returns "blank"
 * CleanScripts('<script>console.log(1)</script>blank')
 */
export const CleanScripts = function(subject: string | undefined | null): string {
	if (!subject) return ''
	
	return subject.replace(/<.*?script.*?>.*?<\/.*?script.*?>/gim, '')
}

/**
 * Removes any given HTML tag and retains what's inside of the tag.
 *
 * @example
 * // returns "john doe"
 * TextToHTML('<p>john doe</p>')
 */
export const TextToHTML = function(subject: string | undefined | null): string {
	if (!subject) return ''
	
	let str = subject.replace(/(<([^>]+)>)/gi, '')
	// noinspection RegExpUnnecessaryNonCapturingGroup
	return str.replace(/(?:\r\n|\r|\n)/g, '<br />')
}

/**
 * Strips scripts and other tags from HTML
 *
 * @param subject
 * HTMLToText('<p>john doe</p>') // returns john doe
 */
export const HTMLToText = (subject: string | undefined | null): string => CleanScripts(subject).replace(/<[^>]*>/g, '')

export const LeftPad = (subject: string | undefined | null, length: number, padString: string): string => {
	let str = subject ?? ''
	
	while (str.length < length) str = padString + str
	
	return str
}
export const RightPad = (subject: string | undefined | null, length: number, padString: string): string => {
	let str = subject ?? ''
	
	while (str.length < length) str = str + padString
	
	return str
}

/**
 * Returns the given number with a dollar sign.
 *
 * @example
 * // returns $100.00
 * ToCurrency(100)
 */
export const ToCurrency = (value: any, decimals: number = 2): string => {
	return (
		'$' +
		CleanNumber(value).toLocaleString(undefined, {
			maximumFractionDigits: decimals,
			minimumFractionDigits: decimals
		})
	)
}

/**
 * Returns the given number with a dollar sign.
 *
 * @example
 * // returns $100.00
 * ToCurrency(100)
 */
export const ToCurrencyMax = (value: any, decimals: number = 2): string => {
	return (
		'$' +
		CleanNumber(value).toLocaleString(undefined, {
			maximumFractionDigits: decimals
		})
	)
}

/**
 * Converts the given number to a percentage with a percent sign.
 *
 * @example
 * // returns 50%
 * ToPercent(0.5)
 */
export const ToPercent = (value: any, decimals: number = 0): string => {
	return (
		(CleanNumber(value) * 100).toLocaleString(undefined, {
			maximumFractionDigits: decimals,
			minimumFractionDigits: decimals
		}) + '%'
	)
}

/**
 * Converts the given number to a percentage with a percent sign.
 *
 * @example
 * // returns 50%
 * ToPercent(0.5)
 */
export const ToPercentMax = (value: any, decimals: number = 0): string => {
	return (
		(CleanNumber(value) * 100).toLocaleString(undefined, {
			maximumFractionDigits: decimals
		}) + '%'
	)
}

/**
 * Returns the given number with a dollar sign if not empty or 0. Otherwise, returns empty string.
 *
 * @example
 * // returns $100.00
 * ToCurrency(100)
 *
 * // returns ''
 * ToCurrencyBlank('')
 */
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

/**
 * Returns the given number with a dollar sign if not empty or 0. Otherwise, returns dash.
 *
 * @example
 * // returns $100.00
 * ToCurrency(100)
 *
 * // returns ''
 * ToCurrencyBlank('-')
 */
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

/**
 * Converts the given number to a percentage with a percent sign if not empty or 0. Otherwise,
 * returns empty string.
 *
 * @example
 * // returns 50%
 * ToPercent(0.5)
 *
 * // returns ''
 * ToPercent('')
 */
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

/**
 * Converts the given number to a percentage with a percent sign if not empty or 0. Otherwise,
 * returns dash.
 *
 * @example
 * // returns 50%
 * ToPercent(0.5)
 *
 * // returns '-'
 * ToPercent('')
 */
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

/**
 * Returns the given number with decimal places.
 *
 * @example
 * // return 10.00
 * ToDigits(10)
 */
export const ToDigits = function(value: any, decimals: number = 0): string {
	return CleanNumber(value).toLocaleString(undefined, {
		maximumFractionDigits: decimals,
		minimumFractionDigits: decimals
	})
}

/**
 * Returns the given number with decimal places.
 *
 * @example
 * // return 10.00
 * ToDigits(10)
 */
export const ToDigitsMax = function(value: any, decimals: number = 0): string {
	return CleanNumber(value).toLocaleString(undefined, {
		maximumFractionDigits: decimals
	})
}

/**
 * Returns the given number with decimal places if not empty or 0. Otherwise,
 * returns empty string.
 *
 * @example
 * // return 10.00
 * ToDigits(10)
 *
 * // returns ''
 * ToDigits('')
 */
export const ToDigitsBlank = function(value: any, decimals: number = 0) {
	if (!value || isNaN(value) || CleanNumber(value) === 0) {
		return ''
	}
	
	return CleanNumber(value).toLocaleString(undefined, {
		maximumFractionDigits: decimals,
		minimumFractionDigits: decimals
	})
}

/**
 * Returns the given number with decimal places if not empty or 0. Otherwise,
 * returns dash.
 *
 * @example
 * // return 10.00
 * ToDigits(10)
 *
 * // returns '-'
 * ToDigits('')
 */
export const ToDigitsDash = function(value: any, decimals: number = 0) {
	if (!value || isNaN(value) || CleanNumber(value) === 0) {
		return '-'
	}
	
	return CleanNumber(value).toLocaleString(undefined, {
		maximumFractionDigits: decimals,
		minimumFractionDigits: decimals
	})
}

export const DigitsNth = (value: any): string | null => {
	let result = ToDigits(value)
	
	if (!result) return null
	
	switch (result.substr(-2)) {
		case '11':
		case '12':
		case '13':
			result += 'th'
			break
		default:
			switch
				(result.substr(-1)) {
				case '1':
					result += 'st'
					break
				case '2':
					result += 'nd'
					break
				case '3':
					result += 'rd'
					break
				default:
					result += 'th'
					break
			}
	}
	
	return result
}

/**
 * Converts a string to an array.
 *
 * @example
 * // returns ['john doe']
 * ToStringArray('john doe')
 */
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

/**
 * Returns a formatted ssn with dashes.
 *
 * @example
 * // returns 123-12-1234
 * FormatSSN('123121234')
 */
export const FormatSSN = (ssn: string | null | undefined): string => {
	// remove all non-dash and non-numerals
	let val = (ssn ?? '').replace(/[^\d-]/g, '')
	
	// add the first dash if number from the second group appear
	val = val.replace(/^(\d{3})-?(\d{1,2})/, '$1-$2')
	
	// add the second dash if numbers from the third group appear
	val = val.replace(/^(\d{3})-?(\d{2})-?(\d{1,4})/, '$1-$2-$3')
	
	// remove misplaced dashes
	val = val.split('').filter((val, idx) => {
		return val !== '-' || idx === 3 || idx === 6
	}).join('')
	
	// enforce max length
	return val.substring(0, 11)
}

/**
 * Returns a formatted ssn with dashes.
 *
 * @example
 * // returns 123-12-1234
 * FormatSSN('123121234')
 */
export const FormatPhoneNumber = (phone: string | null | undefined): string => {
	if (!phone) return ''
	
	const cleanPhone = ReplaceAll(['(', ')', '-', ' '], '', phone)
	
	let processPhone = cleanPhone.substr(0, 10)
	
	let appendPhone = cleanPhone.substr(10)
	
	
	let val = ''
	
	const areaCode = processPhone.substring(0, 3)
	const middle = processPhone.substring(3, 6)
	const last = processPhone.substring(6, 10)
	
	if (processPhone.length > 6) {
		val = `(${areaCode}) ${middle}-${last}`
	} else if (processPhone.length > 3) {
		val = `(${areaCode}) ${middle}`
	} else if (processPhone.length > 0) {
		val = `(${areaCode})`
	}
	
	// enforce max length
	return val + (!!appendPhone ? ' ' + appendPhone : '')
}

/**
 * Returns a formatted phone number with parenthesis.
 *
 * @example
 * // returns (555) 555-1234
 * FormatPhoneNumber('5555551234')
 */
export const FormatPhoneNumberOld = (phone: string, forceNumeric: boolean = false) => {
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

/**
 * Returns a formatted phone number with dots.
 *
 * @example
 * // returns 555.555.1234
 * FormatPhoneNumberDots('5555551234')
 */
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

/**
 * Formats a zip code by adding a hyphen in a 9 digit code.
 *
 * @example
 * // returns "12345-6789"
 * FormatZip('123456789')
 */
export const FormatZip = (zip: string) => {
	//Filter only numbers from the input
	let cleaned = ('' + zip).replace(/\D/g, '')
	
	// check if the input is a 9 digit code
	if (cleaned.length === 9) {
		cleaned = cleaned.replace(/(\d{5})/, '$1-')
	}
	
	return cleaned
}

/**
 * Adds "http" on urls that don't have it.
 *
 * @example
 * // returns "http://www.google.com"
 * FormatExternalURL('www.google.com')
 */
export const FormatExternalURL = (url: string): string => {
	if (!!url) {
		if (!url.startsWith('http')) {
			return 'http://' + url
		}
		
		return url
	}
	
	return ''
}

/**
 * Returns formatted full name.
 *
 * @example
 * // returns 'Doe, John Smith, Jr.'
 * DisplayNameFromFL('John', 'Doe', 'Smith', 'Jr.')
 */
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

/**
 * Returns formatted name from an object.
 *
 * @example
 * // returns 'Doe, John Smith, Jr.'
 * DisplayNameFromObject({
 *   first_name: 'John',
 *   last_name: 'Doe',
 *   middle_name: 'Smith',
 *   suffix_name: 'Jr.',
 * })
 */
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

/**
 * Converts the first character of each word of a string to uppercase.
 *
 * @example
 * // return This Is Awesome
 * UCWords('This is awesome')
 */
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

/**
 * Generates a random string with a given length and valid characters.
 *
 * @example
 * // returns '32112'
 * RandomString(5, '12345')
 */
export const RandomString = (length: number, validChars = 'ABCDEFGHJKLMNPQRTUVWXYZ2346789') => {
	const validCharLength = validChars.length - 1
	
	let result = ''
	for (let i = 0; i < length; i++) {
		result += validChars.substr(Math.floor(Math.random() * validCharLength), 1)
	}
	
	const ts = new Date().valueOf().toString()
	
	if (length > ts.length * 0.5) {
		const offset = RoundTo((length - ts.length) / 2, 0)
		
		return result.substr(0, offset) + ts + result.substr(offset + ts.length)
	}
	
	return result
}
