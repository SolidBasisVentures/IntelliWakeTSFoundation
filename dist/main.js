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
    if (recursive === void 0) { recursive = false; }
    if (!value || !remove)
        return '';
    var arrayRemove = ToArray(remove);
    var newValue = value;
    do {
        for (var _i = 0, arrayRemove_1 = arrayRemove; _i < arrayRemove_1.length; _i++) {
            var aRemove = arrayRemove_1[_i];
            if (newValue.startsWith(aRemove)) {
                newValue = newValue.substring(aRemove.length);
            }
        }
    } while (recursive && arrayRemove.some(function (aRemove) { return newValue.startsWith(aRemove); }));
    return newValue;
}
function RemoveEnding(remove, value, recursive) {
    if (recursive === void 0) { recursive = false; }
    if (!value || !remove)
        return '';
    var arrayRemove = ToArray(remove);
    var newValue = value;
    do {
        for (var _i = 0, arrayRemove_2 = arrayRemove; _i < arrayRemove_2.length; _i++) {
            var aRemove = arrayRemove_2[_i];
            if (newValue.endsWith(aRemove)) {
                newValue = newValue.substring(0, newValue.length - aRemove.length);
            }
        }
    } while (recursive && arrayRemove.some(function (aRemove) { return newValue.endsWith(aRemove); }));
    return newValue;
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
 * @param text
 * @param count
 * @param showNumber
 * @constructor
 */
var AddS = function (text, count, showNumber) {
    if (showNumber === void 0) { showNumber = false; }
    return !text ? '' : ((showNumber ? ToDigits(count !== null && count !== void 0 ? count : 0) : '') + " " + text + (CleanNumber(count !== null && count !== void 0 ? count : 0) !== 1 ? 's' : '')).trim();
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
var CurrentTimeZone = function () { return Intl.DateTimeFormat().resolvedOptions().timeZone; };
var IANAOffset = function (timeZone) {
    if (!timeZone)
        return new Date().getTimezoneOffset();
    var date = new Date();
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
    str = date.toLocaleString(['nl-NL'], { day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false });
    var myLocale = objFromStr(str);
    var amsterdamOffset = other.day * 24 * 60 + other.hour * 60 + other.minute;
    var myLocaleOffset = myLocale.day * 24 * 60 + myLocale.hour * 60 + myLocale.minute;
    return myLocaleOffset - amsterdamOffset + date.getTimezoneOffset();
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
var StringHasTimeZoneData = function (value) { return value === 'now' || value === 'today' || value.includes('T') || value.substr(15).includes('Z') || value.includes('+') || value.substr(15).includes('-'); };
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
        var nextMatch = date.match(new RegExp(regexp));
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
    dateObj.setUTCMilliseconds((CleanNumber(((_d = d[12]) !== null && _d !== void 0 ? _d : 0).toString().padEnd(3, '0').substr(0, 3))));
    // }
    var offset = 0;
    if (d[14]) {
        offset = (CleanNumber(d[16]) * 60) + parseInt(d[17], 10);
        offset *= ((d[15] === '-') ? 1 : -1);
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
            offset -= CleanNumber(last3);
            // console.log('Offset', dateObj, offset)
        }
    }
    // console.log(date, d, dateObj, offset)
    // console.log('offset', dateObj, offset, dateObj.getTime())
    var time = dateObj.valueOf() + (offset * 60 * 60 * 1000);
    var newDateObj = new Date(time);
    if (!newDateObj)
        return null;
    return newDateObj.valueOf();
};
var DateParseTSInternal = function (date, timezoneSource) {
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
        if (!StringHasTimeZoneData(date)) {
            // console.log('Here', date, (IANAOffset(timezoneSource) ?? 0), (IANAOffset() ?? 0))
            // console.log('Processing', date, timezoneSource, DateISO(result), DateISO(result + (((IANAOffset(timezoneSource) ?? 0) - (IANAOffset() ?? 0)) * 60 * 1000)))
            result += (((_b = IANAOffset(timezoneSource)) !== null && _b !== void 0 ? _b : 0) * 60 * 1000);
            // result += (((IANAOffset(timezoneSource) ?? 0) - (IANAOffset() ?? 0)) * 60 * 1000)
        }
        return result;
    }
    catch (_c) {
        return null;
    }
};
var DateParseTS = function (date, adjustements) {
    var newDate = DateParseTSInternal(date, adjustements === null || adjustements === void 0 ? void 0 : adjustements.timezoneSource);
    if (!newDate || !adjustements)
        return newDate;
    return DateAdjustTS(newDate, adjustements);
};
var DateISO = function (date, adjustements) {
    var parsed = DateParseTS(date, adjustements);
    if (!parsed)
        return null;
    return new Date(parsed).toISOString();
};
var DateObject = function (date, adjustements) {
    var parsed = DateParseTS(date, adjustements);
    if (!parsed)
        return null;
    return new Date(parsed);
};
var DateICS = function (date, adjustements) {
    var dateISO = DateISO(date, adjustements);
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
    var _a, _b, _c;
    var noTZInfo = typeof date === 'string' && !StringHasTimeZoneData(date);
    var dateObject = DateObject(DateParseTSInternal(date, noTZInfo ? timezoneSource : undefined));
    // console.log('DFA', date, dateObject)
    if (timezoneDisplay) {
        try {
            if (!dateObject || dateObject.valueOf() === 0)
                return null;
            var sourceOffset = (_a = IANAOffset(timezoneSource)) !== null && _a !== void 0 ? _a : 0; // Chic 5
            var displayOffset = (_b = IANAOffset(timezoneDisplay)) !== null && _b !== void 0 ? _b : 0; // Chic 6
            var offset = noTZInfo ?
                !timezoneSource ?
                    (displayOffset - sourceOffset) - (displayOffset - sourceOffset) :
                    (((_c = IANAOffset()) !== null && _c !== void 0 ? _c : 0) - sourceOffset) - (displayOffset - sourceOffset) :
                (sourceOffset - displayOffset);
            // console.log(date, dateObject, sourceOffset, displayOffset, offset, noTZInfo)
            // if (timezoneDisplay === 'America/Los_Angeles' && timezoneSource === 'America/Chicago')
            // console.log('---')
            // 	console.log(noTZInfo, date, dateObject, sourceOffset/60, displayOffset/60, (IANAOffset() ?? 0) / 60, offset / 60)
            dateObject = DateObject(dateObject, { minutes: offset });
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
                return dateApply.getFullYear().toString();
            case 'YY':
                return dateApply.getFullYear().toString().substr(2);
            case 'Q':
                return (Math.ceil((dateApply.getMonth() + 1) / 3)).toString();
            case 'Qo':
                return (_a = DigitsNth((Math.ceil((dateApply.getMonth() + 1) / 3)))) !== null && _a !== void 0 ? _a : '';
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
                return ((_j = WeekDays[dateApply.getDay()]) !== null && _j !== void 0 ? _j : '');
            case 'HH':
                return dateApply.getHours().toString().padStart(2, '0');
            case 'H':
                return dateApply.getHours().toString();
            case 'hh':
                return (dateApply.getHours() > 12 ? dateApply.getHours() - 12 : dateApply.getHours()).toString().padStart(2, '0');
            case 'h': {
                var hour = (dateApply.getHours() > 12 ? dateApply.getHours() - 12 : dateApply.getHours());
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
            useFormat = 'MM/DD/YYYY';
            break;
        case 'LocalDow':
            useFormat = 'dd, MM/DD/YYYY';
            break;
        case 'LocalDateTime':
            useFormat = 'MM/DD/YYYY h:mm a';
            break;
        case 'LocalDoWTime':
            useFormat = 'dd, MM/DD/YYYY h:mm a';
            break;
        case 'Date':
            useFormat = DATE_FORMAT_DATE;
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
            if (formatChar === previousChar || previousChar === '' || (command.length > 0 &&
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
    for (var _i = 0, formatArray_1 = formatArray; _i < formatArray_1.length; _i++) {
        var formatChar = formatArray_1[_i];
        _loop_1(formatChar);
    }
    result += applyCommand(command, dateObject);
    return result;
};
var DateFormat = function (format, date, timezoneDisplay, timezoneSource) {
    return DateFormatAny(format, date, timezoneDisplay, timezoneSource);
};
var YYYYMMDDHHmmss = function (date) {
    var _a;
    var dateObject = (_a = DateObject(date)) !== null && _a !== void 0 ? _a : new Date();
    return "" + dateObject.getFullYear() + (dateObject.getMonth() + 1).toString().padStart(2, '0') + dateObject.getDate().toString().padStart(2, '0') + dateObject.getHours().toString().padStart(2, '0') + dateObject.getMinutes().toString().padStart(2, '0') + dateObject.getSeconds().toString().padStart(2, '0');
};
var YYYY_MM_DD_HH_mm_ss = function (date) {
    var _a;
    var dateObject = (_a = DateObject(date)) !== null && _a !== void 0 ? _a : new Date();
    return dateObject.getFullYear() + "-" + (dateObject.getMonth() + 1).toString().padStart(2, '0') + "-" + dateObject.getDate().toString().padStart(2, '0') + "_" + dateObject.getHours().toString().padStart(2, '0') + "-" + dateObject.getMinutes().toString().padStart(2, '0') + "-" + dateObject.getSeconds().toString().padStart(2, '0');
};
var YYYYsMMsDDsHHcmmcss = function (date) {
    var _a;
    var dateObject = (_a = DateObject(date)) !== null && _a !== void 0 ? _a : new Date();
    return dateObject.getFullYear() + "/" + (dateObject.getMonth() + 1).toString().padStart(2, '0') + "/" + dateObject.getDate().toString().padStart(2, '0') + " " + dateObject.getHours().toString().padStart(2, '0') + ":" + dateObject.getMinutes().toString().padStart(2, '0') + ":" + dateObject.getSeconds().toString().padStart(2, '0');
};
var YYYYsMMsDD = function (date) {
    var _a;
    var dateObject = (_a = DateObject(date)) !== null && _a !== void 0 ? _a : new Date();
    return dateObject.getFullYear() + "/" + (dateObject.getMonth() + 1).toString().padStart(2, '0') + "/" + dateObject.getDate().toString().padStart(2, '0');
};
var HHcmmcss = function (date) {
    var _a;
    var dateObject = (_a = DateObject(date)) !== null && _a !== void 0 ? _a : new Date();
    return dateObject.getHours().toString().padStart(2, '0') + ":" + dateObject.getMinutes().toString().padStart(2, '0') + ":" + dateObject.getSeconds().toString().padStart(2, '0');
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
var WeekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];
var TSYearsEstimate = function (ts) { return Math.floor(ts / 365 / 24 / 60 / 60 / 1000); };
var TSMonthsEstimate = function (ts, withinYear) { return Math.floor((ts - (withinYear ? (TSYearsEstimate(ts) * 365 * 24 * 60 * 60 * 1000) : 0)) / 30 / 24 / 60 / 60 / 1000); };
var TSWeeks = function (ts) { return Math.floor(ts / 7 / 24 / 60 / 60 / 1000); };
var TSDays = function (ts, withinMonth) { return Math.floor((ts - (withinMonth ? (TSMonthsEstimate(ts) * 30 * 24 * 60 * 60 * 1000) : 0)) / 24 / 60 / 60 / 1000); };
var TSHours = function (ts, withinDay) { return Math.floor((ts - (withinDay ? (TSDays(ts) * 24 * 60 * 60 * 1000) : 0)) / 60 / 60 / 1000); };
var TSMinutes = function (ts, withinHour) { return Math.floor((ts - (withinHour ? (TSHours(ts) * 60 * 60 * 1000) : 0)) / 60 / 1000); };
var TSSeconds = function (ts, withinMinute) { return Math.floor((ts - (withinMinute ? (TSMinutes(ts) * 60 * 1000) : 0)) / 1000); };
var DateIsLeapYear = function (year) { return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); };
var DateDaysInMonth = function (year, month) {
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
    return [31, (DateIsLeapYear(yearCalc) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][monthCalc];
};
var DateAdjustMonthTS = function (date, months) {
    var _a, _b, _c, _d;
    var dateTS = DateParseTSInternal(date);
    if (!dateTS)
        return null;
    var isNegative = months < 0;
    var originalDateObject = (_a = DateObject(date)) !== null && _a !== void 0 ? _a : new Date();
    var originalDate = originalDateObject.getUTCDate();
    var isLastDayOfMonth = originalDate === DateDaysInMonth(originalDateObject.getUTCFullYear(), originalDateObject.getUTCMonth());
    for (var i = 0; i < Math.abs(months); i++) {
        var dateObj = (_b = DateObject(dateTS)) !== null && _b !== void 0 ? _b : new Date();
        var year = dateObj.getUTCFullYear();
        var month = dateObj.getUTCMonth();
        if (isLastDayOfMonth) {
            if (isNegative) {
                dateTS -= 24 * 60 * 60 * 1000 * DateDaysInMonth(year, month);
            }
            else {
                dateTS += 24 * 60 * 60 * 1000 * DateDaysInMonth(year, month + 1);
            }
        }
        else {
            if (isNegative) {
                dateTS -= 24 * 60 * 60 * 1000 * DateDaysInMonth(year, month - 1);
            }
            else {
                dateTS += 24 * 60 * 60 * 1000 * DateDaysInMonth(year, month);
            }
            var currentDate = (_c = DateObject(dateTS)) !== null && _c !== void 0 ? _c : new Date();
            if (currentDate.getUTCDate() < 15 && currentDate.getUTCDate() < originalDate)
                dateTS -= 24 * 60 * 60 * 1000 * currentDate.getUTCDate();
            currentDate = (_d = DateObject(dateTS)) !== null && _d !== void 0 ? _d : new Date();
            var currentDaysInMonth = DateDaysInMonth(currentDate.getUTCFullYear(), currentDate.getUTCMonth());
            if (currentDate.getUTCDate() > 15 && currentDate.getUTCDate() < originalDate && currentDate.getUTCDate() < currentDaysInMonth)
                dateTS += 24 * 60 * 60 * 1000 * ((currentDaysInMonth > originalDate ? originalDate : currentDaysInMonth) - currentDate.getUTCDate());
        }
    }
    return dateTS;
};
var DateAdjustTS = function (date, adjustments) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
    var dateTS = DateParseTSInternal(date);
    for (var _i = 0, _8 = Object.keys(adjustments); _i < _8.length; _i++) {
        var key = _8[_i];
        if (!dateTS)
            return null;
        switch (key) {
            case 'year':
            case 'years':
                switch (adjustments[key]) {
                    case 'StartOf':
                        {
                            var dateObj = (_a = DateObject(dateTS)) !== null && _a !== void 0 ? _a : new Date();
                            dateTS = (_b = DateAdjustTS(dateTS, {
                                month: dateObj.getUTCMonth() * -1,
                                months: 'StartOf'
                            })) !== null && _b !== void 0 ? _b : 0;
                        }
                        break;
                    case 'EndOf':
                        {
                            var dateObj = (_c = DateObject(dateTS)) !== null && _c !== void 0 ? _c : new Date();
                            dateTS = (_d = DateAdjustTS(dateTS, {
                                month: 11 - dateObj.getUTCMonth(),
                                months: 'EndOf'
                            })) !== null && _d !== void 0 ? _d : 0;
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
                            var dateObj = (_e = DateObject(dateTS)) !== null && _e !== void 0 ? _e : new Date();
                            dateTS = (_f = DateAdjustTS(dateTS, {
                                day: (dateObj.getUTCDate() - 1) * -1,
                                days: 'StartOf'
                            })) !== null && _f !== void 0 ? _f : 0;
                        }
                        break;
                    case 'EndOf':
                        {
                            var dateObj = (_g = DateObject(dateTS)) !== null && _g !== void 0 ? _g : new Date();
                            dateTS = (_h = DateAdjustTS(dateTS, {
                                day: DateDaysInMonth(dateObj.getUTCFullYear(), dateObj.getUTCMonth()) - (dateObj.getUTCDate()),
                                days: 'EndOf'
                            })) !== null && _h !== void 0 ? _h : 0;
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
                            var dateObj = (_j = DateObject(dateTS)) !== null && _j !== void 0 ? _j : new Date();
                            dateTS = (_k = DateAdjustTS(dateTS, {
                                month: (dateObj.getUTCMonth() % 3) * -1,
                                months: 'StartOf'
                            })) !== null && _k !== void 0 ? _k : 0;
                        }
                        break;
                    case 'EndOf':
                        {
                            var dateObj = (_l = DateObject(dateTS)) !== null && _l !== void 0 ? _l : new Date();
                            dateTS = (_m = DateAdjustTS(dateTS, {
                                month: 2 - (dateObj.getUTCMonth() % 3),
                                months: 'EndOf'
                            })) !== null && _m !== void 0 ? _m : 0;
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
                                    var dateObj = (_o = DateObject(dateTS)) !== null && _o !== void 0 ? _o : new Date();
                                    dateTS = (_p = DateAdjustTS(dateTS, {
                                        day: dateObj.getUTCDay() * -1,
                                        days: 'StartOf'
                                    })) !== null && _p !== void 0 ? _p : 0;
                                }
                                break;
                            case 'EndOf':
                                {
                                    var dateObj = (_q = DateObject(dateTS)) !== null && _q !== void 0 ? _q : new Date();
                                    dateTS = (_r = DateAdjustTS(dateTS, {
                                        day: 6 - dateObj.getUTCDay(),
                                        days: 'EndOf'
                                    })) !== null && _r !== void 0 ? _r : 0;
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
                                    var dateObj = (_s = DateObject(dateTS)) !== null && _s !== void 0 ? _s : new Date();
                                    dateTS = (_t = DateAdjustTS(dateTS, {
                                        hour: dateObj.getUTCHours() * -1,
                                        hours: 'StartOf'
                                    })) !== null && _t !== void 0 ? _t : 0;
                                }
                                break;
                            case 'EndOf':
                                {
                                    var dateObj = (_u = DateObject(dateTS)) !== null && _u !== void 0 ? _u : new Date();
                                    dateTS = (_v = DateAdjustTS(dateTS, {
                                        hour: 23 - dateObj.getUTCHours(),
                                        hours: 'EndOf'
                                    })) !== null && _v !== void 0 ? _v : 0;
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
                                    var dateObj = (_w = DateObject(dateTS)) !== null && _w !== void 0 ? _w : new Date();
                                    dateTS = (_x = DateAdjustTS(dateTS, {
                                        minute: dateObj.getUTCMinutes() * -1,
                                        minutes: 'StartOf'
                                    })) !== null && _x !== void 0 ? _x : 0;
                                }
                                break;
                            case 'EndOf':
                                {
                                    var dateObj = (_y = DateObject(dateTS)) !== null && _y !== void 0 ? _y : new Date();
                                    dateTS = (_z = DateAdjustTS(dateTS, {
                                        minute: 59 - dateObj.getUTCMinutes(),
                                        minutes: 'EndOf'
                                    })) !== null && _z !== void 0 ? _z : 0;
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
                                    var dateObj = (_0 = DateObject(dateTS)) !== null && _0 !== void 0 ? _0 : new Date();
                                    dateTS = (_1 = DateAdjustTS(dateTS, {
                                        second: dateObj.getUTCSeconds() * -1,
                                        seconds: 'StartOf'
                                    })) !== null && _1 !== void 0 ? _1 : 0;
                                }
                                break;
                            case 'EndOf':
                                {
                                    var dateObj = (_2 = DateObject(dateTS)) !== null && _2 !== void 0 ? _2 : new Date();
                                    dateTS = (_3 = DateAdjustTS(dateTS, {
                                        second: 59 - dateObj.getUTCSeconds(),
                                        seconds: 'EndOf'
                                    })) !== null && _3 !== void 0 ? _3 : 0;
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
                                    var dateObj = (_4 = DateObject(dateTS)) !== null && _4 !== void 0 ? _4 : new Date();
                                    dateTS = (_5 = DateAdjustTS(dateTS, {
                                        millisecond: dateObj.getUTCMilliseconds() * -1
                                    })) !== null && _5 !== void 0 ? _5 : 0;
                                }
                                break;
                            case 'EndOf':
                                {
                                    var dateObj = (_6 = DateObject(dateTS)) !== null && _6 !== void 0 ? _6 : new Date();
                                    dateTS = (_7 = DateAdjustTS(dateTS, {
                                        millisecond: 999 - dateObj.getUTCMilliseconds()
                                    })) !== null && _7 !== void 0 ? _7 : 0;
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
    return dateTS;
};
var DateDiff = function (dateFrom, dateTo, duration) {
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
var DateWeekNumber = function (date) {
    var _a;
    var currentdate = DateObject(date, { timezoneSource: 'UTC' });
    if (!currentdate)
        return null;
    // console.log(currentdate, currentdate.getUTCFullYear())
    var oneJan = DateObject(currentdate.getUTCFullYear() + "-01-01T00:00:00Z");
    if (!oneJan)
        return null;
    // console.log(oneJan)
    var numberOfDays = (_a = DateDiff(oneJan, currentdate, 'days')) !== null && _a !== void 0 ? _a : 0;
    // console.log('nOD', numberOfDays, currentdate.getDay())
    var weekNumber = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
    if (weekNumber > 52)
        return 1;
    return weekNumber;
};
// export const DateWeekNumber = (date: TDateAny): number | null => {
// 	let dateObject = DateObject(date)
// 	if (!dateObject) return null
//
// 	dateObject.setHours(0, 0, 0, 0)
// 	// Thursday in current week decides the year.
// 	dateObject.setDate((dateObject.getDate() + 3 - (dateObject.getDay() + 6) % 7) + 1)
// 	// January 4 is always in week 1.
// 	const week1 = new Date(dateObject.getFullYear(), 0, 4)
// 	// Adjust to Thursday in week 1 and count number of weeks from date to week1.
// 	const weekNumber = 1 + (Math.round(((dateObject.getTime() - week1.getTime()) / 86400000)
// 		- 3 + (week1.getDay() + 6) % 7) / 7)
//
// 	if (weekNumber > 52) return 1
// 	return weekNumber
// }
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
        text += " " + ToDigits(components.year) + (abbreviated ? 'Y' : (' ' + AddS('Year', components.year)));
        text += " " + ToDigits(components.month) + (abbreviated ? 'Mo' : (' ' + AddS('Month', components.month)));
        if (components.day && !tripToSecondsOrTwo) {
            text += " " + ToDigits(components.day) + (abbreviated ? 'D' : (' ' + AddS('Day', components.day)));
        }
    }
    else if (components.month) {
        text += " " + ToDigits(components.month) + (abbreviated ? 'Mo' : (' ' + AddS('Month', components.month)));
        if (components.day) {
            text += " " + ToDigits(components.day) + (abbreviated ? 'D' : (' ' + AddS('Day', components.day)));
        }
    }
    else if (components.day) {
        text += " " + ToDigits(components.day) + (abbreviated ? 'D' : (' ' + AddS('Day', components.day)));
        if (components.hour) {
            text += " " + ToDigits(components.hour) + (abbreviated ? 'h' : (' ' + AddS('Hour', components.hour)));
        }
        if (components.minute && !tripToSecondsOrTwo) {
            text += " " + ToDigits(components.minute) + (abbreviated ? 'm' : (' ' + AddS('Minute', components.minute)));
        }
    }
    else if (components.hour) {
        text += " " + ToDigits(components.hour) + (abbreviated ? 'h' : (' ' + AddS('Hour', components.hour)));
        if (components.minute) {
            text += " " + ToDigits(components.minute) + (abbreviated ? 'm' : (' ' + AddS('Minute', components.minute)));
        }
    }
    else {
        if (components.minute || (!text && tripToSecondsOrTwo)) {
            text += " " + ToDigits(components.minute) + (abbreviated ? 'm' : (' ' + AddS('Minute', components.minute)));
        }
        if (!text || (!tripToSecondsOrTwo && components.second)) {
            text += " " + ToDigits(components.second) + (abbreviated ? 's' : (' ' + AddS('Second', components.second)));
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
var DateCompare = function (date1, evalType, date2, minInterval) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
    var checkType = function (evalCheck, diff) {
        if (diff === 0)
            return ['IsSame', 'IsSameOrBefore', 'IsSameOrAfter'].includes(evalCheck);
        if (diff > 0)
            return ['IsAfter', 'IsSameOrAfter'].includes(evalCheck);
        return ['IsBefore', 'IsSameOrBefore'].includes(evalCheck);
    };
    var msDifference = ((_a = DateParseTSInternal(date1)) !== null && _a !== void 0 ? _a : 0) - ((_b = DateParseTSInternal(date2)) !== null && _b !== void 0 ? _b : 0);
    if (msDifference === 0) {
        return checkType(evalType, msDifference);
    }
    if (!!minInterval) {
        var yearDiff = ((_d = (_c = DateObject(date1)) === null || _c === void 0 ? void 0 : _c.getUTCFullYear()) !== null && _d !== void 0 ? _d : 0) - ((_f = (_e = DateObject(date2)) === null || _e === void 0 ? void 0 : _e.getUTCFullYear()) !== null && _f !== void 0 ? _f : 0);
        if (['year', 'years'].includes(minInterval)) {
            return checkType(evalType, yearDiff);
        }
        var monthDiff = ((_h = (_g = DateObject(date1)) === null || _g === void 0 ? void 0 : _g.getUTCMonth()) !== null && _h !== void 0 ? _h : 0) - ((_k = (_j = DateObject(date2)) === null || _j === void 0 ? void 0 : _j.getUTCMonth()) !== null && _k !== void 0 ? _k : 0);
        if (['month', 'months'].includes(minInterval)) {
            if (yearDiff !== 0)
                return checkType(evalType, yearDiff);
            return checkType(evalType, monthDiff);
        }
        if (['week', 'weeks'].includes(minInterval)) {
            if (Math.abs(msDifference) > 7 * 24 * 60 * 60 * 1000)
                return checkType(evalType, msDifference);
            var weekDiff = ((_l = DateWeekNumber(date1)) !== null && _l !== void 0 ? _l : 0) - ((_m = DateWeekNumber(date2)) !== null && _m !== void 0 ? _m : 0);
            // Check if in the same week that spans years
            if (weekDiff === 0 && ((_o = DateWeekNumber(date1)) !== null && _o !== void 0 ? _o : 0) === 1 && Math.abs(yearDiff) > 1) {
                if (yearDiff !== 0)
                    return checkType(evalType, yearDiff);
            }
            return checkType(evalType, weekDiff);
        }
        var dateOfMonthDiff = ((_q = (_p = DateObject(date1)) === null || _p === void 0 ? void 0 : _p.getUTCDate()) !== null && _q !== void 0 ? _q : 0) - ((_s = (_r = DateObject(date2)) === null || _r === void 0 ? void 0 : _r.getUTCDate()) !== null && _s !== void 0 ? _s : 0);
        if (['day', 'days'].includes(minInterval)) {
            if (yearDiff !== 0)
                return checkType(evalType, yearDiff);
            if (monthDiff !== 0)
                return checkType(evalType, monthDiff);
            return checkType(evalType, dateOfMonthDiff);
        }
        var hourDiff = ((_u = (_t = DateObject(date1)) === null || _t === void 0 ? void 0 : _t.getUTCHours()) !== null && _u !== void 0 ? _u : 0) - ((_w = (_v = DateObject(date2)) === null || _v === void 0 ? void 0 : _v.getUTCHours()) !== null && _w !== void 0 ? _w : 0);
        if (['hour', 'hours'].includes(minInterval)) {
            if (yearDiff !== 0)
                return checkType(evalType, yearDiff);
            if (monthDiff !== 0)
                return checkType(evalType, monthDiff);
            if (dateOfMonthDiff !== 0)
                return checkType(evalType, dateOfMonthDiff);
            return checkType(evalType, hourDiff);
        }
        var minuteDiff = ((_y = (_x = DateObject(date1)) === null || _x === void 0 ? void 0 : _x.getUTCMinutes()) !== null && _y !== void 0 ? _y : 0) - ((_0 = (_z = DateObject(date2)) === null || _z === void 0 ? void 0 : _z.getUTCMinutes()) !== null && _0 !== void 0 ? _0 : 0);
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
        var secondDiff = ((_2 = (_1 = DateObject(date1)) === null || _1 === void 0 ? void 0 : _1.getUTCSeconds()) !== null && _2 !== void 0 ? _2 : 0) - ((_4 = (_3 = DateObject(date2)) === null || _3 === void 0 ? void 0 : _3.getUTCSeconds()) !== null && _4 !== void 0 ? _4 : 0);
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
    return DateCompare(date1, 'IsBefore', date2, minInterval) ? -1
        : DateCompare(date1, 'IsAfter', date2, minInterval) ? 1
            : null;
};
var SortCompareDate = function (date1, date2, minInterval) { var _a; return (_a = SortCompareDateNull(date1, date2, minInterval)) !== null && _a !== void 0 ? _a : 0; };
(function (EQuarter) {
    EQuarter[EQuarter["Q1"] = 1] = "Q1";
    EQuarter[EQuarter["Q2"] = 2] = "Q2";
    EQuarter[EQuarter["Q3"] = 3] = "Q3";
    EQuarter[EQuarter["Q4"] = 4] = "Q4";
})(exports.EQuarter || (exports.EQuarter = {}));
var DatesQuarter = function (year, quarter) {
    var _a, _b;
    var baseDate = DateParseTSInternal(year + "-" + ((quarter * 3) - 1).toString().padStart(2, '0') + "-01", 'UTC');
    if (!baseDate)
        return null;
    return {
        start: ((_a = DateISO(baseDate, { quarter: 'StartOf' })) !== null && _a !== void 0 ? _a : '').substr(0, 10),
        end: ((_b = DateISO(baseDate, { quarter: 'EndOf' })) !== null && _b !== void 0 ? _b : '').substr(0, 10)
    };
};
var initialDateQuarter = function () { return ({
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

function isObject(object) {
    return object !== null && object !== undefined && typeof object === 'object';
}
var DeepEqual = function (object1, object2) {
    var _a, _b;
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
exports.DateAdjustTS = DateAdjustTS;
exports.DateCompare = DateCompare;
exports.DateDiff = DateDiff;
exports.DateDiffComponents = DateDiffComponents;
exports.DateDiffLongDescription = DateDiffLongDescription;
exports.DateFormat = DateFormat;
exports.DateFormatAny = DateFormatAny;
exports.DateICS = DateICS;
exports.DateISO = DateISO;
exports.DateObject = DateObject;
exports.DateParseTS = DateParseTS;
exports.DateQuarter = DateQuarter;
exports.DateWeekNumber = DateWeekNumber;
exports.DatesQuarter = DatesQuarter;
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
exports.IANAOffset = IANAOffset;
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
exports.ManualParse = ManualParse;
exports.MonthNames = MonthNames;
exports.NowISOString = NowISOString;
exports.ObjectContainsSearch = ObjectContainsSearch;
exports.ObjectContainsSearchTerms = ObjectContainsSearchTerms;
exports.ObjectDiffs = ObjectDiffs;
exports.ObjectToJSONString = ObjectToJSONString;
exports.ObjectWithChanges = ObjectWithChanges;
exports.OmitProperty = OmitProperty;
exports.PagesForRange = PagesForRange;
exports.PhoneComponents = PhoneComponents;
exports.PickProperty = PickProperty;
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
exports.SortColumnUpdate = SortColumnUpdate;
exports.SortColumns = SortColumns;
exports.SortCompare = SortCompare;
exports.SortCompareDate = SortCompareDate;
exports.SortCompareDateNull = SortCompareDateNull;
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
exports.initialDateQuarter = initialDateQuarter;
exports.initialFilterSortPaginator = initialFilterSortPaginator;
exports.initialIDChanges = initialIDChanges;
exports.initialSortColumn = initialSortColumn;
exports.isAB = isAB;
exports.someAsync = someAsync;
exports.str2ab = str2ab;
