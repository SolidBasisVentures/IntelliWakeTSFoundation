import {ISO_8601, Moment} from 'moment-timezone'
import {utc} from 'moment'
import {ToDigits} from './StringManipulation'

const moment = require('moment-timezone')

export const MOMENT_FORMAT_DATE = 'YYYY-MM-DD'
export const MOMENT_FORMAT_TIME_SECONDS = 'HH:mm:ss'
export const MOMENT_FORMAT_TIME_NO_SECONDS = 'HH:mm'
export const MOMENT_FORMAT_DATE_TIME = MOMENT_FORMAT_DATE + ' ' + MOMENT_FORMAT_TIME_SECONDS

export const MOMENT_FORMAT_DATE_DISPLAY = `MMM D, YYYY`
export const MOMENT_FORMAT_DATE_DISPLAY_DOW = `dd, ${MOMENT_FORMAT_DATE_DISPLAY}`
export const MOMENT_FORMAT_TIME_DISPLAY = 'h:mm a'
export const MOMENT_FORMAT_DATE_TIME_DISPLAY = `${MOMENT_FORMAT_DATE_DISPLAY}, ${MOMENT_FORMAT_TIME_DISPLAY}`
export const MOMENT_FORMAT_DATE_TIME_DISPLAY_DOW = `${MOMENT_FORMAT_DATE_DISPLAY_DOW}, ${MOMENT_FORMAT_TIME_DISPLAY}`

export const MOMENT_FORMAT_DATE_DISPLAY_LONG = `MMMM D, YYYY`
export const MOMENT_FORMAT_DATE_DISPLAY_DOW_LONG = `dddd, ${MOMENT_FORMAT_DATE_DISPLAY_LONG}`
export const MOMENT_FORMAT_DATE_TIME_DISPLAY_LONG = `${MOMENT_FORMAT_DATE_DISPLAY_LONG}, ${MOMENT_FORMAT_TIME_DISPLAY}`
export const MOMENT_FORMAT_DATE_TIME_DISPLAY_DOW_LONG = `${MOMENT_FORMAT_DATE_DISPLAY_DOW_LONG}, ${MOMENT_FORMAT_TIME_DISPLAY}`

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

export type TAnyDateValue = string | Moment | Date | null | undefined

const StringHasTimeData = (value: string): boolean => value.includes(':')
const StringHasDateData = (value: string): boolean => value.includes('-')
const StringHasTimeZoneData = (value: string): boolean => value.includes('T') || value.includes('+') || value.substr(15).includes('-')

export const AnyDateValueIsObject = (value: TAnyDateValue) => (!value ? false : typeof value !== 'string')

const FormatIsTime = (format: string) =>
	[MOMENT_FORMAT_TIME_SECONDS, MOMENT_FORMAT_TIME_NO_SECONDS, MOMENT_FORMAT_TIME_DISPLAY].includes(format)
const FormatIsDate = (format: string) =>
	[MOMENT_FORMAT_DATE, MOMENT_FORMAT_DATE_DISPLAY, MOMENT_FORMAT_DATE_DISPLAY_DOW].includes(format)
const FormatIsDateTime = (format: string) =>
	[MOMENT_FORMAT_DATE_TIME, MOMENT_FORMAT_DATE_TIME_DISPLAY, MOMENT_FORMAT_DATE_TIME_DISPLAY_DOW].includes(format)

/**
 * Returns the current time zone.
 */
export const MomentCurrentTimeZone = (): string => moment.tz().format('z')

/**
 * Returns the current olson time zone.
 */
export const MomentCurrentTimeZoneOlson = (): string => moment.tz.guess()

export interface ITZItem {
	zone: string
	olson: string
	hours: string
}

/**
 * Returns a list of olson time zone items, sorted by hour diff from UTC
 *
 * Defaults to 'US'
 */
export const TimeZoneOlsons = (forCountry = 'US'): ITZItem[] =>
	(moment.tz.zonesForCountry(forCountry) as string[])
		.map((tzItem) => ({
			zone: moment.tz(tzItem).zoneAbbr(),
			olson: tzItem,
			hours: moment.tz(tzItem).format('Z')
		}))
		.sort((a, b) => (a.hours !== b.hours ? a.hours.localeCompare(b.hours) : a.olson.localeCompare(b.olson)))

/**
 * Display timezone and olson
 */
export const DisplayTZItem = (tzItem: ITZItem | undefined | null): string =>
	!tzItem || !tzItem.olson ? '' : !tzItem.zone ? tzItem.olson : `${tzItem.zone}: ${tzItem.olson}`

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
export const MomentFromString = (value: TAnyDateValue): Moment | null => {
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
export const MomentFormatString = (value: TAnyDateValue, format: string): string | null => {
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
export const MomentTimeString = (value: TAnyDateValue): string | null =>
	MomentFormatString(value, MOMENT_FORMAT_TIME_SECONDS)

/**
 * Returns the moment date string in the format of "YYYY-MM-DD".
 */
export const MomentDateString = (value: TAnyDateValue): string | null => MomentFormatString(value, MOMENT_FORMAT_DATE)

/**
 * Returns the moment date string in the format of "YYYY-MM-DD HH:mm:ss".
 */
export const MomentDateTimeString = (value: TAnyDateValue): string | null =>
	MomentFormatString(value, MOMENT_FORMAT_DATE_TIME)

/**
 * Returns display day date time format.
 */
export const MomentDisplayDayDateTime = (value: TAnyDateValue, showLong = false): string | null => {
	const momentObject = MomentFromString(value)
	
	if (!momentObject) {
		return null
	}
	
	if (!!MomentTimeString(value)) {
		return momentObject.format(showLong ? MOMENT_FORMAT_DATE_TIME_DISPLAY_LONG : MOMENT_FORMAT_DATE_TIME_DISPLAY)
	} else {
		return momentObject.format(showLong ? MOMENT_FORMAT_DATE_DISPLAY_LONG : MOMENT_FORMAT_DATE_DISPLAY)
	}
}

/**
 * Returns display day date format.
 */
export const MomentDisplayDayDate = (value: TAnyDateValue, showLong = false): string | null => {
	const momentObject = MomentFromString(value)
	
	if (!momentObject) {
		return null
	}
	
	return momentObject.format(showLong ? MOMENT_FORMAT_DATE_DISPLAY_LONG : MOMENT_FORMAT_DATE_DISPLAY)
}

/**
 * Returns display day date time format with day of week.
 */
export const MomentDisplayDayDateTimeDoW = (value: TAnyDateValue, showLong = false): string | null => {
	const momentObject = MomentFromString(value)
	
	if (!momentObject) {
		return null
	}
	
	if (!!MomentTimeString(value)) {
		return momentObject.format(
			showLong ? MOMENT_FORMAT_DATE_TIME_DISPLAY_DOW_LONG : MOMENT_FORMAT_DATE_TIME_DISPLAY_DOW
		)
	} else {
		return momentObject.format(showLong ? MOMENT_FORMAT_DATE_DISPLAY_DOW_LONG : MOMENT_FORMAT_DATE_DISPLAY_DOW)
	}
}

/**
 * Returns display day date format with day of week.
 */
export const MomentDisplayDayDateDoW = (value: TAnyDateValue, showLong = false): string | null => {
	const momentObject = MomentFromString(value)
	
	if (!momentObject) {
		return null
	}
	
	return momentObject.format(showLong ? MOMENT_FORMAT_DATE_DISPLAY_DOW_LONG : MOMENT_FORMAT_DATE_DISPLAY_DOW)
}

/**
 * Returns the time with 12-hour clock format.
 */
export const MomentDisplayTime = (value: TAnyDateValue): string | null =>
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
export const MomentDurationShortText = (start: TAnyDateValue, end?: TAnyDateValue): string =>
	DurationShortText((MomentFromString(end) ?? moment()).diff(MomentFromString(start) ?? moment()) / 1000)

/**
 * Displays a simplified duration format from seconds.
 *
 * @example
 * MomentDurationShortText((30 * 60) + 20) // result: 30m 20s
 */
export const DurationShortText = (seconds: number): string => {
	const duration = moment.duration(seconds * 1000)
	
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
export const MomentDurationShortTextAligned = (start: TAnyDateValue, end?: TAnyDateValue): string => {
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

export const MomentStringToDateLocale = (value: TAnyDateValue): string =>
	MomentFormatString(value, 'MM/DD/YYYY') ?? ''

export const DateAndTimeToDateTime = (valueDate: TAnyDateValue, valueTime: string | null): string =>
	MomentDateTimeString(`${MomentDateString(valueDate) ?? ''} ${MomentTimeString(valueTime) ?? ''}`) ?? ''

export const MomentID = (value: TAnyDateValue = null, offsetHours = 5): string | null =>
	MomentFormatString(value ?? moment().subtract(offsetHours, 'hours'), `YYYY-MM-DD_HH-mm-ss`)

export const IANAZoneAbbr = (ianaValue: string) => moment.tz(ianaValue).format('z')

export const MomentAddWeekDays = (weekDays: number, value?: TAnyDateValue): Moment => {
	let newMoment = (MomentFromString(value) ?? moment()).startOf('day')
	
	while (newMoment.isoWeekday() >= 5) {
		newMoment.add(1, 'day')
	}
	
	newMoment.add(Math.floor(weekDays / 5), 'weeks')
	
	let days = weekDays % 5
	
	if ((newMoment.isoWeekday() + days) >= 6) days += 2
	
	newMoment.add(days, 'days')
	
	return newMoment
}

export const MomentWeekDays = (startDate: TAnyDateValue, endDate?: TAnyDateValue): number => {
	let start = MomentFromString(startDate) ?? MomentFromString(moment().subtract(5, 'hours'))
	let end = MomentFromString(endDate) ?? MomentFromString(moment().subtract(5, 'hours'))
	
	if (!start || !end) return 0
	
	while (start.isoWeekday() >= 5) {
		start.add(1, 'day')
	}

	while (end.isoWeekday() > 5) {
		end.subtract(1, 'day')
	}
	
	const weeks = end.startOf('day').diff(start.startOf('day'), 'weeks')
	
	let weekDays = weeks * 5
	
	let checkDate = start.add(weeks, 'weeks')
	
	while (checkDate.isBefore(end, 'day')) {
		checkDate.add(1, 'day')
		if (checkDate.isoWeekday() <= 5) {
			weekDays++
		}
	}
	
	return weekDays
}
