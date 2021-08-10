import {DateICS, ReplaceAll} from './Functions'

export namespace ICS {
	export interface IEvent {
		dateTimeStart: string,
		dateTimeEnd?: string,
		durationMinutes?: number,
		UID: string,
		subject: string,
		location?: string,
		location_altrep?: string,
		description: string,
		priority?: 1 | 2 | 3 | 4 | 5,
		alarmTriggerMinutes?: number,
		timezone?: string | null,
		dateTimeCreated?: string,
		dateTimeModified?: string,
		organizerName?: string
		organizerEmail?: string
	}
	
	export const Header = (filenameNoExtension = 'calendar'): {'Content-Type': string, 'Content-Disposition': string} => ({
		'Content-Type': 'text/Calendar',
		'Content-Disposition': `inline; filename=${filenameNoExtension}.ics`
	})
	
	export const VCALENDAROpen_Text = 'BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n'
	
	export const VCALENDARClose_Text = 'END:VCALENDAR\n'
	
	const EscapeText = (text: string): string => ReplaceAll('\r\n', '\\n', ReplaceAll('\n', '\\n', ReplaceAll('\r', '\\n', ReplaceAll(',', '\\,', ReplaceAll(';', '\\;', ReplaceAll('\\', '\\\\', text))))))
	
	export const VEVENT_Text = (event: IEvent): string => {
		let event_text = ''
		
		event_text += 'BEGIN:VEVENT\n'
		event_text += 'CLASS:PUBLIC\n'
		event_text += 'CREATED;' + DateICS(event.dateTimeCreated) + '\n'
		
		event_text += 'DESCRIPTION:' + EscapeText(event.description) + '\n'
		event_text += 'DTSTART;' + DateICS(event.dateTimeStart) + '\n'
		if (!!event.durationMinutes) {
			event_text += 'DURATION:PT' + event.durationMinutes + 'M\n'
		} else if (!!event.dateTimeEnd) {
			event_text += 'DTEND;' + DateICS(event.dateTimeEnd) + '\n'
		}
		event_text += 'DTSTAMP;' + DateICS() + '\n'
		if (!!event.organizerName && !!event.organizerEmail) {
			event_text += `ORGANIZER;CN=${event.organizerName}:MAILTO:${event.organizerEmail}\n`
		}
		event_text += 'LAST-MODIFIED;' + DateICS(event.dateTimeModified ?? new Date().toISOString()) + '\n'
		if (!!event.location) {
			if (!!event.location_altrep) {
				event_text += `LOCATION;ALTREP="${EscapeText(event.location_altrep)}":` + EscapeText(event.location) + '\n'
			} else {
				event_text += 'LOCATION:' + EscapeText(event.location) + '\n'
			}
		}
		if (!!event.priority) {
			event_text += `PRIORITY:${event.priority}\n`
		}
		event_text += 'SEQUENCE:0\n'
//		event += "SUMMARY;LANGUAGE=en-us:" + subject + "\n"
		event_text += 'SUMMARY:' + EscapeText(event.subject) + '\n'
		event_text += 'TRANSP:OPAQUE\n'
		event_text += 'UID:' + event.UID + '\n'
		
		if (event.alarmTriggerMinutes !== undefined) {
			event_text += 'BEGIN:VALARM\n'
			event_text += `TRIGGER:-PT${event.alarmTriggerMinutes}M\n`
			event_text += 'ACTION:DISPLAY\n'
			event_text += 'DESCRIPTION:Reminder\n'
			event_text += 'END:VALARM\n'
		}
		
		event_text += 'END:VEVENT\n'
		
		return event_text
	}
	
	export const ICS_Text = (event: IEvent): string => VCALENDAROpen_Text + VEVENT_Text(event) + VCALENDARClose_Text
}
