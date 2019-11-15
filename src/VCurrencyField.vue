<template>
  <v-text-field
   ref="textfield"
   v-model="formattedValue"
   v-bind="attrs"
   v-on="listeners()"
   type="tel"
   v-currency-directive="{currency, locale, distractionFree, decimalLength, autoDecimalMode, min, max}"/>
</template>

<script>
import dispatchEvent from 'vue-currency-input/src/utils/dispatchEvent';
import { stripCurrencySymbolAndMinusSign } from 'vue-currency-input/src/utils/formatHelper'
import parse from 'vue-currency-input/src/utils/parse';
import { CurrencyDirective } from 'vue-currency-input';
import defaults from './options';

export default {
  name: 'VCurrencyField',
  props: {
    value: {
      type: [Number, String],
      default: () => defaults.defaultValue,
    },
    locale: {
      type: String,
      default: () => defaults.locale,
    },
    decimalLength: {
      type: Number,
      default: () => defaults.decimalLength,
    },
    autoDecimalMode: {
      type: Boolean,
      default: () => defaults.autoDecimalMode,
    },
    min: {
      type: Number,
      default: () => defaults.min,
    },
    max: {
      type: Number,
      default: () => defaults.max,
    },
    defaultValue: {
      type: Number,
      default: () => defaults.defaultValue,
    },
  },
  directives: { CurrencyDirective },
  data() {
    return {
      currency: null,
      formattedValue: this.defaultValue,
    };
  },
  computed: {
    attrs() {
      // eslint-disable-next-line
      const { value, ...attrs } = this.$attrs; // all but input event
      return attrs;
    },
    distractionFree(){
      return !this.autoDecimalMode;
    }
  },
  methods: {
    listeners() {
      // eslint-disable-next-line
      const { input, ...listeners } = this.$listeners; // all but input event
      return {
        listeners,
        'format-complete': ({ detail }) => {
          if (detail.numberValue === null && this.defaultValue !== null && this.$el.querySelector('input').$ci.focus === false) {
            detail.numberValue = this.defaultValue;
            dispatchEvent(this.$el.querySelector('input'), 'format', { value:  this.defaultValue})
          }

          this.$emit('input', detail.numberValue);
          this.formattedValue = this.$el.querySelector('input').value;
        },
        'keyup': (event) => {
          if (event.key === '-' || event.key === '+') {
            let { value, negative } = stripCurrencySymbolAndMinusSign(this.$el.querySelector('input').value, {prefix: '', suffix: ''})

            const numberParts = value.split(this.$el.querySelector('input').$ci.currencyFormat.decimalSymbol)

            let parsedValue = parse(value, this.$el.querySelector('input').$ci.currencyFormat)
            let stringValue = null

            if (numberParts.length === 2) {
              const fraction = numberParts[1]

              stringValue = new Intl.NumberFormat(this.locale, { minimumFractionDigits: fraction.length, maximumFractionDigits: fraction.length }).format(parsedValue)
            }
            
            let numberValue = stringValue || parsedValue

            if (event.key === '-' && !negative && numberValue !== null) {
              this.$el.querySelector('input').value = `-${numberValue}`
              dispatchEvent(this.$el.querySelector('input'), 'input')
            }
            
            if (event.key === '+' && negative && numberValue !== null) {
              this.$el.querySelector('input').value = `${numberValue}`
              dispatchEvent(this.$el.querySelector('input'), 'input')
            }
          }
        }
      };
    }
  }
};
</script>
