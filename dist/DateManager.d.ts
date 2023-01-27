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
export declare const NowISOString: (adjustment?: TAdjustment) => string;
export declare const CurrentTimeZone: () => string;
export declare const IANAOffset: (timeZone?: string | null, sourceDate?: TDateAny) => number | null;
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
export declare const DateParseTS: (date: TDateAny, adjustments?: TDateParseOptions) => number | null;
export declare const DateISO: (date: TDateAny, adjustments?: TDateParseOptions) => string | null;
export declare const DateObject: (date: TDateAny, adjustments?: TDateParseOptions) => Date | null;
export declare const DateICS: (date: TDateAny, adjustments?: TDateParseOptions) => string | null;
export declare type TDateFormat = 'Local' | 'LocalDoW' | 'LocalDateTime' | 'LocalDoWTime' | 'Date' | 'DateTime' | 'DisplayDate' | 'DisplayTime' | 'DisplayDateDoW' | 'DisplayDateTime' | 'DisplayDateDoWTime' | 'DisplayDateLong' | 'DisplayDateDoWLong' | 'DisplayDateTimeLong' | 'DisplayDateDoWTimeLong';
export declare const DateFormatAny: (format: TDateFormat | string, date: TDateAny, timezoneDisplay?: string, timezoneSource?: string) => string | null;
export declare const DateFormat: (format: TDateFormat, date: TDateAny, timezoneDisplay?: string, timezoneSource?: string) => string | null;
export declare const YYYYMMDDHHmmss: (date: TDateAny) => string;
export declare const YYYY_MM_DD_HH_mm_ss: (date: TDateAny) => string;
export declare const YYYYsMMsDDsHHcmmcss: (date: TDateAny) => string;
export declare const YYYYsMMsDD: (date: TDateAny) => string;
export declare const HHcmmcss: (date: TDateAny) => string;
export declare const MonthNames: string[];
export declare const WeekDays: string[];
export declare const TSYearsEstimate: (ts: number) => number;
export declare const TSMonthsEstimate: (ts: number, withinYear?: boolean) => number;
export declare const TSWeeks: (ts: number) => number;
export declare const TSDays: (ts: number, withinMonth?: boolean) => number;
export declare const TSHours: (ts: number, withinDay?: boolean) => number;
export declare const TSMinutes: (ts: number, withinHour?: boolean) => number;
export declare const TSSeconds: (ts: number, withinMinute?: boolean) => number;
export declare const DaysInMonthYear: (year: number, month: number) => number | null;
export declare const DaysInMonth: (date: TDateAny) => number | null;
export declare const DateAdjustTS: (date: TDateAny, adjustments: TAdjustment) => number | null;
export declare const DateDiff: (dateFrom: TDateAny, dateTo: TDateAny, duration: TDuration) => number | null;
export interface IWeekNumber {
    year: number;
    week: number;
}
export declare const DateComponent: (component: 'YYYY' | 'MM' | 'DD' | 'HH' | 'mm' | 'ss', date?: TDateAny, adjustments?: TAdjustment) => number;
export declare const DateWeekNumber: (date?: TDateAny, adjustments?: TAdjustment) => IWeekNumber | null;
export declare const DateWeekISONumber: (date?: TDateAny, adjustments?: TAdjustment) => IWeekNumber | null;
export declare const DateFromWeekNumber: (weekNumber: IWeekNumber, startOf?: 'StartOf' | 'StartOfMon') => string | null;
export declare const WeekNumberAdjust: (weekNumber: IWeekNumber, adjustment: TDateOnlyAdjustment | number) => IWeekNumber | null;
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
export declare const DateCompare: (date1: TDateAny, evalType: 'IsSame' | 'IsBefore' | 'IsAfter' | 'IsSameOrBefore' | 'IsSameOrAfter', date2: TDateAny | TDateParseOptions, minInterval?: TDuration) => boolean;
export declare const SortCompareDateNull: (date1: TDateAny, date2: TDateAny, minInterval?: TDuration) => number | null;
export declare const SortCompareDate: (date1: TDateAny, date2: TDateAny, minInterval?: TDuration) => number;
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
export declare const DatesMonth: (year: number, monthOneBased: number) => IDates | null;
export interface IMonth {
    year: number;
    monthOneBased: number;
}
export declare const InitialDateMonth: () => IMonth;
export declare const DateMonth: (date: TDateAny) => IMonth | null;
/**
 * 0 = Sunday
 *
 * @param date
 * @constructor
 */
export declare const DateDayOfWeek: (date: TDateAny) => number | null;
export declare const DateOnlyNull: (date: TDateAny, adjustments?: TDateOnlyAdjustment & {
    formatLocale?: boolean;
    timezoneDisplay?: string;
}) => string | null;
export declare const DateOnly: (date: TDateAny, adjustments?: TDateOnlyAdjustment & {
    formatLocale?: boolean;
    timezoneDisplay?: string;
}) => string;
/**
 * Convert a date and/or time value to a time
 * @param time
 * @param adjustments
 * @constructor
 */
export declare const TimeOnly: (time: TDateAny, adjustments?: TTimeOnlyAdjustment & {
    formatLocale?: boolean;
}) => string | null;
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
export declare function IANAZoneAbbr(date: TDateAny, iana: string | null | undefined): string;
