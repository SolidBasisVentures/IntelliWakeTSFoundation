'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var moment = _interopDefault(require('moment'));

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

var initialChanges = {};
var initialIDChanges = {};
var ToSnakeCase = function (str) {
    if (str === 'ID')
        return 'id';
    var calcStr = str.replace('ID', '_id');
    return (calcStr[0].toLowerCase() +
        calcStr.slice(1, calcStr.length).replace(/[A-Z1-9]/g, function (letter) { return "_" + letter.toLowerCase(); }));
};
function PagesForRange(current, length, spread) {
    if (spread === void 0) { spread = 2; }
    if (!(length > 0)) {
        return [];
    }
    var current_adjusted = current < 1 ? 1 : current > length ? length : current;
    var spread_adjusted = current < spread || current > length - spread ? spread : Math.ceil(spread / 2);
    var left = current_adjusted - spread_adjusted, right = current_adjusted + spread_adjusted, range = [], rangeWithNull = [], l;
    for (var i = 1; i <= length; i++) {
        if (i === 1 || i === length || (i >= left && i <= right)) {
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
var DataToCSVExport = function (filename, csvData) {
    var csvString = csvData
        .map(function (row) {
        return row
            .map(function (item) {
            return typeof item === 'string' ? '"' + ReplaceAll('"', '""', item) + '"' : (item !== null && item !== void 0 ? item : '').toString();
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
var JSONParse = function (json) {
    if (!json) {
        return null;
    }
    var returnObj = null;
    try {
        returnObj = JSON.parse(json);
    }
    catch (err) {
        console.log('JSONParse', err);
    }
    return returnObj;
};
var ReplaceAll = function (find, replace, subject) {
    // eslint-disable-next-line no-useless-escape
    return subject.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'), 'g'), replace);
};
var ReplaceLinks = function (subject) {
    var str = subject.replace(/(?:\r\n|\r|\n)/g, '<br />');
    // noinspection HtmlUnknownTarget
    var target = "<a href='$1' target='_blank'>$1</a>";
    // noinspection RegExpRedundantEscape
    return str.replace(/(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/gi, target);
};
var CleanScripts = function (subject) {
    return subject.replace(/<.*?script.*?>.*?<\/.*?script.*?>/gim, '');
};
var TextToHTML = function (subject) {
    var str = subject.replace(/(<([^>]+)>)/gi, '');
    return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
};
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
var Trunc = function (subject, length) {
    return subject.length > length ? subject.substr(0, length - 1) + '&hellip;' : subject;
};
var CleanNumber = function (value) {
    if (!value)
        return 0;
    var str = value.toString();
    str = ReplaceAll('$', '', str);
    str = ReplaceAll(',', '', str);
    str = ReplaceAll('%', '', str);
    if (isNaN(str))
        return NaN;
    return parseFloat(str);
};
var ToCurrency = function (value, decimals) {
    if (decimals === void 0) { decimals = 2; }
    return ('$' +
        CleanNumber(value).toLocaleString(undefined, {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals
        }));
};
var ToPercent = function (value, decimals) {
    if (decimals === void 0) { decimals = 0; }
    return ((CleanNumber(value) * 100).toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
    }) + '%');
};
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
var ToDigits = function (value, decimals) {
    if (decimals === void 0) { decimals = 2; }
    return CleanNumber(value).toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
    });
};
var ToDigitsBlank = function (value, decimals) {
    if (decimals === void 0) { decimals = 2; }
    if (!value || isNaN(value) || CleanNumber(value) === 0) {
        return '';
    }
    return CleanNumber(value).toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
    });
};
var ToDigitsDash = function (value, decimals) {
    if (decimals === void 0) { decimals = 2; }
    if (!value || isNaN(value) || CleanNumber(value) === 0) {
        return '-';
    }
    return CleanNumber(value).toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
    });
};
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
var HasPathComponent = function (search) {
    var searchCalc = search.toLowerCase();
    if (!searchCalc.startsWith('/')) {
        searchCalc = '/' + searchCalc;
    }
    if (!searchCalc.endsWith('/')) {
        searchCalc += '/';
    }
    var pathName = window.location.pathname.toLowerCase();
    if (!pathName.endsWith('/')) {
        pathName += '/';
    }
    return pathName.indexOf(searchCalc) >= 0;
};
var GetPathComponentAfter = function (search) {
    var searchCalc = search.toLowerCase();
    if (!searchCalc.endsWith('/')) {
        searchCalc += '/';
    }
    var startPos = window.location.pathname.toLowerCase().indexOf(searchCalc);
    if (startPos >= 0) {
        var after = window.location.pathname.substr(startPos + searchCalc.length);
        var slashPos = after.toLowerCase().indexOf('/');
        if (slashPos >= 0) {
            return after.substring(0, slashPos);
        }
        else {
            return after;
        }
    }
    return undefined;
};
var GetPathThrough = function (search) {
    var searchCalc = search.toLowerCase();
    var startPosSlash = window.location.pathname.toLowerCase().lastIndexOf(searchCalc + '/');
    if (startPosSlash >= 0) {
        return window.location.pathname.substr(0, startPosSlash + searchCalc.length);
    }
    var startPosNoSlash = window.location.pathname.toLowerCase().lastIndexOf(searchCalc);
    if (startPosNoSlash >= 0) {
        var possibleComplete = window.location.pathname.substr(0, startPosNoSlash + searchCalc.length);
        if (possibleComplete.length === window.location.pathname.length) {
            return possibleComplete;
        }
    }
    return undefined;
};
var CaptureGPS = function () {
    return new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    resolve(position);
                }, function () {
                    resolve(null);
                });
            }
            else {
                resolve(null);
            }
            return [2 /*return*/];
        });
    }); });
};
var GoogleMapsGPSLink = function (dataArray, prefix) {
    var _a, _b;
    if (prefix === void 0) { prefix = ''; }
    var latitude = (_a = dataArray[prefix + 'latitude']) !== null && _a !== void 0 ? _a : '';
    var longitude = (_b = dataArray[prefix + 'longitude']) !== null && _b !== void 0 ? _b : '';
    return 'http://maps.google.com/maps?q=' + latitude + ',' + longitude;
};
var GoogleMapsAddressLink = function (dataArray, prefix) {
    var _a, _b, _c, _d;
    if (prefix === void 0) { prefix = ''; }
    var address = ((_a = dataArray[prefix + 'address1']) !== null && _a !== void 0 ? _a : '') + ' ';
    if (dataArray[prefix + 'address2']) {
        address += dataArray[prefix + 'address2'] + ' ';
    }
    address += ((_b = dataArray[prefix + 'city']) !== null && _b !== void 0 ? _b : '') + ', ';
    address += ((_c = dataArray[prefix + 'state']) !== null && _c !== void 0 ? _c : '') + ' ';
    address += (_d = dataArray[prefix + 'zip']) !== null && _d !== void 0 ? _d : '';
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(address);
};
var IsValidInputDecimal = function (value) {
    // noinspection RegExpUnexpectedAnchor
    var regEx = new RegExp('/^\\d{1,}(\\.\\d{0,4})?$/');
    return !value || regEx.test(value);
};
var ClassNames = function (classes) {
    var _a;
    return ((_a = Object.keys(classes).filter(function (classitem) { return classes[classitem]; })) !== null && _a !== void 0 ? _a : []).join(' ');
};
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
var FormatZip = function (zip) {
    //Filter only numbers from the input
    var cleaned = ('' + zip).replace(/\D/g, '');
    //Check if the input is of correct
    var match = cleaned.match(/^\d{5}$|^\d{5}-\d{4}$/);
    if (match) {
        return match.join('-');
    }
    return zip;
};
var FormatExternalURL = function (url) {
    if (!!url) {
        if (!url.startsWith('http')) {
            return 'http://' + url;
        }
        return url;
    }
    return '';
};
var initialSortColumn = {
    primarySort: '',
    primaryAscending: true,
    primaryEmptyToBottom: null,
    secondarySort: null,
    secondaryAscending: true,
    secondaryEmptyToBottom: null
};
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
var SortColumnResult = function (valueA, valueB, isAscending, emptyToBottom) {
    if (!!emptyToBottom) {
        if (!valueA && !!valueB)
            return 1;
        if (!!valueA && !valueB)
            return -1;
    }
    var numbA = CleanNumber(valueA);
    var numbB = CleanNumber(valueB);
    if (isNaN(numbA !== null && numbA !== void 0 ? numbA : 0) || isNaN(numbB !== null && numbB !== void 0 ? numbB : 0)) {
        return (valueA !== null && valueA !== void 0 ? valueA : '').localeCompare(valueB !== null && valueB !== void 0 ? valueB : '', undefined, { sensitivity: 'base' }) * (isAscending ? 1 : -1);
    }
    return (numbA - numbB) * (isAscending ? 1 : -1);
};
var SearchTerms = function (search, toLowerCase) {
    if (toLowerCase === void 0) { toLowerCase = true; }
    return (search !== null && search !== void 0 ? search : '')
        .trim()
        .split(/(\s+)/)
        .map(function (term) { return (toLowerCase ? term.trim().toLowerCase() : term.trim()); })
        .filter(function (term) { return !!term; });
};
var StringContainsSearchTerms = function (value, searchTerms) {
    if (searchTerms.length === 0)
        return true;
    if (!value)
        return false;
    return searchTerms.every(function (term) { return value.includes(term); });
};
var StringContainsSearch = function (value, search) {
    if (!search)
        return true;
    if (!value)
        return false;
    var searchTerms = SearchTerms(search);
    return StringContainsSearchTerms(value, searchTerms);
};
var ObjectContainsSearchTerms = function (object, searchTerms) {
    if (searchTerms.length === 0)
        return true;
    if (!object)
        return false;
    return searchTerms.every(function (term) {
        return Object.keys(object).some(function (column) { var _a; return ((_a = object[column]) !== null && _a !== void 0 ? _a : '').toString().toLowerCase().includes(term); });
    });
};
var ObjectContainsSearch = function (object, search) {
    if (!search)
        return true;
    if (!object)
        return false;
    var searchTerms = SearchTerms(search);
    return ObjectContainsSearchTerms(object, searchTerms);
};
var SearchRows = function (arrayTable, search) {
    var searchTerms = SearchTerms(search);
    if (searchTerms.length === 0) {
        return arrayTable;
    }
    return (arrayTable !== null && arrayTable !== void 0 ? arrayTable : []).filter(function (arrayRow) { return ObjectContainsSearchTerms(arrayRow, searchTerms); });
};
var SearchRow = function (searchItem, search) {
    var searchTerms = SearchTerms(search);
    if (searchTerms.length === 0) {
        return true;
    }
    return ObjectContainsSearchTerms(searchItem, searchTerms);
};
var SearchSort = function (arrayTable, search, sortColumn) {
    return SortColumns(SearchRows(arrayTable, search), sortColumn);
};
var RemoveDupProperties = function (original, propsToRemove) {
    var result = __assign({}, original);
    for (var key in propsToRemove) {
        if (propsToRemove.hasOwnProperty(key)) {
            if (result.hasOwnProperty(key)) {
                if (propsToRemove[key] === result[key]) {
                    delete result[key];
                }
            }
        }
    }
    return result;
};
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
var RemoveDupPropertiesByIDArray = function (original, propsToRemoveArray) {
    var result = __assign({}, original);
    var _loop_1 = function (key) {
        if (original.hasOwnProperty(key)) {
            var propsToRemove = propsToRemoveArray.find(function (propsToRemove) { return propsToRemove.ID === key; });
            if (!!propsToRemove) {
                if (propsToRemove.hasOwnProperty(key)) {
                    var subResult = RemoveDupProperties(result[key], propsToRemove);
                    if (Object.keys(subResult).length === 0) {
                        delete result[key];
                    }
                    else {
                        result[key] = subResult;
                    }
                }
            }
        }
    };
    for (var key in original) {
        _loop_1(key);
    }
    return result;
};
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
var DownloadBase64Data = function (fileName, base64, type) {
    if (!!window.navigator.msSaveBlob) {
        // IE
        var byteCharacters = atob(base64.replace(/^[^,]+,/, '').replace(/\r\n/g, ''));
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], { type: type });
        window.navigator.msSaveOrOpenBlob(blob, fileName);
    }
    else {
        var link = document.createElement('a');
        link.href = base64;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    }
};
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
var DisplayNameFromObject = function (object, prefix) {
    if (!object)
        return '';
    var actualPrefix = !!prefix ? "_" + prefix : '';
    return DisplayNameFromFL(object[actualPrefix + 'first_name'], object[actualPrefix + 'last_name'], object[actualPrefix + 'middle_name'], object[actualPrefix + 'suffix_name']);
};
var MOMENT_FORMAT_DATE = 'YYYY-MM-DD';
var MOMENT_FORMAT_TIME_SECONDS = 'HH:mm:ss';
var MOMENT_FORMAT_TIME_NO_SECONDS = 'HH:mm';
var MOMENT_FORMAT_DATE_TIME = MOMENT_FORMAT_DATE + ' ' + MOMENT_FORMAT_TIME_SECONDS;
var MomentFromUTCString = function (date) {
    if (!date) {
        return null;
    }
    var momentString = MomentDateTimeString(date, undefined, true);
    if (!momentString) {
        return null;
    }
    var workingMoment = moment.utc(momentString).toISOString();
    return MomentDateTimeString(workingMoment, MOMENT_FORMAT_DATE_TIME, true);
};
var MomentWithFormatUTC = function (value, format, strict, convertFromUTC) {
    return convertFromUTC ? moment(value, format, strict) : moment.utc(value, format, strict);
};
var MomentTimeString = function (value, format, convertFromUTC) {
    if (format === void 0) { format = MOMENT_FORMAT_TIME_SECONDS; }
    if (convertFromUTC === void 0) { convertFromUTC = false; }
    if (!value) {
        return null;
    }
    if (typeof value !== 'string') {
        var momentObject = MomentWithFormatUTC(value, undefined, false, convertFromUTC);
        if (momentObject.isValid()) {
            return momentObject.format(format);
        }
        return null;
    }
    var FORMAT_TRIES = [
        'HH:mm:ss',
        'HH:mm',
        'YYYY-MM-DD HH:mm:ss',
        'YYYY-MM-DD HH:mm',
        'D-M-YYYY HH:mm:ss',
        'D-M-YYYY HH:mm',
        'DD-MM-YYYY HH:mm:ss',
        'DD-MM-YYYY HH:mm',
        moment.ISO_8601
    ];
    var valueTry = value.replace('T', ' ').substr(0, 19);
    for (var _i = 0, FORMAT_TRIES_1 = FORMAT_TRIES; _i < FORMAT_TRIES_1.length; _i++) {
        var formatTry = FORMAT_TRIES_1[_i];
        var momentObject = MomentWithFormatUTC(valueTry, formatTry, true, convertFromUTC);
        if (momentObject.isValid()) {
            return momentObject.format(format);
        }
    }
    return null;
};
var MomentDateString = function (value, format, convertFromUTC) {
    if (format === void 0) { format = MOMENT_FORMAT_DATE; }
    if (convertFromUTC === void 0) { convertFromUTC = false; }
    if (!value) {
        return null;
    }
    if (typeof value !== 'string') {
        var momentObject = MomentWithFormatUTC(value, undefined, false, convertFromUTC);
        if (momentObject.isValid()) {
            return momentObject.format(format);
        }
        return null;
    }
    var FORMAT_TRIES = ['YYYY-MM-DD', 'M-D-YYYY', 'MM-DD-YYYY', moment.ISO_8601];
    var valueTry = value.replace('T', ' ').substr(0, 10);
    for (var _i = 0, FORMAT_TRIES_2 = FORMAT_TRIES; _i < FORMAT_TRIES_2.length; _i++) {
        var formatTry = FORMAT_TRIES_2[_i];
        var momentObject = MomentWithFormatUTC(valueTry, formatTry, true, convertFromUTC);
        if (momentObject.isValid() && momentObject.year() >= 1900) {
            return momentObject.format(format);
        }
    }
    return null;
};
var MomentDateTimeString = function (value, format, convertFromUTC) {
    if (format === void 0) { format = MOMENT_FORMAT_DATE_TIME; }
    if (convertFromUTC === void 0) { convertFromUTC = false; }
    var momentDate = MomentDateString(value, undefined, convertFromUTC);
    if (!!momentDate) {
        var momentTime = MomentTimeString(value, undefined, convertFromUTC);
        if (!!momentTime) {
            return moment(momentDate + ' ' + momentTime).format(format);
        }
    }
    return null;
};
var MomentDisplayDayDateTime = function (date, convertFromUTC) {
    if (convertFromUTC === void 0) { convertFromUTC = true; }
    if (!date) {
        return null;
    }
    var momentString = MomentDateTimeString(date, MOMENT_FORMAT_DATE_TIME, false);
    if (!momentString) {
        return null;
    }
    // const workingMoment = convertFromUTC ? moment.utc(date) : moment(date)
    var workingMoment = moment.utc(date);
    var format = workingMoment.year() === moment().year() ? 'ddd, MMM D, h:mm a' : 'ddd, MMM D, YYYY @ h:mm a';
    if (convertFromUTC) {
        return workingMoment.local().format(format);
    }
    else {
        return workingMoment.format(format);
    }
};
var MomentDisplayDayDate = function (date, convertFromUTC) {
    if (convertFromUTC === void 0) { convertFromUTC = true; }
    if (!date) {
        return null;
    }
    var momentString = MomentDateString(date, MOMENT_FORMAT_DATE_TIME, false);
    if (!momentString) {
        return null;
    }
    // const workingMoment = convertFromUTC ? moment.utc(date) : moment(date)
    var workingMoment = moment.utc(date);
    var format = workingMoment.year() === moment().year() ? 'ddd, MMM D' : 'ddd, MMM D, YYYY';
    if (convertFromUTC) {
        return workingMoment.local().format(format);
    }
    else {
        return workingMoment.format(format);
    }
};
var MomentDisplayTime = function (date, convertFromUTC) {
    if (convertFromUTC === void 0) { convertFromUTC = true; }
    if (!date) {
        return null;
    }
    var momentString = MomentTimeString(date, MOMENT_FORMAT_TIME_SECONDS, false);
    if (!momentString) {
        return null;
    }
    // const workingMoment = convertFromUTC
    // 	? moment(moment().format(MOMENT_FORMAT_DATE) + ' ' + momentString)
    // 	: moment.utc(moment().format(MOMENT_FORMAT_DATE) + ' ' + momentString)
    var workingMoment = moment.utc(moment().format(MOMENT_FORMAT_DATE) + ' ' + momentString);
    var format = 'h:mm a';
    if (convertFromUTC) {
        return workingMoment.local().format(format);
    }
    else {
        return workingMoment.format(format);
    }
};
var IsOn = function (value) {
    console.log('IsOn');
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
var RandomString = function (length, validChars) {
    if (validChars === void 0) { validChars = 'ABCDEFGHJKLMNPQRTUVWXYZ2346789'; }
    var validCharLength = validChars.length - 1;
    var result = '';
    for (var i = 0; i < length; i++) {
        result += validChars.substr(Math.floor(Math.random() * validCharLength), 1);
    }
    return result;
};
var AddressCopy = function (fromObject, fromPrefix, toObject, toPrefix, includeName, includePhone, includeTimeZone, includeGPS) {
    if (includeName === void 0) { includeName = true; }
    if (includePhone === void 0) { includePhone = true; }
    if (includeTimeZone === void 0) { includeTimeZone = true; }
    if (includeGPS === void 0) { includeGPS = true; }
    if (includeName && !!fromObject[toPrefix + 'name']) {
        toObject[toPrefix + 'name'] = fromObject[fromPrefix + 'name'];
    }
    toObject[toPrefix + 'address_1'] = fromObject[fromPrefix + 'address_1'];
    toObject[toPrefix + 'address_2'] = fromObject[fromPrefix + 'address_2'];
    toObject[toPrefix + 'city'] = fromObject[fromPrefix + 'city'];
    toObject[toPrefix + 'state'] = fromObject[fromPrefix + 'state'];
    toObject[toPrefix + 'zip'] = fromObject[fromPrefix + 'zip'];
    if (includePhone && !!fromObject[toPrefix + 'phone']) {
        toObject[toPrefix + 'phone'] = fromObject[fromPrefix + 'phone'];
    }
    if (includeTimeZone && !!fromObject[toPrefix + 'timezone']) {
        toObject[toPrefix + 'timezone'] = fromObject[fromPrefix + 'timezone'];
    }
    if (includeGPS && !!fromObject[toPrefix + 'latitude']) {
        toObject[toPrefix + 'latitude'] = fromObject[fromPrefix + 'latitude'];
    }
    if (includeGPS && !!fromObject[toPrefix + 'longitude']) {
        toObject[toPrefix + 'longitude'] = fromObject[fromPrefix + 'longitude'];
    }
};
var AddressValid = function (address, prefix) {
    return !!address[(prefix !== null && prefix !== void 0 ? prefix : '') + 'address_1'];
};
var AddressSingleRow = function (object, prefix) {
    var _a, _b, _c, _d;
    var usePrefix = prefix !== null && prefix !== void 0 ? prefix : '';
    var singleRow = ((_a = object[usePrefix + 'address_1']) !== null && _a !== void 0 ? _a : '').trim();
    if (!!((_b = object[usePrefix + 'city']) !== null && _b !== void 0 ? _b : ''))
        singleRow += ', ' + object[usePrefix + 'city'];
    if (!!((_c = object[usePrefix + 'state']) !== null && _c !== void 0 ? _c : ''))
        singleRow += ', ' + object[usePrefix + 'state'];
    if (!!((_d = object[usePrefix + 'zip']) !== null && _d !== void 0 ? _d : ''))
        singleRow += ', ' + object[usePrefix + 'zip'];
    return singleRow;
};
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
var EvaluatorFunctions = ['abs', 'pow', 'int', 'round'];
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
        var pos = ('' + expression).indexOf(evaluatorFunction + '(', startPosition);
        if (pos >= 0) {
            var postFunctionName = expression.substr(pos + evaluatorFunction.length);
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
var GetStage = function () {
    var _a, _b;
    return ((_b = (_a = process.env.REACT_APP_STAGE) !== null && _a !== void 0 ? _a : process.env.STAGE) !== null && _b !== void 0 ? _b : exports.Stages.Local);
};
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
var IsStageDevFocused = function () {
    return IsStage([exports.Stages.Local, exports.Stages.Migrate, exports.Stages.Dev, exports.Stages.QA]);
};
var IsStageTestFocused = function () {
    return IsStage([exports.Stages.QA, exports.Stages.Test]);
};
var IsStageDevTestFocused = function () {
    return IsStageDevFocused() || IsStageTestFocused();
};

exports.AddressCopy = AddressCopy;
exports.AddressSingleRow = AddressSingleRow;
exports.AddressValid = AddressValid;
exports.CaptureGPS = CaptureGPS;
exports.ClassNames = ClassNames;
exports.CleanNumber = CleanNumber;
exports.CleanScripts = CleanScripts;
exports.DataToCSVExport = DataToCSVExport;
exports.DataToCSVExportNoQuotes = DataToCSVExportNoQuotes;
exports.DisplayNameFromFL = DisplayNameFromFL;
exports.DisplayNameFromObject = DisplayNameFromObject;
exports.DownloadBase64Data = DownloadBase64Data;
exports.EvaluateCondition = EvaluateCondition;
exports.EvaluateString = EvaluateString;
exports.FormatExternalURL = FormatExternalURL;
exports.FormatPhoneNumber = FormatPhoneNumber;
exports.FormatPhoneNumberDots = FormatPhoneNumberDots;
exports.FormatZip = FormatZip;
exports.GenerateUUID = GenerateUUID;
exports.GetPathComponentAfter = GetPathComponentAfter;
exports.GetPathThrough = GetPathThrough;
exports.GetStage = GetStage;
exports.GetStageName = GetStageName;
exports.GoogleMapsAddressLink = GoogleMapsAddressLink;
exports.GoogleMapsGPSLink = GoogleMapsGPSLink;
exports.HasPathComponent = HasPathComponent;
exports.IsOn = IsOn;
exports.IsStage = IsStage;
exports.IsStageDevFocused = IsStageDevFocused;
exports.IsStageDevTestFocused = IsStageDevTestFocused;
exports.IsStageTestFocused = IsStageTestFocused;
exports.IsValidInputDecimal = IsValidInputDecimal;
exports.JSONParse = JSONParse;
exports.LeftPad = LeftPad;
exports.MOMENT_FORMAT_DATE = MOMENT_FORMAT_DATE;
exports.MOMENT_FORMAT_DATE_TIME = MOMENT_FORMAT_DATE_TIME;
exports.MOMENT_FORMAT_TIME_NO_SECONDS = MOMENT_FORMAT_TIME_NO_SECONDS;
exports.MOMENT_FORMAT_TIME_SECONDS = MOMENT_FORMAT_TIME_SECONDS;
exports.MomentDateString = MomentDateString;
exports.MomentDateTimeString = MomentDateTimeString;
exports.MomentDisplayDayDate = MomentDisplayDayDate;
exports.MomentDisplayDayDateTime = MomentDisplayDayDateTime;
exports.MomentDisplayTime = MomentDisplayTime;
exports.MomentFromUTCString = MomentFromUTCString;
exports.MomentTimeString = MomentTimeString;
exports.MomentWithFormatUTC = MomentWithFormatUTC;
exports.ObjectContainsSearch = ObjectContainsSearch;
exports.ObjectContainsSearchTerms = ObjectContainsSearchTerms;
exports.ObjectDiffs = ObjectDiffs;
exports.PagesForRange = PagesForRange;
exports.RandomString = RandomString;
exports.ReduceObjectToOtherKeys = ReduceObjectToOtherKeys;
exports.RemoveDupProperties = RemoveDupProperties;
exports.RemoveDupPropertiesByID = RemoveDupPropertiesByID;
exports.RemoveDupPropertiesByIDArray = RemoveDupPropertiesByIDArray;
exports.ReplaceAll = ReplaceAll;
exports.ReplaceLinks = ReplaceLinks;
exports.RightPad = RightPad;
exports.SearchRow = SearchRow;
exports.SearchRows = SearchRows;
exports.SearchSort = SearchSort;
exports.SearchTerms = SearchTerms;
exports.SortColumnUpdate = SortColumnUpdate;
exports.SortColumns = SortColumns;
exports.StringContainsSearch = StringContainsSearch;
exports.StringContainsSearchTerms = StringContainsSearchTerms;
exports.TextToHTML = TextToHTML;
exports.ToCurrency = ToCurrency;
exports.ToCurrencyBlank = ToCurrencyBlank;
exports.ToCurrencyDash = ToCurrencyDash;
exports.ToDigits = ToDigits;
exports.ToDigitsBlank = ToDigitsBlank;
exports.ToDigitsDash = ToDigitsDash;
exports.ToPercent = ToPercent;
exports.ToPercentBlank = ToPercentBlank;
exports.ToPercentDash = ToPercentDash;
exports.ToSnakeCase = ToSnakeCase;
exports.ToStringArray = ToStringArray;
exports.Trunc = Trunc;
exports.UCWords = UCWords;
exports.initialChanges = initialChanges;
exports.initialIDChanges = initialIDChanges;
exports.initialSortColumn = initialSortColumn;