import { Moment } from 'moment-timezone';
export declare const MOMENT_FORMAT_DATE = "YYYY-MM-DD";
export declare const MOMENT_FORMAT_TIME_SECONDS = "HH:mm:ss";
export declare const MOMENT_FORMAT_TIME_NO_SECONDS = "HH:mm";
export declare const MOMENT_FORMAT_DATE_TIME: string;
export declare const MOMENT_FORMAT_DATE_DISPLAY_NO_YEAR = "ddd, MMM D";
export declare const MOMENT_FORMAT_DATE_DISPLAY: string;
export declare const MOMENT_FORMAT_TIME_DISPLAY = "h:mm a";
export declare const MOMENT_FORMAT_DATE_TIME_DISPLAY_NO_YEAR: string;
export declare const MOMENT_FORMAT_DATE_TIME_DISPLAY: string;
export declare enum EDateAndOrTime {
    DATE = 0,
    TIME = 1,
    DATETIME = 2
}
/**
 * Returns the current time zone.
 */
export declare const MomentCurrentTimeZone: () => string;
/**
 * Current time in ISO string format
 */
export declare const NowISOString: () => string;
/**
 * Returns the Moment object from a given value. If the given value is invalid,
 * it returns null.
 *
 *
 * @example
 * // returns Moment<2020-10-02T00:00:00Z>
 * MomentFromString('2020-10-02')
 */
export declare const MomentFromString: (value: string | Moment | Date | null | undefined) => Moment | null;
/**
 * Does the same thing as MomentFromString() but instead returns a string based on the format specified.
 *
 * @example
 * // returns "Oct 2, 2020"
 * MomentFromString('2020-10-02', 'll')
 */
export declare const MomentFormatString: (value: string | Moment | Date | null | undefined, format: string) => string | null;
/**
 * Returns the moment time string in the format of "HH:mm:ss".
 */
export declare const MomentTimeString: (value: string | Moment | Date | null | undefined) => string | null;
/**
 * Returns the moment date string in the format of "YYYY-MM-DD".
 */
export declare const MomentDateString: (value: string | Moment | Date | null | undefined) => string | null;
/**
 * Returns the moment date string in the format of "YYYY-MM-DD HH:mm:ss".
 */
export declare const MomentDateTimeString: (value: string | Moment | Date | null | undefined) => string | null;
/**
 * Returns display day date time format. Includes the year if the current year
 * is not the same with the given year.
 */
export declare const MomentDisplayDayDateTime: (value: string | Moment | Date | null | undefined, showYear?: boolean) => string | null;
/**
 * Returns display day date format. Includes the year if the current year
 * is not the same with the given year.
 */
export declare const MomentDisplayDayDate: (value: string | Moment | Date | null | undefined, showYear?: boolean) => string | null;
/**
 * Returns the time with 12-hour clock format.
 */
export declare const MomentDisplayTime: (value: string | Moment | Date | null | undefined) => string | null;
/**
 * Displays difference between two times in a simplified duration format.
 *
 * If the second parameter is empty, the current date/time is used.
 *
 * @example
 * MomentDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30m 20s
 * MomentDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30m 20s
 */
export declare const MomentDurationShortText: (start: string | Moment | Date, end?: string | Moment | Date | undefined) => string;
/**
 * Displays difference between two times in a simplified duration format.  The format will always show down to the second, and will always align in columns vertically (e.g. padding so that the length of '12' is the same as ' 2')
 *
 * If the second parameter is empty, the current date/time is used.
 
 * @example
 * MomentDurationShortTextAligned('2020-01-01 13:00:00', '2020-01-03 14:30:20') // result: 2D  1h 30m 20s
 */
export declare const MomentDurationShortTextAligned: (start: string | Moment | Date, end?: string | Moment | Date | undefined) => string;
