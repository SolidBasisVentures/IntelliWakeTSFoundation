export declare const DATE_FORMAT_DATE = "YYYY-MM-DD";
export declare const DATE_FORMAT_TIME_SECONDS = "HH:mm:ss";
export declare const DATE_FORMAT_TIME_NO_SECONDS = "HH:mm";
export declare const DATE_FORMAT_DATE_TIME: string;
export declare const DATE_FORMAT_DATE_DISPLAY = "MMM D, YYYY";
export declare const DATE_FORMAT_DATE_DISPLAY_DOW: string;
export declare const DATE_FORMAT_TIME_DISPLAY = "h:mm a";
export declare const DATE_FORMAT_DATE_TIME_DISPLAY: string;
export declare const DATE_FORMAT_DATE_TIME_DISPLAY_DOW: string;
export declare const DATE_FORMAT_DATE_DISPLAY_LONG = "MMMM D, YYYY";
export declare const DATE_FORMAT_DATE_DISPLAY_DOW_LONG: string;
export declare const DATE_FORMAT_DATE_TIME_DISPLAY_LONG: string;
export declare const DATE_FORMAT_DATE_TIME_DISPLAY_DOW_LONG: string;
export declare type TDateOnlyDuration = 'year' | 'years' | 'quarter' | 'quarters' | 'month' | 'months' | 'week' | 'weeks' | 'day' | 'days';
export declare type TTimeOnlyDuration = 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds' | 'millisecond' | 'milliseconds';
export declare type TDuration = TDateOnlyDuration | TTimeOnlyDuration;
export declare type TDateOnlyAdjustment = {
    [key in TDateOnlyDuration]?: number | 'StartOf' | 'EndOf';
};
export declare type TTimeOnlyAdjustment = {
    [key in TTimeOnlyDuration]?: number | 'StartOf' | 'EndOf';
};
export declare type TAdjustment = {
    [key in TDuration]?: number | 'StartOf' | 'EndOf';
};
/**
 * Current time in ISO string format
 */
export declare const NowISOString: () => string;
export declare const CurrentTimeZone: () => string;
export declare const IANAOffset: (timeZone?: string | undefined, sourceDate?: TDateAny) => number | null;
export declare const StringHasTimeData: (value: string) => boolean;
export declare const StringHasDateData: (value: string) => boolean;
export declare const StringHasTimeZoneData: (value: string) => boolean;
export declare const IsDateString: (value: any) => boolean;
export declare type TDateAny = Date | number | 'now' | 'today' | string | null | undefined;
export declare const ManualParse: (date: string) => number | null;
export declare type TDateParseOptions = TAdjustment & {
    timezoneSource?: string;
    ignoreIANA?: boolean;
};
export declare const DateParseTS: (date: TDateAny, adjustements?: TDateParseOptions | undefined) => number | null;
export declare const DateISO: (date: TDateAny, adjustements?: TDateParseOptions | undefined) => string | null;
export declare const DateObject: (date: TDateAny, adjustements?: TDateParseOptions | undefined) => Date | null;
export declare const DateICS: (date: TDateAny, adjustements?: TDateParseOptions | undefined) => string | null;
export declare type TDateFormat = 'Local' | 'LocalDoW' | 'LocalDateTime' | 'LocalDoWTime' | 'Date' | 'DateTime' | 'DisplayDate' | 'DisplayTime' | 'DisplayDateDoW' | 'DisplayDateTime' | 'DisplayDateDoWTime' | 'DisplayDateLong' | 'DisplayDateDoWLong' | 'DisplayDateTimeLong' | 'DisplayDateDoWTimeLong';
export declare const DateFormatAny: (format: TDateFormat | string, date: TDateAny, timezoneDisplay?: string | undefined, timezoneSource?: string | undefined) => string | null;
export declare const DateFormat: (format: TDateFormat, date: TDateAny, timezoneDisplay?: string | undefined, timezoneSource?: string | undefined) => string | null;
export declare const YYYYMMDDHHmmss: (date: TDateAny) => string;
export declare const YYYY_MM_DD_HH_mm_ss: (date: TDateAny) => string;
export declare const YYYYsMMsDDsHHcmmcss: (date: TDateAny) => string;
export declare const YYYYsMMsDD: (date: TDateAny) => string;
export declare const HHcmmcss: (date: TDateAny) => string;
export declare const MonthNames: string[];
export declare const WeekDays: string[];
export declare const TSYearsEstimate: (ts: number) => number;
export declare const TSMonthsEstimate: (ts: number, withinYear?: boolean | undefined) => number;
export declare const TSWeeks: (ts: number) => number;
export declare const TSDays: (ts: number, withinMonth?: boolean | undefined) => number;
export declare const TSHours: (ts: number, withinDay?: boolean | undefined) => number;
export declare const TSMinutes: (ts: number, withinHour?: boolean | undefined) => number;
export declare const TSSeconds: (ts: number, withinMinute?: boolean | undefined) => number;
export declare const DateAdjustTS: (date: TDateAny, adjustments: TAdjustment) => number | null;
export declare const DateDiff: (dateFrom: TDateAny, dateTo: TDateAny, duration: TDuration) => number | null;
export declare const DateWeekNumber: (date: TDateAny) => number | null;
export declare const DateDiffComponents: (dateFrom: TDateAny, dateTo: TDateAny) => {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
};
export declare const DateDiffLongDescription: (dateFrom: TDateAny, dateTo: TDateAny, tripToSecondsOrTwo?: boolean, abbreviated?: boolean) => string;
/**
 * Displays a simplified duration format from seconds.
 *
 * @example
 * MomentDurationShortText((30 * 60) + 20) // result: 30 Minutes 20 Seconds
 */
export declare const DurationLongDescription: (seconds: number, tripToSecondsOrTwo?: boolean, abbreviated?: boolean) => string;
export declare const DateCompare: (date1: TDateAny, evalType: 'IsSame' | 'IsBefore' | 'IsAfter' | 'IsSameOrBefore' | 'IsSameOrAfter', date2: TDateAny | TDateParseOptions, minInterval?: "year" | "years" | "quarter" | "quarters" | "month" | "months" | "week" | "weeks" | "day" | "days" | "hour" | "hours" | "minute" | "minutes" | "second" | "seconds" | "millisecond" | "milliseconds" | undefined) => boolean;
export declare const SortCompareDateNull: (date1: TDateAny, date2: TDateAny, minInterval?: "year" | "years" | "quarter" | "quarters" | "month" | "months" | "week" | "weeks" | "day" | "days" | "hour" | "hours" | "minute" | "minutes" | "second" | "seconds" | "millisecond" | "milliseconds" | undefined) => number | null;
export declare const SortCompareDate: (date1: TDateAny, date2: TDateAny, minInterval?: "year" | "years" | "quarter" | "quarters" | "month" | "months" | "week" | "weeks" | "day" | "days" | "hour" | "hours" | "minute" | "minutes" | "second" | "seconds" | "millisecond" | "milliseconds" | undefined) => number;
export declare enum EQuarter {
    Q1 = 1,
    Q2 = 2,
    Q3 = 3,
    Q4 = 4
}
export interface IDates {
    start: string;
    end: string;
}
export declare const DatesQuarter: (year: number, quarter: EQuarter) => IDates | null;
export interface IQuarter {
    year: number;
    quarter: EQuarter;
}
export declare const initialDateQuarter: () => IQuarter;
export declare const DateQuarter: (date: TDateAny) => IQuarter | null;
/**
 * 0 = Sunday
 *
 * @param date
 * @constructor
 */
export declare const DateDayOfWeek: (date: TDateAny) => number | null;
export declare const DateOnly: (date: TDateAny, adjustments?: (TDateOnlyAdjustment & {
    formatLocale?: boolean | undefined;
}) | undefined) => string;
export declare const TimeOnly: (time: TDateAny, adjustments?: (TTimeOnlyAdjustment & {
    formatLocale?: boolean | undefined;
}) | undefined) => string | null;
/**
 * Generates a series of times, starting with the first time (default '00:00') and ending BEFORE the end time (default: '24:00')
 *
 * @param minuteIntervals
 * @param startTimeInclusive
 * @param endTimeNotInclusive
 * @constructor
 */
export declare const TimeSeries: (minuteIntervals: number, startTimeInclusive?: string, endTimeNotInclusive?: string) => string[];
