/**
 * Converts a string to snake_case.
 *
 * @example
 * ToSnakeCase('UserToken')  // returns "user_token"
 *
 */
import {CleanNumber, CleanNumberNull, GreaterNumber, ReplaceAll, RoundTo, ToArray} from './Functions'
import {isNullUndefined} from './SortSearch'

/**
 * Splits a string into its component words
 * @param str
 * @constructor
 *
 */
export const ToWords = (str: string | string[] | undefined | null): string[] => {
	if (!str) return []

	const strArray = ToArray(str)

	let results: string[] = []

	const separators = [' ', '_', ',', '-', '/', '\\', "'", '"', '=', '+', '~', '.', ',', '(', ')', '<', '>', '{', '}']

	loop_array: for (const strItem of strArray) {
		for (const separator of separators) {
			if (strItem.includes(separator)) {
				results = ToWords([...results, ...strItem.split(separator).filter((strText) => !!strText)])
				continue loop_array
			}
		}

		results = [
			...results,
			...strItem
				.replace(/([a-zA-Z])([0-9])/g, '$1 $2') // Insert space before numbers preceded by letters
				.replace(/([0-9])([a-zA-Z])/g, '$1 $2') // Insert space after numbers followed by letters
				.replace(/([a-z0-9])([A-Z])/g, '$1 $2') // Insert space before capital letters preceded by lowercase or numbers
				.replace(/([A-Z]+)([A-Z][a-z0-9])/g, '$1 $2') // Insert space between consecutive capital letters followed by lowercase or numbers
				.replace(/([a-zA-Z0-9])([:;@#])/g, '$1 $2') // Insert space before special characters
				.replace(/([:;@#])([a-zA-Z0-9])/g, '$1 $2') // Insert space after special characters
				.split(' ')
		].filter((strText) => !!strText)
	}

	return results.filter((strText) => !!strText)
}

/**
 * Splits a string into its component text without whitespaces
 * @param str
 * @constructor
 *
 */
export const SplitNonWhiteSpace = (str: string | string[] | undefined | null): string[] => {
	if (!str) return []

	const strArray = ToArray(str)

	let results: string[] = []

	const separators = [' ', '_', ',', '-', '/', '\\', "'", '"', '=', '+', '~', '.', ',', '(', ')', '<', '>', '{', '}']

	loop_array: for (const strItem of strArray) {
		for (const separator of separators) {
			if (strItem.includes(separator)) {
				results = SplitNonWhiteSpace([...results, ...strItem.split(separator).filter((strText) => !!strText)])
				continue loop_array
			}
		}

		results = [...results, strItem].filter((strText) => !!strText)
	}

	return results.filter((strText) => !!strText)
}

/**
 *
 * @param str
 * @constructor
 *
 */
export const ToFirstLetterUpper = (str: string | undefined | null): string => {
	if (!str) return ''

	return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase()
}

/**
 *
 * @param str
 * @constructor
 *
 */
export const ToFirstLetterUpperSmart = (str: string | undefined | null): string => {
	if (!str) return ''

	if (str === str.toUpperCase()) return str

	if (str.toLowerCase() === 'id') return 'ID'

	return ToFirstLetterUpper(str)
}

/**
 * To Snake Case ('To Snake Case' = 'to_snake_case')
 * @param str
 * @constructor
 *
 */
export const ToSnakeCase = (str: string | string[] | undefined | null): string =>
	ToWords(str)
		.map((st) => st.toLowerCase())
		.join('_')

/**
 * Converts a string to kebab-case. *
 * @example
 * ToSnakeCase('UserToken')  // returns "user-token"
 *
 */
export const ToKebabCase = (str: string | string[] | undefined | null): string =>
	ToWords(str)
		.map((st) => st.toLowerCase())
		.join('-')

/**
 * Converts a string to camelCase.
 *
 * @example
 * ToCamelCase('user_token') //  returns "userToken
 *
 */
export const ToCamelCase = (str: string | string[] | undefined | null): string =>
	ToWords(str)
		.map((st, idx) => (!idx ? st.toLowerCase() : st === st.toUpperCase() ? st : ToFirstLetterUpperSmart(st)))
		.join('')
/**
 * To Upper Case Words
 * @param str
 * @constructor
 *
 */
export const ToUpperCaseWords = (str: string | string[] | undefined | null): string =>
	ToWords(str)
		.map((st) => (st === st.toUpperCase() ? st : ToFirstLetterUpperSmart(st)))
		.join(' ')

/**
 * Converts a string to PascalCase.
 *
 * @example
 * ToPascalCase('user_token') //  returns "UserToken
 *
 */
export const ToPascalCase = (str: string | string[] | undefined | null): string =>
	ToWords(str)
		.map((st) => (st === st.toUpperCase() ? st : ToFirstLetterUpperSmart(st)))
		.join('')

/**
 * Takes a string and returns the initials, like "Dennis J Peters" = "DJP", and "Peters, Dennis J" = "DJP"
 * @param str
 * @constructor *
 */
export const ToInitials = (str: string | string[] | undefined | null): string => {
	if (!str) return ''

	if (typeof str === 'string') {
		const commaItems = str.split(',')
		if (commaItems.length === 2) {
			return ToWords([commaItems[1], commaItems[0]])
				.map((st) => st.substring(0, 1).toUpperCase())
				.join('')
		}
	}

	return ToWords(str)
		.map((st) => st.substring(0, 1).toUpperCase())
		.join('')
}

/**
 * Checks if a string contains HTML tags
 *
 * @param {string | undefined | null} str - The string to check for HTML tags
 * @returns {boolean} True if the string contains HTML tags, False otherwise
 */
export const IncludesHTML = (str: string | undefined | null): boolean => {
	if (!str) return false

	return /<[^>]*>/.test(str)
}

/**
 * Replaces all URLs in a string with anchor tags, unless there is an "<img " item in the string
 * @param {string|null|undefined} subject - The string to replace the links in.
 * @param {string|null} [classes] - Optional classes to add to the anchor tag.
 * @returns {string} - The updated string with anchor tags replacing URLs.
 *
 * @example
 * // returns <a href='https://www.google.com' target='_blank' class='testClass'>https://www.google.com</a>
 * ReplaceLinks('https://www.google.com', 'testClass')
 *
 */
export const ReplaceLinks = function (subject: string | undefined | null, classes?: string | null): string {
	if (!subject) return ''

	if (subject.includes('<img ')) return subject

	// noinspection RegExpUnnecessaryNonCapturingGroup
	let str = subject.replace(/(?:\r\n|\r|\n)/g, '<br />')
	// noinspection HtmlUnknownTarget
	const target = !classes
		? "<a href='$1' target='_blank'>$1</a>"
		: `<a href="$1" target="_blank" class="${classes}">$1</a>`
	// noinspection RegExpRedundantEscape
	return str.replace(/(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/gi, target)
}

/**
 * Removes script tags.
 *
 * @example
 * // returns "blank"
 * CleanScripts('<script>console.log(1)</script>blank')
 *
 */
export const CleanScripts = function (subject: string | number | undefined | null): string {
	if (!subject) return ''

	return subject.toString().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
	// return subject.replace(/<.*?script.*?>.*?<\/.*?script.*?>/gim, '')
}

/**
 * Converts the given text to HTML format.
 *
 * @param {string | number | undefined | null} subject - The text to convert.
 * @returns {string} - The converted HTML string.
 */
export const TextToHTML = function (subject: string | number | undefined | null): string {
	if (!subject) return ''

	let str = CleanScripts(subject) //.replace(/(<([^>]+)>)/gi, '')
	// noinspection RegExpUnnecessaryNonCapturingGroup
	return str.replace(/(?:\r\n|\r|\n)/g, '<br />')
}

/**
 * Strips scripts and other tags from HTML
 *
 * @param subject
 * HTMLToText('<p>john doe</p>') // returns john doe
 *
 */
export const HTMLToText = (subject: string | number | undefined | null): string =>
	CleanScripts(subject).replace(/<[^>]*>/g, '')

/**
 *
 * @param subject
 * @param length
 * @param padString
 * @constructor
 *
 */
export const LeftPad = (subject: string | number | undefined | null, length: number, padString: string): string => {
	let str = (subject ?? '').toString()

	while (str.length < length) str = padString + str

	return str
}
/**
 *
 * @param subject
 * @param length
 * @param padString
 * @constructor
 *
 */
export const RightPad = (subject: string | number | undefined | null, length: number, padString: string): string => {
	let str = (subject ?? '').toString()

	while (str.length < length) str = str + padString

	return str
}

/**
 * Returns the given number with a dollar sign.
 *
 * @example
 * // returns $100.00
 * ToCurrency(100)
 *
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
 *
 */
export const ToCurrencyMax = (value: any, decimals: number = 9, min: number = 2): string => {
	return (
		'$' +
		CleanNumber(value).toLocaleString(undefined, {
			maximumFractionDigits: decimals,
			minimumFractionDigits: min
		})
	)
}

/**
 * Converts the given number to a percentage with a percent sign.
 *
 * @example
 * // returns 50%
 * ToPercent(0.5)
 *
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
 *
 */
export const ToPercentMax = (value: any, decimals: number = 9, min: number = 0): string => {
	return (
		(CleanNumber(value) * 100).toLocaleString(undefined, {
			maximumFractionDigits: decimals,
			minimumFractionDigits: min
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
 *
 */
export const ToCurrencyBlank = (value: any, decimals: number = 2): string => {
	if (isNullUndefined(value) || CleanNumber(value) === 0) {
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
 *
 */
export const ToCurrencyDash = (value: any, decimals: number = 2): string => {
	if (isNullUndefined(value) || CleanNumber(value) === 0) {
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
 *
 */
export const ToPercentBlank = (value: any, decimals: number = 2): string => {
	if (isNullUndefined(value) || CleanNumber(value) === 0) {
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
 *
 */
export const ToPercentDash = (value: any, decimals: number = 2): string => {
	if (isNullUndefined(value) || CleanNumber(value) === 0) {
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
 * Represents configuration options for formatting numbers as strings with ToNumberString(value, options)
 */
export type TNumberStringOptions = {
	/** Forced number of digits to show (Overrides minDecimals and maxDecimals) */
	fixedDecimals?: number | null
	/** Lowest range of decimals to show, but could go higher, does not apply if fixedDecimals exists */
	minDecimals?: number | null
	/** Highest range of decimals to show, but could go lower, does not apply if fixedDecimals exists */
	maxDecimals?: number | null
	/** Formats as currency */
	currency?: boolean
	/** Formats as a percent (multiplies times 100) */
	percent?: boolean
	/** Shows number in a very short format. If array provided, uses the lowest value to determine the format for consistency */
	short?: boolean | number[]
	/** Shows number in a somewhat shortened format. If array provided, uses the lowest value to determine the format for consistency */
	shorten?: boolean | number[]
	/** Blank if null or 0 */
	zeroBlank?: boolean
	/** Dash if null or 0 */
	zeroDash?: boolean
	/** Blank if null */
	nullBlank?: string | boolean
	/** Dash if null */
	nullDash?: string | boolean
	/** Prefix text when valid number */
	prefix?: string | null
	/** Suffix text when valid number */
	suffix?: string | null
}

/**
 * Converts a given value to a formatted number string based on the provided options.
 *
 * @param {any} value - The value to be converted to a number string. It can be of any type.
 * @param {TNumberStringOptions} [options] - Optional formatting options for the number string.
 * @param {boolean} [options.nullBlank] - If true, returns an empty string when the number is null.
 * @param {boolean} [options.nullDash] - If true, returns a dash ("-") when the number is null.
 * @param {boolean} [options.zeroBlank] - If true, returns an empty string when the number is zero.
 * @param {boolean} [options.zeroDash] - If true, returns a dash ("-") when the number is zero.
 * @param {boolean} [options.currency] - If true, formats the number as currency (default symbol is "$").
 * @param {boolean} [options.percent] - If true, formats the number as a percentage by multiplying it by 100.
 * @param {number} [options.fixedDecimals] - Specifies the exact number of fractional digits to display.
 * @param {number} [options.maxDecimals] - Specifies the maximum number of fractional digits to display.
 * @param {number} [options.minDecimals] - Specifies the minimum number of fractional digits to display.
 *
 * @return {string} - The formatted number as a string, optionally including a currency symbol or percentage sign.
 */
export function ToNumberString(value: any, options?: TNumberStringOptions): string {
	const numberNull = CleanNumberNull(value)
	if (numberNull === null) {
		if (options?.nullBlank) return ''
		if (options?.nullDash) return '-'
	}
	if (!numberNull) {
		if (options?.zeroBlank) return ''
		if (options?.zeroDash) return '-'
	}

	// Determine if short/shorten should be applied and find the reference value
	const shortMode = Array.isArray(options?.short) ? [...options.short, numberNull] : !!options?.short
	const shortenMode = Array.isArray(options?.shorten) ? [...options.shorten, numberNull] : !!options?.shorten

	// Find the lowest absolute value from the array to determine consistent formatting
	let referenceValue = (numberNull ?? 0) * (options?.percent ? 100 : 1)
	if (Array.isArray(shortMode) && shortMode.length > 0) {
		const absValues = shortMode
			.map((v) => Math.abs(CleanNumber(v) * (options?.percent ? 100 : 1)))
			.filter((v) => !isNaN(v) && v)
		referenceValue = Math.min(...absValues)
	} else if (Array.isArray(shortenMode) && shortenMode.length > 0) {
		const absValues = shortenMode
			.map((v) => Math.abs(CleanNumber(v) * (options?.percent ? 100 : 1)))
			.filter((v) => !isNaN(v) && v)
		referenceValue = Math.min(...absValues)
	}

	const shortComponents = shortMode
		? ShortNumberComponents(referenceValue)
		: shortenMode
		? ShortenNumberComponents(referenceValue)
		: null

	// Determine if shortening is actually being applied (divisor > 1)
	const isShortening = !!shortComponents?.divisor && shortComponents.divisor > 1

	// Check if the value is a whole number
	const calcNumber = (numberNull ?? 0) * (options?.percent ? 100 : 1)
	const isWholeNumber = calcNumber === Math.floor(calcNumber)

	let maximumFractionDigits =
		options?.fixedDecimals ??
		options?.maxDecimals ??
		(shortMode && isShortening
			? 1
			: shortMode && !isWholeNumber
			? 1
			: shortenMode
			? 0
			: options?.currency
			? 2
			: options?.percent
			? 0
			: 9)
	const minimumFractionDigits =
		options?.fixedDecimals ??
		options?.minDecimals ??
		(shortMode && isShortening
			? 1
			: shortMode && !isWholeNumber
			? 1
			: shortenMode
			? 0
			: options?.currency
			? 2
			: options?.percent
			? 0
			: undefined)

	if (minimumFractionDigits !== undefined && maximumFractionDigits < minimumFractionDigits) {
		maximumFractionDigits = GreaterNumber(9, minimumFractionDigits)
	}

	const validNumber =
		((numberNull ?? 0) * (options?.percent ? 100 : 1)) / (!shortComponents?.divisor ? 1 : shortComponents.divisor)

	const prefix = options?.prefix ?? (!!options?.currency ? '$' : '')
	const suffix = options?.suffix ?? (!!options?.percent ? '%' : '')

	// console.log('>>>>>>>>>>', value, validNumber, options, minimumFractionDigits, maximumFractionDigits)

	return `${prefix}${validNumber.toLocaleString(undefined, {
		maximumFractionDigits,
		minimumFractionDigits
	})}${shortComponents?.extension ?? ''}${suffix}`
}

/**
 * Returns the given number with decimal places.
 *
 * @example
 * // return 10.00
 * ToDigits(10)
 *
 */
export const ToDigits = function (value: any, decimals: number = 0, minDecimals: number | null = null): string {
	return CleanNumber(value).toLocaleString(undefined, {
		maximumFractionDigits: decimals,
		minimumFractionDigits: minDecimals ?? decimals
	})
}

/**
 * Returns the given number with decimal places.
 *
 * @example
 * // return 10.00
 * ToDigits(10)
 *
 */
export const ToDigitsMax = function (value: any, decimals: number = 9, min: number = 0): string {
	return CleanNumber(value, decimals).toLocaleString(undefined, {
		maximumFractionDigits: decimals,
		minimumFractionDigits: min
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
 *
 */
export const ToDigitsBlank = function (value: any, decimals: number = 0) {
	if (isNullUndefined(value) || CleanNumber(value) === 0) {
		return ''
	}

	return CleanNumber(value).toLocaleString(undefined, {
		maximumFractionDigits: decimals,
		minimumFractionDigits: decimals
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
 *
 */
export const ToDigitsBlankMax = function (value: any, decimals: number = 9, min: number = 0) {
	if (isNullUndefined(value) || CleanNumber(value, decimals) === 0) {
		return ''
	}

	return CleanNumber(value, decimals).toLocaleString(undefined, {
		maximumFractionDigits: decimals,
		minimumFractionDigits: min
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
 *
 */
export const ToDigitsDash = function (value: any, decimals: number = 0) {
	if (isNullUndefined(value) || CleanNumber(value) === 0) {
		return '-'
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
 *
 */
export const ToDigitsDashMax = function (value: any, decimals: number = 9, min: number = 0) {
	if (isNullUndefined(value) || CleanNumber(value, decimals) === 0) {
		return '-'
	}

	return CleanNumber(value, decimals).toLocaleString(undefined, {
		maximumFractionDigits: decimals,
		minimumFractionDigits: min
	})
}

/**
 * Converts a value to its corresponding ordinal number representation.
 *
 * @param {any} value - The value to convert.
 * @returns {string | null} - The ordinal number representation of the value or null if the conversion fails.
 */
export const DigitsNth = (value: any): string | null => {
	let result = ToDigits(value)

	if (!result) return null

	switch (result.substring(result.length - 2)) {
		case '11':
		case '12':
		case '13':
			result += 'th'
			break
		default:
			switch (result.substring(result.length - 1)) {
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
 *
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
 *
 */
export const FormatSSN = (ssn: string | null | undefined): string => {
	// remove all non-dash and non-numerals
	let val = (ssn ?? '').replace(/[^\d-]/g, '')

	// add the first dash if number from the second group appear
	val = val.replace(/^(\d{3})-?(\d{1,2})/, '$1-$2')

	// add the second dash if numbers from the third group appear
	val = val.replace(/^(\d{3})-?(\d{2})-?(\d{1,4})/, '$1-$2-$3')

	// remove misplaced dashes
	val = val
		.split('')
		.filter((val, idx) => {
			return val !== '-' || idx === 3 || idx === 6
		})
		.join('')

	// enforce max length
	return val.substring(0, 11)
}

/**
 *
 *
 */
export interface IPhoneComponents {
	countryCode: string
	areaCode: string
	exchangeNumber: string
	subscriberNumber: string
	extension: string
}

/**
 * Extracts and returns the components of a phone number, supporting both US and international formats.
 *
 * @param phone - The input phone number as a string, which can be `null` or `undefined`.
 * @param bestGuess - An optional boolean flag (default is `true`) that determines
 *                    whether to return an object with the best guess of the
 *                    components if the input phone format is incorrect.
 * @returns An `IPhoneComponents` object with the extracted components, or `null`
 *          if the input phone number is not provided or cannot be parsed under
 *          the specified conditions.
 *
 * @remarks
 * The function takes a phone number string and extracts its components:
 * - countryCode (e.g., "1" for US, "52" for Mexico)
 * - areaCode
 * - exchangeNumber
 * - subscriberNumber
 * - extension
 *
 * Supports international formats like:
 * - US: +1 (555) 123-4567 -> countryCode: "1", areaCode: "555", exchangeNumber: "123", subscriberNumber: "4567"
 * - Mexico: +52 55 1234 5678 -> countryCode: "52", areaCode: "55", exchangeNumber: "1234", subscriberNumber: "5678"
 * - Other formats with explicit country codes starting with "+"
 *
 * Example usage:
 *
 * const phoneComponents = PhoneComponents("+52 55 1234 5678");
 * // Output: {
 * //   countryCode: "52",
 * //   areaCode: "55",
 * //   exchangeNumber: "1234",
 * //   subscriberNumber: "5678",
 * //   extension: ""
 * // }
 */
export const PhoneComponents = (phone: string | null | undefined, bestGuess = true): IPhoneComponents | null => {
	if (!phone) return null

	let cleanNumber = ReplaceAll(['(', ')', '-', ' ', '+', '.', '_'], '', phone)

	let countryCode = ''
	// Handle international numbers with explicit country code
	if (phone.trim().startsWith('+') && !phone.trim().startsWith('+1')) {
		return ParseInternationalNumber(phone)
	}

	while ((cleanNumber.startsWith('0') || cleanNumber.startsWith('1')) && cleanNumber.length !== 10) {
		countryCode += cleanNumber[0]
		cleanNumber = cleanNumber.substring(1)
	}

	// Parse as US format: (XXX) XXX-XXXX
	let phoneComponents: IPhoneComponents = {
		countryCode: countryCode,
		areaCode: cleanNumber.substring(0, 3),
		exchangeNumber: cleanNumber.substring(3, 6),
		subscriberNumber: cleanNumber.substring(6, 10),
		extension: ''
	}

	if (
		!bestGuess &&
		(phoneComponents.areaCode?.length != 3 ||
			phoneComponents.exchangeNumber?.length != 3 ||
			phoneComponents.subscriberNumber?.length != 4)
	) {
		return null
	}

	// Extract extension from original phone string
	if (!!phoneComponents.areaCode && !!phoneComponents.exchangeNumber && !!phoneComponents.subscriberNumber) {
		let originalPhone = phone ?? ''
		let extensionIdx = originalPhone.indexOf(phoneComponents.areaCode)
		if (extensionIdx >= 0) {
			extensionIdx = originalPhone.indexOf(
				phoneComponents.exchangeNumber,
				extensionIdx + phoneComponents.areaCode.length
			)
			if (extensionIdx >= 0) {
				extensionIdx = originalPhone.indexOf(
					phoneComponents.subscriberNumber,
					extensionIdx + phoneComponents.exchangeNumber.length
				)
				if (extensionIdx >= 0) {
					phoneComponents.extension = originalPhone
						.substring(extensionIdx + phoneComponents.subscriberNumber.length)
						.trim()
				}
			}
		}
	}

	return phoneComponents
}

/**
 * Parses an international phone number input string into its components.
 *
 * @param {string} input - The raw phone number string in international format.
 *                         It may include characters such as country code, area code, and optional extension.
 * @return {IPhoneComponents} An object containing the parsed components of the phone number,
 *                            including countryCode, areaCode, exchangeNumber, subscriberNumber, and extension.
 */
export function ParseInternationalNumber(input: string): IPhoneComponents {
	// Normalize - keep digits, +, and extension markers separate
	let raw = input.replace(/[^\d+]/gi, '').trim()

	// Extract extension from ORIGINAL input (before normalization removes 'ext' or 'x')
	const extMatch = input.match(/(ext|x)[\s.:-]*(\d+)$/i)
	if (extMatch) {
		// Remove extension from raw number
		const extLength = extMatch[0].replace(/\D/g, '').length
		raw = raw.slice(0, -extLength)
	}

	// Extract country code - order matters! Check longer codes first
	const countryPatterns: {code: string; pattern: RegExp}[] = [
		{code: '44', pattern: /^\+?44/},
		{code: '52', pattern: /^\+?52/},
		{code: '49', pattern: /^\+?49/},
		{code: '33', pattern: /^\+?33/},
		{code: '27', pattern: /^\+?27/},
		{code: '86', pattern: /^\+?86/},
		{code: '91', pattern: /^\+?91/},
		{code: '81', pattern: /^\+?81/},
		{code: '61', pattern: /^\+?61/},
		{code: '1', pattern: /^\+?1/},
		{code: '7', pattern: /^\+?7/}
	]

	let countryCode = ''
	for (const {code, pattern} of countryPatterns) {
		if (pattern.test(raw)) {
			countryCode = code
			raw = raw.replace(pattern, '')
			break
		}
	}

	// Default fallback if no match
	if (!countryCode && raw.startsWith('+')) {
		// Try to extract 1-3 digit country code
		const codeMatch = raw.match(/^\+(\d{1,3})/)
		if (codeMatch) {
			countryCode = codeMatch[1]
			raw = raw.slice(codeMatch[0].length)
		}
	}

	// Remove any leading 0s after country code (common in some countries)
	raw = raw.replace(/^0+/, '')

	// Parsing logic depending on country
	let areaCode = ''
	let exchangeNumber = ''
	let subscriberNumber = ''

	if (countryCode === '1') {
		// NANP (US/Canada): NPA NXX XXXX (3-3-4)
		areaCode = raw.slice(0, 3)
		exchangeNumber = raw.slice(3, 6)
		subscriberNumber = raw.slice(6, 10)
	} else if (countryCode === '52') {
		// Mexico: 2 digit area + 4 + 4
		areaCode = raw.slice(0, 2)
		exchangeNumber = raw.slice(2, 6)
		subscriberNumber = raw.slice(6, 10)
	} else if (countryCode === '44') {
		// UK: variable area codes (2-5 digits), typically 4 + 3 + 4
		if (raw.length === 10) {
			areaCode = raw.slice(0, 3)
			exchangeNumber = raw.slice(3, 6)
			subscriberNumber = raw.slice(6, 10)
		} else {
			areaCode = raw.slice(0, 4)
			exchangeNumber = raw.slice(4, 7)
			subscriberNumber = raw.slice(7)
		}
	} else if (countryCode === '49') {
		// Germany: variable area codes (2-5 digits)
		areaCode = raw.slice(0, 3)
		exchangeNumber = raw.slice(3, 6)
		subscriberNumber = raw.slice(6)
	} else if (countryCode === '33') {
		// France: 1 digit area + 8 digits (formatted as 2-2-2-2-2)
		areaCode = raw.slice(0, 1)
		exchangeNumber = raw.slice(1, 5)
		subscriberNumber = raw.slice(5, 9)
	} else if (countryCode === '86') {
		// China: variable area codes (2-4 digits)
		if (raw.length === 11) {
			areaCode = raw.slice(0, 3)
			exchangeNumber = raw.slice(3, 7)
			subscriberNumber = raw.slice(7, 11)
		} else {
			areaCode = raw.slice(0, 2)
			exchangeNumber = raw.slice(2, 6)
			subscriberNumber = raw.slice(6)
		}
	} else if (countryCode === '91') {
		// India: 2-4 digit area + 6-8 digits
		if (raw.length === 10) {
			areaCode = raw.slice(0, 2)
			exchangeNumber = raw.slice(2, 6)
			subscriberNumber = raw.slice(6, 10)
		} else {
			areaCode = raw.slice(0, 3)
			exchangeNumber = raw.slice(3, 6)
			subscriberNumber = raw.slice(6)
		}
	} else if (countryCode === '61') {
		// Australia: 1 digit area + 8 digits
		areaCode = raw.slice(0, 1)
		exchangeNumber = raw.slice(1, 5)
		subscriberNumber = raw.slice(5, 9)
	} else if (countryCode === '81') {
		// Japan: 1-5 digit area + remaining
		if (raw.length === 10) {
			areaCode = raw.slice(0, 2)
			exchangeNumber = raw.slice(2, 6)
			subscriberNumber = raw.slice(6, 10)
		} else {
			areaCode = raw.slice(0, 3)
			exchangeNumber = raw.slice(3, 6)
			subscriberNumber = raw.slice(6)
		}
	} else if (countryCode === '7') {
		// Russia: 3 digit area + 7 digits
		areaCode = raw.slice(0, 3)
		exchangeNumber = raw.slice(3, 6)
		subscriberNumber = raw.slice(6, 10)
	} else if (countryCode === '27') {
		// South Africa: 2 digit area + 7 digits
		areaCode = raw.slice(0, 2)
		exchangeNumber = raw.slice(2, 5)
		subscriberNumber = raw.slice(5, 9)
	} else {
		// Generic fallback based on total length
		if (raw.length >= 10) {
			// Assume 2-4-4 or 3-3-4 format
			if (raw.length === 10) {
				areaCode = raw.slice(0, 2)
				exchangeNumber = raw.slice(2, 6)
				subscriberNumber = raw.slice(6, 10)
			} else {
				areaCode = raw.slice(0, 3)
				exchangeNumber = raw.slice(3, 6)
				subscriberNumber = raw.slice(6)
			}
		} else {
			// Short number, split as evenly as possible
			areaCode = raw.slice(0, 3)
			exchangeNumber = raw.slice(3, 6)
			subscriberNumber = raw.slice(6)
		}
	}

	let extension = ''
	if (areaCode && exchangeNumber && subscriberNumber) {
		// Find the last occurrence of the subscriber number's last digit, then get everything after
		let searchStart = 0

		// Search for area code first
		let foundIdx = input.indexOf(areaCode, searchStart)
		if (foundIdx >= 0) {
			searchStart = foundIdx + areaCode.length

			// Then search for exchange number after area code
			foundIdx = input.indexOf(exchangeNumber, searchStart)
			if (foundIdx >= 0) {
				searchStart = foundIdx + exchangeNumber.length

				// Finally search for subscriber number after exchange
				foundIdx = input.indexOf(subscriberNumber, searchStart)
				if (foundIdx >= 0) {
					// Get everything after the subscriber number
					const afterSubscriber = input.substring(foundIdx + subscriberNumber.length)
					// Extract only the extension part (remove leading non-alphanumeric, keep the rest)
					const extMatch = afterSubscriber.match(/[^\d\s]*\s*(.+)$/)
					if (extMatch && extMatch[1]) {
						extension = extMatch[1].trim()
					}
				}
			}
		}
	}

	return {
		countryCode,
		areaCode,
		exchangeNumber,
		subscriberNumber,
		extension
	}
}

/**
 * Returns a formatted phone number.
 *
 * @example
 * // returns (123) 123-1234
 * FormatPhoneNumber('1231231234')
 *
 */
export const FormatPhoneNumber = (phone: string | null | undefined, bestGuess = true): string | null => {
	const components = PhoneComponents(phone, bestGuess)

	if (!components) return null

	let val = ''

	if (!!components.areaCode) val += `(${components.areaCode})`
	if (!!components.exchangeNumber) val += ` ${components.exchangeNumber}`
	if (!!components.subscriberNumber) val += `-${components.subscriberNumber}`
	if (!!components.extension) val += ` ${components.extension}`

	return val
}

/**
 * Returns a formatted phone number in E.164 format for the US.
 *
 * @example
 * // returns +12231231234
 * FormatPhoneNumber('2231231234')
 *
 */
export const FormatPhoneNumberE164US = (phone: string | null | undefined, bestGuess = true): string | null => {
	const components = PhoneComponents(phone, bestGuess)

	if (!components || !components.areaCode || !components.exchangeNumber || !components.subscriberNumber) return null

	return `+1${components.areaCode}${components.exchangeNumber}${components.subscriberNumber}`
}

/**
 * Returns a formatted phone number with parenthesis.
 *
 * @example
 * // returns (555) 555-1234
 * FormatPhoneNumber('5555551234')
 *
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
 *
 */
export const FormatPhoneNumberDots = (phone: string | null | undefined, bestGuess = true) => {
	const components = PhoneComponents(phone, bestGuess)

	if (!components) return null

	if (!components.areaCode || !components.exchangeNumber || !components.subscriberNumber) return null

	return `${components.areaCode}.${components.exchangeNumber}.${components.subscriberNumber}`

	// 	//Filter only numbers from the input
	// 	const cleaned = forceNumeric ? ('' + phone).replace(/\D/g, '') : '' + phone
	//
	// 	//Check if the input is of correct
	// 	const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
	//
	// 	if (match) {
	// 		//Remove the matched extension code
	// 		//Change this to format for any country code.
	// 		let intlCode = match[1] ? '+1 ' : ''
	// 		return [intlCode, match[2], '.', match[3], '.', match[4]].join('')
	// 	}
	//
	// 	return phone
}

/**
 * Returns a formatted phone number with dashes.
 *
 * @example
 * // returns 555-555-1234
 * FormatPhoneNumberDashes('5555551234')
 *
 */
export const FormatPhoneNumberDashes = (phone: string | null | undefined, bestGuess = true) => {
	const components = PhoneComponents(phone, bestGuess)

	if (!components) return null

	if (!components.areaCode || !components.exchangeNumber || !components.subscriberNumber) return null

	return `${components.areaCode}-${components.exchangeNumber}-${components.subscriberNumber}`

	// console.log('PHONE', phone, components)
	//
	// //Filter only numbers from the input
	// const cleaned = '' + phone.toString()
	//
	// //Check if the input is of correct
	// const match = cleaned.match(/^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/)
	//
	// // console.log('MATCH', phone, match)
	//
	// if (match) {
	// 	let intlCode = match[1] ? '+1 ' : ''
	// 	return [intlCode, match[2], '-', match[3], '-', match[4]].join('')
	// }
	//
	// return null
}

/**
 * Formats a zip code by adding a hyphen in a 9 digit code.
 *
 * @example
 * // returns "12345-6789"
 * FormatZip('123456789')
 *
 */
export const FormatZip = (zip: string | number | null | undefined) => {
	//Filter only numbers from the input
	let cleaned = ('' + (zip ?? '')).toString().replace(/\D/g, '')

	// check if the input is a 9 digit code
	if (cleaned.length === 9) {
		cleaned = cleaned.replace(/(\d{5})/, '$1-')
	}

	return cleaned
}

/**
 * Formats a tax number by adding a hyphen.
 *
 * @example
 * // returns "11-2222222"
 * FormatTaxID('112222222')
 *
 */
export const FormatTaxID = (taxID: string | number | null | undefined) => {
	if (!taxID) return null
	//Filter only numbers from the input
	let cleaned = ('' + (taxID ?? '')).toString().replace(/\D/g, '')

	// check if the input is a 9 digit code
	if (cleaned.length === 9) {
		cleaned = cleaned.replace(/(\d{2})/, '$1-')
	}

	return cleaned
}

/**
 * Adds "http" on urls that don't have it.
 *
 * @example
 * // returns "http://www.google.com"
 * FormatExternalURL('www.google.com')
 *
 */
export const FormatExternalURL = (url: string | null | undefined): string => {
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
 *
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
 *
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
 *
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
 *
 */
export const RandomString = (length: number, validChars = 'ABCDEFGHJKLMNPQRTUVWXYZ2346789') => {
	let result = ''

	const charactersLength = validChars.length
	for (let i = 0; i < length; i++) {
		result += validChars.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result

	// const validCharLength = validChars.length - 1
	//
	// let result = ''
	// for (let i = 0; i < length; i++) {
	// 	result += validChars.substr(Math.floor(Math.random() * validCharLength), 1)
	// }
	//
	// const ts = new Date().valueOf().toString()
	//
	// if (length > ts.length * 0.5) {
	// 	const offset = RoundTo((length - ts.length) / 2, 0)
	//
	// 	return result.substr(0, offset) + ts + result.substr(offset + ts.length)
	// }
	//
	// return result
}

/**
 *
 * @param length
 * @constructor
 *
 */
export const RandomKey = (length: number) =>
	RandomString(length, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12346789')

/**
 * Checks if a character is a vowel.
 *
 * @param {string} char - The character to check.
 * @returns {boolean} True if the character is a vowel, false otherwise.
 * @example
 * IsVowel('a'); // returns true
 * IsVowel('b'); // returns false
 * @export
 */
export function IsVowel(char: string) {
	return 'aeiou'.indexOf(char.toLowerCase()) !== -1
}

/**
 * Takes in text, and adds an "s" to the end of it if the count is zero or > 1
 * Note: An 'es' is added if the word ends in: s, ss, z, ch, sh, or x
 * Note: An ending 'y' is changed to ies if the previous letter to the 'y' is not a vowel
 *
 * @param text
 * @param count
 * @param showNumber
 * @param maxDecimals
 * @param minDecimals
 * @constructor
 *
 */
export function AddS(
	text?: string | null,
	count?: number | null,
	showNumber = false,
	maxDecimals = 0,
	minDecimals: number | null = null
): string {
	if (!text) return ''

	let useText = text
	let checkText = (text ?? '').toLowerCase()
	const numericText = ToDigits(count ?? 0, maxDecimals, minDecimals)
	let addValue = ''
	if (CleanNumber(numericText) !== 1) {
		if (checkText.endsWith('y') && !IsVowel(checkText.charAt(checkText.length - 2))) {
			useText = useText.substring(0, useText.length - 1)
			addValue = 'ies'
		} else {
			addValue = !text
				? 's'
				: checkText.endsWith('s') ||
				  checkText.endsWith('z') ||
				  checkText.endsWith('ch') ||
				  checkText.endsWith('sh') ||
				  checkText.endsWith('x')
				? 'es'
				: 's'
		}
	}
	return `${showNumber ? numericText : ''} ${useText}${addValue}`.trim()
}

/**
 * Takes in text, and adds an "s" to the end of it if the count is > 1
 * If the count is zero, returns null
 * Note: An 'es' is added if the word ends in: s, ss, z, ch, sh, or x
 *
 * @param text
 * @param count
 * @param showNumber
 * @param maxDecimals
 * @param minDecimals
 * @constructor
 *
 */
export function AddSNull(
	text?: string | null,
	count?: number | null,
	showNumber = false,
	maxDecimals = 0,
	minDecimals: number | null = null
): string | null {
	if (!count) return null
	return AddS(text, count, showNumber, maxDecimals, minDecimals)
}

/**
 * Takes in text, and adds an "s" to the end of it if the count is > 1
 * If the count is zero, returns a blank string
 * Note: An 'es' is added if the word ends in: s, ss, z, ch, sh, or x
 *
 * @param text
 * @param count
 * @param showNumber
 * @param maxDecimals
 * @param minDecimals
 * @constructor
 *
 */
export function AddSBlank(
	text?: string | null,
	count?: number | null,
	showNumber = false,
	maxDecimals = 0,
	minDecimals: number | null = null
): string {
	return AddSNull(text, count, showNumber, maxDecimals, minDecimals) ?? ''
}

/**
 * Calculates and returns the divisor and the corresponding extension (suffix)
 * for a given numeric value to represent it in short format (e.g., thousands, millions, billions).
 *
 * @param {any} value - The value to be processed and shortened. If the value is not a valid number or null, defaults to returning {divisor: 0, extension: ''}.
 * @return {{divisor: number, extension: string}} - An object containing the divisor and its corresponding extension (e.g., 'k' for thousands, 'M' for millions).
 */
export function ShortNumberComponents(value: any): {divisor: number; extension: string} {
	let divisor = 1

	let calcValue = CleanNumberNull(value)

	if (!calcValue || calcValue < 999) return {divisor, extension: ''}

	calcValue /= 1000
	divisor *= 1000
	if (calcValue < 99) return {divisor, extension: 'k'}

	calcValue /= 1000
	divisor *= 1000
	if (calcValue < 99) return {divisor, extension: 'M'}

	calcValue /= 1000
	divisor *= 1000
	if (calcValue < 99) return {divisor, extension: 'B'}

	calcValue /= 1000
	divisor *= 1000
	if (calcValue < 99) return {divisor, extension: 'T'}

	let extension = 'T'
	do {
		extension += '.'
		calcValue /= 1000
		divisor *= 1000
	} while (calcValue > 99)

	return {divisor, extension}
}

/**
 * Calculates and returns the divisor and the corresponding extension (suffix)
 * for a given numeric value to represent it in short format (e.g., thousands, millions, billions).
 *
 * @param {any} value - The value to be processed and shortened. If the value is not a valid number or null, defaults to returning {divisor: 0, extension: ''}.
 * @return {{divisor: number, extension: string}} - An object containing the divisor and its corresponding extension (e.g., 'k' for thousands, 'M' for millions).
 */
export function ShortenNumberComponents(value: any): {divisor: number; extension: string} {
	let divisor = 1

	let calcValue = CleanNumberNull(value)

	if (!calcValue || calcValue < 99999) return {divisor, extension: ''}

	calcValue /= 100

	calcValue /= 1000
	divisor *= 1000
	if (calcValue < 99) return {divisor, extension: 'k'}

	calcValue /= 1000
	divisor *= 1000
	if (calcValue < 99) return {divisor, extension: 'M'}

	calcValue /= 1000
	divisor *= 1000
	if (calcValue < 99) return {divisor, extension: 'B'}

	calcValue /= 1000
	divisor *= 1000
	if (calcValue < 99) return {divisor, extension: 'T'}

	let extension = 'T'
	do {
		extension += '.'
		calcValue /= 1000
		divisor *= 1000
	} while (calcValue > 99)

	return {divisor, extension}
}

/**
 *
 * @param value
 * @param decimals
 * @param round
 * @constructor
 *
 */
export const ShortNumber = (value: any, decimals = 0, round: 'round' | 'up' | 'down' = 'round'): string | null => {
	let calcValue = CleanNumberNull(value)

	if (calcValue === null) return null

	const showValue = (val: number, extension: string): string => {
		let returnVal = ToDigits(RoundTo(val, decimals, round), decimals)

		if (!!decimals) {
			while (returnVal.endsWith('0')) returnVal = returnVal.substring(0, returnVal.length - 1)
			while (returnVal.endsWith('.')) returnVal = returnVal.substring(0, returnVal.length - 1)
		}

		return returnVal + extension
	}

	if (calcValue < 999) {
		return showValue(calcValue, '')
	}

	calcValue /= 1000
	if (calcValue < 999) {
		return showValue(calcValue, 'k')
	}

	calcValue /= 1000
	if (calcValue < 999) {
		return showValue(calcValue, 'M')
	}

	calcValue /= 1000
	if (calcValue < 999) {
		return showValue(calcValue, 'B')
	}

	calcValue /= 1000
	if (calcValue < 999) {
		return showValue(calcValue, 'T')
	}

	let trillions = ''

	do {
		trillions += 'Q'
		calcValue /= 1000
	} while (calcValue > 999)

	return showValue(calcValue, trillions)
}

/**
 *
 * @param value
 * @param maxCharacters
 * @constructor
 *
 */
export const EllipsesAtMax = (
	value: string | null | undefined,
	maxCharacters: number = 15
): string | null | undefined => {
	if (!value || value.length <= maxCharacters) return value

	return `${value.substring(0, maxCharacters)}...`
}

/**
 *
 * @param value
 * @param asteriskPattern
 * @constructor
 *
 */
export const AsteriskMatch = (value: string | null | undefined, asteriskPattern: string): boolean => {
	if (!value) return false

	const regex = ReplaceAll('*', '([\\s\\S]*?)', ReplaceAll('\\', '\\/', asteriskPattern))

	if (!regex) return false

	return !!value.match(new RegExp(regex))?.length
}

/**
 *
 * @param paths
 * @constructor
 *
 */
export const BuildPath = (...paths: (string | null)[]) => {
	let build = paths
		.map((part, i) => {
			if (i === 0) {
				return (part ?? '').trim().replace(/[\/]*$/g, '')
			} else {
				return (part ?? '').trim().replace(/(^[\/]*|[\/]*$)/g, '')
			}
		})
		.filter((x) => x.length)
		.join('/')

	if (paths[0] === '/' && !build.startsWith('/')) return '/' + build

	return build
}

/**
 * Checks if the provided string contains any numeric digit.
 *
 * @param {string|number|null|undefined} value - The string to be evaluated.
 * @returns {boolean} - Returns true if the provided string contains any numeric digit, otherwise false.
 */
export const HasDigits = (value: string | number | null | undefined): boolean => {
	if (!value) return false

	return !!value.toString().match(/\d/)
}

/**
 * Check if a string contains at least one alphabetical character.
 * @param {string|number|null|undefined} value - The input string to check.
 * @return {boolean} - Returns true if the string contains at least one alphabetical character, false otherwise.
 */
export const HasAlpha = (value: string | number | null | undefined): boolean => {
	if (!value) return false

	return !!value.toString().match(/[a-zA-Z]/)
}

export enum EStringComparisonResult {
	Same = 'Same',
	Inserted = 'Inserted',
	Deleted = 'Deleted'
	// Modified = 'Modified'
}

export type TStringComparison = {
	result: EStringComparisonResult
	value: string
	newValue?: string
}

/**
 * Compares two strings line by line and returns an array of comparison results.
 *
 * @param startString - The starting string for comparison. Can be a string, null, or undefined.
 * @param endString - The ending string for comparison. Can be a string, null, or undefined.
 * @returns {TStringComparison[]} - An array of TStringComparison objects summarizing the differences between the two input strings.
 * Each object contains a `result` (EStringComparisonResult) and a `value` (string) that indicates the line content.
 *
 * The EStringComparisonResult has the following possibilities:
 * - EStringComparisonResult.Same: The line is the same in both strings.
 * - EStringComparisonResult.Inserted: The line is inserted in the `endString` compared to the `startString`.
 * - EStringComparisonResult.Deleted: The line is deleted in the `endString` compared to the `startString`.
 */
export function StringCompares(
	startString: string | null | undefined,
	endString: string | null | undefined
): TStringComparison[] {
	let comparisons: TStringComparison[] = []

	let starts = (startString ?? '').split(/[\r\n]+/g)
	let ends = (endString ?? '').split(/[\r\n]+/g)

	while (starts.length || ends.length) {
		if (!ends.length) {
			comparisons = [
				...comparisons,
				...starts.map((start) => ({result: EStringComparisonResult.Deleted, value: start}))
			]
			starts = []
			continue
		}
		if (!starts.length) {
			comparisons = [
				...comparisons,
				...ends.map((start) => ({result: EStringComparisonResult.Inserted, value: start}))
			]
			ends = []
			continue
		}
		if (starts[0] === ends[0]) {
			comparisons = [
				...comparisons,
				{
					result: EStringComparisonResult.Same,
					value: starts[0]
				}
			]
			starts = starts.slice(1)
			ends = ends.slice(1)
			continue
		}
		let found = false
		for (let i = 0; i < ends.length; i++) {
			const nextStartIdx = starts.findIndex((start) => ends[i] === start)
			if (nextStartIdx > 0) {
				comparisons = [
					...comparisons,
					...starts
						.filter((_, idx) => idx < nextStartIdx)
						.map((start) => ({
							result: EStringComparisonResult.Deleted,
							value: start
						}))
				]
				starts = starts.slice(nextStartIdx)
				found = true
				break
			}
		}
		if (found) continue
		{
			const nextEndIdx = ends.findIndex((end) => starts[0] === end)
			if (nextEndIdx >= 0) {
				comparisons = [
					...comparisons,
					...ends
						.filter((_, idx) => idx < nextEndIdx)
						.map((end) => ({
							result: EStringComparisonResult.Inserted,
							value: end
						}))
				]
				ends = ends.slice(nextEndIdx)
				found = true
			}
		}
		if (found) continue
		console.log('-------------- Could not compare')
		console.log(comparisons)
		console.log(starts)
		console.log(ends)
		console.log('--------------')
		// break
		throw new Error('Could not finish comparing')
	}
	return comparisons
}

/**
 * Represents the fixed fields of a property in a generic object.
 *
 * @template T - The type of the object the property belongs to.
 */
export type TPropertyFixedFields<T extends Record<string, any>> = {
	property: keyof T | 'FIXED'
	length: number
	padCharacter?: string | null
	rightJustify?: boolean
	transform?: (val: any, obj: T) => string
}

/**
 * Converts an object to fixed-length fields based on the provided settings.
 *
 * @param {object} obj - The object to convert.
 * @param {Array<object>} settings - An array of settings that define the fixed-length fields.
 * @param {string} [separator=''] - The string used to separate the fields.
 * @returns {string} The fixed-length fields as a single string.
 */
export function ObjectToFixedFields<T extends Record<string, any>>(
	obj: T,
	settings: TPropertyFixedFields<T>[],
	separator = ''
) {
	return settings
		.map<string>((setting) => {
			let val = (
				(!!setting.transform
					? setting.transform(obj[setting.property], obj)
					: obj[setting.property] ?? '') as any
			).toString()
			if (setting.rightJustify) {
				val = LeftPad(val.substring(val.length - setting.length), setting.length, setting.padCharacter ?? ' ')
			} else {
				val = RightPad(val.substring(0, setting.length), setting.length, setting.padCharacter ?? ' ')
			}
			return val
		})
		.join(separator)
}

/**
 * Converts an array of objects into a string with fixed fields using the provided settings.
 *
 * @param {Array.<Object>} objs - The array of objects to convert.
 * @param {Array.<Object>} settings - The settings for the fixed fields.
 * @param {string} [separator=''] - The separator to use between fields. Default is an empty string.
 * @param {string} [newLine='\r'] - The new line character to use. Default is '\r'.
 * @return {string} The string with fixed fields.
 */
export function ObjectsToFixedFields<T extends Record<string, any>>(
	objs: T[],
	settings: TPropertyFixedFields<T>[],
	separator = '',
	newLine = '\r'
) {
	return objs.map((obj) => ObjectToFixedFields(obj, settings, separator)).join(newLine)
}

/**
 * Finds the common string patterns among an array of strings.
 *
 * @param strings - The array of strings to find common patterns from.
 * @returns An array of common string patterns.
 */
// export function FindCommonStringPatterns(strings: string[]): string[] {
// 	if (strings.length === 0) return []
// 	if (strings.length === 1) return [strings[0]]
//
// 	const generateSubstrings = (str: string): Set<string> => {
// 		const substrings = new Set<string>()
// 		for (let i = 0; i < str.length; i++) {
// 			for (let j = i + 1; j <= str.length; j++) {
// 				substrings.add(str.substring(i, j))
// 			}
// 		}
// 		return substrings
// 	}
//
// 	const firstStringSubstrings = generateSubstrings(strings[0])
// 	const commonSubstrings = new Set<string>()
//
// 	for (const substring of firstStringSubstrings) {
// 		if (strings.every((str) => str.includes(substring))) {
// 			commonSubstrings.add(substring)
// 		}
// 	}
//
// 	// Filter out substrings that are part of longer substrings
// 	return Array.from(commonSubstrings).filter(
// 		(substring) => !Array.from(commonSubstrings).some((other) => other !== substring && other.includes(substring))
// 	)
// }

/**
 * Finds the differences between given strings based on common patterns.
 *
 * @param {string[]} commonPatterns - An array of common patterns to match in the strings.
 * @param {string[]} strings - An array of strings to compare.
 * @returns {string[][]} - A 2D array containing the differences found in the strings.
 */
// export function FindDifferencesFromStringPatterns(commonPatterns: string[], strings: string[]): string[][] {
// 	if (!commonPatterns.length) return strings.map(str => [str])
//
// 	const differences: string[][] = []
//
// 	for (const str of strings) {
// 		const patternRegex = new RegExp(commonPatterns.map((pattern) => `(${pattern})`).join('|'), 'g')
// 		const parts = str.split(patternRegex).filter((part) => part && !commonPatterns.includes(part))
// 		differences.push(parts)
// 	}
//
// 	return differences
// }

/**
 * Converts a Unicode string to an ASCII representation while applying transliterations,
 * removing combining marks, and optionally restricting to a conservative ASCII whitelist.
 *
 * @param {string} input - The input Unicode string to be converted to ASCII.
 * @param {Object} [opts] - Optional settings for the conversion process.
 * @param {boolean} [opts.strictAscii=true] - If true, restricts the output to a conservative ASCII whitelist.
 *                                            Disallowed characters are replaced and whitespace normalized.
 *                                            If false, removes all non-ASCII characters without further restriction.
 * @return {string} - The ASCII representation of the input string after applying transformations.
 */
export function UnicodeToAscii(
	input: string,
	opts: {
		strictAscii?: boolean // if true, strip to a conservative ASCII whitelist for X12
	} = {}
): string {
	const {strictAscii = true} = opts

	// 1) Decompose (compatibility form handles more cases than NFD)
	let s = input.normalize('NFKD')

	// 2) Remove combining marks
	s = s.replace(/[\u0300-\u036f]/g, '')

	// 3) Transliterations for characters that don't decompose cleanly
	//    (extend this map as needed for your data)
	const map: Record<string, string> = {
		// German / Nordic / Slavic odds & ends
		ß: 'SS',
		æ: 'AE',
		Æ: 'AE',
		œ: 'OE',
		Œ: 'OE',
		ø: 'O',
		Ø: 'O',
		å: 'A',
		Å: 'A',
		ð: 'D',
		Ð: 'D',
		þ: 'TH',
		Þ: 'TH',
		ł: 'L',
		Ł: 'L',
		đ: 'D',
		Đ: 'D',
		// Misc letters that sometimes appear in names
		ñ: 'n',
		Ñ: 'N', // often handled by NFKD+strip, but safe
		ç: 'c',
		Ç: 'C',
		// Smart quotes & dashes (normalize punctuation)
		'“': '"',
		'”': '"',
		'„': '"',
		'‟': '"',
		'‘': "'",
		'’': "'",
		'‚': "'",
		'‛': "'",
		'–': '-',
		'—': '-',
		'−': '-',
		'­': '-', // includes soft hyphen
		'…': '...'
	}

	// Fast replace using a single regex
	s = s.replace(/[ßÆæŒœØøÅåÐðÞþŁłĐđñÑçÇ“”„‟‘’‚‛–—−­…]/g, (ch) => map[ch] ?? ch)

	// 4) Remove remaining control characters (except tab/newline if you want them)
	s = s.replace(/[\u0000-\u001F\u007F]/g, ' ')

	// 5) Optionally restrict to a conservative ASCII whitelist for X12 Basic Set
	//    (letters, digits, space, and safe punctuation often seen in 837P)
	if (strictAscii) {
		// Replace any disallowed char with a space, then collapse spaces
		s = s
			.replace(/[^\x20-\x7E]/g, ' ') // Keep all printable ASCII characters (space through ~)
			.replace(/\s{2,}/g, ' ')
			.trim()
	} else {
		// Or just drop anything non-ASCII
		s = s.replace(/[^\x00-\x7F]/g, '')
	}

	return s
}
