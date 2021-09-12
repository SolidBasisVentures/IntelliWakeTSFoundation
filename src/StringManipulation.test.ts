import {
	CleanScripts,
	DisplayNameFromFL,
	DisplayNameFromObject,
	FormatExternalURL,
	FormatPhoneNumber,
	FormatPhoneNumberDots,
	FormatZip,
	RandomString,
	ReplaceLinks,
	TextToHTML, ToCamelCase,
	ToCurrency,
	ToCurrencyBlank,
	ToCurrencyDash, ToCurrencyMax,
	ToDigits,
	ToDigitsBlank,
	ToDigitsDash, ToKebabCase, ToPascalCase,
	ToPercent,
	ToPercentBlank,
	ToPercentDash,
	ToSnakeCase,
	ToStringArray,
	UCWords
} from './StringManipulation'
import {IsJSON} from './DataConstructs'

test('ToSnakeCase From Pascal', () => {
	expect(ToSnakeCase('UserToken')).toBe('user_token')
})

test('ToSnakeCase From Camel', () => {
	expect(ToSnakeCase('userToken')).toBe('user_token')
})

test('ToSnakeCase From Kebab', () => {
	expect(ToSnakeCase('user-token')).toBe('user_token')
})

test('ToSnakeCase From Snake', () => {
	expect(ToSnakeCase('user_token')).toBe('user_token')
})

test('ToSnakeCase with _id', () => {
	expect(ToSnakeCase('userID')).toBe('user_id')
})

test('ToSnakeCase with -id', () => {
	expect(ToSnakeCase('userID')).toBe('user_id')
})

test('ToSnakeCase ID only', () => {
	expect(ToSnakeCase('ID')).toBe('id')
})

test('ToKebabCase from Pascal', () => {
	expect(ToKebabCase('UserToken')).toBe('user-token')
})

test('ToKebabCase from Camel', () => {
	expect(ToKebabCase('userToken')).toBe('user-token')
})

test('ToKebabCase from Snake', () => {
	expect(ToKebabCase('user_token')).toBe('user-token')
})

test('ToKebabCase with ID', () => {
	expect(ToKebabCase('userID')).toBe('user-id')
})

test('ToKebabCase ID only', () => {
	expect(ToKebabCase('ID')).toBe('id')
})

test('ToCamelCase from Snake', () => {
	expect(ToCamelCase('user_token')).toBe('userToken')
})

test('ToCamelCase from Camel', () => {
	expect(ToCamelCase('userToken')).toBe('userToken')
})

test('ToCamelCase from Pascal', () => {
	expect(ToCamelCase('UserToken')).toBe('userToken')
})

test('ToCamelCase with ID', () => {
	expect(ToCamelCase('user_id')).toBe('userID')
})

test('ToCamelCase ID only', () => {
	expect(ToCamelCase('id')).toBe('ID')
})

test('ToPascalCase from Snake', () => {
	expect(ToPascalCase('user_token')).toBe('UserToken')
})

test('ToPascalCase from Camel', () => {
	expect(ToPascalCase('userToken')).toBe('UserToken')
})

test('ToPascalCase from Kebab', () => {
	expect(ToPascalCase('user-token')).toBe('UserToken')
})

test('ToPascalCase with ID', () => {
	expect(ToPascalCase('user_id')).toBe('UserID')
})

test('ToPascalCase ID only', () => {
	expect(ToPascalCase('id')).toBe('ID')
})

test('ReplaceLinks', () => {
	let link = 'https://www.google.com'
	let anchor = "<a href='https://www.google.com' target='_blank'>https://www.google.com</a>"
	expect(ReplaceLinks(link)).toBe(anchor)
})

test('ReplaceLinks with new line', () => {
	let link = 'https://www.google.com\nnew line'
	let anchor = "<a href='https://www.google.com' target='_blank'>https://www.google.com</a><br />new line"
	expect(ReplaceLinks(link)).toBe(anchor)
})

test('ReplaceLinks without https', () => {
	let link = 'www.google.com'
	expect(ReplaceLinks(link)).toBe(link)
})

test('CleanScripts', () => {
	expect(CleanScripts('<script>console.log(1)</script>something')).toBe('something')
})

test('TextToHTML', () => {
	expect(TextToHTML('<p>john doe</p>')).toBe('john doe')
})

test('TextToHTML with new line', () => {
	expect(TextToHTML('<p>john doe\nnew line</p>')).toBe('john doe<br />new line')
})

let symbolFunctions = [
	{name: 'ToCurrency', method: ToCurrency, value: 100, expected: '$100.00', decimal: '$100.0', empty: '$0.00'},
	{name: 'ToCurrencyBlank', method: ToCurrencyBlank, value: 100, expected: '$100.00', decimal: '$100.0', empty: ''},
	{name: 'ToCurrencyDash', method: ToCurrencyDash, value: 100, expected: '$100.00', decimal: '$100.0', empty: '-'},
	{name: 'ToPercent', method: ToPercent, value: 1, expected: '100%', decimal: '100.0%', empty: '0%'},
	{name: 'ToPercentBlank', method: ToPercentBlank, value: 1, expected: '100.00%', decimal: '100.0%', empty: ''},
	{name: 'ToPercentDash', method: ToPercentDash, value: 1, expected: '100.00%', decimal: '100.0%', empty: '-'},
	{name: 'ToDigits', method: ToDigits, value: 10, expected: '10', decimal: '10.0', empty: '0'},
	{name: 'ToDigitsBlank', method: ToDigitsBlank, value: 10, expected: '10', decimal: '10.0', empty: ''},
	{name: 'ToDigitsDash', method: ToDigitsDash, value: 10, expected: '10', decimal: '10.0', empty: '-'}
]

for (const symbolFunction of symbolFunctions) {
	test(symbolFunction.name, () => {
		expect(symbolFunction.method(symbolFunction.value)).toBe(symbolFunction.expected)
		expect(symbolFunction.method('')).toBe(symbolFunction.empty)
		expect(symbolFunction.method(symbolFunction.value, 1)).toBe(symbolFunction.decimal)
	})
}

test('CurrencyMax', () => {
	expect(ToCurrencyMax(1234)).toBe('$1,234')
	expect(ToCurrencyMax(1234.5)).toBe('$1,234.5')
	expect(ToCurrencyMax(1234.56)).toBe('$1,234.56')
	expect(ToCurrencyMax(1234.567)).toBe('$1,234.57')
})

test('ToStringArray', () => {
	expect(ToStringArray('john doe')).toStrictEqual(['john doe'])
})

test('ToStringArray array', () => {
	expect(ToStringArray(['john doe'])).toStrictEqual(['john doe'])
})

test('FormatPhoneNumber ', () => {
	expect(FormatPhoneNumber('5555551234')).toStrictEqual('(555) 555-1234')
})

test('FormatPhoneNumber invalid', () => {
	expect(FormatPhoneNumber('555555123')).toStrictEqual('555555123')
})

test('FormatPhoneNumberDots ', () => {
	expect(FormatPhoneNumberDots('5555551234')).toStrictEqual('555.555.1234')
})

test('FormatPhoneNumberDots invalid', () => {
	expect(FormatPhoneNumberDots('555555123')).toStrictEqual('555555123')
})

test('FormatZip', () => {
	expect(FormatZip('123456789')).toBe('12345-6789')
})

test('FormatZip', () => {
	expect(FormatZip('12345')).toBe('12345')
})

test('FormatZip from formatted', () => {
	expect(FormatZip('12345-6789')).toBe('12345-6789')
})

test('FormatExternalURL', () => {
	expect(FormatExternalURL('www.google.com')).toBe('http://www.google.com')
})

test('DisplayNameFromFL', () => {
	expect(DisplayNameFromFL('John', 'Doe', 'Smith', 'Jr.')).toBe('Doe, John Smith, Jr.')
})

test('DisplayNameFromObject', () => {
	expect(
		DisplayNameFromObject({
			first_name: 'John',
			last_name: 'Doe',
			middle_name: 'Smith',
			suffix_name: 'Jr.'
		})
	).toBe('Doe, John Smith, Jr.')
})

test('DisplayNameFromObject with prefix', () => {
	expect(
		DisplayNameFromObject(
			{
				_prfirst_name: 'John',
				_prlast_name: 'Doe',
				_prmiddle_name: 'Smith',
				_prsuffix_name: 'Jr.'
			},
			'pr'
		)
	).toBe('Doe, John Smith, Jr.')
})

test('UCWords', () => {
	expect(UCWords('This is awesome')).toBe('This Is Awesome')
})

test('RandomString length', () => {
	expect(RandomString(5)).toHaveLength(5)
})

test('RandomString validChars', () => {
	expect(RandomString(5, '1')).toContain('1')
})

test('IsJSON valid', () => {
	expect(IsJSON('{"id": 1}')).toEqual(true)
})

test('IsJSON empty', () => {
	expect(IsJSON(undefined)).toEqual(false)
})

test('IsJSON string', () => {
	expect(IsJSON('Test')).toEqual(false)
})

test('IsJSON number', () => {
	expect(IsJSON(1)).toEqual(false)
})
