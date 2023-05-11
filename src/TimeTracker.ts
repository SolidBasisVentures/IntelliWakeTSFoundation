import {CleanNumberNull, GreaterNumber, LeastNumber, OmitProperty} from './Functions'
import {ESTTodayDateTimeLabel} from './DateManager'
import {ToDigits} from './StringManipulation'

export type TTimeEvent = {
	eventMS: number
	label: string
	durationMS: number
}

export type TTimeTrackerOptions = {
	offendingMS?: number | null
	warnAutomatically?: boolean | null
}

export class TimeTracker {
	public events: TTimeEvent[]
	public offendingMS: number
	public warnAutomatically = false

	constructor(options?: TTimeTrackerOptions) {
		this.events = [
			{
				eventMS: new Date().valueOf(),
				label: 'Start',
				durationMS: 0
			}
		]

		this.offendingMS = options?.offendingMS ?? 500
		this.warnAutomatically = options?.warnAutomatically ?? false
	}

	/**
	 * Reset the control to start tracking times from this point forward
	 */
	public reset() {
		this.events = [
			{
				eventMS: new Date().valueOf(),
				label: 'Start',
				durationMS: 0
			}
		]
	}

	/**
	 * Get the maximum TS in the events
	 */
	public get maxTS() {
		return this.events.reduce<number>((result, item) => GreaterNumber(result, item.eventMS), 0)
	}

	/**
	 * Get the minimum TS in the events
	 */
	public get minTS() {
		return this.events.reduce<number>((result, item) => LeastNumber(result, item.eventMS), this.maxTS)
	}

	/**
	 * Get the total duration of all events
	 */
	public get duration() {
		return this.maxTS - this.minTS
	}

	/**
	 * Mark the current time with a label for analysis later, and throw a console warn if appropriate
	 * @param label
	 * @param options
	 */
	public mark(label: string, options?: TTimeTrackerOptions) {
		const maxTS = this.maxTS
		const start = new Date().valueOf()
		const event: TTimeEvent = {
			eventMS: start,
			label,
			durationMS: start - maxTS
		}
		this.events.push(event)

		if (
			(options?.warnAutomatically ?? this.warnAutomatically) &&
			event.durationMS > (options?.offendingMS ?? this.offendingMS)
		) {
			console.info(`Time exceeded - ${label} - ${ToDigits(event.durationMS)}ms (${ESTTodayDateTimeLabel()})`)
		}

		return event
	}

	/**
	 * Mark the current time with a label for analysis later, and throw a console warn if appropriate
	 * @param label
	 * @param promiseFunction
	 * @param options
	 */
	public markResolved(label: string, promiseFunction: Promise<any>, options?: TTimeTrackerOptions) {
		promiseFunction.then(() => {
			this.mark(label, options)
		})

		return promiseFunction
	}

	/**
	 * Report back only the events that exceeded the offending MS
	 */
	public get offendingEvents() {
		return this.events.reduce<TTimeEvent[]>((results, event) => {
			if (event.durationMS > this.offendingMS) {
				return [...results, event]
			}

			return results
		}, [])
	}

	/**
	 * Analyze events, and if any are offending, or if the sum offends, then display those events and return them
	 * @param options
	 */
	public durationOffends(options?: TTimeTrackerOptions & {label?: string; showAll?: boolean}) {
		const offendingEvents = this.offendingEvents

		if (offendingEvents.length || this.duration > (options?.offendingMS ?? this.offendingMS)) {
			const useEvents = options?.showAll ? this.events.filter((event) => event.durationMS) : offendingEvents

			if (options?.warnAutomatically ?? this.warnAutomatically) {
				console.info(`"${options?.label ?? 'Unknown Event'}" took ${ToDigits(this.duration)}ms`)
				console.table(useEvents.map((oe) => OmitProperty(oe, 'eventMS')))
			}
			return useEvents
		}

		return null
	}

	/**
	 * Analyze events, and if any are offending, or if the sum offends, then display those events and return them
	 * @param label
	 * @param offendingMS
	 * @param showAll
	 */
	public consoleDurationOffends(label: string, offendingMS?: number, showAll = false) {
		const offendingEvents = this.offendingEvents

		if (offendingEvents.length || this.duration > (offendingMS ?? this.offendingMS)) {
			const useEvents = showAll ? this.events.filter((event) => event.durationMS) : offendingEvents

			console.info(`"${label}" took ${ToDigits(this.duration)}ms`)
			if (useEvents.length) {
				console.table(useEvents.map((oe) => OmitProperty(oe, 'eventMS')))
			}
			return useEvents
		}

		return null
	}
}

export function TimeTrackResolved<T>(
	label: string,
	offendingMS: any | null | undefined,
	promiseFunction: Promise<T>
): Promise<T> {
	const startMS = new Date().valueOf()
	const useOffendingMS = CleanNumberNull(offendingMS)

	promiseFunction.then(() => {
		const durationMS = new Date().valueOf() - startMS

		if (useOffendingMS && durationMS > useOffendingMS) {
			console.info(`Time Exceeded - ${label} - ${ToDigits(durationMS)}ms (${ESTTodayDateTimeLabel()})`)
		}
	})

	return promiseFunction
}
