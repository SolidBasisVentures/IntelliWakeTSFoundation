import {DateObject, DateParseTS} from '../src/DateManager'

require('source-map-support').install()

const dateString = '2021-01-01T00:00:00Z'
const dateTS = DateParseTS(dateString)
const dateObject = DateObject(dateString)

console.log(dateString)
console.log(dateTS)
console.log(dateObject)

console.log(dateString)
// console.log(DateISOAdd(dateString, 1, 'days'))
// console.log(DateISOAdd(dateString, -1, 'weeks'))
// console.log(DateISOAdd(dateString, 1, 'year'))
// console.log(DateISOAdd(dateString, -2, 'years'))
//
// for (let i = 0; i < 26; i++)
// 	console.log(i, DateISOAdd(dateString, i, 'month'))
//
// for (let i = 0; i > -26; i--)
// 	console.log(i, DateISOAdd(dateString, i, 'month'))



// console.log(DateISO(dateTS))
// console.log(dateTS)
//
// const alternate = 'Mo [is Month] Do [is Day] [Q]Q'
// console.log(alternate, '-----', DateFormat(dateString, alternate))
// console.log(DATE_FORMAT_DATE, '-----', DateFormat(dateString, DATE_FORMAT_DATE))
// console.log(DATE_FORMAT_TIME_SECONDS, '-----', DateFormat(dateString, DATE_FORMAT_TIME_SECONDS))
// console.log(DATE_FORMAT_TIME_NO_SECONDS, '-----', DateFormat(dateString, DATE_FORMAT_TIME_NO_SECONDS))
// console.log(DATE_FORMAT_DATE_TIME, '-----', DateFormat(dateString, DATE_FORMAT_DATE_TIME))
// console.log(DATE_FORMAT_DATE_DISPLAY, '-----', DateFormat(dateString, DATE_FORMAT_DATE_DISPLAY))
// console.log(DATE_FORMAT_DATE_DISPLAY_DOW, '-----', DateFormat(dateString, DATE_FORMAT_DATE_DISPLAY_DOW))
// console.log(DATE_FORMAT_TIME_DISPLAY, '-----', DateFormat(dateString, DATE_FORMAT_TIME_DISPLAY))
// console.log(DATE_FORMAT_DATE_TIME_DISPLAY, '-----', DateFormat(dateString, DATE_FORMAT_DATE_TIME_DISPLAY))
// console.log(DATE_FORMAT_DATE_TIME_DISPLAY_DOW, '-----', DateFormat(dateString, DATE_FORMAT_DATE_TIME_DISPLAY_DOW))
// console.log(DATE_FORMAT_DATE_DISPLAY_LONG, '-----', DateFormat(dateString, DATE_FORMAT_DATE_DISPLAY_LONG))
// console.log(DATE_FORMAT_DATE_DISPLAY_DOW_LONG, '-----', DateFormat(dateString, DATE_FORMAT_DATE_DISPLAY_DOW_LONG))
// console.log(DATE_FORMAT_DATE_TIME_DISPLAY_LONG, '-----', DateFormat(dateString, DATE_FORMAT_DATE_TIME_DISPLAY_LONG))
// console.log(DATE_FORMAT_DATE_TIME_DISPLAY_DOW_LONG, '-----', DateFormat(dateString, DATE_FORMAT_DATE_TIME_DISPLAY_DOW_LONG))
