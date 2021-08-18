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
/**
 * Current time in ISO string format
 */
export declare const NowISOString: () => string;
export declare const StringHasTimeData: (value: string) => boolean;
export declare const StringHasDateData: (value: string) => boolean;
export declare const StringHasTimeZoneData: (value: string) => boolean;
export declare const IsDateString: (value: any) => boolean;
export declare const DateParseTS: (date?: string | number | null | undefined) => number | null;
export declare const DateISO: (date?: string | number | null | undefined) => string | null;
export declare const DateObject: (date?: string | number | null | undefined) => Date | null;
export declare const DateICS: (date?: string | null | undefined) => string | null;
export declare const DateFormat: (date: number | string | null, format: string) => string | null;
export declare const YYYYMMDDHHmmss: (ts?: number | null | undefined) => string;
export declare const YYYY_MM_DD_HH_mm_ss: (ts?: number | null | undefined) => string;
export declare const YYYYsMMsDDsHHcmmcss: (ts?: number | null | undefined) => string;
export declare const YYYYsMMsDD: (ts?: number | null | undefined) => string;
export declare const HHcmmcss: (ts?: number | null | undefined) => string;
export declare const MonthNames: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
    12: string;
};
export declare const WeekDays: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
};
export declare const TSYearsEstimate: (ts: number) => number;
export declare const TSMonthsEstimate: (ts: number, withinYear?: boolean | undefined) => number;
export declare const TSWeeks: (ts: number) => number;
export declare const TSDays: (ts: number, withinMonth?: boolean | undefined) => number;
export declare const TSHours: (ts: number, withinDay?: boolean | undefined) => number;
export declare const TSMinutes: (ts: number, withinHour?: boolean | undefined) => number;
export declare const TSSeconds: (ts: number, withinMinute?: boolean | undefined) => number;
/**
 * Displays a simplified duration format from seconds.
 *
 * @example
 * MomentDurationShortText((30 * 60) + 20) // result: 30 Minutes 20 Seconds
 */
export declare const DurationLongDescription: (seconds: number, trimSeconds?: boolean) => string;
