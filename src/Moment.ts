import moment, {Moment, MomentBuiltinFormat} from 'moment'

export const MOMENT_FORMAT_DATE = 'YYYY-MM-DD'
export const MOMENT_FORMAT_TIME_SECONDS = 'HH:mm:ss'
export const MOMENT_FORMAT_TIME_NO_SECONDS = 'HH:mm'
export const MOMENT_FORMAT_DATE_TIME = MOMENT_FORMAT_DATE + ' ' + MOMENT_FORMAT_TIME_SECONDS

// export const MomentFromUTCString = (date: string | Moment | Date | null | undefined): string | null => {
// 	if (!date) {
// 		return null
// 	}
//
// 	const momentString = MomentDateTimeString(date, undefined, true)
//
// 	if (!momentString) {
// 		return null
// 	}
//
// 	const workingMoment = moment.utc(momentString).toISOString()
//
// 	return MomentDateTimeString(workingMoment, MOMENT_FORMAT_DATE_TIME, true)
// }

export const MomentWithFormatUTC = (
	value: string | Moment | Date | null | undefined,
	format: string | MomentBuiltinFormat | undefined,
	strict: boolean,
	convertFromUTC: boolean
): Moment => {
	return convertFromUTC ? moment(value, format, strict) : moment.utc(value, format, strict)
}

export const MomentDateString = (
	value: string | Moment | Date | null | undefined,
	format = MOMENT_FORMAT_DATE
): string | null => {
	if (!value) {
		return null
	}
	
	if (typeof value !== 'string') {
		const momentObject = moment(value)
		if (momentObject.isValid()) {
			return momentObject.local().format(format)
		}
		return null
	}
	
	const FORMAT_TRIES = ['YYYY-MM-DD', 'M-D-YYYY', 'MM-DD-YYYY', moment.ISO_8601]
	
	const valueTry = value.replace('T', ' ').substr(0, 10)
	
	for (const formatTry of FORMAT_TRIES) {
		const momentObject = moment(valueTry, formatTry, true)
		if (momentObject.isValid() && momentObject.year() >= 1900) {
			return momentObject.format(format)
		}
	}
	
	return null
}

export const MomentTimeString = (
	value: string | Moment | Date | null | undefined,
	format = MOMENT_FORMAT_TIME_SECONDS
): string | null => {
	if (!value) {
		return null
	}
	
	if (typeof value !== 'string') {
		const momentObject = moment(value, undefined, false)
		if (momentObject.isValid()) {
			return momentObject.format(format)
		}
		return null
	}
	
	const FORMAT_TRIES = [
		'HH:mm:ss',
		'HH:mm',
		'YYYY-MM-DD HH:mm:ss',
		'YYYY-MM-DD HH:mm',
		'D-M-YYYY HH:mm:ss',
		'D-M-YYYY HH:mm',
		'DD-MM-YYYY HH:mm:ss',
		'DD-MM-YYYY HH:mm',
		moment.ISO_8601
	]
	
	const valueTry = value.replace('T', ' ').substr(0, 19)
	
	for (const formatTry of FORMAT_TRIES) {
		const momentObject = moment(valueTry, formatTry, true)
		if (momentObject.isValid()) {
			return momentObject.format(format)
		}
	}
	
	return null
}
export const MomentDateTimeString = (
	value: string | Moment | Date | null | undefined,
	format = MOMENT_FORMAT_DATE_TIME
): string | null => {
	const momentDate = MomentDateString(value, undefined)
	
	if (!!momentDate) {
		const momentTime = MomentTimeString(value, undefined)
		
		if (!!momentTime) {
			return moment(momentDate + ' ' + momentTime).format(format)
		}
	}
	
	return null
}
export const MomentDisplayDayDateTime = (
	date: string | Moment | Date | null | undefined,
	convertFromUTC = true
): string | null => {
	if (!date) {
		return null
	}
	
	const momentString = MomentDateTimeString(date, MOMENT_FORMAT_DATE_TIME)
	
	if (!momentString) {
		return null
	}
	
	// const workingMoment = convertFromUTC ? moment.utc(date) : moment(date)
	const workingMoment = moment.utc(date)
	
	const format = workingMoment.year() === moment().year() ? 'ddd, MMM D, h:mm a' : 'ddd, MMM D, YYYY @ h:mm a'
	
	if (convertFromUTC) {
		return workingMoment.local().format(format)
	} else {
		return workingMoment.format(format)
	}
}
export const MomentDisplayDayDate = (
	date: string | Moment | Date | null | undefined,
	convertFromUTC = true
): string | null => {
	if (!date) {
		return null
	}
	
	const momentString = MomentDateString(date, MOMENT_FORMAT_DATE_TIME)
	
	if (!momentString) {
		return null
	}
	
	// const workingMoment = convertFromUTC ? moment.utc(date) : moment(date)
	const workingMoment = moment.utc(date)
	
	const format = workingMoment.year() === moment().year() ? 'ddd, MMM D' : 'ddd, MMM D, YYYY'
	
	if (convertFromUTC) {
		return workingMoment.local().format(format)
	} else {
		return workingMoment.format(format)
	}
}
export const MomentDisplayTime = (
	date: string | Moment | Date | null | undefined,
	convertFromUTC = true
): string | null => {
	if (!date) {
		return null
	}
	
	const momentString = MomentTimeString(date, MOMENT_FORMAT_TIME_SECONDS)
	
	if (!momentString) {
		return null
	}
	
	// const workingMoment = convertFromUTC
	// 	? moment(moment().format(MOMENT_FORMAT_DATE) + ' ' + momentString)
	// 	: moment.utc(moment().format(MOMENT_FORMAT_DATE) + ' ' + momentString)
	const workingMoment = moment.utc(moment().format(MOMENT_FORMAT_DATE) + ' ' + momentString)
	
	const format = 'h:mm a'
	
	if (convertFromUTC) {
		return workingMoment.local().format(format)
	} else {
		return workingMoment.format(format)
	}
}
