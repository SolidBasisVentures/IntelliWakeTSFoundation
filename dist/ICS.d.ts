export declare namespace ICS {
    interface IEvent {
        dateTimeStart: string;
        dateTimeEnd: string;
        UID: string;
        subject: string;
        location: string;
        description: string;
        priority?: 1 | 2 | 3 | 4 | 5;
        alarmTriggerMinutes?: number;
        dateTimeCreated?: string;
        dateTimeModified?: string;
        organizerName?: string;
        organizerEmail?: string;
    }
    const Header: (filenameNoExtension?: string) => {
        'Content-Type': string;
        'Content-Disposition': string;
    };
    const VCALENDAROpen_Text = "BEGIN:VCALENDAR\nPRODID:-//Microsoft Corporation//Outlook 12.0 MIMEDIR//EN\nVERSION:2.0\nMETHOD:PUBLISH\nX-MS-OLK-FORCEINSPECTOROPEN:TRUE\n";
    const VCALENDARClose_Text = "END:VCALENDAR\n";
    const VEVENT_Text: (event: IEvent) => string;
    const ICS_Text: (event: IEvent) => string;
}
