import moment from 'moment'

export namespace ICS {
	export interface IEvent {
		dateTimeStart: string,
		dateTimeEnd: string,
		UID: string,
		subject: string,
		location: string,
		description: string,
		priority?: 1 | 2 | 3 | 4 | 5,
		alarmTriggerMinutes?: number,
		dateTimeCreated?: string,
		dateTimeModified?: string,
		organizerName?: string
		organizerEmail?: string
	}
	
	export const Header = (filenameNoExtension = 'calendar'): {'Content-Type': string, 'Content-Disposition': string} => ({
		'Content-Type': 'text/Calendar',
		'Content-Disposition': `inline; filename=${filenameNoExtension}.ics`
	})
	
	export const VCALENDAROpen_Text = 'BEGIN:VCALENDAR\nPRODID:-//Microsoft Corporation//Outlook 12.0 MIMEDIR//EN\nVERSION:2.0\nMETHOD:PUBLISH\nX-MS-OLK-FORCEINSPECTOROPEN:TRUE\n'
	
	export const VCALENDARClose_Text = 'END:VCALENDAR\n'
	
	const ICSDateFormat = (date: string | null | undefined): string => !date ? '' : moment(date).toDate().toISOString()
	
	export const VEVENT_Text = (event: IEvent): string => {
		let event_text = ''
		
		event_text += 'BEGIN:VEVENT\n'
		event_text += 'CLASS:PUBLIC\n'
		event_text += 'CREATED:' + ICSDateFormat(event.dateTimeCreated) + '\n'
		
		event_text += 'DESCRIPTION:' + event.description + '\n'
		event_text += 'DTSTART:' + ICSDateFormat(event.dateTimeStart) + '\n'
		event_text += 'DTEND:' + ICSDateFormat(event.dateTimeEnd) + '\n'
		event_text += 'DTSTAMP:' + ICSDateFormat(null) + '\n'
		if (!!event.organizerName && !!event.organizerEmail) {
			event_text += `ORGANIZER;CN=${event.organizerName}:MAILTO:${event.organizerEmail}\n`
		}
		event_text += 'LAST-MODIFIED:' + ICSDateFormat(event.dateTimeModified) + '\n'
		event_text += 'LOCATION:' + event.location + '\n'
		if (!!event.priority !== undefined) {
			event_text += `PRIORITY:${event.priority}\n`
		}
		event_text += 'SEQUENCE:0\n'
//		event += "SUMMARY;LANGUAGE=en-us:" + subject + "\n"
		event_text += 'SUMMARY:' + event.subject + '\n'
		event_text += 'TRANSP:OPAQUE\n'
		event_text += 'UID:' + event.UID + '\n'
		
		if (event.alarmTriggerMinutes !== undefined) {
			event_text += 'BEGIN:VALARM\n'
			event_text += `TRIGGER:'-PT${event.alarmTriggerMinutes}M\n`
			event_text += 'ACTION:DISPLAY\n'
			event_text += 'DESCRIPTION:Reminder\n'
			event_text += 'END:VALARM\n'
		}
		
		event_text += 'END:VEVENT\n'
		
		return event_text
	}
	
	export const ICS_Text = (event: IEvent): string => VCALENDAROpen_Text + VEVENT_Text(event) + VCALENDARClose_Text
}
