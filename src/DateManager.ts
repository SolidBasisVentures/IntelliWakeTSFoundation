import {AddS, ReplaceAll} from './Functions'
import {DigitsNth, ToDigits} from './StringManipulation'

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

/**
 * Current time in ISO string format
 */
export const NowISOString = (): string => new Date().toISOString()

export const StringHasTimeData = (value: string): boolean => value.includes(':')
export const StringHasDateData = (value: string): boolean => value.includes('-') || /\d{8}/.test(value)
export const StringHasTimeZoneData = (value: string): boolean => value.includes('T') || value.includes('+') || value.substr(15).includes('-')

export const IsDateString = (value: any): boolean => {
	if (!value || typeof value !== 'string') return false
	
	if (!StringHasDateData(value))
		return false
	
	return !!DateParseTS(value)
}

export type TDateAny = number | string | null

export const DateParseTS = (date?: TDateAny): number | null => {
	if (!date) return Date.parse(new Date().toString())
	
	try {
		const result: any = Date.parse(date.toString())
		
		if (isNaN(result)) {
			const check = new Date(date)
			
			if (!check) {
				return null
			}
			
			return Date.parse(check.toString())
		}
		
		return result
	} catch {
		return null
	}
}
export const DateISO = (date?: TDateAny): string | null => {
	const parsed = DateParseTS(date)
	
	if (!parsed) return null
	
	return new Date(parsed).toISOString()
}
export const DateObject = (date?: TDateAny): Date | null => {
	const parsed = DateParseTS(date)
	
	if (!parsed) return null
	
	return new Date(parsed)
}

export const DateICS = (date?: TDateAny): string | null => {
	const dateISO = DateISO(date)
	
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

export const DateFormat = (date: TDateAny, format: string): string | null => {
	const dateObject = DateObject(date)
	
	if (!dateObject || dateObject.valueOf() === 0) return null
	
	const applyCommand = (command: string): string => {
		switch (command) {
			case 'YYYY':
				return dateObject.getFullYear().toString()
			case 'YY':
				return dateObject.getFullYear().toString().substr(2)
			case 'Q':
				return (Math.ceil((dateObject.getMonth() + 1) / 3)).toString()
			case 'Qo':
				return DigitsNth((Math.ceil((dateObject.getMonth() + 1) / 3))) ?? ''
			case 'MMMM':
				return MonthNames[dateObject.getMonth() + 1] ?? ''
			case 'MMM':
				return (MonthNames[dateObject.getMonth() + 1] ?? '').substr(0, 3)
			case 'MM':
				return (dateObject.getMonth() + 1).toString().padStart(2, '0')
			case 'Mo':
				return DigitsNth(dateObject.getMonth() + 1) ?? ''
			case 'M':
				return (dateObject.getMonth() + 1).toString()
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
				return dateObject.getDate().toString().padStart(2, '0')
			case 'Do':
				return DigitsNth(dateObject.getDate()) ?? ''
			case 'D':
				return dateObject.getDate().toString()
			case 'd':
				return dateObject.getDay().toString()
			case 'do':
				return DigitsNth(dateObject.getDay()) ?? ''
			case 'dd':
				return (WeekDays[dateObject.getDay()] ?? '').substr(0, 2)
			case 'ddd':
				return (WeekDays[dateObject.getDay()] ?? '').substr(0, 3)
			case 'dddd':
				return (WeekDays[dateObject.getDay()] ?? '')
			case 'HH':
				return dateObject.getHours().toString().padStart(2, '0')
			case 'H':
				return dateObject.getHours().toString()
			case 'hh':
				return (dateObject.getHours() > 12 ? dateObject.getHours() - 12 : dateObject.getHours()).toString().padStart(2, '0')
			case 'h':
				return (dateObject.getHours() > 12 ? dateObject.getHours() - 12 : dateObject.getHours()).toString()
			case 'mm':
				return dateObject.getMinutes().toString().padStart(2, '0')
			case 'm':
				return dateObject.getMinutes().toString()
			case 'ss':
				return dateObject.getSeconds().toString().padStart(2, '0')
			case 's':
				return dateObject.getSeconds().toString()
			case 'A':
				return dateObject.getHours() > 12 ? 'PM' : 'AM'
			case 'a':
				return dateObject.getHours() > 12 ? 'pm' : 'am'
			default:
				return command
		}
	}
	
	const formatArray = format.split('')
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
			result += applyCommand(command)
			
			command = ''
			
			previousChar = ''
			
			inEscape = true
		} else {
			if (formatChar === previousChar || previousChar === '' || (command.length > 0 &&
				patterns.some(pattern => pattern.startsWith(command) && formatChar === pattern.substr(command.length, 1)))) {
				command += formatChar
			} else {
				result += applyCommand(command)
				
				command = formatChar
			}
			
			previousChar = formatChar
		}
	}
	
	result += applyCommand(command)
	
	return result
}

export const YYYYMMDDHHmmss = (date?: TDateAny): string => {
	const dateObject = DateObject(date) ?? new Date()
	return `${dateObject.getFullYear()}${(dateObject.getMonth() + 1).toString().padStart(2, '0')}${dateObject.getDate().toString().padStart(2, '0')}${dateObject.getHours().toString().padStart(2, '0')}${dateObject.getMinutes().toString().padStart(2, '0')}${dateObject.getSeconds().toString().padStart(2, '0')}`
}
export const YYYY_MM_DD_HH_mm_ss = (date?: TDateAny): string => {
	const dateObject = DateObject(date) ?? new Date()
	return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}_${dateObject.getHours().toString().padStart(2, '0')}-${dateObject.getMinutes().toString().padStart(2, '0')}-${dateObject.getSeconds().toString().padStart(2, '0')}`
}
export const YYYYsMMsDDsHHcmmcss = (date?: TDateAny): string => {
	const dateObject = DateObject(date) ?? new Date()
	return `${dateObject.getFullYear()}/${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')} ${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}`
}
export const YYYYsMMsDD = (date?: TDateAny): string => {
	const dateObject = DateObject(date) ?? new Date()
	return `${dateObject.getFullYear()}/${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')}`
}
export const HHcmmcss = (date?: TDateAny): string => {
	const dateObject = DateObject(date) ?? new Date()
	return `${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}`
}

export const MonthNames = {
	1: 'January',
	2: 'February',
	3: 'March',
	4: 'April',
	5: 'May',
	6: 'June',
	7: 'July',
	8: 'August',
	9: 'September',
	10: 'October',
	11: 'November',
	12: 'December'
}

export const WeekDays = {
	0: 'Sunday',
	1: 'Monday',
	2: 'Tuesday',
	3: 'Wednesday',
	4: 'Thursday',
	5: 'Friday',
	6: 'Saturday'
}

export const TSYearsEstimate = (ts: number): number => Math.floor(ts / 365 / 24 / 60 / 60 / 1000)
export const TSMonthsEstimate = (ts: number, withinYear?: boolean): number => Math.floor((ts - (withinYear ? (TSYearsEstimate(ts) * 365 * 24 * 60 * 60 * 1000) : 0)) / 30 / 24 / 60 / 60 / 1000)
export const TSWeeks = (ts: number): number => Math.floor(ts / 7 / 24 / 60 / 60 / 1000)
export const TSDays = (ts: number, withinMonth?: boolean): number => Math.floor((ts - (withinMonth ? (TSMonthsEstimate(ts) * 30 * 24 * 60 * 60 * 1000) : 0)) / 24 / 60 / 60 / 1000)
export const TSHours = (ts: number, withinDay?: boolean): number => Math.floor((ts - (withinDay ? (TSDays(ts) * 24 * 60 * 60 * 1000) : 0)) / 60 / 60 / 1000)
export const TSMinutes = (ts: number, withinHour?: boolean): number => Math.floor((ts - (withinHour ? (TSHours(ts) * 60 * 60 * 1000) : 0)) / 60 / 1000)
export const TSSeconds = (ts: number, withinMinute?: boolean): number => Math.floor((ts - (withinMinute ? (TSMinutes(ts) * 60 * 1000) : 0)) / 1000)

export type TDuration = 'year' | 'years' | 'month' | 'months' | 'week' | 'weeks' | 'day' | 'days' | 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds' | 'millisecond' | 'milliseconds'

export const DateDiff = (dateFrom: TDateAny, dateTo: TDateAny, duration: TDuration): number | null => {
	const date1 = DateParseTS(dateFrom)
	const date2 = DateParseTS(dateTo)
	
	if (!date1 || !date2) return null
	
	const diff = date2 - date1
	
	switch(duration) {
		case 'year':
		case 'years':
			return TSYearsEstimate(diff)
		case 'month':
		case 'months':
			return TSMonthsEstimate(diff)
		case 'week':
		case 'weeks':
			return TSWeeks(diff)
		case 'day':
		case 'days':
			return TSDays(diff)
		case 'hour':
		case 'hours':
			return TSHours(diff)
		case 'minute':
		case 'minutes':
			return TSMinutes(diff)
		case 'second':
		case 'seconds':
			return TSSeconds(diff)
		case 'millisecond':
		case 'milliseconds':
			return diff
	}
	
	return null
}

/**
 * Displays a simplified duration format from seconds.
 *
 * @example
 * MomentDurationShortText((30 * 60) + 20) // result: 30 Minutes 20 Seconds
 */
export const DurationLongDescription = (seconds: number, trimSeconds = false): string => {
	const durationTS = seconds * 1000
	
	let text = ''
	
	if (TSYearsEstimate(durationTS)) {
		text += ` ${ToDigits(TSYearsEstimate(durationTS), 0)} ${AddS('Year', TSYearsEstimate(durationTS))}`
		text += ` ${ToDigits(TSMonthsEstimate(durationTS, true), 0)} ${AddS('Month', TSMonthsEstimate(durationTS, true))}`
		if (TSDays(durationTS, true)) {
			text += ` ${ToDigits(TSDays(durationTS, true), 0)} ${AddS('Day', TSDays(durationTS, true))}`
		}
	} else if (TSMonthsEstimate(durationTS, true)) {
		text += ` ${ToDigits(TSMonthsEstimate(durationTS, true), 0)} ${AddS('Month', TSMonthsEstimate(durationTS, true))}`
		
		if (TSDays(durationTS, true)) {
			text += ` ${ToDigits(TSDays(durationTS, true), 0)} ${AddS('Day', TSDays(durationTS, true))}`
		}
	} else if (TSDays(durationTS, true)) {
		text += ` ${ToDigits(TSDays(durationTS, true), 0)} ${AddS('Day', TSDays(durationTS, true))}`
		if (TSHours(durationTS, true)) {
			text += ` ${ToDigits(TSHours(durationTS, true), 0)} ${AddS('Hour', TSHours(durationTS, true))}`
		}
		if (TSMinutes(durationTS, true)) {
			text += ` ${ToDigits(TSMinutes(durationTS, true), 0)} ${AddS('Minute', TSMinutes(durationTS, true))}`
		}
	} else if (TSHours(durationTS, true)) {
		text += ` ${ToDigits(TSHours(durationTS, true), 0)} ${AddS('Hour', TSHours(durationTS, true))}`
		if (TSMinutes(durationTS, true)) {
			text += ` ${ToDigits(TSMinutes(durationTS, true), 0)} ${AddS('Minute', TSMinutes(durationTS, true))}`
		}
	} else {
		if (TSMinutes(durationTS, true) || (!text && trimSeconds)) {
			text += ` ${ToDigits(TSMinutes(durationTS, true), 0)} ${AddS('Minute', TSMinutes(durationTS, true))}`
		}
		if (!text || (!trimSeconds && TSSeconds(durationTS, true))) {
			text += ` ${ToDigits(TSSeconds(durationTS, true), 0)} ${AddS('Second', TSSeconds(durationTS, true))}`
		}
	}
	
	return text.trim()
}
