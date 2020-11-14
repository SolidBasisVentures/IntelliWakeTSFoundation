import {ISO_8601, Moment} from 'moment-timezone'
import {utc} from 'moment'
import {ToDigits} from './StringManipulation'

const moment = require('moment-timezone')

export const MOMENT_FORMAT_DATE = 'YYYY-MM-DD'
export const MOMENT_FORMAT_TIME_SECONDS = 'HH:mm:ss'
export const MOMENT_FORMAT_TIME_NO_SECONDS = 'HH:mm'
export const MOMENT_FORMAT_DATE_TIME = MOMENT_FORMAT_DATE + ' ' + MOMENT_FORMAT_TIME_SECONDS

export const MOMENT_FORMAT_DATE_DISPLAY_NO_YEAR = 'ddd, MMM D'
export const MOMENT_FORMAT_DATE_DISPLAY = `${MOMENT_FORMAT_DATE_DISPLAY_NO_YEAR}, YYYY`
export const MOMENT_FORMAT_TIME_DISPLAY = 'h:mm a'
export const MOMENT_FORMAT_DATE_TIME_DISPLAY_NO_YEAR = `${MOMENT_FORMAT_DATE_DISPLAY_NO_YEAR}, ${MOMENT_FORMAT_TIME_DISPLAY}`
export const MOMENT_FORMAT_DATE_TIME_DISPLAY = `${MOMENT_FORMAT_DATE_DISPLAY}, ${MOMENT_FORMAT_TIME_DISPLAY}`

const DATE_FORMAT_TRIES: moment.MomentFormatSpecification = ['YYYY-MM-DD', 'M-D-YYYY', 'MM-DD-YYYY', ISO_8601]
const TIME_FORMAT_TRIES: moment.MomentFormatSpecification = [
	ISO_8601,
	'YYYY-MM-DD HH:mm:ss',
	'YYYY-MM-DD HH:mm',
	'HH:mm:ss',
	'HH:mm',
	'D-M-YYYY HH:mm:ss',
	'D-M-YYYY HH:mm',
	'DD-MM-YYYY HH:mm:ss',
	'DD-MM-YYYY HH:mm'
]

export enum EDateAndOrTime {
	DATE,
	TIME,
	DATETIME
}

const StringHasTimeData = (value: string): boolean => value.includes(':')
const StringHasDateData = (value: string): boolean => value.includes('-')
const StringHasTimeZoneData = (value: string): boolean => value.includes('T')

const FormatIsTime = (format: string) =>
	[MOMENT_FORMAT_TIME_SECONDS, MOMENT_FORMAT_TIME_NO_SECONDS, MOMENT_FORMAT_TIME_DISPLAY].includes(format)
const FormatIsDate = (format: string) =>
	[MOMENT_FORMAT_DATE, MOMENT_FORMAT_DATE_DISPLAY_NO_YEAR, MOMENT_FORMAT_DATE_DISPLAY].includes(format)
const FormatIsDateTime = (format: string) =>
	[MOMENT_FORMAT_DATE_TIME, MOMENT_FORMAT_DATE_TIME_DISPLAY_NO_YEAR, MOMENT_FORMAT_DATE_TIME_DISPLAY].includes(format)

/**
 * Returns the current time zone.
 */
export const MomentCurrentTimeZone = (): string => moment.tz().format('z')

/**
 * Current time in ISO string format
 */
export const NowISOString = (): string => new Date().toISOString()

/**
 * Returns the Moment object from a given value. If the given value is invalid,
 * it returns null.
 *
 *
 * @example
 * // returns Moment<2020-10-02T00:00:00Z>
 * MomentFromString('2020-10-02')
 */
export const MomentFromString = (value: string | Moment | Date | null | undefined): Moment | null => {
	if (!value) {
		return null
	}
	
	const formatTries: moment.MomentFormatSpecification = [...DATE_FORMAT_TRIES, ...TIME_FORMAT_TRIES]
	
	if (typeof value !== 'string') {
		const momentObject = moment(value)
		if (momentObject.isValid()) {
			return momentObject.utc().tz(MomentCurrentTimeZone())
		}
	} else {
		const momentObject = StringHasTimeZoneData(value) ? moment(value, formatTries, true) : utc(value, formatTries, true)
		if (momentObject.isValid()) {
			return momentObject
		}
	}
	
	return null
}

/**
 * Does the same thing as MomentFromString() but instead returns a string based on the format specified.
 *
 * @example
 * // returns "Oct 2, 2020"
 * MomentFromString('2020-10-02', 'll')
 */
export const MomentFormatString = (value: string | Moment | Date | null | undefined, format: string): string | null => {
	if (!value) return null
	
	if (typeof value == 'string') {
		if (FormatIsTime(format) && !StringHasTimeData(value)) {
			return null
		}
		
		if ((FormatIsDateTime(format) || FormatIsDate(format)) && !StringHasDateData(value)) return null
		
		let moment = MomentFromString(value)?.format(format) ?? null
		
		if (!moment) return null
		
		if (format === MOMENT_FORMAT_TIME_SECONDS || format === MOMENT_FORMAT_TIME_NO_SECONDS) {
			if (!StringHasTimeData(moment)) return null
			
			return moment.substr(format.length * -1, format.length)
		}
		
		if (format === MOMENT_FORMAT_DATE) {
			if (!StringHasDateData(moment)) return null
			
			return moment.substr(0, format.length)
		}
		
		if (format === MOMENT_FORMAT_DATE_TIME) {
			if (!StringHasDateData(moment) || !StringHasTimeData(moment)) return null
		}
		
		return moment
	}
	
	return MomentFromString(value)?.format(format) ?? null
}

/**
 * Returns the moment time string in the format of "HH:mm:ss".
 */
export const MomentTimeString = (value: string | Moment | Date | null | undefined): string | null =>
	MomentFormatString(value, MOMENT_FORMAT_TIME_SECONDS)

/**
 * Returns the moment date string in the format of "YYYY-MM-DD".
 */
export const MomentDateString = (value: string | Moment | Date | null | undefined): string | null =>
	MomentFormatString(value, MOMENT_FORMAT_DATE)

/**
 * Returns the moment date string in the format of "YYYY-MM-DD HH:mm:ss".
 */
export const MomentDateTimeString = (value: string | Moment | Date | null | undefined): string | null =>
	MomentFormatString(value, MOMENT_FORMAT_DATE_TIME)

/**
 * Returns display day date time format. Includes the year if the current year
 * is not the same with the given year.
 */
export const MomentDisplayDayDateTime = (
	value: string | Moment | Date | null | undefined,
	showYear = false
): string | null => {
	const momentObject = MomentFromString(value)
	
	if (!momentObject) {
		return null
	}
	
	return momentObject.format(
		momentObject.year() === moment().year() && !showYear
			? `${MOMENT_FORMAT_DATE_DISPLAY_NO_YEAR}, ${MOMENT_FORMAT_TIME_DISPLAY}`
			: `${MOMENT_FORMAT_DATE_DISPLAY}, ${MOMENT_FORMAT_TIME_DISPLAY}`
	)
}

/**
 * Returns display day date format. Includes the year if the current year
 * is not the same with the given year.
 */
export const MomentDisplayDayDate = (
	value: string | Moment | Date | null | undefined,
	showYear = false
): string | null => {
	const momentObject = MomentFromString(value)
	
	if (!momentObject) {
		return null
	}
	
	return momentObject.format(
		momentObject.year() === moment().year() && !showYear
			? MOMENT_FORMAT_DATE_DISPLAY_NO_YEAR
			: MOMENT_FORMAT_DATE_DISPLAY
	)
}

/**
 * Returns the time with 12-hour clock format.
 */
export const MomentDisplayTime = (value: string | Moment | Date | null | undefined): string | null =>
	MomentFormatString(value, MOMENT_FORMAT_TIME_DISPLAY)

/**
 * Displays difference between two times in a simplified duration format.
 *
 * If the second parameter is empty, the current date/time is used.
 *
 * @example
 * MomentDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30m 20s
 * MomentDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30m 20s
 */
export const MomentDurationShortText = (start: string | Moment | Date, end?: string | Moment | Date): string => {
	const duration = moment.duration((MomentFromString(end) ?? moment()).diff(MomentFromString(start) ?? moment()))
	
	let text = ''
	
	if (duration.years()) {
		text += ` ${ToDigits(duration.years(), 0)}Y`
		text += ` ${ToDigits(duration.months(), 0)}M`
		text += ` ${ToDigits(duration.days(), 0)}D`
	} else if (duration.months()) {
		text += ` ${ToDigits(duration.months(), 0)}M`
		
		if (duration.days()) {
			text += ` ${ToDigits(duration.days(), 0)}D`
		}
	} else if (duration.days()) {
		text += ` ${ToDigits(duration.days(), 0)}D`
		text += ` ${ToDigits(duration.hours(), 0)}h`
		if (duration.minutes()) {
			text += ` ${ToDigits(duration.minutes(), 0)}m`
		}
	} else if (duration.hours()) {
		text += ` ${ToDigits(duration.hours(), 0)}h`
		if (duration.minutes()) {
			text += ` ${ToDigits(duration.minutes(), 0)}m`
		}
	} else {
		if (duration.minutes()) {
			text += ` ${ToDigits(duration.minutes(), 0)}m`
		}
		if (duration.seconds()) {
			text += ` ${ToDigits(duration.seconds(), 0)}s`
		}
	}
	
	return text.trim()
}

/**
 * Displays difference between two times in a simplified duration format.  The format will always show down to the second, and will always align in columns vertically (e.g. padding so that the length of '12' is the same as ' 2')
 *
 * If the second parameter is empty, the current date/time is used.
 
 * @example
 * MomentDurationShortTextAligned('2020-01-01 13:00:00', '2020-01-03 14:30:20') // result: 2D  1h 30m 20s
 */
export const MomentDurationShortTextAligned = (start: string | Moment | Date, end?: string | Moment | Date): string => {
	const duration = moment.duration((MomentFromString(end) ?? moment()).diff(MomentFromString(start) ?? moment()))
	
	let text = ''
	
	if (duration.years()) {
		text += ` ${ToDigits(duration.years(), 0)}Y`
		text += ` ${ToDigits(duration.months(), 0).padStart(2)}M`
		text += ` ${ToDigits(duration.days(), 0).padStart(2)}D`
		text += ` ${ToDigits(duration.hours(), 0).padStart(2)}h`
		text += ` ${ToDigits(duration.minutes(), 0).padStart(2)}m`
		text += ` ${ToDigits(duration.seconds(), 0).padStart(2)}s`
	} else if (duration.months()) {
		text += ` ${ToDigits(duration.months(), 0).padStart(2)}M`
		text += ` ${ToDigits(duration.days(), 0).padStart(2)}D`
		text += ` ${ToDigits(duration.hours(), 0).padStart(2)}h`
		text += ` ${ToDigits(duration.minutes(), 0).padStart(2)}m`
		text += ` ${ToDigits(duration.seconds(), 0).padStart(2)}s`
	} else if (duration.days()) {
		text += ` ${ToDigits(duration.days(), 0).padStart(2)}D`
		text += ` ${ToDigits(duration.hours(), 0).padStart(2)}h`
		text += ` ${ToDigits(duration.minutes(), 0).padStart(2)}m`
		text += ` ${ToDigits(duration.seconds(), 0).padStart(2)}s`
	} else if (duration.hours()) {
		text += ` ${ToDigits(duration.hours(), 0).padStart(2)}h`
		text += ` ${ToDigits(duration.minutes(), 0).padStart(2)}m`
		text += ` ${ToDigits(duration.seconds(), 0).padStart(2)}s`
	} else if (duration.minutes()) {
		text += ` ${ToDigits(duration.minutes(), 0).padStart(2)}m`
		text += ` ${ToDigits(duration.seconds(), 0).padStart(2)}s`
	} else if (duration.seconds()) {
		text += ` ${ToDigits(duration.seconds(), 0).padStart(2)}s`
	}
	
	return text.trim()
}
