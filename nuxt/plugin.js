import Vue from 'vue';
import VCurrencyField from 'currency-field';

Vue.use(VCurrencyField, <%= serialize(options) %>);
