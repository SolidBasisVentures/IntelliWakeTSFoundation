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
} | {
    week?: number | 'StartOf' | 'StartOfMon' | 'EndOf';
} | {
    weeks?: number | 'StartOf' | 'StartOfMon' | 'EndOf';
};
export declare type TTimeOnlyAdjustment = {
    [key in TTimeOnlyDuration]?: number | 'StartOf' | 'EndOf';
};
export declare type TAdjustment = {
    [key in TDuration]?: number | 'StartOf' | 'EndOf';
} | {
    week?: number | 'StartOf' | 'StartOfMon' | 'EndOf';
} | {
    weeks?: number | 'StartOf' | 'StartOfMon' | 'EndOf';
};
/**
 * Current time in ISO string format
 */
export declare const NowISOString: (adjustment?: {
    year?: number | "StartOf" | "EndOf" | undefined;
    years?: number | "StartOf" | "EndOf" | undefined;
    quarter?: number | "StartOf" | "EndOf" | undefined;
    quarters?: number | "StartOf" | "EndOf" | undefined;
    month?: number | "StartOf" | "EndOf" | undefined;
    months?: number | "StartOf" | "EndOf" | undefined;
    week?: number | "StartOf" | "EndOf" | undefined;
    weeks?: number | "StartOf" | "EndOf" | undefined;
    day?: number | "StartOf" | "EndOf" | undefined;
    days?: number | "StartOf" | "EndOf" | undefined;
    hour?: number | "StartOf" | "EndOf" | undefined;
    hours?: number | "StartOf" | "EndOf" | undefined;
    minute?: number | "StartOf" | "EndOf" | undefined;
    minutes?: number | "StartOf" | "EndOf" | undefined;
    second?: number | "StartOf" | "EndOf" | undefined;
    seconds?: number | "StartOf" | "EndOf" | undefined;
    millisecond?: number | "StartOf" | "EndOf" | undefined;
    milliseconds?: number | "StartOf" | "EndOf" | undefined;
} | {
    week?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} | {
    weeks?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} | undefined) => string;
export declare const CurrentTimeZone: () => string;
export declare const IANAOffset: (timeZone?: string | null | undefined, sourceDate?: TDateAny) => number | null;
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
export declare const DateParseTS: (date: TDateAny, adjustments?: ({
    year?: number | "StartOf" | "EndOf" | undefined;
    years?: number | "StartOf" | "EndOf" | undefined;
    quarter?: number | "StartOf" | "EndOf" | undefined;
    quarters?: number | "StartOf" | "EndOf" | undefined;
    month?: number | "StartOf" | "EndOf" | undefined;
    months?: number | "StartOf" | "EndOf" | undefined;
    week?: number | "StartOf" | "EndOf" | undefined;
    weeks?: number | "StartOf" | "EndOf" | undefined;
    day?: number | "StartOf" | "EndOf" | undefined;
    days?: number | "StartOf" | "EndOf" | undefined;
    hour?: number | "StartOf" | "EndOf" | undefined;
    hours?: number | "StartOf" | "EndOf" | undefined;
    minute?: number | "StartOf" | "EndOf" | undefined;
    minutes?: number | "StartOf" | "EndOf" | undefined;
    second?: number | "StartOf" | "EndOf" | undefined;
    seconds?: number | "StartOf" | "EndOf" | undefined;
    millisecond?: number | "StartOf" | "EndOf" | undefined;
    milliseconds?: number | "StartOf" | "EndOf" | undefined;
} & {
    timezoneSource?: string | undefined;
    ignoreIANA?: boolean | undefined;
}) | ({
    week?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} & {
    timezoneSource?: string | undefined;
    ignoreIANA?: boolean | undefined;
}) | ({
    weeks?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} & {
    timezoneSource?: string | undefined;
    ignoreIANA?: boolean | undefined;
}) | undefined) => number | null;
export declare const DateISO: (date: TDateAny, adjustments?: ({
    year?: number | "StartOf" | "EndOf" | undefined;
    years?: number | "StartOf" | "EndOf" | undefined;
    quarter?: number | "StartOf" | "EndOf" | undefined;
    quarters?: number | "StartOf" | "EndOf" | undefined;
    month?: number | "StartOf" | "EndOf" | undefined;
    months?: number | "StartOf" | "EndOf" | undefined;
    week?: number | "StartOf" | "EndOf" | undefined;
    weeks?: number | "StartOf" | "EndOf" | undefined;
    day?: number | "StartOf" | "EndOf" | undefined;
    days?: number | "StartOf" | "EndOf" | undefined;
    hour?: number | "StartOf" | "EndOf" | undefined;
    hours?: number | "StartOf" | "EndOf" | undefined;
    minute?: number | "StartOf" | "EndOf" | undefined;
    minutes?: number | "StartOf" | "EndOf" | undefined;
    second?: number | "StartOf" | "EndOf" | undefined;
    seconds?: number | "StartOf" | "EndOf" | undefined;
    millisecond?: number | "StartOf" | "EndOf" | undefined;
    milliseconds?: number | "StartOf" | "EndOf" | undefined;
} & {
    timezoneSource?: string | undefined;
    ignoreIANA?: boolean | undefined;
}) | ({
    week?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} & {
    timezoneSource?: string | undefined;
    ignoreIANA?: boolean | undefined;
}) | ({
    weeks?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} & {
    timezoneSource?: string | undefined;
    ignoreIANA?: boolean | undefined;
}) | undefined) => string | null;
export declare const DateObject: (date: TDateAny, adjustments?: ({
    year?: number | "StartOf" | "EndOf" | undefined;
    years?: number | "StartOf" | "EndOf" | undefined;
    quarter?: number | "StartOf" | "EndOf" | undefined;
    quarters?: number | "StartOf" | "EndOf" | undefined;
    month?: number | "StartOf" | "EndOf" | undefined;
    months?: number | "StartOf" | "EndOf" | undefined;
    week?: number | "StartOf" | "EndOf" | undefined;
    weeks?: number | "StartOf" | "EndOf" | undefined;
    day?: number | "StartOf" | "EndOf" | undefined;
    days?: number | "StartOf" | "EndOf" | undefined;
    hour?: number | "StartOf" | "EndOf" | undefined;
    hours?: number | "StartOf" | "EndOf" | undefined;
    minute?: number | "StartOf" | "EndOf" | undefined;
    minutes?: number | "StartOf" | "EndOf" | undefined;
    second?: number | "StartOf" | "EndOf" | undefined;
    seconds?: number | "StartOf" | "EndOf" | undefined;
    millisecond?: number | "StartOf" | "EndOf" | undefined;
    milliseconds?: number | "StartOf" | "EndOf" | undefined;
} & {
    timezoneSource?: string | undefined;
    ignoreIANA?: boolean | undefined;
}) | ({
    week?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} & {
    timezoneSource?: string | undefined;
    ignoreIANA?: boolean | undefined;
}) | ({
    weeks?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} & {
    timezoneSource?: string | undefined;
    ignoreIANA?: boolean | undefined;
}) | undefined) => Date | null;
export declare const DateICS: (date: TDateAny, adjustments?: ({
    year?: number | "StartOf" | "EndOf" | undefined;
    years?: number | "StartOf" | "EndOf" | undefined;
    quarter?: number | "StartOf" | "EndOf" | undefined;
    quarters?: number | "StartOf" | "EndOf" | undefined;
    month?: number | "StartOf" | "EndOf" | undefined;
    months?: number | "StartOf" | "EndOf" | undefined;
    week?: number | "StartOf" | "EndOf" | undefined;
    weeks?: number | "StartOf" | "EndOf" | undefined;
    day?: number | "StartOf" | "EndOf" | undefined;
    days?: number | "StartOf" | "EndOf" | undefined;
    hour?: number | "StartOf" | "EndOf" | undefined;
    hours?: number | "StartOf" | "EndOf" | undefined;
    minute?: number | "StartOf" | "EndOf" | undefined;
    minutes?: number | "StartOf" | "EndOf" | undefined;
    second?: number | "StartOf" | "EndOf" | undefined;
    seconds?: number | "StartOf" | "EndOf" | undefined;
    millisecond?: number | "StartOf" | "EndOf" | undefined;
    milliseconds?: number | "StartOf" | "EndOf" | undefined;
} & {
    timezoneSource?: string | undefined;
    ignoreIANA?: boolean | undefined;
}) | ({
    week?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} & {
    timezoneSource?: string | undefined;
    ignoreIANA?: boolean | undefined;
}) | ({
    weeks?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} & {
    timezoneSource?: string | undefined;
    ignoreIANA?: boolean | undefined;
}) | undefined) => string | null;
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
export interface IWeekNumber {
    year: number;
    week: number;
}
export declare const DateComponent: (component: 'YYYY' | 'MM' | 'DD' | 'HH' | 'mm' | 'ss', date?: TDateAny, adjustments?: {
    year?: number | "StartOf" | "EndOf" | undefined;
    years?: number | "StartOf" | "EndOf" | undefined;
    quarter?: number | "StartOf" | "EndOf" | undefined;
    quarters?: number | "StartOf" | "EndOf" | undefined;
    month?: number | "StartOf" | "EndOf" | undefined;
    months?: number | "StartOf" | "EndOf" | undefined;
    week?: number | "StartOf" | "EndOf" | undefined;
    weeks?: number | "StartOf" | "EndOf" | undefined;
    day?: number | "StartOf" | "EndOf" | undefined;
    days?: number | "StartOf" | "EndOf" | undefined;
    hour?: number | "StartOf" | "EndOf" | undefined;
    hours?: number | "StartOf" | "EndOf" | undefined;
    minute?: number | "StartOf" | "EndOf" | undefined;
    minutes?: number | "StartOf" | "EndOf" | undefined;
    second?: number | "StartOf" | "EndOf" | undefined;
    seconds?: number | "StartOf" | "EndOf" | undefined;
    millisecond?: number | "StartOf" | "EndOf" | undefined;
    milliseconds?: number | "StartOf" | "EndOf" | undefined;
} | {
    week?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} | {
    weeks?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} | undefined) => number;
export declare const DateWeekNumber: (date?: TDateAny, adjustments?: {
    year?: number | "StartOf" | "EndOf" | undefined;
    years?: number | "StartOf" | "EndOf" | undefined;
    quarter?: number | "StartOf" | "EndOf" | undefined;
    quarters?: number | "StartOf" | "EndOf" | undefined;
    month?: number | "StartOf" | "EndOf" | undefined;
    months?: number | "StartOf" | "EndOf" | undefined;
    week?: number | "StartOf" | "EndOf" | undefined;
    weeks?: number | "StartOf" | "EndOf" | undefined;
    day?: number | "StartOf" | "EndOf" | undefined;
    days?: number | "StartOf" | "EndOf" | undefined;
    hour?: number | "StartOf" | "EndOf" | undefined;
    hours?: number | "StartOf" | "EndOf" | undefined;
    minute?: number | "StartOf" | "EndOf" | undefined;
    minutes?: number | "StartOf" | "EndOf" | undefined;
    second?: number | "StartOf" | "EndOf" | undefined;
    seconds?: number | "StartOf" | "EndOf" | undefined;
    millisecond?: number | "StartOf" | "EndOf" | undefined;
    milliseconds?: number | "StartOf" | "EndOf" | undefined;
} | {
    week?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} | {
    weeks?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} | undefined) => IWeekNumber | null;
export declare const DateFromWeekNumber: (weekNumber: IWeekNumber, startOf?: 'StartOf' | 'StartOfMon') => string;
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
export declare const InitialDateQuarter: () => IQuarter;
export declare const DateQuarter: (date: TDateAny) => IQuarter | null;
/**
 * 0 = Sunday
 *
 * @param date
 * @constructor
 */
export declare const DateDayOfWeek: (date: TDateAny) => number | null;
export declare const DateOnlyNull: (date: TDateAny, adjustments?: ({
    year?: number | "StartOf" | "EndOf" | undefined;
    years?: number | "StartOf" | "EndOf" | undefined;
    quarter?: number | "StartOf" | "EndOf" | undefined;
    quarters?: number | "StartOf" | "EndOf" | undefined;
    month?: number | "StartOf" | "EndOf" | undefined;
    months?: number | "StartOf" | "EndOf" | undefined;
    week?: number | "StartOf" | "EndOf" | undefined;
    weeks?: number | "StartOf" | "EndOf" | undefined;
    day?: number | "StartOf" | "EndOf" | undefined;
    days?: number | "StartOf" | "EndOf" | undefined;
} & {
    formatLocale?: boolean | undefined;
    timezoneDisplay?: string | undefined;
}) | ({
    week?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} & {
    formatLocale?: boolean | undefined;
    timezoneDisplay?: string | undefined;
}) | ({
    weeks?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} & {
    formatLocale?: boolean | undefined;
    timezoneDisplay?: string | undefined;
}) | undefined) => string | null;
export declare const DateOnly: (date: TDateAny, adjustments?: ({
    year?: number | "StartOf" | "EndOf" | undefined;
    years?: number | "StartOf" | "EndOf" | undefined;
    quarter?: number | "StartOf" | "EndOf" | undefined;
    quarters?: number | "StartOf" | "EndOf" | undefined;
    month?: number | "StartOf" | "EndOf" | undefined;
    months?: number | "StartOf" | "EndOf" | undefined;
    week?: number | "StartOf" | "EndOf" | undefined;
    weeks?: number | "StartOf" | "EndOf" | undefined;
    day?: number | "StartOf" | "EndOf" | undefined;
    days?: number | "StartOf" | "EndOf" | undefined;
} & {
    formatLocale?: boolean | undefined;
    timezoneDisplay?: string | undefined;
}) | ({
    week?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} & {
    formatLocale?: boolean | undefined;
    timezoneDisplay?: string | undefined;
}) | ({
    weeks?: number | "StartOf" | "EndOf" | "StartOfMon" | undefined;
} & {
    formatLocale?: boolean | undefined;
    timezoneDisplay?: string | undefined;
}) | undefined) => string;
/**
 * Convert a date and/or time value to a time
 * @param time
 * @param adjustments
 * @constructor
 */
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
export declare const TimeSeries: (minuteIntervals: number, startTimeInclusive?: TDateAny, endTimeNotInclusive?: TDateAny) => string[];
/**
 * Adjusts a time or date/time to the floor of minutes specified in the increment
 *
 * @param time
 * @param minuteIncrement
 * @constructor
 */
export declare const TimeFloorMinute: (time: TDateAny, minuteIncrement?: number) => string | null;
export declare const ESTTodayDateTimeLabel: () => string;
export declare const ESTTodayDate: () => string;
export declare const WeeksFromLabel: (date: string, startOf: 'StartOf' | 'StartOfMon', compareDate?: string) => string;
export declare const DateDoWSundayZero: (date?: TDateAny) => number | null;
export declare const DateIsWeekend: (date?: TDateAny) => boolean;
export declare const DatesBetween: (start: TDateAny, end: TDateAny, adjustments?: TDateOnlyAdjustment, limit?: number) => string[];
export declare type TTimeZoneOlsonStructure = {
    group: string;
    zones: {
        value: string;
        name: string;
    }[];
};
export declare const TimeZoneOlsonsAll: TTimeZoneOlsonStructure[];
export declare const TimeZoneOlsonsAmerica: () => string[];
export declare const TimeZoneOlsonsAmericaCommon: () => string[];
export declare function IANAZoneAbbr(date: TDateAny): string;
