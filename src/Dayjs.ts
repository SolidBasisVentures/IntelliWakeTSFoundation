import {Dayjs, OptionType} from 'dayjs'
import * as dayjs from 'dayjs'
import * as duration from 'dayjs/plugin/duration'
import * as isoWeek from 'dayjs/plugin/isoWeek'
import * as utc from 'dayjs/plugin/utc'
import * as timezone from 'dayjs/plugin/timezone'
import * as AdvancedFormat from 'dayjs/plugin/AdvancedFormat'
import * as LocalizedFormat from 'dayjs/plugin/LocalizedFormat'
import * as customParseFormat from 'dayjs/plugin/customParseFormat'
import {ToDigits} from './StringManipulation'
import {AddS, ReplaceAll} from './Functions'

dayjs.extend(duration)
dayjs.extend(isoWeek)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(AdvancedFormat)
dayjs.extend(LocalizedFormat)
dayjs.extend(customParseFormat)

dayjs.tz.setDefault("UTC")

export const DAYJS_FORMAT_DATE = 'YYYY-MM-DD'
export const DAYJS_FORMAT_TIME_SECONDS = 'HH:mm:ss'
export const DAYJS_FORMAT_TIME_NO_SECONDS = 'HH:mm'
export const DAYJS_FORMAT_DATE_TIME = DAYJS_FORMAT_DATE + ' ' + DAYJS_FORMAT_TIME_SECONDS

export const DAYJS_FORMAT_DATE_DISPLAY = `MMM D, YYYY`
export const DAYJS_FORMAT_DATE_DISPLAY_DOW = `dd, ${DAYJS_FORMAT_DATE_DISPLAY}`
export const DAYJS_FORMAT_TIME_DISPLAY = 'h:mm a'
export const DAYJS_FORMAT_DATE_TIME_DISPLAY = `${DAYJS_FORMAT_DATE_DISPLAY}, ${DAYJS_FORMAT_TIME_DISPLAY}`
export const DAYJS_FORMAT_DATE_TIME_DISPLAY_DOW = `${DAYJS_FORMAT_DATE_DISPLAY_DOW}, ${DAYJS_FORMAT_TIME_DISPLAY}`

export const DAYJS_FORMAT_DATE_DISPLAY_LONG = `MMMM D, YYYY`
export const DAYJS_FORMAT_DATE_DISPLAY_DOW_LONG = `dddd, ${DAYJS_FORMAT_DATE_DISPLAY_LONG}`
export const DAYJS_FORMAT_DATE_TIME_DISPLAY_LONG = `${DAYJS_FORMAT_DATE_DISPLAY_LONG}, ${DAYJS_FORMAT_TIME_DISPLAY}`
export const DAYJS_FORMAT_DATE_TIME_DISPLAY_DOW_LONG = `${DAYJS_FORMAT_DATE_DISPLAY_DOW_LONG}, ${DAYJS_FORMAT_TIME_DISPLAY}`

const DATE_FORMAT_TRIES: OptionType = [
	'YYYY-MM-DD',
	'M-D-YYYY',
	'MM-DD-YYYY',
	'YYYYMMDD'
]
const TIME_FORMAT_TRIES: OptionType = [
	'YYYY-MM-DD HH:mm:ss',
	'YYYY-MM-DD HH:mm',
	'HH:mm:ss',
	'HH:mm',
	'D-M-YYYY HH:mm:ss',
	'D-M-YYYY HH:mm',
	'DD-MM-YYYY HH:mm:ss',
	'DD-MM-YYYY HH:mm',
	'YYYY-MM-DD HH:mm:ss.S',
	'YYYY-MM-DD HH:mm:ss.SS',
	'YYYY-MM-DD HH:mm:ss.SSS'
]

export enum EDateAndOrTime {
	DATE,
	TIME,
	DATETIME
}

export type TAnyDateValue = string | Dayjs | Date | null | undefined

const StringHasTimeData = (value: string): boolean => value.includes(':')
const StringHasDateData = (value: string): boolean => value.includes('-') || /\d{8}/.test(value)
const StringHasTimeZoneData = (value: string): boolean =>
	value.includes('T') // || value.includes('+') || value.substr(15).includes('-')

export const AnyDateValueIsObject = (value: TAnyDateValue) => (!value ? false : typeof value !== 'string')

const FormatIsTime = (format: string) =>
	[DAYJS_FORMAT_TIME_SECONDS, DAYJS_FORMAT_TIME_NO_SECONDS, DAYJS_FORMAT_TIME_DISPLAY].includes(format)
const FormatIsDate = (format: string) =>
	[DAYJS_FORMAT_DATE, DAYJS_FORMAT_DATE_DISPLAY, DAYJS_FORMAT_DATE_DISPLAY_DOW].includes(format)
const FormatIsDateTime = (format: string) =>
	[DAYJS_FORMAT_DATE_TIME, DAYJS_FORMAT_DATE_TIME_DISPLAY, DAYJS_FORMAT_DATE_TIME_DISPLAY_DOW].includes(format)

/**
 * Returns the current time zone.
 */
export const DayjsCurrentTimeZone = (): string => dayjs.utc().format('z')

/**
 * Returns the current olson time zone.
 */
export const DayjsCurrentTimeZoneOlson = (): string => dayjs.tz.guess()

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
export const TimeZoneOlsons = (): ITZItem[] =>
	[
		{
			'zone': 'EDT',
			'olson': 'America/Detroit',
			'hours': '-04:00'
		},
		{
			'zone': 'EDT',
			'olson': 'America/Indiana/Indianapolis',
			'hours': '-04:00'
		},
		{
			'zone': 'EDT',
			'olson': 'America/Indiana/Marengo',
			'hours': '-04:00'
		},
		{
			'zone': 'EDT',
			'olson': 'America/Indiana/Petersburg',
			'hours': '-04:00'
		},
		{
			'zone': 'EDT',
			'olson': 'America/Indiana/Vevay',
			'hours': '-04:00'
		},
		{
			'zone': 'EDT',
			'olson': 'America/Indiana/Vincennes',
			'hours': '-04:00'
		},
		{
			'zone': 'EDT',
			'olson': 'America/Indiana/Winamac',
			'hours': '-04:00'
		},
		{
			'zone': 'EDT',
			'olson': 'America/Kentucky/Louisville',
			'hours': '-04:00'
		},
		{
			'zone': 'EDT',
			'olson': 'America/Kentucky/Monticello',
			'hours': '-04:00'
		},
		{
			'zone': 'EDT',
			'olson': 'America/New_York',
			'hours': '-04:00'
		},
		{
			'zone': 'CDT',
			'olson': 'America/Chicago',
			'hours': '-05:00'
		},
		{
			'zone': 'CDT',
			'olson': 'America/Indiana/Knox',
			'hours': '-05:00'
		},
		{
			'zone': 'CDT',
			'olson': 'America/Indiana/Tell_City',
			'hours': '-05:00'
		},
		{
			'zone': 'CDT',
			'olson': 'America/Menominee',
			'hours': '-05:00'
		},
		{
			'zone': 'CDT',
			'olson': 'America/North_Dakota/Beulah',
			'hours': '-05:00'
		},
		{
			'zone': 'CDT',
			'olson': 'America/North_Dakota/Center',
			'hours': '-05:00'
		},
		{
			'zone': 'CDT',
			'olson': 'America/North_Dakota/New_Salem',
			'hours': '-05:00'
		},
		{
			'zone': 'MDT',
			'olson': 'America/Boise',
			'hours': '-06:00'
		},
		{
			'zone': 'MDT',
			'olson': 'America/Denver',
			'hours': '-06:00'
		},
		{
			'zone': 'PDT',
			'olson': 'America/Los_Angeles',
			'hours': '-07:00'
		},
		{
			'zone': 'MST',
			'olson': 'America/Phoenix',
			'hours': '-07:00'
		},
		{
			'zone': 'AKDT',
			'olson': 'America/Anchorage',
			'hours': '-08:00'
		},
		{
			'zone': 'AKDT',
			'olson': 'America/Juneau',
			'hours': '-08:00'
		},
		{
			'zone': 'AKDT',
			'olson': 'America/Metlakatla',
			'hours': '-08:00'
		},
		{
			'zone': 'AKDT',
			'olson': 'America/Nome',
			'hours': '-08:00'
		},
		{
			'zone': 'AKDT',
			'olson': 'America/Sitka',
			'hours': '-08:00'
		},
		{
			'zone': 'AKDT',
			'olson': 'America/Yakutat',
			'hours': '-08:00'
		},
		{
			'zone': 'HDT',
			'olson': 'America/Adak',
			'hours': '-09:00'
		},
		{
			'zone': 'HST',
			'olson': 'Pacific/Honolulu',
			'hours': '-10:00'
		}
	]
// (dayjs.tz.zonesForCountry(forCountry) as string[])
// 	.map(tzItem => ({
// 		zone: dayjs.tz(tzItem).zoneAbbr(),
// 		olson: tzItem,
// 		hours: dayjs.tz(tzItem).format('Z')
// 	}))
// 	.sort((a, b) => (a.hours !== b.hours ? a.hours.localeCompare(b.hours) : a.olson.localeCompare(b.olson)))

/**
 * Display timezone and olson
 */
export const DisplayTZItem = (tzItem: ITZItem | undefined | null): string =>
	!tzItem || !tzItem.olson ? '' : !tzItem.zone ? tzItem.olson : `${tzItem.zone}: ${tzItem.olson}`

/**
 * Current time in ISO string format
 */
export const NowISOString = (): string => new Date().toISOString()

export const IsDateString = (value: any): boolean => {
	if (!value || typeof value !== 'string') return false
	
	// if (!DATE_FORMAT_TRIES.some(DFT => DFT.toString().length === value.length) && !TIME_FORMAT_TRIES.some(DFT => DFT.toString().length === value.length)) {
	// 	return false
	// }
	
	if (!StringHasDateData(value)) return false
	
	return !!DayjsFromString(value)
}

/**
 * Returns the Dayjs object from a given value. If the given value is invalid,
 * it returns null.
 *
 *
 * @example
 * // returns Dayjs<2020-10-02T00:00:00Z>
 * DayjsFromString('2020-10-02')
 */
export const DayjsFromString = (value: TAnyDateValue): Dayjs | null => {
	if (!value) {
		return null
	}
	
	const formatTries: OptionType = [...DATE_FORMAT_TRIES, ...TIME_FORMAT_TRIES]
	
	if (typeof value !== 'string') {
		const dayjsObject = dayjs(value)
		if (dayjsObject.isValid()) {
			return dayjsObject.utc().tz(DayjsCurrentTimeZone())
		}
	} else {
		// const dayjsObject = StringHasTimeZoneData(value) ? dayjs(value.substr(0, 23), formatTries, true) : dayjs(value.substr(0, 23), formatTries, true).utc() // , formatTries, true
		let dayjsObject: Dayjs
		const hasTZData = StringHasTimeZoneData(value)
		
		for (const formatTry of formatTries) {
			dayjsObject = hasTZData ? dayjs(value.substr(0, 23), formatTry, true) : dayjs.utc(value.substr(0, 23), formatTry, true)
			if (dayjsObject.isValid()) {
				return dayjsObject
			}
		}
	
		// dayjsObject = StringHasTimeZoneData(value) ? dayjs(value, formatTries, true) : dayjs(value, formatTries, true)
		// if (dayjsObject.isValid()) {
		// 	return dayjsObject
		// }
	}
	
	return null
}

/**
 * Does the same thing as DayjsFromString() but instead returns a string based on the format specified.
 *
 * @example
 * // returns "Oct 2, 2020"
 * DayjsFromString('2020-10-02', 'll')
 */
export const DayjsFormatString = (value: TAnyDateValue, format: string): string | null => {
	if (!value) return null
	
	if (typeof value == 'string') {
		if (FormatIsTime(format) && !StringHasTimeData(value)) {
			return null
		}
		
		if ((FormatIsDateTime(format) || FormatIsDate(format)) && !StringHasDateData(value)) return null
		
		let dayjsObject = DayjsFromString(value)?.format(format) ?? null
		
		if (!dayjsObject) return null
		
		if (format === DAYJS_FORMAT_TIME_SECONDS || format === DAYJS_FORMAT_TIME_NO_SECONDS) {
			if (!StringHasTimeData(dayjsObject)) return null
			
			return dayjsObject.substr(format.length * -1, format.length)
		}
		
		if (format === DAYJS_FORMAT_DATE) {
			if (!StringHasDateData(dayjsObject)) return null
			
			return dayjsObject.substr(0, format.length)
		}
		
		if (format === DAYJS_FORMAT_DATE_TIME) {
			if (!StringHasDateData(dayjsObject) || !StringHasTimeData(dayjsObject)) return null
		}
		
		return dayjsObject
	}
	
	return DayjsFromString(value)?.format(format) ?? null
}

/**
 * Returns the dayjs time string in the format of "HH:mm:ss".
 */
export const DayjsTimeString = (value: TAnyDateValue): string | null =>
	DayjsFormatString(value, DAYJS_FORMAT_TIME_SECONDS)

/**
 * Returns the dayjs date string in the format of "YYYY-MM-DD".
 */
export const DayjsDateString = (value: TAnyDateValue): string | null => DayjsFormatString(value, DAYJS_FORMAT_DATE)

/**
 * Returns the dayjs date string in the format of "YYYY-MM-DD HH:mm:ss".
 */
export const DayjsDateTimeString = (value: TAnyDateValue): string | null =>
	DayjsFormatString(value, DAYJS_FORMAT_DATE_TIME)

/**
 * Returns display day date time format.
 */
export const DayjsDisplayDayDateTime = (value: TAnyDateValue, showLong = false): string | null => {
	if (!!DayjsTimeString(value)) {
		return DayjsFormatString(value, showLong ? DAYJS_FORMAT_DATE_TIME_DISPLAY_LONG : DAYJS_FORMAT_DATE_TIME_DISPLAY)
	} else {
		return DayjsFormatString(value, showLong ? DAYJS_FORMAT_DATE_DISPLAY_LONG : DAYJS_FORMAT_DATE_DISPLAY)
	}
}

/**
 * Returns display day date format.
 */
export const DayjsDisplayDayDate = (value: TAnyDateValue, showLong = false): string | null =>
	DayjsFormatString(value, showLong ? DAYJS_FORMAT_DATE_DISPLAY_LONG : DAYJS_FORMAT_DATE_DISPLAY)

/**
 * Returns display day date time format with day of week.
 */
export const DayjsDisplayDayDateTimeDoW = (value: TAnyDateValue, showLong = false): string | null => {
	if (!!DayjsTimeString(value)) {
		return DayjsFormatString(value,
			showLong ? DAYJS_FORMAT_DATE_TIME_DISPLAY_DOW_LONG : DAYJS_FORMAT_DATE_TIME_DISPLAY_DOW
		)
	} else {
		return DayjsFormatString(value, showLong ? DAYJS_FORMAT_DATE_DISPLAY_DOW_LONG : DAYJS_FORMAT_DATE_DISPLAY_DOW)
	}
}

/**
 * Returns display day date format with day of week.
 */
export const DayjsDisplayDayDateDoW = (value: TAnyDateValue, showLong = false): string | null =>
	DayjsFormatString(value, showLong ? DAYJS_FORMAT_DATE_DISPLAY_DOW_LONG : DAYJS_FORMAT_DATE_DISPLAY_DOW)

/**
 * Returns the time with 12-hour clock format.
 */
export const DayjsDisplayTime = (value: TAnyDateValue): string | null =>
	DayjsFormatString(value, DAYJS_FORMAT_TIME_DISPLAY)

/**
 * Displays difference between two times in a simplified duration format.
 *
 * If the second parameter is empty, the current date/time is used.
 *
 * @example
 * DayjsDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30m 20s
 * DayjsDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30m 20s
 */
export const DayjsDurationShortText = (start: TAnyDateValue, end?: TAnyDateValue): string =>
	DurationShortText((DayjsFromString(end) ?? dayjs()).diff(DayjsFromString(start) ?? dayjs()) / 1000)

/**
 * Displays difference between two times in a simplified duration format.
 *
 * If the second parameter is empty, the current date/time is used.
 *
 * @example
 * DayjsDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30 Minutes 20 Seconds
 * DayjsDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30 Minutes 20 Seconds
 */
export const DayjsDurationLongText = (start: TAnyDateValue, end?: TAnyDateValue, trimSeconds = false): string =>
	DurationLongText((DayjsFromString(end) ?? dayjs()).diff(DayjsFromString(start) ?? dayjs()) / 1000, trimSeconds)

/**
 * Displays a simplified duration format from seconds.
 *
 * @example
 * DayjsDurationShortText((30 * 60) + 20) // result: 30m 20s
 */
export const DurationShortText = (seconds: number): string => {
	const duration = dayjs.duration(seconds * 1000)
	
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
 * Displays a simplified duration format from seconds.
 *
 * @example
 * DayjsDurationShortText((30 * 60) + 20) // result: 30 Minutes 20 Seconds
 */
export const DurationLongText = (seconds: number, trimSeconds = false): string => {
	const duration = dayjs.duration(seconds * 1000)
	
	let text = ''
	
	if (duration.years()) {
		text += ` ${ToDigits(duration.years(), 0)} ${AddS('Year', duration.years())}`
		text += ` ${ToDigits(duration.months(), 0)} ${AddS('Month', duration.months())}`
		if (duration.days()) {
			text += ` ${ToDigits(duration.days(), 0)} ${AddS('Day', duration.days())}`
		}
	} else if (duration.months()) {
		text += ` ${ToDigits(duration.months(), 0)} ${AddS('Month', duration.months())}`
		
		if (duration.days()) {
			text += ` ${ToDigits(duration.days(), 0)} ${AddS('Day', duration.days())}`
		}
	} else if (duration.days()) {
		text += ` ${ToDigits(duration.days(), 0)} ${AddS('Day', duration.days())}`
		if (duration.hours()) {
			text += ` ${ToDigits(duration.hours(), 0)} ${AddS('Hour', duration.hours())}`
		}
		if (duration.minutes()) {
			text += ` ${ToDigits(duration.minutes(), 0)} ${AddS('Minute', duration.minutes())}`
		}
	} else if (duration.hours()) {
		text += ` ${ToDigits(duration.hours(), 0)} ${AddS('Hour', duration.hours())}`
		if (duration.minutes()) {
			text += ` ${ToDigits(duration.minutes(), 0)} ${AddS('Minute', duration.minutes())}`
		}
	} else {
		if (duration.minutes() || (!text && trimSeconds)) {
			text += ` ${ToDigits(duration.minutes(), 0)} ${AddS('Minute', duration.minutes())}`
		}
		if (!text || (!trimSeconds && duration.seconds())) {
			text += ` ${ToDigits(duration.seconds(), 0)} ${AddS('Second', duration.seconds())}`
		}
	}
	
	return text.trim()
}

/**
 * Displays difference between two times in a simplified duration format.  The format will always show down to the second, and will always align in columns vertically (e.g. padding so that the length of '12' is the same as ' 2')
 *
 * If the second parameter is empty, the current date/time is used.
 
 * @example
 * DayjsDurationShortTextAligned('2020-01-01 13:00:00', '2020-01-03 14:30:20') // result: 2D  1h 30m 20s
 */
export const DayjsDurationShortTextAligned = (start: TAnyDateValue, end?: TAnyDateValue): string => {
	const duration = dayjs.duration((DayjsFromString(end) ?? dayjs()).diff(DayjsFromString(start) ?? dayjs()))
	
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

export const DayjsStringToDateLocale = (value: TAnyDateValue): string => DayjsFormatString(value, 'MM/DD/YYYY') ?? ''

export const DateAndTimeToDateTime = (valueDate: TAnyDateValue, valueTime: string | null): string =>
	DayjsDateTimeString(`${DayjsDateString(valueDate) ?? ''} ${DayjsTimeString(valueTime) ?? ''}`) ?? ''

export const DayjsID = (value: TAnyDateValue = null, offsetHours = 5): string | null =>
	DayjsFormatString(value ?? dayjs().subtract(offsetHours, 'hours'), `YYYY-MM-DD_HH-mm-ss`)

export const IANAZoneAbbr = (ianaValue: string) => dayjs.tz(ianaValue).format('z')

export const DayjsAddWeekDays = (weekDays: number, value?: TAnyDateValue): Dayjs => {
	let newDayjs = (DayjsFromString(value) ?? dayjs()).startOf('day')
	
	while (newDayjs.isoWeekday() >= 5) {
		newDayjs.add(1, 'day')
	}
	
	newDayjs.add(Math.floor(weekDays / 5), 'weeks')
	
	let days = weekDays % 5
	
	if (newDayjs.isoWeekday() + days >= 6) days += 2
	
	newDayjs.add(days, 'days')
	
	return newDayjs
}

export const DayjsWeekDays = (startDate: TAnyDateValue, endDate?: TAnyDateValue): number => {
	let start = DayjsFromString(startDate) ?? DayjsFromString(dayjs().subtract(5, 'hours'))
	let end = DayjsFromString(endDate) ?? DayjsFromString(dayjs().subtract(5, 'hours'))
	
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

export const DateICS = (date?: any): string | null => {
	let dayJSObject = DayjsFromString(date)
	
	if (!dayJSObject || !dayJSObject.isValid()) return null
	
	let dateICS = dayJSObject.toISOString()
	
	let decimal = dateICS.indexOf('.')
	let zed = dateICS.indexOf('Z')
	
	if (decimal > 0 && zed > decimal) {
		dateICS = dateICS.substring(0, decimal) + dateICS.substring(zed)
	}
	
	dateICS = ReplaceAll('-', '', dateICS)
	dateICS = ReplaceAll(':', '', dateICS)
	
	return dateICS
}
