import {
	AddS,
	AddSBlank,
	AddSNull,
	AsteriskMatch,
	BuildPath,
	CleanScripts,
	DigitsNth,
	DisplayNameFromFL,
	DisplayNameFromObject,
	FormatExternalURL,
	FormatPhoneNumber,
	FormatPhoneNumberDashes,
	FormatPhoneNumberDots,
	FormatPhoneNumberE164US,
	FormatTaxID,
	FormatZip,
	HasAlpha,
	HasDigits,
	HTMLToText,
	IncludesHTML,
	ObjectToFixedFields,
	PhoneComponents,
	RandomString,
	ReplaceLinks,
	ShortNumber,
	SplitNonWhiteSpace,
	StringCompares,
	TextToHTML,
	ToCamelCase,
	ToCurrency,
	ToCurrencyBlank,
	ToCurrencyDash,
	ToCurrencyMax,
	ToDigits,
	ToDigitsBlank,
	ToDigitsDash, ToDigitsMax,
	ToInitials,
	ToKebabCase,
	ToPascalCase,
	ToPercent,
	ToPercentBlank,
	ToPercentDash, ToPercentMax,
	ToSnakeCase,
	ToStringArray,
	ToUpperCaseWords,
	ToWords,
	TPropertyFixedFields
} from './StringManipulation'
import {IsJSON} from './DataConstructs'
import {describe, expect, test} from 'vitest'

test('String Functions', () => {
	expect(ToSnakeCase('UserToken')).toBe('user_token')
	expect(ToSnakeCase('userToken')).toBe('user_token')
	expect(ToSnakeCase('user-token')).toBe('user_token')
	expect(ToSnakeCase('user_token')).toBe('user_token')
	expect(ToSnakeCase('userID')).toBe('user_id')
	expect(ToSnakeCase('userID')).toBe('user_id')
	expect(ToSnakeCase('ID')).toBe('id')
	expect(ToSnakeCase('UserToken123Example')).toBe('user_token_123_example')
	expect(ToSnakeCase('userToken456Example')).toBe('user_token_456_example')
	expect(ToSnakeCase('user-token789Example')).toBe('user_token_789_example')
	expect(ToSnakeCase('user_token123Example')).toBe('user_token_123_example')
	expect(ToSnakeCase('user_token123:#Example')).toBe('user_token_123_:#_example')
	expect(ToSnakeCase('user:token')).toBe('user_:_token')
	expect(ToSnakeCase('user;token')).toBe('user_;_token')
	expect(ToSnakeCase('user@token')).toBe('user_@_token')
	expect(ToSnakeCase('user##token')).toBe('user_##_token')
	expect(ToSnakeCase('userID1Example')).toBe('user_id_1_example')
	expect(ToSnakeCase('ID1Example')).toBe('id_1_example')
	expect(ToKebabCase('UserToken')).toBe('user-token')
	expect(ToKebabCase('userToken')).toBe('user-token')
	expect(ToKebabCase('user_token')).toBe('user-token')
	expect(ToKebabCase('userID')).toBe('user-id')
	expect(ToKebabCase('ID')).toBe('id')
	expect(ToKebabCase('UserToken123Example')).toBe('user-token-123-example')
	expect(ToKebabCase('userToken456Example')).toBe('user-token-456-example')
	expect(ToKebabCase('user-token789Example')).toBe('user-token-789-example')
	expect(ToKebabCase('user_token123Example')).toBe('user-token-123-example')
	expect(ToKebabCase('userID1Example')).toBe('user-id-1-example')
	expect(ToKebabCase('ID1Example')).toBe('id-1-example')
	expect(ToKebabCase('user:token')).toBe('user-:-token')
	expect(ToKebabCase('user;token')).toBe('user-;-token')
	expect(ToKebabCase('user@token')).toBe('user-@-token')
	expect(ToKebabCase('user##token')).toBe('user-##-token')
	expect(ToKebabCase('user_token123:#Example')).toBe('user-token-123-:#-example')
	expect(ToCamelCase('user_token')).toBe('userToken')
	expect(ToCamelCase('userToken')).toBe('userToken')
	expect(ToCamelCase('UserToken')).toBe('userToken')
	expect(ToCamelCase('user_id')).toBe('userID')
	expect(ToCamelCase('id')).toBe('id')
	expect(ToCamelCase('user_token123_example')).toBe('userToken123Example')
	expect(ToCamelCase('userToken456_example')).toBe('userToken456Example')
	expect(ToCamelCase('UserToken789_example')).toBe('userToken789Example')
	expect(ToCamelCase('user_id1_example')).toBe('userID1Example')
	expect(ToCamelCase('user:token')).toBe('user:Token')
	expect(ToCamelCase('user;token')).toBe('user;Token')
	expect(ToCamelCase('user@token')).toBe('user@Token')
	expect(ToCamelCase('user##token')).toBe('user##Token')
	expect(ToCamelCase('user_token123:#Example')).toBe('userToken123:#Example')
	expect(ToPascalCase('user_token')).toBe('UserToken')
	expect(ToPascalCase('userToken')).toBe('UserToken')
	expect(ToPascalCase('user-token')).toBe('UserToken')
	expect(ToPascalCase('user_id')).toBe('UserID')
	expect(ToPascalCase('id')).toBe('ID')
	expect(ToPascalCase('user_token123_example')).toBe('UserToken123Example')
	expect(ToPascalCase('userToken456_example')).toBe('UserToken456Example')
	expect(ToPascalCase('UserToken789_example')).toBe('UserToken789Example')
	expect(ToPascalCase('user_id1_example')).toBe('UserID1Example')
	expect(ToPascalCase('id1_example')).toBe('ID1Example')
	expect(ToPascalCase('user:token')).toBe('User:Token')
	expect(ToPascalCase('user;token')).toBe('User;Token')
	expect(ToPascalCase('user@token')).toBe('User@Token')
	expect(ToPascalCase('user##token')).toBe('User##Token')
	expect(ToPascalCase('user_token123:#Example')).toBe('UserToken123:#Example')
	expect(ToWords('Peters')).toStrictEqual(['Peters'])
	expect(ToWords('Peters, Dennis J')).toStrictEqual(['Peters', 'Dennis', 'J'])
	expect(ToWords('PEters, dennis-j')).toStrictEqual(['P', 'Eters', 'dennis', 'j'])
	expect(ToWords('UserToken123Example')).toStrictEqual(['User', 'Token', '123', 'Example'])
	expect(ToWords('userToken456Example')).toStrictEqual(['user', 'Token', '456', 'Example'])
	expect(ToWords('user-token789Example')).toStrictEqual(['user', 'token', '789', 'Example'])
	expect(ToWords('user_token123Example')).toStrictEqual(['user', 'token', '123', 'Example'])
	expect(ToWords('userID1Example')).toStrictEqual(['user', 'ID', '1', 'Example'])
	expect(ToWords('ID1Example')).toStrictEqual(['ID', '1', 'Example'])
	expect(SplitNonWhiteSpace('PEters, dennis-j')).toStrictEqual(['PEters', 'dennis', 'j'])
	expect(ToInitials('id')).toBe('I')
	expect(ToInitials('dennis peters')).toBe('DP')
	expect(ToInitials('dennis james peters')).toBe('DJP')
	expect(ToInitials('peters, dennis james')).toBe('DJP')
	expect(ToInitials('peters, dennis')).toBe('DP')
	{
		let link = 'https://www.google.com'
		let anchor = "<a href='https://www.google.com' target='_blank'>https://www.google.com</a>"
		expect(ReplaceLinks(link)).toBe(anchor)
	}
	{
		let link = '<img alt="Test" src="https://google.png" />'
		expect(ReplaceLinks(link)).toBe(link)
	}
	{
		let link = 'https://www.google.com\nnew line'
		let anchor = "<a href='https://www.google.com' target='_blank'>https://www.google.com</a><br />new line"
		expect(ReplaceLinks(link)).toBe(anchor)
	}
	{
		let link = 'www.google.com'
		expect(ReplaceLinks(link)).toBe(link)
	}
	{
		let link = 'https://www.google.com'
		let anchor = '<a href="https://www.google.com" target="_blank" class="testClass">https://www.google.com</a>'
		expect(ReplaceLinks(link, 'testClass')).toBe(anchor)
	}
	{
		let link = 'https://www.google.com\nnew line'
		let anchor =
			'<a href="https://www.google.com" target="_blank" class="testClass">https://www.google.com</a><br />new line'
		expect(ReplaceLinks(link, 'testClass')).toBe(anchor)
	}
	{
		let link = 'www.google.com'
		expect(ReplaceLinks(link, 'testClass')).toBe(link)
	}
	{
		expect(CleanScripts('<script>console.log(1)</script>something')).toBe('something')
		expect(CleanScripts('<script lang="ts">console.log(1)</script>something')).toBe('something')
		expect(CleanScripts('something<script lang="ts">console.log(1)</script>')).toBe('something')
		expect(CleanScripts('<p>something</p><script lang="ts">console.log(1)</script>')).toBe('<p>something</p>')
		expect(IncludesHTML('<p>john doe</p>')).toBe(true)
		expect(IncludesHTML('john<br/>doe')).toBe(true)
		expect(IncludesHTML('john doe')).toBe(false)
		expect(HTMLToText('<p>john doe</p>')).toBe('john doe')
		expect(HTMLToText('<p>john doe</p><script lang="ts">console.log(1)</script>')).toBe('john doe')
		expect(TextToHTML('john doe\nnew line')).toBe('john doe<br />new line')
		expect(TextToHTML(2)).toBe('2')
		expect(TextToHTML('<p>john doe\nnew line</p>')).toBe('<p>john doe<br />new line</p>')
	}
	{
		let symbolFunctions = [
			{
				name: 'ToCurrency',
				method: ToCurrency,
				value: 100,
				expected: '$100.00',
				decimal: '$100.0',
				empty: '$0.00'
			},
			{
				name: 'ToCurrencyBlank',
				method: ToCurrencyBlank,
				value: 100,
				expected: '$100.00',
				decimal: '$100.0',
				empty: ''
			},
			{
				name: 'ToCurrencyBlank',
				method: ToCurrencyBlank,
				value: -100,
				expected: '$-100.00',
				decimal: '$-100.0',
				empty: ''
			},
			{
				name: 'ToCurrencyDash',
				method: ToCurrencyDash,
				value: 100,
				expected: '$100.00',
				decimal: '$100.0',
				empty: '-'
			},
			{name: 'ToPercent', method: ToPercent, value: 1, expected: '100%', decimal: '100.0%', empty: '0%'},
			{
				name: 'ToPercentBlank',
				method: ToPercentBlank,
				value: 1,
				expected: '100.00%',
				decimal: '100.0%',
				empty: ''
			},
			{
				name: 'ToPercentDash',
				method: ToPercentDash,
				value: 1,
				expected: '100.00%',
				decimal: '100.0%',
				empty: '-'
			},
			{name: 'ToDigits', method: ToDigits, value: 10, expected: '10', decimal: '10.0', empty: '0'},
			{name: 'ToDigitsBlank', method: ToDigitsBlank, value: 10, expected: '10', decimal: '10.0', empty: ''},
			{name: 'ToDigitsDash', method: ToDigitsDash, value: 10, expected: '10', decimal: '10.0', empty: '-'}
		]

		for (const symbolFunction of symbolFunctions) {
			expect(symbolFunction.method(symbolFunction.value)).toBe(symbolFunction.expected)
			expect(symbolFunction.method('')).toBe(symbolFunction.empty)
			expect(symbolFunction.method(symbolFunction.value, 1)).toBe(symbolFunction.decimal)
		}
	}
	expect(ToCurrencyMax(1234)).toBe('$1,234.00')
	expect(ToCurrencyMax(1234.5)).toBe('$1,234.50')
	expect(ToCurrencyMax(1234.56)).toBe('$1,234.56')
	expect(ToCurrencyMax(1234.567, 2)).toBe('$1,234.57')
	expect(ToStringArray('john doe')).toStrictEqual(['john doe'])
	expect(ToStringArray(['john doe'])).toStrictEqual(['john doe'])
	expect(FormatPhoneNumber('5555551234')).toStrictEqual('(555) 555-1234')
	expect(FormatPhoneNumber('555555123')).toStrictEqual('(555) 555-123')
	expect(FormatPhoneNumber('0015555551234')).toStrictEqual('(555) 555-1234')
	expect(FormatPhoneNumber('15555551234')).toStrictEqual('(555) 555-1234')
	expect(FormatPhoneNumber('123-123-1234')).toStrictEqual('(123) 123-1234')
	expect(FormatPhoneNumber('321-321-4321')).toStrictEqual('(321) 321-4321')
	expect(FormatPhoneNumber('+15555551234')).toStrictEqual('(555) 555-1234')
	expect(PhoneComponents('0015555551234 x321')).toEqual({
		countryCode: '001',
		areaCode: '555',
		exchangeNumber: '555',
		subscriberNumber: '1234',
		extension: 'x321'
	})
	expect(PhoneComponents('15555551234 x321')).toEqual({
		countryCode: '1',
		areaCode: '555',
		exchangeNumber: '555',
		subscriberNumber: '1234',
		extension: 'x321'
	})
	expect(PhoneComponents('+15555551234 x321')).toEqual({
		countryCode: '1',
		areaCode: '555',
		exchangeNumber: '555',
		subscriberNumber: '1234',
		extension: 'x321'
	})
	expect(PhoneComponents('5555551234 x321')).toEqual({
		countryCode: '',
		areaCode: '555',
		exchangeNumber: '555',
		subscriberNumber: '1234',
		extension: 'x321'
	})
	expect(FormatPhoneNumberDots('5555551234')).toStrictEqual('555.555.1234')
	expect(FormatPhoneNumberDots('555555123')).toStrictEqual('555.555.123')
	expect(FormatPhoneNumberDashes('5555551234')).toStrictEqual('555-555-1234')
	expect(FormatPhoneNumberDashes('5555551234')).toStrictEqual('555-555-1234')
	expect(FormatPhoneNumberDashes('15555551234')).toStrictEqual('555-555-1234')
	expect(FormatPhoneNumberDashes('+15555551234')).toStrictEqual('555-555-1234')
	expect(FormatPhoneNumberDashes('+1-555-555-1234')).toStrictEqual('555-555-1234')
	expect(FormatPhoneNumberDashes('+1 (555) 555-1234')).toStrictEqual('555-555-1234')
	expect(FormatPhoneNumberDashes('(555) 555-1234')).toStrictEqual('555-555-1234')
	expect(FormatPhoneNumberDashes('(555)555-1234')).toStrictEqual('555-555-1234')
	expect(FormatPhoneNumberDashes('555555123')).toStrictEqual('555-555-123')
	expect(FormatPhoneNumberDashes('555555123', false)).toStrictEqual(null)
	expect(FormatPhoneNumberE164US('555555123', false)).toStrictEqual(null)
	expect(FormatPhoneNumberE164US('5555551234', false)).toStrictEqual('+15555551234')
	expect(FormatPhoneNumberE164US('(555)555-1234 (Husband)', false)).toStrictEqual('+15555551234')
	expect(FormatPhoneNumberE164US('555-555-1234 x1234', false)).toStrictEqual('+15555551234')
	expect(FormatPhoneNumberE164US('+1 555-555-1234 x1234 (Mom)', false)).toStrictEqual('+15555551234')
	expect(FormatZip('123456789')).toBe('12345-6789')
	expect(FormatZip('12345')).toBe('12345')
	expect(FormatZip('12345-6789')).toBe('12345-6789')
	expect(FormatTaxID('112222223')).toBe('11-2222223')
	expect(FormatTaxID('11-2222223')).toBe('11-2222223')
	expect(FormatExternalURL('www.google.com')).toBe('http://www.google.com')
	expect(DisplayNameFromFL('John', 'Doe', 'Smith', 'Jr.')).toBe('Doe, John Smith, Jr.')
	expect(
		DisplayNameFromObject({
			first_name: 'John',
			last_name: 'Doe',
			middle_name: 'Smith',
			suffix_name: 'Jr.'
		})
	).toBe('Doe, John Smith, Jr.')
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
	expect(ToUpperCaseWords('This_is_awesome')).toBe('This Is Awesome')
	expect(RandomString(5)).toHaveLength(5)
	expect(RandomString(5, '1')).toContain('1')
	expect(IsJSON('{"id": 1}')).toEqual(true)
	expect(IsJSON(undefined)).toEqual(false)
	expect(IsJSON('Test')).toEqual(false)
	expect(IsJSON(1)).toEqual(false)
	expect(FormatPhoneNumber('22')).toEqual('(22)')
	expect(FormatPhoneNumber('223')).toEqual('(223)')
	expect(FormatPhoneNumber('223123')).toEqual('(223) 123')
	expect(FormatPhoneNumber('223-123')).toEqual('(223) 123')
	expect(FormatPhoneNumber('2231231234')).toEqual('(223) 123-1234')
	expect(FormatPhoneNumber('2231231234x333')).toEqual('(223) 123-1234 x333')
	expect(FormatPhoneNumber('2231231234 At office Extension 321')).toEqual('(223) 123-1234 At office Extension 321')
	expect(FormatPhoneNumber('2231231234At office Extension 321')).toEqual('(223) 123-1234 At office Extension 321')
	expect(DigitsNth(1)).toEqual('1st')
	expect(DigitsNth(2)).toEqual('2nd')
	expect(DigitsNth(11)).toEqual('11th')
	expect(DigitsNth(21)).toEqual('21st')
	expect(DigitsNth(33)).toEqual('33rd')
})

test('AddS', () => {
	expect(AddS('Row', 0)).toBe('Rows')
	expect(AddS('Row', 1)).toBe('Row')
	expect(AddS('Row', 2)).toBe('Rows')
	expect(AddS('Row', 0, true)).toBe('0 Rows')
	expect(AddS('Row', 1, true)).toBe('1 Row')
	expect(AddS('Row', 2, true)).toBe('2 Rows')
	expect(AddS('Patch', 0)).toBe('Patches')
	expect(AddS('Patch', 1)).toBe('Patch')
	expect(AddS('Patch', 2)).toBe('Patches')
	expect(AddS('Patch', 0, true)).toBe('0 Patches')
	expect(AddS('Patch', 1, true)).toBe('1 Patch')
	expect(AddS('Patch', 2, true)).toBe('2 Patches')
	expect(AddS('Journey', 0)).toBe('Journeys')
	expect(AddS('Journey', 1)).toBe('Journey')
	expect(AddS('Journey', 2)).toBe('Journeys')
	expect(AddS('Journey', 0, true)).toBe('0 Journeys')
	expect(AddS('Journey', 1, true)).toBe('1 Journey')
	expect(AddS('Journey', 2, true)).toBe('2 Journeys')
	expect(AddS('Category', 0)).toBe('Categories')
	expect(AddS('Category', 1)).toBe('Category')
	expect(AddS('Category', 2)).toBe('Categories')
	expect(AddS('Category', 0, true)).toBe('0 Categories')
	expect(AddS('Category', 1, true)).toBe('1 Category')
	expect(AddS('Category', 2, true)).toBe('2 Categories')
})

test('AddSNull', () => {
	expect(AddSNull('Row', 0)).toBe(null)
	expect(AddSNull('Row', 1)).toBe('Row')
	expect(AddSNull('Row', 2)).toBe('Rows')
	expect(AddSNull('Patch', 0)).toBe(null)
	expect(AddSNull('Patch', 1)).toBe('Patch')
	expect(AddSNull('Patch', 2)).toBe('Patches')
})

test('AddSBlank', () => {
	expect(AddSBlank('Row', 0)).toBe('')
	expect(AddSBlank('Row', 1)).toBe('Row')
	expect(AddSBlank('Row', 2)).toBe('Rows')
	expect(AddSBlank('Patch', 0)).toBe('')
	expect(AddSBlank('Patch', 1)).toBe('Patch')
	expect(AddSBlank('Patch', 2)).toBe('Patches')
})

test('ShortNumber', () => {
	expect(ShortNumber(6, 1)).toBe('6')
	expect(ShortNumber(66, 1)).toBe('66')
	expect(ShortNumber(666, 1)).toBe('666')
	expect(ShortNumber(6666, 1)).toBe('6.7k')
	expect(ShortNumber(6666)).toBe('7k')
	expect(ShortNumber(6666, 0, 'up')).toBe('7k')
	expect(ShortNumber(6666, 0, 'down')).toBe('6k')
	expect(ShortNumber(3333)).toBe('3k')
	expect(ShortNumber(3333, 0, 'up')).toBe('4k')
	expect(ShortNumber(3333, 0, 'down')).toBe('3k')
	expect(ShortNumber(66666, 1)).toBe('66.7k')
	expect(ShortNumber(6666666, 1)).toBe('6.7M')
	expect(ShortNumber(6666666666, 1)).toBe('6.7B')
	expect(ShortNumber(6666666666666, 1)).toBe('6.7T')
	expect(ShortNumber(6666666666666666, 1)).toBe('6.7Q')
	expect(ShortNumber(6666)).toBe('7k')
	expect(ShortNumber(6666, 1, 'up')).toBe('6.7k')
	expect(ShortNumber(6666, 1, 'down')).toBe('6.6k')
	expect(ShortNumber(3333, 1, 'up')).toBe('3.4k')
	expect(ShortNumber(3333, 1, 'down')).toBe('3.3k')
	expect(AsteriskMatch('Dennis', 'De*is')).toBeTruthy()
	expect(AsteriskMatch('Dennis', 'Dez*is')).toBeFalsy()
	expect(AsteriskMatch('Dennis', '*De*is*')).toBeTruthy()
	expect(AsteriskMatch('Dennis', '*z*is')).toBeFalsy()
	expect(BuildPath('')).toBe('')
	expect(BuildPath('/')).toBe('/')
	expect(BuildPath('/', 'Test')).toBe('/Test')
	expect(BuildPath('Test')).toBe('Test')
	expect(BuildPath('Test', '1')).toBe('Test/1')
	expect(BuildPath('Test', '/', '1')).toBe('Test/1')
	expect(BuildPath('Test', '', '1')).toBe('Test/1')
	expect(BuildPath('Test/', '/', '/1/')).toBe('Test/1')
	expect(BuildPath('/Test/', '/', '/1/')).toBe('/Test/1')
	expect(BuildPath('/Test/', '/~/', '/1/')).toBe('/Test/~/1')
})

describe('HasAlpha', () => {
	test('returns true if value is a string that contains alphabets', () => {
		const result = HasAlpha('Hello world')
		expect(result).toBeTruthy()
	})

	test('returns false if value is a string that does not contain alphabets', () => {
		const result = HasAlpha('1234')
		expect(result).toBeFalsy()
	})

	test('returns false if value is null', () => {
		const result = HasAlpha(null)
		expect(result).toBeFalsy()
	})

	test('returns false if value is undefined', () => {
		const result = HasAlpha(undefined)
		expect(result).toBeFalsy()
	})

	test('returns false if value is an empty string', () => {
		const result = HasAlpha('')
		expect(result).toBeFalsy()
	})

	test('returns false if value is a string that contains only numbers and special characters', () => {
		const result = HasAlpha('$#@&^%!()1234')
		expect(result).toBeFalsy()
	})

	test('returns true if value is a string that contains both alphabets and non-alphabets', () => {
		const result = HasAlpha('12abc31')
		expect(result).toBeTruthy()
	})
})

describe('HasDigits', () => {
	test('Empty string returns false', () => {
		expect(HasDigits('')).toBe(false)
	})

	test('Null value returns false', () => {
		expect(HasDigits(null)).toBe(false)
	})

	test('Undefined value returns false', () => {
		expect(HasDigits(undefined)).toBe(false)
	})

	test('String without digits returns false', () => {
		expect(HasDigits('abc')).toBe(false)
	})

	test('String with digits returns true', () => {
		expect(HasDigits('a1b2c3')).toBe(true)
	})

	test('String with non-digit characters returns true if there are also digits present', () => {
		expect(HasDigits('a1b2c')).toBe(true)
	})

	test('String with only non-digit characters returns false', () => {
		expect(HasDigits('abcde')).toBe(false)
	})
})

describe('StringCompares', () => {
	test('Two strings', () => {
		const start = [1, 2, 3, 4, 7, 8].map((id) => `Test${id}`).join('\r\n')
		const end = [1, 2, 5, 6, 8].map((id) => `Test${id}`).join('\r\n')

		expect(StringCompares(start, end)).toStrictEqual([
			{result: 'Same', value: 'Test1'},
			{result: 'Same', value: 'Test2'},
			{result: 'Deleted', value: 'Test3'},
			{result: 'Deleted', value: 'Test4'},
			{result: 'Deleted', value: 'Test7'},
			{result: 'Inserted', value: 'Test5'},
			{result: 'Inserted', value: 'Test6'},
			{result: 'Same', value: 'Test8'}
		])
	})

	test('ObjectToFixedFields should format without transformations', () => {
		const obj = {name: 'John Doe', age: 26}
		const settings: TPropertyFixedFields<any>[] = [
			{property: 'name', length: 10, rightJustify: false, padCharacter: '_'},
			{property: 'age', length: 3, rightJustify: true}
		]
		const result = ObjectToFixedFields(obj, settings)
		expect(result).toBe('John Doe__ 26')
	})

	test('ObjectToFixedFields should format with transformations', () => {
		const obj = {name: 'John Doe', age: 26}
		const settings: TPropertyFixedFields<any>[] = [
			{property: 'name', length: 10, rightJustify: false, padCharacter: '_', transform: (v) => v.toUpperCase()},
			{property: 'age', length: 3, rightJustify: true, transform: (v) => v + 1}
		]
		const result = ObjectToFixedFields(obj, settings)
		expect(result).toBe('JOHN DOE__ 27')
	})

	test('Digits Min Max', () => {
		expect(ToDigitsMax(1.234, 2)).toBe('1.23')
		expect(ToDigitsMax(1.2, 2)).toBe('1.2')
		expect(ToDigitsMax(1, 2)).toBe('1')
		expect(ToDigitsMax(1, 7, 2)).toBe('1.00')
		expect(ToDigitsMax(1.2, 7, 2)).toBe('1.20')
		expect(ToDigitsMax(1.234, 7, 2)).toBe('1.234')

		expect(ToCurrencyMax(1.234)).toBe('$1.234')
		expect(ToCurrencyMax(1.2)).toBe('$1.20')
		expect(ToCurrencyMax(1)).toBe('$1.00')
		expect(ToCurrencyMax(1, 7, 2)).toBe('$1.00')
		expect(ToCurrencyMax(1.2, 7, 2)).toBe('$1.20')
		expect(ToCurrencyMax(1.234, 7, 2)).toBe('$1.234')

		expect(ToPercentMax(1.234, 2)).toBe('123.4%')
		expect(ToPercentMax(1.23456, 2)).toBe('123.46%')
		expect(ToPercentMax(1.2, 2)).toBe('120%')
		expect(ToPercentMax(1, 2)).toBe('100%')
		expect(ToPercentMax(1, 7, 2)).toBe('100.00%')
		expect(ToPercentMax(1.2, 7, 2)).toBe('120.00%')
		expect(ToPercentMax(1.234, 7, 2)).toBe('123.40%')
		expect(ToPercentMax(1.23456, 7, 2)).toBe('123.456%')
	})

	// test('Common String Patterns', () => {
	// 	expect(FindCommonStringPatterns(['1Test1FileA', '1Test2FileAb', '2Test3FileBa'])).toEqual(['Test', 'File'])
	// 	expect(FindCommonStringPatterns(['Test1FileA', 'Test2FileAb', 'Test3FileBa'])).toEqual(['Test', 'File'])
	// 	expect(FindCommonStringPatterns(['Test1FileAcsv', 'Test2FileAbcsv', 'Test3FileBacsv'])).toEqual([
	// 		'Test',
	// 		'File',
	// 		'csv'
	// 	])
	// 	expect(FindCommonStringPatterns(['Test1FileA.csv', 'Test2FileAb.csv', 'Test3FileBa.csv'])).toEqual([
	// 		'Test',
	// 		'File',
	// 		'.csv'
	// 	])
	// 	expect(
	// 		FindCommonStringPatterns(['Test1-FileA-Pricecsv', 'Test2-FileAb-Pricecsv', 'Test3-FileBa-Pricecsv'])
	// 	).toEqual(['Test', '-File', '-Pricecsv'])
	// 	expect(
	// 		FindCommonStringPatterns(['Test1-FileA-Price.csv', 'Test2-FileAb-Price.csv', 'Test3-FileBa-Price.csv'])
	// 	).toEqual(['Test', '-File', '-Price.csv'])
	// 	expect(FindCommonStringPatterns(['ABC.csv', 'ABC.csv', 'DEF.csv'])).toEqual(['.csv'])
	// 	expect(FindCommonStringPatterns(['ABC', 'ABC', 'DEF'])).toEqual([])
	// })
	//
	// test('Common String Pattern Resolves', () => {
	// 	expect(
	// 		FindDifferencesFromStringPatterns(['Test', 'File'], ['1Test1FileA', '1Test2FileAb', '2Test3FileBa'])
	// 	).toEqual([
	// 		['1', '1', 'A'],
	// 		['1', '2', 'Ab'],
	// 		['2', '3', 'Ba']
	// 	])
	// 	expect(
	// 		FindDifferencesFromStringPatterns(['Test', 'File'], ['Test1FileA', 'Test2FileAb', 'Test3FileBa'])
	// 	).toEqual([
	// 		['1', 'A'],
	// 		['2', 'Ab'],
	// 		['3', 'Ba']
	// 	])
	// 	expect(
	// 		FindDifferencesFromStringPatterns(
	// 			['Test', 'File', 'csv'],
	// 			['Test1FileAcsv', 'Test2FileAbcsv', 'Test3FileBacsv']
	// 		)
	// 	).toEqual([
	// 		['1', 'A'],
	// 		['2', 'Ab'],
	// 		['3', 'Ba']
	// 	])
	// 	expect(
	// 		FindDifferencesFromStringPatterns(
	// 			['Test', 'File', '.csv'],
	// 			['Test1FileA.csv', 'Test2FileAb.csv', 'Test3FileBa.csv']
	// 		)
	// 	).toEqual([
	// 		['1', 'A'],
	// 		['2', 'Ab'],
	// 		['3', 'Ba']
	// 	])
	// 	expect(
	// 		FindDifferencesFromStringPatterns(
	// 			['Test', '-File', '-Pricecsv'],
	// 			['Test1-FileA-Pricecsv', 'Test2-FileAb-Pricecsv', 'Test3-FileBa-Pricecsv']
	// 		)
	// 	).toEqual([
	// 		['1', 'A'],
	// 		['2', 'Ab'],
	// 		['3', 'Ba']
	// 	])
	// 	expect(
	// 		FindDifferencesFromStringPatterns(
	// 			['Test', '-File', '-Price.csv'],
	// 			['Test1-FileA-Price.csv', 'Test2-FileAb-Price.csv', 'Test3-FileBa-Price.csv']
	// 		)
	// 	).toEqual([
	// 		['1', 'A'],
	// 		['2', 'Ab'],
	// 		['3', 'Ba']
	// 	])
	// 	expect(FindDifferencesFromStringPatterns(['.csv'], ['ABC.csv', 'ABC.csv', 'DEF.csv'])).toEqual([
	// 		['ABC'],
	// 		['ABC'],
	// 		['DEF']
	// 	])
	// 	expect(FindDifferencesFromStringPatterns([], ['ABC', 'ABC', 'DEF'])).toEqual([['ABC'], ['ABC'], ['DEF']])
	// 	// expect(FindDifferencesFromStringPatterns(['-', '-PRICE.csv'], ['20240601-441-PRICE.csv', '20240501-442-PRICE.csv'])).toEqual([
	// 	// 	['20240601'],
	// 	// 	['441']
	// 	// ])
	// })
})
