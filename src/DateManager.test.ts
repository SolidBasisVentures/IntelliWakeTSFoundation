import {DateParseTS} from './DateManager'

const isoLongDateString = '2021-01-01T00:00:00Z'
const dateTS = DateParseTS(isoLongDateString)

test('Date Managers', () => {
	expect(DateParseTS(isoLongDateString)).toEqual(1609459200000)
	expect(dateTS).toEqual(1609459200000)
	
})

