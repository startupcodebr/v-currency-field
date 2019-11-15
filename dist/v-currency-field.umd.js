/*!
 * v-currency-field v3.0.4 
 * (c) 2019 Philipe Augusto <phiny1@gmail.com>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = global || self, factory(global.VCurrencyField = {}, global.Vue));
}(this, (function (exports, Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

  function _typeof(obj) {
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
  var isNumber = function isNumber(str) {
    return str.match(/^-?\d+(\.\d+)?$/);
  };

  var parse = (function (str) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        prefix = _ref.prefix,
        suffix = _ref.suffix,
        groupingSymbol = _ref.groupingSymbol,
        decimalSymbol = _ref.decimalSymbol;

    if (typeof str === 'number') {
      return str;
    } else if (str && typeof str === 'string') {
      if (isNumber(str)) {
        return Number(str);
      }

      var _stripCurrencySymbolA = stripCurrencySymbolAndMinusSign(str, {
        prefix: prefix,
        suffix: suffix
      }),
          value = _stripCurrencySymbolA.value,
          negative = _stripCurrencySymbolA.negative;

      var numberParts = value.split(decimalSymbol);

      if (numberParts.length > 2) {
        return null;
      }

      var integer = numberParts[0].replace(new RegExp("\\".concat(groupingSymbol), 'g'), '');

      if (integer.length && !integer.match(/^\d+$/g)) {
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

      if (number) {
        if (negative) {
          number = "-".concat(number);
        }

        return Number(number);
      }
    }

    return null;
  });

  var createCurrencyFormat = function createCurrencyFormat(numberFormat) {
    var ps = numberFormat.format(123456);
    var ns = numberFormat.format(-1);
    var decimalLength = (ps.match(/0/g) || []).length;
    var decimalSymbol = decimalLength > 0 ? ps.substr(ps.indexOf('6') + 1, 1) : null;
    var prefix = ps.substring(0, ps.indexOf('1'));
    var negativePrefix = ns.substring(0, ns.indexOf('1'));
    var suffix = ps.substring(ps.lastIndexOf(decimalLength > 0 ? '0' : '6') + 1);
    var groupingSymbol = ps.substr(ps.indexOf('3') + 1, 1);
    return {
      prefix: prefix,
      negativePrefix: negativePrefix,
      suffix: suffix,
      groupingSymbol: groupingSymbol,
      decimalSymbol: decimalSymbol,
      decimalLength: decimalLength
    };
  };

  function createCurrencyFormat$1(ref) {
    var locale = ref.locale;
    var currency = ref.currency;

    if (currency == null) {
      return createCurrencyFormat(new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2
      }));
    } else if (_typeof(currency) === 'object') {
      return Object.assign({}, createCurrencyFormat(new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2
      })), {
        prefix: currency.prefix || '',
        negativePrefix: "-" + (currency.prefix || ''),
        suffix: currency.suffix || ''
      });
    } else {
      return createCurrencyFormat(new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
      }));
    }
  }

  var removeLeadingZeros = function removeLeadingZeros(str) {
    return str.replace(/^0+(0$|[^0])/, '$1');
  };

  var onlyDigits = function onlyDigits(str) {
    return str.replace(/\D+/g, '');
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

  var removePrefix$1 = function removePrefix(str, prefix) {
    if (prefix && startsWith$1(str, prefix)) {
      return str.substr(prefix.length);
    }

    return str;
  };

  var removeSuffix = function removeSuffix(str, suffix) {
    if (suffix && endsWith(str, suffix)) {
      return str.slice(0, suffix.length * -1);
    }

    return str;
  };

  var stripCurrencySymbolAndMinusSign$1 = function stripCurrencySymbolAndMinusSign(str, ref) {
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var value = str.replace(prefix, '').replace(suffix, '');
    return {
      value: removePrefix$1(value, '-'),
      negative: startsWith$1(value, '-')
    };
  };

  var isNumber$1 = function isNumber(str) {
    return str.match(/^-?\d+(\.\d+)?$/);
  };

  function parse$1(str, ref) {
    if (ref === void 0) ref = {};
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var groupingSymbol = ref.groupingSymbol;
    var decimalSymbol = ref.decimalSymbol;

    if (typeof str === 'number') {
      return str;
    } else if (str && typeof str === 'string') {
      if (isNumber$1(str)) {
        return Number(str);
      }

      var ref$1 = stripCurrencySymbolAndMinusSign$1(str, {
        prefix: prefix,
        suffix: suffix
      });
      var value = ref$1.value;
      var negative = ref$1.negative;
      var numberParts = value.split(decimalSymbol);

      if (numberParts.length > 2) {
        return null;
      }

      var integer = numberParts[0].replace(new RegExp("\\" + groupingSymbol, 'g'), '');

      if (integer.length && !integer.match(/^\d+$/g)) {
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

      if (number) {
        if (negative) {
          number = "-" + number;
        }

        return Number(number);
      }
    }

    return null;
  }

  var defaultOptions = {
    locale: undefined,
    currency: 'EUR',
    distractionFree: true,
    decimalLength: undefined,
    autoDecimalMode: false,
    min: null,
    max: null
  };

  var setCaretPosition = function setCaretPosition(el, position) {
    return el.setSelectionRange(position, position);
  };

  var getCaretPositionAfterFormat = function getCaretPositionAfterFormat(el, inputtedValue, caretPosition) {
    var ref = el.$ci.currencyFormat;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var decimalSymbol = ref.decimalSymbol;
    var decimalLength = ref.decimalLength;
    var groupingSymbol = ref.groupingSymbol;
    var newValue = el.value;
    var decimalSymbolPosition = inputtedValue.indexOf(decimalSymbol) + 1;
    var caretPositionFromLeft = inputtedValue.length - caretPosition;

    if (Math.abs(newValue.length - inputtedValue.length) > 1 && caretPosition <= decimalSymbolPosition) {
      return newValue.indexOf(decimalSymbol) + 1;
    } else if (newValue.substr(caretPosition, 1) === groupingSymbol && count(newValue, groupingSymbol) === count(inputtedValue, groupingSymbol) + 1) {
      return newValue.length - caretPositionFromLeft - 1;
    } else {
      if (!el.$ci.options.autoDecimalMode && decimalSymbolPosition !== 0 && caretPosition > decimalSymbolPosition) {
        if (onlyDigits(removeSuffix(inputtedValue.substr(decimalSymbolPosition), suffix)).length - 1 === decimalLength) {
          caretPositionFromLeft -= 1;
        }
      }

      return el.$ci.options.hideCurrencySymbol ? newValue.length - caretPositionFromLeft : Math.max(newValue.length - Math.max(caretPositionFromLeft, suffix.length), prefix.length === 0 ? 0 : prefix.length + 1);
    }
  };

  var getCaretPositionAfterApplyingDistractionFreeFormat = function getCaretPositionAfterApplyingDistractionFreeFormat(ref, ref$1, value, caretPosition) {
    var prefix = ref.prefix;
    var groupingSymbol = ref.groupingSymbol;
    var hideCurrencySymbol = ref$1.hideCurrencySymbol;
    var hideGroupingSymbol = ref$1.hideGroupingSymbol;
    var result = caretPosition;

    if (hideCurrencySymbol) {
      result -= prefix.length;
    }

    if (hideGroupingSymbol) {
      result -= count(value.substring(0, caretPosition), groupingSymbol);
    }

    return Math.max(0, result);
  };

  var isValidInteger = function isValidInteger(integer, groupingSymbol) {
    return integer.match(new RegExp("^-?(0|[1-9]\\d{0,2}(\\" + groupingSymbol + "?\\d{3})*)$"));
  };

  var isFractionIncomplete = function isFractionIncomplete(value, ref) {
    var decimalSymbol = ref.decimalSymbol;
    var groupingSymbol = ref.groupingSymbol;
    var numberParts = value.split(decimalSymbol);
    return endsWith(value, decimalSymbol) && numberParts.length === 2 && isValidInteger(numberParts[0], groupingSymbol);
  };

  var checkIncompleteValue = function checkIncompleteValue(value, negative, previousConformedValue, formatConfig) {
    var prefix = formatConfig.prefix;
    var negativePrefix = formatConfig.negativePrefix;
    var suffix = formatConfig.suffix;
    var decimalSymbol = formatConfig.decimalSymbol;
    var decimalLength = formatConfig.decimalLength;

    if (value === '' && negative && previousConformedValue !== negativePrefix) {
      return "" + negativePrefix + suffix;
    } else if (decimalLength > 0) {
      if (isFractionIncomplete(value, formatConfig)) {
        return "" + (negative ? negativePrefix : prefix) + value + suffix;
      } else if (startsWith$1(value, decimalSymbol)) {
        return (negative ? negativePrefix : prefix) + "0" + decimalSymbol + onlyDigits(value.substr(1)).substr(0, decimalLength) + suffix;
      }
    }

    return null;
  };

  var getAutoDecimalModeConformedValue = function getAutoDecimalModeConformedValue(value, previousConformedValue, ref) {
    var decimalLength = ref.decimalLength;

    if (value === '') {
      return {
        conformedValue: ''
      };
    } else {
      var negative = startsWith$1(value, '-');
      var conformedValue = value === '-' ? Number(-0) : Number("" + (negative ? '-' : '') + removeLeadingZeros(onlyDigits(value))) / Math.pow(10, decimalLength);
      return {
        conformedValue: conformedValue,
        fractionDigits: conformedValue.toFixed(decimalLength).slice(-decimalLength)
      };
    }
  };

  var isFractionInvalid = function isFractionInvalid(fraction, numberOfFractionDigits) {
    return fraction.length > 0 && numberOfFractionDigits === 0;
  };

  function conformToMask(str, formatConfig, options, previousConformedValue) {
    if (previousConformedValue === void 0) previousConformedValue = '';

    if (typeof str === 'string') {
      str = str.trim();

      if (options.autoDecimalMode) {
        return getAutoDecimalModeConformedValue(str, previousConformedValue, formatConfig);
      }

      var ref = stripCurrencySymbolAndMinusSign$1(str, formatConfig);
      var value = ref.value;
      var negative = ref.negative;
      var incompleteValue = checkIncompleteValue(value, negative, previousConformedValue, formatConfig);

      if (incompleteValue != null) {
        return {
          conformedValue: incompleteValue
        };
      }

      var ref$1 = value.split(formatConfig.decimalSymbol);
      var integer = ref$1[0];
      var fraction = ref$1.slice(1);
      var integerDigits = removeLeadingZeros(onlyDigits(integer));
      var fractionDigits = onlyDigits(fraction.join('')).substr(0, formatConfig.decimalLength);

      if (isFractionInvalid(fraction, fractionDigits.length)) {
        return {
          conformedValue: previousConformedValue
        };
      }

      var number = integerDigits;

      if (negative) {
        number = "-" + number;
      }

      if (isNumber$1(number)) {
        return {
          conformedValue: Number(number + "." + fractionDigits),
          fractionDigits: fractionDigits
        };
      } else if (number === '-' && previousConformedValue !== formatConfig.negativePrefix) {
        return {
          conformedValue: previousConformedValue
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

  function dispatchEvent$1(el, eventName, data) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, true, true, data);
    el.dispatchEvent(event);
  }

  var init = function init(el, optionsFromBinding, defaultOptions) {
    var inputElement = el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input');

    if (!inputElement) {
      throw new Error('No input element found');
    }

    var options = Object.assign({}, defaultOptions, optionsFromBinding);
    var min = options.min;
    var max = options.max;
    var decimalLength = options.decimalLength;
    var distractionFree = options.distractionFree;
    var autoDecimalMode = options.autoDecimalMode;
    options.hideCurrencySymbol = options.currency == null || distractionFree === true || distractionFree.hideCurrencySymbol;
    options.hideNegligibleDecimalDigits = !autoDecimalMode && (distractionFree === true || distractionFree.hideNegligibleDecimalDigits);
    options.hideGroupingSymbol = distractionFree === true || distractionFree.hideGroupingSymbol;

    if (min != null && max != null && min > max) {
      throw new Error('Invalid value range');
    }

    if (decimalLength < 0 || decimalLength > 20) {
      throw new Error('Decimal length must be between 0 and 20');
    }

    var currencyFormat = createCurrencyFormat$1(options);

    if (currencyFormat.decimalLength > 0 && decimalLength !== undefined) {
      currencyFormat.decimalLength = decimalLength;
    }

    inputElement.$ci = Object.assign({}, inputElement.$ci || {}, {
      options: options,
      currencyFormat: currencyFormat,
      decimalFormat: Object.assign({}, currencyFormat, {
        prefix: '',
        negativePrefix: '-',
        suffix: ''
      })
    });
    return inputElement;
  };

  var applyFixedFractionFormat = function applyFixedFractionFormat(el, value) {
    var ref = el.$ci;
    var ref_options = ref.options;
    var min = ref_options.min;
    var max = ref_options.max;
    var locale = ref_options.locale;
    var decimalLength = ref.currencyFormat.decimalLength;

    if (value != null) {
      if (min != null && value < min) {
        value = min;
      }

      if (max != null && value > max) {
        value = max;
      }

      value = new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimalLength,
        maximumFractionDigits: decimalLength
      }).format(value);
    }

    format(el, value);
  };

  var updateInputValue = function updateInputValue(el, value, distractionFree) {
    if (distractionFree === void 0) distractionFree = false;

    if (value != null) {
      var ref = el.$ci;
      var options = ref.options;
      var decimalFormat = ref.decimalFormat;
      var currencyFormat = ref.currencyFormat;
      var focus = ref.focus;
      var previousConformedValue = ref.previousConformedValue;
      var hideCurrencySymbol = focus && options.hideCurrencySymbol;
      var formatConfig = hideCurrencySymbol ? decimalFormat : currencyFormat;
      var ref$1 = conformToMask(value, formatConfig, options, previousConformedValue);
      var conformedValue = ref$1.conformedValue;
      var fractionDigits = ref$1.fractionDigits;

      if (typeof conformedValue === 'number') {
        var formattedValue = new Intl.NumberFormat(options.locale, {
          useGrouping: !(focus && options.hideGroupingSymbol),
          minimumFractionDigits: distractionFree ? options.hideNegligibleDecimalDigits ? fractionDigits.replace(/0+$/, '').length : currencyFormat.decimalLength : fractionDigits.length
        }).format(Math.abs(conformedValue));
        var isNegativeZero = conformedValue === 0 && 1 / conformedValue < 0;
        el.value = "" + (isNegativeZero || conformedValue < 0 ? formatConfig.negativePrefix : formatConfig.prefix) + formattedValue + formatConfig.suffix;
        el.$ci.numberValue = conformedValue;
      } else {
        el.value = conformedValue;
        el.$ci.numberValue = parse$1(el.value, formatConfig);
      }
    } else {
      el.value = el.$ci.numberValue = null;
    }

    el.$ci.previousConformedValue = el.value;
  };

  var format = function format(el, value) {
    updateInputValue(el, value);
    dispatchEvent$1(el, 'format-complete', {
      numberValue: el.$ci.numberValue
    });
  };

  var addEventListener = function addEventListener(el) {
    el.addEventListener('input', function () {
      var value = el.value;
      var selectionStart = el.selectionStart;
      format(el, value);

      if (el.$ci.focus) {
        setCaretPosition(el, getCaretPositionAfterFormat(el, value, selectionStart));
      }
    }, {
      capture: true
    });
    el.addEventListener('format', function (ref) {
      var detail = ref.detail;

      if (!el.$ci.focus) {
        applyFixedFractionFormat(el, detail.value);
      }
    });
    el.addEventListener('focus', function () {
      el.$ci.focus = true;
      var ref = el.$ci;
      var currencyFormat = ref.currencyFormat;
      var options = ref.options;
      var distractionFree = options.distractionFree;
      var hideCurrencySymbol = options.hideCurrencySymbol;
      var hideGroupingSymbol = options.hideGroupingSymbol;
      var hideNegligibleDecimalDigits = options.hideNegligibleDecimalDigits;

      if (distractionFree === true || hideCurrencySymbol || hideGroupingSymbol || hideNegligibleDecimalDigits) {
        setTimeout(function () {
          var value = el.value;
          var selectionStart = el.selectionStart;
          var selectionEnd = el.selectionEnd;
          updateInputValue(el, el.value, true);

          if (Math.abs(selectionStart - selectionEnd) > 0) {
            el.setSelectionRange(0, el.value.length);
          } else {
            setCaretPosition(el, getCaretPositionAfterApplyingDistractionFreeFormat(currencyFormat, options, value, selectionStart));
          }
        });
      }
    });
    el.addEventListener('blur', function () {
      el.$ci.focus = false;
      applyFixedFractionFormat(el, el.$ci.numberValue);
    });
  };

  var directive = {
    bind: function bind(el, ref, ref$1) {
      var options = ref.value;
      var context = ref$1.context;
      var inputElement = init(el, options, context.$CI_DEFAULT_OPTIONS || defaultOptions);
      Vue.nextTick(function () {
        if (inputElement.value) {
          applyFixedFractionFormat(inputElement, parse$1(inputElement.value, inputElement.$ci.currencyFormat));
        }
      });
      addEventListener(inputElement);
    },
    componentUpdated: function componentUpdated(el, ref, ref$1) {
      var value = ref.value;
      var oldValue = ref.oldValue;
      var context = ref$1.context;

      if (!!value && Object.keys(defaultOptions).some(function (key) {
        return oldValue[key] !== value[key];
      })) {
        var inputElement = init(el, value, context.$CI_DEFAULT_OPTIONS || defaultOptions);
        applyFixedFractionFormat(inputElement, inputElement.$ci.numberValue);
      }
    }
  };

  var options = {
    locale: undefined,
    decimalLength: 2,
    autoDecimalMode: true,
    min: null,
    max: null,
    defaultValue: 0
  };

  var script = {
    name: 'VCurrencyField',
    props: {
      value: {
        type: [Number, String],
        default: function _default() {
          return options.defaultValue;
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
      }
    },
    methods: {
      listeners: function listeners() {
        var _this = this;

        // eslint-disable-next-line
        var _this$$listeners = this.$listeners,
            input = _this$$listeners.input,
            listeners = _objectWithoutProperties(_this$$listeners, ["input"]); // all but input event


        return {
          listeners: listeners,
          'format-complete': function formatComplete(_ref) {
            var detail = _ref.detail;

            if (detail.numberValue === null && _this.defaultValue !== null && _this.$el.querySelector('input').$ci.focus === false) {
              detail.numberValue = _this.defaultValue;
              dispatchEvent(_this.$el.querySelector('input'), 'format', {
                value: _this.defaultValue
              });
            }

            _this.$emit('input', detail.numberValue);

            _this.formattedValue = _this.$el.querySelector('input').value;
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
        };
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
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-text-field',_vm._g(_vm._b({directives:[{name:"currency-directive",rawName:"v-currency-directive",value:({currency: _vm.currency, locale: _vm.locale, distractionFree: _vm.distractionFree, decimalLength: _vm.decimalLength, autoDecimalMode: _vm.decimalMode, min: _vm.min, max: _vm.max}),expression:"{currency, locale, distractionFree, decimalLength, autoDecimalMode: decimalMode, min, max}"}],ref:"textfield",attrs:{"type":"tel"},model:{value:(_vm.formattedValue),callback:function ($$v) {_vm.formattedValue=$$v;},expression:"formattedValue"}},'v-text-field',_vm.attrs,false),_vm.listeners()))};
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

  var version = '3.0.4';

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
