import {ReplaceAll} from './Functions'
import {DigitsNth} from './StringManipulation'

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

export const nowDateTime = () => new Date().toISOString()

export const DateParseTS = (date?: any): number | null => {
	if (!date) return Date.parse(new Date().toString())
	
	if (typeof date === 'object') return date.valueOf() ?? null
	
	try {
		const result: any = Date.parse(date.toString())
		
		if (isNaN(result)) {
			const check = new Date(date)
			
			if (!check || !isFinite(check as any)) {
				return null
			}
			
			return check.valueOf()
		}
		
		return result
	} catch {
		return null
	}
}
export const DateISO = (date?: any): string | null => {
	const parsed = DateParseTS(date)
	
	if (!parsed) return null
	
	return new Date(parsed).toISOString()
}

export const DateObject = (date?: any): Date | null => {
	const parsed = DateParseTS(date)
	
	if (!parsed) return null
	
	return new Date(parsed)
}

export const DateTSAdd = (date: any, value: number, increment: string): number | null => {
	let dateTS = DateParseTS(date)
	
	if (!dateTS) return null
	
	switch (increment) {
		case 'days':
		case 'day':
			dateTS += (value * (24 * 60 * 60 * 1000))
			break
	}
	
	return dateTS
}

export const DateISOAdd = (date: any, value: number, increment: string): string | null => DateISO(DateTSAdd(date, value, increment))
export const DateObjectAdd = (date: any, value: number, increment: string): Date | null => DateObject(DateTSAdd(date, value, increment))

export const DateICS = (date?: string | null): string | null => {
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

export const DateFormat = (date: number | string | null, format: string): string | null => {
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

export const YYYYMMDDHHmmss = (ts?: number): string => {
	const dateObject = !ts ? new Date() : new Date(ts)
	return `${dateObject.getFullYear()}${(dateObject.getMonth() + 1).toString().padStart(2, '0')}${dateObject.getDate().toString().padStart(2, '0')}${dateObject.getHours().toString().padStart(2, '0')}${dateObject.getMinutes().toString().padStart(2, '0')}${dateObject.getSeconds().toString().padStart(2, '0')}`
}
export const YYYY_MM_DD_HH_mm_ss = (ts?: number): string => {
	const dateObject = !ts ? new Date() : new Date(ts)
	return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}_${dateObject.getHours().toString().padStart(2, '0')}-${dateObject.getMinutes().toString().padStart(2, '0')}-${dateObject.getSeconds().toString().padStart(2, '0')}`
}
export const YYYYsMMsDDsHHcmmcss = (ts?: number): string => {
	const dateObject = !ts ? new Date() : new Date(ts)
	return `${dateObject.getFullYear()}/${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')} ${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}`
}
export const YYYYsMMsDD = (ts?: number): string => {
	const dateObject = !ts ? new Date() : new Date(ts)
	return `${dateObject.getFullYear()}/${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')}`
}
export const HHcmmcss = (ts?: number): string => {
	const dateObject = !ts ? new Date() : new Date(ts)
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
