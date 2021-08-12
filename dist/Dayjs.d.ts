import { Dayjs, DayjsTimezone } from 'dayjs';
export declare const DAYJS_FORMAT_DATE = "YYYY-MM-DD";
export declare const DAYJS_FORMAT_TIME_SECONDS = "HH:mm:ss";
export declare const DAYJS_FORMAT_TIME_NO_SECONDS = "HH:mm";
export declare const DAYJS_FORMAT_DATE_TIME: string;
export declare const DAYJS_FORMAT_DATE_DISPLAY = "MMM D, YYYY";
export declare const DAYJS_FORMAT_DATE_DISPLAY_DOW: string;
export declare const DAYJS_FORMAT_TIME_DISPLAY = "h:mm a";
export declare const DAYJS_FORMAT_DATE_TIME_DISPLAY: string;
export declare const DAYJS_FORMAT_DATE_TIME_DISPLAY_DOW: string;
export declare const DAYJS_FORMAT_DATE_DISPLAY_LONG = "MMMM D, YYYY";
export declare const DAYJS_FORMAT_DATE_DISPLAY_DOW_LONG: string;
export declare const DAYJS_FORMAT_DATE_TIME_DISPLAY_LONG: string;
export declare const DAYJS_FORMAT_DATE_TIME_DISPLAY_DOW_LONG: string;
export declare enum EDateAndOrTime {
    DATE = 0,
    TIME = 1,
    DATETIME = 2
}
export declare type TAnyDateValue = string | Dayjs | Date | null | undefined;
export declare const AnyDateValueIsObject: (value: TAnyDateValue) => boolean;
/**
 * Returns the current time zone.
 */
export declare const DayjsCurrentTimeZone: () => string;
export declare const DayjsTZ: DayjsTimezone;
/**
 * Returns the current olson time zone.
 */
export declare const DayjsCurrentTimeZoneOlson: () => string;
export interface ITZItem {
    zone: string;
    olson: string;
    hours: string;
}
/**
 * Returns a list of olson time zone items, sorted by hour diff from UTC
 *
 * Defaults to 'US'
 */
export declare const TimeZoneOlsons: () => ITZItem[];
/**
 * Display timezone and olson
 */
export declare const DisplayTZItem: (tzItem: ITZItem | undefined | null) => string;
/**
 * Current time in ISO string format
 */
export declare const NowISOString: () => string;
export declare const nowDateTime: () => string;
export declare const IsDateString: (value: any) => boolean;
/**
 * Returns the Dayjs object from a given value. If the given value is invalid,
 * it returns null.
 *
 *
 * @example
 * // returns Dayjs<2020-10-02T00:00:00Z>
 * DayjsFromString('2020-10-02')
 */
export declare const DayjsFromString: (value: TAnyDateValue) => Dayjs | null;
/**
 * Does the same thing as DayjsFromString() but instead returns a string based on the format specified.
 *
 * @example
 * // returns "Oct 2, 2020"
 * DayjsFromString('2020-10-02', 'll')
 */
export declare const DayjsFormatString: (value: TAnyDateValue, format: string, inUTC: boolean) => string | null;
/**
 * Returns the dayjs time string in the format of "HH:mm:ss".
 */
export declare const DayjsTimeString: (value: TAnyDateValue) => string | null;
/**
 * Returns the dayjs date string in the format of "YYYY-MM-DD".
 */
export declare const DayjsDateString: (value: TAnyDateValue) => string | null;
/**
 * Returns the dayjs date string in the format of "YYYY-MM-DD HH:mm:ss".
 */
export declare const DayjsDateTimeString: (value: TAnyDateValue) => string | null;
/**
 * Returns display day date time format.
 */
export declare const DayjsDisplayDayDateTime: (value: TAnyDateValue, showLong?: boolean) => string | null;
/**
 * Returns display day date format.
 */
export declare const DayjsDisplayDayDate: (value: TAnyDateValue, showLong?: boolean) => string | null;
/**
 * Returns display day date time format with day of week.
 */
export declare const DayjsDisplayDayDateTimeDoW: (value: TAnyDateValue, showLong?: boolean) => string | null;
/**
 * Returns display day date format with day of week.
 */
export declare const DayjsDisplayDayDateDoW: (value: TAnyDateValue, showLong?: boolean) => string | null;
/**
 * Returns the time with 12-hour clock format.
 */
export declare const DayjsDisplayTime: (value: TAnyDateValue) => string | null;
/**
 * Displays difference between two times in a simplified duration format.
 *
 * If the second parameter is empty, the current date/time is used.
 *
 * @example
 * DayjsDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30m 20s
 * DayjsDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30m 20s
 */
export declare const DayjsDurationShortText: (start: TAnyDateValue, end?: TAnyDateValue) => string;
/**
 * Displays difference between two times in a simplified duration format.
 *
 * If the second parameter is empty, the current date/time is used.
 *
 * @example
 * DayjsDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30 Minutes 20 Seconds
 * DayjsDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30 Minutes 20 Seconds
 */
export declare const DayjsDurationLongText: (start: TAnyDateValue, end?: TAnyDateValue, trimSeconds?: boolean) => string;
/**
 * Displays a simplified duration format from seconds.
 *
 * @example
 * DayjsDurationShortText((30 * 60) + 20) // result: 30m 20s
 */
export declare const DurationShortText: (seconds: number) => string;
/**
 * Displays a simplified duration format from seconds.
 *
 * @example
 * DayjsDurationShortText((30 * 60) + 20) // result: 30 Minutes 20 Seconds
 */
export declare const DurationLongText: (seconds: number, trimSeconds?: boolean) => string;
/**
 * Displays difference between two times in a simplified duration format.  The format will always show down to the second, and will always align in columns vertically (e.g. padding so that the length of '12' is the same as ' 2')
 *
 * If the second parameter is empty, the current date/time is used.
 
 * @example
 * DayjsDurationShortTextAligned('2020-01-01 13:00:00', '2020-01-03 14:30:20') // result: 2D  1h 30m 20s
 */
export declare const DayjsDurationShortTextAligned: (start: TAnyDateValue, end?: TAnyDateValue) => string;
export declare const DayjsStringToDateLocale: (value: TAnyDateValue) => string;
export declare const DateAndTimeToDateTime: (valueDate: TAnyDateValue, valueTime: string | null) => string;
export declare const DayjsID: (value?: TAnyDateValue, offsetHours?: number) => string | null;
export declare const IANAZoneAbbr: (ianaValue: string) => string;
export declare const DayjsAddWeekDays: (weekDays: number, value?: TAnyDateValue) => Dayjs;
export declare const DayjsWeekDays: (startDate: TAnyDateValue, endDate?: TAnyDateValue) => number;
export declare const DateICS: (date?: any) => string | null;
