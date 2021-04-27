import {MomentFromString} from './Moment'

export namespace ICS {
	export interface IEvent {
		dateTimeStart: string,
		dateTimeEnd?: string,
		durationMinutes?: number,
		UID: string,
		subject: string,
		location: string,
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
	
	const ICSDateFormat = (date: string | null | undefined, timezone?: string): string => !date ? '' : `TZID=${timezone ?? 'America/New_York'}:${MomentFromString(date)?.format('YYYYMMDDTHHmmss') ?? ''}`
	
	export const VEVENT_Text = (event: IEvent): string => {
		let event_text = ''
		
		event_text += 'BEGIN:VEVENT\n'
		event_text += 'CLASS:PUBLIC\n'
		event_text += 'CREATED;' + ICSDateFormat(event.dateTimeCreated ?? new Date().toISOString()) + '\n'
		
		event_text += 'DESCRIPTION:' + event.description + '\n'
		event_text += 'DTSTART;' + ICSDateFormat(event.dateTimeStart) + '\n'
		if (!!event.durationMinutes) {
			event_text += 'DURATION;+P' + event.durationMinutes + 'M\n'
		} else if (!!event.dateTimeEnd) {
			event_text += 'DTEND;' + ICSDateFormat(event.dateTimeEnd) + '\n'
		}
		event_text += 'DTSTAMP;' + ICSDateFormat(new Date().toISOString()) + '\n'
		if (!!event.organizerName && !!event.organizerEmail) {
			event_text += `ORGANIZER;CN=${event.organizerName}:MAILTO:${event.organizerEmail}\n`
		}
		event_text += 'LAST-MODIFIED;' + ICSDateFormat(event.dateTimeModified ?? new Date().toISOString()) + '\n'
		event_text += 'LOCATION:' + event.location + '\n'
		if (!!event.priority) {
			event_text += `PRIORITY:${event.priority}\n`
		}
		event_text += 'SEQUENCE:0\n'
//		event += "SUMMARY;LANGUAGE=en-us:" + subject + "\n"
		event_text += 'SUMMARY:' + event.subject + '\n'
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
