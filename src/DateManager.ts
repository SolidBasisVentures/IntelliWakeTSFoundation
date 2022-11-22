import {CleanNumber, CleanNumberNull, ReplaceAll} from './Functions'
import {AddS, DigitsNth, ToDigits} from './StringManipulation'

export const DATE_FORMAT_DATE = 'YYYY-MM-DD'
export const DATE_FORMAT_TIME_SECONDS = 'HH:mm:ss'
export const DATE_FORMAT_TIME_NO_SECONDS = 'HH:mm'
export const DATE_FORMAT_DATE_TIME = DATE_FORMAT_DATE + ' ' + DATE_FORMAT_TIME_SECONDS

export const DATE_FORMAT_DATE_DISPLAY = `MMM D, YYYY`
export const DATE_FORMAT_DATE_DISPLAY_DOW = `dd, ${DATE_FORMAT_DATE_DISPLAY}`
export const DATE_FORMAT_TIME_DISPLAY = 'h:mm a'
export const DATE_FORMAT_DATE_TIME_DISPLAY = `${DATE_FORMAT_DATE_DISPLAY}, ${DATE_FORMAT_TIME_DISPLAY}`
export const DATE_FORMAT_DATE_TIME_DISPLAY_DOW = `${DATE_FORMAT_DATE_DISPLAY_DOW}, ${DATE_FORMAT_TIME_DISPLAY}`

export const DATE_FORMAT_DATE_DISPLAY_LONG = `MMMM D, YYYY`
export const DATE_FORMAT_DATE_DISPLAY_DOW_LONG = `dddd, ${DATE_FORMAT_DATE_DISPLAY_LONG}`
export const DATE_FORMAT_DATE_TIME_DISPLAY_LONG = `${DATE_FORMAT_DATE_DISPLAY_LONG}, ${DATE_FORMAT_TIME_DISPLAY}`
export const DATE_FORMAT_DATE_TIME_DISPLAY_DOW_LONG = `${DATE_FORMAT_DATE_DISPLAY_DOW_LONG}, ${DATE_FORMAT_TIME_DISPLAY}`

export type TDateOnlyDuration =
	'year'
	| 'years'
	| 'quarter'
	| 'quarters'
	| 'month'
	| 'months'
	| 'week'
	| 'weeks'
	| 'day'
	| 'days'

export type TTimeOnlyDuration =
	| 'hour'
	| 'hours'
	| 'minute'
	| 'minutes'
	| 'second'
	| 'seconds'
	| 'millisecond'
	| 'milliseconds'

export type TDuration = TDateOnlyDuration | TTimeOnlyDuration

export type TDateOnlyAdjustment = { [key in TDateOnlyDuration]?: number | 'StartOf' | 'EndOf' }
	| {week?: number | 'StartOf' | 'StartOfMon' | 'EndOf'}
	| {weeks?: number | 'StartOf' | 'StartOfMon' | 'EndOf'}

export type TTimeOnlyAdjustment = { [key in TTimeOnlyDuration]?: number | 'StartOf' | 'EndOf' }

export type TAdjustment =
	{ [key in TDuration]?: number | 'StartOf' | 'EndOf' }
	| {week?: number | 'StartOf' | 'StartOfMon' | 'EndOf'}
	| {weeks?: number | 'StartOf' | 'StartOfMon' | 'EndOf'}

/**
 * Current time in ISO string format
 */
export const NowISOString = (adjustment?: TAdjustment): string => !adjustment ? new Date().toISOString() : (DateISO('now', adjustment) ?? new Date().toISOString())
export const CurrentTimeZone = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone

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
	const amsterdamOffset = (other.day * 1440) + (other.hour * 60) + other.minute
	str = date.toLocaleString(['nl-NL'], {day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false})
	const myLocale = objFromStr(str)
	// console.log('Locale', str, myLocale)
	let myLocaleOffset = (myLocale.day * 1440) + (myLocale.hour * 60) + myLocale.minute
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

export const StringHasTimeData = (value: string): boolean => value.includes(':')
export const StringHasDateData = (value: string): boolean => value.includes('-') || /\d{8}/.test(value)
export const StringHasTimeZoneData = (value: string): boolean => value === 'now' || value === 'today' || value.includes('T') || value.substr(15).includes('Z') || value.includes('+') || value.substr(15).includes('-')

export const IsDateString = (value: any): boolean => {
	if (!value || typeof value !== 'string') return false

	if (!StringHasDateData(value))
		return false

	return !!DateParseTSInternal(value)
}

export type TDateAny = Date | number | 'now' | 'today' | string | null | undefined

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
	dateObj.setUTCMilliseconds((CleanNumber((d[12] ?? 0).toString().padEnd(3, '0').substr(0, 3))))
	// }

	let offsetHours = 0

	if (d[14]) {
		offsetHours = (CleanNumber(d[16])) + parseInt(d[17], 10)

		offsetHours *= ((d[15] === '-') ? 1 : -1)
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

	const time = dateObj.valueOf() + (offsetHours * 3600000)

	let newDateObj = new Date(time)

	if (!newDateObj) return null

	return newDateObj.valueOf()
}

const DateParseTSInternal = (date: TDateAny, timezoneSource?: string, ignoreIANA?: boolean): number | null => {
	if (!date) return null // new Date().valueOf() // Date.parse(new Date().toString())

	if (typeof date === 'number') return date

	if (typeof date === 'object') return date.valueOf()

	if (date.toString().toLowerCase() === 'now' || date.toString().toLowerCase() === 'today') return new Date().valueOf()

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
			// console.log('Here', date, (IANAOffset(timezoneSource) ?? 0), (IANAOffset() ?? 0))
			// console.log('Processing', date, timezoneSource, DateISO(result), DateISO(result + (((IANAOffset(timezoneSource) ?? 0) - (IANAOffset() ?? 0)) * 60 * 1000)))
			// console.log(date, date.length)
			// if (date.length > 10) {
			result += ((IANAOffset(timezoneSource, date) ?? 0) * 60000)
			// }
			// result += (((IANAOffset(timezoneSource) ?? 0) - (IANAOffset() ?? 0)) * 60 * 1000)
		}

		return result
	} catch {
		return null
	}
}

export type TDateParseOptions = TAdjustment & {timezoneSource?: string, ignoreIANA?: boolean}

export const DateParseTS = (date: TDateAny, adjustments?: TDateParseOptions): number | null => {
	let newDate = DateParseTSInternal(date, adjustments?.timezoneSource, adjustments?.ignoreIANA)

	if (!newDate || !adjustments) return newDate

	return DateAdjustTS(newDate, adjustments)
}

export const DateISO = (date: TDateAny, adjustments?: TDateParseOptions): string | null => {
	const parsed = DateParseTS(date, adjustments)

	if (!parsed) return null

	return new Date(parsed).toISOString()
}
export const DateObject = (date: TDateAny, adjustments?: TDateParseOptions): Date | null => {
	const parsed = DateParseTS(date, adjustments)

	if (!parsed) return null

	return new Date(parsed)
}

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

export type TDateFormat =
	'Local'
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

export const DateFormatAny = (format: TDateFormat | string, date: TDateAny, timezoneDisplay?: string, timezoneSource?: string): string | null => {
	const noTZInfo = typeof date === 'string' && !StringHasTimeZoneData(date)

	let dateObject = DateObject(DateParseTSInternal(date, noTZInfo ? timezoneSource : undefined))

	// console.log('DFA', date, dateObject)

	// const objectUTC = false //(typeof date === 'object' && timezoneDisplay === 'UTC')

	if (timezoneDisplay) {
		try {
			if (!dateObject || dateObject.valueOf() === 0) return null

			const sourceDate = (!!date && date !== 'now' && date !== 'today') ? dateObject : undefined

			const sourceOffset = IANAOffset(timezoneSource, sourceDate) ?? 0 // Chic 5
			const displayOffset = IANAOffset(timezoneDisplay, sourceDate) ?? 0 // Chic 6
			const offset = noTZInfo ?
				!timezoneSource ?
					(displayOffset - sourceOffset) - (displayOffset - sourceOffset) :
					((IANAOffset(undefined, sourceDate) ?? 0) - sourceOffset) - (displayOffset - sourceOffset) :
				(sourceOffset - displayOffset)

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
				return dateApply.getFullYear().toString().substr(2).padStart(2, '0')
			case 'Q':
				return (Math.ceil((dateApply.getMonth() + 1) / 3)).toString()
			case 'Qo':
				return DigitsNth((Math.ceil((dateApply.getMonth() + 1) / 3))) ?? ''
			case 'MMMM':
				return MonthNames[dateApply.getMonth()] ?? ''
			case 'MMM':
				return (MonthNames[dateApply.getMonth()] ?? '').substr(0, 3)
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
				return (WeekDays[dateApply.getDay()] ?? '').substr(0, 2)
			case 'ddd':
				return (WeekDays[dateApply.getDay()] ?? '').substr(0, 3)
			case 'dddd':
				return (WeekDays[dateApply.getDay()] ?? '')
			case 'HH':
				return dateApply.getHours().toString().padStart(2, '0')
			case 'H':
				return dateApply.getHours().toString()
			case 'hh':
				return (dateApply.getHours() > 12 ? dateApply.getHours() - 12 : dateApply.getHours()).toString().padStart(2, '0')
			case 'h': {
				const hour = (dateApply.getHours() > 12 ? dateApply.getHours() - 12 : dateApply.getHours())
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
			if (formatChar === previousChar || previousChar === '' || (command.length > 0 &&
				patterns.some(pattern => pattern.startsWith(command) && formatChar === pattern.substr(command.length, 1)))) {
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

export const DateFormat = (format: TDateFormat, date: TDateAny, timezoneDisplay?: string, timezoneSource?: string): string | null =>
	DateFormatAny(format, date, timezoneDisplay, timezoneSource)

export const YYYYMMDDHHmmss = (date: TDateAny): string => {
	const dateObject = DateObject(date) ?? new Date()
	return `${dateObject.getFullYear()}${(dateObject.getMonth() + 1).toString().padStart(2, '0')}${dateObject.getDate().toString().padStart(2, '0')}${dateObject.getHours().toString().padStart(2, '0')}${dateObject.getMinutes().toString().padStart(2, '0')}${dateObject.getSeconds().toString().padStart(2, '0')}`
}
export const YYYY_MM_DD_HH_mm_ss = (date: TDateAny): string => {
	const dateObject = DateObject(date) ?? new Date()
	return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}_${dateObject.getHours().toString().padStart(2, '0')}-${dateObject.getMinutes().toString().padStart(2, '0')}-${dateObject.getSeconds().toString().padStart(2, '0')}`
}
export const YYYYsMMsDDsHHcmmcss = (date: TDateAny): string => {
	const dateObject = DateObject(date) ?? new Date()
	return `${dateObject.getFullYear()}/${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')} ${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}`
}
export const YYYYsMMsDD = (date: TDateAny): string => {
	const dateObject = DateObject(date) ?? new Date()
	return `${dateObject.getFullYear()}/${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')}`
}
export const HHcmmcss = (date: TDateAny): string => {
	const dateObject = DateObject(date) ?? new Date()
	return `${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}`
}

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

export const WeekDays = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
]

export const TSYearsEstimate = (ts: number): number => Math.floor(ts / 365 / 24 / 60 / 60 / 1000)
export const TSMonthsEstimate = (ts: number, withinYear?: boolean): number => Math.floor((ts - (withinYear ? (TSYearsEstimate(ts) * 365 * 24 * 60 * 60 * 1000) : 0)) / 30 / 24 / 60 / 60 / 1000)
export const TSWeeks = (ts: number): number => Math.floor(ts / 7 / 24 / 60 / 60 / 1000)
export const TSDays = (ts: number, withinMonth?: boolean): number => Math.floor((ts - (withinMonth ? (TSMonthsEstimate(ts) * 30 * 24 * 60 * 60 * 1000) : 0)) / 24 / 60 / 60 / 1000)
export const TSHours = (ts: number, withinDay?: boolean): number => Math.floor((ts - (withinDay ? (TSDays(ts) * 24 * 60 * 60 * 1000) : 0)) / 60 / 60 / 1000)
export const TSMinutes = (ts: number, withinHour?: boolean): number => Math.floor((ts - (withinHour ? (TSHours(ts) * 60 * 60 * 1000) : 0)) / 60 / 1000)
export const TSSeconds = (ts: number, withinMinute?: boolean): number => Math.floor((ts - (withinMinute ? (TSMinutes(ts) * 60 * 1000) : 0)) / 1000)

const DateIsLeapYear = (year: number): boolean => (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))

const DateDaysInMonth = (year: number, month: number): number => {
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

	return [31, (DateIsLeapYear(yearCalc) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][monthCalc]
}

const DateAdjustMonthTS = (date: TDateAny, months: number): number | null => {
	let dateTS = DateParseTSInternal(date)

	if (!dateTS) return null

	const isNegative = months < 0

	const originalDateObject = DateObject(date) ?? new Date()
	const originalDate = originalDateObject.getUTCDate()
	const isLastDayOfMonth = originalDate === DateDaysInMonth(originalDateObject.getUTCFullYear(), originalDateObject.getUTCMonth())

	for (let i = 0; i < Math.abs(months); i++) {
		const dateObj = DateObject(dateTS) ?? new Date()
		const year = dateObj.getUTCFullYear()
		const month = dateObj.getUTCMonth()

		if (isLastDayOfMonth) {
			if (isNegative) {
				dateTS -= 24 * 60 * 60 * 1000 * DateDaysInMonth(year, month)
			} else {
				dateTS += 24 * 60 * 60 * 1000 * DateDaysInMonth(year, month + 1)
			}
		} else {
			if (isNegative) {
				dateTS -= 24 * 60 * 60 * 1000 * DateDaysInMonth(year, month - 1)
			} else {
				dateTS += 24 * 60 * 60 * 1000 * DateDaysInMonth(year, month)
			}

			let currentDate = DateObject(dateTS) ?? new Date()
			if (currentDate.getUTCDate() < 15 && currentDate.getUTCDate() < originalDate)
				dateTS -= 24 * 60 * 60 * 1000 * currentDate.getUTCDate()

			currentDate = DateObject(dateTS) ?? new Date()
			const currentDaysInMonth = DateDaysInMonth(currentDate.getUTCFullYear(), currentDate.getUTCMonth())
			if (currentDate.getUTCDate() > 15 && currentDate.getUTCDate() < originalDate && currentDate.getUTCDate() < currentDaysInMonth)
				dateTS += 24 * 60 * 60 * 1000 * ((currentDaysInMonth > originalDate ? originalDate : currentDaysInMonth) - currentDate.getUTCDate())
		}
	}

	return dateTS
}

export const DateAdjustTS = (date: TDateAny, adjustments: TAdjustment): number | null => {
	let dateTS = DateParseTSInternal(date)

	for (const key of Object.keys(adjustments)) {
		if (!dateTS) return null

		switch (key) {
			case 'year':
			case 'years':
				switch (adjustments[key]) {
					case 'StartOf': {
						const dateObj = DateObject(dateTS) ?? new Date()
						dateTS = DateAdjustTS(dateTS, {
							month: dateObj.getUTCMonth() * -1,
							months: 'StartOf'
						}) ?? 0
					}
						break
					case 'EndOf': {
						const dateObj = DateObject(dateTS) ?? new Date()
						dateTS = DateAdjustTS(dateTS, {
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
					case 'StartOf': {
						const dateObj = DateObject(dateTS) ?? new Date()
						dateTS = DateAdjustTS(dateTS, {
							day: (dateObj.getUTCDate() - 1) * -1,
							days: 'StartOf'
						}) ?? 0
					}
						break
					case 'EndOf': {
						const dateObj = DateObject(dateTS) ?? new Date()
						dateTS = DateAdjustTS(dateTS, {
							day: DateDaysInMonth(dateObj.getUTCFullYear(), dateObj.getUTCMonth()) - (dateObj.getUTCDate()),
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
					case 'StartOf': {
						const dateObj = DateObject(dateTS) ?? new Date()
						dateTS = DateAdjustTS(dateTS, {
							month: (dateObj.getUTCMonth() % 3) * -1,
							months: 'StartOf'
						}) ?? 0
					}
						break
					case 'EndOf': {
						const dateObj = DateObject(dateTS) ?? new Date()
						dateTS = DateAdjustTS(dateTS, {
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
							case 'StartOf': {
								const dateObj = DateObject(dateTS) ?? new Date()
								dateTS = DateAdjustTS(dateTS, {
									day: dateObj.getUTCDay() * -1,
									days: 'StartOf'
								}) ?? 0
							}
								break
							case 'StartOfMon': {
								const dateObj = DateObject(dateTS) ?? new Date()
								switch (dateObj.getUTCDay()) {
									case 0:
										//Sunday
										dateTS = DateAdjustTS(dateTS, {
											day: -6,
											days: 'StartOf'
										}) ?? 0
										break
									case 1:
										// Monday
										dateTS = DateAdjustTS(dateTS, {
											days: 'StartOf'
										}) ?? 0
										break
									default:
										// All other days
										dateTS = DateAdjustTS(dateTS, {
											day: (dateObj.getUTCDay() - 1) * -1,
											days: 'StartOf'
										}) ?? 0
										break
								}
							}
								break
							case 'EndOf': {
								const dateObj = DateObject(dateTS) ?? new Date()
								dateTS = DateAdjustTS(dateTS, {
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
							case 'StartOf': {
								const dateObj = DateObject(dateTS) ?? new Date()
								dateTS = DateAdjustTS(dateTS, {
									hour: dateObj.getUTCHours() * -1,
									hours: 'StartOf'
								}) ?? 0
							}
								break
							case 'EndOf': {
								const dateObj = DateObject(dateTS) ?? new Date()
								dateTS = DateAdjustTS(dateTS, {
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
							case 'StartOf': {
								const dateObj = DateObject(dateTS) ?? new Date()
								dateTS = DateAdjustTS(dateTS, {
									minute: dateObj.getUTCMinutes() * -1,
									minutes: 'StartOf'
								}) ?? 0
							}
								break
							case 'EndOf': {
								const dateObj = DateObject(dateTS) ?? new Date()
								dateTS = DateAdjustTS(dateTS, {
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
							case 'StartOf': {
								const dateObj = DateObject(dateTS) ?? new Date()
								dateTS = DateAdjustTS(dateTS, {
									second: dateObj.getUTCSeconds() * -1,
									seconds: 'StartOf'
								}) ?? 0
							}
								break
							case 'EndOf': {
								const dateObj = DateObject(dateTS) ?? new Date()
								dateTS = DateAdjustTS(dateTS, {
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
							case 'StartOf': {
								const dateObj = DateObject(dateTS) ?? new Date()
								dateTS = DateAdjustTS(dateTS, {
									millisecond: dateObj.getUTCMilliseconds() * -1
								}) ?? 0
							}
								break
							case 'EndOf': {
								const dateObj = DateObject(dateTS) ?? new Date()
								dateTS = DateAdjustTS(dateTS, {
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

export interface IWeekNumber {
	year: number
	week: number
}

export const DateComponent = (component: 'YYYY' | 'MM' | 'DD' | 'HH' | 'mm' | 'ss', date?: TDateAny, adjustments?: TAdjustment): number =>
	CleanNumber(DateFormatAny(component, DateParseTS(date, adjustments)))

export const DateWeekNumber = (date?: TDateAny, adjustments?: TAdjustment): IWeekNumber | null => {
	const currentDate = DateObject(date ?? 'now', {timezoneSource: 'UTC', ...adjustments})
	if (!currentDate) return null

	const year = CleanNumber(DateFormatAny('YYYY', date))

	const startDate = new Date(year, 0, 1)

	const days = Math.floor((currentDate.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000)) + 7

	const week = Math.ceil(days / 7)

	return {year: year, week: week}
}

export const DateFromWeekNumber = (weekNumber: IWeekNumber, startOf: 'StartOf' | 'StartOfMon' = 'StartOf'): string => {
	const days = (weekNumber.week - 1) * 7

	return DateOnly(new Date(weekNumber.year, 0, days), {week: startOf})
}

export const DateDiffComponents = (dateFrom: TDateAny, dateTo: TDateAny): {
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

export const DateDiffLongDescription = (dateFrom: TDateAny, dateTo: TDateAny, tripToSecondsOrTwo = false, abbreviated = false): string => {
	const components = DateDiffComponents(dateFrom, dateTo)

	let text = ''

	if (components.year) {
		text += ` ${ToDigits(components.year)}${abbreviated ? 'Y' : (' ' + AddS('Year', components.year))}`
		text += ` ${ToDigits(components.month)}${abbreviated ? 'Mo' : (' ' + AddS('Month', components.month))}`
		if (components.day && !tripToSecondsOrTwo) {
			text += ` ${ToDigits(components.day)}${abbreviated ? 'D' : (' ' + AddS('Day', components.day))}`
		}
	} else if (components.month) {
		text += ` ${ToDigits(components.month)}${abbreviated ? 'Mo' : (' ' + AddS('Month', components.month))}`

		if (components.day) {
			text += ` ${ToDigits(components.day)}${abbreviated ? 'D' : (' ' + AddS('Day', components.day))}`
		}
	} else if (components.day) {
		text += ` ${ToDigits(components.day)}${abbreviated ? 'D' : (' ' + AddS('Day', components.day))}`
		if (components.hour) {
			text += ` ${ToDigits(components.hour)}${abbreviated ? 'h' : (' ' + AddS('Hour', components.hour))}`
		}
		if (components.minute && !tripToSecondsOrTwo) {
			text += ` ${ToDigits(components.minute)}${abbreviated ? 'm' : (' ' + AddS('Minute', components.minute))}`
		}
	} else if (components.hour) {
		text += ` ${ToDigits(components.hour)}${abbreviated ? 'h' : (' ' + AddS('Hour', components.hour))}`
		if (components.minute) {
			text += ` ${ToDigits(components.minute)}${abbreviated ? 'm' : (' ' + AddS('Minute', components.minute))}`
		}
	} else {
		if (components.minute || (!text && tripToSecondsOrTwo)) {
			text += ` ${ToDigits(components.minute)}${abbreviated ? 'm' : (' ' + AddS('Minute', components.minute))}`
		}
		if (!text || (!tripToSecondsOrTwo && components.second)) {
			text += ` ${ToDigits(components.second)}${abbreviated ? 's' : (' ' + AddS('Second', components.second))}`
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
		text += ` ${ToDigits(TSYearsEstimate(durationTS), 0)}${abbreviated ? 'Y' : ' ' + AddS('Year', TSYearsEstimate(durationTS))}`
		text += ` ${ToDigits(TSMonthsEstimate(durationTS, true), 0)}${abbreviated ? 'Mo' : ' ' + AddS('Month', TSMonthsEstimate(durationTS, true))}`
		if (TSDays(durationTS, true) && !tripToSecondsOrTwo) {
			text += ` ${ToDigits(TSDays(durationTS, true), 0)}${abbreviated ? 'D' : ' ' + AddS('Day', TSDays(durationTS, true))}`
		}
	} else if (TSMonthsEstimate(durationTS, true)) {
		text += ` ${ToDigits(TSMonthsEstimate(durationTS, true), 0)}${abbreviated ? 'Mo' : ' ' + AddS('Month', TSMonthsEstimate(durationTS, true))}`

		if (TSDays(durationTS, true)) {
			text += ` ${ToDigits(TSDays(durationTS, true), 0)}${abbreviated ? 'D' : ' ' + AddS('Day', TSDays(durationTS, true))}`
		}
	} else if (TSDays(durationTS, true)) {
		text += ` ${ToDigits(TSDays(durationTS, true), 0)}${abbreviated ? 'D' : ' ' + AddS('Day', TSDays(durationTS, true))}`
		if (TSHours(durationTS, true)) {
			text += ` ${ToDigits(TSHours(durationTS, true), 0)}${abbreviated ? 'h' : ' ' + AddS('Hour', TSHours(durationTS, true))}`
		}
		if (TSMinutes(durationTS, true) && !tripToSecondsOrTwo) {
			text += ` ${ToDigits(TSMinutes(durationTS, true), 0)}${abbreviated ? 'm' : ' ' + AddS('Minute', TSMinutes(durationTS, true))}`
		}
	} else if (TSHours(durationTS, true)) {
		text += ` ${ToDigits(TSHours(durationTS, true), 0)}${abbreviated ? 'h' : ' ' + AddS('Hour', TSHours(durationTS, true))}`
		if (TSMinutes(durationTS, true)) {
			text += ` ${ToDigits(TSMinutes(durationTS, true), 0)}${abbreviated ? 'm' : ' ' + AddS('Minute', TSMinutes(durationTS, true))}`
		}
	} else {
		if (TSMinutes(durationTS, true) || (!text && tripToSecondsOrTwo)) {
			text += ` ${ToDigits(TSMinutes(durationTS, true), 0)}${abbreviated ? 'm' : ' ' + AddS('Minute', TSMinutes(durationTS, true))}`
		}
		if (!text || (!tripToSecondsOrTwo && TSSeconds(durationTS, true))) {
			text += ` ${ToDigits(TSSeconds(durationTS, true), 0)}${abbreviated ? 's' : ' ' + AddS('Second', TSSeconds(durationTS, true))}`
		}
	}

	return text.trim()
}

const checkType = (evalCheck: 'IsSame' | 'IsBefore' | 'IsAfter' | 'IsSameOrBefore' | 'IsSameOrAfter', diff: number): boolean => {
	if (diff === 0) return ['IsSame', 'IsSameOrBefore', 'IsSameOrAfter'].includes(evalCheck)

	if (diff > 0) return ['IsAfter', 'IsSameOrAfter'].includes(evalCheck)

	return ['IsBefore', 'IsSameOrBefore'].includes(evalCheck)
}

export const DateCompare = (date1: TDateAny, evalType: 'IsSame' | 'IsBefore' | 'IsAfter' | 'IsSameOrBefore' | 'IsSameOrAfter', date2: TDateAny | TDateParseOptions, minInterval?: TDuration): boolean => {
	const date2ToUse = (!!date2 && typeof date2 === 'object' && !(date2 instanceof Date))
		? DateParseTS('now', date2)
		: date2

	const msDifference = (DateParseTSInternal(date1, undefined, true) ?? 0) - (DateParseTSInternal(date2ToUse, undefined, true) ?? 0)

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

export const SortCompareDateNull = (date1: TDateAny, date2: TDateAny, minInterval?: TDuration): number | null =>
	DateCompare(date1, 'IsBefore', date2, minInterval) ? -1
		: DateCompare(date1, 'IsAfter', date2, minInterval) ? 1
			: null

export const SortCompareDate = (date1: TDateAny, date2: TDateAny, minInterval?: TDuration): number =>
	SortCompareDateNull(date1, date2, minInterval) ?? 0


export enum EQuarter {
	Q1 = 1,
	Q2 = 2,
	Q3 = 3,
	Q4 = 4
}

export interface IDates {
	start: string
	end: string
}

export const DatesQuarter = (year: number, quarter: EQuarter): IDates | null => {
	const baseDate = DateParseTSInternal(`${year}-${((quarter * 3) - 1).toString().padStart(2, '0')}-01`, 'UTC')

	if (!baseDate) return null

	return {
		start: (DateISO(baseDate, {quarter: 'StartOf'}) ?? '').substr(0, 10),
		end: (DateISO(baseDate, {quarter: 'EndOf'}) ?? '').substr(0, 10)
	}
}

export interface IQuarter {
	year: number
	quarter: EQuarter
}

export const InitialDateQuarter = (): IQuarter => ({
	year: new Date().getFullYear(),
	quarter: Math.floor(new Date().getUTCMonth() / 3) + 1
})

export const DateQuarter = (date: TDateAny): IQuarter | null => {
	const dateObj = DateObject(date)

	if (!dateObj) return null

	return {
		year: dateObj.getUTCFullYear(),
		quarter: Math.floor(dateObj.getUTCMonth() / 3) + 1
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

export const DateOnlyNull = (date: TDateAny, adjustments?: TDateOnlyAdjustment & {formatLocale?: boolean, timezoneDisplay?: string}): string | null => {
	if (!date) return null
	try {
		const useDate = !date || (typeof date === 'object' || typeof date === 'number' || ['now', 'today'].includes(date)) ? DateFormat('Date', date, CurrentTimeZone()) ?? '' : (date ?? '').substring(0, 10)

		if (!date) return null

		let dateObj = new Date(useDate)

		if (!!adjustments) {
			dateObj = DateObject(dateObj, adjustments) ?? dateObj
			if (Object.values(adjustments).includes('EndOf')) dateObj.setUTCHours(10)
		}

		return DateFormat(adjustments?.formatLocale ? 'Local' : 'Date', dateObj, adjustments?.timezoneDisplay ?? 'UTC')
	} catch (err) {
		return null
	}
}

export const DateOnly = (date: TDateAny, adjustments?: TDateOnlyAdjustment & {formatLocale?: boolean, timezoneDisplay?: string}): string => DateOnlyNull(date, adjustments) ?? new Date().toISOString().substring(0, 10)

/**
 * Convert a date and/or time value to a time
 * @param time
 * @param adjustments
 * @constructor
 */
export const TimeOnly = (time: TDateAny, adjustments?: TTimeOnlyAdjustment & {formatLocale?: boolean}): string | null => {
	if ((!time || (typeof time === 'string' && !StringHasTimeData(time))) && time !== 'now' && time !== 'today') return null

	try {
		let timeValue = DateFormatAny(!!adjustments?.formatLocale ? DATE_FORMAT_TIME_DISPLAY : 'HH:mm:ss', DateParseTS(time, adjustments))
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
			let newValue = DateFormatAny(!!adjustments?.formatLocale ? DATE_FORMAT_TIME_DISPLAY : 'HH:mm:ss', tsValue + (changeHours * 60 * 60 * 1000), 'UTC')
			if (!!newValue) return newValue
		}
	} catch (err) {
	}

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
export const TimeSeries = (minuteIntervals: number, startTimeInclusive: TDateAny = '00:00', endTimeNotInclusive: TDateAny = '24:00'): string[] => {
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

export const ESTTodayDateTimeLabel = () => new Date().toLocaleString('en-US', {timeZone: 'America/New_York'})
export const ESTTodayDate = () => DateFormat('Date', 'now', 'America/New_York') ?? DateOnly('now')

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

export const DateDoWSundayZero = (date: TDateAny = 'now'): number | null => CleanNumberNull(DateFormatAny('d', DateOnly(date)))

export const DateIsWeekend = (date: TDateAny = 'now'): boolean => {
	const dow = DateDoWSundayZero(date)

	if (dow === null) return false

	return dow === 0 || dow === 6
}

export const DatesBetween = (start: TDateAny, end: TDateAny, adjustments: TDateOnlyAdjustment = {day: 1}, limit = 1000): string[] => {
	if (!Object.values(adjustments).some(val => CleanNumber(val) > 0)) return []

	let addDate = DateOnly(start)
	let dates: string[] = []

	while (DateCompare(addDate, 'IsSameOrBefore', end, 'day')) {
		dates.push(addDate)
		addDate = DateOnly(addDate, adjustments)
		if (dates.length >= limit) break
	}

	return dates
}
