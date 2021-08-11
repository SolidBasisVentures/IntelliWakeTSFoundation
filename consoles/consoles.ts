import {
	DATE_FORMAT_DATE,
	DATE_FORMAT_DATE_DISPLAY,
	DATE_FORMAT_DATE_DISPLAY_DOW,
	DATE_FORMAT_DATE_DISPLAY_DOW_LONG,
	DATE_FORMAT_DATE_DISPLAY_LONG,
	DATE_FORMAT_DATE_TIME,
	DATE_FORMAT_DATE_TIME_DISPLAY,
	DATE_FORMAT_DATE_TIME_DISPLAY_DOW,
	DATE_FORMAT_DATE_TIME_DISPLAY_DOW_LONG,
	DATE_FORMAT_DATE_TIME_DISPLAY_LONG,
	DATE_FORMAT_TIME_DISPLAY,
	DATE_FORMAT_TIME_NO_SECONDS,
	DATE_FORMAT_TIME_SECONDS,
	DateFormat,
	DateISO,
	DateParseTS
} from '../src/DateManager'

require('source-map-support').install()

const isoLongDateString = '2021-01-01T00:00:00Z'
const tsString = DateParseTS(isoLongDateString)

console.log(DateISO(tsString))
console.log(tsString)

const alternate = 'Mo Do Q'
console.log(alternate, '-----', DateFormat(isoLongDateString, alternate))
console.log(DATE_FORMAT_DATE, '-----', DateFormat(isoLongDateString, DATE_FORMAT_DATE))
console.log(DATE_FORMAT_TIME_SECONDS, '-----', DateFormat(isoLongDateString, DATE_FORMAT_TIME_SECONDS))
console.log(DATE_FORMAT_TIME_NO_SECONDS, '-----', DateFormat(isoLongDateString, DATE_FORMAT_TIME_NO_SECONDS))
console.log(DATE_FORMAT_DATE_TIME, '-----', DateFormat(isoLongDateString, DATE_FORMAT_DATE_TIME))
console.log(DATE_FORMAT_DATE_DISPLAY, '-----', DateFormat(isoLongDateString, DATE_FORMAT_DATE_DISPLAY))
console.log(DATE_FORMAT_DATE_DISPLAY_DOW, '-----', DateFormat(isoLongDateString, DATE_FORMAT_DATE_DISPLAY_DOW))
console.log(DATE_FORMAT_TIME_DISPLAY, '-----', DateFormat(isoLongDateString, DATE_FORMAT_TIME_DISPLAY))
console.log(DATE_FORMAT_DATE_TIME_DISPLAY, '-----', DateFormat(isoLongDateString, DATE_FORMAT_DATE_TIME_DISPLAY))
console.log(DATE_FORMAT_DATE_TIME_DISPLAY_DOW, '-----', DateFormat(isoLongDateString, DATE_FORMAT_DATE_TIME_DISPLAY_DOW))
console.log(DATE_FORMAT_DATE_DISPLAY_LONG, '-----', DateFormat(isoLongDateString, DATE_FORMAT_DATE_DISPLAY_LONG))
console.log(DATE_FORMAT_DATE_DISPLAY_DOW_LONG, '-----', DateFormat(isoLongDateString, DATE_FORMAT_DATE_DISPLAY_DOW_LONG))
console.log(DATE_FORMAT_DATE_TIME_DISPLAY_LONG, '-----', DateFormat(isoLongDateString, DATE_FORMAT_DATE_TIME_DISPLAY_LONG))
console.log(DATE_FORMAT_DATE_TIME_DISPLAY_DOW_LONG, '-----', DateFormat(isoLongDateString, DATE_FORMAT_DATE_TIME_DISPLAY_DOW_LONG))
