export type TConsoleLogTableColumnDef = {characters: number, justify: 'L' | 'R', padWith?: string}

export type TConsoleLogTableDef = {
	firstRowIsHeader: boolean,
	columns?: TConsoleLogTableColumnDef[]
}

export const initialConsoleLogTableDef: TConsoleLogTableDef = {
	firstRowIsHeader: true,
	columns: []
}

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
				justify: !!arrayData.find((dataItem, idx) => idx === 0 ? false : isNaN(parseFloat((dataItem[col] ?? "0").toString()))) ? 'L' : 'R'
			})
		}
	}
	
	
	let firstRow = true
	
	for (const dataItem of arrayData) {
		console.log(dataItem.map((columnValue, idx) => {
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
		}).join(' '))
		if (useTableDef.firstRowIsHeader && firstRow) {
			console.log(dataItem.map((_columnValue, idx) => {
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
			}).join(' '))
			
		}
		firstRow = false
	}
}
