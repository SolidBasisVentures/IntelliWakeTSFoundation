'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var initialConsoleLogTableDef = {
    firstRowIsHeader: true,
    surroundingLines: true,
    columns: []
};
var ConsoleColor = {
    Reset: '\x1b[0m',
    // Bright: '\x1b[1m',
    // Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    // Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    // Hidden: '\x1b[8m',
    fg: {
        Black: '\x1b[30m',
        Red: '\x1b[31m',
        Green: '\x1b[32m',
        Yellow: '\x1b[33m',
        Blue: '\x1b[34m',
        Magenta: '\x1b[35m',
        Cyan: '\x1b[36m',
        White: '\x1b[37m',
        Crimson: '\x1b[38m'
    },
    bg: {
        Black: '\x1b[40m',
        Red: '\x1b[41m',
        Green: '\x1b[42m',
        Yellow: '\x1b[43m',
        Blue: '\x1b[44m',
        Magenta: '\x1b[45m',
        Cyan: '\x1b[46m',
        White: '\x1b[47m',
        Crimson: '\x1b[48m'
    }
};
/**
 * Formats an array of data into a table format and prints it in the console.
 *
 * @example
 * let data = [
 *   ['ID', 'User', 'Age'],
 *   ['1', 'john doe', '24'],
 *   ['2', 'sally jones', '32']
 * ]
 * // returns
 * ----------------------
 * ID   User          Age
 * ----------------------
 * 1   john doe       24
 * 2   sally jones    32
 * ----------------------
 *
 * consoleLogTable(data)
 */
/*export const consoleLogTable = (arrayData: any[][], tableDef = initialConsoleLogTableDef) => {
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
                justify: !!arrayData.find((dataItem, idx) =>
                    idx === 0 ? false : isNaN(parseFloat((dataItem[col] ?? '0').toString()))
                )
                    ? 'L'
                    : 'R'
            })
        }
    }

    let firstRow = true

    if (useTableDef.surroundingLines) {
        console.log(' ')
        console.log(
            arrayData[0]
                .map((_columnValue, idx) => {
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
                })
                .join('---')
        )
    }

    for (const dataItem of arrayData) {
        console.log(
            dataItem
                .map((columnValue, idx) => {
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
                })
                .join('   ')
        )
        if (useTableDef.firstRowIsHeader && firstRow) {
            console.log(
                dataItem
                    .map((_columnValue, idx) => {
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
                    })
                    .join('---')
            )
        }
        firstRow = false
    }

    if (useTableDef.surroundingLines) {
        console.log(
            arrayData[0]
                .map((_columnValue, idx) => {
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
                })
                .join('---')
        )
        console.log(' ')
    }
} */

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/**
 * Truncates a string and replaces the remaining characters with ellipsis.
 *
 * @example
 * // returns "Welcome to&hellip;" and shown as "Welcome to..." in HTML
 * Trunc('Welcome to TSFoundation', 11)
 */
/**
 * Replace all occurences of a string.
 *
 * @example
 * // returns "john-doe-bob"
 * ReplaceAll(' ', '-', 'john doe bob')
 */
var ReplaceAll = function (find, replace, subject) {
    var e_1, _a;
    if (!subject)
        return '';
    if (Array.isArray(find)) {
        var result = subject;
        try {
            for (var find_1 = __values(find), find_1_1 = find_1.next(); !find_1_1.done; find_1_1 = find_1.next()) {
                var findItem = find_1_1.value;
                result = ReplaceAll(findItem, replace, result);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (find_1_1 && !find_1_1.done && (_a = find_1.return)) _a.call(find_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
    }
    // eslint-disable-next-line no-useless-escape
    return subject.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'), 'g'), replace);
};
/**
 * Cleans a number with a symbol like '$', ',' or '%'.
 *
 * @example
 * // return 100
 * CleanNumber('$100')
 *
 * // return 1000
 * CleanNumber('1,000')
 *
 * // return 50
 * CleanNumber('50%')
 *
 * Add a rounding to round to a certain number of digits:
 *
 * // return 100.1
 * CleanNumber('100.12', 1)
 */
var CleanNumber = function (value, roundClean, allowNaN) {
    if (!value)
        return 0;
    var str = value.toString();
    str = ReplaceAll('$', '', str);
    str = ReplaceAll(',', '', str);
    str = ReplaceAll('%', '', str);
    if (str.trim().length === 0 || isNaN(str))
        return !!allowNaN ? NaN : 0;
    if (roundClean !== undefined) {
        return RoundTo(parseFloat(str), roundClean);
    }
    return parseFloat(str);
};
var GreaterNumberNull = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return ValidNumbers(values)
        .reduce(function (result, value) { return (result === null || value > result) ? value : result; }, null);
};
var GreaterNumber = function () {
    var _a;
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return (_a = GreaterNumberNull.apply(void 0, __spread(values))) !== null && _a !== void 0 ? _a : 0;
};
var LeastNumberNull = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return ValidNumbers(values)
        .reduce(function (result, value) { return (result === null || value < result) ? value : result; }, null);
};
var LeastNumber = function () {
    var _a;
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return (_a = LeastNumberNull.apply(void 0, __spread(values))) !== null && _a !== void 0 ? _a : 0;
};
var ValidNumbers = function () {
    var e_2, _a, e_3, _b, e_4, _c;
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var returnValues = [];
    try {
        for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
            var value = values_1_1.value;
            var valueArray = ToArray(value);
            try {
                for (var valueArray_1 = (e_3 = void 0, __values(valueArray)), valueArray_1_1 = valueArray_1.next(); !valueArray_1_1.done; valueArray_1_1 = valueArray_1.next()) {
                    var valueItem = valueArray_1_1.value;
                    var subArray = ToArray(valueItem);
                    try {
                        for (var subArray_1 = (e_4 = void 0, __values(subArray)), subArray_1_1 = subArray_1.next(); !subArray_1_1.done; subArray_1_1 = subArray_1.next()) {
                            var subItem = subArray_1_1.value;
                            var calc = CleanNumberNull(subItem);
                            if (calc !== null) {
                                returnValues = __spread(returnValues, [calc]);
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (subArray_1_1 && !subArray_1_1.done && (_c = subArray_1.return)) _c.call(subArray_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (valueArray_1_1 && !valueArray_1_1.done && (_b = valueArray_1.return)) _b.call(valueArray_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return returnValues;
};
var AverageNumberNull = function (decimals) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var valids = ValidNumbers(values);
    if (valids.length === 0)
        return null;
    return CleanNumber(CleanNumbers(decimals, valids) / valids.length, decimals);
};
var AverageNumber = function (decimals) {
    var _a;
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    return (_a = AverageNumberNull(decimals, values)) !== null && _a !== void 0 ? _a : 0;
};
var CleanDivideNull = function (numerator, denominator) {
    if (numerator === undefined || numerator === null)
        return null;
    var useDenominator = CleanNumber(denominator);
    if (useDenominator === 0)
        return null;
    return CleanNumber(numerator) / useDenominator;
};
var CleanDivide = function (numerator, denominator) { var _a; return (_a = CleanDivideNull(numerator, denominator)) !== null && _a !== void 0 ? _a : 0; };
/**
 * Cleans a multiple numbers and rounds them
 *
 * @example
 * // return 112.23
 * CleanNumbers(2, '$100', 12.234)
 *
 * // return 1012.24
 * CleanNumbers(2, '$1,000', 12.236)
 *
 * // return 1012
 * CleanNumbers(0, '$1,000', 12.236)
 */
var CleanNumbers = function (roundTo) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    return ValidNumbers(values)
        .reduce(function (result, value) { return CleanNumber(result + value, roundTo); }, 0);
};
/**
 * Cleans a number with a symbol like '$', ',' or '%'.
 *
 * @example
 * // return 100
 * CleanNumberNull('$100')
 *
 * // return 1000
 * CleanNumberNull('1,000')
 *
 * // return 50DataToCSVExport
 * CleanNumberNull('50%')
 *
 * Add a rounding to round to a certain number of digits:
 *
 * // return 100.1
 * CleanNumberNull('100.12', 1)
 */
var CleanNumberNull = function (value, roundClean) {
    if (value === undefined || value === null)
        return null;
    var parsed = CleanNumber(value, roundClean, true);
    if (isNaN(parsed))
        return null;
    return parsed;
};
/**
 * A wrapper function for JSON.parse with try/catch.
 */
var JSONParse = function (json) {
    if (!json) {
        return null;
    }
    if (typeof json === 'object')
        return json;
    var returnObj = null;
    try {
        returnObj = JSON.parse(json);
    }
    catch (err) {
        // console.log('JSONParse', err)
        return null;
    }
    return returnObj;
};
var Trunc = function (subject, length) {
    return subject.length > length ? subject.substr(0, length - 1) + '&hellip;' : subject;
};
/**
 * Returns a google maps link with the given coordinates.
 *
 * @example
 * // returns "http://maps.google.com/maps?q=12345,12345"
 * GoogleMapsGPSLink({latitude: '12345', longitude: '12345'})
 */
var GoogleMapsGPSLink = function (dataArray, prefix) {
    var _a, _b;
    if (prefix === void 0) { prefix = ''; }
    var latitude = (_a = dataArray[prefix + 'latitude']) !== null && _a !== void 0 ? _a : '';
    var longitude = (_b = dataArray[prefix + 'longitude']) !== null && _b !== void 0 ? _b : '';
    return 'http://maps.google.com/maps?q=' + latitude + ',' + longitude;
};
/**
 * Returns a google maps link with the given address
 *
 * @example
 * // returns https://www.google.com/maps/search/?api=1&query=Blk%201,%20Lot%202,%20Some%20Street...
 *	GoogleMapsAddressLink({
 *		address1: 'Blk 1, Lot 2, Some Street',
 *		address2: 'Blk 2, Lot 3, Some Street',
 *		city: 'Burr Ridge',
 *		state: 'IL',
 *		zip: '61257',
 *	})
 */
var GoogleMapsAddressLink = function (dataArray, prefix) {
    var _a, _b, _c, _d, _e, _f;
    if (prefix === void 0) { prefix = ''; }
    var address = ((_b = (_a = dataArray[prefix + 'address1']) !== null && _a !== void 0 ? _a : dataArray[prefix + 'address_1']) !== null && _b !== void 0 ? _b : '') + ' ';
    if (!!dataArray[prefix + 'address2'] || !!dataArray[prefix + 'address_2']) {
        address += ((_c = dataArray[prefix + 'address2']) !== null && _c !== void 0 ? _c : dataArray[prefix + 'address_2']) + ' ';
    }
    address += ((_d = dataArray[prefix + 'city']) !== null && _d !== void 0 ? _d : '') + ', ';
    address += ((_e = dataArray[prefix + 'state']) !== null && _e !== void 0 ? _e : '') + ' ';
    address += (_f = dataArray[prefix + 'zip']) !== null && _f !== void 0 ? _f : '';
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(address);
};
/**
 * Determines whether a value is a valid input decimal.
 *
 * @example
 * // returns true
 * IsValidInputDecimal('1')
 *
 * // returns false
 * IsValidInputDecimal('1%')
 */
var IsValidInputDecimal = function (value) {
    // noinspection RegExpUnexpectedAnchor
    var regEx = new RegExp('^\\d{1,}(\\.\\d{0,4})?$');
    return !value || regEx.test(value);
};
/**
 * Generates a unique UID
 */
var GenerateUUID = function () {
    var d = new Date().getTime(); //Timestamp
    var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
            //Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        }
        else {
            //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : r & (0x3 | 0x8)).toString(16);
    });
};
/**
 * Determines a value is active or on. Returns true when the value
 * is one of the following:
 * 'true', 'active', 'on', 'yes', 'y'
 *
 * @example
 * // return true
 * IsOn('active')
 *
 * // return false
 * IsOn('inactive')
 */
var IsOn = function (value) {
    if (!value) {
        return false;
    }
    if (value === true) {
        return value;
    }
    var floatValue = parseFloat(value);
    if (!isNaN(floatValue)) {
        return floatValue > 0;
    }
    return ['true', 'active', 'on', 'yes', 'y'].includes(value.toString().toLowerCase().trim());
};
/**
 * Copies an address object to another object.
 *
 * Fields copied: address_1, address_2, city, state, zip, phone, timezone, latitude, longitude
 *
 * The "prefix" properties are simply appended: prefix: "employee_" results in "employee_address_1"
 *
 * @example
 * let address1 = {
 *   address_1: 'Blk 1, Lot 2, Some Street',
 *   address_2: 'Blk 2, Lot 3, Some Street',
 *   city: 'Burr Ridge',
 *   state: 'IL',
 *   zip: '61257',
 * }
 *
 * let address2 = {}
 * AddressCopy(address1, '', address2, '')
 * // address2 is now a copy of address1
 * console.log(address2)
 */
var AddressCopy = function (fromObject, fromPrefix, toObject, toPrefix, includeName, includePhone, includeTimeZone, includeGPS) {
    if (includeName === void 0) { includeName = true; }
    if (includePhone === void 0) { includePhone = true; }
    if (includeTimeZone === void 0) { includeTimeZone = true; }
    if (includeGPS === void 0) { includeGPS = true; }
    if (includeName && !!fromObject[fromPrefix + 'name']) {
        toObject[toPrefix + 'name'] = fromObject[fromPrefix + 'name'];
    }
    toObject[toPrefix + 'address_1'] = fromObject[fromPrefix + 'address_1'];
    toObject[toPrefix + 'address_2'] = fromObject[fromPrefix + 'address_2'];
    toObject[toPrefix + 'city'] = fromObject[fromPrefix + 'city'];
    toObject[toPrefix + 'state'] = fromObject[fromPrefix + 'state'];
    toObject[toPrefix + 'zip'] = fromObject[fromPrefix + 'zip'];
    if (includePhone && !!fromObject[fromPrefix + 'phone']) {
        toObject[toPrefix + 'phone'] = fromObject[fromPrefix + 'phone'];
    }
    if (includeTimeZone && !!fromObject[fromPrefix + 'timezone']) {
        toObject[toPrefix + 'timezone'] = fromObject[fromPrefix + 'timezone'];
    }
    if (includeGPS && !!fromObject[fromPrefix + 'latitude']) {
        toObject[toPrefix + 'latitude'] = fromObject[fromPrefix + 'latitude'];
    }
    if (includeGPS && !!fromObject[fromPrefix + 'longitude']) {
        toObject[toPrefix + 'longitude'] = fromObject[fromPrefix + 'longitude'];
    }
};
/**
 * Determines whether an object has a property of "address_1".
 *
 * @example
 * // returns false
 * AddressValid({ address: 'Blk1, Lot1, Some street' })
 *
 * // returns false
 * AddressValid({ address_1: '' })
 *
 * // returns true
 * AddressValid({ address_1: 'Blk1, Lot1, Some street' })
 */
var AddressValid = function (address, prefix) {
    return !!address[(prefix !== null && prefix !== void 0 ? prefix : '') + 'address_1'];
};
/**
 * Combines an address object into a single row string.
 *
 * @example
 * let address1 = {
 *   address_1: 'Blk 1, Lot 2, Some Street',
 *   address_2: 'Suite 100',
 *   city: 'Burr Ridge',
 *   state: 'IL',
 *   zip: '61257',
 * }
 *
 * // returns "Blk 1, Lot 2, Some Street, Suite 100, Burr Ridge, IL  61257"
 * AddressSingleRow(address1)
 */
var AddressSingleRow = function (object, prefix) {
    var _a, _b, _c, _d, _e;
    var usePrefix = prefix !== null && prefix !== void 0 ? prefix : '';
    var singleRow = ((_a = object[usePrefix + 'address_1']) !== null && _a !== void 0 ? _a : '').trim();
    if (!!((_b = object[usePrefix + 'address_2']) !== null && _b !== void 0 ? _b : ''))
        singleRow += ', ' + object[usePrefix + 'address_2'];
    if (!!((_c = object[usePrefix + 'city']) !== null && _c !== void 0 ? _c : ''))
        singleRow += ', ' + object[usePrefix + 'city'];
    if (!!((_d = object[usePrefix + 'state']) !== null && _d !== void 0 ? _d : ''))
        singleRow += ', ' + object[usePrefix + 'state'];
    if (!!((_e = object[usePrefix + 'zip']) !== null && _e !== void 0 ? _e : ''))
        singleRow += '  ' + object[usePrefix + 'zip'];
    return singleRow;
};
/**
 * Combines an address object into a multiline row string.
 *
 * @example
 * let address1 = {
 *   address_1: 'Blk 1, Lot 2, Some Street',
 *   address_2: 'Appt 1',
 *   city: 'Burr Ridge',
 *   state: 'IL',
 *   zip: '61257',
 * }
 *
 * // returns "
 * // Blk 1, Lot 2, Some Street
 * // Appt 1
 * // Burr Ridge, IL, 61257"
 * AddressMultiRow(address1)
 */
var AddressMultiRow = function (object, prefix) {
    var _a, _b, _c, _d, _e;
    var usePrefix = prefix !== null && prefix !== void 0 ? prefix : '';
    var multiRow = ((_a = object[usePrefix + 'address_1']) !== null && _a !== void 0 ? _a : '').trim();
    if (!!object[usePrefix + 'address_2']) {
        multiRow += '\n' + ((_b = object[usePrefix + 'address_2']) !== null && _b !== void 0 ? _b : '').trim();
    }
    if (!!((_c = object[usePrefix + 'city']) !== null && _c !== void 0 ? _c : ''))
        multiRow += '\n' + object[usePrefix + 'city'];
    if (!!((_d = object[usePrefix + 'state']) !== null && _d !== void 0 ? _d : ''))
        multiRow += ', ' + object[usePrefix + 'state'];
    if (!!((_e = object[usePrefix + 'zip']) !== null && _e !== void 0 ? _e : ''))
        multiRow += '  ' + object[usePrefix + 'zip'];
    return multiRow;
};
var ArrayToGuidString = function (byteArray) {
    return Array.from(byteArray, function (byte) {
        return ('0' + (byte & 0xff).toString(16)).slice(-2);
    })
        .join('')
        .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
};
var StringToByteArray = function (str) {
    var decoded = atob(str);
    var i, il = decoded.length;
    var array = new Uint8Array(il);
    for (i = 0; i < il; ++i) {
        array[i] = decoded.charCodeAt(i);
    }
    return array;
};
var FormUrlEncoded = function (x) { return Object.keys(x).reduce(function (p, c) { return p + ("&" + c + "=" + encodeURIComponent(x[c])); }, ''); };
var RoundTo = function (num, decimalPlaces, roundDir) {
    if (decimalPlaces === void 0) { decimalPlaces = 0; }
    if (roundDir === void 0) { roundDir = 'round'; }
    return roundDir === 'round' ? +Math.round((CleanNumber(num) + Number.EPSILON) * (Math.pow(10, decimalPlaces))) / (Math.pow(10, decimalPlaces))
        : roundDir === 'down' ? +Math.floor((CleanNumber(num) + Number.EPSILON) * (Math.pow(10, decimalPlaces))) / (Math.pow(10, decimalPlaces)) :
            +Math.ceil((CleanNumber(num) + Number.EPSILON) * (Math.pow(10, decimalPlaces))) / (Math.pow(10, decimalPlaces));
};
var ObjectToJSONString = function (val) { return "json:" + JSON.stringify(val); };
var JSONStringToObject = function (val) { return (!val ? undefined : val === 'json:undefined' ? undefined : val === 'json:null' ? null : JSONParse(val.toString().substr(5))); };
// noinspection JSPotentiallyInvalidConstructorUsage
/**
 * Is ArrayBuffer
 * @param buf
 */
var isAB = function (buf) { return buf instanceof (new Uint16Array()).constructor.prototype.__proto__.constructor; };
/**
 * ArrayBuffer to String
 * @param buf
 */
var ab2str = function (buf) { return isAB(buf) ? String.fromCharCode.apply(null, new Uint16Array(buf)) : buf; };
/**
 * String to ArrayBuffer
 * @param str
 */
var str2ab = function (str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
};
/**
 * Async version of find
 * @param array
 * @param predicate
 */
var findAsync = function (array, predicate) { return __awaiter(void 0, void 0, void 0, function () {
    var array_1, array_1_1, t, e_5_1;
    var e_5, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, 6, 7]);
                array_1 = __values(array), array_1_1 = array_1.next();
                _b.label = 1;
            case 1:
                if (!!array_1_1.done) return [3 /*break*/, 4];
                t = array_1_1.value;
                return [4 /*yield*/, predicate(t)];
            case 2:
                if (_b.sent()) {
                    return [2 /*return*/, t];
                }
                _b.label = 3;
            case 3:
                array_1_1 = array_1.next();
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 7];
            case 5:
                e_5_1 = _b.sent();
                e_5 = { error: e_5_1 };
                return [3 /*break*/, 7];
            case 6:
                try {
                    if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
                }
                finally { if (e_5) throw e_5.error; }
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/, undefined];
        }
    });
}); };
/**
 * Async version of some
 * @param array
 * @param predicate
 */
var someAsync = function (array, predicate) { return __awaiter(void 0, void 0, void 0, function () {
    var array_2, array_2_1, t, e_6_1;
    var e_6, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, 6, 7]);
                array_2 = __values(array), array_2_1 = array_2.next();
                _b.label = 1;
            case 1:
                if (!!array_2_1.done) return [3 /*break*/, 4];
                t = array_2_1.value;
                return [4 /*yield*/, predicate(t)];
            case 2:
                if (_b.sent()) {
                    return [2 /*return*/, true];
                }
                _b.label = 3;
            case 3:
                array_2_1 = array_2.next();
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 7];
            case 5:
                e_6_1 = _b.sent();
                e_6 = { error: e_6_1 };
                return [3 /*break*/, 7];
            case 6:
                try {
                    if (array_2_1 && !array_2_1.done && (_a = array_2.return)) _a.call(array_2);
                }
                finally { if (e_6) throw e_6.error; }
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/, false];
        }
    });
}); };
/**
 * Async version of every
 * @param array
 * @param predicate
 */
var everyAsync = function (array, predicate) { return __awaiter(void 0, void 0, void 0, function () {
    var array_3, array_3_1, t, e_7_1;
    var e_7, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, 6, 7]);
                array_3 = __values(array), array_3_1 = array_3.next();
                _b.label = 1;
            case 1:
                if (!!array_3_1.done) return [3 /*break*/, 4];
                t = array_3_1.value;
                return [4 /*yield*/, predicate(t)];
            case 2:
                if (!(_b.sent())) {
                    return [2 /*return*/, false];
                }
                _b.label = 3;
            case 3:
                array_3_1 = array_3.next();
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 7];
            case 5:
                e_7_1 = _b.sent();
                e_7 = { error: e_7_1 };
                return [3 /*break*/, 7];
            case 6:
                try {
                    if (array_3_1 && !array_3_1.done && (_a = array_3.return)) _a.call(array_3);
                }
                finally { if (e_7) throw e_7.error; }
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/, true];
        }
    });
}); };
/**
 * Async version of filter
 * @param array
 * @param predicate
 */
var filterAsync = function (array, predicate) { return __awaiter(void 0, void 0, void 0, function () {
    var returnArray, array_4, array_4_1, t, e_8_1;
    var e_8, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                returnArray = [];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, 7, 8]);
                array_4 = __values(array), array_4_1 = array_4.next();
                _b.label = 2;
            case 2:
                if (!!array_4_1.done) return [3 /*break*/, 5];
                t = array_4_1.value;
                return [4 /*yield*/, predicate(t)];
            case 3:
                if (_b.sent()) {
                    returnArray.push(t);
                }
                _b.label = 4;
            case 4:
                array_4_1 = array_4.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_8_1 = _b.sent();
                e_8 = { error: e_8_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (array_4_1 && !array_4_1.done && (_a = array_4.return)) _a.call(array_4);
                }
                finally { if (e_8) throw e_8.error; }
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/, returnArray];
        }
    });
}); };
/**
 * Converts a single value or array of values to an array of values
 *
 * @example
 * ToArray([1, 2, 3]) = [1, 2, 3]
 * ToArray(1) = [1]
 *
 * @param value
 * @constructor
 */
var ToArray = function (value) { return (value === null || value === undefined) ? [] : Array.isArray(value) ? value : [value]; };
/**
 * Generates a range of numbers
 *
 * @param end
 * @param increment
 * @param start
 * @constructor
 */
var ArrayRange = function (end, increment, start) {
    if (increment === void 0) { increment = 1; }
    if (start === void 0) { start = 0; }
    var useIncrement = end > start ? increment > 0 ? increment : GreaterNumber(increment * -1, 1)
        : increment < 0 ? increment : LeastNumber(increment * -1, -1);
    var results = [];
    var value = start;
    while (useIncrement > 0 ? end > value : end < value) {
        results.push(value);
        value += useIncrement;
    }
    return results;
};
var PropertiesExist = function (data) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    return keys.every(function (key) { return key in data; });
};
var PropertiesNotFalsey = function (data) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    return keys.every(function (key) { return key in data && !!data[key]; });
};
function OmitProperty(obj) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    var ret = {};
    var excludeSet = new Set(keys);
    // TS-NOTE: Set<K> makes the obj[key] type check fail. So, loosing typing here.
    for (var key in obj) {
        // noinspection JSUnfilteredForInLoop
        if (!excludeSet.has(key)) {
            // noinspection JSUnfilteredForInLoop
            ret[key] = obj[key];
        }
    }
    return ret;
}
function OmitFalsey(obj) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    var ret = __assign({}, obj);
    var excludeSet = new Set(keys);
    for (var key in obj) {
        if (excludeSet.has(key) && !ret[key]) {
            delete ret[key];
        }
    }
    return ret;
}
function OmitUndefined(obj) {
    var ret = __assign({}, obj);
    for (var key in obj) {
        if (key in obj && ret[key] === undefined) {
            delete ret[key];
        }
    }
    return ret;
}
function PickProperty(obj) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    var ret = {};
    var includeSet = new Set(keys);
    // TS-NOTE: Set<K> makes the obj[key] type check fail. So, loosing typing here.
    for (var key in obj) {
        // noinspection JSUnfilteredForInLoop
        if (includeSet.has(key)) {
            // noinspection JSUnfilteredForInLoop
            ret[key] = obj[key];
        }
    }
    return ret;
}
function RemoveStarting(remove, value, recursive) {
    var e_9, _a;
    if (recursive === void 0) { recursive = false; }
    if (!value || !remove)
        return '';
    var arrayRemove = ToArray(remove);
    var newValue = value;
    do {
        try {
            for (var arrayRemove_1 = (e_9 = void 0, __values(arrayRemove)), arrayRemove_1_1 = arrayRemove_1.next(); !arrayRemove_1_1.done; arrayRemove_1_1 = arrayRemove_1.next()) {
                var aRemove = arrayRemove_1_1.value;
                if (newValue.startsWith(aRemove)) {
                    newValue = newValue.substring(aRemove.length);
                }
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (arrayRemove_1_1 && !arrayRemove_1_1.done && (_a = arrayRemove_1.return)) _a.call(arrayRemove_1);
            }
            finally { if (e_9) throw e_9.error; }
        }
    } while (recursive && arrayRemove.some(function (aRemove) { return newValue.startsWith(aRemove); }));
    return newValue;
}
function RemoveEnding(remove, value, recursive) {
    var e_10, _a;
    if (recursive === void 0) { recursive = false; }
    if (!value || !remove)
        return '';
    var arrayRemove = ToArray(remove);
    var newValue = value;
    do {
        try {
            for (var arrayRemove_2 = (e_10 = void 0, __values(arrayRemove)), arrayRemove_2_1 = arrayRemove_2.next(); !arrayRemove_2_1.done; arrayRemove_2_1 = arrayRemove_2.next()) {
                var aRemove = arrayRemove_2_1.value;
                if (newValue.endsWith(aRemove)) {
                    newValue = newValue.substring(0, newValue.length - aRemove.length);
                }
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (arrayRemove_2_1 && !arrayRemove_2_1.done && (_a = arrayRemove_2.return)) _a.call(arrayRemove_2);
            }
            finally { if (e_10) throw e_10.error; }
        }
    } while (recursive && arrayRemove.some(function (aRemove) { return newValue.endsWith(aRemove); }));
    return newValue;
}
function CoalesceFalsey(checkVal) {
    var e_11, _a;
    var otherVals = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherVals[_i - 1] = arguments[_i];
    }
    if (!!checkVal || otherVals.length === 0)
        return checkVal;
    try {
        for (var otherVals_1 = __values(otherVals), otherVals_1_1 = otherVals_1.next(); !otherVals_1_1.done; otherVals_1_1 = otherVals_1.next()) {
            var otherVal = otherVals_1_1.value;
            if (!!otherVal)
                return otherVal;
        }
    }
    catch (e_11_1) { e_11 = { error: e_11_1 }; }
    finally {
        try {
            if (otherVals_1_1 && !otherVals_1_1.done && (_a = otherVals_1.return)) _a.call(otherVals_1);
        }
        finally { if (e_11) throw e_11.error; }
    }
    return otherVals[otherVals.length - 1];
}
/**
 * Get color brightness from RGB
 *
 * @param r
 * @param g
 * @param b
 * @constructor
 */
var ColorBrightnessRGB = function (r, g, b) { return (r * 0.299 + g * 0.587 + b * 0.114); };
/**
 * Get RGB from hex
 *
 * @param hex
 * @constructor
 */
var RBGFromHex = function (hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        return [0, 0, 0];
    }
    return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16)
    ];
};
/**
 * Get brightness from Hex color
 *
 * @param hex
 * @constructor
 */
var ColorBrightnessHex = function (hex) {
    var _a = __read(RBGFromHex(hex), 3), r = _a[0], g = _a[1], b = _a[2];
    return ColorBrightnessRGB(r, g, b);
};
/**
 * Inverts a RBG color, use the BW flag to set it to black or white
 *
 * @param r
 * @param g
 * @param b
 * @param bw
 * @constructor
 */
function InvertColorRGB(r, g, b, bw) {
    if (bw === void 0) { bw = false; }
    if (bw) {
        return ColorBrightnessRGB(r, g, b) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    var rs = (255 - r).toString(16), gs = (255 - g).toString(16), bs = (255 - b).toString(16);
    // pad each with zeros and return
    return '#' + rs.padStart(2, '0') + gs.padStart(2, '0') + bs.padStart(2, '0');
}
/**
 * Inverts a hex color, use the BW flag to set it to black or white
 *
 * @param hex
 * @param bw
 * @constructor
 */
function InvertColorHex(hex, bw) {
    if (bw === void 0) { bw = false; }
    var _a = __read(RBGFromHex(hex), 3), r = _a[0], g = _a[1], b = _a[2];
    return InvertColorRGB(r, g, b, bw);
}
function Sleep(ms) {
    if (ms === void 0) { ms = 200; }
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}

/**
 * Splits a string into its component words
 * @param str
 * @constructor
 */
var ToWords = function (str) {
    var e_1, _a, e_2, _b;
    if (!str)
        return [];
    var strArray = ToArray(str);
    var results = [];
    var separators = [' ', '_', ',', '-', '/', '\\', '\'', '"', '=', '+', '~', '.', ',', '(', ')', '<', '>', '{', '}'];
    try {
        loop_array: for (var strArray_1 = __values(strArray), strArray_1_1 = strArray_1.next(); !strArray_1_1.done; strArray_1_1 = strArray_1.next()) {
            var strItem = strArray_1_1.value;
            try {
                for (var separators_1 = (e_2 = void 0, __values(separators)), separators_1_1 = separators_1.next(); !separators_1_1.done; separators_1_1 = separators_1.next()) {
                    var separator = separators_1_1.value;
                    if (strItem.includes(separator)) {
                        results = ToWords(__spread(results, strItem.split(separator).filter(function (strText) { return !!strText; })));
                        continue loop_array;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (separators_1_1 && !separators_1_1.done && (_b = separators_1.return)) _b.call(separators_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            results = __spread(results, strItem.replace(/([A-Z]+|[A-Z]?[a-z]+)(?=[A-Z]|\b)/g, '!$&').split('!')).filter(function (strText) { return !!strText; });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (strArray_1_1 && !strArray_1_1.done && (_a = strArray_1.return)) _a.call(strArray_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return results.filter(function (strText) { return !!strText; });
};
var ToFirstLetterUpper = function (str) {
    if (!str)
        return '';
    return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
};
var ToFirstLetterUpperSmart = function (str) {
    if (!str)
        return '';
    if (str === str.toUpperCase())
        return str;
    if (str.toLowerCase() === 'id')
        return 'ID';
    return ToFirstLetterUpper(str);
};
/**
 * To Snake Case ('To Snake Case' = 'to_snake_case')
 * @param str
 * @constructor
 */
var ToSnakeCase = function (str) {
    return ToWords(str).map(function (st) { return st.toLowerCase(); }).join('_');
};
/**
 * Converts a string to kebab-case. *
 * @example
 * ToSnakeCase('UserToken')  // returns "user-token"
 */
var ToKebabCase = function (str) {
    return ToWords(str).map(function (st) { return st.toLowerCase(); }).join('-');
};
/**
 * Converts a string to camelCase.
 *
 * @example
 * ToCamelCase('user_token') //  returns "userToken
 */
var ToCamelCase = function (str) {
    return ToWords(str).map(function (st, idx) { return !idx ? st.toLowerCase() : st === st.toUpperCase() ? st : ToFirstLetterUpperSmart(st); }).join('');
};
/**
 * To Upper Case Words
 * @param str
 * @constructor
 */
var ToUpperCaseWords = function (str) {
    return ToWords(str).map(function (st) { return st === st.toUpperCase() ? st : ToFirstLetterUpperSmart(st); }).join(' ');
};
/**
 * Converts a string to PascalCase.
 *
 * @example
 * ToPascalCase('user_token') //  returns "UserToken
 */
var ToPascalCase = function (str) {
    return ToWords(str).map(function (st) { return st === st.toUpperCase() ? st : ToFirstLetterUpperSmart(st); }).join('');
};
/**
 * Takes a string and returns the initials, like "Dennis J Peters" = "DJP", and "Peters, Dennis J" = "DJP"
 * @param str
 * @constructor
 */
var ToInitials = function (str) {
    if (!str)
        return '';
    if (typeof str === 'string') {
        var commaItems = str.split(',');
        if (commaItems.length === 2) {
            return ToWords([commaItems[1], commaItems[0]]).map(function (st) { return st.substring(0, 1).toUpperCase(); }).join('');
        }
    }
    return ToWords(str).map(function (st) { return st.substring(0, 1).toUpperCase(); }).join('');
};
/**
 * Replaces links to an anchor tag.
 *
 * @example
 * // returns <a href='https://www.google.com' target='_blank'>https://www.google.com</a>
 * ReplaceLinks('https://www.google.com')
 */
var ReplaceLinks = function (subject) {
    if (!subject)
        return '';
    // noinspection RegExpUnnecessaryNonCapturingGroup
    var str = subject.replace(/(?:\r\n|\r|\n)/g, '<br />');
    // noinspection HtmlUnknownTarget
    var target = '<a href=\'$1\' target=\'_blank\'>$1</a>';
    // noinspection RegExpRedundantEscape
    return str.replace(/(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/gi, target);
};
/**
 * Removes script tags.
 *
 * @example
 * // returns "blank"
 * CleanScripts('<script>console.log(1)</script>blank')
 */
var CleanScripts = function (subject) {
    if (!subject)
        return '';
    return subject.replace(/<.*?script.*?>.*?<\/.*?script.*?>/gim, '');
};
/**
 * Removes any given HTML tag and retains what's inside of the tag.
 *
 * @example
 * // returns "john doe"
 * TextToHTML('<p>john doe</p>')
 */
var TextToHTML = function (subject) {
    if (!subject)
        return '';
    var str = subject.replace(/(<([^>]+)>)/gi, '');
    // noinspection RegExpUnnecessaryNonCapturingGroup
    return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
};
/**
 * Strips scripts and other tags from HTML
 *
 * @param subject
 * HTMLToText('<p>john doe</p>') // returns john doe
 */
var HTMLToText = function (subject) { return CleanScripts(subject).replace(/<[^>]*>/g, ''); };
var LeftPad = function (subject, length, padString) {
    var str = subject !== null && subject !== void 0 ? subject : '';
    while (str.length < length)
        str = padString + str;
    return str;
};
var RightPad = function (subject, length, padString) {
    var str = subject !== null && subject !== void 0 ? subject : '';
    while (str.length < length)
        str = str + padString;
    return str;
};
/**
 * Returns the given number with a dollar sign.
 *
 * @example
 * // returns $100.00
 * ToCurrency(100)
 */
var ToCurrency = function (value, decimals) {
    if (decimals === void 0) { decimals = 2; }
    return ('$' +
        CleanNumber(value).toLocaleString(undefined, {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals
        }));
};
/**
 * Returns the given number with a dollar sign.
 *
 * @example
 * // returns $100.00
 * ToCurrency(100)
 */
var ToCurrencyMax = function (value, decimals) {
    if (decimals === void 0) { decimals = 2; }
    return ('$' +
        CleanNumber(value).toLocaleString(undefined, {
            maximumFractionDigits: decimals
        }));
};
/**
 * Converts the given number to a percentage with a percent sign.
 *
 * @example
 * // returns 50%
 * ToPercent(0.5)
 */
var ToPercent = function (value, decimals) {
    if (decimals === void 0) { decimals = 0; }
    return ((CleanNumber(value) * 100).toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
    }) + '%');
};
/**
 * Converts the given number to a percentage with a percent sign.
 *
 * @example
 * // returns 50%
 * ToPercent(0.5)
 */
var ToPercentMax = function (value, decimals) {
    if (decimals === void 0) { decimals = 0; }
    return ((CleanNumber(value) * 100).toLocaleString(undefined, {
        maximumFractionDigits: decimals
    }) + '%');
};
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
var ToCurrencyBlank = function (value, decimals) {
    if (decimals === void 0) { decimals = 2; }
    if (!value || isNaN(value) || CleanNumber(value) === 0) {
        return '';
    }
    return ('$' +
        CleanNumber(value).toLocaleString(undefined, {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals
        }));
};
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
var ToCurrencyDash = function (value, decimals) {
    if (decimals === void 0) { decimals = 2; }
    if (!value || isNaN(value) || CleanNumber(value) === 0) {
        return '-';
    }
    return ('$' +
        CleanNumber(value).toLocaleString(undefined, {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals
        }));
};
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
var ToPercentBlank = function (value, decimals) {
    if (decimals === void 0) { decimals = 2; }
    if (!value || isNaN(value) || CleanNumber(value) === 0) {
        return '';
    }
    return ((CleanNumber(value) * 100).toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
    }) + '%');
};
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
var ToPercentDash = function (value, decimals) {
    if (decimals === void 0) { decimals = 2; }
    if (!value || isNaN(value) || CleanNumber(value) === 0) {
        return '-';
    }
    return ((CleanNumber(value) * 100).toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
    }) + '%');
};
/**
 * Returns the given number with decimal places.
 *
 * @example
 * // return 10.00
 * ToDigits(10)
 */
var ToDigits = function (value, decimals, minDecimals) {
    if (decimals === void 0) { decimals = 0; }
    if (minDecimals === void 0) { minDecimals = null; }
    return CleanNumber(value).toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: minDecimals !== null && minDecimals !== void 0 ? minDecimals : decimals
    });
};
/**
 * Returns the given number with decimal places.
 *
 * @example
 * // return 10.00
 * ToDigits(10)
 */
var ToDigitsMax = function (value, decimals) {
    if (decimals === void 0) { decimals = 0; }
    return CleanNumber(value, decimals).toLocaleString(undefined, {
        maximumFractionDigits: decimals
    });
};
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
var ToDigitsBlank = function (value, decimals) {
    if (decimals === void 0) { decimals = 0; }
    if (!value || isNaN(value) || CleanNumber(value) === 0) {
        return '';
    }
    return CleanNumber(value).toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
    });
};
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
var ToDigitsBlankMax = function (value, decimals) {
    if (decimals === void 0) { decimals = 0; }
    if (!value || isNaN(value) || CleanNumber(value, decimals) === 0) {
        return '';
    }
    return CleanNumber(value, decimals).toLocaleString(undefined, {
        maximumFractionDigits: decimals
    });
};
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
var ToDigitsDash = function (value, decimals) {
    if (decimals === void 0) { decimals = 0; }
    if (!value || isNaN(value) || CleanNumber(value) === 0) {
        return '-';
    }
    return CleanNumber(value).toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
    });
};
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
var ToDigitsDashMax = function (value, decimals) {
    if (decimals === void 0) { decimals = 0; }
    if (!value || isNaN(value) || CleanNumber(value, decimals) === 0) {
        return '-';
    }
    return CleanNumber(value, decimals).toLocaleString(undefined, {
        maximumFractionDigits: decimals
    });
};
var DigitsNth = function (value) {
    var result = ToDigits(value);
    if (!result)
        return null;
    switch (result.substr(-2)) {
        case '11':
        case '12':
        case '13':
            result += 'th';
            break;
        default:
            switch (result.substr(-1)) {
                case '1':
                    result += 'st';
                    break;
                case '2':
                    result += 'nd';
                    break;
                case '3':
                    result += 'rd';
                    break;
                default:
                    result += 'th';
                    break;
            }
    }
    return result;
};
/**
 * Converts a string to an array.
 *
 * @example
 * // returns ['john doe']
 * ToStringArray('john doe')
 */
var ToStringArray = function (value) {
    if (!value) {
        return [];
    }
    if (typeof value === 'string') {
        return [value];
    }
    else {
        return value;
    }
};
/**
 * Returns a formatted ssn with dashes.
 *
 * @example
 * // returns 123-12-1234
 * FormatSSN('123121234')
 */
var FormatSSN = function (ssn) {
    // remove all non-dash and non-numerals
    var val = (ssn !== null && ssn !== void 0 ? ssn : '').replace(/[^\d-]/g, '');
    // add the first dash if number from the second group appear
    val = val.replace(/^(\d{3})-?(\d{1,2})/, '$1-$2');
    // add the second dash if numbers from the third group appear
    val = val.replace(/^(\d{3})-?(\d{2})-?(\d{1,4})/, '$1-$2-$3');
    // remove misplaced dashes
    val = val.split('').filter(function (val, idx) {
        return val !== '-' || idx === 3 || idx === 6;
    }).join('');
    // enforce max length
    return val.substring(0, 11);
};
var PhoneComponents = function (phone) {
    var cleanNumber = ReplaceAll(['(', ')', '-', ' ', '+'], '', phone);
    var countryCode = '';
    while ((cleanNumber.startsWith('0') || cleanNumber.startsWith('1')) && cleanNumber.length !== 10) {
        countryCode += cleanNumber[0];
        cleanNumber = cleanNumber.substr(1);
    }
    var phoneComponents = {
        countryCode: countryCode,
        areaCode: cleanNumber.substr(0, 3),
        exchangeNumber: cleanNumber.substr(3, 3),
        subscriberNumber: cleanNumber.substr(6, 4),
        extension: ''
    };
    if (!!phoneComponents.areaCode && !!phoneComponents.exchangeNumber && !!phoneComponents.subscriberNumber) {
        var originalPhone = phone !== null && phone !== void 0 ? phone : '';
        var extensionIdx = originalPhone.indexOf(phoneComponents.areaCode);
        if (extensionIdx >= 0) {
            extensionIdx = originalPhone.indexOf(phoneComponents.exchangeNumber, extensionIdx + phoneComponents.areaCode.length);
            if (extensionIdx >= 0) {
                extensionIdx = originalPhone.indexOf(phoneComponents.subscriberNumber, extensionIdx + phoneComponents.exchangeNumber.length);
                if (extensionIdx >= 0) {
                    phoneComponents.extension = originalPhone.substr(extensionIdx + phoneComponents.subscriberNumber.length).trim();
                }
            }
        }
    }
    return phoneComponents;
};
/**
 * Returns a formatted ssn with dashes.
 *
 * @example
 * // returns 123-12-1234
 * FormatSSN('123121234')
 */
var FormatPhoneNumber = function (phone) {
    var components = PhoneComponents(phone);
    var val = '';
    if (!!components.areaCode)
        val += "(" + components.areaCode + ")";
    if (!!components.exchangeNumber)
        val += " " + components.exchangeNumber;
    if (!!components.subscriberNumber)
        val += "-" + components.subscriberNumber;
    if (!!components.extension)
        val += " " + components.extension;
    return val;
};
/**
 * Returns a formatted phone number with parenthesis.
 *
 * @example
 * // returns (555) 555-1234
 * FormatPhoneNumber('5555551234')
 */
var FormatPhoneNumberOld = function (phone, forceNumeric) {
    if (forceNumeric === void 0) { forceNumeric = false; }
    //Filter only numbers from the input
    var cleaned = forceNumeric ? ('' + phone).replace(/\D/g, '') : '' + phone;
    //Check if the input is of correct
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        //Remove the matched extension code
        //Change this to format for any country code.
        var intlCode = match[1] ? '+1 ' : '';
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phone;
};
/**
 * Returns a formatted phone number with dots.
 *
 * @example
 * // returns 555.555.1234
 * FormatPhoneNumberDots('5555551234')
 */
var FormatPhoneNumberDots = function (phone, forceNumeric) {
    if (forceNumeric === void 0) { forceNumeric = false; }
    //Filter only numbers from the input
    var cleaned = forceNumeric ? ('' + phone).replace(/\D/g, '') : '' + phone;
    //Check if the input is of correct
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        //Remove the matched extension code
        //Change this to format for any country code.
        var intlCode = match[1] ? '+1 ' : '';
        return [intlCode, match[2], '.', match[3], '.', match[4]].join('');
    }
    return phone;
};
/**
 * Formats a zip code by adding a hyphen in a 9 digit code.
 *
 * @example
 * // returns "12345-6789"
 * FormatZip('123456789')
 */
var FormatZip = function (zip) {
    //Filter only numbers from the input
    var cleaned = ('' + zip).replace(/\D/g, '');
    // check if the input is a 9 digit code
    if (cleaned.length === 9) {
        cleaned = cleaned.replace(/(\d{5})/, '$1-');
    }
    return cleaned;
};
/**
 * Adds "http" on urls that don't have it.
 *
 * @example
 * // returns "http://www.google.com"
 * FormatExternalURL('www.google.com')
 */
var FormatExternalURL = function (url) {
    if (!!url) {
        if (!url.startsWith('http')) {
            return 'http://' + url;
        }
        return url;
    }
    return '';
};
/**
 * Returns formatted full name.
 *
 * @example
 * // returns 'Doe, John Smith, Jr.'
 * DisplayNameFromFL('John', 'Doe', 'Smith', 'Jr.')
 */
var DisplayNameFromFL = function (first, last, middle, suffix) {
    var returnName = '';
    if (!!last) {
        returnName += last;
        if (!!first) {
            returnName += ', ' + first;
            if (!!middle) {
                returnName += ' ' + middle;
            }
        }
        else if (!!middle) {
            returnName += ', ' + middle;
        }
    }
    else {
        if (!!first) {
            returnName += first;
            if (!!middle) {
                returnName += ' ' + middle;
            }
        }
        else {
            if (!!middle) {
                returnName += middle;
            }
        }
    }
    if (!!suffix) {
        if (!!returnName) {
            returnName += ', ';
        }
        returnName += suffix;
    }
    return returnName;
};
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
var DisplayNameFromObject = function (object, prefix) {
    if (!object)
        return '';
    var actualPrefix = !!prefix ? "_" + prefix : '';
    return DisplayNameFromFL(object[actualPrefix + 'first_name'], object[actualPrefix + 'last_name'], object[actualPrefix + 'middle_name'], object[actualPrefix + 'suffix_name']);
};
/**
 * Converts the first character of each word of a string to uppercase.
 *
 * @example
 * // return This Is Awesome
 * UCWords('This is awesome')
 */
var UCWords = function (str) {
    if (!str) {
        return str;
    }
    var strVal = '';
    var strItems = str.toLowerCase().split(' ');
    for (var chr = 0; chr < strItems.length; chr++) {
        strVal += strItems[chr].substring(0, 1).toUpperCase() + strItems[chr].substring(1, strItems[chr].length) + ' ';
    }
    return strVal.trim();
};
/**
 * Generates a random string with a given length and valid characters.
 *
 * @example
 * // returns '32112'
 * RandomString(5, '12345')
 */
var RandomString = function (length, validChars) {
    if (validChars === void 0) { validChars = 'ABCDEFGHJKLMNPQRTUVWXYZ2346789'; }
    var result = '';
    var charactersLength = validChars.length;
    for (var i = 0; i < length; i++) {
        result += validChars.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
    // const validCharLength = validChars.length - 1
    //
    // let result = ''
    // for (let i = 0; i < length; i++) {
    // 	result += validChars.substr(Math.floor(Math.random() * validCharLength), 1)
    // }
    //
    // const ts = new Date().valueOf().toString()
    //
    // if (length > ts.length * 0.5) {
    // 	const offset = RoundTo((length - ts.length) / 2, 0)
    //
    // 	return result.substr(0, offset) + ts + result.substr(offset + ts.length)
    // }
    //
    // return result
};
var RandomKey = function (length) { return RandomString(length, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12346789'); };
/**
 * Takes in text, and adds an "s" to the end of it if the count is zero or > 1
 * Note: An 'es' is added if the word ends in: s, ss, z, ch, sh, or x
 *
 * @param text
 * @param count
 * @param showNumber
 * @param maxDecimals
 * @param minDecimals
 * @constructor
 */
var AddS = function (text, count, showNumber, maxDecimals, minDecimals) {
    if (showNumber === void 0) { showNumber = false; }
    if (maxDecimals === void 0) { maxDecimals = 0; }
    if (minDecimals === void 0) { minDecimals = null; }
    var checkText = (text !== null && text !== void 0 ? text : '').toLowerCase();
    var numericText = ToDigits(count !== null && count !== void 0 ? count : 0, maxDecimals, minDecimals);
    var addValue = !text ? 's' : (checkText.endsWith('s') || checkText.endsWith('z') || checkText.endsWith('ch') || checkText.endsWith('sh') || checkText.endsWith('x')) ? 'es' : 's';
    return !text ? '' : ((showNumber ? numericText : '') + " " + text + (CleanNumber(numericText) !== 1 ? addValue : '')).trim();
};
var ShortNumber = function (value, decimals, round) {
    if (decimals === void 0) { decimals = 0; }
    if (round === void 0) { round = 'round'; }
    var calcValue = CleanNumberNull(value);
    if (calcValue === null)
        return null;
    var showValue = function (val, extension) {
        var returnVal = ToDigits(RoundTo(val, decimals, round), decimals);
        if (!!decimals) {
            while (returnVal.endsWith('0'))
                returnVal = returnVal.substr(0, returnVal.length - 1);
            while (returnVal.endsWith('.'))
                returnVal = returnVal.substr(0, returnVal.length - 1);
        }
        return returnVal + extension;
    };
    if (calcValue < 999) {
        return showValue(calcValue, '');
    }
    calcValue /= 1000;
    if (calcValue < 999) {
        return showValue(calcValue, 'k');
    }
    calcValue /= 1000;
    if (calcValue < 999) {
        return showValue(calcValue, 'M');
    }
    calcValue /= 1000;
    if (calcValue < 999) {
        return showValue(calcValue, 'B');
    }
    calcValue /= 1000;
    if (calcValue < 999) {
        return showValue(calcValue, 'T');
    }
    var trillions = '';
    do {
        trillions += 'Q';
        calcValue /= 1000;
    } while (calcValue > 999);
    return showValue(calcValue, trillions);
};
var EllipsesAtMax = function (value, maxCharacters) {
    if (maxCharacters === void 0) { maxCharacters = 15; }
    if (!value || value.length <= maxCharacters)
        return value;
    return value.substring(0, maxCharacters) + "...";
};
var AsteriskMatch = function (value, asteriskPattern) {
    var _a;
    if (!value)
        return false;
    var regex = ReplaceAll('*', '([\\s\\S]*?)', ReplaceAll('\\', '\\/', asteriskPattern));
    if (!regex)
        return false;
    return !!((_a = value.match(new RegExp(regex))) === null || _a === void 0 ? void 0 : _a.length);
};
var BuildPath = function () {
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i] = arguments[_i];
    }
    var build = paths.map(function (part, i) {
        if (i === 0) {
            return (part !== null && part !== void 0 ? part : '').trim().replace(/[\/]*$/g, '');
        }
        else {
            return (part !== null && part !== void 0 ? part : '').trim().replace(/(^[\/]*|[\/]*$)/g, '');
        }
    }).filter(function (x) { return x.length; }).join('/');
    if (paths[0] === '/' && !build.startsWith('/'))
        return '/' + build;
    return build;
};

function isObject(object) {
    return object !== null && object !== undefined && typeof object === 'object';
}
var DeepEqual = function (object1, object2) {
    var e_1, _a;
    var _b, _c;
    if (object1 === undefined && object2 === undefined)
        return true;
    if (object1 === null && object2 === null)
        return true;
    if ((!object1 && !!object2) || (!!object1 && !object2) || typeof object1 !== typeof object2)
        return false;
    if (Array.isArray(object1)) {
        if (object1.length !== object2.length)
            return false;
        for (var i = 0; i < object1.length; i++) {
            if (!DeepEqual(object1[i], object2[i]))
                return false;
        }
        return true;
    }
    switch (typeof object1) {
        case 'function':
            return true;
        case 'object':
            if (typeof object1 === 'object' && ((_b = object1.type) === null || _b === void 0 ? void 0 : _b.toString().includes('react.')))
                return true;
            if (typeof object2 === 'object' && ((_c = object2.type) === null || _c === void 0 ? void 0 : _c.toString().includes('react.')))
                return true;
            var keys1 = Object.keys(object1);
            var keys2 = Object.keys(object2);
            if (keys1.length !== keys2.length) {
                return false;
            }
            try {
                for (var keys1_1 = __values(keys1), keys1_1_1 = keys1_1.next(); !keys1_1_1.done; keys1_1_1 = keys1_1.next()) {
                    var key = keys1_1_1.value;
                    var val1 = object1[key];
                    var val2 = object2[key];
                    if (typeof val1 !== typeof val2)
                        return false;
                    var areObjects = isObject(val1) && isObject(val2);
                    if ((areObjects && !DeepEqual(val1, val2)) ||
                        (!areObjects && val1 !== val2)) {
                        return false;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (keys1_1_1 && !keys1_1_1.done && (_a = keys1_1.return)) _a.call(keys1_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return true;
        case 'string':
            if (typeof object2 === 'string') {
                var ts1 = DateParseTS(object1);
                if (!!ts1) {
                    var ts2 = DateParseTS(object2);
                    if (!!ts2) {
                        return DateCompare(ts1, 'IsSame', ts2, 'second');
                    }
                }
            }
            return object1 === object2;
        default:
            return object1 === object2;
    }
};
var SubsetEqual = function (subset, superset) {
    var e_2, _a;
    var _b, _c;
    if (subset === undefined && superset === undefined)
        return true;
    if (subset === null && superset === null)
        return true;
    if ((!subset && !!superset) || (!!subset && !superset))
        return false;
    if (Array.isArray(subset)) {
        if (subset.length !== superset.length)
            return false;
        for (var i = 0; i < subset.length; i++) {
            if (!SubsetEqual(subset[i], superset[i]))
                return false;
        }
        return true;
    }
    switch (typeof subset) {
        case 'function':
            return true;
        case 'boolean':
            return IsOn(subset) === IsOn(superset);
        case 'object':
            if (typeof subset === 'object' && ((_b = subset.type) === null || _b === void 0 ? void 0 : _b.toString().includes('react.')))
                return true;
            if (typeof superset === 'object' && ((_c = superset.type) === null || _c === void 0 ? void 0 : _c.toString().includes('react.')))
                return true;
            var keysSub = Object.keys(subset);
            try {
                for (var keysSub_1 = __values(keysSub), keysSub_1_1 = keysSub_1.next(); !keysSub_1_1.done; keysSub_1_1 = keysSub_1.next()) {
                    var key = keysSub_1_1.value;
                    if (!SubsetEqual(subset[key], superset[key]))
                        return false;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (keysSub_1_1 && !keysSub_1_1.done && (_a = keysSub_1.return)) _a.call(keysSub_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return true;
        case 'string':
            if (typeof superset === 'boolean') {
                return IsOn(subset) === IsOn(superset);
            }
            if (typeof superset === 'string') {
                var ts1 = DateParseTS(subset);
                if (!!ts1) {
                    var ts2 = DateParseTS(superset);
                    if (!!ts2) {
                        return DateCompare(ts1, 'IsSame', ts2, 'second');
                    }
                }
            }
            if (typeof superset === 'number') {
                var cn1 = CleanNumberNull(subset);
                if (cn1 !== null)
                    return superset === cn1;
            }
            return subset == superset;
        case 'number':
            if (typeof superset === 'string') {
                var cn1 = CleanNumberNull(superset);
                if (cn1 !== null)
                    return subset === cn1;
            }
            return subset == superset;
        default:
            return subset == superset;
    }
};
var SubsetFormEqual = function (subset, superset) {
    var e_3, _a;
    var _b, _c;
    if (subset === undefined && superset === undefined)
        return true;
    if (subset === null && superset === null)
        return true;
    if ((subset === '' && superset === null) || (subset === null && superset === ''))
        return true;
    if ((subset === 'false' && !superset) || (!subset && superset === 'false'))
        return true;
    if ((!subset && !!superset) || (!!subset && !superset))
        return false;
    if (Array.isArray(subset)) {
        if (subset.length !== superset.length)
            return false;
        for (var i = 0; i < subset.length; i++) {
            if (!SubsetFormEqual(subset[i], superset[i]))
                return false;
        }
        return true;
    }
    switch (typeof subset) {
        case 'function':
            return true;
        case 'boolean':
            return IsOn(subset) === IsOn(superset);
        case 'object':
            if (typeof subset === 'object' && ((_b = subset.type) === null || _b === void 0 ? void 0 : _b.toString().includes('react.')))
                return true;
            if (typeof superset === 'object' && ((_c = superset.type) === null || _c === void 0 ? void 0 : _c.toString().includes('react.')))
                return true;
            var keysSub = Object.keys(subset);
            try {
                for (var keysSub_2 = __values(keysSub), keysSub_2_1 = keysSub_2.next(); !keysSub_2_1.done; keysSub_2_1 = keysSub_2.next()) {
                    var key = keysSub_2_1.value;
                    if (!SubsetFormEqual(subset[key], superset[key]))
                        return false;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (keysSub_2_1 && !keysSub_2_1.done && (_a = keysSub_2.return)) _a.call(keysSub_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return true;
        case 'string':
            if (typeof superset === 'boolean') {
                return IsOn(subset) === IsOn(superset);
            }
            if (typeof superset === 'string') {
                if (subset.includes('-') || subset.includes('/')) {
                    var ts1 = DateParseTS(subset);
                    if (!!ts1) {
                        if (superset.includes('-') || superset.includes('/')) {
                            var ts2 = DateParseTS(superset);
                            if (!!ts2) {
                                return DateCompare(ts1, 'IsSame', ts2, 'second');
                            }
                        }
                    }
                }
            }
            if (typeof superset === 'number') {
                var cn1 = CleanNumberNull(subset);
                if (cn1 !== null)
                    return superset === cn1;
            }
            return subset == superset;
        case 'number':
            if (typeof superset === 'string') {
                var cn1 = CleanNumberNull(superset);
                if (cn1 !== null)
                    return subset === cn1;
            }
            return subset == superset;
        default:
            return subset == superset;
    }
};

var DATE_FORMAT_DATE = 'YYYY-MM-DD';
var DATE_FORMAT_TIME_SECONDS = 'HH:mm:ss';
var DATE_FORMAT_TIME_NO_SECONDS = 'HH:mm';
var DATE_FORMAT_DATE_TIME = DATE_FORMAT_DATE + ' ' + DATE_FORMAT_TIME_SECONDS;
var DATE_FORMAT_DATE_DISPLAY = "MMM D, YYYY";
var DATE_FORMAT_DATE_DISPLAY_DOW = "dd, " + DATE_FORMAT_DATE_DISPLAY;
var DATE_FORMAT_TIME_DISPLAY = 'h:mm a';
var DATE_FORMAT_DATE_TIME_DISPLAY = DATE_FORMAT_DATE_DISPLAY + ", " + DATE_FORMAT_TIME_DISPLAY;
var DATE_FORMAT_DATE_TIME_DISPLAY_DOW = DATE_FORMAT_DATE_DISPLAY_DOW + ", " + DATE_FORMAT_TIME_DISPLAY;
var DATE_FORMAT_DATE_DISPLAY_LONG = "MMMM D, YYYY";
var DATE_FORMAT_DATE_DISPLAY_DOW_LONG = "dddd, " + DATE_FORMAT_DATE_DISPLAY_LONG;
var DATE_FORMAT_DATE_TIME_DISPLAY_LONG = DATE_FORMAT_DATE_DISPLAY_LONG + ", " + DATE_FORMAT_TIME_DISPLAY;
var DATE_FORMAT_DATE_TIME_DISPLAY_DOW_LONG = DATE_FORMAT_DATE_DISPLAY_DOW_LONG + ", " + DATE_FORMAT_TIME_DISPLAY;
/**
 * Current time in ISO string format
 */
var NowISOString = function (adjustment) { var _a; return !adjustment ? new Date().toISOString() : (_a = DateISO('now', adjustment)) !== null && _a !== void 0 ? _a : new Date().toISOString(); };
var CurrentTimeZone = function () { return Intl.DateTimeFormat().resolvedOptions().timeZone; };
var IANAOffset = function (timeZone, sourceDate) {
    var _a;
    if (!timeZone)
        return ((_a = DateObject(sourceDate !== null && sourceDate !== void 0 ? sourceDate : 'now', { ignoreIANA: true })) !== null && _a !== void 0 ? _a : new Date()).getTimezoneOffset();
    var sourceTS = !!sourceDate ? DateParseTSInternal(sourceDate, undefined, true) : null;
    var date = !sourceTS ? new Date() : new Date(sourceTS);
    function objFromStr(str) {
        var array = str.replace(':', ' ').split(' ');
        return {
            day: parseInt(array[0]),
            hour: parseInt(array[1]),
            minute: parseInt(array[2])
        };
    }
    var str = date.toLocaleString(['nl-NL'], {
        timeZone: timeZone,
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });
    var other = objFromStr(str);
    // console.log('Other', str, other)
    var amsterdamOffset = other.day * 1440 + other.hour * 60 + other.minute;
    str = date.toLocaleString(['nl-NL'], { day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false });
    var myLocale = objFromStr(str);
    // console.log('Locale', str, myLocale)
    var myLocaleOffset = myLocale.day * 1440 + myLocale.hour * 60 + myLocale.minute;
    // if (myLocaleOffset < amsterdamOffset) myLocaleOffset += amsterdamOffset
    // 	console.log('Here', process.env.TZ, timeZone, sourceDate, other.day, amsterdamOffset, myLocale.day, myLocaleOffset, date.getTimezoneOffset())
    if (other.day > myLocale.day) {
        myLocaleOffset += other.day * 1440;
    }
    // console.log('There', other.day, amsterdamOffset, myLocale.day, myLocaleOffset)
    // } else if (other.day < myLocale.day) {
    // console.log('There')
    // myLocaleOffset -= other.day * 1440
    var result = myLocaleOffset - amsterdamOffset + date.getTimezoneOffset();
    // console.log('Here', str, result, amsterdamOffset, myLocaleOffset, date.getTimezoneOffset())
    // if (result >= 1440 || result <= -1440) result = result % 1440
    // while (result >= 1440 /* 24 * 60 */) {
    // 	result -= 1440
    // }
    // while (result <= -1440 /*24 * 60 * -1 */) {
    // 	result += 1440
    // }
    // if (!!sourceDate) result += 0
    return result % 1440;
    // return myLocaleOffset - amsterdamOffset + date.getTimezoneOffset()
    // const timeZoneName = Intl.DateTimeFormat('ia', {
    // 	timeZoneName: 'short',
    // 	timeZone: timeZone ?? CurrentTimeZone()
    // })
    // 	.formatToParts()
    // 	.find((i) => i.type === 'timeZoneName')?.value
    // const offset = timeZoneName?.slice(3)
    // if (!offset) return 0
    //
    // const matchData = offset.match(/([+-])(\d+)(?::(\d+))?/)
    // if (!matchData) {
    // 	console.log(`cannot parse timezone name: ${timeZoneName}`)
    // 	return null
    // }
    //
    // const [, sign, hour, minute] = matchData
    // let result = parseInt(hour) * 60
    // if (sign === '+') result *= -1
    // if (minute) result += parseInt(minute)
    //
    // return result
};
var StringHasTimeData = function (value) { return value.includes(':'); };
var StringHasDateData = function (value) { return value.includes('-') || /\d{8}/.test(value); };
var StringHasTimeZoneData = function (value) {
    return value === 'now' ||
        value === 'today' ||
        value.includes('T') ||
        value.substr(15).includes('Z') ||
        value.includes('+') ||
        value.substr(15).includes('-');
};
var IsDateString = function (value) {
    if (!value || typeof value !== 'string')
        return false;
    if (!StringHasDateData(value))
        return false;
    return !!DateParseTSInternal(value);
};
var ManualParse = function (date) {
    var _a, _b, _c, _d;
    var regexps = [
        '([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?',
        '([0-9]{4})(-([0-9]{2})(-([0-9]{2})( ([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?'
    ];
    var d = regexps.reduce(function (result, regexp) {
        var nextMatch = (date.length === 16 ? date + ':00' : date).match(new RegExp(regexp));
        if (!result)
            return nextMatch;
        if (!nextMatch)
            return result;
        if (!!nextMatch[10] && !result[10])
            return nextMatch;
        return result;
    }, null);
    if (d === null) {
        return null;
    }
    // console.log(d)
    var dateObj = new Date(CleanNumber(d[1]), 0, 1);
    if (d[1]) {
        dateObj.setUTCFullYear(CleanNumber(d[1]));
    }
    if (d[3]) {
        dateObj.setUTCMonth(CleanNumber(d[3]) - 1);
    }
    if (d[5]) {
        dateObj.setUTCDate(CleanNumber(d[5]));
    }
    // if (d[7]) {
    dateObj.setUTCHours(CleanNumber((_a = d[7]) !== null && _a !== void 0 ? _a : 0));
    // }
    // if (d[8]) {
    dateObj.setUTCMinutes(CleanNumber((_b = d[8]) !== null && _b !== void 0 ? _b : 0));
    // }
    // if (d[10]) {
    dateObj.setUTCSeconds(CleanNumber((_c = d[10]) !== null && _c !== void 0 ? _c : 0));
    // }
    // if (d[12]) {
    dateObj.setUTCMilliseconds(CleanNumber(((_d = d[12]) !== null && _d !== void 0 ? _d : 0).toString().padEnd(3, '0').substr(0, 3)));
    // }
    var offsetHours = 0;
    if (d[14]) {
        offsetHours = CleanNumber(d[16]) + parseInt(d[17], 10);
        offsetHours *= d[15] === '-' ? 1 : -1;
        // console.log('o off', dateObj.getTime(), offset)
        // } else if (!date.includes('Z') && !date.includes('T') && (date.substr(-3, 1) === '-' || date.substr(-3, 1) === '+')) {
        // offset -= CleanNumber(date.substr(-3))
        // console.log('ei off', dateObj.getTime(), offset, date.substr(-3))
        // } else if (date.includes('Z') && date.includes('T')) {
        // console.log('Here')
        // offset -= (dateObj.getTimezoneOffset() / 60)
        // console.log('t off', dateObj.getTimezoneOffset(), offset)
        // } else {
        // offset -= (dateObj.getTimezoneOffset() / 60)
        // console.log('e off', dateObj.getTime(), offset)
    }
    else if (date.length > 12) {
        var last3 = date.substring(date.length - 3);
        if (last3.startsWith('-') || last3.endsWith('+')) {
            offsetHours -= CleanNumber(last3);
            // console.log('Offset', dateObj, offset)
        }
    }
    // console.log(date, d, dateObj, offset)
    // console.log('offset', dateObj, offset, dateObj.getTime())
    // console.log('Trying...', dateObj, offsetHours)
    var time = dateObj.valueOf() + offsetHours * 3600000;
    var newDateObj = new Date(time);
    if (!newDateObj)
        return null;
    return newDateObj.valueOf();
};
var DateParseTSInternal = function (date, timezoneSource, ignoreIANA) {
    var _a, _b;
    if (!date)
        return null; // new Date().valueOf() // Date.parse(new Date().toString())
    if (typeof date === 'number')
        return date;
    if (typeof date === 'object')
        return date.valueOf();
    if (date.toString().toLowerCase() === 'now' || date.toString().toLowerCase() === 'today')
        return new Date().valueOf();
    try {
        var result = ManualParse(date);
        if (!result) {
            result = Date.parse(date.toString());
            if (isNaN(result)) {
                var check = new Date(date);
                if (!check.valueOf()) {
                    result = (_a = ManualParse(date)) !== null && _a !== void 0 ? _a : 0;
                }
            }
        }
        if (!result)
            return null;
        // console.log('hasTZ', StringHasTimeZoneData(date))
        // Set a time string with no other timezone data to the current timezone
        if (!ignoreIANA && !StringHasTimeZoneData(date)) {
            // console.log('Here', date, (IANAOffset(timezoneSource) ?? 0), (IANAOffset() ?? 0))
            // console.log('Processing', date, timezoneSource, DateISO(result), DateISO(result + (((IANAOffset(timezoneSource) ?? 0) - (IANAOffset() ?? 0)) * 60 * 1000)))
            // console.log(date, date.length)
            // if (date.length > 10) {
            result += ((_b = IANAOffset(timezoneSource, date)) !== null && _b !== void 0 ? _b : 0) * 60000;
            // }
            // result += (((IANAOffset(timezoneSource) ?? 0) - (IANAOffset() ?? 0)) * 60 * 1000)
        }
        return result;
    }
    catch (_c) {
        return null;
    }
};
var DateParseTS = function (date, adjustments) {
    var newDate = DateParseTSInternal(date, adjustments === null || adjustments === void 0 ? void 0 : adjustments.timezoneSource, adjustments === null || adjustments === void 0 ? void 0 : adjustments.ignoreIANA);
    if (!newDate || !adjustments)
        return newDate;
    return DateAdjustTS(newDate, adjustments);
};
var DateISO = function (date, adjustments) {
    var parsed = DateParseTS(date, adjustments);
    if (!parsed)
        return null;
    return new Date(parsed).toISOString();
};
var DateObject = function (date, adjustments) {
    var parsed = DateParseTS(date, adjustments);
    if (!parsed)
        return null;
    return new Date(parsed);
};
var DateICS = function (date, adjustments) {
    var dateISO = DateISO(date, adjustments);
    if (!dateISO)
        return null;
    var dateICS = dateISO;
    var decimal = dateICS.indexOf('.');
    var zed = dateICS.indexOf('Z');
    if (decimal > 0 && zed > decimal) {
        dateICS = dateICS.substring(0, decimal) + dateICS.substring(zed);
    }
    dateICS = ReplaceAll('-', '', dateICS);
    dateICS = ReplaceAll(':', '', dateICS);
    return dateICS;
};
var DateFormatAny = function (format, date, timezoneDisplay, timezoneSource) {
    var e_1, _a;
    var _b, _c, _d;
    var noTZInfo = typeof date === 'string' && !StringHasTimeZoneData(date);
    var dateObject = DateObject(DateParseTSInternal(date, noTZInfo ? timezoneSource : undefined));
    // console.log('DFA', date, dateObject)
    // const objectUTC = false //(typeof date === 'object' && timezoneDisplay === 'UTC')
    if (timezoneDisplay) {
        try {
            if (!dateObject || dateObject.valueOf() === 0)
                return null;
            var sourceDate = !!date && date !== 'now' && date !== 'today' ? dateObject : undefined;
            var sourceOffset = (_b = IANAOffset(timezoneSource, sourceDate)) !== null && _b !== void 0 ? _b : 0; // Chic 5
            var displayOffset = (_c = IANAOffset(timezoneDisplay, sourceDate)) !== null && _c !== void 0 ? _c : 0; // Chic 6
            var offset = noTZInfo
                ? !timezoneSource
                    ? displayOffset - sourceOffset - (displayOffset - sourceOffset)
                    : ((_d = IANAOffset(undefined, sourceDate)) !== null && _d !== void 0 ? _d : 0) - sourceOffset - (displayOffset - sourceOffset)
                : sourceOffset - displayOffset;
            // console.log('DFA', date, noTZInfo, timezoneSource, sourceOffset, timezoneDisplay, displayOffset, offset)
            // if (timezoneDisplay === 'America/Los_Angeles' && timezoneSource === 'America/Chicago')
            // console.log('---')
            // 	console.log(noTZInfo, date, dateObject, sourceOffset/60, displayOffset/60, (IANAOffset() ?? 0) / 60, offset / 60)
            // console.log('offset', sourceDate, sourceOffset, displayOffset, offset)
            dateObject = DateObject(dateObject, { minutes: offset });
            // console.log(dateObject)
            // console.log('New', dateObject)
            // dateObject = DateObject(dateObject, {minutes: toOffset})
        }
        catch (err) {
            console.log('Invalid Timezone', err);
            return null;
        }
    }
    if (!dateObject || dateObject.valueOf() === 0)
        return null;
    var applyCommand = function (command, dateApply) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        switch (command) {
            case 'YYYY':
                return dateApply.getFullYear().toString().padStart(4, '0');
            case 'YY':
                return dateApply.getFullYear().toString().substr(2).padStart(2, '0');
            case 'Q':
                return Math.ceil((dateApply.getMonth() + 1) / 3).toString();
            case 'Qo':
                return (_a = DigitsNth(Math.ceil((dateApply.getMonth() + 1) / 3))) !== null && _a !== void 0 ? _a : '';
            case 'MMMM':
                return (_b = MonthNames[dateApply.getMonth()]) !== null && _b !== void 0 ? _b : '';
            case 'MMM':
                return ((_c = MonthNames[dateApply.getMonth()]) !== null && _c !== void 0 ? _c : '').substr(0, 3);
            case 'MM':
                return (dateApply.getMonth() + 1).toString().padStart(2, '0');
            case 'Mo':
                return (_d = DigitsNth(dateApply.getMonth() + 1)) !== null && _d !== void 0 ? _d : '';
            case 'M':
                return (dateApply.getMonth() + 1).toString();
            /**
             * Week of Year	w	1 2 ... 52 53
             * wo	1st 2nd ... 52nd 53rd
             * ww	01 02 ... 52 53
             * Week of Year (ISO)	W	1 2 ... 52 53
             * Wo	1st 2nd ... 52nd 53rd
             * WW	01 02 ... 52 53
             */
            /**
             * Day of Year	DDD	1 2 ... 364 365
             * DDDo	1st 2nd ... 364th 365th
             * DDDD	001 002 ... 364 365
             */
            case 'DD':
                return dateApply.getDate().toString().padStart(2, '0');
            case 'Do':
                return (_e = DigitsNth(dateApply.getDate())) !== null && _e !== void 0 ? _e : '';
            case 'D':
                return dateApply.getDate().toString();
            case 'd':
                return dateApply.getDay().toString();
            case 'do':
                return (_f = DigitsNth(dateApply.getDay())) !== null && _f !== void 0 ? _f : '';
            case 'dd':
                return ((_g = WeekDays[dateApply.getDay()]) !== null && _g !== void 0 ? _g : '').substr(0, 2);
            case 'ddd':
                return ((_h = WeekDays[dateApply.getDay()]) !== null && _h !== void 0 ? _h : '').substr(0, 3);
            case 'dddd':
                return (_j = WeekDays[dateApply.getDay()]) !== null && _j !== void 0 ? _j : '';
            case 'HH':
                return dateApply.getHours().toString().padStart(2, '0');
            case 'H':
                return dateApply.getHours().toString();
            case 'hh':
                return (dateApply.getHours() > 12 ? dateApply.getHours() - 12 : dateApply.getHours())
                    .toString()
                    .padStart(2, '0');
            case 'h': {
                var hour = dateApply.getHours() > 12 ? dateApply.getHours() - 12 : dateApply.getHours();
                return (hour === 0 ? 12 : hour).toString();
            }
            case 'mm':
                return dateApply.getMinutes().toString().padStart(2, '0');
            case 'm':
                return dateApply.getMinutes().toString();
            case 'ss':
                return dateApply.getSeconds().toString().padStart(2, '0');
            case 's':
                return dateApply.getSeconds().toString();
            case 'A':
                return dateApply.getHours() >= 12 ? 'PM' : 'AM';
            case 'a':
                return dateApply.getHours() >= 12 ? 'pm' : 'am';
            default:
                return command;
        }
    };
    var useFormat;
    switch (format) {
        case 'Local':
            useFormat = 'M/D/YYYY';
            break;
        case 'LocalDoW':
            useFormat = 'dd, M/D/YYYY';
            break;
        case 'LocalDateTime':
            useFormat = 'M/D/YYYY h:mm a';
            break;
        case 'LocalDoWTime':
            useFormat = 'dd, M/D/YYYY h:mm a';
            break;
        case 'Date':
            useFormat = DATE_FORMAT_DATE;
            break;
        case 'DateTime':
            useFormat = DATE_FORMAT_DATE_TIME;
            break;
        case 'DisplayDate':
            useFormat = DATE_FORMAT_DATE_DISPLAY;
            break;
        case 'DisplayDateDoW':
            useFormat = DATE_FORMAT_DATE_DISPLAY_DOW;
            break;
        case 'DisplayTime':
            useFormat = DATE_FORMAT_TIME_DISPLAY;
            break;
        case 'DisplayDateTime':
            useFormat = DATE_FORMAT_DATE_TIME_DISPLAY;
            break;
        case 'DisplayDateDoWTime':
            useFormat = DATE_FORMAT_DATE_TIME_DISPLAY_DOW;
            break;
        case 'DisplayDateLong':
            useFormat = DATE_FORMAT_DATE_DISPLAY_LONG;
            break;
        case 'DisplayDateDoWLong':
            useFormat = DATE_FORMAT_DATE_DISPLAY_DOW_LONG;
            break;
        case 'DisplayDateTimeLong':
            useFormat = DATE_FORMAT_DATE_TIME_DISPLAY_LONG;
            break;
        case 'DisplayDateDoWTimeLong':
            useFormat = DATE_FORMAT_DATE_TIME_DISPLAY_DOW_LONG;
            break;
        default:
            useFormat = format !== null && format !== void 0 ? format : 'YYYY-MM-DD h:mm:ss a';
            break;
    }
    var formatArray = useFormat.split('');
    var result = '';
    var previousChar = '';
    var command = '';
    var inEscape = false;
    var patterns = ['Mo', 'Qo', 'Do', 'do'];
    var _loop_1 = function (formatChar) {
        if (inEscape) {
            if (formatChar === ']') {
                inEscape = false;
            }
            else {
                result += formatChar;
            }
        }
        else if (formatChar === '[') {
            result += applyCommand(command, dateObject);
            command = '';
            previousChar = '';
            inEscape = true;
        }
        else {
            if (formatChar === previousChar ||
                previousChar === '' ||
                (command.length > 0 &&
                    patterns.some(function (pattern) { return pattern.startsWith(command) && formatChar === pattern.substr(command.length, 1); }))) {
                command += formatChar;
            }
            else {
                result += applyCommand(command, dateObject);
                command = formatChar;
            }
            previousChar = formatChar;
        }
    };
    try {
        for (var formatArray_1 = __values(formatArray), formatArray_1_1 = formatArray_1.next(); !formatArray_1_1.done; formatArray_1_1 = formatArray_1.next()) {
            var formatChar = formatArray_1_1.value;
            _loop_1(formatChar);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (formatArray_1_1 && !formatArray_1_1.done && (_a = formatArray_1.return)) _a.call(formatArray_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    result += applyCommand(command, dateObject);
    return result;
};
var DateFormat = function (format, date, timezoneDisplay, timezoneSource) { return DateFormatAny(format, date, timezoneDisplay, timezoneSource); };
var YYYYMMDDHHmmss = function (date) {
    var _a;
    var dateObject = (_a = DateObject(date)) !== null && _a !== void 0 ? _a : new Date();
    return "" + dateObject.getFullYear() + (dateObject.getMonth() + 1).toString().padStart(2, '0') + dateObject
        .getDate()
        .toString()
        .padStart(2, '0') + dateObject.getHours().toString().padStart(2, '0') + dateObject
        .getMinutes()
        .toString()
        .padStart(2, '0') + dateObject.getSeconds().toString().padStart(2, '0');
};
var YYYY_MM_DD_HH_mm_ss = function (date) {
    var _a;
    var dateObject = (_a = DateObject(date)) !== null && _a !== void 0 ? _a : new Date();
    return dateObject.getFullYear() + "-" + (dateObject.getMonth() + 1).toString().padStart(2, '0') + "-" + dateObject
        .getDate()
        .toString()
        .padStart(2, '0') + "_" + dateObject.getHours().toString().padStart(2, '0') + "-" + dateObject
        .getMinutes()
        .toString()
        .padStart(2, '0') + "-" + dateObject.getSeconds().toString().padStart(2, '0');
};
var YYYYsMMsDDsHHcmmcss = function (date) {
    var _a;
    var dateObject = (_a = DateObject(date)) !== null && _a !== void 0 ? _a : new Date();
    return dateObject.getFullYear() + "/" + (dateObject.getMonth() + 1).toString().padStart(2, '0') + "/" + dateObject
        .getDate()
        .toString()
        .padStart(2, '0') + " " + dateObject.getHours().toString().padStart(2, '0') + ":" + dateObject
        .getMinutes()
        .toString()
        .padStart(2, '0') + ":" + dateObject.getSeconds().toString().padStart(2, '0');
};
var YYYYsMMsDD = function (date) {
    var _a;
    var dateObject = (_a = DateObject(date)) !== null && _a !== void 0 ? _a : new Date();
    return dateObject.getFullYear() + "/" + (dateObject.getMonth() + 1).toString().padStart(2, '0') + "/" + dateObject
        .getDate()
        .toString()
        .padStart(2, '0');
};
var HHcmmcss = function (date) {
    var _a;
    var dateObject = (_a = DateObject(date)) !== null && _a !== void 0 ? _a : new Date();
    return dateObject.getHours().toString().padStart(2, '0') + ":" + dateObject
        .getMinutes()
        .toString()
        .padStart(2, '0') + ":" + dateObject.getSeconds().toString().padStart(2, '0');
};
var MonthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
var WeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var TSYearsEstimate = function (ts) { return Math.floor(ts / 365 / 24 / 60 / 60 / 1000); };
var TSMonthsEstimate = function (ts, withinYear) {
    return Math.floor((ts - (withinYear ? TSYearsEstimate(ts) * 365 * 24 * 60 * 60 * 1000 : 0)) / 30 / 24 / 60 / 60 / 1000);
};
var TSWeeks = function (ts) { return Math.floor(ts / 7 / 24 / 60 / 60 / 1000); };
var TSDays = function (ts, withinMonth) {
    return Math.floor((ts - (withinMonth ? TSMonthsEstimate(ts) * 30 * 24 * 60 * 60 * 1000 : 0)) / 24 / 60 / 60 / 1000);
};
var TSHours = function (ts, withinDay) {
    return Math.floor((ts - (withinDay ? TSDays(ts) * 24 * 60 * 60 * 1000 : 0)) / 60 / 60 / 1000);
};
var TSMinutes = function (ts, withinHour) {
    return Math.floor((ts - (withinHour ? TSHours(ts) * 60 * 60 * 1000 : 0)) / 60 / 1000);
};
var TSSeconds = function (ts, withinMinute) {
    return Math.floor((ts - (withinMinute ? TSMinutes(ts) * 60 * 1000 : 0)) / 1000);
};
var DateIsLeapYear = function (year) { return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0; };
var DaysInMonthYear = function (year, month) {
    var _a;
    var monthCalc = month;
    var yearCalc = year;
    while (monthCalc < 0) {
        monthCalc += 12;
        yearCalc -= 1;
    }
    while (monthCalc > 11) {
        monthCalc -= 12;
        yearCalc += 1;
    }
    return (_a = [31, DateIsLeapYear(yearCalc) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][monthCalc]) !== null && _a !== void 0 ? _a : null;
};
var DaysInMonth = function (date) {
    var originalDateObject = DateObject(date);
    if (!originalDateObject)
        return null;
    return DaysInMonthYear(originalDateObject.getUTCFullYear(), originalDateObject.getUTCMonth());
};
var DateAdjustMonthTS = function (date, months) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var dateTS = DateParseTSInternal(date);
    if (!dateTS)
        return null;
    var isNegative = months < 0;
    var originalDateObject = (_a = DateObject(date)) !== null && _a !== void 0 ? _a : new Date();
    var originalDate = originalDateObject.getUTCDate();
    var isLastDayOfMonth = originalDate === DaysInMonthYear(originalDateObject.getUTCFullYear(), originalDateObject.getUTCMonth());
    for (var i = 0; i < Math.abs(months); i++) {
        var dateObj = (_b = DateObject(dateTS)) !== null && _b !== void 0 ? _b : new Date();
        var year = dateObj.getUTCFullYear();
        var month = dateObj.getUTCMonth();
        if (isLastDayOfMonth) {
            if (isNegative) {
                dateTS -= 24 * 60 * 60 * 1000 * ((_c = DaysInMonthYear(year, month)) !== null && _c !== void 0 ? _c : 0);
            }
            else {
                dateTS += 24 * 60 * 60 * 1000 * ((_d = DaysInMonthYear(year, month + 1)) !== null && _d !== void 0 ? _d : 0);
            }
        }
        else {
            if (isNegative) {
                dateTS -= 24 * 60 * 60 * 1000 * ((_e = DaysInMonthYear(year, month - 1)) !== null && _e !== void 0 ? _e : 0);
            }
            else {
                dateTS += 24 * 60 * 60 * 1000 * ((_f = DaysInMonthYear(year, month)) !== null && _f !== void 0 ? _f : 0);
            }
            var currentDate = (_g = DateObject(dateTS)) !== null && _g !== void 0 ? _g : new Date();
            if (currentDate.getUTCDate() < 15 && currentDate.getUTCDate() < originalDate)
                dateTS -= 24 * 60 * 60 * 1000 * currentDate.getUTCDate();
            currentDate = (_h = DateObject(dateTS)) !== null && _h !== void 0 ? _h : new Date();
            var currentDaysInMonth = (_j = DaysInMonthYear(currentDate.getUTCFullYear(), currentDate.getUTCMonth())) !== null && _j !== void 0 ? _j : 0;
            if (currentDate.getUTCDate() > 15 &&
                currentDate.getUTCDate() < originalDate &&
                currentDate.getUTCDate() < currentDaysInMonth)
                dateTS +=
                    24 *
                        60 *
                        60 *
                        1000 *
                        ((currentDaysInMonth > originalDate ? originalDate : currentDaysInMonth) - currentDate.getUTCDate());
        }
    }
    return dateTS;
};
var DateAdjustTS = function (date, adjustments) {
    var e_2, _a;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
    var dateTS = DateParseTSInternal(date);
    try {
        for (var _14 = __values(Object.keys(adjustments)), _15 = _14.next(); !_15.done; _15 = _14.next()) {
            var key = _15.value;
            if (!dateTS)
                return null;
            switch (key) {
                case 'year':
                case 'years':
                    switch (adjustments[key]) {
                        case 'StartOf':
                            {
                                var dateObj = (_b = DateObject(dateTS)) !== null && _b !== void 0 ? _b : new Date();
                                dateTS = (_c = DateAdjustTS(dateTS, {
                                    month: dateObj.getUTCMonth() * -1,
                                    months: 'StartOf'
                                })) !== null && _c !== void 0 ? _c : 0;
                            }
                            break;
                        case 'EndOf':
                            {
                                var dateObj = (_d = DateObject(dateTS)) !== null && _d !== void 0 ? _d : new Date();
                                dateTS = (_e = DateAdjustTS(dateTS, {
                                    month: 11 - dateObj.getUTCMonth(),
                                    months: 'EndOf'
                                })) !== null && _e !== void 0 ? _e : 0;
                            }
                            break;
                        default:
                            dateTS = DateAdjustMonthTS(dateTS, CleanNumber(adjustments[key]) * 12);
                            break;
                    }
                    break;
                case 'month':
                case 'months':
                    switch (adjustments[key]) {
                        case 'StartOf':
                            {
                                var dateObj = (_f = DateObject(dateTS)) !== null && _f !== void 0 ? _f : new Date();
                                dateTS = (_g = DateAdjustTS(dateTS, {
                                    day: (dateObj.getUTCDate() - 1) * -1,
                                    days: 'StartOf'
                                })) !== null && _g !== void 0 ? _g : 0;
                            }
                            break;
                        case 'EndOf':
                            {
                                var dateObj = (_h = DateObject(dateTS)) !== null && _h !== void 0 ? _h : new Date();
                                dateTS = (_k = DateAdjustTS(dateTS, {
                                    day: ((_j = DaysInMonthYear(dateObj.getUTCFullYear(), dateObj.getUTCMonth())) !== null && _j !== void 0 ? _j : 0) -
                                        dateObj.getUTCDate(),
                                    days: 'EndOf'
                                })) !== null && _k !== void 0 ? _k : 0;
                            }
                            break;
                        default:
                            dateTS = DateAdjustMonthTS(dateTS, CleanNumber(adjustments[key]));
                            break;
                    }
                    break;
                case 'quarter':
                case 'quarters':
                    switch (adjustments[key]) {
                        case 'StartOf':
                            {
                                var dateObj = (_l = DateObject(dateTS)) !== null && _l !== void 0 ? _l : new Date();
                                dateTS = (_m = DateAdjustTS(dateTS, {
                                    month: (dateObj.getUTCMonth() % 3) * -1,
                                    months: 'StartOf'
                                })) !== null && _m !== void 0 ? _m : 0;
                            }
                            break;
                        case 'EndOf':
                            {
                                var dateObj = (_o = DateObject(dateTS)) !== null && _o !== void 0 ? _o : new Date();
                                dateTS = (_p = DateAdjustTS(dateTS, {
                                    month: 2 - (dateObj.getUTCMonth() % 3),
                                    months: 'EndOf'
                                })) !== null && _p !== void 0 ? _p : 0;
                            }
                            break;
                        default:
                            dateTS = DateAdjustMonthTS(dateTS, CleanNumber(adjustments[key]) * 3);
                            break;
                    }
                    break;
                default:
                    if (!dateTS)
                        return null;
                    switch (key) {
                        case 'week':
                        case 'weeks':
                            switch (adjustments[key]) {
                                case 'StartOf':
                                    {
                                        var dateObj = (_q = DateObject(dateTS)) !== null && _q !== void 0 ? _q : new Date();
                                        dateTS = (_r = DateAdjustTS(dateTS, {
                                            day: dateObj.getUTCDay() * -1,
                                            days: 'StartOf'
                                        })) !== null && _r !== void 0 ? _r : 0;
                                    }
                                    break;
                                case 'StartOfMon':
                                    {
                                        var dateObj = (_s = DateObject(dateTS)) !== null && _s !== void 0 ? _s : new Date();
                                        switch (dateObj.getUTCDay()) {
                                            case 0:
                                                //Sunday
                                                dateTS = (_t = DateAdjustTS(dateTS, {
                                                    day: -6,
                                                    days: 'StartOf'
                                                })) !== null && _t !== void 0 ? _t : 0;
                                                break;
                                            case 1:
                                                // Monday
                                                dateTS = (_u = DateAdjustTS(dateTS, {
                                                    days: 'StartOf'
                                                })) !== null && _u !== void 0 ? _u : 0;
                                                break;
                                            default:
                                                // All other days
                                                dateTS = (_v = DateAdjustTS(dateTS, {
                                                    day: (dateObj.getUTCDay() - 1) * -1,
                                                    days: 'StartOf'
                                                })) !== null && _v !== void 0 ? _v : 0;
                                                break;
                                        }
                                    }
                                    break;
                                case 'EndOf':
                                    {
                                        var dateObj = (_w = DateObject(dateTS)) !== null && _w !== void 0 ? _w : new Date();
                                        dateTS = (_x = DateAdjustTS(dateTS, {
                                            day: 6 - dateObj.getUTCDay(),
                                            days: 'EndOf'
                                        })) !== null && _x !== void 0 ? _x : 0;
                                    }
                                    break;
                                default:
                                    dateTS += CleanNumber(adjustments[key]) * 7 * 24 * 60 * 60 * 1000;
                                    break;
                            }
                            break;
                        case 'day':
                        case 'days':
                            switch (adjustments[key]) {
                                case 'StartOf':
                                    {
                                        var dateObj = (_y = DateObject(dateTS)) !== null && _y !== void 0 ? _y : new Date();
                                        dateTS = (_z = DateAdjustTS(dateTS, {
                                            hour: dateObj.getUTCHours() * -1,
                                            hours: 'StartOf'
                                        })) !== null && _z !== void 0 ? _z : 0;
                                    }
                                    break;
                                case 'EndOf':
                                    {
                                        var dateObj = (_0 = DateObject(dateTS)) !== null && _0 !== void 0 ? _0 : new Date();
                                        dateTS = (_1 = DateAdjustTS(dateTS, {
                                            hour: 23 - dateObj.getUTCHours(),
                                            hours: 'EndOf'
                                        })) !== null && _1 !== void 0 ? _1 : 0;
                                    }
                                    break;
                                default:
                                    dateTS += CleanNumber(adjustments[key]) * 24 * 60 * 60 * 1000;
                                    break;
                            }
                            break;
                        case 'hour':
                        case 'hours':
                            switch (adjustments[key]) {
                                case 'StartOf':
                                    {
                                        var dateObj = (_2 = DateObject(dateTS)) !== null && _2 !== void 0 ? _2 : new Date();
                                        dateTS = (_3 = DateAdjustTS(dateTS, {
                                            minute: dateObj.getUTCMinutes() * -1,
                                            minutes: 'StartOf'
                                        })) !== null && _3 !== void 0 ? _3 : 0;
                                    }
                                    break;
                                case 'EndOf':
                                    {
                                        var dateObj = (_4 = DateObject(dateTS)) !== null && _4 !== void 0 ? _4 : new Date();
                                        dateTS = (_5 = DateAdjustTS(dateTS, {
                                            minute: 59 - dateObj.getUTCMinutes(),
                                            minutes: 'EndOf'
                                        })) !== null && _5 !== void 0 ? _5 : 0;
                                    }
                                    break;
                                default:
                                    dateTS += CleanNumber(adjustments[key]) * 60 * 60 * 1000;
                                    break;
                            }
                            break;
                        case 'minute':
                        case 'minutes':
                            switch (adjustments[key]) {
                                case 'StartOf':
                                    {
                                        var dateObj = (_6 = DateObject(dateTS)) !== null && _6 !== void 0 ? _6 : new Date();
                                        dateTS = (_7 = DateAdjustTS(dateTS, {
                                            second: dateObj.getUTCSeconds() * -1,
                                            seconds: 'StartOf'
                                        })) !== null && _7 !== void 0 ? _7 : 0;
                                    }
                                    break;
                                case 'EndOf':
                                    {
                                        var dateObj = (_8 = DateObject(dateTS)) !== null && _8 !== void 0 ? _8 : new Date();
                                        dateTS = (_9 = DateAdjustTS(dateTS, {
                                            second: 59 - dateObj.getUTCSeconds(),
                                            seconds: 'EndOf'
                                        })) !== null && _9 !== void 0 ? _9 : 0;
                                    }
                                    break;
                                default:
                                    dateTS += CleanNumber(adjustments[key]) * 60 * 1000;
                                    break;
                            }
                            break;
                        case 'second':
                        case 'seconds':
                            switch (adjustments[key]) {
                                case 'StartOf':
                                    {
                                        var dateObj = (_10 = DateObject(dateTS)) !== null && _10 !== void 0 ? _10 : new Date();
                                        dateTS = (_11 = DateAdjustTS(dateTS, {
                                            millisecond: dateObj.getUTCMilliseconds() * -1
                                        })) !== null && _11 !== void 0 ? _11 : 0;
                                    }
                                    break;
                                case 'EndOf':
                                    {
                                        var dateObj = (_12 = DateObject(dateTS)) !== null && _12 !== void 0 ? _12 : new Date();
                                        dateTS = (_13 = DateAdjustTS(dateTS, {
                                            millisecond: 999 - dateObj.getUTCMilliseconds()
                                        })) !== null && _13 !== void 0 ? _13 : 0;
                                    }
                                    break;
                                default:
                                    dateTS += CleanNumber(adjustments[key]) * 1000;
                                    break;
                            }
                            break;
                        case 'millisecond':
                        case 'milliseconds':
                            dateTS += CleanNumber(adjustments[key]);
                            break;
                    }
                    break;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_15 && !_15.done && (_a = _14.return)) _a.call(_14);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return dateTS;
};
var DateDiff = function (dateFrom, dateTo, duration) {
    // const isDayRanged = ['year'
    // 										 , 'years'
    // 										 , 'quarter'
    // 										 , 'quarters'
    // 										 , 'month'
    // 										 , 'months'
    // 										 , 'week'
    // 										 , 'weeks'
    // 										 , 'day'
    // 										 , 'days'].includes(duration)
    var _a, _b;
    var date1 = DateParseTSInternal(dateFrom);
    var date2 = DateParseTSInternal(dateTo);
    if (!date1 || !date2)
        return null;
    if (date1 === date2)
        return 0;
    switch (duration) {
        case 'year':
        case 'years':
        case 'month':
        case 'months':
            var isNegative = date1 < date2;
            var increment = (['year', 'years'].includes(duration) ? 12 : 1) * (isNegative ? -1 : 1);
            var count = 0;
            var newTS = (_a = DateAdjustMonthTS(date2, increment)) !== null && _a !== void 0 ? _a : 0;
            while (isNegative ? date1 <= newTS : date1 >= newTS) {
                count -= isNegative ? -1 : 1;
                newTS = (_b = DateAdjustMonthTS(newTS, increment)) !== null && _b !== void 0 ? _b : 0;
            }
            return count;
        default: {
            var diff = date2 - date1;
            switch (duration) {
                case 'week':
                case 'weeks':
                    return diff < 0 ? TSWeeks(diff * -1) * -1 : TSWeeks(diff);
                case 'day':
                case 'days':
                    return diff < 0 ? TSDays(diff * -1) * -1 : TSDays(diff);
                case 'hour':
                case 'hours':
                    return diff < 0 ? TSHours(diff * -1) * -1 : TSHours(diff);
                case 'minute':
                case 'minutes':
                    return diff < 0 ? TSMinutes(diff * -1) * -1 : TSMinutes(diff);
                case 'second':
                case 'seconds':
                    return diff < 0 ? TSSeconds(diff * -1) * -1 : TSSeconds(diff);
                case 'millisecond':
                case 'milliseconds':
                    return diff;
            }
        }
    }
    return null;
};
var DateComponent = function (component, date, adjustments) { return CleanNumber(DateFormatAny(component, DateParseTS(date, adjustments))); };
var DateWeekNumber = function (date, adjustments) {
    console.error('Deprecated!  Use: DateWeekISONumber');
    var currentDate = DateObject(date !== null && date !== void 0 ? date : 'now', __assign({ timezoneSource: 'UTC' }, adjustments));
    if (!currentDate)
        return null;
    var year = CleanNumber(DateFormatAny('YYYY', date));
    var startDate = new Date(year, 0, 1);
    var days = Math.floor((currentDate.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000)) + 7;
    var week = Math.ceil(days / 7);
    return { year: year, week: week };
};
var DateWeekISONumber = function (date, adjustments) {
    var currentDate = DateObject(date !== null && date !== void 0 ? date : 'now', adjustments);
    if (!currentDate)
        return null;
    var tdt = new Date(currentDate.valueOf());
    var dayn = (currentDate.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    var firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
        tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7));
    }
    var week = 1 + Math.ceil((firstThursday - tdt.valueOf()) / 604800000);
    var dateYear = currentDate;
    dateYear.setDate(dateYear.getDate() + 3 - ((dateYear.getDay() + 6) % 7));
    var year = dateYear.getFullYear();
    return { year: year, week: week };
};
var DateFromWeekNumber = function (weekNumber) {
    var _a, _b;
    if (!(weekNumber === null || weekNumber === void 0 ? void 0 : weekNumber.year))
        return null;
    var days = (weekNumber.week - 1) * 7;
    var tryDate = DateOnly(new Date(weekNumber.year, 0, days), { week: 'StartOfMon' });
    var tryWeekNumber = (_a = DateWeekISONumber(tryDate)) !== null && _a !== void 0 ? _a : weekNumber;
    var attempts = 0;
    while (!DeepEqual(weekNumber, tryWeekNumber)) {
        if (attempts > 4) {
            // console.error(`Could not calculate DateFromWeekNumber ${JSON.stringify(weekNumber)}`)
            return null;
        }
        attempts++;
        if (tryWeekNumber.year < weekNumber.year ||
            (tryWeekNumber.year === weekNumber.year && tryWeekNumber.week < weekNumber.week)) {
            tryDate = DateOnly(tryDate, { weeks: 1 });
        }
        else {
            tryDate = DateOnly(tryDate, { weeks: -1 });
        }
        tryWeekNumber = (_b = DateWeekISONumber(tryDate)) !== null && _b !== void 0 ? _b : weekNumber;
    }
    return tryDate;
};
var DatesFromWeekNumber = function (weekNumber) {
    var start = DateFromWeekNumber(weekNumber);
    if (!start)
        return null;
    return {
        start: start,
        end: DateOnly(start, { days: 6 })
    };
};
var WeekNumberAdjust = function (weekNumber, adjustment) {
    var nextDate = DateFromWeekNumber(weekNumber);
    if (!nextDate)
        return null;
    return DateWeekISONumber(DateOnly(nextDate, typeof adjustment === 'number' ? { weeks: adjustment } : adjustment));
};
var DateDiffComponents = function (dateFrom, dateTo) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    var returnComponents = {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
    };
    var dateFromTS = (_a = DateParseTSInternal(dateFrom)) !== null && _a !== void 0 ? _a : 0;
    var checkTo = (_b = DateParseTSInternal(dateTo)) !== null && _b !== void 0 ? _b : 0;
    returnComponents.year = (_c = DateDiff(dateFromTS, checkTo, 'year')) !== null && _c !== void 0 ? _c : 0;
    if (returnComponents.year)
        checkTo = (_d = DateParseTS(checkTo, { year: returnComponents.year * -1 })) !== null && _d !== void 0 ? _d : 0;
    returnComponents.month = (_e = DateDiff(dateFromTS, checkTo, 'month')) !== null && _e !== void 0 ? _e : 0;
    if (returnComponents.month)
        checkTo = (_f = DateParseTS(checkTo, { month: returnComponents.month * -1 })) !== null && _f !== void 0 ? _f : 0;
    returnComponents.day = (_g = DateDiff(dateFromTS, checkTo, 'day')) !== null && _g !== void 0 ? _g : 0;
    if (returnComponents.day)
        checkTo = (_h = DateParseTS(checkTo, { day: returnComponents.day * -1 })) !== null && _h !== void 0 ? _h : 0;
    returnComponents.hour = (_j = DateDiff(dateFromTS, checkTo, 'hour')) !== null && _j !== void 0 ? _j : 0;
    if (returnComponents.hour)
        checkTo = (_k = DateParseTS(checkTo, { hour: returnComponents.hour * -1 })) !== null && _k !== void 0 ? _k : 0;
    returnComponents.minute = (_l = DateDiff(dateFromTS, checkTo, 'minute')) !== null && _l !== void 0 ? _l : 0;
    if (returnComponents.minute)
        checkTo = (_m = DateParseTS(checkTo, { minute: returnComponents.minute * -1 })) !== null && _m !== void 0 ? _m : 0;
    returnComponents.second = (_o = DateDiff(dateFromTS, checkTo, 'second')) !== null && _o !== void 0 ? _o : 0;
    if (returnComponents.second)
        checkTo = (_p = DateParseTS(checkTo, { second: returnComponents.second * -1 })) !== null && _p !== void 0 ? _p : 0;
    returnComponents.millisecond = (_q = DateDiff(dateFromTS, checkTo, 'millisecond')) !== null && _q !== void 0 ? _q : 0;
    return returnComponents;
};
var DateDiffLongDescription = function (dateFrom, dateTo, tripToSecondsOrTwo, abbreviated) {
    if (tripToSecondsOrTwo === void 0) { tripToSecondsOrTwo = false; }
    if (abbreviated === void 0) { abbreviated = false; }
    var components = DateDiffComponents(dateFrom, dateTo);
    var text = '';
    if (components.year) {
        text += " " + ToDigits(components.year) + (abbreviated ? 'Y' : ' ' + AddS('Year', components.year));
        text += " " + ToDigits(components.month) + (abbreviated ? 'Mo' : ' ' + AddS('Month', components.month));
        if (components.day && !tripToSecondsOrTwo) {
            text += " " + ToDigits(components.day) + (abbreviated ? 'D' : ' ' + AddS('Day', components.day));
        }
    }
    else if (components.month) {
        text += " " + ToDigits(components.month) + (abbreviated ? 'Mo' : ' ' + AddS('Month', components.month));
        if (components.day) {
            text += " " + ToDigits(components.day) + (abbreviated ? 'D' : ' ' + AddS('Day', components.day));
        }
    }
    else if (components.day) {
        text += " " + ToDigits(components.day) + (abbreviated ? 'D' : ' ' + AddS('Day', components.day));
        if (components.hour) {
            text += " " + ToDigits(components.hour) + (abbreviated ? 'h' : ' ' + AddS('Hour', components.hour));
        }
        if (components.minute && !tripToSecondsOrTwo) {
            text += " " + ToDigits(components.minute) + (abbreviated ? 'm' : ' ' + AddS('Minute', components.minute));
        }
    }
    else if (components.hour) {
        text += " " + ToDigits(components.hour) + (abbreviated ? 'h' : ' ' + AddS('Hour', components.hour));
        if (components.minute) {
            text += " " + ToDigits(components.minute) + (abbreviated ? 'm' : ' ' + AddS('Minute', components.minute));
        }
    }
    else {
        if (components.minute || (!text && tripToSecondsOrTwo)) {
            text += " " + ToDigits(components.minute) + (abbreviated ? 'm' : ' ' + AddS('Minute', components.minute));
        }
        if (!text || (!tripToSecondsOrTwo && components.second)) {
            text += " " + ToDigits(components.second) + (abbreviated ? 's' : ' ' + AddS('Second', components.second));
        }
    }
    return text.trim();
};
/**
 * Displays a simplified duration format from seconds.
 *
 * @example
 * MomentDurationShortText((30 * 60) + 20) // result: 30 Minutes 20 Seconds
 */
var DurationLongDescription = function (seconds, tripToSecondsOrTwo, abbreviated) {
    if (tripToSecondsOrTwo === void 0) { tripToSecondsOrTwo = false; }
    if (abbreviated === void 0) { abbreviated = false; }
    var durationTS = seconds * 1000;
    var text = '';
    if (TSYearsEstimate(durationTS)) {
        text += " " + ToDigits(TSYearsEstimate(durationTS), 0) + (abbreviated ? 'Y' : ' ' + AddS('Year', TSYearsEstimate(durationTS)));
        text += " " + ToDigits(TSMonthsEstimate(durationTS, true), 0) + (abbreviated ? 'Mo' : ' ' + AddS('Month', TSMonthsEstimate(durationTS, true)));
        if (TSDays(durationTS, true) && !tripToSecondsOrTwo) {
            text += " " + ToDigits(TSDays(durationTS, true), 0) + (abbreviated ? 'D' : ' ' + AddS('Day', TSDays(durationTS, true)));
        }
    }
    else if (TSMonthsEstimate(durationTS, true)) {
        text += " " + ToDigits(TSMonthsEstimate(durationTS, true), 0) + (abbreviated ? 'Mo' : ' ' + AddS('Month', TSMonthsEstimate(durationTS, true)));
        if (TSDays(durationTS, true)) {
            text += " " + ToDigits(TSDays(durationTS, true), 0) + (abbreviated ? 'D' : ' ' + AddS('Day', TSDays(durationTS, true)));
        }
    }
    else if (TSDays(durationTS, true)) {
        text += " " + ToDigits(TSDays(durationTS, true), 0) + (abbreviated ? 'D' : ' ' + AddS('Day', TSDays(durationTS, true)));
        if (TSHours(durationTS, true)) {
            text += " " + ToDigits(TSHours(durationTS, true), 0) + (abbreviated ? 'h' : ' ' + AddS('Hour', TSHours(durationTS, true)));
        }
        if (TSMinutes(durationTS, true) && !tripToSecondsOrTwo) {
            text += " " + ToDigits(TSMinutes(durationTS, true), 0) + (abbreviated ? 'm' : ' ' + AddS('Minute', TSMinutes(durationTS, true)));
        }
    }
    else if (TSHours(durationTS, true)) {
        text += " " + ToDigits(TSHours(durationTS, true), 0) + (abbreviated ? 'h' : ' ' + AddS('Hour', TSHours(durationTS, true)));
        if (TSMinutes(durationTS, true)) {
            text += " " + ToDigits(TSMinutes(durationTS, true), 0) + (abbreviated ? 'm' : ' ' + AddS('Minute', TSMinutes(durationTS, true)));
        }
    }
    else {
        if (TSMinutes(durationTS, true) || (!text && tripToSecondsOrTwo)) {
            text += " " + ToDigits(TSMinutes(durationTS, true), 0) + (abbreviated ? 'm' : ' ' + AddS('Minute', TSMinutes(durationTS, true)));
        }
        if (!text || (!tripToSecondsOrTwo && TSSeconds(durationTS, true))) {
            text += " " + ToDigits(TSSeconds(durationTS, true), 0) + (abbreviated ? 's' : ' ' + AddS('Second', TSSeconds(durationTS, true)));
        }
    }
    return text.trim();
};
var checkType = function (evalCheck, diff) {
    if (diff === 0)
        return ['IsSame', 'IsSameOrBefore', 'IsSameOrAfter'].includes(evalCheck);
    if (diff > 0)
        return ['IsAfter', 'IsSameOrAfter'].includes(evalCheck);
    return ['IsBefore', 'IsSameOrBefore'].includes(evalCheck);
};
var DateCompare = function (date1, evalType, date2, minInterval) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var date2ToUse = !!date2 && typeof date2 === 'object' && !(date2 instanceof Date) ? DateParseTS('now', date2) : date2;
    var msDifference = ((_a = DateParseTSInternal(date1, undefined, true)) !== null && _a !== void 0 ? _a : 0) - ((_b = DateParseTSInternal(date2ToUse, undefined, true)) !== null && _b !== void 0 ? _b : 0);
    if (msDifference === 0) {
        return checkType(evalType, msDifference);
    }
    if (!!minInterval) {
        var date1Object = (_c = DateObject(date1)) !== null && _c !== void 0 ? _c : new Date();
        var date2Object = (_d = DateObject(date2ToUse)) !== null && _d !== void 0 ? _d : new Date();
        var yearDiff = date1Object.getUTCFullYear() - date2Object.getUTCFullYear();
        if (['year', 'years'].includes(minInterval)) {
            return checkType(evalType, yearDiff);
        }
        var monthDiff = date1Object.getUTCMonth() - date2Object.getUTCMonth();
        if (['month', 'months'].includes(minInterval)) {
            if (yearDiff !== 0)
                return checkType(evalType, yearDiff);
            return checkType(evalType, monthDiff);
        }
        if (['week', 'weeks'].includes(minInterval)) {
            if (Math.abs(msDifference) > 7 * 24 * 60 * 60 * 1000)
                return checkType(evalType, msDifference);
            var weekDiff = ((_f = (_e = DateWeekNumber(date1)) === null || _e === void 0 ? void 0 : _e.week) !== null && _f !== void 0 ? _f : 0) - ((_h = (_g = DateWeekNumber(date2ToUse)) === null || _g === void 0 ? void 0 : _g.week) !== null && _h !== void 0 ? _h : 0);
            // Check if in the same week that spans years
            if (weekDiff === 0 && ((_k = (_j = DateWeekNumber(date1)) === null || _j === void 0 ? void 0 : _j.week) !== null && _k !== void 0 ? _k : 0) === 1 && Math.abs(yearDiff) > 1) {
                if (yearDiff !== 0)
                    return checkType(evalType, yearDiff);
            }
            return checkType(evalType, weekDiff);
        }
        var dateOfMonthDiff = date1Object.getUTCDate() - date2Object.getUTCDate();
        if (['day', 'days'].includes(minInterval)) {
            if (yearDiff !== 0)
                return checkType(evalType, yearDiff);
            if (monthDiff !== 0)
                return checkType(evalType, monthDiff);
            return checkType(evalType, dateOfMonthDiff);
        }
        var hourDiff = date1Object.getUTCHours() - date2Object.getUTCHours();
        if (['hour', 'hours'].includes(minInterval)) {
            if (yearDiff !== 0)
                return checkType(evalType, yearDiff);
            if (monthDiff !== 0)
                return checkType(evalType, monthDiff);
            if (dateOfMonthDiff !== 0)
                return checkType(evalType, dateOfMonthDiff);
            return checkType(evalType, hourDiff);
        }
        var minuteDiff = date1Object.getUTCMinutes() - date2Object.getUTCMinutes();
        if (['minute', 'minutes'].includes(minInterval)) {
            if (yearDiff !== 0)
                return checkType(evalType, yearDiff);
            if (monthDiff !== 0)
                return checkType(evalType, monthDiff);
            if (dateOfMonthDiff !== 0)
                return checkType(evalType, dateOfMonthDiff);
            if (hourDiff !== 0)
                return checkType(evalType, hourDiff);
            return checkType(evalType, minuteDiff);
        }
        var secondDiff = date1Object.getUTCSeconds() - date2Object.getUTCSeconds();
        if (['second', 'second'].includes(minInterval)) {
            if (yearDiff !== 0)
                return checkType(evalType, yearDiff);
            if (monthDiff !== 0)
                return checkType(evalType, monthDiff);
            if (dateOfMonthDiff !== 0)
                return checkType(evalType, dateOfMonthDiff);
            if (hourDiff !== 0)
                return checkType(evalType, hourDiff);
            if (minuteDiff !== 0)
                return checkType(evalType, minuteDiff);
            return checkType(evalType, secondDiff);
        }
    }
    return checkType(evalType, msDifference);
};
var SortCompareDateNull = function (date1, date2, minInterval) {
    return DateCompare(date1, 'IsBefore', date2, minInterval)
        ? -1
        : DateCompare(date1, 'IsAfter', date2, minInterval)
            ? 1
            : null;
};
var SortCompareDate = function (date1, date2, minInterval) { var _a; return (_a = SortCompareDateNull(date1, date2, minInterval)) !== null && _a !== void 0 ? _a : 0; };
exports.EQuarter = void 0;
(function (EQuarter) {
    EQuarter[EQuarter["Q1"] = 1] = "Q1";
    EQuarter[EQuarter["Q2"] = 2] = "Q2";
    EQuarter[EQuarter["Q3"] = 3] = "Q3";
    EQuarter[EQuarter["Q4"] = 4] = "Q4";
})(exports.EQuarter || (exports.EQuarter = {}));
var DatesQuarter = function (year, quarter) {
    var _a, _b;
    var baseDate = DateParseTSInternal(year + "-" + (quarter * 3 - 1).toString().padStart(2, '0') + "-01", 'UTC');
    if (!baseDate)
        return null;
    return {
        start: ((_a = DateISO(baseDate, { quarter: 'StartOf' })) !== null && _a !== void 0 ? _a : '').substr(0, 10),
        end: ((_b = DateISO(baseDate, { quarter: 'EndOf' })) !== null && _b !== void 0 ? _b : '').substr(0, 10)
    };
};
var InitialDateQuarter = function () { return ({
    year: new Date().getFullYear(),
    quarter: Math.floor(new Date().getUTCMonth() / 3) + 1
}); };
var DateQuarter = function (date) {
    var dateObj = DateObject(date);
    if (!dateObj)
        return null;
    return {
        year: dateObj.getUTCFullYear(),
        quarter: Math.floor(dateObj.getUTCMonth() / 3) + 1
    };
};
var DatesMonth = function (year, monthOneBased) {
    var _a, _b;
    var baseDate = DateParseTSInternal(year + "-" + monthOneBased.toString().padStart(2, '0') + "-01", 'UTC');
    if (!baseDate)
        return null;
    return {
        start: ((_a = DateISO(baseDate, { month: 'StartOf' })) !== null && _a !== void 0 ? _a : '').substr(0, 10),
        end: ((_b = DateISO(baseDate, { month: 'EndOf' })) !== null && _b !== void 0 ? _b : '').substr(0, 10)
    };
};
var InitialDateMonth = function () { return ({
    year: new Date().getFullYear(),
    monthOneBased: Math.floor(new Date().getUTCMonth()) + 1
}); };
var DateMonth = function (date) {
    var dateObj = DateObject(date);
    if (!dateObj)
        return null;
    return {
        year: dateObj.getUTCFullYear(),
        monthOneBased: Math.floor(dateObj.getUTCMonth()) + 1
    };
};
/**
 * 0 = Sunday
 *
 * @param date
 * @constructor
 */
var DateDayOfWeek = function (date) {
    var dateObj = DateObject(date);
    if (!dateObj)
        return null;
    return dateObj.getUTCDay();
};
var DateOnlyNull = function (date, adjustments) {
    var _a, _b, _c;
    if (!date)
        return null;
    try {
        var useDate = !date || typeof date === 'object' || typeof date === 'number' || ['now', 'today'].includes(date)
            ? (_a = DateFormat('Date', date, CurrentTimeZone())) !== null && _a !== void 0 ? _a : '' : (date !== null && date !== void 0 ? date : '').substring(0, 10);
        if (!date)
            return null;
        var dateObj = new Date(useDate);
        if (!!adjustments) {
            dateObj = (_b = DateObject(dateObj, adjustments)) !== null && _b !== void 0 ? _b : dateObj;
            if (Object.values(adjustments).includes('EndOf'))
                dateObj.setUTCHours(10);
        }
        return DateFormat((adjustments === null || adjustments === void 0 ? void 0 : adjustments.formatLocale) ? 'Local' : 'Date', dateObj, (_c = adjustments === null || adjustments === void 0 ? void 0 : adjustments.timezoneDisplay) !== null && _c !== void 0 ? _c : 'UTC');
    }
    catch (err) {
        return null;
    }
};
var DateOnly = function (date, adjustments) { var _a, _b, _c; return (_c = (_a = DateOnlyNull(date, adjustments)) !== null && _a !== void 0 ? _a : DateFormat((adjustments === null || adjustments === void 0 ? void 0 : adjustments.formatLocale) ? 'Local' : 'Date', new Date(), (_b = adjustments === null || adjustments === void 0 ? void 0 : adjustments.timezoneDisplay) !== null && _b !== void 0 ? _b : 'UTC')) !== null && _c !== void 0 ? _c : new Date().toISOString().substring(0, 10); };
/**
 * Convert a date and/or time value to a time
 * @param time
 * @param adjustments
 * @constructor
 */
var TimeOnly = function (time, adjustments) {
    if ((!time || (typeof time === 'string' && !StringHasTimeData(time))) && time !== 'now' && time !== 'today')
        return null;
    try {
        var timeValue = DateFormatAny(!!(adjustments === null || adjustments === void 0 ? void 0 : adjustments.formatLocale) ? DATE_FORMAT_TIME_DISPLAY : 'HH:mm:ss', DateParseTS(time, adjustments));
        if (!!timeValue)
            return timeValue;
        var useTime = (time !== null && time !== void 0 ? time : '').toString().toLowerCase().trim();
        var changeHours = 0;
        if (useTime.endsWith('am'))
            useTime = useTime.substring(0, useTime.length - 2).trim();
        if (useTime.endsWith('a'))
            useTime = useTime.substring(0, useTime.length - 1).trim();
        if (useTime.endsWith('pm')) {
            useTime = useTime.substring(0, useTime.length - 2).trim();
            changeHours += 12;
        }
        if (useTime.endsWith('p')) {
            useTime = useTime.substring(0, useTime.length - 1).trim();
            changeHours += 12;
        }
        if (useTime.substring(1, 2) === ':')
            useTime = "0" + useTime;
        useTime = DateOnly('now') + 'T' + useTime;
        var tsValue = DateParseTS(useTime, adjustments);
        if (!!tsValue) {
            var newValue = DateFormatAny(!!(adjustments === null || adjustments === void 0 ? void 0 : adjustments.formatLocale) ? DATE_FORMAT_TIME_DISPLAY : 'HH:mm:ss', tsValue + changeHours * 60 * 60 * 1000, 'UTC');
            if (!!newValue)
                return newValue;
        }
    }
    catch (err) { }
    return null;
};
/**
 * Generates a series of times, starting with the first time (default '00:00') and ending BEFORE the end time (default: '24:00')
 *
 * @param minuteIntervals
 * @param startTimeInclusive
 * @param endTimeNotInclusive
 * @constructor
 */
var TimeSeries = function (minuteIntervals, startTimeInclusive, endTimeNotInclusive) {
    if (startTimeInclusive === void 0) { startTimeInclusive = '00:00'; }
    if (endTimeNotInclusive === void 0) { endTimeNotInclusive = '24:00'; }
    var currentTime = TimeOnly(startTimeInclusive);
    if (!currentTime)
        return [];
    var results = [currentTime];
    var endTimeCompute = TimeOnly(endTimeNotInclusive, { minutes: minuteIntervals * -1 });
    if (!endTimeCompute || minuteIntervals <= 0)
        return results;
    while (currentTime < endTimeCompute) {
        currentTime = TimeOnly(currentTime, { minutes: minuteIntervals });
        if (!currentTime)
            break;
        results.push(currentTime);
    }
    return results;
};
/**
 * Adjusts a time or date/time to the floor of minutes specified in the increment
 *
 * @param time
 * @param minuteIncrement
 * @constructor
 */
var TimeFloorMinute = function (time, minuteIncrement) {
    if (minuteIncrement === void 0) { minuteIncrement = 1; }
    if (typeof time !== 'string' || StringHasDateData(time)) {
        var dateObj = DateObject(time);
        if (!dateObj)
            return null;
        dateObj.setMilliseconds(0);
        dateObj.setSeconds(0);
        dateObj.setMinutes(dateObj.getMinutes() - (dateObj.getMinutes() % minuteIncrement));
        return DateISO(dateObj);
    }
    else {
        var cleanTime = TimeOnly(time);
        if (!cleanTime)
            return null;
        return TimeOnly(TimeFloorMinute(DateObject(DateOnly('now') + " " + cleanTime), minuteIncrement));
    }
};
var ESTTodayDateTimeLabel = function () { return new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }); };
var ESTTodayDate = function () { var _a; return (_a = DateFormat('Date', 'now', 'America/New_York')) !== null && _a !== void 0 ? _a : DateOnly('now'); };
var WeeksFromLabel = function (date, startOf, compareDate) {
    var _a;
    if (compareDate === void 0) { compareDate = 'now'; }
    if (!date)
        return '';
    var weeksFrom = (_a = DateDiff(DateOnly(compareDate, { week: startOf }), DateOnly(date, { week: startOf }), 'weeks')) !== null && _a !== void 0 ? _a : 0;
    switch (weeksFrom) {
        case 0:
            return 'This Week';
        case -1:
            return 'Last Week';
        case 1:
            return 'Next Week';
        default:
            return ToDigits(Math.abs(weeksFrom)) + " Weeks " + (weeksFrom < 0 ? 'Ago' : 'from Now');
    }
};
var DateDoWSundayZero = function (date) {
    if (date === void 0) { date = 'now'; }
    return CleanNumberNull(DateFormatAny('d', DateOnly(date)));
};
var DateIsWeekend = function (date) {
    if (date === void 0) { date = 'now'; }
    var dow = DateDoWSundayZero(date);
    if (dow === null)
        return false;
    return dow === 0 || dow === 6;
};
var DatesBetween = function (start, end, adjustments, limit) {
    if (adjustments === void 0) { adjustments = { day: 1 }; }
    if (limit === void 0) { limit = 1000; }
    if (!Object.values(adjustments).some(function (val) { return CleanNumber(val) > 0; }))
        return [];
    var addDate = DateOnly(start);
    var dates = [];
    while (DateCompare(addDate, 'IsSameOrBefore', end, 'day')) {
        dates.push(addDate);
        addDate = DateOnly(addDate, adjustments);
        if (dates.length >= limit)
            break;
    }
    return dates;
};
var TimeZoneOlsonsAll = [
    {
        group: 'US (Common)',
        zones: [
            { value: 'America/Puerto_Rico', name: 'Puerto Rico (Atlantic)' },
            { value: 'America/New_York', name: 'New York (Eastern)' },
            { value: 'America/Chicago', name: 'Chicago (Central)' },
            { value: 'America/Denver', name: 'Denver (Mountain)' },
            { value: 'America/Phoenix', name: 'Phoenix (MST)' },
            { value: 'America/Los_Angeles', name: 'Los Angeles (Pacific)' },
            { value: 'America/Anchorage', name: 'Anchorage (Alaska)' },
            { value: 'Pacific/Honolulu', name: 'Honolulu (Hawaii)' }
        ]
    },
    {
        group: 'America',
        zones: [
            { value: 'America/Adak', name: 'Adak' },
            { value: 'America/Anchorage', name: 'Anchorage' },
            { value: 'America/Anguilla', name: 'Anguilla' },
            { value: 'America/Antigua', name: 'Antigua' },
            { value: 'America/Araguaina', name: 'Araguaina' },
            { value: 'America/Argentina/Buenos_Aires', name: 'Argentina - Buenos Aires' },
            { value: 'America/Argentina/Catamarca', name: 'Argentina - Catamarca' },
            { value: 'America/Argentina/ComodRivadavia', name: 'Argentina - ComodRivadavia' },
            { value: 'America/Argentina/Cordoba', name: 'Argentina - Cordoba' },
            { value: 'America/Argentina/Jujuy', name: 'Argentina - Jujuy' },
            { value: 'America/Argentina/La_Rioja', name: 'Argentina - La Rioja' },
            { value: 'America/Argentina/Mendoza', name: 'Argentina - Mendoza' },
            { value: 'America/Argentina/Rio_Gallegos', name: 'Argentina - Rio Gallegos' },
            { value: 'America/Argentina/Salta', name: 'Argentina - Salta' },
            { value: 'America/Argentina/San_Juan', name: 'Argentina - San Juan' },
            { value: 'America/Argentina/San_Luis', name: 'Argentina - San Luis' },
            { value: 'America/Argentina/Tucuman', name: 'Argentina - Tucuman' },
            { value: 'America/Argentina/Ushuaia', name: 'Argentina - Ushuaia' },
            { value: 'America/Aruba', name: 'Aruba' },
            { value: 'America/Asuncion', name: 'Asuncion' },
            { value: 'America/Atikokan', name: 'Atikokan' },
            { value: 'America/Atka', name: 'Atka' },
            { value: 'America/Bahia', name: 'Bahia' },
            { value: 'America/Barbados', name: 'Barbados' },
            { value: 'America/Belem', name: 'Belem' },
            { value: 'America/Belize', name: 'Belize' },
            { value: 'America/Blanc-Sablon', name: 'Blanc-Sablon' },
            { value: 'America/Boa_Vista', name: 'Boa Vista' },
            { value: 'America/Bogota', name: 'Bogota' },
            { value: 'America/Boise', name: 'Boise' },
            { value: 'America/Buenos_Aires', name: 'Buenos Aires' },
            { value: 'America/Cambridge_Bay', name: 'Cambridge Bay' },
            { value: 'America/Campo_Grande', name: 'Campo Grande' },
            { value: 'America/Cancun', name: 'Cancun' },
            { value: 'America/Caracas', name: 'Caracas' },
            { value: 'America/Catamarca', name: 'Catamarca' },
            { value: 'America/Cayenne', name: 'Cayenne' },
            { value: 'America/Cayman', name: 'Cayman' },
            { value: 'America/Chicago', name: 'Chicago' },
            { value: 'America/Chihuahua', name: 'Chihuahua' },
            { value: 'America/Coral_Harbour', name: 'Coral Harbour' },
            { value: 'America/Cordoba', name: 'Cordoba' },
            { value: 'America/Costa_Rica', name: 'Costa Rica' },
            { value: 'America/Cuiaba', name: 'Cuiaba' },
            { value: 'America/Curacao', name: 'Curacao' },
            { value: 'America/Danmarkshavn', name: 'Danmarkshavn' },
            { value: 'America/Dawson', name: 'Dawson' },
            { value: 'America/Dawson_Creek', name: 'Dawson Creek' },
            { value: 'America/Denver', name: 'Denver' },
            { value: 'America/Detroit', name: 'Detroit' },
            { value: 'America/Dominica', name: 'Dominica' },
            { value: 'America/Edmonton', name: 'Edmonton' },
            { value: 'America/Eirunepe', name: 'Eirunepe' },
            { value: 'America/El_Salvador', name: 'El Salvador' },
            { value: 'America/Ensenada', name: 'Ensenada' },
            { value: 'America/Fortaleza', name: 'Fortaleza' },
            { value: 'America/Fort_Wayne', name: 'Fort Wayne' },
            { value: 'America/Glace_Bay', name: 'Glace Bay' },
            { value: 'America/Godthab', name: 'Godthab' },
            { value: 'America/Goose_Bay', name: 'Goose Bay' },
            { value: 'America/Grand_Turk', name: 'Grand Turk' },
            { value: 'America/Grenada', name: 'Grenada' },
            { value: 'America/Guadeloupe', name: 'Guadeloupe' },
            { value: 'America/Guatemala', name: 'Guatemala' },
            { value: 'America/Guayaquil', name: 'Guayaquil' },
            { value: 'America/Guyana', name: 'Guyana' },
            { value: 'America/Halifax', name: 'Halifax' },
            { value: 'America/Havana', name: 'Havana' },
            { value: 'America/Hermosillo', name: 'Hermosillo' },
            { value: 'America/Indiana/Indianapolis', name: 'Indiana - Indianapolis' },
            { value: 'America/Indiana/Knox', name: 'Indiana - Knox' },
            { value: 'America/Indiana/Marengo', name: 'Indiana - Marengo' },
            { value: 'America/Indiana/Petersburg', name: 'Indiana - Petersburg' },
            { value: 'America/Indiana/Tell_City', name: 'Indiana - Tell City' },
            { value: 'America/Indiana/Vevay', name: 'Indiana - Vevay' },
            { value: 'America/Indiana/Vincennes', name: 'Indiana - Vincennes' },
            { value: 'America/Indiana/Winamac', name: 'Indiana - Winamac' },
            { value: 'America/Indianapolis', name: 'Indianapolis' },
            { value: 'America/Inuvik', name: 'Inuvik' },
            { value: 'America/Iqaluit', name: 'Iqaluit' },
            { value: 'America/Jamaica', name: 'Jamaica' },
            { value: 'America/Jujuy', name: 'Jujuy' },
            { value: 'America/Juneau', name: 'Juneau' },
            { value: 'America/Kentucky/Louisville', name: 'Kentucky - Louisville' },
            { value: 'America/Kentucky/Monticello', name: 'Kentucky - Monticello' },
            { value: 'America/Knox_IN', name: 'Knox IN' },
            { value: 'America/La_Paz', name: 'La Paz' },
            { value: 'America/Lima', name: 'Lima' },
            { value: 'America/Los_Angeles', name: 'Los Angeles' },
            { value: 'America/Louisville', name: 'Louisville' },
            { value: 'America/Maceio', name: 'Maceio' },
            { value: 'America/Managua', name: 'Managua' },
            { value: 'America/Manaus', name: 'Manaus' },
            { value: 'America/Marigot', name: 'Marigot' },
            { value: 'America/Martinique', name: 'Martinique' },
            { value: 'America/Matamoros', name: 'Matamoros' },
            { value: 'America/Mazatlan', name: 'Mazatlan' },
            { value: 'America/Mendoza', name: 'Mendoza' },
            { value: 'America/Menominee', name: 'Menominee' },
            { value: 'America/Merida', name: 'Merida' },
            { value: 'America/Mexico_City', name: 'Mexico City' },
            { value: 'America/Miquelon', name: 'Miquelon' },
            { value: 'America/Moncton', name: 'Moncton' },
            { value: 'America/Monterrey', name: 'Monterrey' },
            { value: 'America/Montevideo', name: 'Montevideo' },
            { value: 'America/Montreal', name: 'Montreal' },
            { value: 'America/Montserrat', name: 'Montserrat' },
            { value: 'America/Nassau', name: 'Nassau' },
            { value: 'America/New_York', name: 'New York' },
            { value: 'America/Nipigon', name: 'Nipigon' },
            { value: 'America/Nome', name: 'Nome' },
            { value: 'America/Noronha', name: 'Noronha' },
            { value: 'America/North_Dakota/Center', name: 'North Dakota - Center' },
            { value: 'America/North_Dakota/New_Salem', name: 'North Dakota - New Salem' },
            { value: 'America/Ojinaga', name: 'Ojinaga' },
            { value: 'America/Panama', name: 'Panama' },
            { value: 'America/Pangnirtung', name: 'Pangnirtung' },
            { value: 'America/Paramaribo', name: 'Paramaribo' },
            { value: 'America/Phoenix', name: 'Phoenix' },
            { value: 'America/Port-au-Prince', name: 'Port-au-Prince' },
            { value: 'America/Porto_Acre', name: 'Porto Acre' },
            { value: 'America/Port_of_Spain', name: 'Port of Spain' },
            { value: 'America/Porto_Velho', name: 'Porto Velho' },
            { value: 'America/Puerto_Rico', name: 'Puerto Rico' },
            { value: 'America/Rainy_River', name: 'Rainy River' },
            { value: 'America/Rankin_Inlet', name: 'Rankin Inlet' },
            { value: 'America/Recife', name: 'Recife' },
            { value: 'America/Regina', name: 'Regina' },
            { value: 'America/Resolute', name: 'Resolute' },
            { value: 'America/Rio_Branco', name: 'Rio Branco' },
            { value: 'America/Rosario', name: 'Rosario' },
            { value: 'America/Santa_Isabel', name: 'Santa Isabel' },
            { value: 'America/Santarem', name: 'Santarem' },
            { value: 'America/Santiago', name: 'Santiago' },
            { value: 'America/Santo_Domingo', name: 'Santo Domingo' },
            { value: 'America/Sao_Paulo', name: 'Sao Paulo' },
            { value: 'America/Scoresbysund', name: 'Scoresbysund' },
            { value: 'America/Shiprock', name: 'Shiprock' },
            { value: 'America/St_Barthelemy', name: 'St Barthelemy' },
            { value: 'America/St_Johns', name: 'St Johns' },
            { value: 'America/St_Kitts', name: 'St Kitts' },
            { value: 'America/St_Lucia', name: 'St Lucia' },
            { value: 'America/St_Thomas', name: 'St Thomas' },
            { value: 'America/St_Vincent', name: 'St Vincent' },
            { value: 'America/Swift_Current', name: 'Swift Current' },
            { value: 'America/Tegucigalpa', name: 'Tegucigalpa' },
            { value: 'America/Thule', name: 'Thule' },
            { value: 'America/Thunder_Bay', name: 'Thunder Bay' },
            { value: 'America/Tijuana', name: 'Tijuana' },
            { value: 'America/Toronto', name: 'Toronto' },
            { value: 'America/Tortola', name: 'Tortola' },
            { value: 'America/Vancouver', name: 'Vancouver' },
            { value: 'America/Virgin', name: 'Virgin' },
            { value: 'America/Whitehorse', name: 'Whitehorse' },
            { value: 'America/Winnipeg', name: 'Winnipeg' },
            { value: 'America/Yakutat', name: 'Yakutat' },
            { value: 'America/Yellowknife', name: 'Yellowknife' }
        ]
    },
    {
        group: 'Europe',
        zones: [
            { value: 'Europe/Amsterdam', name: 'Amsterdam' },
            { value: 'Europe/Andorra', name: 'Andorra' },
            { value: 'Europe/Athens', name: 'Athens' },
            { value: 'Europe/Belfast', name: 'Belfast' },
            { value: 'Europe/Belgrade', name: 'Belgrade' },
            { value: 'Europe/Berlin', name: 'Berlin' },
            { value: 'Europe/Bratislava', name: 'Bratislava' },
            { value: 'Europe/Brussels', name: 'Brussels' },
            { value: 'Europe/Bucharest', name: 'Bucharest' },
            { value: 'Europe/Budapest', name: 'Budapest' },
            { value: 'Europe/Chisinau', name: 'Chisinau' },
            { value: 'Europe/Copenhagen', name: 'Copenhagen' },
            { value: 'Europe/Dublin', name: 'Dublin' },
            { value: 'Europe/Gibraltar', name: 'Gibraltar' },
            { value: 'Europe/Guernsey', name: 'Guernsey' },
            { value: 'Europe/Helsinki', name: 'Helsinki' },
            { value: 'Europe/Isle_of_Man', name: 'Isle of Man' },
            { value: 'Europe/Istanbul', name: 'Istanbul' },
            { value: 'Europe/Jersey', name: 'Jersey' },
            { value: 'Europe/Kaliningrad', name: 'Kaliningrad' },
            { value: 'Europe/Kiev', name: 'Kiev' },
            { value: 'Europe/Lisbon', name: 'Lisbon' },
            { value: 'Europe/Ljubljana', name: 'Ljubljana' },
            { value: 'Europe/London', name: 'London' },
            { value: 'Europe/Luxembourg', name: 'Luxembourg' },
            { value: 'Europe/Madrid', name: 'Madrid' },
            { value: 'Europe/Malta', name: 'Malta' },
            { value: 'Europe/Mariehamn', name: 'Mariehamn' },
            { value: 'Europe/Minsk', name: 'Minsk' },
            { value: 'Europe/Monaco', name: 'Monaco' },
            { value: 'Europe/Moscow', name: 'Moscow' },
            { value: 'Europe/Nicosia', name: 'Nicosia' },
            { value: 'Europe/Oslo', name: 'Oslo' },
            { value: 'Europe/Paris', name: 'Paris' },
            { value: 'Europe/Podgorica', name: 'Podgorica' },
            { value: 'Europe/Prague', name: 'Prague' },
            { value: 'Europe/Riga', name: 'Riga' },
            { value: 'Europe/Rome', name: 'Rome' },
            { value: 'Europe/Samara', name: 'Samara' },
            { value: 'Europe/San_Marino', name: 'San Marino' },
            { value: 'Europe/Sarajevo', name: 'Sarajevo' },
            { value: 'Europe/Simferopol', name: 'Simferopol' },
            { value: 'Europe/Skopje', name: 'Skopje' },
            { value: 'Europe/Sofia', name: 'Sofia' },
            { value: 'Europe/Stockholm', name: 'Stockholm' },
            { value: 'Europe/Tallinn', name: 'Tallinn' },
            { value: 'Europe/Tirane', name: 'Tirane' },
            { value: 'Europe/Tiraspol', name: 'Tiraspol' },
            { value: 'Europe/Uzhgorod', name: 'Uzhgorod' },
            { value: 'Europe/Vaduz', name: 'Vaduz' },
            { value: 'Europe/Vatican', name: 'Vatican' },
            { value: 'Europe/Vienna', name: 'Vienna' },
            { value: 'Europe/Vilnius', name: 'Vilnius' },
            { value: 'Europe/Volgograd', name: 'Volgograd' },
            { value: 'Europe/Warsaw', name: 'Warsaw' },
            { value: 'Europe/Zagreb', name: 'Zagreb' },
            { value: 'Europe/Zaporozhye', name: 'Zaporozhye' },
            { value: 'Europe/Zurich', name: 'Zurich' }
        ]
    },
    {
        group: 'Asia',
        zones: [
            { value: 'Asia/Aden', name: 'Aden' },
            { value: 'Asia/Almaty', name: 'Almaty' },
            { value: 'Asia/Amman', name: 'Amman' },
            { value: 'Asia/Anadyr', name: 'Anadyr' },
            { value: 'Asia/Aqtau', name: 'Aqtau' },
            { value: 'Asia/Aqtobe', name: 'Aqtobe' },
            { value: 'Asia/Ashgabat', name: 'Ashgabat' },
            { value: 'Asia/Ashkhabad', name: 'Ashkhabad' },
            { value: 'Asia/Baghdad', name: 'Baghdad' },
            { value: 'Asia/Bahrain', name: 'Bahrain' },
            { value: 'Asia/Baku', name: 'Baku' },
            { value: 'Asia/Bangkok', name: 'Bangkok' },
            { value: 'Asia/Beirut', name: 'Beirut' },
            { value: 'Asia/Bishkek', name: 'Bishkek' },
            { value: 'Asia/Brunei', name: 'Brunei' },
            { value: 'Asia/Calcutta', name: 'Calcutta' },
            { value: 'Asia/Choibalsan', name: 'Choibalsan' },
            { value: 'Asia/Chongqing', name: 'Chongqing' },
            { value: 'Asia/Chungking', name: 'Chungking' },
            { value: 'Asia/Colombo', name: 'Colombo' },
            { value: 'Asia/Dacca', name: 'Dacca' },
            { value: 'Asia/Damascus', name: 'Damascus' },
            { value: 'Asia/Dhaka', name: 'Dhaka' },
            { value: 'Asia/Dili', name: 'Dili' },
            { value: 'Asia/Dubai', name: 'Dubai' },
            { value: 'Asia/Dushanbe', name: 'Dushanbe' },
            { value: 'Asia/Gaza', name: 'Gaza' },
            { value: 'Asia/Harbin', name: 'Harbin' },
            { value: 'Asia/Ho_Chi_Minh', name: 'Ho Chi Minh' },
            { value: 'Asia/Hong_Kong', name: 'Hong Kong' },
            { value: 'Asia/Hovd', name: 'Hovd' },
            { value: 'Asia/Irkutsk', name: 'Irkutsk' },
            { value: 'Asia/Istanbul', name: 'Istanbul' },
            { value: 'Asia/Jakarta', name: 'Jakarta' },
            { value: 'Asia/Jayapura', name: 'Jayapura' },
            { value: 'Asia/Jerusalem', name: 'Jerusalem' },
            { value: 'Asia/Kabul', name: 'Kabul' },
            { value: 'Asia/Kamchatka', name: 'Kamchatka' },
            { value: 'Asia/Karachi', name: 'Karachi' },
            { value: 'Asia/Kashgar', name: 'Kashgar' },
            { value: 'Asia/Kathmandu', name: 'Kathmandu' },
            { value: 'Asia/Katmandu', name: 'Katmandu' },
            { value: 'Asia/Kolkata', name: 'Kolkata' },
            { value: 'Asia/Krasnoyarsk', name: 'Krasnoyarsk' },
            { value: 'Asia/Kuala_Lumpur', name: 'Kuala Lumpur' },
            { value: 'Asia/Kuching', name: 'Kuching' },
            { value: 'Asia/Kuwait', name: 'Kuwait' },
            { value: 'Asia/Macao', name: 'Macao' },
            { value: 'Asia/Macau', name: 'Macau' },
            { value: 'Asia/Magadan', name: 'Magadan' },
            { value: 'Asia/Makassar', name: 'Makassar' },
            { value: 'Asia/Manila', name: 'Manila' },
            { value: 'Asia/Muscat', name: 'Muscat' },
            { value: 'Asia/Nicosia', name: 'Nicosia' },
            { value: 'Asia/Novokuznetsk', name: 'Novokuznetsk' },
            { value: 'Asia/Novosibirsk', name: 'Novosibirsk' },
            { value: 'Asia/Omsk', name: 'Omsk' },
            { value: 'Asia/Oral', name: 'Oral' },
            { value: 'Asia/Phnom_Penh', name: 'Phnom Penh' },
            { value: 'Asia/Pontianak', name: 'Pontianak' },
            { value: 'Asia/Pyongyang', name: 'Pyongyang' },
            { value: 'Asia/Qatar', name: 'Qatar' },
            { value: 'Asia/Qyzylorda', name: 'Qyzylorda' },
            { value: 'Asia/Rangoon', name: 'Rangoon' },
            { value: 'Asia/Riyadh', name: 'Riyadh' },
            { value: 'Asia/Saigon', name: 'Saigon' },
            { value: 'Asia/Sakhalin', name: 'Sakhalin' },
            { value: 'Asia/Samarkand', name: 'Samarkand' },
            { value: 'Asia/Seoul', name: 'Seoul' },
            { value: 'Asia/Shanghai', name: 'Shanghai' },
            { value: 'Asia/Singapore', name: 'Singapore' },
            { value: 'Asia/Taipei', name: 'Taipei' },
            { value: 'Asia/Tashkent', name: 'Tashkent' },
            { value: 'Asia/Tbilisi', name: 'Tbilisi' },
            { value: 'Asia/Tehran', name: 'Tehran' },
            { value: 'Asia/Tel_Aviv', name: 'Tel Aviv' },
            { value: 'Asia/Thimbu', name: 'Thimbu' },
            { value: 'Asia/Thimphu', name: 'Thimphu' },
            { value: 'Asia/Tokyo', name: 'Tokyo' },
            { value: 'Asia/Ujung_Pandang', name: 'Ujung Pandang' },
            { value: 'Asia/Ulaanbaatar', name: 'Ulaanbaatar' },
            { value: 'Asia/Ulan_Bator', name: 'Ulan Bator' },
            { value: 'Asia/Urumqi', name: 'Urumqi' },
            { value: 'Asia/Vientiane', name: 'Vientiane' },
            { value: 'Asia/Vladivostok', name: 'Vladivostok' },
            { value: 'Asia/Yakutsk', name: 'Yakutsk' },
            { value: 'Asia/Yekaterinburg', name: 'Yekaterinburg' },
            { value: 'Asia/Yerevan', name: 'Yerevan' }
        ]
    },
    {
        group: 'Africa',
        zones: [
            { value: 'Africa/Abidjan', name: 'Abidjan' },
            { value: 'Africa/Accra', name: 'Accra' },
            { value: 'Africa/Addis_Ababa', name: 'Addis Ababa' },
            { value: 'Africa/Algiers', name: 'Algiers' },
            { value: 'Africa/Asmara', name: 'Asmara' },
            { value: 'Africa/Asmera', name: 'Asmera' },
            { value: 'Africa/Bamako', name: 'Bamako' },
            { value: 'Africa/Bangui', name: 'Bangui' },
            { value: 'Africa/Banjul', name: 'Banjul' },
            { value: 'Africa/Bissau', name: 'Bissau' },
            { value: 'Africa/Blantyre', name: 'Blantyre' },
            { value: 'Africa/Brazzaville', name: 'Brazzaville' },
            { value: 'Africa/Bujumbura', name: 'Bujumbura' },
            { value: 'Africa/Cairo', name: 'Cairo' },
            { value: 'Africa/Casablanca', name: 'Casablanca' },
            { value: 'Africa/Ceuta', name: 'Ceuta' },
            { value: 'Africa/Conakry', name: 'Conakry' },
            { value: 'Africa/Dakar', name: 'Dakar' },
            { value: 'Africa/Dar_es_Salaam', name: 'Dar es Salaam' },
            { value: 'Africa/Djibouti', name: 'Djibouti' },
            { value: 'Africa/Douala', name: 'Douala' },
            { value: 'Africa/El_Aaiun', name: 'El Aaiun' },
            { value: 'Africa/Freetown', name: 'Freetown' },
            { value: 'Africa/Gaborone', name: 'Gaborone' },
            { value: 'Africa/Harare', name: 'Harare' },
            { value: 'Africa/Johannesburg', name: 'Johannesburg' },
            { value: 'Africa/Kampala', name: 'Kampala' },
            { value: 'Africa/Khartoum', name: 'Khartoum' },
            { value: 'Africa/Kigali', name: 'Kigali' },
            { value: 'Africa/Kinshasa', name: 'Kinshasa' },
            { value: 'Africa/Lagos', name: 'Lagos' },
            { value: 'Africa/Libreville', name: 'Libreville' },
            { value: 'Africa/Lome', name: 'Lome' },
            { value: 'Africa/Luanda', name: 'Luanda' },
            { value: 'Africa/Lubumbashi', name: 'Lubumbashi' },
            { value: 'Africa/Lusaka', name: 'Lusaka' },
            { value: 'Africa/Malabo', name: 'Malabo' },
            { value: 'Africa/Maputo', name: 'Maputo' },
            { value: 'Africa/Maseru', name: 'Maseru' },
            { value: 'Africa/Mbabane', name: 'Mbabane' },
            { value: 'Africa/Mogadishu', name: 'Mogadishu' },
            { value: 'Africa/Monrovia', name: 'Monrovia' },
            { value: 'Africa/Nairobi', name: 'Nairobi' },
            { value: 'Africa/Ndjamena', name: 'Ndjamena' },
            { value: 'Africa/Niamey', name: 'Niamey' },
            { value: 'Africa/Nouakchott', name: 'Nouakchott' },
            { value: 'Africa/Ouagadougou', name: 'Ouagadougou' },
            { value: 'Africa/Porto-Novo', name: 'Porto-Novo' },
            { value: 'Africa/Sao_Tome', name: 'Sao Tome' },
            { value: 'Africa/Timbuktu', name: 'Timbuktu' },
            { value: 'Africa/Tripoli', name: 'Tripoli' },
            { value: 'Africa/Tunis', name: 'Tunis' },
            { value: 'Africa/Windhoek', name: 'Windhoek' }
        ]
    },
    {
        group: 'Australia',
        zones: [
            { value: 'Australia/ACT', name: 'ACT' },
            { value: 'Australia/Adelaide', name: 'Adelaide' },
            { value: 'Australia/Brisbane', name: 'Brisbane' },
            { value: 'Australia/Broken_Hill', name: 'Broken Hill' },
            { value: 'Australia/Canberra', name: 'Canberra' },
            { value: 'Australia/Currie', name: 'Currie' },
            { value: 'Australia/Darwin', name: 'Darwin' },
            { value: 'Australia/Eucla', name: 'Eucla' },
            { value: 'Australia/Hobart', name: 'Hobart' },
            { value: 'Australia/LHI', name: 'LHI' },
            { value: 'Australia/Lindeman', name: 'Lindeman' },
            { value: 'Australia/Lord_Howe', name: 'Lord Howe' },
            { value: 'Australia/Melbourne', name: 'Melbourne' },
            { value: 'Australia/North', name: 'North' },
            { value: 'Australia/NSW', name: 'NSW' },
            { value: 'Australia/Perth', name: 'Perth' },
            { value: 'Australia/Queensland', name: 'Queensland' },
            { value: 'Australia/South', name: 'South' },
            { value: 'Australia/Sydney', name: 'Sydney' },
            { value: 'Australia/Tasmania', name: 'Tasmania' },
            { value: 'Australia/Victoria', name: 'Victoria' },
            { value: 'Australia/West', name: 'West' },
            { value: 'Australia/Yancowinna', name: 'Yancowinna' }
        ]
    },
    {
        group: 'Indian',
        zones: [
            { value: 'Indian/Antananarivo', name: 'Antananarivo' },
            { value: 'Indian/Chagos', name: 'Chagos' },
            { value: 'Indian/Christmas', name: 'Christmas' },
            { value: 'Indian/Cocos', name: 'Cocos' },
            { value: 'Indian/Comoro', name: 'Comoro' },
            { value: 'Indian/Kerguelen', name: 'Kerguelen' },
            { value: 'Indian/Mahe', name: 'Mahe' },
            { value: 'Indian/Maldives', name: 'Maldives' },
            { value: 'Indian/Mauritius', name: 'Mauritius' },
            { value: 'Indian/Mayotte', name: 'Mayotte' },
            { value: 'Indian/Reunion', name: 'Reunion' }
        ]
    },
    {
        group: 'Atlantic',
        zones: [
            { value: 'Atlantic/Azores', name: 'Azores' },
            { value: 'Atlantic/Bermuda', name: 'Bermuda' },
            { value: 'Atlantic/Canary', name: 'Canary' },
            { value: 'Atlantic/Cape_Verde', name: 'Cape Verde' },
            { value: 'Atlantic/Faeroe', name: 'Faeroe' },
            { value: 'Atlantic/Faroe', name: 'Faroe' },
            { value: 'Atlantic/Jan_Mayen', name: 'Jan Mayen' },
            { value: 'Atlantic/Madeira', name: 'Madeira' },
            { value: 'Atlantic/Reykjavik', name: 'Reykjavik' },
            { value: 'Atlantic/South_Georgia', name: 'South Georgia' },
            { value: 'Atlantic/Stanley', name: 'Stanley' },
            { value: 'Atlantic/St_Helena', name: 'St Helena' }
        ]
    },
    {
        group: 'Pacific',
        zones: [
            { value: 'Pacific/Apia', name: 'Apia' },
            { value: 'Pacific/Auckland', name: 'Auckland' },
            { value: 'Pacific/Chatham', name: 'Chatham' },
            { value: 'Pacific/Easter', name: 'Easter' },
            { value: 'Pacific/Efate', name: 'Efate' },
            { value: 'Pacific/Enderbury', name: 'Enderbury' },
            { value: 'Pacific/Fakaofo', name: 'Fakaofo' },
            { value: 'Pacific/Fiji', name: 'Fiji' },
            { value: 'Pacific/Funafuti', name: 'Funafuti' },
            { value: 'Pacific/Galapagos', name: 'Galapagos' },
            { value: 'Pacific/Gambier', name: 'Gambier' },
            { value: 'Pacific/Guadalcanal', name: 'Guadalcanal' },
            { value: 'Pacific/Guam', name: 'Guam' },
            { value: 'Pacific/Honolulu', name: 'Honolulu' },
            { value: 'Pacific/Johnston', name: 'Johnston' },
            { value: 'Pacific/Kiritimati', name: 'Kiritimati' },
            { value: 'Pacific/Kosrae', name: 'Kosrae' },
            { value: 'Pacific/Kwajalein', name: 'Kwajalein' },
            { value: 'Pacific/Majuro', name: 'Majuro' },
            { value: 'Pacific/Marquesas', name: 'Marquesas' },
            { value: 'Pacific/Midway', name: 'Midway' },
            { value: 'Pacific/Nauru', name: 'Nauru' },
            { value: 'Pacific/Niue', name: 'Niue' },
            { value: 'Pacific/Norfolk', name: 'Norfolk' },
            { value: 'Pacific/Noumea', name: 'Noumea' },
            { value: 'Pacific/Pago_Pago', name: 'Pago Pago' },
            { value: 'Pacific/Palau', name: 'Palau' },
            { value: 'Pacific/Pitcairn', name: 'Pitcairn' },
            { value: 'Pacific/Ponape', name: 'Ponape' },
            { value: 'Pacific/Port_Moresby', name: 'Port Moresby' },
            { value: 'Pacific/Rarotonga', name: 'Rarotonga' },
            { value: 'Pacific/Saipan', name: 'Saipan' },
            { value: 'Pacific/Samoa', name: 'Samoa' },
            { value: 'Pacific/Tahiti', name: 'Tahiti' },
            { value: 'Pacific/Tarawa', name: 'Tarawa' },
            { value: 'Pacific/Tongatapu', name: 'Tongatapu' },
            { value: 'Pacific/Truk', name: 'Truk' },
            { value: 'Pacific/Wake', name: 'Wake' },
            { value: 'Pacific/Wallis', name: 'Wallis' },
            { value: 'Pacific/Yap', name: 'Yap' }
        ]
    },
    {
        group: 'Antarctica',
        zones: [
            { value: 'Antarctica/Casey', name: 'Casey' },
            { value: 'Antarctica/Davis', name: 'Davis' },
            { value: 'Antarctica/DumontDUrville', name: 'DumontDUrville' },
            { value: 'Antarctica/Macquarie', name: 'Macquarie' },
            { value: 'Antarctica/Mawson', name: 'Mawson' },
            { value: 'Antarctica/McMurdo', name: 'McMurdo' },
            { value: 'Antarctica/Palmer', name: 'Palmer' },
            { value: 'Antarctica/Rothera', name: 'Rothera' },
            { value: 'Antarctica/South_Pole', name: 'South Pole' },
            { value: 'Antarctica/Syowa', name: 'Syowa' },
            { value: 'Antarctica/Vostok', name: 'Vostok' }
        ]
    },
    {
        group: 'Arctic',
        zones: [{ value: 'Arctic/Longyearbyen', name: 'Longyearbyen' }]
    },
    {
        group: 'UTC',
        zones: [{ value: 'UTC', name: 'UTC' }]
    },
    {
        group: 'Manual Offsets',
        zones: [
            { value: 'UTC-12', name: 'UTC-12' },
            { value: 'UTC-11', name: 'UTC-11' },
            { value: 'UTC-10', name: 'UTC-10' },
            { value: 'UTC-9', name: 'UTC-9' },
            { value: 'UTC-8', name: 'UTC-8' },
            { value: 'UTC-7', name: 'UTC-7' },
            { value: 'UTC-6', name: 'UTC-6' },
            { value: 'UTC-5', name: 'UTC-5' },
            { value: 'UTC-4', name: 'UTC-4' },
            { value: 'UTC-3', name: 'UTC-3' },
            { value: 'UTC-2', name: 'UTC-2' },
            { value: 'UTC-1', name: 'UTC-1' },
            { value: 'UTC+0', name: 'UTC+0' },
            { value: 'UTC+1', name: 'UTC+1' },
            { value: 'UTC+2', name: 'UTC+2' },
            { value: 'UTC+3', name: 'UTC+3' },
            { value: 'UTC+4', name: 'UTC+4' },
            { value: 'UTC+5', name: 'UTC+5' },
            { value: 'UTC+6', name: 'UTC+6' },
            { value: 'UTC+7', name: 'UTC+7' },
            { value: 'UTC+8', name: 'UTC+8' },
            { value: 'UTC+9', name: 'UTC+9' },
            { value: 'UTC+10', name: 'UTC+10' },
            { value: 'UTC+11', name: 'UTC+11' },
            { value: 'UTC+12', name: 'UTC+12' },
            { value: 'UTC+13', name: 'UTC+13' },
            { value: 'UTC+14', name: 'UTC+14' }
        ]
    }
];
var TimeZoneOlsonsAmerica = function () { var _a, _b; return ((_b = (_a = TimeZoneOlsonsAll.find(function (TZOA) { return TZOA.group === 'America'; })) === null || _a === void 0 ? void 0 : _a.zones) !== null && _b !== void 0 ? _b : []).map(function (zone) { return zone.value; }); };
var TimeZoneOlsonsAmericaCommon = function () { var _a, _b; return ((_b = (_a = TimeZoneOlsonsAll.find(function (TZOA) { return TZOA.group === 'US (Common)'; })) === null || _a === void 0 ? void 0 : _a.zones) !== null && _b !== void 0 ? _b : []).map(function (zone) { return zone.value; }); };
function IANAZoneAbbr(date, iana) {
    var _a;
    var today = (_a = DateObject(date, { timezoneSource: iana !== null && iana !== void 0 ? iana : undefined })) !== null && _a !== void 0 ? _a : new Date();
    var short = today.toLocaleDateString(undefined);
    var full = today.toLocaleDateString(undefined, { timeZoneName: 'short', timeZone: iana !== null && iana !== void 0 ? iana : undefined });
    // Trying to remove date from the string in a locale-agnostic way
    var shortIndex = full.indexOf(short);
    if (shortIndex >= 0) {
        var trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);
        // by this time `trimmed` should be the timezone's name with some punctuation -
        // trim it from both sides
        return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');
    }
    else {
        // in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's name
        return full;
    }
}

var initialChanges = {};
/**
 * Applies a value to a name on a change object, and removes the value if it matches what was in the original
 *
 * @param value
 * @param name
 * @param setChanges
 * @param original
 * @constructor
 */
var ChangeValueChanges = function (value, name, setChanges, original) {
    if (!!setChanges && !!name) {
        setChanges(function (prevState) {
            var nextState = __assign({}, prevState);
            if (!!original && IsEqual(original[name], value)) {
                delete nextState[name];
            }
            else {
                nextState[name] = value;
            }
            return nextState;
        });
    }
};
/**
 * Adds a change to the IChange object.
 *
 * @example
 * const employee = {id: 1, name: 'Bob'}
 * const [changes, setChanges] = useState({} as IChanges)
 *
 * setChanges(prevState => AddChange('name', 'John', prevState)) // result: {name: 'John'}
 *
 * const updatedEmployee = ObjectWithChanges(employee, changes) // result: {id: 1, name: 'John'}
 */
var AddChange = function (name, value, changes) {
    var _a;
    return (__assign(__assign({}, changes), (_a = {}, _a[name] = value, _a)));
};
/**
 * Returns the final state of an object with changes applied.
 *
 * @example
 * const employee = {id: 1, name: 'Bob'}
 * const [changes, setChanges] = useState({} as IChanges)
 * setChanges(prevState => AddChange('name', 'John', prevState)) // result: {name: 'John'}
 *
 * const updatedEmployee = ObjectWithChanges(employee, changes) // result: {id: 1, name: 'John'}
 */
var ObjectWithChanges = function (item, changes) {
    return (__assign(__assign({}, item), changes));
};
var initialIDChanges = {};
/**
 * IIDChanges provides a structure for tracking changes across an array of items that have a unique "id" column.
 *
 * @example
 * const employees = [{id: 1, name: 'Bob'}, {id: 2, name: 'John'}]
 * const [idChanges, setIDChanges] = useState({} as IIDChanges)
 *
 * setIDChanges(prevState => AddIDChange(1, 'name', 'Bobby', prevState)) // result: {1: {'name', 'Bobby'}}
 *
 * setIDChanges(prevState => AddIDChange(2, 'name', 'Johnny', prevState)) // result: {1: {'name', 'Johnny'}, 2: {'name', 'Johnny'}}
 *
 * const updatedEmployees = ArrayWithIDChanges(employees, idChanges) // result: [{id: 1, name: 'Bobby'}, {id: 2, name: 'Johnny'}]
 */
var AddIDChange = function (id, name, value, idChanges) {
    var _a, _b;
    return (__assign(__assign({}, idChanges), (_a = {}, _a[id] = __assign(__assign({}, idChanges[id]), (_b = {}, _b[name] = value, _b)), _a)));
};
var AddIDChanges = function (id, changes, idChanges) {
    var _a;
    return (__assign(__assign({}, idChanges), (_a = {}, _a[id] = __assign(__assign({}, idChanges[id]), changes), _a)));
};
/**
 * Returns a new state for an array with elements uniquely identifiable by id or uuid, leaving it in the same order it found it.
 *
 * const [data, setData] = useState([{id: 1, name: 'Bob', age: 35}, {uuid: 'abcd', name: 'John', age: 40}])
 *
 * setData(prevState => ChangeArrayByIDOrUUID(prevState, {id: 1, name: 'Bobby'}))
 * setData(prevState => ChangeArrayByIDOrUUID(prevState, {uuid: 'abcd', age: 42}))
 *
 *
 * @param change
 * @param prevState
 * @param initial
 * @constructor
 */
var ChangeArrayByIDOrUUID = function (prevState, change, initial) {
    var newState = __spread(prevState);
    var idx = newState.findIndex(function (nS) { return (!!change.id && change.id === nS.id) || (!!change.uuid && change.uuid === nS.uuid); });
    if (idx >= 0) {
        newState[idx] = __assign(__assign({}, newState[idx]), change);
        return newState;
    }
    var newVal = __assign(__assign({}, initial), change);
    if (!newVal.id && !newVal.uuid)
        newVal.uuid = GenerateUUID();
    return __spread(newState, [__assign({}, newVal)]);
};
/**
 * Combines original value arrays with changed values, and produces a new set, in order
 *
 * const original = [{id: 1, name: 'Bob', age: 35}, {id: 2, name: 'Sally', age: 25}]
 * const changes = [{id: 1, name: 'Bobby'}, {uuid: 'abcd', age: 42}]
 *
 * CombineArrayWithIDOrUUIDChanges(original, changes) = [{id: 1, name: 'Bobby', age: 35}, {id: 2, name: 'Sally', age: 25}, {uuid: 'abcd', age: 42}]
 *
 *
 * @constructor
 * @param original
 * @param changes
 * @param initial
 */
var CombineArrayWithIDOrUUIDChanges = function (original, changes, initial) { return changes.reduce(function (result, change) { return ChangeArrayByIDOrUUID(result, change, initial); }, original); };
/**
 * IIDChanges provides a structure for tracking changes across an array of items that have a unique "id" column.
 *
 * @example
 * const employees = [{id: 1, name: 'Bob'}, {id: 2, name: 'John'}]
 * const [idChanges, setIDChanges] = useState({} as IIDChanges)
 *
 * setIDChanges(prevState => AddIDChange(1, 'name', 'Bobby', prevState)) // result: {1: {'name': 'Bobby'}}
 * setIDChanges(prevState => AddIDChange(2, 'name', 'Johnny', prevState)) // result: {1: {'name': 'Bobby'}, 2: {'name': 'Johnny'}}
 *
 * const updatedEmployees = ArrayWithIDChanges(employees, idChanges) // result: [{id: 1, name: 'Bobby'}, {id: 2, name: 'Johnny'}]
 */
var ArrayWithIDChanges = function (items, idChanges) {
    return items.map(function (item) { return (__assign(__assign({}, item), idChanges[item.id])); });
};
/**
 * Converts Data to CSV. Creates a download link and triggers
 * click event on it to download the file.
 */
var DataToCSVExport = function (filename, csvData, blankZeros) {
    if (blankZeros === void 0) { blankZeros = true; }
    var csvString = csvData
        .map(function (row) {
        return row
            .map(function (item) {
            return blankZeros && ((typeof item === 'number' && !item) || item === '0')
                ? ''
                : typeof item === 'string'
                    ? '"' + ReplaceAll('"', '""', item) + '"'
                    : (item !== null && item !== void 0 ? item : '').toString();
        })
            .join(',');
    })
        .join('\n');
    var pom = document.createElement('a');
    var blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    pom.href = URL.createObjectURL(blob);
    pom.setAttribute('download', filename);
    pom.click();
};
/**
 * Converts Data to CSV without quotes. Creates a download link and triggers
 * click event on it to download the file.
 */
var DataToCSVExportNoQuotes = function (filename, csvData) {
    var csvString = csvData
        .map(function (row) {
        return row.map(function (item) { return (!!item && !isNaN(item) ? Math.round(item * 100) / 100 : item !== null && item !== void 0 ? item : ''); }).join(',');
    })
        .join('\n');
    var pom = document.createElement('a');
    var blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    pom.href = URL.createObjectURL(blob);
    pom.setAttribute('download', filename);
    pom.click();
};
/**
 * Converts an array of records into a tab-delimited string, usable by Excel
 *
 * @param datasets
 * @param includeHeaders
 * @param headerToWords
 * @constructor
 */
var DataToTabDelim = function (datasets, includeHeaders, headerToWords) {
    var e_1, _a;
    if (includeHeaders === void 0) { includeHeaders = true; }
    if (headerToWords === void 0) { headerToWords = true; }
    var headers = datasets.reduce(function (results, dataset) { return __spread(results, Object.keys(dataset).filter(function (ds) { return !results.includes(ds); })); }, []);
    var tabDelim = '';
    if (includeHeaders) {
        tabDelim += headers
            .map(function (header) { return "\"" + (headerToWords ? ToUpperCaseWords(header) : header) + "\""; })
            .join('\t');
    }
    var _loop_1 = function (dataset) {
        if (tabDelim)
            tabDelim += "\r\n";
        tabDelim += headers
            .map(function (header) {
            if (dataset[header] === undefined ||
                dataset[header] === null ||
                (typeof dataset[header] === 'string' && dataset[header].trim() === ''))
                return '';
            var numberValue = CleanNumberNull(dataset[header]);
            if (numberValue !== null) {
                return numberValue.toString();
            }
            return "\"" + dataset[header] + "\"";
        })
            .join('\t');
    };
    try {
        for (var datasets_1 = __values(datasets), datasets_1_1 = datasets_1.next(); !datasets_1_1.done; datasets_1_1 = datasets_1.next()) {
            var dataset = datasets_1_1.value;
            _loop_1(dataset);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (datasets_1_1 && !datasets_1_1.done && (_a = datasets_1.return)) _a.call(datasets_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return tabDelim;
};
/**
 * Checks if a string is a valid JSON structure
 */
var IsJSON = function (json) {
    if (!json)
        return false;
    if (typeof json !== 'string')
        return false;
    try {
        var result = JSON.parse(json);
        var type = Object.prototype.toString.call(result);
        return type === '[object Object]' || type === '[object Array]';
    }
    catch (err) {
        return false;
    }
};
var IsEqual = function (val1, val2, consoleLog) {
    if (consoleLog === void 0) { consoleLog = false; }
    if (val1 === val2)
        return true;
    if (val1 === null)
        return val2 === null;
    if (val2 === null) {
        if (consoleLog)
            console.log(val1, val2);
        return false;
    }
    if (val1 === undefined)
        return val2 === undefined;
    if (val2 === undefined) {
        if (consoleLog)
            console.log(val1, val2);
        return false;
    }
    if (Array.isArray(val1)) {
        if (Array.isArray(val2)) {
            if (val1.length !== val2.length) {
                if (consoleLog)
                    console.log('Lengths', val1, val2);
                return false;
            }
            for (var i = 0; i < val1.length; i++) {
                if (!IsEqual(val1[i], val2[i])) {
                    return false;
                }
            }
            return true;
        }
        else {
            if (consoleLog)
                console.log('Array/Not', val1, val2);
            return false;
        }
    }
    else if (Array.isArray(val2)) {
        if (consoleLog)
            console.log('Array/Not', val1, val2);
        return false;
    }
    if (typeof val1 === 'object' || typeof val2 === 'object') {
        var keys1 = Object.keys(val1);
        var keys2 = Object.keys(val2);
        if (keys1.length !== keys2.length) {
            if (consoleLog)
                console.log('Object Keys', val1, val2);
            return false;
        }
        var idx = keys1.findIndex(function (key1) { return !IsEqual(val1[key1], val2[key1]); });
        if (idx === -1)
            return true;
        if (consoleLog) {
            console.log("Object Key", keys1[idx], val1, val2);
            return false;
        }
    }
    else if (val1 === val2) {
        return true;
    }
    else {
        var firstNumber = CleanNumberNull(val1);
        if (firstNumber !== null) {
            var secondNumber = CleanNumberNull(val2);
            if (secondNumber !== null && firstNumber === secondNumber) {
                return true;
            }
            if (consoleLog)
                console.log('Numbers1', val1, val2);
        }
        else if (CleanNumberNull(val2) !== null) {
            if (consoleLog)
                console.log('Numbers2', val1, val2);
            return false;
        }
        if (IsDateString(val1)) {
            var pTRM = DateFormat(val1, DATE_FORMAT_DATE);
            if (!!pTRM) {
                if (IsDateString(val2)) {
                    var rM = DateFormat(val2, DATE_FORMAT_DATE);
                    if (!!rM && pTRM === rM) {
                        return true;
                    }
                    else {
                        if (consoleLog)
                            console.log('Dates', val1, val2);
                    }
                }
                else {
                    if (consoleLog)
                        console.log('Dates', val1, val2);
                }
            }
        }
    }
    if (consoleLog)
        console.log('Fallout', val1, val2);
    return false;
};
/**
 * Removes properties from an object having the same value.
 *
 * @example
 * let data = {
 *   name: 'john doe',
 *   age: 24,
 * }
 *
 * let data2 = {
 *   name: 'john smith',
 *   age: 24,
 * }
 *
 * // returns {name: 'john doe}
 * RemoveDupProperties(data, data2)
 */
var RemoveDupProperties = function (original, propsToRemove) {
    var result = __assign({}, original);
    for (var key in propsToRemove) {
        if (propsToRemove.hasOwnProperty(key)) {
            if (DeepEqual(propsToRemove[key], result[key])) {
                delete result[key];
            }
        }
    }
    return result;
};
/**
 * Removes properties from an object having the same value by ID.
 *
 * @example
 * let data = {
 *   1: {
 *     name: 'john doe',
 *     age: 24,
 *   }
 * }
 *
 * let data2 = {
 *   1: {
 *     name: 'john smith',
 *     age: 24,
 *   }
 * }
 *
 * // returns {1: {name: 'john doe}}
 * RemoveDupPropertiesByID(data, data2)
 */
var RemoveDupPropertiesByID = function (original, propsToRemove) {
    var result = __assign({}, original);
    for (var key in propsToRemove) {
        if (propsToRemove.hasOwnProperty(key)) {
            if (result.hasOwnProperty(key)) {
                var subResult = RemoveDupProperties(result[key], propsToRemove[key]);
                if (Object.keys(subResult).length === 0) {
                    delete result[key];
                }
                else {
                    result[key] = subResult;
                }
            }
        }
    }
    return result;
};
/**
 * Removes properties from an object having the same value by an array of objects.
 *
 * @example
 * let data = {
 *   1: {
 *     name: 'john doe',
 *     age: 24,
 *   }
 * }
 *
 * let data2 = [
 *   {id: '1', user: 'john smith', age: 24},
 *   {id: '2', user: 'sally jones', age: 32}
 * ]
 *
 * // returns {1: {name: 'john doe}}
 * RemoveDupPropertiesByIDArray(data, data2)
 */
var RemoveDupPropertiesByIDArray = function (original, propsToRemoveArray) {
    var result = __assign({}, original);
    var _loop_2 = function (key) {
        if (original.hasOwnProperty(key)) {
            var propsToRemove = propsToRemoveArray.find(function (propsToRemove) { return propsToRemove.id == key; });
            if (!!propsToRemove) {
                var subResult = RemoveDupProperties(result[key], propsToRemove);
                if (Object.keys(subResult).length === 0) {
                    delete result[key];
                }
                else {
                    result[key] = subResult;
                }
            }
        }
    };
    for (var key in original) {
        _loop_2(key);
    }
    return result;
};
/**
 * Returns the difference of two objects.
 *
 * @example
 * let data = {id: 1, user: 'john doe', age: 24}
 * let data2 = {id: 2, user: 'john doe', age: 23}
 *
 * // returns {id: 1, age: 24}
 * ObjectDiffs(data, data2)
 *
 * // returns {age: 24}
 * ObjectDiffs(data, data2, 'id')
 */
var ObjectDiffs = function (compare, comparedTo, excludeKeys) {
    var e_2, _a;
    if (excludeKeys === void 0) { excludeKeys = []; }
    var results = {};
    try {
        for (var _b = __values(Object.keys(compare)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (!excludeKeys.includes(key)) {
                if (compare[key] !== comparedTo[key]) {
                    results[key] = compare[key];
                }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return results;
};
/**
 * Returns a reduces object to other keys.
 *
 * @example
 * let data = {id: 1, user: 'john doe', age: 24}
 * let data2 = {user: 'john doe'}
 *
 * // returns {user: '', age: ''}
 * ReduceObjectToOtherKeys(data, data2)
 *
 * // returns {user: ''}
 * ReduceObjectToOtherKeys(data, data2, ['age'])
 */
var ReduceObjectToOtherKeys = function (main, reduceTo, excludeKeys) {
    var e_3, _a;
    if (excludeKeys === void 0) { excludeKeys = []; }
    var results = {};
    try {
        for (var _b = __values(Object.keys(main)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (!excludeKeys.includes(key) && reduceTo[key] !== undefined) {
                results[key] = main[key];
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return results;
};

var EvaluatorOperators = ['&&', '||', '!=', '<>', '>=', '<=', '=', '<', '>', '-', '+', '/', '*', '^'];
var EvaluatorFunctions = ['abs', 'pow', 'int', 'round', 'includes', 'includesinarray'];
/**
 * Accepts a string, and processes varialbes againt it. Everything within square brackets [] will run through a calculation.
 *
 * @example
 * // returns "Hello, Bob"
 * EvaluateString("Hello, [Name]!", {Name: "Bob"})
 *
 * // returns "1 + SomeValue = 3"
 * EvaluateString("1 + SomeValue = [1 + [SomeValue]]", {SomeValue: 2})
 */
var EvaluateString = function (expression, variables) {
    var e_1, _a;
    var _b, _c, _d;
    var returnValue = expression;
    if (!!variables) {
        try {
            for (var _e = __values(Object.keys(variables)), _f = _e.next(); !_f.done; _f = _e.next()) {
                var key = _f.value;
                returnValue = ReplaceAll("[" + key + "]", variables[key], returnValue);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    var innerSet = FindInnerSetLocations(returnValue, '[', ']');
    while (!!innerSet) {
        var beforeValue = (_b = returnValue.substring(0, innerSet[0])) !== null && _b !== void 0 ? _b : '';
        var replaceValue = (_c = ProcessPMDAS(returnValue.substring(innerSet[0] + 1, innerSet[1]))) !== null && _c !== void 0 ? _c : '';
        var afterValue = (_d = returnValue.substring(innerSet[1] + 1)) !== null && _d !== void 0 ? _d : '';
        returnValue = "" + beforeValue + replaceValue + afterValue;
        innerSet = FindInnerSetLocations(returnValue, '[', ']');
    }
    returnValue = ExecuteFunctions(returnValue);
    return returnValue;
};
/**
 * Accepts a string, processes variables against the entire string, and returns a boolean if the condition is true or false.
 *
 * @example
 *
 * // returns false
 * EvaluateCondition("1 = SomeValue", {SomeValue: 2})
 *
 * // returns true
 * EvaluateCondition("2 = SomeValue", {SomeValue: 2}) = true
 */
var EvaluateCondition = function (expression, variables) {
    return IsOn(EvaluateString("[" + expression + "]", variables));
};
var FindInnerSetLocations = function (stringItem, setStart, setEnd) {
    if (!!stringItem) {
        var len = stringItem.length;
        var openingLocation = null;
        for (var i = 0; i < len; i++) {
            if (stringItem.substr(i, 1) === setStart) {
                openingLocation = i;
            }
            else if (openingLocation !== null && stringItem.substr(i, 1) === setEnd) {
                return [openingLocation, i];
            }
        }
    }
    return null;
};
var ProcessPMDAS = function (expression) {
    // console.log(expression);
    var e_2, _a;
    var returnValue = ExecuteFunctions(expression);
    returnValue = ReplaceAll(' ', '', returnValue);
    var preOperators = __spread(EvaluatorOperators, ['(']);
    var postOperators = __spread(EvaluatorOperators, [')']);
    var innerSet = FindInnerSetLocations(returnValue, '(', ')');
    while (!!innerSet) {
        var newExpression = returnValue.substr(0, innerSet[0]);
        if (newExpression.length > 0 &&
            preOperators.indexOf(newExpression.substr(-1, 1)) === -1 &&
            preOperators.indexOf(newExpression.substr(-2, 2)) === -1) {
            newExpression = newExpression.concat('*');
        }
        newExpression = newExpression.concat(ProcessPMDAS(returnValue.substr(innerSet[0] + 1, innerSet[1] - innerSet[0] - 1)));
        var lastSegment = returnValue.substr(innerSet[1] + 1, returnValue.length - innerSet[1]);
        if (lastSegment.length > 0 &&
            postOperators.indexOf(lastSegment.substr(0, 1)) === -1 &&
            postOperators.indexOf(lastSegment.substr(0, 2)) === -1) {
            newExpression = newExpression.concat('*');
        }
        returnValue = newExpression.concat(lastSegment);
        innerSet = FindInnerSetLocations(returnValue, '(', ')');
    }
    try {
        for (var EvaluatorOperators_1 = __values(EvaluatorOperators), EvaluatorOperators_1_1 = EvaluatorOperators_1.next(); !EvaluatorOperators_1_1.done; EvaluatorOperators_1_1 = EvaluatorOperators_1.next()) {
            var operator = EvaluatorOperators_1_1.value;
            var processOperator = operator;
            var nextOperator = operator;
            var items = returnValue.split(operator);
            if (items.length > 1) {
                if (operator === '-' && EvaluatorOperators.indexOf(items[0].substr(-1)) > -1) {
                    processOperator = items[0].substr(-1);
                    items[0] = items[0].substr(0, items[0].length - 1);
                    items[1] = '-' + items[1];
                }
                var result = ProcessPMDAS(items[0]);
                for (var itempos = 1; itempos < items.length; itempos++) {
                    nextOperator = operator;
                    if (operator === '-' && EvaluatorOperators.indexOf(items[itempos].substr(-1)) > -1) {
                        nextOperator = items[itempos].substr(-1);
                        items[itempos] = items[itempos].substr(0, items[itempos].length - 1);
                        items[itempos + 1] = '-' + items[itempos + 1];
                    }
                    var itemposValue = ProcessPMDAS(items[itempos]);
                    var floatResult = parseFloat(result);
                    var floatItemPosValue = parseFloat(itemposValue);
                    var bothNumeric = !isNaN(floatResult) && !isNaN(floatItemPosValue);
                    switch (processOperator) {
                        case '^':
                            if (bothNumeric) {
                                result = Math.pow(floatResult, floatItemPosValue).toString();
                            }
                            else {
                                result = itemposValue;
                            }
                            break;
                        case '*':
                            if (bothNumeric) {
                                result = (floatResult * floatItemPosValue).toString();
                            }
                            else {
                                result = itemposValue;
                            }
                            break;
                        case '/':
                            if (bothNumeric) {
                                if (floatItemPosValue === 0) {
                                    result = '0';
                                }
                                else {
                                    result = (floatResult / floatItemPosValue).toString();
                                }
                            }
                            break;
                        case '+':
                            if (bothNumeric) {
                                result = (floatResult + floatItemPosValue).toString();
                            }
                            else {
                                result = itemposValue;
                            }
                            break;
                        case '-':
                            if (bothNumeric) {
                                result = (floatResult - floatItemPosValue).toString();
                            }
                            else {
                                result = "-" + itemposValue;
                            }
                            break;
                        case '<=':
                            if (bothNumeric) {
                                result = floatResult <= floatItemPosValue ? '1' : '0';
                            }
                            else {
                                result = result <= itemposValue ? '1' : '0';
                            }
                            break;
                        case '>=':
                            if (bothNumeric) {
                                result = floatResult >= floatItemPosValue ? '1' : '0';
                            }
                            else {
                                result = result >= itemposValue ? '1' : '0';
                            }
                            break;
                        case '<':
                            if (bothNumeric) {
                                result = floatResult < floatItemPosValue ? '1' : '0';
                            }
                            else {
                                result = result < itemposValue ? '1' : '0';
                            }
                            break;
                        case '>':
                            if (bothNumeric) {
                                result = floatResult > floatItemPosValue ? '1' : '0';
                            }
                            else {
                                result = result > itemposValue ? '1' : '0';
                            }
                            break;
                        case '=':
                            result = result === itemposValue ? '1' : '0';
                            break;
                        case '!=':
                            result = result !== itemposValue ? '1' : '0';
                            break;
                        case '||':
                            result = result || itemposValue;
                            break;
                        case '&&':
                            result = result && itemposValue;
                            break;
                        default:
                            result = itemposValue;
                    }
                    processOperator = nextOperator;
                }
                // result = ExecuteFunctions(result);
                return result;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (EvaluatorOperators_1_1 && !EvaluatorOperators_1_1.done && (_a = EvaluatorOperators_1.return)) _a.call(EvaluatorOperators_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    // returnValue = ExecuteFunctions(returnValue);
    return returnValue;
};
var FindFunction = function (expression, startPosition) {
    var e_3, _a;
    if (!expression)
        return null;
    try {
        for (var EvaluatorFunctions_1 = __values(EvaluatorFunctions), EvaluatorFunctions_1_1 = EvaluatorFunctions_1.next(); !EvaluatorFunctions_1_1.done; EvaluatorFunctions_1_1 = EvaluatorFunctions_1.next()) {
            var evaluatorFunction = EvaluatorFunctions_1_1.value;
            var pos = ('' + expression.toLowerCase()).indexOf(evaluatorFunction + '(', startPosition);
            if (pos >= 0) {
                var postFunctionName = expression.substr(pos + evaluatorFunction.length).toLowerCase();
                var parens = FindInnerSetLocations(postFunctionName, '(', ')');
                if (!!parens) {
                    var argumentText = postFunctionName.substr(1, parens[1] - 1);
                    return {
                        expression: expression,
                        pos: pos,
                        pre: expression.substr(0, pos).trim(),
                        post: postFunctionName.substr(parens[1] + 1).trim(),
                        function: evaluatorFunction,
                        argumentText: argumentText,
                        arguments: argumentText.split(',').map(function (arg) { return arg.trim(); })
                    };
                }
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (EvaluatorFunctions_1_1 && !EvaluatorFunctions_1_1.done && (_a = EvaluatorFunctions_1.return)) _a.call(EvaluatorFunctions_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return null;
};
var ExecuteFunction = function (foundFunction) {
    var _a, _b;
    var arg1 = parseFloat(EvaluateString("[" + ((_a = foundFunction.arguments[0]) !== null && _a !== void 0 ? _a : '0') + "]"));
    var arg2 = parseFloat(EvaluateString("[" + ((_b = foundFunction.arguments[1]) !== null && _b !== void 0 ? _b : '0') + "]"));
    switch (foundFunction.function) {
        case 'abs':
            if (!isNaN(arg1)) {
                return Math.abs(arg1).toString();
            }
            break;
        case 'pow':
            if (!isNaN(arg1) && !isNaN(arg2)) {
                return Math.pow(arg1, arg2).toString();
            }
            break;
        case 'int':
            if (!isNaN(arg1)) {
                return parseInt(foundFunction.arguments[0]).toString();
            }
            break;
        case 'round':
            if (!isNaN(arg1) && !isNaN(arg2)) {
                var factor = Math.pow(10, arg2);
                var tempNumber = arg1 * factor;
                var roundedTempNumber = Math.round(tempNumber);
                return (roundedTempNumber / factor).toString();
            }
            break;
        case 'includes':
            var index = 1;
            var arrayValues = [];
            // get array values from the 2nd argument and so on...
            while (foundFunction.arguments[index] !== undefined) {
                arrayValues.push(foundFunction.arguments[index]);
                index++;
            }
            return arrayValues.join(',').includes(foundFunction.arguments[0]) ? '1' : '0';
        case 'includesinarray':
            var key = 1;
            var arrValues = [];
            // get array values from the 2nd argument and so on...
            while (foundFunction.arguments[key] !== undefined) {
                arrValues.push(foundFunction.arguments[key]);
                key++;
            }
            return arrValues.includes(foundFunction.arguments[0]) ? '1' : '0';
    }
    return '';
};
var ExecuteFunctions = function (expression) {
    var updatedExpression = expression;
    var foundFunction = FindFunction(updatedExpression, 0);
    while (!!foundFunction) {
        updatedExpression = foundFunction.pre + ExecuteFunction(foundFunction) + foundFunction.post;
        foundFunction = FindFunction(updatedExpression, 0);
    }
    return updatedExpression;
};

var enumObject = function (e) {
    var copy = __assign({}, e);
    Object.values(e).forEach(function (value) { return typeof value === 'number' && delete copy[value]; });
    return copy;
};
var EnumKeys = function (e) {
    return Object.keys(enumObject(e));
};
var EnumValues = function (e) {
    return __spread((new Set(Object.values(enumObject(e)))));
};
var EnumKeyFromValue = function (e, value) {
    return (value === null || value === undefined) ? undefined : Object.keys(e)[Object.values(e).indexOf(value)];
};
var EnumValueFromKey = function (e, key) {
    return (key === null || key === undefined) ? undefined : Object.values(e)[Object.keys(e).indexOf(key)];
};

exports.ICS = void 0;
(function (ICS) {
    ICS.Header = function (filenameNoExtension) {
        if (filenameNoExtension === void 0) { filenameNoExtension = 'calendar'; }
        return ({
            'Content-Type': 'text/Calendar',
            'Content-Disposition': "inline; filename=" + filenameNoExtension + ".ics"
        });
    };
    ICS.VCALENDAROpen_Text = 'BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n';
    ICS.VCALENDARClose_Text = 'END:VCALENDAR\n';
    var ICSDateFormat = function (date, timezone) { var _a; return !date ? '' : "TZID=" + (timezone !== null && timezone !== void 0 ? timezone : 'America/New_York') + ":" + ((_a = YYYYMMDDHHmmss(DateParseTS(date))) !== null && _a !== void 0 ? _a : ''); };
    var EscapeText = function (text) { return ReplaceAll('\r\n', '\\n', ReplaceAll('\n', '\\n', ReplaceAll('\r', '\\n', ReplaceAll(',', '\\,', ReplaceAll(';', '\\;', ReplaceAll('\\', '\\\\', text)))))); };
    ICS.VEVENT_Text = function (event) {
        var _a, _b;
        var event_text = '';
        event_text += 'BEGIN:VEVENT\n';
        event_text += 'CLASS:PUBLIC\n';
        event_text += 'CREATED;' + ICSDateFormat((_a = event.dateTimeCreated) !== null && _a !== void 0 ? _a : new Date().toISOString()) + '\n';
        event_text += 'DESCRIPTION:' + EscapeText(event.description) + '\n';
        event_text += 'DTSTART;' + ICSDateFormat(event.dateTimeStart) + '\n';
        if (!!event.durationMinutes) {
            event_text += 'DURATION:PT' + event.durationMinutes + 'M\n';
        }
        else if (!!event.dateTimeEnd) {
            event_text += 'DTEND;' + ICSDateFormat(event.dateTimeEnd) + '\n';
        }
        event_text += 'DTSTAMP;' + ICSDateFormat(new Date().toISOString()) + '\n';
        if (!!event.organizerName && !!event.organizerEmail) {
            event_text += "ORGANIZER;CN=" + event.organizerName + ":MAILTO:" + event.organizerEmail + "\n";
        }
        event_text += 'LAST-MODIFIED;' + ICSDateFormat((_b = event.dateTimeModified) !== null && _b !== void 0 ? _b : new Date().toISOString()) + '\n';
        if (!!event.location) {
            if (!!event.location_altrep) {
                event_text += "LOCATION;ALTREP=\"" + EscapeText(event.location_altrep) + "\":" + EscapeText(event.location) + '\n';
            }
            else {
                event_text += 'LOCATION:' + EscapeText(event.location) + '\n';
            }
        }
        if (!!event.priority) {
            event_text += "PRIORITY:" + event.priority + "\n";
        }
        event_text += 'SEQUENCE:0\n';
        //		event += "SUMMARY;LANGUAGE=en-us:" + subject + "\n"
        event_text += 'SUMMARY:' + EscapeText(event.subject) + '\n';
        event_text += 'TRANSP:OPAQUE\n';
        event_text += 'UID:' + event.UID + '\n';
        if (event.alarmTriggerMinutes !== undefined) {
            event_text += 'BEGIN:VALARM\n';
            event_text += "TRIGGER:-PT" + event.alarmTriggerMinutes + "M\n";
            event_text += 'ACTION:DISPLAY\n';
            event_text += 'DESCRIPTION:Reminder\n';
            event_text += 'END:VALARM\n';
        }
        event_text += 'END:VEVENT\n';
        return event_text;
    };
    ICS.ICS_Text = function (event) { return ICS.VCALENDAROpen_Text + ICS.VEVENT_Text(event) + ICS.VCALENDARClose_Text; };
})(exports.ICS || (exports.ICS = {}));

var ConstrainType = function (value, fieldConstraint) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if ((fieldConstraint.nullIfFalsey && !value) || value === null || value === undefined) {
        if (fieldConstraint.nullable || fieldConstraint.nullIfFalsey) {
            return null;
        }
        else {
            return fieldConstraint.type === 'date' ? DateOnly((_a = fieldConstraint.default) !== null && _a !== void 0 ? _a : 'now') :
                fieldConstraint.type === 'datetime' ? DateISO((_b = fieldConstraint.default) !== null && _b !== void 0 ? _b : 'now') :
                    fieldConstraint.type === 'time' ? TimeOnly((_c = fieldConstraint.default) !== null && _c !== void 0 ? _c : 'now') :
                        fieldConstraint.type === 'number' ? CleanNumber(fieldConstraint.default) :
                            fieldConstraint.type === 'boolean' ? IsOn((_d = fieldConstraint.default) !== null && _d !== void 0 ? _d : true) :
                                fieldConstraint.type === 'object' ? ((_e = fieldConstraint.default) !== null && _e !== void 0 ? _e : {}) :
                                    ((_f = fieldConstraint.default) !== null && _f !== void 0 ? _f : '').toString();
        }
    }
    if (fieldConstraint.type === 'boolean') {
        if (typeof value !== 'boolean')
            return IsOn(value);
    }
    else if (fieldConstraint.type === 'number') {
        if (typeof value !== 'number')
            return fieldConstraint.nullable ? CleanNumberNull(value) : CleanNumber(value);
    }
    else if (fieldConstraint.type === 'date') {
        return fieldConstraint.nullable ? DateOnlyNull(value) : DateOnly(value);
    }
    else if (fieldConstraint.type === 'datetime') {
        return fieldConstraint.nullable ? DateISO(value) : ((_g = DateISO(value)) !== null && _g !== void 0 ? _g : NowISOString());
    }
    else if (fieldConstraint.type === 'time') {
        return fieldConstraint.nullable ? TimeOnly(value) : ((_h = TimeOnly(value)) !== null && _h !== void 0 ? _h : '00:00');
    }
    else if (fieldConstraint.type === 'object') {
        if (typeof value !== 'object')
            return {};
    }
    else {
        if (typeof value !== 'string')
            return !value ? '' : value.toString();
    }
    return value;
};
var ConstrainOthers = function (value, fieldConstraint) {
    var newValue = value;
    if (fieldConstraint.length && value) {
        switch (typeof value) {
            case 'string':
                newValue = value.substring(0, fieldConstraint.length);
                break;
            case 'number':
                if (value.toString().length > fieldConstraint.length) {
                    throw new Error("Value " + value + " longer than " + ToDigits(fieldConstraint.length));
                }
        }
    }
    if (!fieldConstraint.nullable || value) {
        if (fieldConstraint.values) {
            if (!fieldConstraint.values.includes(value))
                return null;
        }
        if (fieldConstraint.minValue !== undefined && fieldConstraint.minValue > value)
            return fieldConstraint.minValue;
        if (fieldConstraint.maxValue !== undefined && fieldConstraint.maxValue < value)
            return fieldConstraint.maxValue;
    }
    return newValue;
};
/**
 * Takes an object and returns an object that matches the types provided by the constraint
 *
 * @param obj
 * @param constraint
 * @constructor
 */
var ConstrainObject = function (obj, constraint) {
    var e_1, _a;
    var newObj = obj;
    var _loop_1 = function (key) {
        var fieldConstraint = constraint[key];
        if (fieldConstraint) {
            if (fieldConstraint.isArray) {
                newObj[key] = ToArray(newObj[key])
                    .map(function (value) { return ConstrainType(value, fieldConstraint); })
                    .filter(function (value) { return fieldConstraint.arrayAllowFalsey || !!value; })
                    .map(function (value) { return ConstrainOthers(value, fieldConstraint); })
                    .filter(function (value) { return fieldConstraint.arrayAllowFalsey || !!value; });
            }
            else {
                newObj[key] = ConstrainOthers(ConstrainType(newObj[key], fieldConstraint), fieldConstraint);
            }
            if (fieldConstraint.nullable && !newObj[key]) {
                newObj[key] = null;
            }
        }
    };
    try {
        for (var _b = __values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            _loop_1(key);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return newObj;
};
/**
 * Converts FormData to an object... Recommend using "constraint" option
 *
 * @param formData
 * @param options
 * @constructor
 */
var ObjectFromFormData = function (formData, options) {
    var e_2, _a;
    var _b, _c, _d, _e;
    var returnObject = {};
    if (options === null || options === void 0 ? void 0 : options.default) {
        try {
            for (var _f = __values(Object.keys(options.default).filter(function (key) {
                var _a, _b;
                if ((_a = options.includeColumns) === null || _a === void 0 ? void 0 : _a.includes(key))
                    return true;
                return !options.includeColumns && !((_b = options.excludeColumns) === null || _b === void 0 ? void 0 : _b.includes(key));
            })), _g = _f.next(); !_g.done; _g = _f.next()) {
                var key = _g.value;
                var data = (Array.isArray(options.default[key]) || ((_b = options.arrayFormDataItems) === null || _b === void 0 ? void 0 : _b.includes(key)))
                    ? (_d = (_c = formData.getAll(key)) !== null && _c !== void 0 ? _c : options === null || options === void 0 ? void 0 : options.default[key]) !== null && _d !== void 0 ? _d : null : formData.get(key);
                if (data !== undefined && typeof options.default[key] === 'boolean')
                    data = IsOn(data);
                if (data !== undefined && typeof options.default[key] === 'number')
                    data = CleanNumber(data);
                returnObject[key] = (_e = data !== null && data !== void 0 ? data : options === null || options === void 0 ? void 0 : options.default[key]) !== null && _e !== void 0 ? _e : null;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    else {
        formData.forEach(function (value, key) {
            var all = formData.getAll(key);
            if (Array.isArray(all) && all.length > 1) {
                returnObject[key] = all;
            }
            else {
                returnObject[key] = value;
            }
        });
    }
    if (options === null || options === void 0 ? void 0 : options.constraint) {
        returnObject = ConstrainObject(returnObject, options.constraint);
    }
    return returnObject;
};

exports.Stages = void 0;
(function (Stages) {
    Stages["Local"] = "local";
    Stages["Migrate"] = "migrate";
    Stages["Dev"] = "dev";
    Stages["Test"] = "test";
    Stages["QA"] = "qa";
    Stages["Demo"] = "demo";
    Stages["ProdSupport"] = "prodsupport";
    Stages["Prod"] = "prod";
})(exports.Stages || (exports.Stages = {}));
/**
 * Determines whether the app in a particular stage.
 *
 * @example
 * // If the app is in 'local', it returns true
 * IsStage('local')
 */
var IsStage = function (stages) {
    var envs;
    if (typeof stages === 'string') {
        envs = [stages];
    }
    else {
        envs = stages;
    }
    return !!envs.find(function (env) { return GetStage() === env; });
};
/**
 */
var GetStage = function () {
    var _a, _b, _c;
    return ((_c = (_b = (_a = process.env.REACT_APP_STAGE) !== null && _a !== void 0 ? _a : process.env.STAGE) !== null && _b !== void 0 ? _b : process.env.VITE_APP_STAGE) !== null && _c !== void 0 ? _c : exports.Stages.Local);
};
/**
 * Returns the full name of the stage.
 * @example
 * // return Development
 * GetStageName('dev')
 */
var GetStageName = function (stage) {
    var _a;
    var workingStage = stage !== null && stage !== void 0 ? stage : GetStage();
    switch (workingStage) {
        case exports.Stages.Dev:
            return 'Development';
        case exports.Stages.QA:
            return 'QA';
        case exports.Stages.ProdSupport:
            return 'Production Support';
        case exports.Stages.Prod:
            return 'Production';
        default:
            return (_a = UCWords(workingStage)) !== null && _a !== void 0 ? _a : 'Local';
    }
};
/**
 * Determines whether the stage is one of the following: local, migrate, dev, qa
 */
var IsStageDevFocused = function () {
    return IsStage([exports.Stages.Local, exports.Stages.Migrate, exports.Stages.Dev, exports.Stages.QA]);
};
/**
 * Determines whether the stage is one of the following: qa, test
 */
var IsStageTestFocused = function () {
    return IsStage([exports.Stages.QA, exports.Stages.Test]);
};
/**
 * Determines whether the stage is one of the following: local, migrate, dev, qa, test
 */
var IsStageDevTestFocused = function () {
    return IsStageDevFocused() || IsStageTestFocused();
};

/**
 * Returns an array of numbers to be used for pagination links.
 *
 * @example
 * // returns [1, 2, 3, null, 10]
 * PagesForRange(1, 10)
 *
 * // returns [1, null, 7, 8, 9, 10]
 * PagesForRange(9, 10)
 *
 * // returns [1, 2, 3, 4, null, 10]
 * PagesForRange(1, 10, 3)
 */
function PagesForRange(current, length, spread) {
    var e_1, _a;
    if (spread === void 0) { spread = 2; }
    if (!(+length > 0)) {
        return [];
    }
    var current_adjusted = +current < 1 ? 1 : +current > +length ? +length : +current;
    var spread_adjusted = +current < +spread || +current > +length - +spread ? +spread : Math.ceil(+spread / 2);
    var left = +current_adjusted - +spread_adjusted, right = +current_adjusted + +spread_adjusted, range = [], rangeWithNull = [], l;
    for (var i = 1; i <= +length; i++) {
        if (i === 1 || i === +length || (i >= left && i <= right)) {
            range.push(i);
        }
    }
    try {
        for (var range_1 = __values(range), range_1_1 = range_1.next(); !range_1_1.done; range_1_1 = range_1.next()) {
            var i = range_1_1.value;
            if (l) {
                if (i - l === 2) {
                    rangeWithNull.push(l + 1);
                }
                else if (i - l !== 1) {
                    rangeWithNull.push(null);
                }
            }
            rangeWithNull.push(i);
            l = i;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (range_1_1 && !range_1_1.done && (_a = range_1.return)) _a.call(range_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return rangeWithNull;
}
/**
 * Omit<ISortColumn, 'primarySort'>
 */
var initialSortColumn = {
    primaryAscending: true,
    primaryEmptyToBottom: null,
    secondarySort: null,
    secondaryAscending: true,
    secondaryEmptyToBottom: null
};
/**
 * Converts Find Is Active type to a string
 * @param findIsActive
 * @constructor
 */
var FindIsActiveString = function (findIsActive) {
    switch (findIsActive) {
        case true:
            return 'true';
        case false:
            return 'false';
        default:
            return 'null';
    }
};
/**
 * Converts string to Find Is Active type
 * @param findIsActiveString
 * @constructor
 */
var StringFindIsActive = function (findIsActiveString) {
    switch (findIsActiveString) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return null;
    }
};
var initialFilterSortPaginator = {
    page: 1,
    countPerPage: 50,
    search: '',
    sortColumns: __assign(__assign({}, initialSortColumn), { primarySort: '' }),
    active: true,
    filterValues: {}
};
/**
 * Updates the primary sort key of a sort column object, and returns the updated object.
 *
 * @example
 * // returns the updated object:
 * {
 *   primarySort: 'name',
 *   primaryAscending: true,
 *   primaryEmptyToBottom: null,
 *   secondarySort: '',
 *   secondaryAscending: true,
 *   secondaryEmptyToBottom: null
 * }
 * SortColumnUpdate('name', initialSortColumn)
 */
var SortColumnUpdate = function (columnToSort, sortColumn, firstClickAscending, emptyToBottom) {
    if (firstClickAscending === void 0) { firstClickAscending = true; }
    if (emptyToBottom === void 0) { emptyToBottom = null; }
    if (sortColumn.primarySort === columnToSort) {
        return __assign(__assign({}, sortColumn), { primaryAscending: !sortColumn.primaryAscending, primaryEmptyToBottom: emptyToBottom });
    }
    else {
        return {
            primarySort: columnToSort,
            primaryAscending: firstClickAscending,
            primaryEmptyToBottom: emptyToBottom,
            secondarySort: sortColumn.primarySort,
            secondaryAscending: sortColumn.primaryAscending,
            secondaryEmptyToBottom: sortColumn.primaryEmptyToBottom
        };
    }
};
/**
 * Accepts an array of data and a sort column object, and returns the sorted array of data.
 *
 * @example
 * const sortColumn = SortColumnUpdate('name', initialSortColumn)
 * const data = [
 *   {id: 1, name: 'brad', age: 24},
 *   {id: 2, name: 'sally', age: 32},
 *   {id: 3, name: 'abby', age: 28}
 * ]
 *
 * // returns
 * [
 *   {id: 3, name: 'abby', age: 28}
 *   {id: 1, name: 'brad', age: 24},
 *   {id: 2, name: 'sally', age: 32},
 * ]
 * SortColumns(data, sortColumn)
 */
var SortColumns = function (arrayTable, sortColumn) {
    return arrayTable.sort(function (a, b) {
        var _a, _b, _c, _d, _e;
        return !sortColumn.primarySort
            ? 0
            : (_c = SortColumnResult((_a = a[sortColumn.primarySort]) !== null && _a !== void 0 ? _a : null, (_b = b[sortColumn.primarySort]) !== null && _b !== void 0 ? _b : null, sortColumn.primaryAscending, sortColumn.primaryEmptyToBottom)) !== null && _c !== void 0 ? _c : (!sortColumn.secondarySort
                ? 0
                : SortColumnResult((_d = a[sortColumn.secondarySort]) !== null && _d !== void 0 ? _d : null, (_e = b[sortColumn.secondarySort]) !== null && _e !== void 0 ? _e : null, sortColumn.secondaryAscending, sortColumn.secondaryEmptyToBottom));
    });
};
var isEmpty = function (val) { return val === null || val === undefined || val === ''; };
var SortIndexNull = function (beforeValue, afterValue, indexes, emptyTo) {
    if (emptyTo === void 0) { emptyTo = 'Top'; }
    if ((beforeValue !== null && beforeValue !== void 0 ? beforeValue : null) === (afterValue !== null && afterValue !== void 0 ? afterValue : null)) {
        return null;
    }
    if (!afterValue) {
        return emptyTo === 'Top' ? -1 : 1;
    }
    if (!beforeValue) {
        return emptyTo === 'Top' ? 1 : -1;
    }
    return indexes.indexOf(beforeValue) - indexes.indexOf(afterValue);
};
var SortIndex = function (beforeValue, afterValue, indexes, emptyTo) {
    var _a;
    if (emptyTo === void 0) { emptyTo = 'Top'; }
    return (_a = SortIndexNull(beforeValue, afterValue, indexes, emptyTo)) !== null && _a !== void 0 ? _a : 0;
};
/**
 * Returns a case-insensitive sort number of the .sort(a, b) function, or null if values are equal.  Handles booleans (false comes BEFORE true), numbers (including currency and percentages), and case-insensitive strings.
 *
 * @example
 * [
        {id: 1, name: 'AAA', prioritized: false},
        {id: 2, name: 'ZZZ', prioritized: false},
        {id: 3, name: 'CCC', prioritized: true},
        {id: 4, name: 'BBB', prioritized: false}
    ]
 .sort((a, b) =>
        SortCompareNull(b.prioritized, a.prioritized)
        ?? SortCompare(a.name, b.name)) = [
        { id: 3, name: 'CCC', prioritized: true },
        { id: 1, name: 'AAA', prioritized: false },
        { id: 4, name: 'BBB', prioritized: false },
        { id: 2, name: 'ZZZ', prioritized: false }
    ]
 */
var SortCompareNull = function (beforeValue, afterValue, emptyTo) {
    if (emptyTo === void 0) { emptyTo = null; }
    if (beforeValue === afterValue) {
        return null;
    }
    if (!!emptyTo) {
        if (emptyTo.endsWith('0')) {
            if (!beforeValue && !!afterValue) {
                if (typeof afterValue === 'boolean')
                    return emptyTo === 'Top0' ? 1 : -1;
                return emptyTo === 'Top0' ? -1 : 1;
            }
            if (!afterValue && !!beforeValue) {
                if (typeof beforeValue === 'boolean')
                    return emptyTo === 'Top0' ? -1 : 1;
                return emptyTo === 'Top0' ? 1 : -1;
            }
        }
        else {
            if (isEmpty(beforeValue) && !isEmpty(afterValue)) {
                if (typeof afterValue === 'boolean')
                    return emptyTo === 'Top' ? 1 : -1;
                return emptyTo === 'Top' ? -1 : 1;
            }
            if (isEmpty(afterValue) && !isEmpty(beforeValue)) {
                if (typeof beforeValue === 'boolean')
                    return emptyTo === 'Top' ? -1 : 1;
                return emptyTo === 'Top' ? 1 : -1;
            }
        }
    }
    if (typeof beforeValue === 'boolean' && typeof afterValue === 'boolean') {
        return (beforeValue ? 1 : 0) - (afterValue ? 1 : 0);
    }
    var beforeNumber = CleanNumber(beforeValue, undefined, true);
    var afterNumber = CleanNumber(afterValue, undefined, true);
    if (!isNaN(beforeNumber) && !isNaN(afterNumber)) {
        return beforeNumber - afterNumber;
    }
    return ((beforeValue !== null && beforeValue !== void 0 ? beforeValue : '').toString()).localeCompare((afterValue !== null && afterValue !== void 0 ? afterValue : '').toString(), undefined, { sensitivity: 'base' });
};
/**
 * Returns a case-insensitive sort number of the .sort(a, b) function, or null if values are equal.  Handles booleans, numbers (including currency and percentages), and case-insensitive strings.
 *
 * @example
 * [
        {id: 1, name: 'AAA', prioritized: false},
        {id: 2, name: 'ZZZ', prioritized: false},
        {id: 3, name: 'CCC', prioritized: true},
        {id: 4, name: 'BBB', prioritized: false}
    ]
 .sort((a, b) =>
        SortCompare(a.name, b.name)) = [
        { id: 1, name: 'AAA', prioritized: false },
        { id: 4, name: 'BBB', prioritized: false },
        { id: 3, name: 'CCC', prioritized: true },
        { id: 2, name: 'ZZZ', prioritized: false }
    ]
 */
var SortCompare = function (beforeValue, afterValue, emptyTo) {
    var _a;
    if (emptyTo === void 0) { emptyTo = null; }
    return (_a = SortCompareNull(beforeValue, afterValue, emptyTo)) !== null && _a !== void 0 ? _a : 0;
};
/**
 * Sorts the provided array with a "sort_order" column and re-defines the increments
 *
 * @param items
 * @param sortIncrement
 * @constructor
 */
var ReSortOrder = function (items, sortIncrement) {
    if (sortIncrement === void 0) { sortIncrement = 10; }
    var newSort = 0;
    return items.sort(function (a, b) { return SortCompare(a.sort_order, b.sort_order); }).map(function (item) { return (__assign(__assign({}, item), { sort_order: newSort += sortIncrement })); }, []);
};
/**
 * Returns the sort value comparing the before and after as it relates to the order of the array.
 *
 * @example
 * [
        {id: 1, name: 'One'},
        {id: 2, name: 'Two'},
        {id: 3, name: 'Three'},
        {id: 4, name: 'Four'},
        {id: 5, name: 'Five'}
    ]
 .sort((a, b) =>
        SortPerArray(a.id, b.id, [4, 5, 3, 2, 1])) = [
        {id: 4, name: 'Four'},
        {id: 5, name: 'Five'},
        {id: 3, name: 'Three'},
        {id: 2, name: 'Two'},
        {id: 1, name: 'One'}
]
 */
var SortPerArray = function (beforeValue, afterValue, order, emptyTo) {
    if (emptyTo === void 0) { emptyTo = 'Top'; }
    if (order.indexOf(beforeValue) < 0) {
        if (order.indexOf(afterValue) < 0) {
            return SortCompare(beforeValue, afterValue);
        }
        else {
            return emptyTo === 'Top' ? -1 : 1;
        }
    }
    else {
        if (order.indexOf(afterValue) < 0) {
            return emptyTo === 'Top' ? 1 : -1;
        }
    }
    if (isEmpty(beforeValue)) {
        if (isEmpty(afterValue)) {
            return 0;
        }
        else {
            return emptyTo === 'Top' ? -1 : 1;
        }
    }
    else {
        if (isEmpty(afterValue)) {
            return emptyTo === 'Top' ? 1 : -1;
        }
        else {
            if (beforeValue === afterValue)
                return 0;
            return order.indexOf(beforeValue) - order.indexOf(afterValue);
        }
    }
};
var SortColumnResult = function (valueA, valueB, isAscending, emptyToBottom) { return SortCompare(isAscending ? valueA : valueB, isAscending ? valueB : valueA, !!emptyToBottom ? isAscending ? 'Bottom0' : 'Top0' : undefined); };
// {
// 	if (!!emptyToBottom) {
// 		if (!valueA && !!valueB) return 1
// 		if (!!valueA && !valueB) return -1
// 	}
//
// 	const numbA = CleanNumber(valueA)
// 	const numbB = CleanNumber(valueB)
//
// 	if (isNaN(numbA ?? 0) || isNaN(numbB ?? 0)) {
// 		return (valueA ?? '').localeCompare(valueB ?? '', undefined, {sensitivity: 'base'}) * (isAscending ? 1 : -1)
// 	}
//
// 	return (numbA - numbB) * (isAscending ? 1 : -1)
// }
/**
 * Converts each word of a string to an array element for searching.
 *
 * @example
 * // returns ['john', 'doe', 'johndoe@mail.com']
 * SearchTerms('john doe johndoe@mail.com')
 */
var SearchTerms = function (search, toLowerCase) {
    if (toLowerCase === void 0) { toLowerCase = true; }
    return (search !== null && search !== void 0 ? search : '')
        .trim()
        .split(/(\s+)/)
        .map(function (term) { return (toLowerCase ? term.trim().toLowerCase() : term.trim()); })
        .filter(function (term) { return !!term; });
};
/**
 * Converts multiple elements into a single string
 *
 * @example
 * TermsToSearch(['One ', null, 'Two '])
 * // returns 'One Two'
 */
var TermsToSearch = function (terms, spacer, toLowerCase) {
    if (spacer === void 0) { spacer = ' '; }
    if (toLowerCase === void 0) { toLowerCase = true; }
    if (!terms)
        return '';
    var search;
    if (!Array.isArray(terms)) {
        search = terms.trim();
    }
    else {
        search = terms
            .map(function (term) { return (term !== null && term !== void 0 ? term : '').trim(); })
            .filter(function (item) { return !!item; })
            .join(spacer)
            .trim();
    }
    if (toLowerCase)
        return search.toLowerCase();
    return search;
};
/**
 * Determines whether a string contains search terms.
 *
 * @example
 * // returns true
 * StringContainsSearchTerms('user age', ['user', 'age'])
 */
var StringContainsSearchTerms = function (value, searchTerms) {
    if (searchTerms.length === 0)
        return true;
    if (!value)
        return false;
    return searchTerms.every(function (term) { return value.includes(term); });
};
/**
 * Determines whether a string contains search string.
 *
 * @example
 * // return true
 * StringContainsSearch('user age', 'user')
 *
 * // return false
 * StringContainsSearch('user age', 'address')
 */
var StringContainsSearch = function (value, search) {
    if (!search)
        return true;
    if (!value)
        return false;
    var searchTerms = SearchTerms(search);
    return StringContainsSearchTerms(value, searchTerms);
};
/**
 * Determines whether an object contains search terms.
 *
 * @example
 * // returns true
 * ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['24'])
 *
 * // returns true
 * ObjectContainsSearchTerms({user: 'john doe', age: 24}, ['john'])
 */
var ObjectContainsSearchTerms = function (checkObject, searchTerms, options) {
    var _a;
    if (searchTerms.length === 0)
        return true;
    if (!checkObject)
        return false;
    if (typeof checkObject === 'object' && ((_a = checkObject.type) === null || _a === void 0 ? void 0 : _a.toString().includes('react.')))
        return false;
    var match = function (term) {
        return Object.keys(checkObject).some(function (column) {
            var e_2, _a;
            var columnValue = checkObject[column];
            var typeofColumn = typeof columnValue;
            if (!Array.isArray(columnValue) && ['number', 'bigint', 'string'].includes(typeofColumn)) {
                return columnValue.toString().toLowerCase().includes(term.toLowerCase());
            }
            if (Array.isArray(columnValue)) {
                try {
                    for (var columnValue_1 = __values(columnValue), columnValue_1_1 = columnValue_1.next(); !columnValue_1_1.done; columnValue_1_1 = columnValue_1.next()) {
                        var obj = columnValue_1_1.value;
                        if (ObjectContainsSearchTerms(obj, [term], options))
                            return true;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (columnValue_1_1 && !columnValue_1_1.done && (_a = columnValue_1.return)) _a.call(columnValue_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (typeofColumn === 'object') {
                return ObjectContainsSearchTerms(columnValue, [term], options);
            }
            return false;
        });
    };
    var useSearchTerms = searchTerms;
    if ((options === null || options === void 0 ? void 0 : options.matchUntilTerm) !== undefined) {
        if ((options === null || options === void 0 ? void 0 : options.matchFromTerm) !== undefined) {
            if (options.matchFromTerm < options.matchUntilTerm)
                throw new Error("Could not match terms from " + options.matchFromTerm + " to " + options.matchUntilTerm);
            if (options.matchFromTerm + 1 > searchTerms.length)
                return false;
            useSearchTerms = useSearchTerms.slice(options.matchFromTerm, options.matchUntilTerm + 1);
        }
        else {
            useSearchTerms = useSearchTerms.slice(0, options.matchUntilTerm + 1);
        }
    }
    else {
        if ((options === null || options === void 0 ? void 0 : options.matchFromTerm) !== undefined) {
            if (options.matchFromTerm + 1 > searchTerms.length)
                return false;
            useSearchTerms = useSearchTerms.slice(options.matchFromTerm);
        }
    }
    return (options === null || options === void 0 ? void 0 : options.matchSomeTerm) ? useSearchTerms.some(match) : useSearchTerms.every(match);
};
/**
 * Determines whether an object contains search string.
 *
 * @example
 * // returns true
 * ObjectContainsSearch({user: 'john doe', age: 24}, '24')
 *
 * // returns true
 * ObjectContainsSearch({user: 'john doe', age: 24}, 'john')
 */
var ObjectContainsSearch = function (object, search, options) {
    if (!search)
        return true;
    if (!object)
        return false;
    var searchTerms = SearchTerms(search);
    return ObjectContainsSearchTerms(object, searchTerms, options);
};
/**
 * Searches an array of objects with a given search string, and returns the list of objects that match.
 *
 * @example
 * let data = [{id: 1, user: 'john doe'}, {id: 2, user: 'john smith'}]
 *
 * // returns [{id: 1, user: 'john doe'}, {id: 2, user: 'john smith'}]
 * SearchRows(data, 'john')
 *
 * // returns [{id: 2, user: 'john smith'}]
 * SearchRows(data, 'smith')
 */
var SearchRows = function (arrayTable, search, options) {
    var searchTerms = SearchTerms(search);
    var limit = CleanNumber(options === null || options === void 0 ? void 0 : options.limit);
    if (searchTerms.length === 0 && !limit) {
        return arrayTable;
    }
    return !limit ?
        (arrayTable !== null && arrayTable !== void 0 ? arrayTable : []).filter(function (arrayRow) { return ObjectContainsSearchTerms(arrayRow, searchTerms, options); })
        : (arrayTable !== null && arrayTable !== void 0 ? arrayTable : []).reduce(function (results, arrayRow) {
            if (results.length >= limit)
                return results;
            if (!searchTerms.length || ObjectContainsSearchTerms(arrayRow, searchTerms, options)) {
                return __spread(results, [arrayRow]);
            }
            else {
                return results;
            }
        }, []);
};
/**
 * Determines whether a search item object contains value from the search string.
 *
 * @example
 * // returns true
 * SearchRow({user: 'john doe', age: '24'}, 'john 24')
 */
var SearchRow = function (searchItem, search, options) {
    var searchTerms = SearchTerms(search);
    if (searchTerms.length === 0) {
        return true;
    }
    return ObjectContainsSearchTerms(searchItem, searchTerms, options);
};
/**
 * Accepts an array of data, a search string, and a sort column object. Returns the
 * sorted search results array.
 *
 * @example
 * const sortColumn = SortColumnUpdate('name', initialSortColumn)
 * const data = [
 *   {id: 1, name: 'john smith', age: 24},
 *   {id: 2, name: 'sally jones', age: 32},
 *   {id: 3, name: 'john doe', age: 28}
 * ]
 *
 * // returns [{id: 3, name: 'john doe', age: 28}, {id: 1, name: 'john smith', age: 24}]
 * SearchSort(data, 'john', sortColumn)
 *
 * // returns [{id: 1, name: 'john smith', age: 24}]
 * SearchSort(data, 'john 24', sortColumn)
 */
var SearchSort = function (arrayTable, search, sortColumn, options) {
    return !!(options === null || options === void 0 ? void 0 : options.limit) ?
        SearchRows(SortColumns(arrayTable, sortColumn), search, options) :
        SortColumns(SearchRows(arrayTable, search, options), sortColumn);
};

var ToID = function (item) { return typeof item === 'number' ? item : item.id; };
exports.UnselectedIDList = void 0;
(function (UnselectedIDList) {
    UnselectedIDList.IsSelected = function (item, unselectedIDs) { return !unselectedIDs.includes(ToID(item)); };
    UnselectedIDList.SelectedIDs = function (items, unselectedIDs) { return items.reduce(function (result, cur) {
        var curID = ToID(cur);
        return (!unselectedIDs.find(function (id) { return id === curID; }) ? __spread(result, [curID]) : result);
    }, []); };
    UnselectedIDList.ToggleUnSelectedID = function (toggleID, unselectedIDs) { return unselectedIDs.includes(toggleID) ? unselectedIDs.filter(function (id) { return id !== toggleID; }) : __spread(unselectedIDs, [toggleID]); };
    UnselectedIDList.SelectIDs = function (ids, unselectedIDs) {
        return unselectedIDs.filter(function (unselectedID) { return !ids.find(function (id) { return unselectedID === ToID(id); }); });
    };
    UnselectedIDList.UnSelectIDs = function (ids, unselectedIDs) {
        return __spread(unselectedIDs, (ids.map(function (id) { return ToID(id); })));
    };
    UnselectedIDList.SelectedBetween = function (allIDs, lastID, nextID, unselectedIDs) {
        var e_1, _a;
        var allNumbers = allIDs.map(function (allID) { return ToID(allID); });
        var select = !UnselectedIDList.IsSelected(nextID, unselectedIDs);
        var betweenIDs = [];
        var firstFound = false;
        try {
            for (var allNumbers_1 = __values(allNumbers), allNumbers_1_1 = allNumbers_1.next(); !allNumbers_1_1.done; allNumbers_1_1 = allNumbers_1.next()) {
                var checkID = allNumbers_1_1.value;
                if (checkID === lastID || checkID === nextID) {
                    betweenIDs.push(checkID);
                    if (firstFound) {
                        break;
                    }
                    firstFound = true;
                }
                else if (firstFound) {
                    betweenIDs.push(checkID);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (allNumbers_1_1 && !allNumbers_1_1.done && (_a = allNumbers_1.return)) _a.call(allNumbers_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return select ? UnselectedIDList.SelectIDs(betweenIDs, unselectedIDs) : UnselectedIDList.UnSelectIDs(betweenIDs, unselectedIDs);
    };
})(exports.UnselectedIDList || (exports.UnselectedIDList = {}));
var SelectBetweenIDs = function (allIDs, lastID, nextID, inclusive) {
    var e_2, _a;
    if (inclusive === void 0) { inclusive = true; }
    var betweenIDs = [];
    var firstFound = false;
    try {
        for (var allIDs_1 = __values(allIDs), allIDs_1_1 = allIDs_1.next(); !allIDs_1_1.done; allIDs_1_1 = allIDs_1.next()) {
            var checkID = allIDs_1_1.value;
            if (checkID === lastID || checkID === nextID) {
                if (inclusive)
                    betweenIDs.push(checkID);
                if (firstFound) {
                    break;
                }
                firstFound = true;
            }
            else if (firstFound) {
                betweenIDs.push(checkID);
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (allIDs_1_1 && !allIDs_1_1.done && (_a = allIDs_1.return)) _a.call(allIDs_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return betweenIDs;
};

exports.AddChange = AddChange;
exports.AddIDChange = AddIDChange;
exports.AddIDChanges = AddIDChanges;
exports.AddS = AddS;
exports.AddressCopy = AddressCopy;
exports.AddressMultiRow = AddressMultiRow;
exports.AddressSingleRow = AddressSingleRow;
exports.AddressValid = AddressValid;
exports.ArrayRange = ArrayRange;
exports.ArrayToGuidString = ArrayToGuidString;
exports.ArrayWithIDChanges = ArrayWithIDChanges;
exports.AsteriskMatch = AsteriskMatch;
exports.AverageNumber = AverageNumber;
exports.AverageNumberNull = AverageNumberNull;
exports.BuildPath = BuildPath;
exports.ChangeArrayByIDOrUUID = ChangeArrayByIDOrUUID;
exports.ChangeValueChanges = ChangeValueChanges;
exports.CleanDivide = CleanDivide;
exports.CleanDivideNull = CleanDivideNull;
exports.CleanNumber = CleanNumber;
exports.CleanNumberNull = CleanNumberNull;
exports.CleanNumbers = CleanNumbers;
exports.CleanScripts = CleanScripts;
exports.CoalesceFalsey = CoalesceFalsey;
exports.ColorBrightnessHex = ColorBrightnessHex;
exports.ColorBrightnessRGB = ColorBrightnessRGB;
exports.CombineArrayWithIDOrUUIDChanges = CombineArrayWithIDOrUUIDChanges;
exports.ConsoleColor = ConsoleColor;
exports.ConstrainObject = ConstrainObject;
exports.CurrentTimeZone = CurrentTimeZone;
exports.DATE_FORMAT_DATE = DATE_FORMAT_DATE;
exports.DATE_FORMAT_DATE_DISPLAY = DATE_FORMAT_DATE_DISPLAY;
exports.DATE_FORMAT_DATE_DISPLAY_DOW = DATE_FORMAT_DATE_DISPLAY_DOW;
exports.DATE_FORMAT_DATE_DISPLAY_DOW_LONG = DATE_FORMAT_DATE_DISPLAY_DOW_LONG;
exports.DATE_FORMAT_DATE_DISPLAY_LONG = DATE_FORMAT_DATE_DISPLAY_LONG;
exports.DATE_FORMAT_DATE_TIME = DATE_FORMAT_DATE_TIME;
exports.DATE_FORMAT_DATE_TIME_DISPLAY = DATE_FORMAT_DATE_TIME_DISPLAY;
exports.DATE_FORMAT_DATE_TIME_DISPLAY_DOW = DATE_FORMAT_DATE_TIME_DISPLAY_DOW;
exports.DATE_FORMAT_DATE_TIME_DISPLAY_DOW_LONG = DATE_FORMAT_DATE_TIME_DISPLAY_DOW_LONG;
exports.DATE_FORMAT_DATE_TIME_DISPLAY_LONG = DATE_FORMAT_DATE_TIME_DISPLAY_LONG;
exports.DATE_FORMAT_TIME_DISPLAY = DATE_FORMAT_TIME_DISPLAY;
exports.DATE_FORMAT_TIME_NO_SECONDS = DATE_FORMAT_TIME_NO_SECONDS;
exports.DATE_FORMAT_TIME_SECONDS = DATE_FORMAT_TIME_SECONDS;
exports.DataToCSVExport = DataToCSVExport;
exports.DataToCSVExportNoQuotes = DataToCSVExportNoQuotes;
exports.DataToTabDelim = DataToTabDelim;
exports.DateAdjustTS = DateAdjustTS;
exports.DateCompare = DateCompare;
exports.DateComponent = DateComponent;
exports.DateDayOfWeek = DateDayOfWeek;
exports.DateDiff = DateDiff;
exports.DateDiffComponents = DateDiffComponents;
exports.DateDiffLongDescription = DateDiffLongDescription;
exports.DateDoWSundayZero = DateDoWSundayZero;
exports.DateFormat = DateFormat;
exports.DateFormatAny = DateFormatAny;
exports.DateFromWeekNumber = DateFromWeekNumber;
exports.DateICS = DateICS;
exports.DateISO = DateISO;
exports.DateIsWeekend = DateIsWeekend;
exports.DateMonth = DateMonth;
exports.DateObject = DateObject;
exports.DateOnly = DateOnly;
exports.DateOnlyNull = DateOnlyNull;
exports.DateParseTS = DateParseTS;
exports.DateQuarter = DateQuarter;
exports.DateWeekISONumber = DateWeekISONumber;
exports.DateWeekNumber = DateWeekNumber;
exports.DatesBetween = DatesBetween;
exports.DatesFromWeekNumber = DatesFromWeekNumber;
exports.DatesMonth = DatesMonth;
exports.DatesQuarter = DatesQuarter;
exports.DaysInMonth = DaysInMonth;
exports.DaysInMonthYear = DaysInMonthYear;
exports.DeepEqual = DeepEqual;
exports.DigitsNth = DigitsNth;
exports.DisplayNameFromFL = DisplayNameFromFL;
exports.DisplayNameFromObject = DisplayNameFromObject;
exports.DurationLongDescription = DurationLongDescription;
exports.ESTTodayDate = ESTTodayDate;
exports.ESTTodayDateTimeLabel = ESTTodayDateTimeLabel;
exports.EllipsesAtMax = EllipsesAtMax;
exports.EnumKeyFromValue = EnumKeyFromValue;
exports.EnumKeys = EnumKeys;
exports.EnumValueFromKey = EnumValueFromKey;
exports.EnumValues = EnumValues;
exports.EvaluateCondition = EvaluateCondition;
exports.EvaluateString = EvaluateString;
exports.FindIsActiveString = FindIsActiveString;
exports.FormUrlEncoded = FormUrlEncoded;
exports.FormatExternalURL = FormatExternalURL;
exports.FormatPhoneNumber = FormatPhoneNumber;
exports.FormatPhoneNumberDots = FormatPhoneNumberDots;
exports.FormatPhoneNumberOld = FormatPhoneNumberOld;
exports.FormatSSN = FormatSSN;
exports.FormatZip = FormatZip;
exports.GenerateUUID = GenerateUUID;
exports.GetStage = GetStage;
exports.GetStageName = GetStageName;
exports.GoogleMapsAddressLink = GoogleMapsAddressLink;
exports.GoogleMapsGPSLink = GoogleMapsGPSLink;
exports.GreaterNumber = GreaterNumber;
exports.GreaterNumberNull = GreaterNumberNull;
exports.HHcmmcss = HHcmmcss;
exports.HTMLToText = HTMLToText;
exports.IANAOffset = IANAOffset;
exports.IANAZoneAbbr = IANAZoneAbbr;
exports.InitialDateMonth = InitialDateMonth;
exports.InitialDateQuarter = InitialDateQuarter;
exports.InvertColorHex = InvertColorHex;
exports.InvertColorRGB = InvertColorRGB;
exports.IsDateString = IsDateString;
exports.IsEqual = IsEqual;
exports.IsJSON = IsJSON;
exports.IsOn = IsOn;
exports.IsStage = IsStage;
exports.IsStageDevFocused = IsStageDevFocused;
exports.IsStageDevTestFocused = IsStageDevTestFocused;
exports.IsStageTestFocused = IsStageTestFocused;
exports.IsValidInputDecimal = IsValidInputDecimal;
exports.JSONParse = JSONParse;
exports.JSONStringToObject = JSONStringToObject;
exports.LeastNumber = LeastNumber;
exports.LeastNumberNull = LeastNumberNull;
exports.LeftPad = LeftPad;
exports.ManualParse = ManualParse;
exports.MonthNames = MonthNames;
exports.NowISOString = NowISOString;
exports.ObjectContainsSearch = ObjectContainsSearch;
exports.ObjectContainsSearchTerms = ObjectContainsSearchTerms;
exports.ObjectDiffs = ObjectDiffs;
exports.ObjectFromFormData = ObjectFromFormData;
exports.ObjectToJSONString = ObjectToJSONString;
exports.ObjectWithChanges = ObjectWithChanges;
exports.OmitFalsey = OmitFalsey;
exports.OmitProperty = OmitProperty;
exports.OmitUndefined = OmitUndefined;
exports.PagesForRange = PagesForRange;
exports.PhoneComponents = PhoneComponents;
exports.PickProperty = PickProperty;
exports.PropertiesExist = PropertiesExist;
exports.PropertiesNotFalsey = PropertiesNotFalsey;
exports.RBGFromHex = RBGFromHex;
exports.RandomKey = RandomKey;
exports.RandomString = RandomString;
exports.ReSortOrder = ReSortOrder;
exports.ReduceObjectToOtherKeys = ReduceObjectToOtherKeys;
exports.RemoveDupProperties = RemoveDupProperties;
exports.RemoveDupPropertiesByID = RemoveDupPropertiesByID;
exports.RemoveDupPropertiesByIDArray = RemoveDupPropertiesByIDArray;
exports.RemoveEnding = RemoveEnding;
exports.RemoveStarting = RemoveStarting;
exports.ReplaceAll = ReplaceAll;
exports.ReplaceLinks = ReplaceLinks;
exports.RightPad = RightPad;
exports.RoundTo = RoundTo;
exports.SearchRow = SearchRow;
exports.SearchRows = SearchRows;
exports.SearchSort = SearchSort;
exports.SearchTerms = SearchTerms;
exports.SelectBetweenIDs = SelectBetweenIDs;
exports.ShortNumber = ShortNumber;
exports.Sleep = Sleep;
exports.SortColumnUpdate = SortColumnUpdate;
exports.SortColumns = SortColumns;
exports.SortCompare = SortCompare;
exports.SortCompareDate = SortCompareDate;
exports.SortCompareDateNull = SortCompareDateNull;
exports.SortCompareNull = SortCompareNull;
exports.SortIndex = SortIndex;
exports.SortIndexNull = SortIndexNull;
exports.SortPerArray = SortPerArray;
exports.StringContainsSearch = StringContainsSearch;
exports.StringContainsSearchTerms = StringContainsSearchTerms;
exports.StringFindIsActive = StringFindIsActive;
exports.StringHasDateData = StringHasDateData;
exports.StringHasTimeData = StringHasTimeData;
exports.StringHasTimeZoneData = StringHasTimeZoneData;
exports.StringToByteArray = StringToByteArray;
exports.SubsetEqual = SubsetEqual;
exports.SubsetFormEqual = SubsetFormEqual;
exports.TSDays = TSDays;
exports.TSHours = TSHours;
exports.TSMinutes = TSMinutes;
exports.TSMonthsEstimate = TSMonthsEstimate;
exports.TSSeconds = TSSeconds;
exports.TSWeeks = TSWeeks;
exports.TSYearsEstimate = TSYearsEstimate;
exports.TermsToSearch = TermsToSearch;
exports.TextToHTML = TextToHTML;
exports.TimeFloorMinute = TimeFloorMinute;
exports.TimeOnly = TimeOnly;
exports.TimeSeries = TimeSeries;
exports.TimeZoneOlsonsAll = TimeZoneOlsonsAll;
exports.TimeZoneOlsonsAmerica = TimeZoneOlsonsAmerica;
exports.TimeZoneOlsonsAmericaCommon = TimeZoneOlsonsAmericaCommon;
exports.ToArray = ToArray;
exports.ToCamelCase = ToCamelCase;
exports.ToCurrency = ToCurrency;
exports.ToCurrencyBlank = ToCurrencyBlank;
exports.ToCurrencyDash = ToCurrencyDash;
exports.ToCurrencyMax = ToCurrencyMax;
exports.ToDigits = ToDigits;
exports.ToDigitsBlank = ToDigitsBlank;
exports.ToDigitsBlankMax = ToDigitsBlankMax;
exports.ToDigitsDash = ToDigitsDash;
exports.ToDigitsDashMax = ToDigitsDashMax;
exports.ToDigitsMax = ToDigitsMax;
exports.ToFirstLetterUpper = ToFirstLetterUpper;
exports.ToFirstLetterUpperSmart = ToFirstLetterUpperSmart;
exports.ToID = ToID;
exports.ToInitials = ToInitials;
exports.ToKebabCase = ToKebabCase;
exports.ToPascalCase = ToPascalCase;
exports.ToPercent = ToPercent;
exports.ToPercentBlank = ToPercentBlank;
exports.ToPercentDash = ToPercentDash;
exports.ToPercentMax = ToPercentMax;
exports.ToSnakeCase = ToSnakeCase;
exports.ToStringArray = ToStringArray;
exports.ToUpperCaseWords = ToUpperCaseWords;
exports.ToWords = ToWords;
exports.Trunc = Trunc;
exports.UCWords = UCWords;
exports.ValidNumbers = ValidNumbers;
exports.WeekDays = WeekDays;
exports.WeekNumberAdjust = WeekNumberAdjust;
exports.WeeksFromLabel = WeeksFromLabel;
exports.YYYYMMDDHHmmss = YYYYMMDDHHmmss;
exports.YYYY_MM_DD_HH_mm_ss = YYYY_MM_DD_HH_mm_ss;
exports.YYYYsMMsDD = YYYYsMMsDD;
exports.YYYYsMMsDDsHHcmmcss = YYYYsMMsDDsHHcmmcss;
exports.ab2str = ab2str;
exports.everyAsync = everyAsync;
exports.filterAsync = filterAsync;
exports.findAsync = findAsync;
exports.initialChanges = initialChanges;
exports.initialConsoleLogTableDef = initialConsoleLogTableDef;
exports.initialFilterSortPaginator = initialFilterSortPaginator;
exports.initialIDChanges = initialIDChanges;
exports.initialSortColumn = initialSortColumn;
exports.isAB = isAB;
exports.someAsync = someAsync;
exports.str2ab = str2ab;
