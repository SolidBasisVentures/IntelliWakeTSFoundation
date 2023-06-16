import {expect, test} from 'vitest'
import {ChecksToIIF, TCheckForIIF} from './IIF'

test('IIF', () => {
	// Sample check information
	let checks: TCheckForIIF[] = [
		{
			date: '12/01/2021',
			account: 'Checkin\tg',
			payee: 'John \tDoe',
			amount: 150.0,
			memo: 'Payment for \tinvoice #123',
			number: 1001,
			category: 'Expense\ts'
		},
		{
			date: '2023-04-05',
			account: 'Checking',
			payee: 'John Deere',
			amount: 1500.15,
			memo: 'Payment for invoice #321',
			number: 1002,
			category: 'Cost of Goods'
		}
	]

	expect(ChecksToIIF(checks)).toBe(
		`!TRNS\tTRNSTYPE\tDATE\tACCNT\tNAME\tAMOUNT\tMEMO\tNUM\n!SPL\tDATE\tACCNT\tNAME\tAMOUNT\tMEMO\n!ENDTRNS\nTRNS\tCHECK\t12/1/2021\tChecking\tJohn Doe\t-150\tPayment for invoice #123\t1001\nSPL\t12/1/2021\tExpenses\tJohn Doe\t150\tPayment for invoice #123\nENDTRNS\nTRNS\tCHECK\t4/5/2023\tChecking\tJohn Deere\t-1500.15\tPayment for invoice #321\t1002\nSPL\t4/5/2023\tCost of Goods\tJohn Deere\t1500.15\tPayment for invoice #321\nENDTRNS\n`
	)

	// Sample check information
	checks = [
		{
			id: 1,
			date: '12/01/2021',
			account: 'Checking',
			payee: 'John Doe',
			amount: 150.0,
			memo: 'Payment for invoice #123',
			number: 1001,
			category: 'Expenses'
		},
		{
			id: 2,
			date: '2023-04-05',
			account: 'Checking',
			payee: 'John Deere',
			amount: 1500.15,
			memo: 'Payment for invoice #321',
			number: 1002,
			category: 'Cost of Goods'
		}
	]

	expect(ChecksToIIF(checks)).toBe(
		`!TRNS\tTRNSID\tTRNSTYPE\tDATE\tACCNT\tNAME\tAMOUNT\tMEMO\tNUM\n!SPL\tSPLID\tDATE\tACCNT\tNAME\tAMOUNT\tMEMO\n!ENDTRNS\nTRNS\t1\tCHECK\t12/1/2021\tChecking\tJohn Doe\t-150\tPayment for invoice #123\t1001\nSPL\t1\t12/1/2021\tExpenses\tJohn Doe\t150\tPayment for invoice #123\nENDTRNS\nTRNS\t2\tCHECK\t4/5/2023\tChecking\tJohn Deere\t-1500.15\tPayment for invoice #321\t1002\nSPL\t2\t4/5/2023\tCost of Goods\tJohn Deere\t1500.15\tPayment for invoice #321\nENDTRNS\n`
	)
})
