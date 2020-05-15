/*!
 * v-currency-field v3.0.9 
 * (c) 2020 Philipe Augusto <phiny1@gmail.com>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = global || self, factory(global.VCurrencyField = {}, global.Vue));
}(this, (function (exports, Vue) { 'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  var dispatchEvent = (function (el, eventName, data) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, true, true, data);
    el.dispatchEvent(event);
  });

  var startsWith = function startsWith(str, search) {
    return str.substring(0, search.length) === search;
  };
  var removePrefix = function removePrefix(str, prefix) {
    if (prefix && startsWith(str, prefix)) {
      return str.substr(prefix.length);
    }

    return str;
  };
  var stripCurrencySymbolAndMinusSign = function stripCurrencySymbolAndMinusSign(str, _ref) {
    var prefix = _ref.prefix,
        suffix = _ref.suffix;
    var value = str.replace(prefix, '').replace(suffix, '');
    return {
      value: removePrefix(value, '-'),
      negative: startsWith(value, '-')
    };
  };
  var toInteger = function toInteger(number, valueAsInteger, fractionDigits) {
    return valueAsInteger && number != null ? Number(number.toFixed(fractionDigits).split('.').join('')) : number;
  };

  var toInteger$1 = function toInteger(number, valueAsInteger, fractionDigits) {
    return valueAsInteger && number != null ? Number(number.toFixed(fractionDigits).split('.').join('')) : number;
  };

  var stripCurrencySymbol = function stripCurrencySymbol(str, _ref) {
    var prefix = _ref.prefix,
        suffix = _ref.suffix;

    if (prefix) {
      str = str.replace(prefix, '').replace(prefix.trim(), '');
    }

    if (suffix) {
      str = str.replace(suffix, '').replace(suffix.trim(), '');
    }

    return str.trim();
  };
  var normalizeMinusSymbol = function normalizeMinusSymbol(str) {
    return str.replace(new RegExp("^".concat(['−', '-', '‐'].join('|')), 'g'), '-');
  };
  var isNumber = function isNumber(str) {
    return normalizeMinusSymbol(str).match(new RegExp("^-?\\d+(\\.\\d+)?$"));
  };
  var normalizeDigits = function normalizeDigits(str, digits) {
    digits.forEach(function (digit, index) {
      str = str.replace(new RegExp(digit, 'g'), index);
    });
    return str;
  };

  var parse = (function (str, currencyFormat) {
    var valueAsInteger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (typeof str === 'string') {
      str = normalizeDigits(str, currencyFormat.digits);
      var value = stripCurrencySymbol(str, currencyFormat);
      var numberParts = value.split(currencyFormat.decimalSymbol);

      if (numberParts.length > 2) {
        return null;
      }

      var integer = numberParts[0].replace(new RegExp("\\".concat(currencyFormat.groupingSymbol), 'g'), '');

      if (!isNumber(integer)) {
        return null;
      }

      var number = integer;

      if (numberParts.length === 2) {
        var fraction = numberParts[1];

        if (fraction.length && !fraction.match(/^\d+$/g)) {
          return null;
        }

        number += ".".concat(fraction);
      }

      return toInteger$1(Number(normalizeMinusSymbol(number)), valueAsInteger, currencyFormat.minimumFractionDigits);
    }

    return null;
  });

  var formatToParts = function formatToParts(number, numberFormat) {
    var parts = numberFormat.formatToParts(number);
    var types = parts.map(function (p) {
      return p.type;
    });
    var digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) {
      return i.toLocaleString(numberFormat.resolvedOptions().locale);
    });
    var prefix = parts.slice(0, types.indexOf('integer')).map(function (p) {
      return p.value;
    }).join('');
    var suffix = parts.slice(Math.max(types.lastIndexOf('integer'), types.indexOf('fraction')) + 1).map(function (p) {
      return p.value;
    }).join('');
    var groupingSymbol = types.indexOf('group') !== -1 ? parts[types.indexOf('group')].value : undefined;
    var decimalSymbol = types.indexOf('decimal') !== -1 ? parts[types.indexOf('decimal')].value : undefined;
    var minusSymbol = types.indexOf('minusSign') !== -1 ? parts[types.indexOf('minusSign')].value : undefined;
    return {
      digits: digits,
      prefix: prefix,
      suffix: suffix,
      groupingSymbol: groupingSymbol,
      decimalSymbol: decimalSymbol,
      minusSymbol: minusSymbol
    };
  };

  function createCurrencyFormat(ref) {
    var locale = ref.locale;
    var currency = ref.currency;
    var precision = ref.precision;
    var autoDecimalMode = ref.autoDecimalMode;
    var valueAsInteger = ref.valueAsInteger;
    var options = typeof currency === 'string' ? {
      currency: currency,
      style: 'currency'
    } : {
      minimumFractionDigits: 1
    };
    var numberFormat = new Intl.NumberFormat(locale, options);
    var ref$1 = formatToParts(-1, numberFormat);
    var minusSymbol = ref$1.minusSymbol;
    var negativePrefix = ref$1.prefix;
    var currencyFormat = Object.assign({}, formatToParts(123456, numberFormat), {
      minusSymbol: minusSymbol,
      negativePrefix: negativePrefix
    });
    var minimumFractionDigits = 2;
    var maximumFractionDigits = 2;

    if (currencyFormat.decimalSymbol === undefined) {
      minimumFractionDigits = maximumFractionDigits = 0;
    } else if (typeof precision === 'number') {
      minimumFractionDigits = maximumFractionDigits = precision;
    } else if (_typeof(precision) === 'object' && !autoDecimalMode && !valueAsInteger) {
      minimumFractionDigits = precision.min || 0;
      maximumFractionDigits = precision.max !== undefined ? precision.max : 20;
    } else if (typeof currency === 'string') {
      minimumFractionDigits = numberFormat.resolvedOptions().minimumFractionDigits;
      maximumFractionDigits = numberFormat.resolvedOptions().maximumFractionDigits;
    }

    if (currency != null && _typeof(currency) === 'object') {
      currencyFormat.prefix = currency.prefix || '';
      currencyFormat.negativePrefix = "" + currencyFormat.minusSymbol + (currency.prefix || '');
      currencyFormat.suffix = currency.suffix || '';
    }

    return Object.assign({}, currencyFormat, {
      minimumFractionDigits: minimumFractionDigits,
      maximumFractionDigits: maximumFractionDigits
    });
  }

  var toInteger$2 = function toInteger(number, valueAsInteger, fractionDigits) {
    return valueAsInteger && number != null ? Number(number.toFixed(fractionDigits).split('.').join('')) : number;
  };

  var toFloat = function toFloat(number, valueAsInteger, fractionDigits) {
    return valueAsInteger && number != null ? number / Math.pow(10, fractionDigits) : number;
  };

  var removeLeadingZeros = function removeLeadingZeros(str) {
    return str.replace(/^0+(0$|[^0])/, '$1');
  };

  var onlyDigits = function onlyDigits(str, digits) {
    return normalizeDigits$1(str, digits).replace(/\D+/g, '');
  };

  var count = function count(str, search) {
    return (str.match(new RegExp("\\" + search, 'g')) || []).length;
  };

  var endsWith = function endsWith(str, search) {
    return str.substring(str.length - search.length, str.length) === search;
  };

  var startsWith$1 = function startsWith(str, search) {
    return str.substring(0, search.length) === search;
  };

  var insertCurrencySymbol = function insertCurrencySymbol(value, currencyFormat, negative, hideCurrencySymbol) {
    var prefix = currencyFormat.prefix;
    var negativePrefix = currencyFormat.negativePrefix;
    var suffix = currencyFormat.suffix;

    if (hideCurrencySymbol) {
      prefix = suffix = '';
      negativePrefix = currencyFormat.minusSymbol;
    }

    return "" + (negative ? negativePrefix : prefix) + value + suffix;
  };

  var stripCurrencySymbol$1 = function stripCurrencySymbol(str, ref) {
    var prefix = ref.prefix;
    var suffix = ref.suffix;

    if (prefix) {
      str = str.replace(prefix, '').replace(prefix.trim(), '');
    }

    if (suffix) {
      str = str.replace(suffix, '').replace(suffix.trim(), '');
    }

    return str.trim();
  };

  var normalizeMinusSymbol$1 = function normalizeMinusSymbol(str) {
    return str.replace(new RegExp("^" + ['−', '-', '‐'].join('|'), 'g'), '-');
  };

  var isNegative = function isNegative(str) {
    return normalizeMinusSymbol$1(str).charAt(0) === '-';
  };

  var isNumber$1 = function isNumber(str) {
    return normalizeMinusSymbol$1(str).match(new RegExp("^-?\\d+(\\.\\d+)?$"));
  };

  var normalizeDigits$1 = function normalizeDigits(str, digits) {
    digits.forEach(function (digit, index) {
      str = str.replace(new RegExp(digit, 'g'), index);
    });
    return str;
  };

  function parse$1(str, currencyFormat, valueAsInteger) {
    if (valueAsInteger === void 0) valueAsInteger = false;

    if (typeof str === 'string') {
      str = normalizeDigits$1(str, currencyFormat.digits);
      var value = stripCurrencySymbol$1(str, currencyFormat);
      var numberParts = value.split(currencyFormat.decimalSymbol);

      if (numberParts.length > 2) {
        return null;
      }

      var integer = numberParts[0].replace(new RegExp("\\" + currencyFormat.groupingSymbol, 'g'), '');

      if (!isNumber$1(integer)) {
        return null;
      }

      var number = integer;

      if (numberParts.length === 2) {
        var fraction = numberParts[1];

        if (fraction.length && !fraction.match(/^\d+$/g)) {
          return null;
        }

        number += "." + fraction;
      }

      return toInteger$2(Number(normalizeMinusSymbol$1(number)), valueAsInteger, currencyFormat.minimumFractionDigits);
    }

    return null;
  }

  function dispatchEvent$1(el, eventName, data) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, true, true, data);
    el.dispatchEvent(event);
  }

  var DEFAULT_OPTIONS = {
    locale: undefined,
    currency: 'EUR',
    valueAsInteger: false,
    distractionFree: true,
    precision: undefined,
    autoDecimalMode: false,
    valueRange: undefined,
    allowNegative: true
  };

  var parseCurrency = function parseCurrency(formattedValue, options) {
    return parse$1(formattedValue, createCurrencyFormat(Object.assign({}, DEFAULT_OPTIONS, options)), options.valueAsInteger);
  };

  var setValue = function setValue(el, value) {
    return dispatchEvent$1(el, 'format', {
      value: value
    });
  };

  var setCaretPosition = function setCaretPosition(el, position) {
    return el.setSelectionRange(position, position);
  };

  var getCaretPositionAfterFormat = function getCaretPositionAfterFormat(newValue, inputtedValue, caretPosition, currencyFormat, options) {
    var prefix = currencyFormat.prefix;
    var suffix = currencyFormat.suffix;
    var decimalSymbol = currencyFormat.decimalSymbol;
    var maximumFractionDigits = currencyFormat.maximumFractionDigits;
    var groupingSymbol = currencyFormat.groupingSymbol;
    var digits = currencyFormat.digits;
    var decimalSymbolPosition = inputtedValue.indexOf(decimalSymbol) + 1;
    var caretPositionFromLeft = inputtedValue.length - caretPosition;

    if (Math.abs(newValue.length - inputtedValue.length) > 1 && caretPosition <= decimalSymbolPosition) {
      return newValue.indexOf(decimalSymbol) + 1;
    } else if (newValue.substr(caretPosition, 1) === groupingSymbol && count(newValue, groupingSymbol) === count(inputtedValue, groupingSymbol) + 1) {
      return newValue.length - caretPositionFromLeft - 1;
    } else {
      if (!options.autoDecimalMode && decimalSymbolPosition !== 0 && caretPosition > decimalSymbolPosition) {
        if (onlyDigits(inputtedValue.substr(decimalSymbolPosition), digits).length - 1 === maximumFractionDigits) {
          caretPositionFromLeft -= 1;
        }
      }

      return options.distractionFree.hideCurrencySymbol ? newValue.length - caretPositionFromLeft : Math.max(newValue.length - Math.max(caretPositionFromLeft, suffix.length), prefix.length === 0 ? 0 : prefix.length + 1);
    }
  };

  var getDistractionFreeCaretPosition = function getDistractionFreeCaretPosition(currencyFormat, options, value, caretPosition) {
    var result = caretPosition;

    if (options.distractionFree.hideCurrencySymbol) {
      result -= currencyFormat.prefix.length;
    }

    if (options.distractionFree.hideGroupingSymbol) {
      result -= count(value.substring(0, caretPosition), currencyFormat.groupingSymbol);
    }

    return Math.max(0, result);
  };

  var isValidInteger = function isValidInteger(integer, groupingSymbol) {
    return integer.match(new RegExp("^(0|[1-9]\\d{0,2}(\\" + groupingSymbol + "?\\d{3})*)$"));
  };

  var isFractionIncomplete = function isFractionIncomplete(value, ref) {
    var digits = ref.digits;
    var decimalSymbol = ref.decimalSymbol;
    var groupingSymbol = ref.groupingSymbol;
    var numberParts = value.split(decimalSymbol);
    return endsWith(value, decimalSymbol) && numberParts.length === 2 && isValidInteger(normalizeDigits$1(numberParts[0], digits), groupingSymbol);
  };

  var checkIncompleteValue = function checkIncompleteValue(value, negative, previousConformedValue, currencyFormat, hideCurrencySymbol) {
    var digits = currencyFormat.digits;
    var negativePrefix = currencyFormat.negativePrefix;
    var decimalSymbol = currencyFormat.decimalSymbol;
    var maximumFractionDigits = currencyFormat.maximumFractionDigits;

    if (value === '' && negative && previousConformedValue !== (hideCurrencySymbol ? currencyFormat.minusSymbol : negativePrefix)) {
      return insertCurrencySymbol('', currencyFormat, negative, hideCurrencySymbol);
    } else if (maximumFractionDigits > 0) {
      if (isFractionIncomplete(value, currencyFormat)) {
        return insertCurrencySymbol(value, currencyFormat, negative, hideCurrencySymbol);
      } else if (startsWith$1(value, decimalSymbol)) {
        return insertCurrencySymbol("" + digits[0] + decimalSymbol + onlyDigits(value.substr(1), digits).substr(0, maximumFractionDigits), currencyFormat, negative, hideCurrencySymbol);
      }
    }

    return null;
  };

  var getAutoDecimalModeConformedValue = function getAutoDecimalModeConformedValue(str, ref, allowNegative) {
    var minimumFractionDigits = ref.minimumFractionDigits;
    var digits = ref.digits;

    if (str === '') {
      return {
        conformedValue: ''
      };
    } else {
      var negative = isNegative(str) && allowNegative;
      var conformedValue = allowNegative && str === '-' ? -0 : Number("" + (negative ? '-' : '') + removeLeadingZeros(onlyDigits(str, digits))) / Math.pow(10, minimumFractionDigits);
      return {
        conformedValue: conformedValue,
        fractionDigits: conformedValue.toFixed(minimumFractionDigits).slice(-minimumFractionDigits)
      };
    }
  };

  function conformToMask(str, currencyFormat, previousConformedValue, hideCurrencySymbol, autoDecimalMode, allowNegative) {
    if (previousConformedValue === void 0) previousConformedValue = '';

    if (typeof str === 'string') {
      var value = stripCurrencySymbol$1(str, currencyFormat);

      if (currencyFormat.minimumFractionDigits > 0 && autoDecimalMode) {
        return getAutoDecimalModeConformedValue(value, currencyFormat, allowNegative);
      }

      var negative = isNegative(value);

      if (negative) {
        value = value.substring(1);
        negative &= allowNegative;
      }

      var incompleteValue = checkIncompleteValue(value, negative, previousConformedValue, currencyFormat, hideCurrencySymbol);

      if (incompleteValue != null) {
        return {
          conformedValue: incompleteValue
        };
      }

      var ref = value.split(currencyFormat.decimalSymbol);
      var integer = ref[0];
      var fraction = ref.slice(1);
      var integerDigits = removeLeadingZeros(onlyDigits(integer, currencyFormat.digits));
      var fractionDigits = onlyDigits(fraction.join(''), currencyFormat.digits).substr(0, currencyFormat.maximumFractionDigits);
      var invalidFraction = fraction.length > 0 && fractionDigits.length === 0;
      var invalidNegativeValue = integerDigits === '' && negative && (previousConformedValue === str.slice(0, -1) || previousConformedValue !== currencyFormat.negativePrefix);

      if (invalidFraction || invalidNegativeValue) {
        return {
          conformedValue: previousConformedValue
        };
      } else if (isNumber$1(integerDigits)) {
        return {
          conformedValue: Number("" + (negative ? '-' : '') + integerDigits + "." + fractionDigits),
          fractionDigits: fractionDigits
        };
      } else {
        return {
          conformedValue: ''
        };
      }
    }

    return {
      conformedValue: previousConformedValue
    };
  }

  var equal = function equal(a, b) {
    if (a === b) {
      return true;
    }

    if (!a || !b || _typeof(a) !== 'object' || _typeof(b) !== 'object') {
      return false;
    }

    var keys = Object.keys(a);

    if (keys.length !== Object.keys(b).length) {
      return false;
    }

    if (!keys.every(Object.prototype.hasOwnProperty.bind(b))) {
      return false;
    }

    return keys.every(function (key) {
      return equal(a[key], b[key]);
    });
  };

  var init = function init(el, optionsFromBinding, ref) {
    var $CI_DEFAULT_OPTIONS = ref.$CI_DEFAULT_OPTIONS;
    var inputElement = el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input');

    if (!inputElement) {
      throw new Error('No input element found');
    }

    var options = Object.assign({}, $CI_DEFAULT_OPTIONS || DEFAULT_OPTIONS, optionsFromBinding);
    var distractionFree = options.distractionFree;
    var autoDecimalMode = options.autoDecimalMode;

    if (typeof distractionFree === 'boolean') {
      options.distractionFree = {
        hideCurrencySymbol: distractionFree,
        hideNegligibleDecimalDigits: distractionFree,
        hideGroupingSymbol: distractionFree
      };
    }

    if (autoDecimalMode) {
      options.distractionFree.hideNegligibleDecimalDigits = false;
      inputElement.setAttribute('inputmode', 'numeric');
    } else {
      inputElement.setAttribute('inputmode', 'decimal');
    }

    var currencyFormat = createCurrencyFormat(options);
    inputElement.$ci = Object.assign({}, inputElement.$ci || {}, {
      options: options,
      currencyFormat: currencyFormat
    });
    return inputElement;
  };

  var validateValueRange = function validateValueRange(value, valueRange) {
    if (valueRange) {
      var min = valueRange.min;
      var max = valueRange.max;

      if (min !== undefined && value < min) {
        value = min;
      }

      if (max !== undefined && value > max) {
        value = max;
      }
    }

    return value;
  };

  var applyFixedFractionFormat = function applyFixedFractionFormat(el, value, forcedChange) {
    var ref = el.$ci.options;
    var valueRange = ref.valueRange;
    var locale = ref.locale;
    var valueAsInteger = ref.valueAsInteger;
    var ref$1 = el.$ci.currencyFormat;
    var maximumFractionDigits = ref$1.maximumFractionDigits;
    var minimumFractionDigits = ref$1.minimumFractionDigits;

    if (value != null) {
      value = validateValueRange(value, valueRange);
      value = new Intl.NumberFormat(locale, {
        minimumFractionDigits: minimumFractionDigits,
        maximumFractionDigits: maximumFractionDigits
      }).format(value);
    }

    format(el, value);

    if (forcedChange) {
      dispatchEvent$1(el, 'change', {
        numberValue: toInteger$2(el.$ci.numberValue, valueAsInteger, maximumFractionDigits)
      });
    }
  };

  var updateInputValue = function updateInputValue(el, value, hideNegligibleDecimalDigits) {
    if (value != null) {
      var ref = el.$ci;
      var focus = ref.focus;
      var ref_options = ref.options;
      var allowNegative = ref_options.allowNegative;
      var autoDecimalMode = ref_options.autoDecimalMode;
      var distractionFree = ref_options.distractionFree;
      var locale = ref_options.locale;
      var currencyFormat = ref.currencyFormat;
      var previousConformedValue = ref.previousConformedValue;
      var hideCurrencySymbol = focus && distractionFree.hideCurrencySymbol;
      var ref$1 = conformToMask(value, currencyFormat, previousConformedValue, hideCurrencySymbol, autoDecimalMode, allowNegative);
      var conformedValue = ref$1.conformedValue;
      var fractionDigits = ref$1.fractionDigits;

      if (typeof conformedValue === 'number') {
        var maximumFractionDigits = currencyFormat.maximumFractionDigits;
        var minimumFractionDigits = currencyFormat.minimumFractionDigits;

        if (focus) {
          minimumFractionDigits = maximumFractionDigits;
        }

        minimumFractionDigits = hideNegligibleDecimalDigits ? fractionDigits.replace(/0+$/, '').length : Math.min(minimumFractionDigits, fractionDigits.length);
        var formattedValue = new Intl.NumberFormat(locale, {
          useGrouping: !(focus && distractionFree.hideGroupingSymbol),
          minimumFractionDigits: minimumFractionDigits,
          maximumFractionDigits: maximumFractionDigits
        }).format(Math.abs(conformedValue));
        var isNegativeZero = conformedValue === 0 && 1 / conformedValue < 0;
        el.value = insertCurrencySymbol(formattedValue, currencyFormat, isNegativeZero || conformedValue < 0, hideCurrencySymbol);
        el.$ci.numberValue = conformedValue;
      } else {
        el.value = conformedValue;
        el.$ci.numberValue = parse$1(el.value, currencyFormat);
      }
    } else {
      el.value = el.$ci.numberValue = null;
    }

    el.$ci.previousConformedValue = el.value;
  };

  var format = function format(el, value, hideNegligibleDecimalDigits) {
    if (hideNegligibleDecimalDigits === void 0) hideNegligibleDecimalDigits = false;
    updateInputValue(el, value, hideNegligibleDecimalDigits);
    var ref = el.$ci;
    var numberValue = ref.numberValue;
    var currencyFormat = ref.currencyFormat;
    var options = ref.options;
    numberValue = toInteger$2(numberValue, options.valueAsInteger, currencyFormat.maximumFractionDigits);
    dispatchEvent$1(el, 'input', {
      numberValue: numberValue
    });
  };

  var addEventListener = function addEventListener(el) {
    el.addEventListener('input', function (e) {
      if (!e.detail) {
        var value = el.value;
        var selectionStart = el.selectionStart;
        var el_$ci = el.$ci;
        var currencyFormat = el_$ci.currencyFormat;
        var options = el_$ci.options;
        format(el, value);

        if (el.$ci.focus) {
          setCaretPosition(el, getCaretPositionAfterFormat(el.value, value, selectionStart, currencyFormat, options));
        }
      }
    }, {
      capture: true
    });
    el.addEventListener('format', function (e) {
      var ref = el.$ci;
      var currencyFormat = ref.currencyFormat;
      var options = ref.options;
      var numberValue = ref.numberValue;
      var value = toFloat(e.detail.value, options.valueAsInteger, currencyFormat.maximumFractionDigits);

      if (value !== numberValue) {
        applyFixedFractionFormat(el, value);
      }
    });
    el.addEventListener('focus', function () {
      el.$ci.oldValue = el.$ci.numberValue;
      el.$ci.focus = true;
      var ref = el.$ci.options.distractionFree;
      var hideCurrencySymbol = ref.hideCurrencySymbol;
      var hideGroupingSymbol = ref.hideGroupingSymbol;
      var hideNegligibleDecimalDigits = ref.hideNegligibleDecimalDigits;

      if (hideCurrencySymbol || hideGroupingSymbol || hideNegligibleDecimalDigits) {
        setTimeout(function () {
          var value = el.value;
          var selectionStart = el.selectionStart;
          var selectionEnd = el.selectionEnd;
          format(el, el.value, hideNegligibleDecimalDigits);

          if (Math.abs(selectionStart - selectionEnd) > 0) {
            el.setSelectionRange(0, el.value.length);
          } else {
            setCaretPosition(el, getDistractionFreeCaretPosition(el.$ci.currencyFormat, el.$ci.options, value, selectionStart));
          }
        });
      }
    });
    el.addEventListener('blur', function () {
      el.$ci.focus = false;
      applyFixedFractionFormat(el, el.$ci.numberValue, el.$ci.oldValue !== el.$ci.numberValue);
    });
  };

  var directive = {
    bind: function bind(el, ref, ref$1) {
      var options = ref.value;
      var context = ref$1.context;
      var inputElement = init(el, options, context);
      Vue.nextTick(function () {
        var value = inputElement.value;
        var inputElement_$ci = inputElement.$ci;
        var currencyFormat = inputElement_$ci.currencyFormat;
        var options = inputElement_$ci.options;

        if (value) {
          applyFixedFractionFormat(inputElement, toFloat(parse$1(value, currencyFormat), options.valueAsInteger, currencyFormat.maximumFractionDigits));
        }
      });
      addEventListener(inputElement);
    },
    componentUpdated: function componentUpdated(el, ref, ref$1) {
      var value = ref.value;
      var oldValue = ref.oldValue;
      var context = ref$1.context;

      if (!equal(value, oldValue)) {
        var inputElement = init(el, value, context);
        applyFixedFractionFormat(inputElement, inputElement.$ci.numberValue, value.valueAsInteger !== oldValue.valueAsInteger);
      }
    }
  };
  var component = {
    render: function render(h) {
      var this$1 = this;
      return h('input', {
        domProps: {
          value: this.formattedValue
        },
        directives: [{
          name: 'currency',
          value: this.options
        }],
        on: Object.assign({}, this.$listeners, {
          change: function change(e) {
            if (e.detail) {
              this$1.$emit('change', e.detail.numberValue);
            }

            this$1.formattedValue = this$1.$el.value;
          },
          input: function input(e) {
            if (e.detail && this$1.value !== e.detail.numberValue) {
              this$1.$emit('input', e.detail.numberValue);
            }

            this$1.formattedValue = this$1.$el.value;
          }
        })
      });
    },
    directives: {
      currency: directive
    },
    name: 'CurrencyInput',
    props: {
      value: {
        type: Number,
        default: null
      },
      locale: {
        type: String,
        default: undefined
      },
      currency: {
        type: [String, Object],
        default: undefined
      },
      distractionFree: {
        type: [Boolean, Object],
        default: undefined
      },
      precision: {
        type: [Number, Object],
        default: undefined
      },
      autoDecimalMode: {
        type: Boolean,
        default: undefined
      },
      valueAsInteger: {
        type: Boolean,
        default: undefined
      },
      valueRange: {
        type: Object,
        default: undefined
      },
      allowNegative: {
        type: Boolean,
        default: undefined
      }
    },
    data: function data() {
      return {
        formattedValue: null
      };
    },
    created: function created() {
      var ref = createCurrencyFormat(this.options);
      var minimumFractionDigits = ref.minimumFractionDigits;
      var maximumFractionDigits = ref.maximumFractionDigits;
      this.formattedValue = typeof this.value === 'number' ? this.value.toLocaleString(this.options.locale, {
        minimumFractionDigits: minimumFractionDigits,
        maximumFractionDigits: maximumFractionDigits
      }) : null;
    },
    computed: {
      options: function options() {
        var this$1 = this;
        var options = Object.assign({}, this.$CI_DEFAULT_OPTIONS || DEFAULT_OPTIONS);
        Object.keys(DEFAULT_OPTIONS).forEach(function (key) {
          if (this$1[key] !== undefined) {
            options[key] = this$1[key];
          }
        });
        return options;
      }
    },
    watch: {
      value: 'setValue'
    },
    methods: {
      setValue: function setValue$1(value) {
        setValue(this.$el, value);
      }
    }
  };
  var plugin = {
    install: function install(Vue, ref) {
      if (ref === void 0) ref = {};
      var componentName = ref.componentName;
      if (componentName === void 0) componentName = component.name;
      var directiveName = ref.directiveName;
      if (directiveName === void 0) directiveName = 'currency';
      var globalOptions = ref.globalOptions;
      if (globalOptions === void 0) globalOptions = {};
      Vue.prototype.$CI_DEFAULT_OPTIONS = Object.assign({}, DEFAULT_OPTIONS, globalOptions);
      Vue.component(componentName, component);
      Vue.directive(directiveName, directive);

      Vue.prototype.$parseCurrency = function (str, options) {
        if (options === void 0) options = {};
        return parseCurrency(str, Object.assign({}, globalOptions, options));
      };
    }
  };

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
  }

  var options = {
    locale: undefined,
    decimalLength: 2,
    autoDecimalMode: true,
    min: null,
    max: null,
    defaultValue: 0,
    valueAsInteger: false,
    allowNegative: true
  };

  var script = {
    name: 'VCurrencyField',
    props: {
      value: {
        type: [Number, String],
        default: function _default() {
          return null;
        }
      },
      locale: {
        type: String,
        default: function _default() {
          return options.locale;
        }
      },
      decimalLength: {
        type: Number,
        default: function _default() {
          return options.decimalLength;
        }
      },
      autoDecimalMode: {
        type: Boolean,
        default: function _default() {
          return options.autoDecimalMode;
        }
      },
      min: {
        type: Number,
        default: function _default() {
          return options.min;
        }
      },
      max: {
        type: Number,
        default: function _default() {
          return options.max;
        }
      },
      defaultValue: {
        type: Number,
        default: function _default() {
          return options.defaultValue;
        }
      },
      valueAsInteger: {
        type: Boolean,
        default: function _default() {
          return options.valueAsInteger;
        }
      },
      allowNegative: {
        type: Boolean,
        default: function _default() {
          return options.allowNegative;
        }
      }
    },
    directives: {
      CurrencyDirective: directive
    },
    data: function data() {
      return {
        currency: null,
        formattedValue: this.value
      };
    },
    mounted: function mounted() {
      this.$refs.textfield.resetValidation();
      dispatchEvent(this.$el.querySelector('input'), 'defaultValue');
      this.formattedValue = typeof this.value === 'number' ? this.value.toLocaleString(this.locale, {
        minimumFractionDigits: this.decimalLength,
        maximumFractionDigits: this.decimalLength
      }) : null;
    },
    computed: {
      attrs: function attrs() {
        // eslint-disable-next-line
        var _this$$attrs = this.$attrs,
            value = _this$$attrs.value,
            attrs = _objectWithoutProperties(_this$$attrs, ["value"]); // all but input event


        return attrs;
      },
      distractionFree: function distractionFree() {
        if (this.decimalLength > 0) {
          return !this.autoDecimalMode;
        } else {
          return false;
        }
      },
      decimalMode: function decimalMode() {
        if (this.decimalLength > 0) {
          return this.autoDecimalMode;
        } else {
          return false;
        }
      },
      valueRange: function valueRange() {
        if (this.min || this.max) {
          return {
            min: this.min,
            max: this.max
          };
        } else {
          return undefined;
        }
      }
    },
    methods: {
      listeners: function listeners() {
        var _this = this;

        // eslint-disable-next-line
        var _this$$listeners = this.$listeners,
            input = _this$$listeners.input,
            listeners = _objectWithoutProperties(_this$$listeners, ["input"]); // all but input event


        return _objectSpread2(_objectSpread2({}, listeners), {}, {
          defaultValue: function defaultValue() {
            var input = _this.$el.querySelector('input');

            if (!_this.value && _this.defaultValue !== null && _this.defaultValue !== undefined && !input.$ci.focus) {
              input.$ci.numberValue = _this.valueAsInteger && _this.defaultValue ? _this.defaultValue * Math.pow(10, _this.decimalLength) : _this.defaultValue;
              dispatchEvent(input, 'blur');
            }
          },
          input: function input() {
            var input = _this.$el.querySelector('input');

            if ((input.$ci.numberValue == null || input.$ci.numberValue == undefined) && _this.defaultValue !== null && !input.$ci.focus) {
              input.$ci.numberValue = _this.defaultValue;
              dispatchEvent(input, 'blur');
            }

            if (input.$ci && _this.value !== input.$ci.numberValue) {
              _this.$emit('input', toInteger(input.$ci.numberValue, _this.valueAsInteger, _this.decimalLength));
            }

            _this.formattedValue = input.value;
          },
          'keyup': function keyup(event) {
            if (event.key === '-' || event.key === '+') {
              var _stripCurrencySymbolA = stripCurrencySymbolAndMinusSign(_this.$el.querySelector('input').value, {
                prefix: '',
                suffix: ''
              }),
                  value = _stripCurrencySymbolA.value,
                  negative = _stripCurrencySymbolA.negative;

              var numberParts = value.split(_this.$el.querySelector('input').$ci.currencyFormat.decimalSymbol);
              var parsedValue = parse(value, _this.$el.querySelector('input').$ci.currencyFormat);
              var stringValue = null;

              if (numberParts.length === 2) {
                var fraction = numberParts[1];
                stringValue = new Intl.NumberFormat(_this.locale, {
                  minimumFractionDigits: fraction.length,
                  maximumFractionDigits: fraction.length
                }).format(parsedValue);
              }

              var numberValue = stringValue || parsedValue;

              if (event.key === '-' && !negative && numberValue !== null) {
                _this.$el.querySelector('input').value = "-".concat(numberValue);
                dispatchEvent(_this.$el.querySelector('input'), 'input');
              }

              if (event.key === '+' && negative && numberValue !== null) {
                _this.$el.querySelector('input').value = "".concat(numberValue);
                dispatchEvent(_this.$el.querySelector('input'), 'input');
              }
            }
          }
        });
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-text-field',_vm._g(_vm._b({directives:[{name:"currency-directive",rawName:"v-currency-directive",value:({currency: _vm.currency, locale: _vm.locale, distractionFree: _vm.distractionFree, precision: _vm.decimalLength, autoDecimalMode: _vm.decimalMode, valueRange: _vm.valueRange, allowNegative: _vm.allowNegative, valueAsInteger: _vm.valueAsInteger}),expression:"{currency, locale, distractionFree, precision: decimalLength, autoDecimalMode: decimalMode, valueRange, allowNegative, valueAsInteger}"}],ref:"textfield",attrs:{"type":"tel"},scopedSlots:_vm._u([_vm._l((_vm.$slots),function(index,name){return {key:name,fn:function(){return [_vm._t(name)]},proxy:true}})],null,true),model:{value:(_vm.formattedValue),callback:function ($$v) {_vm.formattedValue=$$v;},expression:"formattedValue"}},'v-text-field',_vm.attrs,false),_vm.listeners()))};
  var __vue_staticRenderFns__ = [];

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var VCurrencyField = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );

  var version = '3.0.9';

  function install(Vue, globalOptions) {
    if (globalOptions) {
      Object.keys(globalOptions).map(function (key) {
        options[key] = globalOptions[key];
      });
    }

    Vue.component('v-currency-field', VCurrencyField);
  }

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(install);
  }

  exports.VCurrencyField = VCurrencyField;
  exports.default = install;
  exports.options = options;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
