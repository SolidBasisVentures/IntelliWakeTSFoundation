import { Moment } from 'moment-timezone';
export declare const MOMENT_FORMAT_DATE = "YYYY-MM-DD";
export declare const MOMENT_FORMAT_TIME_SECONDS = "HH:mm:ss";
export declare const MOMENT_FORMAT_TIME_NO_SECONDS = "HH:mm";
export declare const MOMENT_FORMAT_DATE_TIME: string;
export declare const MOMENT_FORMAT_DATE_DISPLAY = "MMM D, YYYY";
export declare const MOMENT_FORMAT_DATE_DISPLAY_DOW: string;
export declare const MOMENT_FORMAT_TIME_DISPLAY = "h:mm a";
export declare const MOMENT_FORMAT_DATE_TIME_DISPLAY: string;
export declare const MOMENT_FORMAT_DATE_TIME_DISPLAY_DOW: string;
export declare const MOMENT_FORMAT_DATE_DISPLAY_LONG = "MMMM D, YYYY";
export declare const MOMENT_FORMAT_DATE_DISPLAY_DOW_LONG: string;
export declare const MOMENT_FORMAT_DATE_TIME_DISPLAY_LONG: string;
export declare const MOMENT_FORMAT_DATE_TIME_DISPLAY_DOW_LONG: string;
export declare enum EDateAndOrTime {
    DATE = 0,
    TIME = 1,
    DATETIME = 2
}
export declare type TAnyDateValue = string | Moment | Date | null | undefined;
export declare const AnyDateValueIsObject: (value: TAnyDateValue) => boolean;
/**
 * Returns the current time zone.
 */
export declare const MomentCurrentTimeZone: () => string;
/**
 * Returns the current olson time zone.
 */
export declare const MomentCurrentTimeZoneOlson: () => string;
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
export declare const TimeZoneOlsons: (forCountry?: string) => ITZItem[];
/**
 * Display timezone and olson
 */
export declare const DisplayTZItem: (tzItem: ITZItem | undefined | null) => string;
/**
 * Current time in ISO string format
 */
export declare const NowISOString: () => string;
export declare const IsDateString: (value: any) => boolean;
/**
 * Returns the Moment object from a given value. If the given value is invalid,
 * it returns null.
 *
 *
 * @example
 * // returns Moment<2020-10-02T00:00:00Z>
 * MomentFromString('2020-10-02')
 */
export declare const MomentFromString: (value: TAnyDateValue) => Moment | null;
/**
 * Does the same thing as MomentFromString() but instead returns a string based on the format specified.
 *
 * @example
 * // returns "Oct 2, 2020"
 * MomentFromString('2020-10-02', 'll')
 */
export declare const MomentFormatString: (value: TAnyDateValue, format: string) => string | null;
/**
 * Returns the moment time string in the format of "HH:mm:ss".
 */
export declare const MomentTimeString: (value: TAnyDateValue) => string | null;
/**
 * Returns the moment date string in the format of "YYYY-MM-DD".
 */
export declare const MomentDateString: (value: TAnyDateValue) => string | null;
/**
 * Returns the moment date string in the format of "YYYY-MM-DD HH:mm:ss".
 */
export declare const MomentDateTimeString: (value: TAnyDateValue) => string | null;
/**
 * Returns display day date time format.
 */
export declare const MomentDisplayDayDateTime: (value: TAnyDateValue, showLong?: boolean) => string | null;
/**
 * Returns display day date format.
 */
export declare const MomentDisplayDayDate: (value: TAnyDateValue, showLong?: boolean) => string | null;
/**
 * Returns display day date time format with day of week.
 */
export declare const MomentDisplayDayDateTimeDoW: (value: TAnyDateValue, showLong?: boolean) => string | null;
/**
 * Returns display day date format with day of week.
 */
export declare const MomentDisplayDayDateDoW: (value: TAnyDateValue, showLong?: boolean) => string | null;
/**
 * Returns the time with 12-hour clock format.
 */
export declare const MomentDisplayTime: (value: TAnyDateValue) => string | null;
/**
 * Displays difference between two times in a simplified duration format.
 *
 * If the second parameter is empty, the current date/time is used.
 *
 * @example
 * MomentDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30m 20s
 * MomentDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30m 20s
 */
export declare const MomentDurationShortText: (start: TAnyDateValue, end?: TAnyDateValue) => string;
/**
 * Displays difference between two times in a simplified duration format.
 *
 * If the second parameter is empty, the current date/time is used.
 *
 * @example
 * MomentDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30 Minutes 20 Seconds
 * MomentDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30 Minutes 20 Seconds
 */
export declare const MomentDurationLongText: (start: TAnyDateValue, end?: TAnyDateValue, trimSeconds?: boolean) => string;
/**
 * Displays a simplified duration format from seconds.
 *
 * @example
 * MomentDurationShortText((30 * 60) + 20) // result: 30m 20s
 */
export declare const DurationShortText: (seconds: number) => string;
/**
 * Displays a simplified duration format from seconds.
 *
 * @example
 * MomentDurationShortText((30 * 60) + 20) // result: 30 Minutes 20 Seconds
 */
export declare const DurationLongText: (seconds: number, trimSeconds?: boolean) => string;
/**
 * Displays difference between two times in a simplified duration format.  The format will always show down to the second, and will always align in columns vertically (e.g. padding so that the length of '12' is the same as ' 2')
 *
 * If the second parameter is empty, the current date/time is used.
 
 * @example
 * MomentDurationShortTextAligned('2020-01-01 13:00:00', '2020-01-03 14:30:20') // result: 2D  1h 30m 20s
 */
export declare const MomentDurationShortTextAligned: (start: TAnyDateValue, end?: TAnyDateValue) => string;
export declare const MomentStringToDateLocale: (value: TAnyDateValue) => string;
export declare const DateAndTimeToDateTime: (valueDate: TAnyDateValue, valueTime: string | null) => string;
export declare const MomentID: (value?: TAnyDateValue, offsetHours?: number) => string | null;
export declare const IANAZoneAbbr: (ianaValue: string) => any;
export declare const MomentAddWeekDays: (weekDays: number, value?: TAnyDateValue) => Moment;
export declare const MomentWeekDays: (startDate: TAnyDateValue, endDate?: TAnyDateValue) => number;
