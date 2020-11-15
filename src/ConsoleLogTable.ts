export type TConsoleLogTableColumnDef = {characters: number; justify: 'L' | 'R'; padWith?: string}

export type TConsoleLogTableDef = {
	firstRowIsHeader: boolean
	surroundingLines: boolean
	columns?: TConsoleLogTableColumnDef[]
}

export const initialConsoleLogTableDef: TConsoleLogTableDef = {
	firstRowIsHeader: true,
	surroundingLines: true,
	columns: []
}

export const ConsoleColor = {
	Reset: '\x1b[0m',
	// Bright: '\x1b[1m',
	// Dim: '\x1b[2m',
	Underscore: '\x1b[4m',
	// Blink: '\x1b[5m',
	Reverse: '\x1b[7m',
	// Hidden: '\x1b[8m',
	fg: {
		Black: '\x1b[30m',
		Red: '\x1b[31m',
		Green: '\x1b[32m',
		Yellow: '\x1b[33m',
		Blue: '\x1b[34m',
		Magenta: '\x1b[35m',
		Cyan: '\x1b[36m',
		White: '\x1b[37m',
		Crimson: '\x1b[38m'
	},
	bg: {
		Black: '\x1b[40m',
		Red: '\x1b[41m',
		Green: '\x1b[42m',
		Yellow: '\x1b[43m',
		Blue: '\x1b[44m',
		Magenta: '\x1b[45m',
		Cyan: '\x1b[46m',
		White: '\x1b[47m',
		Crimson: '\x1b[48m'
	}
}

/**
 * Formats an array of data into a table format and prints it in the console.
 *
 * @example
 * let data = [
 *   ['ID', 'User', 'Age'],
 *   ['1', 'john doe', '24'],
 *   ['2', 'sally jones', '32']
 * ]
 * // returns
 * ----------------------
 * ID   User          Age
 * ----------------------
 * 1   john doe       24
 * 2   sally jones    32
 * ----------------------
 *
 * consoleLogTable(data)
 */
export const consoleLogTable = (arrayData: any[][], tableDef = initialConsoleLogTableDef) => {
	const nullIndicator = '(null)'

	if (arrayData.length === 0) return

	let useTableDef = {...tableDef}

	if (!useTableDef.columns || useTableDef.columns.length === 0) {
		useTableDef.columns = []

		const dataAnalyze = arrayData[0]

		for (let col = 0; col < dataAnalyze.length; col++) {
			useTableDef.columns.push({
				characters: arrayData.reduce((prev, cur) => {
					const len = (cur[col] ?? nullIndicator).toString().length
					return len > prev ? len : prev
				}, 1),
				justify: !!arrayData.find((dataItem, idx) =>
					idx === 0 ? false : isNaN(parseFloat((dataItem[col] ?? '0').toString()))
				)
					? 'L'
					: 'R'
			})
		}
	}

	let firstRow = true

	if (useTableDef.surroundingLines) {
		console.log(' ')
		console.log(
			arrayData[0]
				.map((_columnValue, idx) => {
					let text = ''
					const columnDef = (useTableDef.columns ?? [])[idx]
					if (!!columnDef) {
						if (columnDef.justify === 'L') {
							text = text.padEnd(columnDef.characters, columnDef.padWith ?? '-')
						} else {
							text = text.padStart(columnDef.characters, columnDef.padWith ?? '-')
						}
					}
					return text
				})
				.join('---')
		)
	}

	for (const dataItem of arrayData) {
		console.log(
			dataItem
				.map((columnValue, idx) => {
					let text = (columnValue ?? '(null)').toString()
					const columnDef = (useTableDef.columns ?? [])[idx]
					if (!!columnDef) {
						if (columnDef.justify === 'L') {
							text = text.padEnd(columnDef.characters, columnDef.padWith ?? ' ')
						} else {
							text = text.padStart(columnDef.characters, columnDef.padWith ?? ' ')
						}
					}
					return text
				})
				.join('   ')
		)
		if (useTableDef.firstRowIsHeader && firstRow) {
			console.log(
				dataItem
					.map((_columnValue, idx) => {
						let text = ''
						const columnDef = (useTableDef.columns ?? [])[idx]
						if (!!columnDef) {
							if (columnDef.justify === 'L') {
								text = text.padEnd(columnDef.characters, columnDef.padWith ?? '-')
							} else {
								text = text.padStart(columnDef.characters, columnDef.padWith ?? '-')
							}
						}
						return text
					})
					.join('---')
			)
		}
		firstRow = false
	}

	if (useTableDef.surroundingLines) {
		console.log(
			arrayData[0]
				.map((_columnValue, idx) => {
					let text = ''
					const columnDef = (useTableDef.columns ?? [])[idx]
					if (!!columnDef) {
						if (columnDef.justify === 'L') {
							text = text.padEnd(columnDef.characters, columnDef.padWith ?? '-')
						} else {
							text = text.padStart(columnDef.characters, columnDef.padWith ?? '-')
						}
					}
					return text
				})
				.join('---')
		)
		console.log(' ')
	}
}
