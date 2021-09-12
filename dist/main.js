'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

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
var consoleLogTable = function (arrayData, tableDef) {
    if (tableDef === void 0) { tableDef = initialConsoleLogTableDef; }
    var nullIndicator = '(null)';
    if (arrayData.length === 0)
        return;
    var useTableDef = __assign({}, tableDef);
    if (!useTableDef.columns || useTableDef.columns.length === 0) {
        useTableDef.columns = [];
        var dataAnalyze = arrayData[0];
        var _loop_1 = function (col) {
            useTableDef.columns.push({
                characters: arrayData.reduce(function (prev, cur) {
                    var _a;
                    var len = ((_a = cur[col]) !== null && _a !== void 0 ? _a : nullIndicator).toString().length;
                    return len > prev ? len : prev;
                }, 1),
                justify: !!arrayData.find(function (dataItem, idx) { var _a; return idx === 0 ? false : isNaN(parseFloat(((_a = dataItem[col]) !== null && _a !== void 0 ? _a : '0').toString())); })
                    ? 'L'
                    : 'R'
            });
        };
        for (var col = 0; col < dataAnalyze.length; col++) {
            _loop_1(col);
        }
    }
    var firstRow = true;
    if (useTableDef.surroundingLines) {
        console.log(' ');
        console.log(arrayData[0]
            .map(function (_columnValue, idx) {
            var _a, _b, _c;
            var text = '';
            var columnDef = ((_a = useTableDef.columns) !== null && _a !== void 0 ? _a : [])[idx];
            if (!!columnDef) {
                if (columnDef.justify === 'L') {
                    text = text.padEnd(columnDef.characters, (_b = columnDef.padWith) !== null && _b !== void 0 ? _b : '-');
                }
                else {
                    text = text.padStart(columnDef.characters, (_c = columnDef.padWith) !== null && _c !== void 0 ? _c : '-');
                }
            }
            return text;
        })
            .join('---'));
    }
    for (var _i = 0, arrayData_1 = arrayData; _i < arrayData_1.length; _i++) {
        var dataItem = arrayData_1[_i];
        console.log(dataItem
            .map(function (columnValue, idx) {
            var _a, _b, _c;
            var text = (columnValue !== null && columnValue !== void 0 ? columnValue : '(null)').toString();
            var columnDef = ((_a = useTableDef.columns) !== null && _a !== void 0 ? _a : [])[idx];
            if (!!columnDef) {
                if (columnDef.justify === 'L') {
                    text = text.padEnd(columnDef.characters, (_b = columnDef.padWith) !== null && _b !== void 0 ? _b : ' ');
                }
                else {
                    text = text.padStart(columnDef.characters, (_c = columnDef.padWith) !== null && _c !== void 0 ? _c : ' ');
                }
            }
            return text;
        })
            .join('   '));
        if (useTableDef.firstRowIsHeader && firstRow) {
            console.log(dataItem
                .map(function (_columnValue, idx) {
                var _a, _b, _c;
                var text = '';
                var columnDef = ((_a = useTableDef.columns) !== null && _a !== void 0 ? _a : [])[idx];
                if (!!columnDef) {
                    if (columnDef.justify === 'L') {
                        text = text.padEnd(columnDef.characters, (_b = columnDef.padWith) !== null && _b !== void 0 ? _b : '-');
                    }
                    else {
                        text = text.padStart(columnDef.characters, (_c = columnDef.padWith) !== null && _c !== void 0 ? _c : '-');
                    }
                }
                return text;
            })
                .join('---'));
        }
        firstRow = false;
    }
    if (useTableDef.surroundingLines) {
        console.log(arrayData[0]
            .map(function (_columnValue, idx) {
            var _a, _b, _c;
            var text = '';
            var columnDef = ((_a = useTableDef.columns) !== null && _a !== void 0 ? _a : [])[idx];
            if (!!columnDef) {
                if (columnDef.justify === 'L') {
                    text = text.padEnd(columnDef.characters, (_b = columnDef.padWith) !== null && _b !== void 0 ? _b : '-');
                }
                else {
                    text = text.padStart(columnDef.characters, (_c = columnDef.padWith) !== null && _c !== void 0 ? _c : '-');
                }
            }
            return text;
        })
            .join('---'));
        console.log(' ');
    }
};

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
    if (!subject)
        return '';
    if (Array.isArray(find)) {
        var result = subject;
        for (var _i = 0, find_1 = find; _i < find_1.length; _i++) {
            var findItem = find_1[_i];
            result = ReplaceAll(findItem, replace, result);
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
var RoundTo = function (num, decimalPlaces) {
    if (decimalPlaces === void 0) { decimalPlaces = 0; }
    return +Math.round((num + Number.EPSILON) * (Math.pow(10, decimalPlaces))) / (Math.pow(10, decimalPlaces));
};
var ObjectToJSONString = function (val) { return "json:" + JSON.stringify(val); };
var JSONStringToObject = function (val) { return (!val ? undefined : val === 'json:undefined' ? undefined : val === 'json:null' ? null : JSONParse(val.toString().substr(5))); };
/**
 * Takes in text, and adds an "s" to the end of it if the count is zero or > 1
 * @param text
 * @param count
 * @constructor
 */
var AddS = function (text, count) {
    return !text ? '' : text + (CleanNumber(count !== null && count !== void 0 ? count : 0) !== 1 ? 's' : '');
};
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
    var _i, array_1, t;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, array_1 = array;
                _a.label = 1;
            case 1:
                if (!(_i < array_1.length)) return [3 /*break*/, 4];
                t = array_1[_i];
                return [4 /*yield*/, predicate(t)];
            case 2:
                if (_a.sent()) {
                    return [2 /*return*/, t];
                }
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, undefined];
        }
    });
}); };
/**
 * Async version of some
 * @param array
 * @param predicate
 */
var someAsync = function (array, predicate) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, array_2, t;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, array_2 = array;
                _a.label = 1;
            case 1:
                if (!(_i < array_2.length)) return [3 /*break*/, 4];
                t = array_2[_i];
                return [4 /*yield*/, predicate(t)];
            case 2:
                if (_a.sent()) {
                    return [2 /*return*/, true];
                }
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, false];
        }
    });
}); };
/**
 * Async version of every
 * @param array
 * @param predicate
 */
var everyAsync = function (array, predicate) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, array_3, t;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, array_3 = array;
                _a.label = 1;
            case 1:
                if (!(_i < array_3.length)) return [3 /*break*/, 4];
                t = array_3[_i];
                return [4 /*yield*/, predicate(t)];
            case 2:
                if (!(_a.sent())) {
                    return [2 /*return*/, false];
                }
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
/**
 * Async version of filter
 * @param array
 * @param predicate
 */
var filterAsync = function (array, predicate) { return __awaiter(void 0, void 0, void 0, function () {
    var returnArray, _i, array_4, t;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                returnArray = [];
                _i = 0, array_4 = array;
                _a.label = 1;
            case 1:
                if (!(_i < array_4.length)) return [3 /*break*/, 4];
                t = array_4[_i];
                return [4 /*yield*/, predicate(t)];
            case 2:
                if (_a.sent()) {
                    returnArray.push(t);
                }
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, returnArray];
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
var ToArray = function (value) { return !value ? [] : Array.isArray(value) ? value : [value]; };
var DeepEqual = function (object1, object2) {
    var _a, _b;
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
            if (typeof object1 === 'object' && ((_a = object1.type) === null || _a === void 0 ? void 0 : _a.toString().includes('react.')))
                return true;
            if (typeof object2 === 'object' && ((_b = object2.type) === null || _b === void 0 ? void 0 : _b.toString().includes('react.')))
                return true;
            var keys1 = Object.keys(object1);
            var keys2 = Object.keys(object2);
            if (keys1.length !== keys2.length) {
                return false;
            }
            for (var _i = 0, keys1_1 = keys1; _i < keys1_1.length; _i++) {
                var key = keys1_1[_i];
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
            return true;
        default:
            return object1 === object2;
    }
};
function isObject(object) {
    return object !== null && object !== undefined && typeof object === 'object';
}
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

/**
 * Converts a string to snake_case.
 *
 * @example
 * ToSnakeCase('UserToken')  // returns "user_token"
 */
var ToSnakeCase = function (str) {
    if (!str)
        return '';
    if (str === 'ID')
        return 'id';
    var calcStr = ReplaceAll('-', '_', str.replace('ID', '_id'));
    return (calcStr[0].toLowerCase() +
        calcStr.slice(1, calcStr.length).replace(/[A-Z1-9]/g, function (letter) { return "_" + letter.toLowerCase(); }));
};
/**
 * Converts a string to kebab-case.
 *
 * @example
 * ToSnakeCase('UserToken')  // returns "user-token"
 */
var ToKebabCase = function (str) { return ReplaceAll('_', '-', ToSnakeCase(str)); };
/**
 * Converts a string to camelCase.
 *
 * @example
 * ToCamelCase('user_token') //  returns "userToken
 */
var ToCamelCase = function (str) {
    if (!str)
        return '';
    if (str === 'id')
        return 'ID';
    var calcStr = ToSnakeCase(str).replace('_id', 'ID');
    return ReplaceAll('_', '', ReplaceAll(' ', '', calcStr.replace(/([-_ ][a-z])/gi, function ($1) {
        return $1.toUpperCase().replace('-', '').replace('_', '').replace(' ', '');
    })));
};
var ToUpperCaseWords = function (str) {
    var _a, _b, _c;
    var result = (_c = UCWords((_b = ReplaceAll('_', ' ', (_a = ToSnakeCase(str)) !== null && _a !== void 0 ? _a : '')) !== null && _b !== void 0 ? _b : '')) !== null && _c !== void 0 ? _c : '';
    if (result.endsWith(' Id')) {
        return result.substr(0, result.length - 1) + 'D';
    }
    return result;
};
/**
 * Converts a string to PascalCase.
 *
 * @example
 * ToPascalCase('user_token') //  returns "UserToken
 */
var ToPascalCase = function (str) {
    var calcStr = ToCamelCase(str);
    return calcStr.substr(0, 1).toUpperCase() + calcStr.substr(1);
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
var ToDigits = function (value, decimals) {
    if (decimals === void 0) { decimals = 0; }
    return CleanNumber(value).toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
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
    return CleanNumber(value).toLocaleString(undefined, {
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
/**
 * Returns a formatted ssn with dashes.
 *
 * @example
 * // returns 123-12-1234
 * FormatSSN('123121234')
 */
var FormatPhoneNumber = function (phone) {
    if (!phone)
        return '';
    var cleanPhone = ReplaceAll(['(', ')', '-', ' '], '', phone);
    var processPhone = cleanPhone.substr(0, 10);
    var appendPhone = cleanPhone.substr(10);
    var val = '';
    var areaCode = processPhone.substring(0, 3);
    var middle = processPhone.substring(3, 6);
    var last = processPhone.substring(6, 10);
    if (processPhone.length > 6) {
        val = "(" + areaCode + ") " + middle + "-" + last;
    }
    else if (processPhone.length > 3) {
        val = "(" + areaCode + ") " + middle;
    }
    else if (processPhone.length > 0) {
        val = "(" + areaCode + ")";
    }
    // enforce max length
    return val + (!!appendPhone ? ' ' + appendPhone : '');
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
    var validCharLength = validChars.length - 1;
    var result = '';
    for (var i = 0; i < length; i++) {
        result += validChars.substr(Math.floor(Math.random() * validCharLength), 1);
    }
    var ts = new Date().valueOf().toString();
    if (length > ts.length * 0.5) {
        var offset = RoundTo((length - ts.length) / 2, 0);
        return result.substr(0, offset) + ts + result.substr(offset + ts.length);
    }
    return result;
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
var NowISOString = function () { return new Date().toISOString(); };
var StringHasTimeData = function (value) { return value.includes(':'); };
var StringHasDateData = function (value) { return value.includes('-') || /\d{8}/.test(value); };
var StringHasTimeZoneData = function (value) { return value.includes('T') || value.includes('+') || value.substr(15).includes('-'); };
var IsDateString = function (value) {
    if (!value || typeof value !== 'string')
        return false;
    if (!StringHasDateData(value))
        return false;
    return !!DateParseTS(value);
};
var DateParseTS = function (date) {
    if (!date)
        return Date.parse(new Date().toString());
    try {
        var result = Date.parse(date.toString());
        if (isNaN(result)) {
            var check = new Date(date);
            if (!check) {
                return null;
            }
            return Date.parse(check.toString());
        }
        return result;
    }
    catch (_a) {
        return null;
    }
};
var DateISO = function (date) {
    var parsed = DateParseTS(date);
    if (!parsed)
        return null;
    return new Date(parsed).toISOString();
};
var DateObject = function (date) {
    var parsed = DateParseTS(date);
    if (!parsed)
        return null;
    return new Date(parsed);
};
var DateICS = function (date) {
    var dateISO = DateISO(date);
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
var DateFormat = function (date, format) {
    var dateObject = DateObject(date);
    if (!dateObject || dateObject.valueOf() === 0)
        return null;
    var applyCommand = function (command) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        switch (command) {
            case 'YYYY':
                return dateObject.getFullYear().toString();
            case 'YY':
                return dateObject.getFullYear().toString().substr(2);
            case 'Q':
                return (Math.ceil((dateObject.getMonth() + 1) / 3)).toString();
            case 'Qo':
                return (_a = DigitsNth((Math.ceil((dateObject.getMonth() + 1) / 3)))) !== null && _a !== void 0 ? _a : '';
            case 'MMMM':
                return (_b = MonthNames[dateObject.getMonth() + 1]) !== null && _b !== void 0 ? _b : '';
            case 'MMM':
                return ((_c = MonthNames[dateObject.getMonth() + 1]) !== null && _c !== void 0 ? _c : '').substr(0, 3);
            case 'MM':
                return (dateObject.getMonth() + 1).toString().padStart(2, '0');
            case 'Mo':
                return (_d = DigitsNth(dateObject.getMonth() + 1)) !== null && _d !== void 0 ? _d : '';
            case 'M':
                return (dateObject.getMonth() + 1).toString();
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
                return dateObject.getDate().toString().padStart(2, '0');
            case 'Do':
                return (_e = DigitsNth(dateObject.getDate())) !== null && _e !== void 0 ? _e : '';
            case 'D':
                return dateObject.getDate().toString();
            case 'd':
                return dateObject.getDay().toString();
            case 'do':
                return (_f = DigitsNth(dateObject.getDay())) !== null && _f !== void 0 ? _f : '';
            case 'dd':
                return ((_g = WeekDays[dateObject.getDay()]) !== null && _g !== void 0 ? _g : '').substr(0, 2);
            case 'ddd':
                return ((_h = WeekDays[dateObject.getDay()]) !== null && _h !== void 0 ? _h : '').substr(0, 3);
            case 'dddd':
                return ((_j = WeekDays[dateObject.getDay()]) !== null && _j !== void 0 ? _j : '');
            case 'HH':
                return dateObject.getHours().toString().padStart(2, '0');
            case 'H':
                return dateObject.getHours().toString();
            case 'hh':
                return (dateObject.getHours() > 12 ? dateObject.getHours() - 12 : dateObject.getHours()).toString().padStart(2, '0');
            case 'h':
                return (dateObject.getHours() > 12 ? dateObject.getHours() - 12 : dateObject.getHours()).toString();
            case 'mm':
                return dateObject.getMinutes().toString().padStart(2, '0');
            case 'm':
                return dateObject.getMinutes().toString();
            case 'ss':
                return dateObject.getSeconds().toString().padStart(2, '0');
            case 's':
                return dateObject.getSeconds().toString();
            case 'A':
                return dateObject.getHours() > 12 ? 'PM' : 'AM';
            case 'a':
                return dateObject.getHours() > 12 ? 'pm' : 'am';
            default:
                return command;
        }
    };
    var formatArray = format.split('');
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
            result += applyCommand(command);
            command = '';
            previousChar = '';
            inEscape = true;
        }
        else {
            if (formatChar === previousChar || previousChar === '' || (command.length > 0 &&
                patterns.some(function (pattern) { return pattern.startsWith(command) && formatChar === pattern.substr(command.length, 1); }))) {
                command += formatChar;
            }
            else {
                result += applyCommand(command);
                command = formatChar;
            }
            previousChar = formatChar;
        }
    };
    for (var _i = 0, formatArray_1 = formatArray; _i < formatArray_1.length; _i++) {
        var formatChar = formatArray_1[_i];
        _loop_1(formatChar);
    }
    result += applyCommand(command);
    return result;
};
var YYYYMMDDHHmmss = function (ts) {
    var dateObject = !ts ? new Date() : new Date(ts);
    return "" + dateObject.getFullYear() + (dateObject.getMonth() + 1).toString().padStart(2, '0') + dateObject.getDate().toString().padStart(2, '0') + dateObject.getHours().toString().padStart(2, '0') + dateObject.getMinutes().toString().padStart(2, '0') + dateObject.getSeconds().toString().padStart(2, '0');
};
var YYYY_MM_DD_HH_mm_ss = function (ts) {
    var dateObject = !ts ? new Date() : new Date(ts);
    return dateObject.getFullYear() + "-" + (dateObject.getMonth() + 1).toString().padStart(2, '0') + "-" + dateObject.getDate().toString().padStart(2, '0') + "_" + dateObject.getHours().toString().padStart(2, '0') + "-" + dateObject.getMinutes().toString().padStart(2, '0') + "-" + dateObject.getSeconds().toString().padStart(2, '0');
};
var YYYYsMMsDDsHHcmmcss = function (ts) {
    var dateObject = !ts ? new Date() : new Date(ts);
    return dateObject.getFullYear() + "/" + (dateObject.getMonth() + 1).toString().padStart(2, '0') + "/" + dateObject.getDate().toString().padStart(2, '0') + " " + dateObject.getHours().toString().padStart(2, '0') + ":" + dateObject.getMinutes().toString().padStart(2, '0') + ":" + dateObject.getSeconds().toString().padStart(2, '0');
};
var YYYYsMMsDD = function (ts) {
    var dateObject = !ts ? new Date() : new Date(ts);
    return dateObject.getFullYear() + "/" + (dateObject.getMonth() + 1).toString().padStart(2, '0') + "/" + dateObject.getDate().toString().padStart(2, '0');
};
var HHcmmcss = function (ts) {
    var dateObject = !ts ? new Date() : new Date(ts);
    return dateObject.getHours().toString().padStart(2, '0') + ":" + dateObject.getMinutes().toString().padStart(2, '0') + ":" + dateObject.getSeconds().toString().padStart(2, '0');
};
var MonthNames = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
};
var WeekDays = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
};
var TSYearsEstimate = function (ts) { return Math.floor(ts / 365 / 24 / 60 / 60 / 1000); };
var TSMonthsEstimate = function (ts, withinYear) { return Math.floor((ts - (withinYear ? (TSYearsEstimate(ts) * 365 * 24 * 60 * 60 * 1000) : 0)) / 30 / 24 / 60 / 60 / 1000); };
var TSWeeks = function (ts) { return Math.floor(ts / 7 / 24 / 60 / 60 / 1000); };
var TSDays = function (ts, withinMonth) { return Math.floor((ts - (withinMonth ? (TSMonthsEstimate(ts) * 30 * 24 * 60 * 60 * 1000) : 0)) / 24 / 60 / 60 / 1000); };
var TSHours = function (ts, withinDay) { return Math.floor((ts - (withinDay ? (TSDays(ts) * 24 * 60 * 60 * 1000) : 0)) / 60 / 60 / 1000); };
var TSMinutes = function (ts, withinHour) { return Math.floor((ts - (withinHour ? (TSHours(ts) * 60 * 60 * 1000) : 0)) / 60 / 1000); };
var TSSeconds = function (ts, withinMinute) { return Math.floor((ts - (withinMinute ? (TSMinutes(ts) * 60 * 1000) : 0)) / 1000); };
/**
 * Displays a simplified duration format from seconds.
 *
 * @example
 * MomentDurationShortText((30 * 60) + 20) // result: 30 Minutes 20 Seconds
 */
var DurationLongDescription = function (seconds, trimSeconds) {
    if (trimSeconds === void 0) { trimSeconds = false; }
    var durationTS = seconds * 1000;
    var text = '';
    if (TSYearsEstimate(durationTS)) {
        text += " " + ToDigits(TSYearsEstimate(durationTS), 0) + " " + AddS('Year', TSYearsEstimate(durationTS));
        text += " " + ToDigits(TSMonthsEstimate(durationTS, true), 0) + " " + AddS('Month', TSMonthsEstimate(durationTS, true));
        if (TSDays(durationTS, true)) {
            text += " " + ToDigits(TSDays(durationTS, true), 0) + " " + AddS('Day', TSDays(durationTS, true));
        }
    }
    else if (TSMonthsEstimate(durationTS, true)) {
        text += " " + ToDigits(TSMonthsEstimate(durationTS, true), 0) + " " + AddS('Month', TSMonthsEstimate(durationTS, true));
        if (TSDays(durationTS, true)) {
            text += " " + ToDigits(TSDays(durationTS, true), 0) + " " + AddS('Day', TSDays(durationTS, true));
        }
    }
    else if (TSDays(durationTS, true)) {
        text += " " + ToDigits(TSDays(durationTS, true), 0) + " " + AddS('Day', TSDays(durationTS, true));
        if (TSHours(durationTS, true)) {
            text += " " + ToDigits(TSHours(durationTS, true), 0) + " " + AddS('Hour', TSHours(durationTS, true));
        }
        if (TSMinutes(durationTS, true)) {
            text += " " + ToDigits(TSMinutes(durationTS, true), 0) + " " + AddS('Minute', TSMinutes(durationTS, true));
        }
    }
    else if (TSHours(durationTS, true)) {
        text += " " + ToDigits(TSHours(durationTS, true), 0) + " " + AddS('Hour', TSHours(durationTS, true));
        if (TSMinutes(durationTS, true)) {
            text += " " + ToDigits(TSMinutes(durationTS, true), 0) + " " + AddS('Minute', TSMinutes(durationTS, true));
        }
    }
    else {
        if (TSMinutes(durationTS, true) || (!text && trimSeconds)) {
            text += " " + ToDigits(TSMinutes(durationTS, true), 0) + " " + AddS('Minute', TSMinutes(durationTS, true));
        }
        if (!text || (!trimSeconds && TSSeconds(durationTS, true))) {
            text += " " + ToDigits(TSSeconds(durationTS, true), 0) + " " + AddS('Second', TSSeconds(durationTS, true));
        }
    }
    return text.trim();
};

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
var ObjectWithChanges = function (item, changes) { return (__assign(__assign({}, item), changes)); };
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
    var newState = __spreadArrays(prevState);
    var idx = newState.findIndex(function (nS) { return (!!change.id && change.id === nS.id) || (!!change.uuid && change.uuid === nS.uuid); });
    if (idx >= 0) {
        newState[idx] = __assign(__assign({}, newState[idx]), change);
        return newState;
    }
    var newVal = __assign(__assign({}, initial), change);
    if (!newVal.id && !newVal.uuid)
        newVal.uuid = GenerateUUID();
    return __spreadArrays(newState, [__assign({}, newVal)]);
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
var CombineArrayWithIDOrUUIDChanges = function (original, changes, initial) {
    return changes.reduce(function (result, change) { return ChangeArrayByIDOrUUID(result, change, initial); }, original);
};
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
var ArrayWithIDChanges = function (items, idChanges) { return items.map(function (item) { return (__assign(__assign({}, item), idChanges[item.id])); }); };
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
            return (blankZeros && ((typeof item === 'number' && !item) || item === '0')) ? '' :
                typeof item === 'string' ? '"' + ReplaceAll('"', '""', item) + '"' : (item !== null && item !== void 0 ? item : '').toString();
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
var IsEqual = function (val1, val2) {
    if (val1 === val2)
        return true;
    if (val1 === null)
        return val2 === null;
    if (val2 === null)
        return false;
    if (val1 === undefined)
        return val2 === undefined;
    if (val2 === undefined)
        return false;
    if (typeof val1 === 'object' || typeof val2 === 'object') {
        if ((!val1 && !val2) || JSON.stringify(val1 !== null && val1 !== void 0 ? val1 : {}) !== JSON.stringify(val2 !== null && val2 !== void 0 ? val2 : {})) {
            return true;
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
        }
        if (IsDateString(val1)) {
            var pTRM = DateFormat(val1, DATE_FORMAT_DATE);
            if (!!pTRM) {
                if (IsDateString(val2)) {
                    var rM = DateFormat(val2, DATE_FORMAT_DATE);
                    if (!!rM && pTRM === rM) {
                        return true;
                    }
                }
            }
        }
    }
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
            if (IsEqual(propsToRemove[key], result[key])) {
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
    var _loop_1 = function (key) {
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
        _loop_1(key);
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
    if (excludeKeys === void 0) { excludeKeys = []; }
    var results = {};
    for (var _i = 0, _a = Object.keys(compare); _i < _a.length; _i++) {
        var key = _a[_i];
        if (!excludeKeys.includes(key)) {
            if (compare[key] !== comparedTo[key]) {
                results[key] = compare[key];
            }
        }
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
    if (excludeKeys === void 0) { excludeKeys = []; }
    var results = {};
    for (var _i = 0, _a = Object.keys(main); _i < _a.length; _i++) {
        var key = _a[_i];
        if (!excludeKeys.includes(key) && reduceTo[key] !== undefined) {
            results[key] = main[key];
        }
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
    var _a, _b, _c;
    var returnValue = expression;
    if (!!variables) {
        for (var _i = 0, _d = Object.keys(variables); _i < _d.length; _i++) {
            var key = _d[_i];
            returnValue = ReplaceAll("[" + key + "]", variables[key], returnValue);
        }
    }
    var innerSet = FindInnerSetLocations(returnValue, '[', ']');
    while (!!innerSet) {
        var beforeValue = (_a = returnValue.substring(0, innerSet[0])) !== null && _a !== void 0 ? _a : '';
        var replaceValue = (_b = ProcessPMDAS(returnValue.substring(innerSet[0] + 1, innerSet[1]))) !== null && _b !== void 0 ? _b : '';
        var afterValue = (_c = returnValue.substring(innerSet[1] + 1)) !== null && _c !== void 0 ? _c : '';
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
    var returnValue = ExecuteFunctions(expression);
    returnValue = ReplaceAll(' ', '', returnValue);
    var preOperators = __spreadArrays(EvaluatorOperators, ['(']);
    var postOperators = __spreadArrays(EvaluatorOperators, [')']);
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
    for (var _i = 0, EvaluatorOperators_1 = EvaluatorOperators; _i < EvaluatorOperators_1.length; _i++) {
        var operator = EvaluatorOperators_1[_i];
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
    // returnValue = ExecuteFunctions(returnValue);
    return returnValue;
};
var FindFunction = function (expression, startPosition) {
    if (!expression)
        return null;
    for (var _i = 0, EvaluatorFunctions_1 = EvaluatorFunctions; _i < EvaluatorFunctions_1.length; _i++) {
        var evaluatorFunction = EvaluatorFunctions_1[_i];
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
    var _a, _b;
    return ((_b = (_a = process.env.REACT_APP_STAGE) !== null && _a !== void 0 ? _a : process.env.STAGE) !== null && _b !== void 0 ? _b : exports.Stages.Local);
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
    for (var _i = 0, range_1 = range; _i < range_1.length; _i++) {
        var i = range_1[_i];
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
    return rangeWithNull;
}
var initialSortColumn = {
    primarySort: '',
    primaryAscending: true,
    primaryEmptyToBottom: null,
    secondarySort: null,
    secondaryAscending: true,
    secondaryEmptyToBottom: null
};
var initialFilterSortPaginator = {
    page: 1,
    countPerPage: 50,
    search: '',
    sortColumns: initialSortColumn,
    active: true,
    filterValues: {}
};
/**
 * Updates a the primary sort key of a sort column object, and returns the updated object.
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
var SortColumnResult = function (valueA, valueB, isAscending, emptyToBottom) { return SortCompare(isAscending ? valueA : valueB, isAscending ? valueB : valueA, !!emptyToBottom ? 'Bottom' : undefined); };
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
var ObjectContainsSearchTerms = function (checkObject, searchTerms) {
    var _a;
    if (searchTerms.length === 0)
        return true;
    if (!checkObject)
        return false;
    if (typeof checkObject === 'object' && ((_a = checkObject.type) === null || _a === void 0 ? void 0 : _a.toString().includes('react.')))
        return false;
    return searchTerms.every(function (term) {
        return Object.keys(checkObject).some(function (column) {
            var columnValue = checkObject[column];
            var typeofColumn = typeof columnValue;
            if (!Array.isArray(columnValue) && ['number', 'bigint', 'string'].includes(typeofColumn)) {
                return columnValue.toString().toLowerCase().includes(term.toLowerCase());
            }
            if (Array.isArray(columnValue)) {
                for (var _i = 0, columnValue_1 = columnValue; _i < columnValue_1.length; _i++) {
                    var obj = columnValue_1[_i];
                    if (ObjectContainsSearchTerms(obj, [term]))
                        return true;
                }
            }
            if (typeofColumn === 'object') {
                return ObjectContainsSearchTerms(columnValue, [term]);
            }
            return false;
        });
    });
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
var ObjectContainsSearch = function (object, search) {
    if (!search)
        return true;
    if (!object)
        return false;
    var searchTerms = SearchTerms(search);
    return ObjectContainsSearchTerms(object, searchTerms);
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
var SearchRows = function (arrayTable, search) {
    var searchTerms = SearchTerms(search);
    if (searchTerms.length === 0) {
        return arrayTable;
    }
    return (arrayTable !== null && arrayTable !== void 0 ? arrayTable : []).filter(function (arrayRow) { return ObjectContainsSearchTerms(arrayRow, searchTerms); });
};
/**
 * Determines whether a search item object contains value from the search string.
 *
 * @example
 * // returns true
 * SearchRow({user: 'john doe', age: '24'}, 'john 24')
 */
var SearchRow = function (searchItem, search) {
    var searchTerms = SearchTerms(search);
    if (searchTerms.length === 0) {
        return true;
    }
    return ObjectContainsSearchTerms(searchItem, searchTerms);
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
var SearchSort = function (arrayTable, search, sortColumn) {
    return SortColumns(SearchRows(arrayTable, search), sortColumn);
};

var ToID = function (item) { return typeof item === 'number' ? item : item.id; };
(function (UnselectedIDList) {
    UnselectedIDList.IsSelected = function (item, unselectedIDs) { return !unselectedIDs.includes(ToID(item)); };
    UnselectedIDList.SelectedIDs = function (items, unselectedIDs) { return items.reduce(function (result, cur) {
        var curID = ToID(cur);
        return (!unselectedIDs.find(function (id) { return id === curID; }) ? __spreadArrays(result, [curID]) : result);
    }, []); };
    UnselectedIDList.ToggleUnSelectedID = function (toggleID, unselectedIDs) { return unselectedIDs.includes(toggleID) ? unselectedIDs.filter(function (id) { return id !== toggleID; }) : __spreadArrays(unselectedIDs, [toggleID]); };
    UnselectedIDList.SelectIDs = function (ids, unselectedIDs) {
        return unselectedIDs.filter(function (unselectedID) { return !ids.find(function (id) { return unselectedID === ToID(id); }); });
    };
    UnselectedIDList.UnSelectIDs = function (ids, unselectedIDs) {
        return __spreadArrays(unselectedIDs, (ids.map(function (id) { return ToID(id); })));
    };
    UnselectedIDList.SelectedBetween = function (allIDs, lastID, nextID, unselectedIDs) {
        var allNumbers = allIDs.map(function (allID) { return ToID(allID); });
        var select = !UnselectedIDList.IsSelected(nextID, unselectedIDs);
        var betweenIDs = [];
        var firstFound = false;
        for (var _i = 0, allNumbers_1 = allNumbers; _i < allNumbers_1.length; _i++) {
            var checkID = allNumbers_1[_i];
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
        return select ? UnselectedIDList.SelectIDs(betweenIDs, unselectedIDs) : UnselectedIDList.UnSelectIDs(betweenIDs, unselectedIDs);
    };
})(exports.UnselectedIDList || (exports.UnselectedIDList = {}));
var SelectBetweenIDs = function (allIDs, lastID, nextID, inclusive) {
    if (inclusive === void 0) { inclusive = true; }
    var betweenIDs = [];
    var firstFound = false;
    for (var _i = 0, allIDs_1 = allIDs; _i < allIDs_1.length; _i++) {
        var checkID = allIDs_1[_i];
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
exports.ArrayToGuidString = ArrayToGuidString;
exports.ArrayWithIDChanges = ArrayWithIDChanges;
exports.ChangeArrayByIDOrUUID = ChangeArrayByIDOrUUID;
exports.ChangeValueChanges = ChangeValueChanges;
exports.CleanNumber = CleanNumber;
exports.CleanNumberNull = CleanNumberNull;
exports.CleanScripts = CleanScripts;
exports.CombineArrayWithIDOrUUIDChanges = CombineArrayWithIDOrUUIDChanges;
exports.ConsoleColor = ConsoleColor;
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
exports.DateFormat = DateFormat;
exports.DateICS = DateICS;
exports.DateISO = DateISO;
exports.DateObject = DateObject;
exports.DateParseTS = DateParseTS;
exports.DeepEqual = DeepEqual;
exports.DigitsNth = DigitsNth;
exports.DisplayNameFromFL = DisplayNameFromFL;
exports.DisplayNameFromObject = DisplayNameFromObject;
exports.DurationLongDescription = DurationLongDescription;
exports.EvaluateCondition = EvaluateCondition;
exports.EvaluateString = EvaluateString;
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
exports.HHcmmcss = HHcmmcss;
exports.HTMLToText = HTMLToText;
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
exports.LeftPad = LeftPad;
exports.MonthNames = MonthNames;
exports.NowISOString = NowISOString;
exports.ObjectContainsSearch = ObjectContainsSearch;
exports.ObjectContainsSearchTerms = ObjectContainsSearchTerms;
exports.ObjectDiffs = ObjectDiffs;
exports.ObjectToJSONString = ObjectToJSONString;
exports.ObjectWithChanges = ObjectWithChanges;
exports.OmitProperty = OmitProperty;
exports.PagesForRange = PagesForRange;
exports.RandomString = RandomString;
exports.ReSortOrder = ReSortOrder;
exports.ReduceObjectToOtherKeys = ReduceObjectToOtherKeys;
exports.RemoveDupProperties = RemoveDupProperties;
exports.RemoveDupPropertiesByID = RemoveDupPropertiesByID;
exports.RemoveDupPropertiesByIDArray = RemoveDupPropertiesByIDArray;
exports.ReplaceAll = ReplaceAll;
exports.ReplaceLinks = ReplaceLinks;
exports.RightPad = RightPad;
exports.RoundTo = RoundTo;
exports.SearchRow = SearchRow;
exports.SearchRows = SearchRows;
exports.SearchSort = SearchSort;
exports.SearchTerms = SearchTerms;
exports.SelectBetweenIDs = SelectBetweenIDs;
exports.SortColumnUpdate = SortColumnUpdate;
exports.SortColumns = SortColumns;
exports.SortCompare = SortCompare;
exports.SortCompareNull = SortCompareNull;
exports.SortPerArray = SortPerArray;
exports.StringContainsSearch = StringContainsSearch;
exports.StringContainsSearchTerms = StringContainsSearchTerms;
exports.StringHasDateData = StringHasDateData;
exports.StringHasTimeData = StringHasTimeData;
exports.StringHasTimeZoneData = StringHasTimeZoneData;
exports.StringToByteArray = StringToByteArray;
exports.TSDays = TSDays;
exports.TSHours = TSHours;
exports.TSMinutes = TSMinutes;
exports.TSMonthsEstimate = TSMonthsEstimate;
exports.TSSeconds = TSSeconds;
exports.TSWeeks = TSWeeks;
exports.TSYearsEstimate = TSYearsEstimate;
exports.TermsToSearch = TermsToSearch;
exports.TextToHTML = TextToHTML;
exports.ToArray = ToArray;
exports.ToCamelCase = ToCamelCase;
exports.ToCurrency = ToCurrency;
exports.ToCurrencyBlank = ToCurrencyBlank;
exports.ToCurrencyDash = ToCurrencyDash;
exports.ToCurrencyMax = ToCurrencyMax;
exports.ToDigits = ToDigits;
exports.ToDigitsBlank = ToDigitsBlank;
exports.ToDigitsDash = ToDigitsDash;
exports.ToDigitsMax = ToDigitsMax;
exports.ToID = ToID;
exports.ToKebabCase = ToKebabCase;
exports.ToPascalCase = ToPascalCase;
exports.ToPercent = ToPercent;
exports.ToPercentBlank = ToPercentBlank;
exports.ToPercentDash = ToPercentDash;
exports.ToPercentMax = ToPercentMax;
exports.ToSnakeCase = ToSnakeCase;
exports.ToStringArray = ToStringArray;
exports.ToUpperCaseWords = ToUpperCaseWords;
exports.Trunc = Trunc;
exports.UCWords = UCWords;
exports.WeekDays = WeekDays;
exports.YYYYMMDDHHmmss = YYYYMMDDHHmmss;
exports.YYYY_MM_DD_HH_mm_ss = YYYY_MM_DD_HH_mm_ss;
exports.YYYYsMMsDD = YYYYsMMsDD;
exports.YYYYsMMsDDsHHcmmcss = YYYYsMMsDDsHHcmmcss;
exports.ab2str = ab2str;
exports.consoleLogTable = consoleLogTable;
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
