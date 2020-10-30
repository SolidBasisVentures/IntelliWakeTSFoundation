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

export const MomentCurrentTimeZone = (): string => (moment().tz() ?? 'UTC').toString()

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

export const MomentTimeString = (
	value: string | Moment | Date | null | undefined
): string | null => {
	return MomentFromString(value)?.format(MOMENT_FORMAT_TIME_SECONDS) ?? null
}

export const MomentDateString = (
	value: string | Moment | Date | null | undefined
): string | null => {
	return MomentFromString(value)?.format(MOMENT_FORMAT_DATE) ?? null
}

export const MomentDateTimeString = (
	value: string | Moment | Date | null | undefined
): string | null => {
	return MomentFromString(value)?.format(MOMENT_FORMAT_DATE_TIME) ?? null
}

export const MomentDisplayDayDateTime = (
	value: string | Moment | Date | null | undefined
): string | null => {
	const momentObject = MomentFromString(value)
	
	if (!momentObject) {
		return null
	}
	
	return momentObject.format(momentObject.year() === moment().year() ? 'ddd, MMM D, h:mm a' : 'ddd, MMM D, YYYY @ h:mm a')
}

export const MomentDisplayDayDate = (
	value: string | Moment | Date | null | undefined
): string | null => {
	const momentObject = MomentFromString(value)
	
	if (!momentObject) {
		return null
	}
	
	return momentObject.format(momentObject.year() === moment().year() ? 'ddd, MMM D' : 'ddd, MMM D, YYYY')
}

export const MomentDisplayTime = (
	value: string | Moment | Date | null | undefined
): string | null => {
	return MomentFromString(value)?.format('h:mm a') ?? null
}
