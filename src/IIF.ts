import {DateOnly} from './DateManager'
import {CleanNumber, ReplaceAll} from './Functions'

export type TCheckForIIF = {
	id?: string | number | null
	/** Format: MM/DD/YYYY */
	date: string
	account: string
	payee: string
	amount: number
	memo: string
	number: number
	category: string
}

// Function to convert check information to IIF format
export function ChecksToIIF(checks: TCheckForIIF[]) {
	const idExists = checks.some((check) => !!check.id)

	let iifData = `!TRNS${idExists ? '\tTRNSID' : ''}\tTRNSTYPE\tDATE\tACCNT\tNAME\tAMOUNT\tMEMO\tNUM\n!SPL${
		idExists ? '\tSPLID' : ''
	}\tDATE\tACCNT\tNAME\tAMOUNT\tMEMO\n!ENDTRNS\n`

	for (const check of checks) {
		const trns = `TRNS${idExists ? `\t${check.id ?? ''}` : ''}\tCHECK\t${DateOnly(check.date, {
			formatLocale: true
		})}\t${ReplaceAll('\t', '', check.account)}\t${ReplaceAll('\t', '', check.payee)}\t-${CleanNumber(
			check.amount,
			2
		).toString()}\t${ReplaceAll('\t', '', check.memo)}\t${CleanNumber(check.number, 0).toString()}\n`
		const spl = `SPL${idExists ? `\t${check.id ?? ''}` : ''}\t${DateOnly(check.date, {
			formatLocale: true
		})}\t${ReplaceAll('\t', '', check.category)}\t${ReplaceAll('\t', '', check.payee)}\t${CleanNumber(
			check.amount,
			2
		).toString()}\t${ReplaceAll('\t', '', check.memo)}\n`
		const endtrns = 'ENDTRNS\n'
		iifData += `${trns}${spl}${endtrns}`
	}

	return iifData
}
