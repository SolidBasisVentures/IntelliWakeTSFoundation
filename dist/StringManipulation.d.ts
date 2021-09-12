export declare const ToSnakeCase: (str: string | undefined | null) => string;
/**
 * Converts a string to kebab-case.
 *
 * @example
 * ToSnakeCase('UserToken')  // returns "user-token"
 */
export declare const ToKebabCase: (str: string | undefined | null) => string;
/**
 * Converts a string to camelCase.
 *
 * @example
 * ToCamelCase('user_token') //  returns "userToken
 */
export declare const ToCamelCase: (str: string | undefined | null) => string;
export declare const ToUpperCaseWords: (str: string | undefined | null) => string;
/**
 * Converts a string to PascalCase.
 *
 * @example
 * ToPascalCase('user_token') //  returns "UserToken
 */
export declare const ToPascalCase: (str: string | undefined | null) => string;
/**
 * Replaces links to an anchor tag.
 *
 * @example
 * // returns <a href='https://www.google.com' target='_blank'>https://www.google.com</a>
 * ReplaceLinks('https://www.google.com')
 */
export declare const ReplaceLinks: (subject: string | undefined | null) => string;
/**
 * Removes script tags.
 *
 * @example
 * // returns "blank"
 * CleanScripts('<script>console.log(1)</script>blank')
 */
export declare const CleanScripts: (subject: string | undefined | null) => string;
/**
 * Removes any given HTML tag and retains what's inside of the tag.
 *
 * @example
 * // returns "john doe"
 * TextToHTML('<p>john doe</p>')
 */
export declare const TextToHTML: (subject: string | undefined | null) => string;
/**
 * Strips scripts and other tags from HTML
 *
 * @param subject
 * HTMLToText('<p>john doe</p>') // returns john doe
 */
export declare const HTMLToText: (subject: string | undefined | null) => string;
export declare const LeftPad: (subject: string | undefined | null, length: number, padString: string) => string;
export declare const RightPad: (subject: string | undefined | null, length: number, padString: string) => string;
/**
 * Returns the given number with a dollar sign.
 *
 * @example
 * // returns $100.00
 * ToCurrency(100)
 */
export declare const ToCurrency: (value: any, decimals?: number) => string;
/**
 * Returns the given number with a dollar sign.
 *
 * @example
 * // returns $100.00
 * ToCurrency(100)
 */
export declare const ToCurrencyMax: (value: any, decimals?: number) => string;
/**
 * Converts the given number to a percentage with a percent sign.
 *
 * @example
 * // returns 50%
 * ToPercent(0.5)
 */
export declare const ToPercent: (value: any, decimals?: number) => string;
/**
 * Converts the given number to a percentage with a percent sign.
 *
 * @example
 * // returns 50%
 * ToPercent(0.5)
 */
export declare const ToPercentMax: (value: any, decimals?: number) => string;
/**
 * Returns the given number with a dollar sign if not empty or 0. Otherwise, returns empty string.
 *
 * @example
 * // returns $100.00
 * ToCurrency(100)
 *
 * // returns ''
 * ToCurrencyBlank('')
 */
export declare const ToCurrencyBlank: (value: any, decimals?: number) => string;
/**
 * Returns the given number with a dollar sign if not empty or 0. Otherwise, returns dash.
 *
 * @example
 * // returns $100.00
 * ToCurrency(100)
 *
 * // returns ''
 * ToCurrencyBlank('-')
 */
export declare const ToCurrencyDash: (value: any, decimals?: number) => string;
/**
 * Converts the given number to a percentage with a percent sign if not empty or 0. Otherwise,
 * returns empty string.
 *
 * @example
 * // returns 50%
 * ToPercent(0.5)
 *
 * // returns ''
 * ToPercent('')
 */
export declare const ToPercentBlank: (value: any, decimals?: number) => string;
/**
 * Converts the given number to a percentage with a percent sign if not empty or 0. Otherwise,
 * returns dash.
 *
 * @example
 * // returns 50%
 * ToPercent(0.5)
 *
 * // returns '-'
 * ToPercent('')
 */
export declare const ToPercentDash: (value: any, decimals?: number) => string;
/**
 * Returns the given number with decimal places.
 *
 * @example
 * // return 10.00
 * ToDigits(10)
 */
export declare const ToDigits: (value: any, decimals?: number) => string;
/**
 * Returns the given number with decimal places.
 *
 * @example
 * // return 10.00
 * ToDigits(10)
 */
export declare const ToDigitsMax: (value: any, decimals?: number) => string;
/**
 * Returns the given number with decimal places if not empty or 0. Otherwise,
 * returns empty string.
 *
 * @example
 * // return 10.00
 * ToDigits(10)
 *
 * // returns ''
 * ToDigits('')
 */
export declare const ToDigitsBlank: (value: any, decimals?: number) => string;
/**
 * Returns the given number with decimal places if not empty or 0. Otherwise,
 * returns dash.
 *
 * @example
 * // return 10.00
 * ToDigits(10)
 *
 * // returns '-'
 * ToDigits('')
 */
export declare const ToDigitsDash: (value: any, decimals?: number) => string;
export declare const DigitsNth: (value: any) => string | null;
/**
 * Converts a string to an array.
 *
 * @example
 * // returns ['john doe']
 * ToStringArray('john doe')
 */
export declare const ToStringArray: (value: string | string[]) => string[];
/**
 * Returns a formatted phone number with parenthesis.
 *
 * @example
 * // returns (555) 555-1234
 * FormatPhoneNumber('5555551234')
 */
export declare const FormatPhoneNumber: (phone: string, forceNumeric?: boolean) => string;
/**
 * Returns a formatted phone number with dots.
 *
 * @example
 * // returns 555.555.1234
 * FormatPhoneNumberDots('5555551234')
 */
export declare const FormatPhoneNumberDots: (phone: string, forceNumeric?: boolean) => string;
/**
 * Formats a zip code by adding a hyphen in a 9 digit code.
 *
 * @example
 * // returns "12345-6789"
 * FormatZip('123456789')
 */
export declare const FormatZip: (zip: string) => string;
/**
 * Adds "http" on urls that don't have it.
 *
 * @example
 * // returns "http://www.google.com"
 * FormatExternalURL('www.google.com')
 */
export declare const FormatExternalURL: (url: string) => string;
/**
 * Returns formatted full name.
 *
 * @example
 * // returns 'Doe, John Smith, Jr.'
 * DisplayNameFromFL('John', 'Doe', 'Smith', 'Jr.')
 */
export declare const DisplayNameFromFL: (first?: string | undefined, last?: string | undefined, middle?: string | undefined, suffix?: string | undefined) => string;
/**
 * Returns formatted name from an object.
 *
 * @example
 * // returns 'Doe, John Smith, Jr.'
 * DisplayNameFromObject({
 *   first_name: 'John',
 *   last_name: 'Doe',
 *   middle_name: 'Smith',
 *   suffix_name: 'Jr.',
 * })
 */
export declare const DisplayNameFromObject: (object?: any, prefix?: string | undefined) => string;
/**
 * Converts the first character of each word of a string to uppercase.
 *
 * @example
 * // return This Is Awesome
 * UCWords('This is awesome')
 */
export declare const UCWords: (str: string | null) => string | null;
/**
 * Generates a random string with a given length and valid characters.
 *
 * @example
 * // returns '32112'
 * RandomString(5, '12345')
 */
export declare const RandomString: (length: number, validChars?: string) => string;
