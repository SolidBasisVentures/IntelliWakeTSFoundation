import {expect, test} from 'vitest'
import path from 'path'
import {FileReadStream} from './FileReadStream'

test('PGTable_CSV', async () => {
	const pathName = path.resolve('TestData')

	const fileName = 'M20_TEST.csv'
	await FileReadStream(path.resolve(pathName, fileName), {
		onFirstLine: () => {},
		onSubsequentLine: () => {},
		onLine: () => {},
		pauseAfterLines: 10
	})

	expect(true).toBeTruthy()
})
