import moment, {Moment} from 'moment-timezone'

export const MOMENT_FORMAT_DATE = 'YYYY-MM-DD'
export const MOMENT_FORMAT_TIME_SECONDS = 'HH:mm:ss'
export const MOMENT_FORMAT_TIME_NO_SECONDS = 'HH:mm'
export const MOMENT_FORMAT_DATE_TIME = MOMENT_FORMAT_DATE + ' ' + MOMENT_FORMAT_TIME_SECONDS

const DATE_FORMAT_TRIES: moment.MomentFormatSpecification = ['YYYY-MM-DD', 'M-D-YYYY', 'MM-DD-YYYY', moment.ISO_8601]
const TIME_FORMAT_TRIES: moment.MomentFormatSpecification = [
	moment.ISO_8601,
	'YYYY-MM-DD HH:mm:ss',
	'YYYY-MM-DD HH:mm',
	'HH:mm:ss',
	'HH:mm',
	'D-M-YYYY HH:mm:ss',
	'D-M-YYYY HH:mm',
	'DD-MM-YYYY HH:mm:ss',
	'DD-MM-YYYY HH:mm'
]

const StringHasTimeZoneData = (value: string): boolean => value.includes('T')

/**
 * Returns the current time zone.
 */
export const MomentCurrentTimeZone = (): string => (moment().tz() ?? 'UTC').toString()

/**
 * Returns the Moment object from a given value. If the given value is invalid,
 * it returns null.
 *
 *
 * @example
 * // returns Moment<2020-10-02T00:00:00Z>
 * MomentFromString('2020-10-02')
 */
export const MomentFromString = (
	value: string | Moment | Date | null | undefined
): Moment | null => {
	if (!value) {
		return null
	}
	
	if (typeof value !== 'string') {
		const momentObject = moment(value)
		if (momentObject.isValid()) {
			return momentObject.utc().tz(MomentCurrentTimeZone())
		}
	} else {
		const momentObject = StringHasTimeZoneData(value) ? moment(value, [...DATE_FORMAT_TRIES, ...TIME_FORMAT_TRIES], true) : moment.utc(value, [...DATE_FORMAT_TRIES, ...TIME_FORMAT_TRIES], true)
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
export const MomentFormatString = (value: string | Moment | Date | null | undefined, format: string): string | null => MomentFromString(value)?.format(format) ?? null

/**
 * Returns the moment time string in the format of "HH:mm:ss".
 */
export const MomentTimeString = (
	value: string | Moment | Date | null | undefined
): string | null => MomentFormatString(value, MOMENT_FORMAT_TIME_SECONDS)

/**
 * Returns the moment date string in the format of "YYYY-MM-DD".
 */
export const MomentDateString = (
	value: string | Moment | Date | null | undefined
): string | null => MomentFormatString(value, MOMENT_FORMAT_DATE)

/**
 * Returns the moment date string in the format of "YYYY-MM-DD HH:mm:ss".
 */
export const MomentDateTimeString = (
	value: string | Moment | Date | null | undefined
): string | null => MomentFormatString(value, MOMENT_FORMAT_DATE_TIME)

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
	
	return momentObject.format(momentObject.year() === moment().year() && !showYear ? 'ddd, MMM D, h:mm a' : 'ddd, MMM D, YYYY @ h:mm a')
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
	
	return momentObject.format(momentObject.year() === moment().year() && !showYear ? 'ddd, MMM D' : 'ddd, MMM D, YYYY')
}

/**
 * Returns the time with 12-hour clock format.
 */
export const MomentDisplayTime = (
	value: string | Moment | Date | null | undefined
): string | null => MomentFormatString(value, 'h:mm a')

