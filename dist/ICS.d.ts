export declare namespace ICS {
    interface IEvent {
        dateTimeStart: string;
        dateTimeEnd?: string;
        durationMinutes?: number;
        UID: string;
        subject: string;
        location?: string;
        location_altrep?: string;
        description: string;
        priority?: 1 | 2 | 3 | 4 | 5;
        alarmTriggerMinutes?: number;
        timezone?: string | null;
        dateTimeCreated?: string;
        dateTimeModified?: string;
        organizerName?: string;
        organizerEmail?: string;
    }
    const Header: (filenameNoExtension?: string) => {
        'Content-Type': string;
        'Content-Disposition': string;
    };
    const VCALENDAROpen_Text = "BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n";
    const VCALENDARClose_Text = "END:VCALENDAR\n";
    const VEVENT_Text: (event: IEvent) => string;
    const ICS_Text: (event: IEvent) => string;
}
