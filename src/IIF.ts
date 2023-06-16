export type TCheckForIIF = {
	/** Format: MM/DD/YYYY */
	date: string
	account: string
	payee: string
	amount: number
	memo: string
	number: number
	category: string
}

// Sample check information
const checks: TCheckForIIF[] = [
	{
		date: '12/01/2021',
		account: 'Checking',
		payee: 'John Doe',
		amount: 150.0,
		memo: 'Payment for invoice #123',
		number: 1001,
		category: 'Expenses'
	}
]

// Function to convert check information to IIF format
function convertToIIF(checks: TCheckForIIF[]) {
	let iifData =
		'!TRNS\tTRNSID\tTRNSTYPE\tDATE\tACCNT\tNAME\tAMOUNT\tMEMO\tNUM\n!SPL\tSPLID\tDATE\tACCNT\tNAME\tAMOUNT\tMEMO\n!ENDTRNS\n'

	for (const check of checks) {
		const trns = `TRNS\t\tCHECK\t${check.date}\t${check.account}\t${check.payee}\t-${check.amount}\t${check.memo}\t${check.number}\n`
		const spl = `SPL\t\t\t${check.date}\t${check.category}\t${check.payee}\t${check.amount}\t${check.memo}\n`
		const endtrns = 'ENDTRNS\n'
		iifData += `${trns}${spl}${endtrns}`
	}

	return iifData
}

// Output the IIF data as string
console.log(convertToIIF(checks))
