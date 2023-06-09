import {CleanNumber, CleanNumberNull, OmitProperty, ReplaceAll} from './Functions'
import {AddS, DigitsNth, ToDigits} from './StringManipulation'

/**
 *
 */
export const DATE_FORMAT_DATE = 'YYYY-MM-DD'

/**
 *
 */
export const DATE_FORMAT_TIME_SECONDS = 'HH:mm:ss'

/**
 *
 */
export const DATE_FORMAT_TIME_NO_SECONDS = 'HH:mm'

/**
 *
 */
export const DATE_FORMAT_DATE_TIME = DATE_FORMAT_DATE + ' ' + DATE_FORMAT_TIME_SECONDS

/**
 *
 */
export const DATE_FORMAT_DATE_DISPLAY = `MMM D, YYYY`

/**
 *
 */
export const DATE_FORMAT_DATE_DISPLAY_DOW = `dd, ${DATE_FORMAT_DATE_DISPLAY}`

/**
 *
 */
export const DATE_FORMAT_TIME_DISPLAY = 'h:mm a'

/**
 *
 */
export const DATE_FORMAT_DATE_TIME_DISPLAY = `${DATE_FORMAT_DATE_DISPLAY}, ${DATE_FORMAT_TIME_DISPLAY}`

/**
 *
 */
export const DATE_FORMAT_DATE_TIME_DISPLAY_DOW = `${DATE_FORMAT_DATE_DISPLAY_DOW}, ${DATE_FORMAT_TIME_DISPLAY}`

/**
 *
 */
export const DATE_FORMAT_DATE_DISPLAY_LONG = `MMMM D, YYYY`

/**
 *
 */
export const DATE_FORMAT_DATE_DISPLAY_DOW_LONG = `dddd, ${DATE_FORMAT_DATE_DISPLAY_LONG}`

/**
 *
 */
export const DATE_FORMAT_DATE_TIME_DISPLAY_LONG = `${DATE_FORMAT_DATE_DISPLAY_LONG}, ${DATE_FORMAT_TIME_DISPLAY}`

/**
 *
 */
export const DATE_FORMAT_DATE_TIME_DISPLAY_DOW_LONG = `${DATE_FORMAT_DATE_DISPLAY_DOW_LONG}, ${DATE_FORMAT_TIME_DISPLAY}`

/**
 *
 */
export type TDateOnlyDuration =
	| 'year'
	| 'years'
	| 'quarter'
	| 'quarters'
	| 'month'
	| 'months'
	| 'week'
	| 'weeks'
	| 'day'
	| 'days'

/**
 *
 */
export type TTimeOnlyDuration =
	| 'hour'
	| 'hours'
	| 'minute'
	| 'minutes'
	| 'second'
	| 'seconds'
	| 'millisecond'
	| 'milliseconds'

/**
 *
 */
export type TDuration = TDateOnlyDuration | TTimeOnlyDuration

/**
 *
 */
export type TDateOnlyAdjustment =
	| {[key in TDateOnlyDuration]?: number | 'StartOf' | 'EndOf'}
	| {week?: number | 'StartOf' | 'StartOfMon' | 'EndOf'}
	| {weeks?: number | 'StartOf' | 'StartOfMon' | 'EndOf'}

/**
 *
 */
export type TTimeOnlyAdjustment = {[key in TTimeOnlyDuration]?: number | 'StartOf' | 'EndOf'}

/**
 *
 */
export type TAdjustment =
	| {[key in TDuration]?: number | 'StartOf' | 'EndOf'}
	| {week?: number | 'StartOf' | 'StartOfMon' | 'EndOf'}
	| {weeks?: number | 'StartOf' | 'StartOfMon' | 'EndOf'}

/**
 * Current time in ISO string format
 * @returns {string} String of the date/time in ISO format.
 */
export const NowISOString = (adjustment?: TAdjustment): string =>
	!adjustment ? new Date().toISOString() : DateISO('now', adjustment) ?? new Date().toISOString()

/**
 *
 * @constructor
 */
export const CurrentTimeZone = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone

/**
 *
 * @param timeZone
 * @param sourceDate
 * @constructor
 */
export const IANAOffset = (timeZone?: string | null, sourceDate?: TDateAny): number | null => {
	if (!timeZone) return (DateObject(sourceDate ?? 'now', {ignoreIANA: true}) ?? new Date()).getTimezoneOffset()

	const sourceTS = !!sourceDate ? DateParseTSInternal(sourceDate, undefined, true) : null

	let date = !sourceTS ? new Date() : new Date(sourceTS)

	function objFromStr(str: string) {
		const array = str.replace(':', ' ').split(' ')
		return {
			day: parseInt(array[0]),
			hour: parseInt(array[1]),
			minute: parseInt(array[2])
		}
	}

	let str = date.toLocaleString(['nl-NL'], {
		timeZone: timeZone,
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: false
	})

	const other = objFromStr(str)
	// console.log('Other', str, other)
	const amsterdamOffset = other.day * 1440 + other.hour * 60 + other.minute
	str = date.toLocaleString(['nl-NL'], {day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false})
	const myLocale = objFromStr(str)
	// console.log('Locale', str, myLocale)
	let myLocaleOffset = myLocale.day * 1440 + myLocale.hour * 60 + myLocale.minute
	// if (myLocaleOffset < amsterdamOffset) myLocaleOffset += amsterdamOffset
	// 	console.log('Here', process.env.TZ, timeZone, sourceDate, other.day, amsterdamOffset, myLocale.day, myLocaleOffset, date.getTimezoneOffset())
	if (other.day > myLocale.day) {
		myLocaleOffset += other.day * 1440
	}

	// console.log('There', other.day, amsterdamOffset, myLocale.day, myLocaleOffset)
	// } else if (other.day < myLocale.day) {
	// console.log('There')
	// myLocaleOffset -= other.day * 1440
	let result = myLocaleOffset - amsterdamOffset + date.getTimezoneOffset()
	// console.log('Here', str, result, amsterdamOffset, myLocaleOffset, date.getTimezoneOffset())
	// if (result >= 1440 || result <= -1440) result = result % 1440
	// while (result >= 1440 /* 24 * 60 */) {
	// 	result -= 1440
	// }
	// while (result <= -1440 /*24 * 60 * -1 */) {
	// 	result += 1440
	// }
	// if (!!sourceDate) result += 0
	return result % 1440
	// return myLocaleOffset - amsterdamOffset + date.getTimezoneOffset()

	// const timeZoneName = Intl.DateTimeFormat('ia', {
	// 	timeZoneName: 'short',
	// 	timeZone: timeZone ?? CurrentTimeZone()
	// })
	// 	.formatToParts()
	// 	.find((i) => i.type === 'timeZoneName')?.value
	// const offset = timeZoneName?.slice(3)
	// if (!offset) return 0
	//
	// const matchData = offset.match(/([+-])(\d+)(?::(\d+))?/)
	// if (!matchData) {
	// 	console.log(`cannot parse timezone name: ${timeZoneName}`)
	// 	return null
	// }
	//
	// const [, sign, hour, minute] = matchData
	// let result = parseInt(hour) * 60
	// if (sign === '+') result *= -1
	// if (minute) result += parseInt(minute)
	//
	// return result
}

/**
 *
 * @param value
 * @constructor
 */
export const StringHasTimeData = (value: string): boolean => value.includes(':')

/**
 *
 * @param value
 * @constructor
 */
export const StringHasDateData = (value: string): boolean => value.includes('-') || /\d{8}/.test(value)

/**
 * Determines if the string provided likely includes information about what timezone should be addressed, such as the '+4' in '2023-01-01 10:00:00 +4'
 * @param value
 * @constructor
 */
export const StringHasTimeZoneData = (value: string): boolean =>
	value === 'now' ||
	value === 'today' ||
	value.includes('T') ||
	value.substring(15).includes('Z') ||
	value.includes('+') ||
	value.substring(15).includes('-')

/**
 * Determines if the string provided is likely an IANA timezone reference, by checking if it has a / and is otherwise all alpha non-numeric
 * @param value
 * @constructor
 */
export const StringIsIANA = (value: string | null | undefined): boolean =>
	!!value?.includes('/') && /^[a-zA-Z_\/]*$/.test(value)

/**
 *
 * @param value
 * @constructor
 */
export const IsDateString = (value: any): boolean => {
	if (!value || typeof value !== 'string') return false

	if (!StringHasDateData(value)) return false

	return !!DateParseTSInternal(value)
}

/**
 *
 */
export type TDateAny = Date | number | 'now' | 'today' | string | null | undefined

/**
 *
 * @param date
 * @constructor
 */
export const ManualParse = (date: string): number | null => {
	const regexps = [
		'([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?',
		'([0-9]{4})(-([0-9]{2})(-([0-9]{2})( ([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?'
	]

	let d = regexps.reduce<RegExpMatchArray | null>((result, regexp) => {
		const nextMatch = (date.length === 16 ? date + ':00' : date).match(new RegExp(regexp))

		if (!result) return nextMatch

		if (!nextMatch) return result

		if (!!nextMatch[10] && !result[10]) return nextMatch

		return result
	}, null as RegExpMatchArray | null)

	if (d === null) {
		return null
	}

	// console.log(d)

	let dateObj = new Date(CleanNumber(d[1]), 0, 1)

	if (d[1]) {
		dateObj.setUTCFullYear(CleanNumber(d[1]))
	}

	if (d[3]) {
		dateObj.setUTCMonth(CleanNumber(d[3]) - 1)
	}

	if (d[5]) {
		dateObj.setUTCDate(CleanNumber(d[5]))
	}

	// if (d[7]) {
	dateObj.setUTCHours(CleanNumber(d[7] ?? 0))
	// }

	// if (d[8]) {
	dateObj.setUTCMinutes(CleanNumber(d[8] ?? 0))
	// }

	// if (d[10]) {
	dateObj.setUTCSeconds(CleanNumber(d[10] ?? 0))
	// }

	// if (d[12]) {
	dateObj.setUTCMilliseconds(CleanNumber((d[12] ?? 0).toString().padEnd(3, '0').substring(0, 3)))
	// }

	let offsetHours = 0

	if (d[14]) {
		offsetHours = CleanNumber(d[16]) + parseInt(d[17], 10)

		offsetHours *= d[15] === '-' ? 1 : -1
		// console.log('o off', dateObj.getTime(), offset)
		// } else if (!date.includes('Z') && !date.includes('T') && (date.substr(-3, 1) === '-' || date.substr(-3, 1) === '+')) {
		// offset -= CleanNumber(date.substr(-3))
		// console.log('ei off', dateObj.getTime(), offset, date.substr(-3))
		// } else if (date.includes('Z') && date.includes('T')) {
		// console.log('Here')
		// offset -= (dateObj.getTimezoneOffset() / 60)
		// console.log('t off', dateObj.getTimezoneOffset(), offset)
		// } else {
		// offset -= (dateObj.getTimezoneOffset() / 60)
		// console.log('e off', dateObj.getTime(), offset)
	} else if (date.length > 12) {
		const last3 = date.substring(date.length - 3)
		if (last3.startsWith('-') || last3.endsWith('+')) {
			offsetHours -= CleanNumber(last3)
			// console.log('Offset', dateObj, offset)
		}
	}

	// console.log(date, d, dateObj, offset)

	// console.log('offset', dateObj, offset, dateObj.getTime())

	// console.log('Trying...', dateObj, offsetHours)

	const time = dateObj.valueOf() + offsetHours * 3600000

	let newDateObj = new Date(time)

	if (!newDateObj) return null

	return newDateObj.valueOf()
}

const DateParseTSInternal = (date: TDateAny, timezoneSource?: string, ignoreIANA?: boolean): number | null => {
	if (!date) return null // new Date().valueOf() // Date.parse(new Date().toString())

	if (typeof date === 'number') return date

	if (typeof date === 'object') return date.valueOf()

	if (date.toString().toLowerCase() === 'now' || date.toString().toLowerCase() === 'today')
		return new Date().valueOf()

	try {
		let result = ManualParse(date)

		if (!result) {
			result = Date.parse(date.toString())

			if (isNaN(result)) {
				const check = new Date(date)

				if (!check.valueOf()) {
					result = ManualParse(date) ?? 0
				}
			}
		}

		if (!result) return null

		// console.log('hasTZ', StringHasTimeZoneData(date))

		// Set a time string with no other timezone data to the current timezone
		if (!ignoreIANA && !StringHasTimeZoneData(date)) {
			let useTimezoneSource = timezoneSource

			if (!useTimezoneSource) {
				const dateComponents = date.split(' ')
				const lastElement = dateComponents[dateComponents.length - 1]

				if (StringIsIANA(lastElement)) {
					useTimezoneSource = lastElement
				}
			}

			console.log('Using', useTimezoneSource)

			result += (IANAOffset(useTimezoneSource, date) ?? 0) * 60000
		}

		return result
	} catch {
		return null
	}
}

/**
 *
 */
export type TDateParseOptions = TAdjustment & {timezoneSource?: string; ignoreIANA?: boolean}

/**
 *
 * @param date
 * @param adjustments
 * @constructor
 */
export const DateParseTS = (date: TDateAny, adjustments?: TDateParseOptions): number | null => {
	let newDate = DateParseTSInternal(date, adjustments?.timezoneSource, adjustments?.ignoreIANA)

	if (!newDate || !adjustments) return newDate

	return DateAdjustTS(newDate, adjustments)
}

/**
 *
 * @param date
 * @param adjustments
 * @constructor
 */
export const DateISO = (date: TDateAny, adjustments?: TDateParseOptions): string | null => {
	const parsed = DateParseTS(date, adjustments)

	if (!parsed) return null

	return new Date(parsed).toISOString()
}

/**
 *
 * @param date
 * @param adjustments
 * @constructor
 */
export const DateObject = (date: TDateAny, adjustments?: TDateParseOptions): Date | null => {
	const parsed = DateParseTS(date, adjustments)

	if (!parsed) return null

	return new Date(parsed)
}

/**
 *
 * @param date
 * @param adjustments
 * @constructor
 */
export const DateICS = (date: TDateAny, adjustments?: TDateParseOptions): string | null => {
	const dateISO = DateISO(date, adjustments)

	if (!dateISO) return null

	let dateICS = dateISO

	let decimal = dateICS.indexOf('.')
	let zed = dateICS.indexOf('Z')

	if (decimal > 0 && zed > decimal) {
		dateICS = dateICS.substring(0, decimal) + dateICS.substring(zed)
	}

	dateICS = ReplaceAll('-', '', dateICS)
	dateICS = ReplaceAll(':', '', dateICS)

	return dateICS
}

/**
 *
 */
export type TDateFormat =
	| 'Local'
	| 'LocalDoW'
	| 'LocalDateTime'
	| 'LocalDoWTime'
	| 'Date'
	| 'DateTime'
	| 'DisplayDate'
	| 'DisplayTime'
	| 'DisplayDateDoW'
	| 'DisplayDateTime'
	| 'DisplayDateDoWTime'
	| 'DisplayDateLong'
	| 'DisplayDateDoWLong'
	| 'DisplayDateTimeLong'
	| 'DisplayDateDoWTimeLong'

/**
 * Converts just about any valid type of date, time, or date/time object, string, or MS number into the format provided
 * @param format
 * @param date
 * @param timezoneDisplay
 * @param timezoneSource
 * @constructor
 */
export const DateFormatAny = (
	format: TDateFormat | string,
	date: TDateAny,
	timezoneDisplay?: string,
	timezoneSource?: string
): string | null => {
	const noTZInfo = typeof date === 'string' && !StringHasTimeZoneData(date)

	const useDate =
		typeof date === 'string' && !StringHasDateData(date) && StringHasTimeData(date)
			? `${DateOnly('now')} ${date}`
			: date

	let dateObject = DateObject(DateParseTSInternal(useDate, noTZInfo ? timezoneSource : undefined))

	// console.log('DFA', date, dateObject)

	// const objectUTC = false //(typeof date === 'object' && timezoneDisplay === 'UTC')

	if (timezoneDisplay) {
		try {
			if (!dateObject || dateObject.valueOf() === 0) return null

			const sourceDate = !!useDate && useDate !== 'now' && useDate !== 'today' ? dateObject : undefined

			const sourceOffset = IANAOffset(timezoneSource, sourceDate) ?? 0 // Chic 5
			const displayOffset = IANAOffset(timezoneDisplay, sourceDate) ?? 0 // Chic 6
			const offset = noTZInfo
				? !timezoneSource
					? displayOffset - sourceOffset - (displayOffset - sourceOffset)
					: (IANAOffset(undefined, sourceDate) ?? 0) - sourceOffset - (displayOffset - sourceOffset)
				: sourceOffset - displayOffset

			// console.log('DFA', date, noTZInfo, timezoneSource, sourceOffset, timezoneDisplay, displayOffset, offset)

			// if (timezoneDisplay === 'America/Los_Angeles' && timezoneSource === 'America/Chicago')
			// console.log('---')
			// 	console.log(noTZInfo, date, dateObject, sourceOffset/60, displayOffset/60, (IANAOffset() ?? 0) / 60, offset / 60)

			// console.log('offset', sourceDate, sourceOffset, displayOffset, offset)

			dateObject = DateObject(dateObject, {minutes: offset})

			// console.log(dateObject)

			// console.log('New', dateObject)
			// dateObject = DateObject(dateObject, {minutes: toOffset})
		} catch (err) {
			console.log('Invalid Timezone', err)
			return null
		}
	}

	if (!dateObject || dateObject.valueOf() === 0) return null

	const applyCommand = (command: string, dateApply: Date): string => {
		switch (command) {
			case 'YYYY':
				return dateApply.getFullYear().toString().padStart(4, '0')
			case 'YY':
				return dateApply.getFullYear().toString().substring(2).padStart(2, '0')
			case 'Q':
				return Math.ceil((dateApply.getMonth() + 1) / 3).toString()
			case 'Qo':
				return DigitsNth(Math.ceil((dateApply.getMonth() + 1) / 3)) ?? ''
			case 'MMMM':
				return MonthNames[dateApply.getMonth()] ?? ''
			case 'MMM':
				return (MonthNames[dateApply.getMonth()] ?? '').substring(0, 3)
			case 'MM':
				return (dateApply.getMonth() + 1).toString().padStart(2, '0')
			case 'Mo':
				return DigitsNth(dateApply.getMonth() + 1) ?? ''
			case 'M':
				return (dateApply.getMonth() + 1).toString()
			/**
			 * Week of Year	w	1 2 ... 52 53
			 * wo	1st 2nd ... 52nd 53rd
			 * ww	01 02 ... 52 53
			 * Week of Year (ISO)	W	1 2 ... 52 53
			 * Wo	1st 2nd ... 52nd 53rd
			 * WW	01 02 ... 52 53
			 */
			/**
			 * Day of Year	DDD	1 2 ... 364 365
			 * DDDo	1st 2nd ... 364th 365th
			 * DDDD	001 002 ... 364 365
			 */
			case 'DD':
				return dateApply.getDate().toString().padStart(2, '0')
			case 'Do':
				return DigitsNth(dateApply.getDate()) ?? ''
			case 'D':
				return dateApply.getDate().toString()
			case 'd':
				return dateApply.getDay().toString()
			case 'do':
				return DigitsNth(dateApply.getDay()) ?? ''
			case 'dd':
				return (WeekDays[dateApply.getDay()] ?? '').substring(0, 2)
			case 'ddd':
				return (WeekDays[dateApply.getDay()] ?? '').substring(0, 3)
			case 'dddd':
				return WeekDays[dateApply.getDay()] ?? ''
			case 'HH':
				return dateApply.getHours().toString().padStart(2, '0')
			case 'H':
				return dateApply.getHours().toString()
			case 'hh':
				return (dateApply.getHours() > 12 ? dateApply.getHours() - 12 : dateApply.getHours())
					.toString()
					.padStart(2, '0')
			case 'h': {
				const hour = dateApply.getHours() > 12 ? dateApply.getHours() - 12 : dateApply.getHours()
				return (hour === 0 ? 12 : hour).toString()
			}
			case 'mm':
				return dateApply.getMinutes().toString().padStart(2, '0')
			case 'm':
				return dateApply.getMinutes().toString()
			case 'ss':
				return dateApply.getSeconds().toString().padStart(2, '0')
			case 's':
				return dateApply.getSeconds().toString()
			case 'A':
				return dateApply.getHours() >= 12 ? 'PM' : 'AM'
			case 'a':
				return dateApply.getHours() >= 12 ? 'pm' : 'am'
			default:
				return command
		}
	}

	let useFormat: string

	switch (format) {
		case 'Local':
			useFormat = 'M/D/YYYY'
			break
		case 'LocalDoW':
			useFormat = 'dd, M/D/YYYY'
			break
		case 'LocalDateTime':
			useFormat = 'M/D/YYYY h:mm a'
			break
		case 'LocalDoWTime':
			useFormat = 'dd, M/D/YYYY h:mm a'
			break
		case 'Date':
			useFormat = DATE_FORMAT_DATE
			break
		case 'DateTime':
			useFormat = DATE_FORMAT_DATE_TIME
			break
		case 'DisplayDate':
			useFormat = DATE_FORMAT_DATE_DISPLAY
			break
		case 'DisplayDateDoW':
			useFormat = DATE_FORMAT_DATE_DISPLAY_DOW
			break
		case 'DisplayTime':
			useFormat = DATE_FORMAT_TIME_DISPLAY
			break
		case 'DisplayDateTime':
			useFormat = DATE_FORMAT_DATE_TIME_DISPLAY
			break
		case 'DisplayDateDoWTime':
			useFormat = DATE_FORMAT_DATE_TIME_DISPLAY_DOW
			break
		case 'DisplayDateLong':
			useFormat = DATE_FORMAT_DATE_DISPLAY_LONG
			break
		case 'DisplayDateDoWLong':
			useFormat = DATE_FORMAT_DATE_DISPLAY_DOW_LONG
			break
		case 'DisplayDateTimeLong':
			useFormat = DATE_FORMAT_DATE_TIME_DISPLAY_LONG
			break
		case 'DisplayDateDoWTimeLong':
			useFormat = DATE_FORMAT_DATE_TIME_DISPLAY_DOW_LONG
			break
		default:
			useFormat = format ?? 'YYYY-MM-DD h:mm:ss a'
			break
	}

	const formatArray = useFormat.split('')
	let result = ''

	let previousChar = ''
	let command = ''
	let inEscape = false

	const patterns = ['Mo', 'Qo', 'Do', 'do']

	for (const formatChar of formatArray) {
		if (inEscape) {
			if (formatChar === ']') {
				inEscape = false
			} else {
				result += formatChar
			}
		} else if (formatChar === '[') {
			result += applyCommand(command, dateObject)

			command = ''

			previousChar = ''

			inEscape = true
		} else {
			if (
				formatChar === previousChar ||
				previousChar === '' ||
				(command.length > 0 &&
					patterns.some(
						(pattern) =>
							pattern.startsWith(command) &&
							formatChar === pattern.substring(command.length, command.length + 1)
					))
			) {
				command += formatChar
			} else {
				result += applyCommand(command, dateObject)

				command = formatChar
			}

			previousChar = formatChar
		}
	}

	result += applyCommand(command, dateObject)

	return result
}

/**
 *
 * @param format
 * @param date
 * @param timezoneDisplay
 * @param timezoneSource
 * @constructor
 */
export const DateFormat = (
	format: TDateFormat,
	date: TDateAny,
	timezoneDisplay?: string,
	timezoneSource?: string
): string | null => DateFormatAny(format, date, timezoneDisplay, timezoneSource)

/**
 *
 * @param date
 * @constructor
 */
export const YYYYMMDDHHmmss = (date: TDateAny): string => {
	const dateObject = DateObject(date) ?? new Date()
	return `${dateObject.getFullYear()}${(dateObject.getMonth() + 1).toString().padStart(2, '0')}${dateObject
		.getDate()
		.toString()
		.padStart(2, '0')}${dateObject.getHours().toString().padStart(2, '0')}${dateObject
		.getMinutes()
		.toString()
		.padStart(2, '0')}${dateObject.getSeconds().toString().padStart(2, '0')}`
}

/**
 *
 * @param date
 * @constructor
 */
export const YYYY_MM_DD_HH_mm_ss = (date: TDateAny): string => {
	const dateObject = DateObject(date) ?? new Date()
	return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject
		.getDate()
		.toString()
		.padStart(2, '0')}_${dateObject.getHours().toString().padStart(2, '0')}-${dateObject
		.getMinutes()
		.toString()
		.padStart(2, '0')}-${dateObject.getSeconds().toString().padStart(2, '0')}`
}

/**
 *
 * @param date
 * @constructor
 */
export const YYYYsMMsDDsHHcmmcss = (date: TDateAny): string => {
	const dateObject = DateObject(date) ?? new Date()
	return `${dateObject.getFullYear()}/${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject
		.getDate()
		.toString()
		.padStart(2, '0')} ${dateObject.getHours().toString().padStart(2, '0')}:${dateObject
		.getMinutes()
		.toString()
		.padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}`
}

/**
 *
 * @param date
 * @constructor
 */
export const YYYYsMMsDD = (date: TDateAny): string => {
	const dateObject = DateObject(date) ?? new Date()
	return `${dateObject.getFullYear()}/${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject
		.getDate()
		.toString()
		.padStart(2, '0')}`
}

/**
 *
 * @param date
 * @constructor
 */
export const HHcmmcss = (date: TDateAny): string => {
	const dateObject = DateObject(date) ?? new Date()
	return `${dateObject.getHours().toString().padStart(2, '0')}:${dateObject
		.getMinutes()
		.toString()
		.padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}`
}

/**
 *
 */
export const MonthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
]

/**
 *
 */
export const WeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/**
 *
 * @param ts
 * @constructor
 */
export const TSYearsEstimate = (ts: number): number => Math.floor(ts / 365 / 24 / 60 / 60 / 1000)

/**
 *
 * @param ts
 * @param withinYear
 * @constructor
 */
export const TSMonthsEstimate = (ts: number, withinYear?: boolean): number =>
	Math.floor((ts - (withinYear ? TSYearsEstimate(ts) * 365 * 24 * 60 * 60 * 1000 : 0)) / 30 / 24 / 60 / 60 / 1000)

/**
 *
 * @param ts
 * @constructor
 */
export const TSWeeks = (ts: number): number => Math.floor(ts / 7 / 24 / 60 / 60 / 1000)

/**
 *
 * @param ts
 * @param withinMonth
 * @constructor
 */
export const TSDays = (ts: number, withinMonth?: boolean): number =>
	Math.floor((ts - (withinMonth ? TSMonthsEstimate(ts) * 30 * 24 * 60 * 60 * 1000 : 0)) / 24 / 60 / 60 / 1000)

/**
 *
 * @param ts
 * @param withinDay
 * @constructor
 */
export const TSHours = (ts: number, withinDay?: boolean): number =>
	Math.floor((ts - (withinDay ? TSDays(ts) * 24 * 60 * 60 * 1000 : 0)) / 60 / 60 / 1000)

/**
 *
 * @param ts
 * @param withinHour
 * @constructor
 */
export const TSMinutes = (ts: number, withinHour?: boolean): number =>
	Math.floor((ts - (withinHour ? TSHours(ts) * 60 * 60 * 1000 : 0)) / 60 / 1000)

/**
 *
 * @param ts
 * @param withinMinute
 * @constructor
 */
export const TSSeconds = (ts: number, withinMinute?: boolean): number =>
	Math.floor((ts - (withinMinute ? TSMinutes(ts) * 60 * 1000 : 0)) / 1000)

const DateIsLeapYear = (year: number): boolean => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

/**
 *
 * @param year
 * @param month
 * @constructor
 */
export const DaysInMonthYear = (year: number, month: number): number | null => {
	let monthCalc = month
	let yearCalc = year

	while (monthCalc < 0) {
		monthCalc += 12
		yearCalc -= 1
	}

	while (monthCalc > 11) {
		monthCalc -= 12
		yearCalc += 1
	}

	return [31, DateIsLeapYear(yearCalc) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][monthCalc] ?? null
}

/**
 *
 * @param date
 * @constructor
 */
export const DaysInMonth = (date: TDateAny): number | null => {
	const originalDateObject = DateObject(date)
	if (!originalDateObject) return null
	return DaysInMonthYear(originalDateObject.getUTCFullYear(), originalDateObject.getUTCMonth())
}

const DateAdjustMonthTS = (date: TDateAny, months: number): number | null => {
	let dateTS = DateParseTSInternal(date)

	if (!dateTS) return null

	const isNegative = months < 0

	const originalDateObject = DateObject(date) ?? new Date()
	const originalDate = originalDateObject.getUTCDate()
	const isLastDayOfMonth =
		originalDate === DaysInMonthYear(originalDateObject.getUTCFullYear(), originalDateObject.getUTCMonth())

	for (let i = 0; i < Math.abs(months); i++) {
		const dateObj = DateObject(dateTS) ?? new Date()
		const year = dateObj.getUTCFullYear()
		const month = dateObj.getUTCMonth()

		if (isLastDayOfMonth) {
			if (isNegative) {
				dateTS -= 24 * 60 * 60 * 1000 * (DaysInMonthYear(year, month) ?? 0)
			} else {
				dateTS += 24 * 60 * 60 * 1000 * (DaysInMonthYear(year, month + 1) ?? 0)
			}
		} else {
			if (isNegative) {
				dateTS -= 24 * 60 * 60 * 1000 * (DaysInMonthYear(year, month - 1) ?? 0)
			} else {
				dateTS += 24 * 60 * 60 * 1000 * (DaysInMonthYear(year, month) ?? 0)
			}

			let currentDate = DateObject(dateTS) ?? new Date()
			if (currentDate.getUTCDate() < 15 && currentDate.getUTCDate() < originalDate)
				dateTS -= 24 * 60 * 60 * 1000 * currentDate.getUTCDate()

			currentDate = DateObject(dateTS) ?? new Date()
			const currentDaysInMonth = DaysInMonthYear(currentDate.getUTCFullYear(), currentDate.getUTCMonth()) ?? 0
			if (
				currentDate.getUTCDate() > 15 &&
				currentDate.getUTCDate() < originalDate &&
				currentDate.getUTCDate() < currentDaysInMonth
			)
				dateTS +=
					24 *
					60 *
					60 *
					1000 *
					((currentDaysInMonth > originalDate ? originalDate : currentDaysInMonth) - currentDate.getUTCDate())
		}
	}

	return dateTS
}

/**
 *
 * @param date
 * @param adjustments
 * @constructor
 */
export const DateAdjustTS = (date: TDateAny, adjustments: TAdjustment): number | null => {
	let dateTS = DateParseTSInternal(date)

	for (const key of Object.keys(adjustments)) {
		if (!dateTS) return null

		switch (key) {
			case 'year':
			case 'years':
				switch (adjustments[key]) {
					case 'StartOf':
						{
							const dateObj = DateObject(dateTS) ?? new Date()
							dateTS =
								DateAdjustTS(dateTS, {
									month: dateObj.getUTCMonth() * -1,
									months: 'StartOf'
								}) ?? 0
						}
						break
					case 'EndOf':
						{
							const dateObj = DateObject(dateTS) ?? new Date()
							dateTS =
								DateAdjustTS(dateTS, {
									month: 11 - dateObj.getUTCMonth(),
									months: 'EndOf'
								}) ?? 0
						}
						break
					default:
						dateTS = DateAdjustMonthTS(dateTS, CleanNumber(adjustments[key]) * 12)
						break
				}
				break
			case 'month':
			case 'months':
				switch (adjustments[key]) {
					case 'StartOf':
						{
							const dateObj = DateObject(dateTS) ?? new Date()
							dateTS =
								DateAdjustTS(dateTS, {
									day: (dateObj.getUTCDate() - 1) * -1,
									days: 'StartOf'
								}) ?? 0
						}
						break
					case 'EndOf':
						{
							const dateObj = DateObject(dateTS) ?? new Date()
							dateTS =
								DateAdjustTS(dateTS, {
									day:
										(DaysInMonthYear(dateObj.getUTCFullYear(), dateObj.getUTCMonth()) ?? 0) -
										dateObj.getUTCDate(),
									days: 'EndOf'
								}) ?? 0
						}
						break
					default:
						dateTS = DateAdjustMonthTS(dateTS, CleanNumber(adjustments[key]))
						break
				}
				break
			case 'quarter':
			case 'quarters':
				switch (adjustments[key]) {
					case 'StartOf':
						{
							const dateObj = DateObject(dateTS) ?? new Date()
							dateTS =
								DateAdjustTS(dateTS, {
									month: (dateObj.getUTCMonth() % 3) * -1,
									months: 'StartOf'
								}) ?? 0
						}
						break
					case 'EndOf':
						{
							const dateObj = DateObject(dateTS) ?? new Date()
							dateTS =
								DateAdjustTS(dateTS, {
									month: 2 - (dateObj.getUTCMonth() % 3),
									months: 'EndOf'
								}) ?? 0
						}
						break
					default:
						dateTS = DateAdjustMonthTS(dateTS, CleanNumber(adjustments[key]) * 3)
						break
				}
				break
			default:
				if (!dateTS) return null

				switch (key) {
					case 'week':
					case 'weeks':
						switch (adjustments[key]) {
							case 'StartOf':
								{
									const dateObj = DateObject(dateTS) ?? new Date()
									dateTS =
										DateAdjustTS(dateTS, {
											day: dateObj.getUTCDay() * -1,
											days: 'StartOf'
										}) ?? 0
								}
								break
							case 'StartOfMon':
								{
									const dateObj = DateObject(dateTS) ?? new Date()
									switch (dateObj.getUTCDay()) {
										case 0:
											//Sunday
											dateTS =
												DateAdjustTS(dateTS, {
													day: -6,
													days: 'StartOf'
												}) ?? 0
											break
										case 1:
											// Monday
											dateTS =
												DateAdjustTS(dateTS, {
													days: 'StartOf'
												}) ?? 0
											break
										default:
											// All other days
											dateTS =
												DateAdjustTS(dateTS, {
													day: (dateObj.getUTCDay() - 1) * -1,
													days: 'StartOf'
												}) ?? 0
											break
									}
								}
								break
							case 'EndOf':
								{
									const dateObj = DateObject(dateTS) ?? new Date()
									dateTS =
										DateAdjustTS(dateTS, {
											day: 6 - dateObj.getUTCDay(),
											days: 'EndOf'
										}) ?? 0
								}
								break
							default:
								dateTS += CleanNumber(adjustments[key]) * 7 * 24 * 60 * 60 * 1000
								break
						}
						break
					case 'day':
					case 'days':
						switch (adjustments[key]) {
							case 'StartOf':
								{
									const dateObj = DateObject(dateTS) ?? new Date()
									dateTS =
										DateAdjustTS(dateTS, {
											hour: dateObj.getUTCHours() * -1,
											hours: 'StartOf'
										}) ?? 0
								}
								break
							case 'EndOf':
								{
									const dateObj = DateObject(dateTS) ?? new Date()
									dateTS =
										DateAdjustTS(dateTS, {
											hour: 23 - dateObj.getUTCHours(),
											hours: 'EndOf'
										}) ?? 0
								}
								break
							default:
								dateTS += CleanNumber(adjustments[key]) * 24 * 60 * 60 * 1000
								break
						}
						break
					case 'hour':
					case 'hours':
						switch (adjustments[key]) {
							case 'StartOf':
								{
									const dateObj = DateObject(dateTS) ?? new Date()
									dateTS =
										DateAdjustTS(dateTS, {
											minute: dateObj.getUTCMinutes() * -1,
											minutes: 'StartOf'
										}) ?? 0
								}
								break
							case 'EndOf':
								{
									const dateObj = DateObject(dateTS) ?? new Date()
									dateTS =
										DateAdjustTS(dateTS, {
											minute: 59 - dateObj.getUTCMinutes(),
											minutes: 'EndOf'
										}) ?? 0
								}
								break
							default:
								dateTS += CleanNumber(adjustments[key]) * 60 * 60 * 1000
								break
						}
						break
					case 'minute':
					case 'minutes':
						switch (adjustments[key]) {
							case 'StartOf':
								{
									const dateObj = DateObject(dateTS) ?? new Date()
									dateTS =
										DateAdjustTS(dateTS, {
											second: dateObj.getUTCSeconds() * -1,
											seconds: 'StartOf'
										}) ?? 0
								}
								break
							case 'EndOf':
								{
									const dateObj = DateObject(dateTS) ?? new Date()
									dateTS =
										DateAdjustTS(dateTS, {
											second: 59 - dateObj.getUTCSeconds(),
											seconds: 'EndOf'
										}) ?? 0
								}
								break
							default:
								dateTS += CleanNumber(adjustments[key]) * 60 * 1000
								break
						}
						break
					case 'second':
					case 'seconds':
						switch (adjustments[key]) {
							case 'StartOf':
								{
									const dateObj = DateObject(dateTS) ?? new Date()
									dateTS =
										DateAdjustTS(dateTS, {
											millisecond: dateObj.getUTCMilliseconds() * -1
										}) ?? 0
								}
								break
							case 'EndOf':
								{
									const dateObj = DateObject(dateTS) ?? new Date()
									dateTS =
										DateAdjustTS(dateTS, {
											millisecond: 999 - dateObj.getUTCMilliseconds()
										}) ?? 0
								}
								break
							default:
								dateTS += CleanNumber(adjustments[key]) * 1000
								break
						}
						break
					case 'millisecond':
					case 'milliseconds':
						dateTS += CleanNumber(adjustments[key])
						break
				}
				break
		}
	}

	return dateTS
}

/**
 *
 * @param dateFrom
 * @param dateTo
 * @param duration
 * @constructor
 */
export const DateDiff = (dateFrom: TDateAny, dateTo: TDateAny, duration: TDuration): number | null => {
	// const isDayRanged = ['year'
	// 										 , 'years'
	// 										 , 'quarter'
	// 										 , 'quarters'
	// 										 , 'month'
	// 										 , 'months'
	// 										 , 'week'
	// 										 , 'weeks'
	// 										 , 'day'
	// 										 , 'days'].includes(duration)

	let date1 = DateParseTSInternal(dateFrom)
	let date2 = DateParseTSInternal(dateTo)

	if (!date1 || !date2) return null

	if (date1 === date2) return 0

	switch (duration) {
		case 'year':
		case 'years':
		case 'month':
		case 'months':
			const isNegative = date1 < date2
			const increment = (['year', 'years'].includes(duration) ? 12 : 1) * (isNegative ? -1 : 1)
			let count = 0
			let newTS = DateAdjustMonthTS(date2, increment) ?? 0

			while (isNegative ? date1 <= newTS : date1 >= newTS) {
				count -= isNegative ? -1 : 1
				newTS = DateAdjustMonthTS(newTS, increment) ?? 0
			}

			return count
		default: {
			const diff = date2 - date1
			switch (duration) {
				case 'week':
				case 'weeks':
					return diff < 0 ? TSWeeks(diff * -1) * -1 : TSWeeks(diff)
				case 'day':
				case 'days':
					return diff < 0 ? TSDays(diff * -1) * -1 : TSDays(diff)
				case 'hour':
				case 'hours':
					return diff < 0 ? TSHours(diff * -1) * -1 : TSHours(diff)
				case 'minute':
				case 'minutes':
					return diff < 0 ? TSMinutes(diff * -1) * -1 : TSMinutes(diff)
				case 'second':
				case 'seconds':
					return diff < 0 ? TSSeconds(diff * -1) * -1 : TSSeconds(diff)
				case 'millisecond':
				case 'milliseconds':
					return diff
			}
		}
	}

	return null
}

/**
 *
 */
export interface IWeekNumber {
	year: number
	week: number
}

/**
 *
 * @param component
 * @param date
 * @param adjustments
 * @constructor
 */
export const DateComponent = (
	component: 'YYYY' | 'MM' | 'DD' | 'HH' | 'mm' | 'ss',
	date?: TDateAny,
	adjustments?: TAdjustment
): number => CleanNumber(DateFormatAny(component, DateParseTS(date, adjustments)))

/**
 *
 * @param date
 * @param adjustments
 * @constructor
 */
export const DateWeekNumber = (date?: TDateAny, adjustments?: TAdjustment): IWeekNumber | null => {
	console.error('Deprecated!  Use: DateWeekISONumber')
	const currentDate = DateObject(date ?? 'now', {timezoneSource: 'UTC', ...adjustments})
	if (!currentDate) return null

	const year = CleanNumber(DateFormatAny('YYYY', date))

	const startDate = new Date(year, 0, 1)

	const days = Math.floor((currentDate.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000)) + 7

	const week = Math.ceil(days / 7)

	return {year, week}
}

/**
 *
 * @param date
 * @param adjustments
 * @constructor
 */
export const DateWeekISONumberNull = (date?: TDateAny, adjustments?: TAdjustment): IWeekNumber | null => {
	const currentDate = DateObject(date ?? 'now', adjustments)
	if (!currentDate) return null

	const tdt = new Date(currentDate.valueOf())
	const dayn = (currentDate.getDay() + 6) % 7
	tdt.setDate(tdt.getDate() - dayn + 3)
	const firstThursday = tdt.valueOf()
	tdt.setMonth(0, 1)
	if (tdt.getDay() !== 4) {
		tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7))
	}
	const week = 1 + Math.ceil((firstThursday - tdt.valueOf()) / 604800000)

	const dateYear = currentDate
	dateYear.setDate(dateYear.getDate() + 3 - ((dateYear.getDay() + 6) % 7))
	const year = dateYear.getFullYear()

	return {year, week}
}

export const DateWeekISONumber = (date?: TDateAny, adjustments?: TAdjustment): IWeekNumber =>
	DateWeekISONumberNull(date, adjustments) ?? {year: new Date().getFullYear(), week: 1}

/**
 *
 * @param weekNumber
 * @constructor
 */
export const DateFromWeekNumber = (weekNumber: IWeekNumber): string | null => {
	if (!weekNumber?.year) return null

	const days = (weekNumber.week - 1) * 7

	let tryDate = DateOnly(new Date(weekNumber.year, 0, days), {week: 'StartOfMon'})
	let tryWeekNumber = DateWeekISONumber(tryDate) ?? weekNumber

	let attempts = 0

	while (weekNumber.week !== tryWeekNumber.week || weekNumber.year !== tryWeekNumber.year) {
		if (attempts > 4) {
			// console.error(`Could not calculate DateFromWeekNumber ${JSON.stringify(weekNumber)}`)
			return null
		}
		attempts++
		if (
			tryWeekNumber.year < weekNumber.year ||
			(tryWeekNumber.year === weekNumber.year && tryWeekNumber.week < weekNumber.week)
		) {
			tryDate = DateOnly(tryDate, {weeks: 1})
		} else {
			tryDate = DateOnly(tryDate, {weeks: -1})
		}

		tryWeekNumber = DateWeekISONumber(tryDate) ?? weekNumber
	}

	return tryDate
}

/**
 *
 * @param weekNumber
 * @constructor
 */
export const DatesFromWeekNumberNull = (weekNumber: IWeekNumber): IDates | null => {
	const start = DateFromWeekNumber(weekNumber)

	if (!start) return null

	return {
		start,
		end: DateOnly(start, {days: 6})
	}
}

export const DatesFromWeekNumber = (weekNumber: IWeekNumber): IDates =>
	DatesFromWeekNumberNull(weekNumber) ?? {
		start: DateOnly('now', {week: 'StartOfMon'}),
		end: DateOnly('now', {week: 'StartOfMon', days: 6})
	}

export const MonthDatesFromDateISOWeeks = (date: TDateAny): IDates => {
	const start = DateOnly(date ?? 'now', {month: 'StartOf', days: 6, week: 'StartOfMon'})

	let end = DateOnly(start, {weeks: 2})

	while (DateCompare(start, 'IsSame', end, 'month')) {
		end = DateOnly(end, {week: 1})
	}

	end = DateOnly(end, {week: -1, days: 6})

	return {start, end}
}

export const WeekNumberAdjust = (
	weekNumber: IWeekNumber,
	adjustment: TDateOnlyAdjustment | number
): IWeekNumber | null => {
	let nextDate = DateFromWeekNumber(weekNumber)

	if (!nextDate) return null

	return DateWeekISONumber(DateOnly(nextDate, typeof adjustment === 'number' ? {weeks: adjustment} : adjustment))
}

/**
 *
 * @param dateFrom
 * @param dateTo
 * @constructor
 */
export const DateDiffComponents = (
	dateFrom: TDateAny,
	dateTo: TDateAny
): {
	year: number
	month: number
	day: number
	hour: number
	minute: number
	second: number
	millisecond: number
} => {
	let returnComponents = {
		year: 0,
		month: 0,
		day: 0,
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0
	}

	const dateFromTS = DateParseTSInternal(dateFrom) ?? 0
	let checkTo = DateParseTSInternal(dateTo) ?? 0

	returnComponents.year = DateDiff(dateFromTS, checkTo, 'year') ?? 0
	if (returnComponents.year) checkTo = DateParseTS(checkTo, {year: returnComponents.year * -1}) ?? 0

	returnComponents.month = DateDiff(dateFromTS, checkTo, 'month') ?? 0
	if (returnComponents.month) checkTo = DateParseTS(checkTo, {month: returnComponents.month * -1}) ?? 0

	returnComponents.day = DateDiff(dateFromTS, checkTo, 'day') ?? 0
	if (returnComponents.day) checkTo = DateParseTS(checkTo, {day: returnComponents.day * -1}) ?? 0

	returnComponents.hour = DateDiff(dateFromTS, checkTo, 'hour') ?? 0
	if (returnComponents.hour) checkTo = DateParseTS(checkTo, {hour: returnComponents.hour * -1}) ?? 0

	returnComponents.minute = DateDiff(dateFromTS, checkTo, 'minute') ?? 0
	if (returnComponents.minute) checkTo = DateParseTS(checkTo, {minute: returnComponents.minute * -1}) ?? 0

	returnComponents.second = DateDiff(dateFromTS, checkTo, 'second') ?? 0
	if (returnComponents.second) checkTo = DateParseTS(checkTo, {second: returnComponents.second * -1}) ?? 0

	returnComponents.millisecond = DateDiff(dateFromTS, checkTo, 'millisecond') ?? 0

	return returnComponents
}

/**
 *
 * @param dateFrom
 * @param dateTo
 * @param tripToSecondsOrTwo
 * @param abbreviated
 * @constructor
 */
export const DateDiffLongDescription = (
	dateFrom: TDateAny,
	dateTo: TDateAny,
	tripToSecondsOrTwo = false,
	abbreviated = false
): string => {
	const components = DateDiffComponents(dateFrom, dateTo)

	let text = ''

	if (components.year) {
		text += ` ${ToDigits(components.year)}${abbreviated ? 'Y' : ' ' + AddS('Year', components.year)}`
		text += ` ${ToDigits(components.month)}${abbreviated ? 'Mo' : ' ' + AddS('Month', components.month)}`
		if (components.day && !tripToSecondsOrTwo) {
			text += ` ${ToDigits(components.day)}${abbreviated ? 'D' : ' ' + AddS('Day', components.day)}`
		}
	} else if (components.month) {
		text += ` ${ToDigits(components.month)}${abbreviated ? 'Mo' : ' ' + AddS('Month', components.month)}`

		if (components.day) {
			text += ` ${ToDigits(components.day)}${abbreviated ? 'D' : ' ' + AddS('Day', components.day)}`
		}
	} else if (components.day) {
		text += ` ${ToDigits(components.day)}${abbreviated ? 'D' : ' ' + AddS('Day', components.day)}`
		if (components.hour) {
			text += ` ${ToDigits(components.hour)}${abbreviated ? 'h' : ' ' + AddS('Hour', components.hour)}`
		}
		if (components.minute && !tripToSecondsOrTwo) {
			text += ` ${ToDigits(components.minute)}${abbreviated ? 'm' : ' ' + AddS('Minute', components.minute)}`
		}
	} else if (components.hour) {
		text += ` ${ToDigits(components.hour)}${abbreviated ? 'h' : ' ' + AddS('Hour', components.hour)}`
		if (components.minute) {
			text += ` ${ToDigits(components.minute)}${abbreviated ? 'm' : ' ' + AddS('Minute', components.minute)}`
		}
	} else {
		if (components.minute || (!text && tripToSecondsOrTwo)) {
			text += ` ${ToDigits(components.minute)}${abbreviated ? 'm' : ' ' + AddS('Minute', components.minute)}`
		}
		if (!text || (!tripToSecondsOrTwo && components.second)) {
			text += ` ${ToDigits(components.second)}${abbreviated ? 's' : ' ' + AddS('Second', components.second)}`
		}
	}

	return text.trim()
}

/**
 * Displays a simplified duration format from seconds.
 *
 * @example
 * MomentDurationShortText((30 * 60) + 20) // result: 30 Minutes 20 Seconds
 */
export const DurationLongDescription = (seconds: number, tripToSecondsOrTwo = false, abbreviated = false): string => {
	const durationTS = seconds * 1000

	let text = ''

	if (TSYearsEstimate(durationTS)) {
		text += ` ${ToDigits(TSYearsEstimate(durationTS), 0)}${
			abbreviated ? 'Y' : ' ' + AddS('Year', TSYearsEstimate(durationTS))
		}`
		text += ` ${ToDigits(TSMonthsEstimate(durationTS, true), 0)}${
			abbreviated ? 'Mo' : ' ' + AddS('Month', TSMonthsEstimate(durationTS, true))
		}`
		if (TSDays(durationTS, true) && !tripToSecondsOrTwo) {
			text += ` ${ToDigits(TSDays(durationTS, true), 0)}${
				abbreviated ? 'D' : ' ' + AddS('Day', TSDays(durationTS, true))
			}`
		}
	} else if (TSMonthsEstimate(durationTS, true)) {
		text += ` ${ToDigits(TSMonthsEstimate(durationTS, true), 0)}${
			abbreviated ? 'Mo' : ' ' + AddS('Month', TSMonthsEstimate(durationTS, true))
		}`

		if (TSDays(durationTS, true)) {
			text += ` ${ToDigits(TSDays(durationTS, true), 0)}${
				abbreviated ? 'D' : ' ' + AddS('Day', TSDays(durationTS, true))
			}`
		}
	} else if (TSDays(durationTS, true)) {
		text += ` ${ToDigits(TSDays(durationTS, true), 0)}${
			abbreviated ? 'D' : ' ' + AddS('Day', TSDays(durationTS, true))
		}`
		if (TSHours(durationTS, true)) {
			text += ` ${ToDigits(TSHours(durationTS, true), 0)}${
				abbreviated ? 'h' : ' ' + AddS('Hour', TSHours(durationTS, true))
			}`
		}
		if (TSMinutes(durationTS, true) && !tripToSecondsOrTwo) {
			text += ` ${ToDigits(TSMinutes(durationTS, true), 0)}${
				abbreviated ? 'm' : ' ' + AddS('Minute', TSMinutes(durationTS, true))
			}`
		}
	} else if (TSHours(durationTS, true)) {
		text += ` ${ToDigits(TSHours(durationTS, true), 0)}${
			abbreviated ? 'h' : ' ' + AddS('Hour', TSHours(durationTS, true))
		}`
		if (TSMinutes(durationTS, true)) {
			text += ` ${ToDigits(TSMinutes(durationTS, true), 0)}${
				abbreviated ? 'm' : ' ' + AddS('Minute', TSMinutes(durationTS, true))
			}`
		}
	} else {
		if (TSMinutes(durationTS, true) || (!text && tripToSecondsOrTwo)) {
			text += ` ${ToDigits(TSMinutes(durationTS, true), 0)}${
				abbreviated ? 'm' : ' ' + AddS('Minute', TSMinutes(durationTS, true))
			}`
		}
		if (!text || (!tripToSecondsOrTwo && TSSeconds(durationTS, true))) {
			text += ` ${ToDigits(TSSeconds(durationTS, true), 0)}${
				abbreviated ? 's' : ' ' + AddS('Second', TSSeconds(durationTS, true))
			}`
		}
	}

	return text.trim()
}

const checkType = (
	evalCheck: 'IsSame' | 'IsBefore' | 'IsAfter' | 'IsSameOrBefore' | 'IsSameOrAfter',
	diff: number
): boolean => {
	if (diff === 0) return ['IsSame', 'IsSameOrBefore', 'IsSameOrAfter'].includes(evalCheck)

	if (diff > 0) return ['IsAfter', 'IsSameOrAfter'].includes(evalCheck)

	return ['IsBefore', 'IsSameOrBefore'].includes(evalCheck)
}

/**
 *
 * @param date1
 * @param evalType
 * @param date2
 * @param minInterval
 * @constructor
 */
export const DateCompare = (
	date1: TDateAny,
	evalType: 'IsSame' | 'IsBefore' | 'IsAfter' | 'IsSameOrBefore' | 'IsSameOrAfter',
	date2: TDateAny | TDateParseOptions,
	minInterval?: TDuration
): boolean => {
	const date2ToUse =
		!!date2 && typeof date2 === 'object' && !(date2 instanceof Date) ? DateParseTS('now', date2) : date2

	const msDifference =
		(DateParseTSInternal(date1, undefined, true) ?? 0) - (DateParseTSInternal(date2ToUse, undefined, true) ?? 0)

	if (msDifference === 0) {
		return checkType(evalType, msDifference)
	}

	if (!!minInterval) {
		const date1Object = DateObject(date1) ?? new Date()
		const date2Object = DateObject(date2ToUse) ?? new Date()

		const yearDiff = date1Object.getUTCFullYear() - date2Object.getUTCFullYear()

		if (['year', 'years'].includes(minInterval)) {
			return checkType(evalType, yearDiff)
		}

		const monthDiff = date1Object.getUTCMonth() - date2Object.getUTCMonth()

		if (['month', 'months'].includes(minInterval)) {
			if (yearDiff !== 0) return checkType(evalType, yearDiff)
			return checkType(evalType, monthDiff)
		}

		if (['week', 'weeks'].includes(minInterval)) {
			if (Math.abs(msDifference) > 7 * 24 * 60 * 60 * 1000) return checkType(evalType, msDifference)
			const weekDiff = (DateWeekNumber(date1)?.week ?? 0) - (DateWeekNumber(date2ToUse)?.week ?? 0)
			// Check if in the same week that spans years
			if (weekDiff === 0 && (DateWeekNumber(date1)?.week ?? 0) === 1 && Math.abs(yearDiff) > 1) {
				if (yearDiff !== 0) return checkType(evalType, yearDiff)
			}

			return checkType(evalType, weekDiff)
		}

		const dateOfMonthDiff = date1Object.getUTCDate() - date2Object.getUTCDate()

		if (['day', 'days'].includes(minInterval)) {
			if (yearDiff !== 0) return checkType(evalType, yearDiff)
			if (monthDiff !== 0) return checkType(evalType, monthDiff)
			return checkType(evalType, dateOfMonthDiff)
		}

		const hourDiff = date1Object.getUTCHours() - date2Object.getUTCHours()

		if (['hour', 'hours'].includes(minInterval)) {
			if (yearDiff !== 0) return checkType(evalType, yearDiff)
			if (monthDiff !== 0) return checkType(evalType, monthDiff)
			if (dateOfMonthDiff !== 0) return checkType(evalType, dateOfMonthDiff)
			return checkType(evalType, hourDiff)
		}

		const minuteDiff = date1Object.getUTCMinutes() - date2Object.getUTCMinutes()

		if (['minute', 'minutes'].includes(minInterval)) {
			if (yearDiff !== 0) return checkType(evalType, yearDiff)
			if (monthDiff !== 0) return checkType(evalType, monthDiff)
			if (dateOfMonthDiff !== 0) return checkType(evalType, dateOfMonthDiff)
			if (hourDiff !== 0) return checkType(evalType, hourDiff)
			return checkType(evalType, minuteDiff)
		}

		const secondDiff = date1Object.getUTCSeconds() - date2Object.getUTCSeconds()

		if (['second', 'second'].includes(minInterval)) {
			if (yearDiff !== 0) return checkType(evalType, yearDiff)
			if (monthDiff !== 0) return checkType(evalType, monthDiff)
			if (dateOfMonthDiff !== 0) return checkType(evalType, dateOfMonthDiff)
			if (hourDiff !== 0) return checkType(evalType, hourDiff)
			if (minuteDiff !== 0) return checkType(evalType, minuteDiff)
			return checkType(evalType, secondDiff)
		}
	}

	return checkType(evalType, msDifference)
}

/**
 * Checks if a data is between two other dates (inclusive)
 *
 * @param checkDate
 * @param startDate
 * @param endDate
 * @constructor
 */
export const DateIsBetween = (checkDate: TDateAny, startDate: TDateAny, endDate: TDateAny): boolean => {
	return (
		DateCompare(checkDate, 'IsSameOrAfter', startDate, 'day') &&
		DateCompare(checkDate, 'IsSameOrBefore', endDate, 'day')
	)
}

/**
 *
 * @param date1
 * @param date2
 * @param minInterval
 * @constructor
 */
export const SortCompareDateNull = (date1: TDateAny, date2: TDateAny, minInterval?: TDuration): number | null =>
	DateCompare(date1, 'IsBefore', date2, minInterval)
		? -1
		: DateCompare(date1, 'IsAfter', date2, minInterval)
		? 1
		: null

/**
 *
 * @param date1
 * @param date2
 * @param minInterval
 * @constructor
 */
export const SortCompareDate = (date1: TDateAny, date2: TDateAny, minInterval?: TDuration): number =>
	SortCompareDateNull(date1, date2, minInterval) ?? 0

/**
 *
 */
export enum EQuarter {
	Q1 = 1,
	Q2 = 2,
	Q3 = 3,
	Q4 = 4
}

/**
 *
 */
export interface IDates {
	start: string
	end: string
}

/**
 *
 * @param year
 * @param quarter
 * @constructor
 */
export const DatesQuarter = (year: number, quarter: EQuarter): IDates | null => {
	const baseDate = DateParseTSInternal(`${year}-${(quarter * 3 - 1).toString().padStart(2, '0')}-01`, 'UTC')

	if (!baseDate) return null

	return {
		start: (DateISO(baseDate, {quarter: 'StartOf'}) ?? '').substring(0, 10),
		end: (DateISO(baseDate, {quarter: 'EndOf'}) ?? '').substring(0, 10)
	}
}

/**
 *
 */
export interface IQuarter {
	year: number
	quarter: EQuarter
}

/**
 *
 * @constructor
 */
export const InitialDateQuarter = (): IQuarter => ({
	year: new Date().getFullYear(),
	quarter: Math.floor(new Date().getUTCMonth() / 3) + 1
})

/**
 *
 * @param date
 * @constructor
 */
export const DateQuarter = (date: TDateAny): IQuarter | null => {
	const dateObj = DateObject(date)

	if (!dateObj) return null

	return {
		year: dateObj.getUTCFullYear(),
		quarter: Math.floor(dateObj.getUTCMonth() / 3) + 1
	}
}

/**
 *
 * @param year
 * @param monthOneBased
 * @constructor
 */
export const DatesMonth = (year: number, monthOneBased: number): IDates | null => {
	const baseDate = DateParseTSInternal(`${year}-${monthOneBased.toString().padStart(2, '0')}-01`, 'UTC')

	if (!baseDate) return null

	return {
		start: (DateISO(baseDate, {month: 'StartOf'}) ?? '').substring(0, 10),
		end: (DateISO(baseDate, {month: 'EndOf'}) ?? '').substring(0, 10)
	}
}

/**
 *
 */
export interface IMonth {
	year: number
	monthOneBased: number
}

/**
 *
 * @constructor
 */
export const InitialDateMonth = (): IMonth => ({
	year: new Date().getFullYear(),
	monthOneBased: Math.floor(new Date().getUTCMonth()) + 1
})

/**
 *
 * @param date
 * @constructor
 */
export const DateMonth = (date: TDateAny): IMonth | null => {
	const dateObj = DateObject(date)

	if (!dateObj) return null

	return {
		year: dateObj.getUTCFullYear(),
		monthOneBased: Math.floor(dateObj.getUTCMonth()) + 1
	}
}

/**
 * 0 = Sunday
 *
 * @param date
 * @constructor
 */
export const DateDayOfWeek = (date: TDateAny): number | null => {
	const dateObj = DateObject(date)

	if (!dateObj) return null

	return dateObj.getUTCDay()
}

/**
 *
 * @param date
 * @param adjustments
 * @constructor
 */
export const DateOnlyNull = (
	date: TDateAny,
	adjustments?: TDateOnlyAdjustment & {
		formatLocale?: boolean
		timezoneDisplay?: string
		fromFormat?: string
	}
): string | null => {
	if (!date) return null
	try {
		const useDate =
			!date || typeof date === 'object' || typeof date === 'number' || ['now', 'today'].includes(date)
				? DateFormat('Date', date, adjustments?.timezoneDisplay ?? CurrentTimeZone()) ?? ''
				: (date ?? '').substring(0, 10)

		if (!date || !useDate) return null

		if (adjustments?.fromFormat) {
			if (useDate.length && useDate.length === adjustments.fromFormat.length) {
				const yearIndex = adjustments.fromFormat.indexOf('Y')
				const yearIndexEnd = adjustments.fromFormat.lastIndexOf('Y')
				const monthIndex = adjustments.fromFormat.indexOf('M')
				const monthIndexEnd = adjustments.fromFormat.lastIndexOf('M')
				const dayIndex = adjustments.fromFormat.indexOf('D')
				const dayIndexEnd = adjustments.fromFormat.lastIndexOf('D')

				const year = useDate.slice(yearIndex, yearIndexEnd + 1)
				const month = useDate.slice(monthIndex, monthIndexEnd + 1)
				const day = useDate.slice(dayIndex, dayIndexEnd + 1)

				if (CleanNumber(year) && CleanNumber(month) && CleanNumber(year)) {
					return DateOnlyNull(
						`${year.padStart(4, '20')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
						OmitProperty(adjustments, 'fromFormat')
					)
				}
			}
			return null
		}

		let dateObj = new Date(useDate)

		// @ts-ignore
		// noinspection SuspiciousTypeOfGuard
		if (dateObj instanceof Date && isFinite(dateObj)) {
			if (!!adjustments) {
				dateObj = DateObject(dateObj, adjustments) ?? dateObj
				if (Object.values(adjustments).includes('EndOf')) dateObj.setUTCHours(10)
			}

			return DateFormat(adjustments?.formatLocale ? 'Local' : 'Date', dateObj, 'UTC')
		} else {
			return null
		}
	} catch (err) {
		return null
	}
}

/**
 *
 * @param date
 * @param adjustments
 * @constructor
 */
export const DateOnly = (
	date: TDateAny,
	adjustments?: TDateOnlyAdjustment & {
		formatLocale?: boolean
		timezoneDisplay?: string
		fromFormat?: string
	}
): string =>
	DateOnlyNull(date, adjustments) ??
	DateFormat(adjustments?.formatLocale ? 'Local' : 'Date', new Date(), adjustments?.timezoneDisplay ?? 'UTC') ??
	new Date().toISOString().substring(0, 10)

/**
 * Convert a date and/or time value to a time
 * @param time
 * @param adjustments
 * @constructor
 */
export const TimeOnly = (
	time: TDateAny,
	adjustments?: TTimeOnlyAdjustment & {
		formatLocale?: boolean
		timezoneSource?: string
	}
): string | null => {
	if ((!time || (typeof time === 'string' && !StringHasTimeData(time))) && time !== 'now' && time !== 'today')
		return null

	try {
		let timeValue = DateFormatAny(
			!!adjustments?.formatLocale ? DATE_FORMAT_TIME_DISPLAY : 'HH:mm:ss',
			DateParseTS(time, adjustments),
			adjustments?.timezoneSource ?? undefined
		)
		if (!!timeValue) return timeValue

		let useTime = (time ?? '').toString().toLowerCase().trim()

		let changeHours = 0

		if (useTime.endsWith('am')) useTime = useTime.substring(0, useTime.length - 2).trim()
		if (useTime.endsWith('a')) useTime = useTime.substring(0, useTime.length - 1).trim()
		if (useTime.endsWith('pm')) {
			useTime = useTime.substring(0, useTime.length - 2).trim()
			changeHours += 12
		}
		if (useTime.endsWith('p')) {
			useTime = useTime.substring(0, useTime.length - 1).trim()
			changeHours += 12
		}

		if (useTime.substring(1, 2) === ':') useTime = `0${useTime}`

		useTime = DateOnly('now') + 'T' + useTime

		let tsValue = DateParseTS(useTime, adjustments)
		if (!!tsValue) {
			let newValue = DateFormatAny(
				!!adjustments?.formatLocale ? DATE_FORMAT_TIME_DISPLAY : 'HH:mm:ss',
				tsValue + changeHours * 60 * 60 * 1000,
				adjustments?.timezoneSource ?? 'UTC'
			)
			if (!!newValue) return newValue
		}
	} catch (err) {}

	return null
}

/**
 * Generates a series of times, starting with the first time (default '00:00') and ending BEFORE the end time (default: '24:00')
 *
 * @param minuteIntervals
 * @param startTimeInclusive
 * @param endTimeNotInclusive
 * @constructor
 */
export const TimeSeries = (
	minuteIntervals: number,
	startTimeInclusive: TDateAny = '00:00',
	endTimeNotInclusive: TDateAny = '24:00'
): string[] => {
	let currentTime = TimeOnly(startTimeInclusive)

	if (!currentTime) return []

	const results = [currentTime]

	const endTimeCompute = TimeOnly(endTimeNotInclusive, {minutes: minuteIntervals * -1})

	if (!endTimeCompute || minuteIntervals <= 0) return results

	while (currentTime < endTimeCompute) {
		currentTime = TimeOnly(currentTime, {minutes: minuteIntervals})
		if (!currentTime) break
		results.push(currentTime)
	}

	return results
}

/**
 * Adjusts a time or date/time to the floor of minutes specified in the increment
 *
 * @param time
 * @param minuteIncrement
 * @constructor
 */
export const TimeFloorMinute = (time: TDateAny, minuteIncrement: number = 1): string | null => {
	if (typeof time !== 'string' || StringHasDateData(time)) {
		const dateObj = DateObject(time)
		if (!dateObj) return null
		dateObj.setMilliseconds(0)
		dateObj.setSeconds(0)
		dateObj.setMinutes(dateObj.getMinutes() - (dateObj.getMinutes() % minuteIncrement))
		return DateISO(dateObj)
	} else {
		const cleanTime = TimeOnly(time)
		if (!cleanTime) return null
		return TimeOnly(TimeFloorMinute(DateObject(`${DateOnly('now')} ${cleanTime}`), minuteIncrement))
	}
}

/**
 *
 * @constructor
 */
export const ESTTodayDateTimeLabel = () => new Date().toLocaleString('en-US', {timeZone: 'America/New_York'})

/**
 *
 * @constructor
 */
export const ESTTodayDate = () => DateFormat('Date', 'now', 'America/New_York') ?? DateOnly('now')

/**
 *
 * @param date
 * @param startOf
 * @param compareDate
 * @constructor
 */
export const WeeksFromLabel = (date: string, startOf: 'StartOf' | 'StartOfMon', compareDate = 'now'): string => {
	if (!date) return ''

	const weeksFrom = DateDiff(DateOnly(compareDate, {week: startOf}), DateOnly(date, {week: startOf}), 'weeks') ?? 0

	switch (weeksFrom) {
		case 0:
			return 'This Week'
		case -1:
			return 'Last Week'
		case 1:
			return 'Next Week'
		default:
			return `${ToDigits(Math.abs(weeksFrom))} Weeks ${weeksFrom < 0 ? 'Ago' : 'from Now'}`
	}
}

/**
 *
 * @param date
 * @constructor
 */
export const DateDoWSundayZero = (date: TDateAny = 'now'): number | null =>
	CleanNumberNull(DateFormatAny('d', DateOnly(date)))

/**
 *
 * @param date
 * @constructor
 */
export const DateIsWeekend = (date: TDateAny = 'now'): boolean => {
	const dow = DateDoWSundayZero(date)

	if (dow === null) return false

	return dow === 0 || dow === 6
}

/**
 * Returns an array of dates between given start and end dates.
 * @param {TDateAny} start - The starting date.
 * @param {TDateAny} end - The ending date.
 * @param {TDateOnlyAdjustment} [adjustments={day: 1}] - Adjustments to make to each date in the array.
 * @param {number} [limit=1000] - The maximum number of dates to return.
 * @returns {string[]} An array of date strings sorted in the order based on the start and end dates.
 */
export const DatesBetween = (
	start: TDateAny,
	end: TDateAny,
	adjustments: TDateOnlyAdjustment = {day: 1},
	limit = 1000
): string[] => {
	if (!Object.values(adjustments).some((val) => CleanNumber(val) > 0)) return []

	const isReversed = DateCompare(start, 'IsAfter', end, 'day')

	let addDate = DateOnly(isReversed ? end : start)
	let dates: string[] = []

	while (DateCompare(addDate, 'IsSameOrBefore', isReversed ? start : end, 'day')) {
		dates.push(addDate)
		addDate = DateOnly(addDate, adjustments)
		if (dates.length >= limit) break
	}

	return dates.sort((a, b) => SortCompareDate(isReversed ? b : a, isReversed ? a : b))
}

/**
 *
 */
export type TTimeZoneOlsonStructure = {
	group: string
	zones: {
		value: string
		name: string
	}[]
}

/**
 *
 */
export const TimeZoneOlsonsAll: TTimeZoneOlsonStructure[] = [
	{
		group: 'US (Common)',
		zones: [
			{value: 'America/Puerto_Rico', name: 'Puerto Rico (Atlantic)'},
			{value: 'America/New_York', name: 'New York (Eastern)'},
			{value: 'America/Chicago', name: 'Chicago (Central)'},
			{value: 'America/Denver', name: 'Denver (Mountain)'},
			{value: 'America/Phoenix', name: 'Phoenix (MST)'},
			{value: 'America/Los_Angeles', name: 'Los Angeles (Pacific)'},
			{value: 'America/Anchorage', name: 'Anchorage (Alaska)'},
			{value: 'Pacific/Honolulu', name: 'Honolulu (Hawaii)'}
		]
	},
	{
		group: 'America',
		zones: [
			{value: 'America/Adak', name: 'Adak'},
			{value: 'America/Anchorage', name: 'Anchorage'},
			{value: 'America/Anguilla', name: 'Anguilla'},
			{value: 'America/Antigua', name: 'Antigua'},
			{value: 'America/Araguaina', name: 'Araguaina'},
			{value: 'America/Argentina/Buenos_Aires', name: 'Argentina - Buenos Aires'},
			{value: 'America/Argentina/Catamarca', name: 'Argentina - Catamarca'},
			{value: 'America/Argentina/ComodRivadavia', name: 'Argentina - ComodRivadavia'},
			{value: 'America/Argentina/Cordoba', name: 'Argentina - Cordoba'},
			{value: 'America/Argentina/Jujuy', name: 'Argentina - Jujuy'},
			{value: 'America/Argentina/La_Rioja', name: 'Argentina - La Rioja'},
			{value: 'America/Argentina/Mendoza', name: 'Argentina - Mendoza'},
			{value: 'America/Argentina/Rio_Gallegos', name: 'Argentina - Rio Gallegos'},
			{value: 'America/Argentina/Salta', name: 'Argentina - Salta'},
			{value: 'America/Argentina/San_Juan', name: 'Argentina - San Juan'},
			{value: 'America/Argentina/San_Luis', name: 'Argentina - San Luis'},
			{value: 'America/Argentina/Tucuman', name: 'Argentina - Tucuman'},
			{value: 'America/Argentina/Ushuaia', name: 'Argentina - Ushuaia'},
			{value: 'America/Aruba', name: 'Aruba'},
			{value: 'America/Asuncion', name: 'Asuncion'},
			{value: 'America/Atikokan', name: 'Atikokan'},
			{value: 'America/Atka', name: 'Atka'},
			{value: 'America/Bahia', name: 'Bahia'},
			{value: 'America/Barbados', name: 'Barbados'},
			{value: 'America/Belem', name: 'Belem'},
			{value: 'America/Belize', name: 'Belize'},
			{value: 'America/Blanc-Sablon', name: 'Blanc-Sablon'},
			{value: 'America/Boa_Vista', name: 'Boa Vista'},
			{value: 'America/Bogota', name: 'Bogota'},
			{value: 'America/Boise', name: 'Boise'},
			{value: 'America/Buenos_Aires', name: 'Buenos Aires'},
			{value: 'America/Cambridge_Bay', name: 'Cambridge Bay'},
			{value: 'America/Campo_Grande', name: 'Campo Grande'},
			{value: 'America/Cancun', name: 'Cancun'},
			{value: 'America/Caracas', name: 'Caracas'},
			{value: 'America/Catamarca', name: 'Catamarca'},
			{value: 'America/Cayenne', name: 'Cayenne'},
			{value: 'America/Cayman', name: 'Cayman'},
			{value: 'America/Chicago', name: 'Chicago'},
			{value: 'America/Chihuahua', name: 'Chihuahua'},
			{value: 'America/Coral_Harbour', name: 'Coral Harbour'},
			{value: 'America/Cordoba', name: 'Cordoba'},
			{value: 'America/Costa_Rica', name: 'Costa Rica'},
			{value: 'America/Cuiaba', name: 'Cuiaba'},
			{value: 'America/Curacao', name: 'Curacao'},
			{value: 'America/Danmarkshavn', name: 'Danmarkshavn'},
			{value: 'America/Dawson', name: 'Dawson'},
			{value: 'America/Dawson_Creek', name: 'Dawson Creek'},
			{value: 'America/Denver', name: 'Denver'},
			{value: 'America/Detroit', name: 'Detroit'},
			{value: 'America/Dominica', name: 'Dominica'},
			{value: 'America/Edmonton', name: 'Edmonton'},
			{value: 'America/Eirunepe', name: 'Eirunepe'},
			{value: 'America/El_Salvador', name: 'El Salvador'},
			{value: 'America/Ensenada', name: 'Ensenada'},
			{value: 'America/Fortaleza', name: 'Fortaleza'},
			{value: 'America/Fort_Wayne', name: 'Fort Wayne'},
			{value: 'America/Glace_Bay', name: 'Glace Bay'},
			{value: 'America/Godthab', name: 'Godthab'},
			{value: 'America/Goose_Bay', name: 'Goose Bay'},
			{value: 'America/Grand_Turk', name: 'Grand Turk'},
			{value: 'America/Grenada', name: 'Grenada'},
			{value: 'America/Guadeloupe', name: 'Guadeloupe'},
			{value: 'America/Guatemala', name: 'Guatemala'},
			{value: 'America/Guayaquil', name: 'Guayaquil'},
			{value: 'America/Guyana', name: 'Guyana'},
			{value: 'America/Halifax', name: 'Halifax'},
			{value: 'America/Havana', name: 'Havana'},
			{value: 'America/Hermosillo', name: 'Hermosillo'},
			{value: 'America/Indiana/Indianapolis', name: 'Indiana - Indianapolis'},
			{value: 'America/Indiana/Knox', name: 'Indiana - Knox'},
			{value: 'America/Indiana/Marengo', name: 'Indiana - Marengo'},
			{value: 'America/Indiana/Petersburg', name: 'Indiana - Petersburg'},
			{value: 'America/Indiana/Tell_City', name: 'Indiana - Tell City'},
			{value: 'America/Indiana/Vevay', name: 'Indiana - Vevay'},
			{value: 'America/Indiana/Vincennes', name: 'Indiana - Vincennes'},
			{value: 'America/Indiana/Winamac', name: 'Indiana - Winamac'},
			{value: 'America/Indianapolis', name: 'Indianapolis'},
			{value: 'America/Inuvik', name: 'Inuvik'},
			{value: 'America/Iqaluit', name: 'Iqaluit'},
			{value: 'America/Jamaica', name: 'Jamaica'},
			{value: 'America/Jujuy', name: 'Jujuy'},
			{value: 'America/Juneau', name: 'Juneau'},
			{value: 'America/Kentucky/Louisville', name: 'Kentucky - Louisville'},
			{value: 'America/Kentucky/Monticello', name: 'Kentucky - Monticello'},
			{value: 'America/Knox_IN', name: 'Knox IN'},
			{value: 'America/La_Paz', name: 'La Paz'},
			{value: 'America/Lima', name: 'Lima'},
			{value: 'America/Los_Angeles', name: 'Los Angeles'},
			{value: 'America/Louisville', name: 'Louisville'},
			{value: 'America/Maceio', name: 'Maceio'},
			{value: 'America/Managua', name: 'Managua'},
			{value: 'America/Manaus', name: 'Manaus'},
			{value: 'America/Marigot', name: 'Marigot'},
			{value: 'America/Martinique', name: 'Martinique'},
			{value: 'America/Matamoros', name: 'Matamoros'},
			{value: 'America/Mazatlan', name: 'Mazatlan'},
			{value: 'America/Mendoza', name: 'Mendoza'},
			{value: 'America/Menominee', name: 'Menominee'},
			{value: 'America/Merida', name: 'Merida'},
			{value: 'America/Mexico_City', name: 'Mexico City'},
			{value: 'America/Miquelon', name: 'Miquelon'},
			{value: 'America/Moncton', name: 'Moncton'},
			{value: 'America/Monterrey', name: 'Monterrey'},
			{value: 'America/Montevideo', name: 'Montevideo'},
			{value: 'America/Montreal', name: 'Montreal'},
			{value: 'America/Montserrat', name: 'Montserrat'},
			{value: 'America/Nassau', name: 'Nassau'},
			{value: 'America/New_York', name: 'New York'},
			{value: 'America/Nipigon', name: 'Nipigon'},
			{value: 'America/Nome', name: 'Nome'},
			{value: 'America/Noronha', name: 'Noronha'},
			{value: 'America/North_Dakota/Center', name: 'North Dakota - Center'},
			{value: 'America/North_Dakota/New_Salem', name: 'North Dakota - New Salem'},
			{value: 'America/Ojinaga', name: 'Ojinaga'},
			{value: 'America/Panama', name: 'Panama'},
			{value: 'America/Pangnirtung', name: 'Pangnirtung'},
			{value: 'America/Paramaribo', name: 'Paramaribo'},
			{value: 'America/Phoenix', name: 'Phoenix'},
			{value: 'America/Port-au-Prince', name: 'Port-au-Prince'},
			{value: 'America/Porto_Acre', name: 'Porto Acre'},
			{value: 'America/Port_of_Spain', name: 'Port of Spain'},
			{value: 'America/Porto_Velho', name: 'Porto Velho'},
			{value: 'America/Puerto_Rico', name: 'Puerto Rico'},
			{value: 'America/Rainy_River', name: 'Rainy River'},
			{value: 'America/Rankin_Inlet', name: 'Rankin Inlet'},
			{value: 'America/Recife', name: 'Recife'},
			{value: 'America/Regina', name: 'Regina'},
			{value: 'America/Resolute', name: 'Resolute'},
			{value: 'America/Rio_Branco', name: 'Rio Branco'},
			{value: 'America/Rosario', name: 'Rosario'},
			{value: 'America/Santa_Isabel', name: 'Santa Isabel'},
			{value: 'America/Santarem', name: 'Santarem'},
			{value: 'America/Santiago', name: 'Santiago'},
			{value: 'America/Santo_Domingo', name: 'Santo Domingo'},
			{value: 'America/Sao_Paulo', name: 'Sao Paulo'},
			{value: 'America/Scoresbysund', name: 'Scoresbysund'},
			{value: 'America/Shiprock', name: 'Shiprock'},
			{value: 'America/St_Barthelemy', name: 'St Barthelemy'},
			{value: 'America/St_Johns', name: 'St Johns'},
			{value: 'America/St_Kitts', name: 'St Kitts'},
			{value: 'America/St_Lucia', name: 'St Lucia'},
			{value: 'America/St_Thomas', name: 'St Thomas'},
			{value: 'America/St_Vincent', name: 'St Vincent'},
			{value: 'America/Swift_Current', name: 'Swift Current'},
			{value: 'America/Tegucigalpa', name: 'Tegucigalpa'},
			{value: 'America/Thule', name: 'Thule'},
			{value: 'America/Thunder_Bay', name: 'Thunder Bay'},
			{value: 'America/Tijuana', name: 'Tijuana'},
			{value: 'America/Toronto', name: 'Toronto'},
			{value: 'America/Tortola', name: 'Tortola'},
			{value: 'America/Vancouver', name: 'Vancouver'},
			{value: 'America/Virgin', name: 'Virgin'},
			{value: 'America/Whitehorse', name: 'Whitehorse'},
			{value: 'America/Winnipeg', name: 'Winnipeg'},
			{value: 'America/Yakutat', name: 'Yakutat'},
			{value: 'America/Yellowknife', name: 'Yellowknife'}
		]
	},
	{
		group: 'Europe',
		zones: [
			{value: 'Europe/Amsterdam', name: 'Amsterdam'},
			{value: 'Europe/Andorra', name: 'Andorra'},
			{value: 'Europe/Athens', name: 'Athens'},
			{value: 'Europe/Belfast', name: 'Belfast'},
			{value: 'Europe/Belgrade', name: 'Belgrade'},
			{value: 'Europe/Berlin', name: 'Berlin'},
			{value: 'Europe/Bratislava', name: 'Bratislava'},
			{value: 'Europe/Brussels', name: 'Brussels'},
			{value: 'Europe/Bucharest', name: 'Bucharest'},
			{value: 'Europe/Budapest', name: 'Budapest'},
			{value: 'Europe/Chisinau', name: 'Chisinau'},
			{value: 'Europe/Copenhagen', name: 'Copenhagen'},
			{value: 'Europe/Dublin', name: 'Dublin'},
			{value: 'Europe/Gibraltar', name: 'Gibraltar'},
			{value: 'Europe/Guernsey', name: 'Guernsey'},
			{value: 'Europe/Helsinki', name: 'Helsinki'},
			{value: 'Europe/Isle_of_Man', name: 'Isle of Man'},
			{value: 'Europe/Istanbul', name: 'Istanbul'},
			{value: 'Europe/Jersey', name: 'Jersey'},
			{value: 'Europe/Kaliningrad', name: 'Kaliningrad'},
			{value: 'Europe/Kiev', name: 'Kiev'},
			{value: 'Europe/Lisbon', name: 'Lisbon'},
			{value: 'Europe/Ljubljana', name: 'Ljubljana'},
			{value: 'Europe/London', name: 'London'},
			{value: 'Europe/Luxembourg', name: 'Luxembourg'},
			{value: 'Europe/Madrid', name: 'Madrid'},
			{value: 'Europe/Malta', name: 'Malta'},
			{value: 'Europe/Mariehamn', name: 'Mariehamn'},
			{value: 'Europe/Minsk', name: 'Minsk'},
			{value: 'Europe/Monaco', name: 'Monaco'},
			{value: 'Europe/Moscow', name: 'Moscow'},
			{value: 'Europe/Nicosia', name: 'Nicosia'},
			{value: 'Europe/Oslo', name: 'Oslo'},
			{value: 'Europe/Paris', name: 'Paris'},
			{value: 'Europe/Podgorica', name: 'Podgorica'},
			{value: 'Europe/Prague', name: 'Prague'},
			{value: 'Europe/Riga', name: 'Riga'},
			{value: 'Europe/Rome', name: 'Rome'},
			{value: 'Europe/Samara', name: 'Samara'},
			{value: 'Europe/San_Marino', name: 'San Marino'},
			{value: 'Europe/Sarajevo', name: 'Sarajevo'},
			{value: 'Europe/Simferopol', name: 'Simferopol'},
			{value: 'Europe/Skopje', name: 'Skopje'},
			{value: 'Europe/Sofia', name: 'Sofia'},
			{value: 'Europe/Stockholm', name: 'Stockholm'},
			{value: 'Europe/Tallinn', name: 'Tallinn'},
			{value: 'Europe/Tirane', name: 'Tirane'},
			{value: 'Europe/Tiraspol', name: 'Tiraspol'},
			{value: 'Europe/Uzhgorod', name: 'Uzhgorod'},
			{value: 'Europe/Vaduz', name: 'Vaduz'},
			{value: 'Europe/Vatican', name: 'Vatican'},
			{value: 'Europe/Vienna', name: 'Vienna'},
			{value: 'Europe/Vilnius', name: 'Vilnius'},
			{value: 'Europe/Volgograd', name: 'Volgograd'},
			{value: 'Europe/Warsaw', name: 'Warsaw'},
			{value: 'Europe/Zagreb', name: 'Zagreb'},
			{value: 'Europe/Zaporozhye', name: 'Zaporozhye'},
			{value: 'Europe/Zurich', name: 'Zurich'}
		]
	},
	{
		group: 'Asia',
		zones: [
			{value: 'Asia/Aden', name: 'Aden'},
			{value: 'Asia/Almaty', name: 'Almaty'},
			{value: 'Asia/Amman', name: 'Amman'},
			{value: 'Asia/Anadyr', name: 'Anadyr'},
			{value: 'Asia/Aqtau', name: 'Aqtau'},
			{value: 'Asia/Aqtobe', name: 'Aqtobe'},
			{value: 'Asia/Ashgabat', name: 'Ashgabat'},
			{value: 'Asia/Ashkhabad', name: 'Ashkhabad'},
			{value: 'Asia/Baghdad', name: 'Baghdad'},
			{value: 'Asia/Bahrain', name: 'Bahrain'},
			{value: 'Asia/Baku', name: 'Baku'},
			{value: 'Asia/Bangkok', name: 'Bangkok'},
			{value: 'Asia/Beirut', name: 'Beirut'},
			{value: 'Asia/Bishkek', name: 'Bishkek'},
			{value: 'Asia/Brunei', name: 'Brunei'},
			{value: 'Asia/Calcutta', name: 'Calcutta'},
			{value: 'Asia/Choibalsan', name: 'Choibalsan'},
			{value: 'Asia/Chongqing', name: 'Chongqing'},
			{value: 'Asia/Chungking', name: 'Chungking'},
			{value: 'Asia/Colombo', name: 'Colombo'},
			{value: 'Asia/Dacca', name: 'Dacca'},
			{value: 'Asia/Damascus', name: 'Damascus'},
			{value: 'Asia/Dhaka', name: 'Dhaka'},
			{value: 'Asia/Dili', name: 'Dili'},
			{value: 'Asia/Dubai', name: 'Dubai'},
			{value: 'Asia/Dushanbe', name: 'Dushanbe'},
			{value: 'Asia/Gaza', name: 'Gaza'},
			{value: 'Asia/Harbin', name: 'Harbin'},
			{value: 'Asia/Ho_Chi_Minh', name: 'Ho Chi Minh'},
			{value: 'Asia/Hong_Kong', name: 'Hong Kong'},
			{value: 'Asia/Hovd', name: 'Hovd'},
			{value: 'Asia/Irkutsk', name: 'Irkutsk'},
			{value: 'Asia/Istanbul', name: 'Istanbul'},
			{value: 'Asia/Jakarta', name: 'Jakarta'},
			{value: 'Asia/Jayapura', name: 'Jayapura'},
			{value: 'Asia/Jerusalem', name: 'Jerusalem'},
			{value: 'Asia/Kabul', name: 'Kabul'},
			{value: 'Asia/Kamchatka', name: 'Kamchatka'},
			{value: 'Asia/Karachi', name: 'Karachi'},
			{value: 'Asia/Kashgar', name: 'Kashgar'},
			{value: 'Asia/Kathmandu', name: 'Kathmandu'},
			{value: 'Asia/Katmandu', name: 'Katmandu'},
			{value: 'Asia/Kolkata', name: 'Kolkata'},
			{value: 'Asia/Krasnoyarsk', name: 'Krasnoyarsk'},
			{value: 'Asia/Kuala_Lumpur', name: 'Kuala Lumpur'},
			{value: 'Asia/Kuching', name: 'Kuching'},
			{value: 'Asia/Kuwait', name: 'Kuwait'},
			{value: 'Asia/Macao', name: 'Macao'},
			{value: 'Asia/Macau', name: 'Macau'},
			{value: 'Asia/Magadan', name: 'Magadan'},
			{value: 'Asia/Makassar', name: 'Makassar'},
			{value: 'Asia/Manila', name: 'Manila'},
			{value: 'Asia/Muscat', name: 'Muscat'},
			{value: 'Asia/Nicosia', name: 'Nicosia'},
			{value: 'Asia/Novokuznetsk', name: 'Novokuznetsk'},
			{value: 'Asia/Novosibirsk', name: 'Novosibirsk'},
			{value: 'Asia/Omsk', name: 'Omsk'},
			{value: 'Asia/Oral', name: 'Oral'},
			{value: 'Asia/Phnom_Penh', name: 'Phnom Penh'},
			{value: 'Asia/Pontianak', name: 'Pontianak'},
			{value: 'Asia/Pyongyang', name: 'Pyongyang'},
			{value: 'Asia/Qatar', name: 'Qatar'},
			{value: 'Asia/Qyzylorda', name: 'Qyzylorda'},
			{value: 'Asia/Rangoon', name: 'Rangoon'},
			{value: 'Asia/Riyadh', name: 'Riyadh'},
			{value: 'Asia/Saigon', name: 'Saigon'},
			{value: 'Asia/Sakhalin', name: 'Sakhalin'},
			{value: 'Asia/Samarkand', name: 'Samarkand'},
			{value: 'Asia/Seoul', name: 'Seoul'},
			{value: 'Asia/Shanghai', name: 'Shanghai'},
			{value: 'Asia/Singapore', name: 'Singapore'},
			{value: 'Asia/Taipei', name: 'Taipei'},
			{value: 'Asia/Tashkent', name: 'Tashkent'},
			{value: 'Asia/Tbilisi', name: 'Tbilisi'},
			{value: 'Asia/Tehran', name: 'Tehran'},
			{value: 'Asia/Tel_Aviv', name: 'Tel Aviv'},
			{value: 'Asia/Thimbu', name: 'Thimbu'},
			{value: 'Asia/Thimphu', name: 'Thimphu'},
			{value: 'Asia/Tokyo', name: 'Tokyo'},
			{value: 'Asia/Ujung_Pandang', name: 'Ujung Pandang'},
			{value: 'Asia/Ulaanbaatar', name: 'Ulaanbaatar'},
			{value: 'Asia/Ulan_Bator', name: 'Ulan Bator'},
			{value: 'Asia/Urumqi', name: 'Urumqi'},
			{value: 'Asia/Vientiane', name: 'Vientiane'},
			{value: 'Asia/Vladivostok', name: 'Vladivostok'},
			{value: 'Asia/Yakutsk', name: 'Yakutsk'},
			{value: 'Asia/Yekaterinburg', name: 'Yekaterinburg'},
			{value: 'Asia/Yerevan', name: 'Yerevan'}
		]
	},
	{
		group: 'Africa',
		zones: [
			{value: 'Africa/Abidjan', name: 'Abidjan'},
			{value: 'Africa/Accra', name: 'Accra'},
			{value: 'Africa/Addis_Ababa', name: 'Addis Ababa'},
			{value: 'Africa/Algiers', name: 'Algiers'},
			{value: 'Africa/Asmara', name: 'Asmara'},
			{value: 'Africa/Asmera', name: 'Asmera'},
			{value: 'Africa/Bamako', name: 'Bamako'},
			{value: 'Africa/Bangui', name: 'Bangui'},
			{value: 'Africa/Banjul', name: 'Banjul'},
			{value: 'Africa/Bissau', name: 'Bissau'},
			{value: 'Africa/Blantyre', name: 'Blantyre'},
			{value: 'Africa/Brazzaville', name: 'Brazzaville'},
			{value: 'Africa/Bujumbura', name: 'Bujumbura'},
			{value: 'Africa/Cairo', name: 'Cairo'},
			{value: 'Africa/Casablanca', name: 'Casablanca'},
			{value: 'Africa/Ceuta', name: 'Ceuta'},
			{value: 'Africa/Conakry', name: 'Conakry'},
			{value: 'Africa/Dakar', name: 'Dakar'},
			{value: 'Africa/Dar_es_Salaam', name: 'Dar es Salaam'},
			{value: 'Africa/Djibouti', name: 'Djibouti'},
			{value: 'Africa/Douala', name: 'Douala'},
			{value: 'Africa/El_Aaiun', name: 'El Aaiun'},
			{value: 'Africa/Freetown', name: 'Freetown'},
			{value: 'Africa/Gaborone', name: 'Gaborone'},
			{value: 'Africa/Harare', name: 'Harare'},
			{value: 'Africa/Johannesburg', name: 'Johannesburg'},
			{value: 'Africa/Kampala', name: 'Kampala'},
			{value: 'Africa/Khartoum', name: 'Khartoum'},
			{value: 'Africa/Kigali', name: 'Kigali'},
			{value: 'Africa/Kinshasa', name: 'Kinshasa'},
			{value: 'Africa/Lagos', name: 'Lagos'},
			{value: 'Africa/Libreville', name: 'Libreville'},
			{value: 'Africa/Lome', name: 'Lome'},
			{value: 'Africa/Luanda', name: 'Luanda'},
			{value: 'Africa/Lubumbashi', name: 'Lubumbashi'},
			{value: 'Africa/Lusaka', name: 'Lusaka'},
			{value: 'Africa/Malabo', name: 'Malabo'},
			{value: 'Africa/Maputo', name: 'Maputo'},
			{value: 'Africa/Maseru', name: 'Maseru'},
			{value: 'Africa/Mbabane', name: 'Mbabane'},
			{value: 'Africa/Mogadishu', name: 'Mogadishu'},
			{value: 'Africa/Monrovia', name: 'Monrovia'},
			{value: 'Africa/Nairobi', name: 'Nairobi'},
			{value: 'Africa/Ndjamena', name: 'Ndjamena'},
			{value: 'Africa/Niamey', name: 'Niamey'},
			{value: 'Africa/Nouakchott', name: 'Nouakchott'},
			{value: 'Africa/Ouagadougou', name: 'Ouagadougou'},
			{value: 'Africa/Porto-Novo', name: 'Porto-Novo'},
			{value: 'Africa/Sao_Tome', name: 'Sao Tome'},
			{value: 'Africa/Timbuktu', name: 'Timbuktu'},
			{value: 'Africa/Tripoli', name: 'Tripoli'},
			{value: 'Africa/Tunis', name: 'Tunis'},
			{value: 'Africa/Windhoek', name: 'Windhoek'}
		]
	},
	{
		group: 'Australia',
		zones: [
			{value: 'Australia/ACT', name: 'ACT'},
			{value: 'Australia/Adelaide', name: 'Adelaide'},
			{value: 'Australia/Brisbane', name: 'Brisbane'},
			{value: 'Australia/Broken_Hill', name: 'Broken Hill'},
			{value: 'Australia/Canberra', name: 'Canberra'},
			{value: 'Australia/Currie', name: 'Currie'},
			{value: 'Australia/Darwin', name: 'Darwin'},
			{value: 'Australia/Eucla', name: 'Eucla'},
			{value: 'Australia/Hobart', name: 'Hobart'},
			{value: 'Australia/LHI', name: 'LHI'},
			{value: 'Australia/Lindeman', name: 'Lindeman'},
			{value: 'Australia/Lord_Howe', name: 'Lord Howe'},
			{value: 'Australia/Melbourne', name: 'Melbourne'},
			{value: 'Australia/North', name: 'North'},
			{value: 'Australia/NSW', name: 'NSW'},
			{value: 'Australia/Perth', name: 'Perth'},
			{value: 'Australia/Queensland', name: 'Queensland'},
			{value: 'Australia/South', name: 'South'},
			{value: 'Australia/Sydney', name: 'Sydney'},
			{value: 'Australia/Tasmania', name: 'Tasmania'},
			{value: 'Australia/Victoria', name: 'Victoria'},
			{value: 'Australia/West', name: 'West'},
			{value: 'Australia/Yancowinna', name: 'Yancowinna'}
		]
	},
	{
		group: 'Indian',
		zones: [
			{value: 'Indian/Antananarivo', name: 'Antananarivo'},
			{value: 'Indian/Chagos', name: 'Chagos'},
			{value: 'Indian/Christmas', name: 'Christmas'},
			{value: 'Indian/Cocos', name: 'Cocos'},
			{value: 'Indian/Comoro', name: 'Comoro'},
			{value: 'Indian/Kerguelen', name: 'Kerguelen'},
			{value: 'Indian/Mahe', name: 'Mahe'},
			{value: 'Indian/Maldives', name: 'Maldives'},
			{value: 'Indian/Mauritius', name: 'Mauritius'},
			{value: 'Indian/Mayotte', name: 'Mayotte'},
			{value: 'Indian/Reunion', name: 'Reunion'}
		]
	},
	{
		group: 'Atlantic',
		zones: [
			{value: 'Atlantic/Azores', name: 'Azores'},
			{value: 'Atlantic/Bermuda', name: 'Bermuda'},
			{value: 'Atlantic/Canary', name: 'Canary'},
			{value: 'Atlantic/Cape_Verde', name: 'Cape Verde'},
			{value: 'Atlantic/Faeroe', name: 'Faeroe'},
			{value: 'Atlantic/Faroe', name: 'Faroe'},
			{value: 'Atlantic/Jan_Mayen', name: 'Jan Mayen'},
			{value: 'Atlantic/Madeira', name: 'Madeira'},
			{value: 'Atlantic/Reykjavik', name: 'Reykjavik'},
			{value: 'Atlantic/South_Georgia', name: 'South Georgia'},
			{value: 'Atlantic/Stanley', name: 'Stanley'},
			{value: 'Atlantic/St_Helena', name: 'St Helena'}
		]
	},
	{
		group: 'Pacific',
		zones: [
			{value: 'Pacific/Apia', name: 'Apia'},
			{value: 'Pacific/Auckland', name: 'Auckland'},
			{value: 'Pacific/Chatham', name: 'Chatham'},
			{value: 'Pacific/Easter', name: 'Easter'},
			{value: 'Pacific/Efate', name: 'Efate'},
			{value: 'Pacific/Enderbury', name: 'Enderbury'},
			{value: 'Pacific/Fakaofo', name: 'Fakaofo'},
			{value: 'Pacific/Fiji', name: 'Fiji'},
			{value: 'Pacific/Funafuti', name: 'Funafuti'},
			{value: 'Pacific/Galapagos', name: 'Galapagos'},
			{value: 'Pacific/Gambier', name: 'Gambier'},
			{value: 'Pacific/Guadalcanal', name: 'Guadalcanal'},
			{value: 'Pacific/Guam', name: 'Guam'},
			{value: 'Pacific/Honolulu', name: 'Honolulu'},
			{value: 'Pacific/Johnston', name: 'Johnston'},
			{value: 'Pacific/Kiritimati', name: 'Kiritimati'},
			{value: 'Pacific/Kosrae', name: 'Kosrae'},
			{value: 'Pacific/Kwajalein', name: 'Kwajalein'},
			{value: 'Pacific/Majuro', name: 'Majuro'},
			{value: 'Pacific/Marquesas', name: 'Marquesas'},
			{value: 'Pacific/Midway', name: 'Midway'},
			{value: 'Pacific/Nauru', name: 'Nauru'},
			{value: 'Pacific/Niue', name: 'Niue'},
			{value: 'Pacific/Norfolk', name: 'Norfolk'},
			{value: 'Pacific/Noumea', name: 'Noumea'},
			{value: 'Pacific/Pago_Pago', name: 'Pago Pago'},
			{value: 'Pacific/Palau', name: 'Palau'},
			{value: 'Pacific/Pitcairn', name: 'Pitcairn'},
			{value: 'Pacific/Ponape', name: 'Ponape'},
			{value: 'Pacific/Port_Moresby', name: 'Port Moresby'},
			{value: 'Pacific/Rarotonga', name: 'Rarotonga'},
			{value: 'Pacific/Saipan', name: 'Saipan'},
			{value: 'Pacific/Samoa', name: 'Samoa'},
			{value: 'Pacific/Tahiti', name: 'Tahiti'},
			{value: 'Pacific/Tarawa', name: 'Tarawa'},
			{value: 'Pacific/Tongatapu', name: 'Tongatapu'},
			{value: 'Pacific/Truk', name: 'Truk'},
			{value: 'Pacific/Wake', name: 'Wake'},
			{value: 'Pacific/Wallis', name: 'Wallis'},
			{value: 'Pacific/Yap', name: 'Yap'}
		]
	},
	{
		group: 'Antarctica',
		zones: [
			{value: 'Antarctica/Casey', name: 'Casey'},
			{value: 'Antarctica/Davis', name: 'Davis'},
			{value: 'Antarctica/DumontDUrville', name: 'DumontDUrville'},
			{value: 'Antarctica/Macquarie', name: 'Macquarie'},
			{value: 'Antarctica/Mawson', name: 'Mawson'},
			{value: 'Antarctica/McMurdo', name: 'McMurdo'},
			{value: 'Antarctica/Palmer', name: 'Palmer'},
			{value: 'Antarctica/Rothera', name: 'Rothera'},
			{value: 'Antarctica/South_Pole', name: 'South Pole'},
			{value: 'Antarctica/Syowa', name: 'Syowa'},
			{value: 'Antarctica/Vostok', name: 'Vostok'}
		]
	},
	{
		group: 'Arctic',
		zones: [{value: 'Arctic/Longyearbyen', name: 'Longyearbyen'}]
	},
	{
		group: 'UTC',
		zones: [{value: 'UTC', name: 'UTC'}]
	},
	{
		group: 'Manual Offsets',
		zones: [
			{value: 'UTC-12', name: 'UTC-12'},
			{value: 'UTC-11', name: 'UTC-11'},
			{value: 'UTC-10', name: 'UTC-10'},
			{value: 'UTC-9', name: 'UTC-9'},
			{value: 'UTC-8', name: 'UTC-8'},
			{value: 'UTC-7', name: 'UTC-7'},
			{value: 'UTC-6', name: 'UTC-6'},
			{value: 'UTC-5', name: 'UTC-5'},
			{value: 'UTC-4', name: 'UTC-4'},
			{value: 'UTC-3', name: 'UTC-3'},
			{value: 'UTC-2', name: 'UTC-2'},
			{value: 'UTC-1', name: 'UTC-1'},
			{value: 'UTC+0', name: 'UTC+0'},
			{value: 'UTC+1', name: 'UTC+1'},
			{value: 'UTC+2', name: 'UTC+2'},
			{value: 'UTC+3', name: 'UTC+3'},
			{value: 'UTC+4', name: 'UTC+4'},
			{value: 'UTC+5', name: 'UTC+5'},
			{value: 'UTC+6', name: 'UTC+6'},
			{value: 'UTC+7', name: 'UTC+7'},
			{value: 'UTC+8', name: 'UTC+8'},
			{value: 'UTC+9', name: 'UTC+9'},
			{value: 'UTC+10', name: 'UTC+10'},
			{value: 'UTC+11', name: 'UTC+11'},
			{value: 'UTC+12', name: 'UTC+12'},
			{value: 'UTC+13', name: 'UTC+13'},
			{value: 'UTC+14', name: 'UTC+14'}
		]
	}
]

/**
 *
 * @constructor
 */
export const TimeZoneOlsonsAmerica = (): string[] =>
	(TimeZoneOlsonsAll.find((TZOA) => TZOA.group === 'America')?.zones ?? []).map((zone) => zone.value)

/**
 *
 * @constructor
 */
export const TimeZoneOlsonsAmericaCommon = (): string[] =>
	(TimeZoneOlsonsAll.find((TZOA) => TZOA.group === 'US (Common)')?.zones ?? []).map((zone) => zone.value)

/**
 *
 * @param date
 * @param iana
 * @constructor
 */
export function IANAZoneAbbr(date: TDateAny, iana: string | null | undefined) {
	const today = DateObject(date, {timezoneSource: iana ?? undefined}) ?? new Date()
	const short = today.toLocaleDateString(undefined)
	const full = today.toLocaleDateString(undefined, {timeZoneName: 'short', timeZone: iana ?? undefined})

	// Trying to remove date from the string in a locale-agnostic way
	const shortIndex = full.indexOf(short)
	if (shortIndex >= 0) {
		const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length)

		// by this time `trimmed` should be the timezone's name with some punctuation -
		// trim it from both sides
		return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '')
	} else {
		// in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's name
		return full
	}
}
