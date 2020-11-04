import {
	CleanNumber, DisplayNameFromFL, DisplayNameFromObject, FormatExternalURL,
	FormatPhoneNumber, FormatPhoneNumberDots, FormatZip, RandomString,
	ToCurrency,
	ToCurrencyBlank,
	ToDigits,
	ToPercent, UCWords
} from '../src/StringManipulation'

require('source-map-support').install()

console.log(RandomString(5, '12345'))
// runMoment()