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

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs=e();}(undefined,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else {var i=t.name;v[i]=t,r=i;}return !n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t);}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return O},m.isValid=function(){return !(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

var dayjs_ = /*#__PURE__*/Object.freeze({
    __proto__: null
});

!function(t,s){"object"==typeof exports&&"undefined"!=typeof module?module.exports=s():"function"==typeof define&&define.amd?define(s):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs_plugin_duration=s();}(undefined,(function(){var t,s,n=1e3,i=6e4,e=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,u=31536e6,h=2592e6,a=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,d={years:u,months:h,days:r,hours:e,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},c=function(t){return t instanceof p},f=function(t,s,n){return new p(t,n,s.$l)},m=function(t){return s.p(t)+"s"},l=function(t){return t<0},$=function(t){return l(t)?Math.ceil(t):Math.floor(t)},y=function(t){return Math.abs(t)},g=function(t,s){return t?l(t)?{negative:!0,format:""+y(t)+s}:{negative:!1,format:""+t+s}:{negative:!1,format:""}},p=function(){function l(t,s,n){var i=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),s)return f(t*d[m(s)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(s){i.$d[m(s)]=t[s];})),this.calMilliseconds(),this;if("string"==typeof t){var e=t.match(a);if(e){var r=e.slice(2).map((function(t){return Number(t)}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var y=l.prototype;return y.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(s,n){return s+(t.$d[n]||0)*d[n]}),0);},y.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=$(t/u),t%=u,this.$d.months=$(t/h),t%=h,this.$d.days=$(t/r),t%=r,this.$d.hours=$(t/e),t%=e,this.$d.minutes=$(t/i),t%=i,this.$d.seconds=$(t/n),t%=n,this.$d.milliseconds=t;},y.toISOString=function(){var t=g(this.$d.years,"Y"),s=g(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=g(n,"D"),e=g(this.$d.hours,"H"),r=g(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var u=g(o,"S"),h=t.negative||s.negative||i.negative||e.negative||r.negative||u.negative,a=e.format||r.format||u.format?"T":"",d=(h?"-":"")+"P"+t.format+s.format+i.format+a+e.format+r.format+u.format;return "P"===d||"-P"===d?"P0D":d},y.toJSON=function(){return this.toISOString()},y.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:s.s(this.$d.years,2,"0"),YYYY:s.s(this.$d.years,4,"0"),M:this.$d.months,MM:s.s(this.$d.months,2,"0"),D:this.$d.days,DD:s.s(this.$d.days,2,"0"),H:this.$d.hours,HH:s.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:s.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:s.s(this.$d.seconds,2,"0"),SSS:s.s(this.$d.milliseconds,3,"0")};return n.replace(o,(function(t,s){return s||String(i[t])}))},y.as=function(t){return this.$ms/d[m(t)]},y.get=function(t){var s=this.$ms,n=m(t);return "milliseconds"===n?s%=1e3:s="weeks"===n?$(s/d[n]):this.$d[n],0===s?0:s},y.add=function(t,s,n){var i;return i=s?t*d[m(s)]:c(t)?t.$ms:f(t,this).$ms,f(this.$ms+i*(n?-1:1),this)},y.subtract=function(t,s){return this.add(t,s,!0)},y.locale=function(t){var s=this.clone();return s.$l=t,s},y.clone=function(){return f(this.$ms,this)},y.humanize=function(s){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!s)},y.milliseconds=function(){return this.get("milliseconds")},y.asMilliseconds=function(){return this.as("milliseconds")},y.seconds=function(){return this.get("seconds")},y.asSeconds=function(){return this.as("seconds")},y.minutes=function(){return this.get("minutes")},y.asMinutes=function(){return this.as("minutes")},y.hours=function(){return this.get("hours")},y.asHours=function(){return this.as("hours")},y.days=function(){return this.get("days")},y.asDays=function(){return this.as("days")},y.weeks=function(){return this.get("weeks")},y.asWeeks=function(){return this.as("weeks")},y.months=function(){return this.get("months")},y.asMonths=function(){return this.as("months")},y.years=function(){return this.get("years")},y.asYears=function(){return this.as("years")},l}();return function(n,i,e){t=e,s=e().$utils(),e.duration=function(t,s){var n=e.locale();return f(t,{$l:n},s)},e.isDuration=c;var r=i.prototype.add,o=i.prototype.subtract;i.prototype.add=function(t,s){return c(t)&&(t=t.asMilliseconds()),r.bind(this)(t,s)},i.prototype.subtract=function(t,s){return c(t)&&(t=t.asMilliseconds()),o.bind(this)(t,s)};}}));

var duration = /*#__PURE__*/Object.freeze({
    __proto__: null
});

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).dayjs_plugin_isoWeek=t();}(undefined,(function(){var e="day";return function(t,i,s){var a=function(t){return t.add(4-t.isoWeekday(),e)},d=i.prototype;d.isoWeekYear=function(){return a(this).year()},d.isoWeek=function(t){if(!this.$utils().u(t))return this.add(7*(t-this.isoWeek()),e);var i,d,n,o,r=a(this),u=(i=this.isoWeekYear(),d=this.$u,n=(d?s.utc:s)().year(i).startOf("year"),o=4-n.isoWeekday(),n.isoWeekday()>4&&(o+=7),n.add(o,e));return r.diff(u,"week")+1},d.isoWeekday=function(e){return this.$utils().u(e)?this.day()||7:this.day(this.day()%7?e:e-7)};var n=d.startOf;d.startOf=function(e,t){var i=this.$utils(),s=!!i.u(t)||t;return "isoweek"===i.p(e)?s?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):n.bind(this)(e,t)};}}));

var isoWeek = /*#__PURE__*/Object.freeze({
    __proto__: null
});

!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs_plugin_utc=i();}(undefined,(function(){var t="minute",i=/[+-]\d\d(?::?\d\d)?/g,e=/([+-]|\d\d)/g;return function(s,f,n){var u=f.prototype;n.utc=function(t){var i={date:t,utc:!0,args:arguments};return new f(i)},u.utc=function(i){var e=n(this.toDate(),{locale:this.$L,utc:!0});return i?e.add(this.utcOffset(),t):e},u.local=function(){return n(this.toDate(),{locale:this.$L,utc:!1})};var o=u.parse;u.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t);};var r=u.init;u.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds();}else r.call(this);};var a=u.utcOffset;u.utcOffset=function(s,f){var n=this.$utils().u;if(n(s))return this.$u?0:n(this.$offset)?a.call(this):this.$offset;if("string"==typeof s&&null===(s=function(t){void 0===t&&(t="");var s=t.match(i);if(!s)return null;var f=(""+s[0]).match(e)||["-",0,0],n=f[0],u=60*+f[1]+ +f[2];return 0===u?0:"+"===n?u:-u}(s)))return this;var u=Math.abs(s)<=16?60*s:s,o=this;if(f)return o.$offset=u,o.$u=0===s,o;if(0!==s){var r=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(u+r,t)).$offset=u,o.$x.$localOffset=r;}else o=this.utc();return o};var h=u.format;u.format=function(t){var i=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return h.call(this,i)},u.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||(new Date).getTimezoneOffset());return this.$d.valueOf()-6e4*t},u.isUTC=function(){return !!this.$u},u.toISOString=function(){return this.toDate().toISOString()},u.toString=function(){return this.toDate().toUTCString()};var l=u.toDate;u.toDate=function(t){return "s"===t&&this.$offset?n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var c=u.diff;u.diff=function(t,i,e){if(t&&this.$u===t.$u)return c.call(this,t,i,e);var s=this.local(),f=n(t).local();return c.call(s,f,i,e)};}}));

var utc = /*#__PURE__*/Object.freeze({
    __proto__: null
});

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs_plugin_timezone=e();}(undefined,(function(){var t={year:0,month:1,day:2,hour:3,minute:4,second:5},e={};return function(n,i,o){var r,a=function(t,n,i){void 0===i&&(i={});var o=new Date(t);return function(t,n){void 0===n&&(n={});var i=n.timeZoneName||"short",o=t+"|"+i,r=e[o];return r||(r=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:i}),e[o]=r),r}(n,i).formatToParts(o)},u=function(e,n){for(var i=a(e,n),r=[],u=0;u<i.length;u+=1){var f=i[u],s=f.type,m=f.value,c=t[s];c>=0&&(r[c]=parseInt(m,10));}var d=r[3],l=24===d?0:d,v=r[0]+"-"+r[1]+"-"+r[2]+" "+l+":"+r[4]+":"+r[5]+":000",h=+e;return (o.utc(v).valueOf()-(h-=h%1e3))/6e4},f=i.prototype;f.tz=function(t,e){void 0===t&&(t=r);var n=this.utcOffset(),i=this.toDate(),a=i.toLocaleString("en-US",{timeZone:t}),u=Math.round((i-new Date(a))/1e3/60),f=o(a).$set("millisecond",this.$ms).utcOffset(15*-Math.round(i.getTimezoneOffset()/15)-u,!0);if(e){var s=f.utcOffset();f=f.add(n-s,"minute");}return f.$x.$timezone=t,f},f.offsetName=function(t){var e=this.$x.$timezone||o.tz.guess(),n=a(this.valueOf(),e,{timeZoneName:t}).find((function(t){return "timezonename"===t.type.toLowerCase()}));return n&&n.value};var s=f.startOf;f.startOf=function(t,e){if(!this.$x||!this.$x.$timezone)return s.call(this,t,e);var n=o(this.format("YYYY-MM-DD HH:mm:ss:SSS"));return s.call(n,t,e).tz(this.$x.$timezone,!0)},o.tz=function(t,e,n){var i=n&&e,a=n||e||r,f=u(+o(),a);if("string"!=typeof t)return o(t).tz(a);var s=function(t,e,n){var i=t-60*e*1e3,o=u(i,n);if(e===o)return [i,e];var r=u(i-=60*(o-e)*1e3,n);return o===r?[i,o]:[t-60*Math.min(o,r)*1e3,Math.max(o,r)]}(o.utc(t,i).valueOf(),f,a),m=s[0],c=s[1],d=o(m).utcOffset(c);return d.$x.$timezone=a,d},o.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},o.tz.setDefault=function(t){r=t;};}}));

var timezone = /*#__PURE__*/Object.freeze({
    __proto__: null
});

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).dayjs_plugin_advancedFormat=t();}(undefined,(function(){return function(e,t,r){var n=t.prototype,s=n.format;r.en.ordinal=function(e){var t=["th","st","nd","rd"],r=e%100;return "["+e+(t[(r-20)%10]||t[r]||t[0])+"]"},n.format=function(e){var t=this,r=this.$locale(),n=this.$utils(),a=(e||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,(function(e){switch(e){case"Q":return Math.ceil((t.$M+1)/3);case"Do":return r.ordinal(t.$D);case"gggg":return t.weekYear();case"GGGG":return t.isoWeekYear();case"wo":return r.ordinal(t.week(),"W");case"w":case"ww":return n.s(t.week(),"w"===e?1:2,"0");case"W":case"WW":return n.s(t.isoWeek(),"W"===e?1:2,"0");case"k":case"kk":return n.s(String(0===t.$H?24:t.$H),"k"===e?1:2,"0");case"X":return Math.floor(t.$d.getTime()/1e3);case"x":return t.$d.getTime();case"z":return "["+t.offsetName()+"]";case"zzz":return "["+t.offsetName("long")+"]";default:return e}}));return s.bind(this)(a)};}}));

var AdvancedFormat = /*#__PURE__*/Object.freeze({
    __proto__: null
});

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).dayjs_plugin_localizedFormat=t();}(undefined,(function(){var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};return function(t,o,n){var r=o.prototype,i=r.format;n.en.formats=e,r.format=function(t){void 0===t&&(t="YYYY-MM-DDTHH:mm:ssZ");var o=this.$locale().formats,n=function(t,o){return t.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,n,r){var i=r&&r.toUpperCase();return n||o[r]||e[r]||o[i].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,o){return t||o.slice(1)}))}))}(t,void 0===o?{}:o);return i.call(this,n)};}}));

var LocalizedFormat = /*#__PURE__*/Object.freeze({
    __proto__: null
});

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs_plugin_customParseFormat=e();}(undefined,(function(){var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},e=/(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d\d/,r=/\d\d?/,i=/\d*[^\s\d-_:/()]+/,o={},s=function(t){return (t=+t)+(t>68?1900:2e3)};var a=function(t){return function(e){this[t]=+e;}},f=[/[+-]\d\d:?(\d\d)?|Z/,function(t){(this.zone||(this.zone={})).offset=function(t){if(!t)return 0;if("Z"===t)return 0;var e=t.match(/([+-]|\d\d)/g),n=60*e[1]+(+e[2]||0);return 0===n?0:"+"===e[0]?-n:n}(t);}],u=function(t){var e=o[t];return e&&(e.indexOf?e:e.s.concat(e.f))},h=function(t,e){var n,r=o.meridiem;if(r){for(var i=1;i<=24;i+=1)if(t.indexOf(r(i,0,e))>-1){n=i>12;break}}else n=t===(e?"pm":"PM");return n},d={A:[i,function(t){this.afternoon=h(t,!1);}],a:[i,function(t){this.afternoon=h(t,!0);}],S:[/\d/,function(t){this.milliseconds=100*+t;}],SS:[n,function(t){this.milliseconds=10*+t;}],SSS:[/\d{3}/,function(t){this.milliseconds=+t;}],s:[r,a("seconds")],ss:[r,a("seconds")],m:[r,a("minutes")],mm:[r,a("minutes")],H:[r,a("hours")],h:[r,a("hours")],HH:[r,a("hours")],hh:[r,a("hours")],D:[r,a("day")],DD:[n,a("day")],Do:[i,function(t){var e=o.ordinal,n=t.match(/\d+/);if(this.day=n[0],e)for(var r=1;r<=31;r+=1)e(r).replace(/\[|\]/g,"")===t&&(this.day=r);}],M:[r,a("month")],MM:[n,a("month")],MMM:[i,function(t){var e=u("months"),n=(u("monthsShort")||e.map((function(t){return t.substr(0,3)}))).indexOf(t)+1;if(n<1)throw new Error;this.month=n%12||n;}],MMMM:[i,function(t){var e=u("months").indexOf(t)+1;if(e<1)throw new Error;this.month=e%12||e;}],Y:[/[+-]?\d+/,a("year")],YY:[n,function(t){this.year=s(t);}],YYYY:[/\d{4}/,a("year")],Z:f,ZZ:f};function c(n){var r,i;r=n,i=o&&o.formats;for(var s=(n=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(e,n,r){var o=r&&r.toUpperCase();return n||i[r]||t[r]||i[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(t,e,n){return e||n.slice(1)}))}))).match(e),a=s.length,f=0;f<a;f+=1){var u=s[f],h=d[u],c=h&&h[0],l=h&&h[1];s[f]=l?{regex:c,parser:l}:u.replace(/^\[|\]$/g,"");}return function(t){for(var e={},n=0,r=0;n<a;n+=1){var i=s[n];if("string"==typeof i)r+=i.length;else {var o=i.regex,f=i.parser,u=t.substr(r),h=o.exec(u)[0];f.call(e,h),t=t.replace(h,"");}}return function(t){var e=t.afternoon;if(void 0!==e){var n=t.hours;e?n<12&&(t.hours+=12):12===n&&(t.hours=0),delete t.afternoon;}}(e),e}}return function(t,e,n){n.p.customParseFormat=!0,t&&t.parseTwoDigitYear&&(s=t.parseTwoDigitYear);var r=e.prototype,i=r.parse;r.parse=function(t){var e=t.date,r=t.utc,s=t.args;this.$u=r;var a=s[1];if("string"==typeof a){var f=!0===s[2],u=!0===s[3],h=f||u,d=s[2];u&&(d=s[2]),o=this.$locale(),!f&&d&&(o=n.Ls[d]),this.$d=function(t,e,n){try{if(["x","X"].indexOf(e)>-1)return new Date(("X"===e?1e3:1)*t);var r=c(e)(t),i=r.year,o=r.month,s=r.day,a=r.hours,f=r.minutes,u=r.seconds,h=r.milliseconds,d=r.zone,l=new Date,m=s||(i||o?1:l.getDate()),M=i||l.getFullYear(),Y=0;i&&!o||(Y=o>0?o-1:l.getMonth());var p=a||0,v=f||0,D=u||0,g=h||0;return d?new Date(Date.UTC(M,Y,m,p,v,D,g+60*d.offset*1e3)):n?new Date(Date.UTC(M,Y,m,p,v,D,g)):new Date(M,Y,m,p,v,D,g)}catch(t){return new Date("")}}(e,a,r),this.init(),d&&!0!==d&&(this.$L=this.locale(d).$L),h&&e!==this.format(a)&&(this.$d=new Date("")),o={};}else if(a instanceof Array)for(var l=a.length,m=1;m<=l;m+=1){s[1]=a[m-1];var M=n.apply(this,s);if(M.isValid()){this.$d=M.$d,this.$L=M.$L,this.init();break}m===l&&(this.$d=new Date(""));}else i.call(this,t);};}}));

var customParseFormat = /*#__PURE__*/Object.freeze({
    __proto__: null
});

/**
 * Converts a string to snake_case.
 *
 * @example
 * ToSnakeCase('UserToken')  // returns "user_token"
 */
var ToSnakeCase = function (str) {
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
    var str = CleanScripts(subject).replace(/(<([^>]+)>)/gi, '');
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
    var str = subject;
    while (str.length < length)
        str = padString + str;
    return str;
};
var RightPad = function (subject, length, padString) {
    var str = subject;
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
 * Returns a formatted phone number with parenthesis.
 *
 * @example
 * // returns (555) 555-1234
 * FormatPhoneNumber('5555551234')
 */
var FormatPhoneNumber = function (phone, forceNumeric) {
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
    var ts = Date.now().toString();
    if (length > ts.length * 0.5) {
        var offset = RoundTo((length - ts.length) / 2, 0);
        return result.substr(0, offset) + ts + result.substr(offset + ts.length);
    }
    return result;
};

var dayjs = dayjs_;
dayjs.extend(duration);
dayjs.extend(isoWeek);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(AdvancedFormat);
dayjs.extend(LocalizedFormat);
dayjs.extend(customParseFormat);
dayjs.tz.setDefault("UTC");
var DAYJS_FORMAT_DATE = 'YYYY-MM-DD';
var DAYJS_FORMAT_TIME_SECONDS = 'HH:mm:ss';
var DAYJS_FORMAT_TIME_NO_SECONDS = 'HH:mm';
var DAYJS_FORMAT_DATE_TIME = DAYJS_FORMAT_DATE + ' ' + DAYJS_FORMAT_TIME_SECONDS;
var DAYJS_FORMAT_DATE_DISPLAY = "MMM D, YYYY";
var DAYJS_FORMAT_DATE_DISPLAY_DOW = "dd, " + DAYJS_FORMAT_DATE_DISPLAY;
var DAYJS_FORMAT_TIME_DISPLAY = 'h:mm a';
var DAYJS_FORMAT_DATE_TIME_DISPLAY = DAYJS_FORMAT_DATE_DISPLAY + ", " + DAYJS_FORMAT_TIME_DISPLAY;
var DAYJS_FORMAT_DATE_TIME_DISPLAY_DOW = DAYJS_FORMAT_DATE_DISPLAY_DOW + ", " + DAYJS_FORMAT_TIME_DISPLAY;
var DAYJS_FORMAT_DATE_DISPLAY_LONG = "MMMM D, YYYY";
var DAYJS_FORMAT_DATE_DISPLAY_DOW_LONG = "dddd, " + DAYJS_FORMAT_DATE_DISPLAY_LONG;
var DAYJS_FORMAT_DATE_TIME_DISPLAY_LONG = DAYJS_FORMAT_DATE_DISPLAY_LONG + ", " + DAYJS_FORMAT_TIME_DISPLAY;
var DAYJS_FORMAT_DATE_TIME_DISPLAY_DOW_LONG = DAYJS_FORMAT_DATE_DISPLAY_DOW_LONG + ", " + DAYJS_FORMAT_TIME_DISPLAY;
var DATE_FORMAT_TRIES = [
    'YYYY-MM-DD',
    'M-D-YYYY',
    'MM-DD-YYYY',
    'YYYYMMDD'
];
var TIME_FORMAT_TRIES = [
    'YYYY-MM-DD HH:mm:ss',
    'YYYY-MM-DD HH:mm',
    'YYYY-MM-DD HH:mm:ss.S',
    'YYYY-MM-DD HH:mm:ss.SS',
    'YYYY-MM-DD HH:mm:ss.SSS',
    'YYYY-MM-DD HH:mm:ss.SZ',
    'YYYY-MM-DD HH:mm:ss.SSZ',
    'YYYY-MM-DD HH:mm:ss.SSSZ',
    'HH:mm:ss',
    'HH:mm',
    'D-M-YYYY HH:mm:ss',
    'D-M-YYYY HH:mm',
    'DD-MM-YYYY HH:mm:ss',
    'DD-MM-YYYY HH:mm'
];
(function (EDateAndOrTime) {
    EDateAndOrTime[EDateAndOrTime["DATE"] = 0] = "DATE";
    EDateAndOrTime[EDateAndOrTime["TIME"] = 1] = "TIME";
    EDateAndOrTime[EDateAndOrTime["DATETIME"] = 2] = "DATETIME";
})(exports.EDateAndOrTime || (exports.EDateAndOrTime = {}));
var StringHasTimeData = function (value) { return value.includes(':'); };
var StringHasDateData = function (value) { return value.includes('-') || /\d{8}/.test(value); };
var StringHasTimeZoneData = function (value) {
    return value.includes('T') || value.substr(15).includes('+') || value.substr(15).includes('-');
};
var AnyDateValueIsObject = function (value) { return (!value ? false : typeof value !== 'string'); };
var FormatIsTime = function (format) {
    return [DAYJS_FORMAT_TIME_SECONDS, DAYJS_FORMAT_TIME_NO_SECONDS, DAYJS_FORMAT_TIME_DISPLAY].includes(format);
};
var FormatIsDate = function (format) {
    return [DAYJS_FORMAT_DATE, DAYJS_FORMAT_DATE_DISPLAY, DAYJS_FORMAT_DATE_DISPLAY_DOW].includes(format);
};
var FormatIsDateTime = function (format) {
    return [DAYJS_FORMAT_DATE_TIME, DAYJS_FORMAT_DATE_TIME_DISPLAY, DAYJS_FORMAT_DATE_TIME_DISPLAY_DOW].includes(format);
};
/**
 * Returns the current time zone.
 */
var DayjsCurrentTimeZone = function () { return dayjs().tz().format('z'); };
/**
 * Returns the current olson time zone.
 */
var DayjsCurrentTimeZoneOlson = function () { return dayjs.tz.guess(); };
/**
 * Returns a list of olson time zone items, sorted by hour diff from UTC
 *
 * Defaults to 'US'
 */
var TimeZoneOlsons = function () {
    return [
        {
            'zone': 'EDT',
            'olson': 'America/Detroit',
            'hours': '-04:00'
        },
        {
            'zone': 'EDT',
            'olson': 'America/Indiana/Indianapolis',
            'hours': '-04:00'
        },
        {
            'zone': 'EDT',
            'olson': 'America/Indiana/Marengo',
            'hours': '-04:00'
        },
        {
            'zone': 'EDT',
            'olson': 'America/Indiana/Petersburg',
            'hours': '-04:00'
        },
        {
            'zone': 'EDT',
            'olson': 'America/Indiana/Vevay',
            'hours': '-04:00'
        },
        {
            'zone': 'EDT',
            'olson': 'America/Indiana/Vincennes',
            'hours': '-04:00'
        },
        {
            'zone': 'EDT',
            'olson': 'America/Indiana/Winamac',
            'hours': '-04:00'
        },
        {
            'zone': 'EDT',
            'olson': 'America/Kentucky/Louisville',
            'hours': '-04:00'
        },
        {
            'zone': 'EDT',
            'olson': 'America/Kentucky/Monticello',
            'hours': '-04:00'
        },
        {
            'zone': 'EDT',
            'olson': 'America/New_York',
            'hours': '-04:00'
        },
        {
            'zone': 'CDT',
            'olson': 'America/Chicago',
            'hours': '-05:00'
        },
        {
            'zone': 'CDT',
            'olson': 'America/Indiana/Knox',
            'hours': '-05:00'
        },
        {
            'zone': 'CDT',
            'olson': 'America/Indiana/Tell_City',
            'hours': '-05:00'
        },
        {
            'zone': 'CDT',
            'olson': 'America/Menominee',
            'hours': '-05:00'
        },
        {
            'zone': 'CDT',
            'olson': 'America/North_Dakota/Beulah',
            'hours': '-05:00'
        },
        {
            'zone': 'CDT',
            'olson': 'America/North_Dakota/Center',
            'hours': '-05:00'
        },
        {
            'zone': 'CDT',
            'olson': 'America/North_Dakota/New_Salem',
            'hours': '-05:00'
        },
        {
            'zone': 'MDT',
            'olson': 'America/Boise',
            'hours': '-06:00'
        },
        {
            'zone': 'MDT',
            'olson': 'America/Denver',
            'hours': '-06:00'
        },
        {
            'zone': 'PDT',
            'olson': 'America/Los_Angeles',
            'hours': '-07:00'
        },
        {
            'zone': 'MST',
            'olson': 'America/Phoenix',
            'hours': '-07:00'
        },
        {
            'zone': 'AKDT',
            'olson': 'America/Anchorage',
            'hours': '-08:00'
        },
        {
            'zone': 'AKDT',
            'olson': 'America/Juneau',
            'hours': '-08:00'
        },
        {
            'zone': 'AKDT',
            'olson': 'America/Metlakatla',
            'hours': '-08:00'
        },
        {
            'zone': 'AKDT',
            'olson': 'America/Nome',
            'hours': '-08:00'
        },
        {
            'zone': 'AKDT',
            'olson': 'America/Sitka',
            'hours': '-08:00'
        },
        {
            'zone': 'AKDT',
            'olson': 'America/Yakutat',
            'hours': '-08:00'
        },
        {
            'zone': 'HDT',
            'olson': 'America/Adak',
            'hours': '-09:00'
        },
        {
            'zone': 'HST',
            'olson': 'Pacific/Honolulu',
            'hours': '-10:00'
        }
    ];
};
// (dayjs.tz.zonesForCountry(forCountry) as string[])
// 	.map(tzItem => ({
// 		zone: dayjs.tz(tzItem).zoneAbbr(),
// 		olson: tzItem,
// 		hours: dayjs.tz(tzItem).format('Z')
// 	}))
// 	.sort((a, b) => (a.hours !== b.hours ? a.hours.localeCompare(b.hours) : a.olson.localeCompare(b.olson)))
/**
 * Display timezone and olson
 */
var DisplayTZItem = function (tzItem) {
    return !tzItem || !tzItem.olson ? '' : !tzItem.zone ? tzItem.olson : tzItem.zone + ": " + tzItem.olson;
};
/**
 * Current time in ISO string format
 */
var NowISOString = function () { return new Date().toISOString(); };
var IsDateString = function (value) {
    if (!value || typeof value !== 'string')
        return false;
    // if (!DATE_FORMAT_TRIES.some(DFT => DFT.toString().length === value.length) && !TIME_FORMAT_TRIES.some(DFT => DFT.toString().length === value.length)) {
    // 	return false
    // }
    if (!StringHasDateData(value))
        return false;
    return !!DayjsFromString(value);
};
/**
 * Returns the Dayjs object from a given value. If the given value is invalid,
 * it returns null.
 *
 *
 * @example
 * // returns Dayjs<2020-10-02T00:00:00Z>
 * DayjsFromString('2020-10-02')
 */
var DayjsFromString = function (value) {
    if (!value) {
        return null;
    }
    var formatTries = __spreadArrays(DATE_FORMAT_TRIES, TIME_FORMAT_TRIES);
    if (typeof value !== 'string') {
        var dayjsObject = dayjs(value);
        if (dayjsObject.isValid()) {
            return dayjsObject; // .utc().tz(DayjsCurrentTimeZone())
        }
    }
    else {
        // const dayjsObject = StringHasTimeZoneData(value) ? dayjs(value.substr(0, 23), formatTries, true) : dayjs(value.substr(0, 23), formatTries, true).utc() // , formatTries, true
        var hasTZData = StringHasTimeZoneData(value);
        var dayjsObject = hasTZData ? dayjs(value) : dayjs.utc(value);
        if (dayjsObject.isValid()) {
            return dayjsObject;
        }
        for (var _i = 0, formatTries_1 = formatTries; _i < formatTries_1.length; _i++) {
            var formatTry = formatTries_1[_i];
            dayjsObject = hasTZData ? dayjs(value, formatTry, true) : dayjs.utc(value, formatTry, true);
            if (dayjsObject.isValid()) {
                return dayjsObject;
            }
        }
        // dayjsObject = StringHasTimeZoneData(value) ? dayjs(value, formatTries, true) : dayjs(value, formatTries, true)
        // if (dayjsObject.isValid()) {
        // 	return dayjsObject
        // }
    }
    return null;
};
/**
 * Does the same thing as DayjsFromString() but instead returns a string based on the format specified.
 *
 * @example
 * // returns "Oct 2, 2020"
 * DayjsFromString('2020-10-02', 'll')
 */
var DayjsFormatString = function (value, format, inUTC) {
    var _a, _b, _c, _d, _e, _f;
    if (!value)
        return null;
    if (typeof value == 'string') {
        if (FormatIsTime(format) && !StringHasTimeData(value)) {
            return null;
        }
        if ((FormatIsDateTime(format) || FormatIsDate(format)) && !StringHasDateData(value))
            return null;
        var dayjsObject = (_c = (_b = (inUTC ? DayjsFromString(value) : (_a = DayjsFromString(value)) === null || _a === void 0 ? void 0 : _a.tz(DayjsCurrentTimeZoneOlson()))) === null || _b === void 0 ? void 0 : _b.format(format)) !== null && _c !== void 0 ? _c : null;
        if (!dayjsObject)
            return null;
        if (format === DAYJS_FORMAT_TIME_SECONDS || format === DAYJS_FORMAT_TIME_NO_SECONDS) {
            if (!StringHasTimeData(dayjsObject))
                return null;
            return dayjsObject.substr(format.length * -1, format.length);
        }
        if (format === DAYJS_FORMAT_DATE) {
            if (!StringHasDateData(dayjsObject))
                return null;
            return dayjsObject.substr(0, format.length);
        }
        if (format === DAYJS_FORMAT_DATE_TIME) {
            if (!StringHasDateData(dayjsObject) || !StringHasTimeData(dayjsObject))
                return null;
        }
        return dayjsObject;
    }
    return (_f = (_e = (inUTC ? DayjsFromString(value) : (_d = DayjsFromString(value)) === null || _d === void 0 ? void 0 : _d.tz(DayjsCurrentTimeZoneOlson()))) === null || _e === void 0 ? void 0 : _e.format(format)) !== null && _f !== void 0 ? _f : null;
};
/**
 * Returns the dayjs time string in the format of "HH:mm:ss".
 */
var DayjsTimeString = function (value) {
    return DayjsFormatString(value, DAYJS_FORMAT_TIME_SECONDS, true);
};
/**
 * Returns the dayjs date string in the format of "YYYY-MM-DD".
 */
var DayjsDateString = function (value) { return DayjsFormatString(value, DAYJS_FORMAT_DATE, true); };
/**
 * Returns the dayjs date string in the format of "YYYY-MM-DD HH:mm:ss".
 */
var DayjsDateTimeString = function (value) {
    return DayjsFormatString(value, DAYJS_FORMAT_DATE_TIME, true);
};
/**
 * Returns display day date time format.
 */
var DayjsDisplayDayDateTime = function (value, showLong) {
    if (showLong === void 0) { showLong = false; }
    if (!!DayjsTimeString(value)) {
        return DayjsFormatString(value, showLong ? DAYJS_FORMAT_DATE_TIME_DISPLAY_LONG : DAYJS_FORMAT_DATE_TIME_DISPLAY, false);
    }
    else {
        return DayjsFormatString(value, showLong ? DAYJS_FORMAT_DATE_DISPLAY_LONG : DAYJS_FORMAT_DATE_DISPLAY, false);
    }
};
/**
 * Returns display day date format.
 */
var DayjsDisplayDayDate = function (value, showLong) {
    if (showLong === void 0) { showLong = false; }
    return DayjsFormatString(value, showLong ? DAYJS_FORMAT_DATE_DISPLAY_LONG : DAYJS_FORMAT_DATE_DISPLAY, false);
};
/**
 * Returns display day date time format with day of week.
 */
var DayjsDisplayDayDateTimeDoW = function (value, showLong) {
    if (showLong === void 0) { showLong = false; }
    if (!!DayjsTimeString(value)) {
        return DayjsFormatString(value, showLong ? DAYJS_FORMAT_DATE_TIME_DISPLAY_DOW_LONG : DAYJS_FORMAT_DATE_TIME_DISPLAY_DOW, false);
    }
    else {
        return DayjsFormatString(value, showLong ? DAYJS_FORMAT_DATE_DISPLAY_DOW_LONG : DAYJS_FORMAT_DATE_DISPLAY_DOW, false);
    }
};
/**
 * Returns display day date format with day of week.
 */
var DayjsDisplayDayDateDoW = function (value, showLong) {
    if (showLong === void 0) { showLong = false; }
    return DayjsFormatString(value, showLong ? DAYJS_FORMAT_DATE_DISPLAY_DOW_LONG : DAYJS_FORMAT_DATE_DISPLAY_DOW, false);
};
/**
 * Returns the time with 12-hour clock format.
 */
var DayjsDisplayTime = function (value) {
    return DayjsFormatString(value, DAYJS_FORMAT_TIME_DISPLAY, true);
};
/**
 * Displays difference between two times in a simplified duration format.
 *
 * If the second parameter is empty, the current date/time is used.
 *
 * @example
 * DayjsDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30m 20s
 * DayjsDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30m 20s
 */
var DayjsDurationShortText = function (start, end) { var _a, _b; return DurationShortText(((_a = DayjsFromString(end)) !== null && _a !== void 0 ? _a : dayjs()).diff((_b = DayjsFromString(start)) !== null && _b !== void 0 ? _b : dayjs()) / 1000); };
/**
 * Displays difference between two times in a simplified duration format.
 *
 * If the second parameter is empty, the current date/time is used.
 *
 * @example
 * DayjsDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30 Minutes 20 Seconds
 * DayjsDurationShortText('2020-01-01 13:00:00', '2020-01-01 13:30:20') // result: 30 Minutes 20 Seconds
 */
var DayjsDurationLongText = function (start, end, trimSeconds) {
    var _a, _b;
    if (trimSeconds === void 0) { trimSeconds = false; }
    return DurationLongText(((_a = DayjsFromString(end)) !== null && _a !== void 0 ? _a : dayjs()).diff((_b = DayjsFromString(start)) !== null && _b !== void 0 ? _b : dayjs()) / 1000, trimSeconds);
};
/**
 * Displays a simplified duration format from seconds.
 *
 * @example
 * DayjsDurationShortText((30 * 60) + 20) // result: 30m 20s
 */
var DurationShortText = function (seconds) {
    var duration = dayjs.duration(seconds * 1000);
    var text = '';
    if (duration.years()) {
        text += " " + ToDigits(duration.years(), 0) + "Y";
        text += " " + ToDigits(duration.months(), 0) + "M";
        text += " " + ToDigits(duration.days(), 0) + "D";
    }
    else if (duration.months()) {
        text += " " + ToDigits(duration.months(), 0) + "M";
        if (duration.days()) {
            text += " " + ToDigits(duration.days(), 0) + "D";
        }
    }
    else if (duration.days()) {
        text += " " + ToDigits(duration.days(), 0) + "D";
        text += " " + ToDigits(duration.hours(), 0) + "h";
        if (duration.minutes()) {
            text += " " + ToDigits(duration.minutes(), 0) + "m";
        }
    }
    else if (duration.hours()) {
        text += " " + ToDigits(duration.hours(), 0) + "h";
        if (duration.minutes()) {
            text += " " + ToDigits(duration.minutes(), 0) + "m";
        }
    }
    else {
        if (duration.minutes()) {
            text += " " + ToDigits(duration.minutes(), 0) + "m";
        }
        if (duration.seconds()) {
            text += " " + ToDigits(duration.seconds(), 0) + "s";
        }
    }
    return text.trim();
};
/**
 * Displays a simplified duration format from seconds.
 *
 * @example
 * DayjsDurationShortText((30 * 60) + 20) // result: 30 Minutes 20 Seconds
 */
var DurationLongText = function (seconds, trimSeconds) {
    if (trimSeconds === void 0) { trimSeconds = false; }
    var duration = dayjs.duration(seconds * 1000);
    var text = '';
    if (duration.years()) {
        text += " " + ToDigits(duration.years(), 0) + " " + AddS('Year', duration.years());
        text += " " + ToDigits(duration.months(), 0) + " " + AddS('Month', duration.months());
        if (duration.days()) {
            text += " " + ToDigits(duration.days(), 0) + " " + AddS('Day', duration.days());
        }
    }
    else if (duration.months()) {
        text += " " + ToDigits(duration.months(), 0) + " " + AddS('Month', duration.months());
        if (duration.days()) {
            text += " " + ToDigits(duration.days(), 0) + " " + AddS('Day', duration.days());
        }
    }
    else if (duration.days()) {
        text += " " + ToDigits(duration.days(), 0) + " " + AddS('Day', duration.days());
        if (duration.hours()) {
            text += " " + ToDigits(duration.hours(), 0) + " " + AddS('Hour', duration.hours());
        }
        if (duration.minutes()) {
            text += " " + ToDigits(duration.minutes(), 0) + " " + AddS('Minute', duration.minutes());
        }
    }
    else if (duration.hours()) {
        text += " " + ToDigits(duration.hours(), 0) + " " + AddS('Hour', duration.hours());
        if (duration.minutes()) {
            text += " " + ToDigits(duration.minutes(), 0) + " " + AddS('Minute', duration.minutes());
        }
    }
    else {
        if (duration.minutes() || (!text && trimSeconds)) {
            text += " " + ToDigits(duration.minutes(), 0) + " " + AddS('Minute', duration.minutes());
        }
        if (!text || (!trimSeconds && duration.seconds())) {
            text += " " + ToDigits(duration.seconds(), 0) + " " + AddS('Second', duration.seconds());
        }
    }
    return text.trim();
};
/**
 * Displays difference between two times in a simplified duration format.  The format will always show down to the second, and will always align in columns vertically (e.g. padding so that the length of '12' is the same as ' 2')
 *
 * If the second parameter is empty, the current date/time is used.
 
 * @example
 * DayjsDurationShortTextAligned('2020-01-01 13:00:00', '2020-01-03 14:30:20') // result: 2D  1h 30m 20s
 */
var DayjsDurationShortTextAligned = function (start, end) {
    var _a, _b;
    var duration = dayjs.duration(((_a = DayjsFromString(end)) !== null && _a !== void 0 ? _a : dayjs()).diff((_b = DayjsFromString(start)) !== null && _b !== void 0 ? _b : dayjs()));
    var text = '';
    if (duration.years()) {
        text += " " + ToDigits(duration.years(), 0) + "Y";
        text += " " + ToDigits(duration.months(), 0).padStart(2) + "M";
        text += " " + ToDigits(duration.days(), 0).padStart(2) + "D";
        text += " " + ToDigits(duration.hours(), 0).padStart(2) + "h";
        text += " " + ToDigits(duration.minutes(), 0).padStart(2) + "m";
        text += " " + ToDigits(duration.seconds(), 0).padStart(2) + "s";
    }
    else if (duration.months()) {
        text += " " + ToDigits(duration.months(), 0).padStart(2) + "M";
        text += " " + ToDigits(duration.days(), 0).padStart(2) + "D";
        text += " " + ToDigits(duration.hours(), 0).padStart(2) + "h";
        text += " " + ToDigits(duration.minutes(), 0).padStart(2) + "m";
        text += " " + ToDigits(duration.seconds(), 0).padStart(2) + "s";
    }
    else if (duration.days()) {
        text += " " + ToDigits(duration.days(), 0).padStart(2) + "D";
        text += " " + ToDigits(duration.hours(), 0).padStart(2) + "h";
        text += " " + ToDigits(duration.minutes(), 0).padStart(2) + "m";
        text += " " + ToDigits(duration.seconds(), 0).padStart(2) + "s";
    }
    else if (duration.hours()) {
        text += " " + ToDigits(duration.hours(), 0).padStart(2) + "h";
        text += " " + ToDigits(duration.minutes(), 0).padStart(2) + "m";
        text += " " + ToDigits(duration.seconds(), 0).padStart(2) + "s";
    }
    else if (duration.minutes()) {
        text += " " + ToDigits(duration.minutes(), 0).padStart(2) + "m";
        text += " " + ToDigits(duration.seconds(), 0).padStart(2) + "s";
    }
    else if (duration.seconds()) {
        text += " " + ToDigits(duration.seconds(), 0).padStart(2) + "s";
    }
    return text.trim();
};
var DayjsStringToDateLocale = function (value) { var _a; return (_a = DayjsFormatString(value, 'MM/DD/YYYY', false)) !== null && _a !== void 0 ? _a : ''; };
var DateAndTimeToDateTime = function (valueDate, valueTime) { var _a, _b, _c; return (_c = DayjsDateTimeString(((_a = DayjsDateString(valueDate)) !== null && _a !== void 0 ? _a : '') + " " + ((_b = DayjsTimeString(valueTime)) !== null && _b !== void 0 ? _b : ''))) !== null && _c !== void 0 ? _c : ''; };
var DayjsID = function (value, offsetHours) {
    if (value === void 0) { value = null; }
    if (offsetHours === void 0) { offsetHours = 5; }
    return DayjsFormatString(value !== null && value !== void 0 ? value : dayjs().subtract(offsetHours, 'hours'), "YYYY-MM-DD_HH-mm-ss", false);
};
var IANAZoneAbbr = function (ianaValue) { return dayjs.tz(ianaValue).format('z'); };
var DayjsAddWeekDays = function (weekDays, value) {
    var _a;
    var newDayjs = ((_a = DayjsFromString(value)) !== null && _a !== void 0 ? _a : dayjs()).startOf('day');
    while (newDayjs.isoWeekday() >= 5) {
        newDayjs.add(1, 'day');
    }
    newDayjs.add(Math.floor(weekDays / 5), 'weeks');
    var days = weekDays % 5;
    if (newDayjs.isoWeekday() + days >= 6)
        days += 2;
    newDayjs.add(days, 'days');
    return newDayjs;
};
var DayjsWeekDays = function (startDate, endDate) {
    var _a, _b;
    var start = (_a = DayjsFromString(startDate)) !== null && _a !== void 0 ? _a : DayjsFromString(dayjs().subtract(5, 'hours'));
    var end = (_b = DayjsFromString(endDate)) !== null && _b !== void 0 ? _b : DayjsFromString(dayjs().subtract(5, 'hours'));
    if (!start || !end)
        return 0;
    while (start.isoWeekday() >= 5) {
        start.add(1, 'day');
    }
    while (end.isoWeekday() > 5) {
        end.subtract(1, 'day');
    }
    var weeks = end.startOf('day').diff(start.startOf('day'), 'weeks');
    var weekDays = weeks * 5;
    var checkDate = start.add(weeks, 'weeks');
    while (checkDate.isBefore(end, 'day')) {
        checkDate.add(1, 'day');
        if (checkDate.isoWeekday() <= 5) {
            weekDays++;
        }
    }
    return weekDays;
};
var DateICS = function (date) {
    var dayJSObject = DayjsFromString(date);
    if (!dayJSObject || !dayJSObject.isValid())
        return null;
    var dateICS = dayJSObject.toISOString();
    var decimal = dateICS.indexOf('.');
    var zed = dateICS.indexOf('Z');
    if (decimal > 0 && zed > decimal) {
        dateICS = dateICS.substring(0, decimal) + dateICS.substring(zed);
    }
    dateICS = ReplaceAll('-', '', dateICS);
    dateICS = ReplaceAll(':', '', dateICS);
    return dateICS;
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
            if (!!original && original[name] === value) {
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
    var _a, _b;
    var result = __assign({}, original);
    for (var key in propsToRemove) {
        if (propsToRemove.hasOwnProperty(key)) {
            if (typeof propsToRemove[key] === 'object' || typeof result[key] === 'object') {
                if ((!propsToRemove[key] && !result[key]) || JSON.stringify((_a = propsToRemove[key]) !== null && _a !== void 0 ? _a : {}) !== JSON.stringify((_b = result[key]) !== null && _b !== void 0 ? _b : {})) {
                    delete result[key];
                }
            }
            else if (propsToRemove[key] === result[key]) {
                delete result[key];
            }
            else {
                var pTRM = DayjsFormatString(propsToRemove[key], 'YYYY-MM-DD HH:mm:ss', true);
                if (!!pTRM) {
                    var rM = DayjsFormatString(result[key], 'YYYY-MM-DD HH:mm:ss', true);
                    if (!!rM) {
                        if (pTRM === rM) {
                            delete result[key];
                        }
                    }
                }
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
    var EscapeText = function (text) { return ReplaceAll('\r\n', '\\n', ReplaceAll('\n', '\\n', ReplaceAll('\r', '\\n', ReplaceAll(',', '\\,', ReplaceAll(';', '\\;', ReplaceAll('\\', '\\\\', text)))))); };
    ICS.VEVENT_Text = function (event) {
        var event_text = '';
        event_text += 'BEGIN:VEVENT\n';
        // event_text += 'CLASS:PUBLIC\n'
        // event_text += 'CREATED;' + DateICS(event.dateTimeCreated) + '\n'
        event_text += 'DESCRIPTION: ' + EscapeText(event.description) + '\n';
        event_text += 'DTSTART;' + DateICS(event.dateTimeStart) + '\n';
        if (!!event.durationMinutes) {
            event_text += 'DURATION:PT' + event.durationMinutes + 'M\n';
        }
        else if (!!event.dateTimeEnd) {
            event_text += 'DTEND;' + DateICS(event.dateTimeEnd) + '\n';
        }
        // event_text += 'DTSTAMP;' + DateICS() + '\n'
        // if (!!event.organizerName && !!event.organizerEmail) {
        // 	event_text += `ORGANIZER;CN=${event.organizerName}:MAILTO:${event.organizerEmail}\n`
        // }
        // event_text += 'LAST-MODIFIED;' + DateICS(event.dateTimeModified ?? new Date().toISOString()) + '\n'
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
        event_text += 'SEQUENCE:3\n';
        //		event += "SUMMARY;LANGUAGE=en-us:" + subject + "\n"
        event_text += 'SUMMARY:' + EscapeText(event.subject) + '\n';
        // event_text += 'TRANSP:OPAQUE\n'
        // event_text += 'UID:' + event.UID + '\n'
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
exports.AnyDateValueIsObject = AnyDateValueIsObject;
exports.ArrayToGuidString = ArrayToGuidString;
exports.ArrayWithIDChanges = ArrayWithIDChanges;
exports.ChangeValueChanges = ChangeValueChanges;
exports.CleanNumber = CleanNumber;
exports.CleanNumberNull = CleanNumberNull;
exports.CleanScripts = CleanScripts;
exports.ConsoleColor = ConsoleColor;
exports.DAYJS_FORMAT_DATE = DAYJS_FORMAT_DATE;
exports.DAYJS_FORMAT_DATE_DISPLAY = DAYJS_FORMAT_DATE_DISPLAY;
exports.DAYJS_FORMAT_DATE_DISPLAY_DOW = DAYJS_FORMAT_DATE_DISPLAY_DOW;
exports.DAYJS_FORMAT_DATE_DISPLAY_DOW_LONG = DAYJS_FORMAT_DATE_DISPLAY_DOW_LONG;
exports.DAYJS_FORMAT_DATE_DISPLAY_LONG = DAYJS_FORMAT_DATE_DISPLAY_LONG;
exports.DAYJS_FORMAT_DATE_TIME = DAYJS_FORMAT_DATE_TIME;
exports.DAYJS_FORMAT_DATE_TIME_DISPLAY = DAYJS_FORMAT_DATE_TIME_DISPLAY;
exports.DAYJS_FORMAT_DATE_TIME_DISPLAY_DOW = DAYJS_FORMAT_DATE_TIME_DISPLAY_DOW;
exports.DAYJS_FORMAT_DATE_TIME_DISPLAY_DOW_LONG = DAYJS_FORMAT_DATE_TIME_DISPLAY_DOW_LONG;
exports.DAYJS_FORMAT_DATE_TIME_DISPLAY_LONG = DAYJS_FORMAT_DATE_TIME_DISPLAY_LONG;
exports.DAYJS_FORMAT_TIME_DISPLAY = DAYJS_FORMAT_TIME_DISPLAY;
exports.DAYJS_FORMAT_TIME_NO_SECONDS = DAYJS_FORMAT_TIME_NO_SECONDS;
exports.DAYJS_FORMAT_TIME_SECONDS = DAYJS_FORMAT_TIME_SECONDS;
exports.DataToCSVExport = DataToCSVExport;
exports.DataToCSVExportNoQuotes = DataToCSVExportNoQuotes;
exports.DateAndTimeToDateTime = DateAndTimeToDateTime;
exports.DateICS = DateICS;
exports.DayjsAddWeekDays = DayjsAddWeekDays;
exports.DayjsCurrentTimeZone = DayjsCurrentTimeZone;
exports.DayjsCurrentTimeZoneOlson = DayjsCurrentTimeZoneOlson;
exports.DayjsDateString = DayjsDateString;
exports.DayjsDateTimeString = DayjsDateTimeString;
exports.DayjsDisplayDayDate = DayjsDisplayDayDate;
exports.DayjsDisplayDayDateDoW = DayjsDisplayDayDateDoW;
exports.DayjsDisplayDayDateTime = DayjsDisplayDayDateTime;
exports.DayjsDisplayDayDateTimeDoW = DayjsDisplayDayDateTimeDoW;
exports.DayjsDisplayTime = DayjsDisplayTime;
exports.DayjsDurationLongText = DayjsDurationLongText;
exports.DayjsDurationShortText = DayjsDurationShortText;
exports.DayjsDurationShortTextAligned = DayjsDurationShortTextAligned;
exports.DayjsFormatString = DayjsFormatString;
exports.DayjsFromString = DayjsFromString;
exports.DayjsID = DayjsID;
exports.DayjsStringToDateLocale = DayjsStringToDateLocale;
exports.DayjsTimeString = DayjsTimeString;
exports.DayjsWeekDays = DayjsWeekDays;
exports.DeepEqual = DeepEqual;
exports.DigitsNth = DigitsNth;
exports.DisplayNameFromFL = DisplayNameFromFL;
exports.DisplayNameFromObject = DisplayNameFromObject;
exports.DisplayTZItem = DisplayTZItem;
exports.DurationLongText = DurationLongText;
exports.DurationShortText = DurationShortText;
exports.EvaluateCondition = EvaluateCondition;
exports.EvaluateString = EvaluateString;
exports.FormUrlEncoded = FormUrlEncoded;
exports.FormatExternalURL = FormatExternalURL;
exports.FormatPhoneNumber = FormatPhoneNumber;
exports.FormatPhoneNumberDots = FormatPhoneNumberDots;
exports.FormatZip = FormatZip;
exports.GenerateUUID = GenerateUUID;
exports.GetStage = GetStage;
exports.GetStageName = GetStageName;
exports.GoogleMapsAddressLink = GoogleMapsAddressLink;
exports.GoogleMapsGPSLink = GoogleMapsGPSLink;
exports.HTMLToText = HTMLToText;
exports.IANAZoneAbbr = IANAZoneAbbr;
exports.IsDateString = IsDateString;
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
exports.NowISOString = NowISOString;
exports.ObjectContainsSearch = ObjectContainsSearch;
exports.ObjectContainsSearchTerms = ObjectContainsSearchTerms;
exports.ObjectDiffs = ObjectDiffs;
exports.ObjectToJSONString = ObjectToJSONString;
exports.ObjectWithChanges = ObjectWithChanges;
exports.OmitProperty = OmitProperty;
exports.PagesForRange = PagesForRange;
exports.RandomString = RandomString;
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
exports.StringToByteArray = StringToByteArray;
exports.TermsToSearch = TermsToSearch;
exports.TextToHTML = TextToHTML;
exports.TimeZoneOlsons = TimeZoneOlsons;
exports.ToArray = ToArray;
exports.ToCamelCase = ToCamelCase;
exports.ToCurrency = ToCurrency;
exports.ToCurrencyBlank = ToCurrencyBlank;
exports.ToCurrencyDash = ToCurrencyDash;
exports.ToDigits = ToDigits;
exports.ToDigitsBlank = ToDigitsBlank;
exports.ToDigitsDash = ToDigitsDash;
exports.ToID = ToID;
exports.ToKebabCase = ToKebabCase;
exports.ToPascalCase = ToPascalCase;
exports.ToPercent = ToPercent;
exports.ToPercentBlank = ToPercentBlank;
exports.ToPercentDash = ToPercentDash;
exports.ToSnakeCase = ToSnakeCase;
exports.ToStringArray = ToStringArray;
exports.ToUpperCaseWords = ToUpperCaseWords;
exports.Trunc = Trunc;
exports.UCWords = UCWords;
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
