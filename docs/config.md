---
sidebarDepth: 2
---

# Configurations

::: tip
You can override the shipped defaults with the [plugin options](#plugin-options) so you don't have configure each component instance separately.
:::

## Component props
The `<v-currency-field>` component provides the following props:
Name | Type | Description
--- | --- | --- 
`value` | Number |  The value of the input. `v-model` is supported.
`prefix` | String | `v-text-field` prefix that could be currency code (for example `$` or `BRL`).
`suffix` | String | `v-text-field` suffix that could be currency code (for example `USD`).
`locale` | String | A [BCP 47](https://tools.ietf.org/html/bcp47) language tag (for example `en` or `pt-BR`). The locale define grouping symbol (`decimal` and `thousands`).  Default is `undefined` (use the runtime's default locale).
`auto-decimal-mode` | Boolean | When `true` leave the formatted value untouched on focus. When `false` negligible decimal digits and the grouping symbol on focus. Default is `true`.
`decimal-length` | Number or Object | The number of displayed decimal digits. Default is `2`. Must be between 0 and 20. You can also pass an object {min, max} to use a decimal range (ranges are not available when using `auto-decimal-mode` or `value-as-integer`).
`min` | Number | Minimum value. Default is `null` (no limitation). Must be less than `max`.
`max` | Number | Maximum value. Default is `null` (no limitation). Must be greater than `min`.
`default-value` | Number | Set a default value to field. Default is `0`. Can be setted to `null` to accept blank value.
`allow-negative` | Boolean | Whether the input of negative values is allowed. Default is `true`. If `false` it prevents the user to press <kbd>-</kbd>.
`value-as-integer` | Boolean | Whether the number value should be handled as integer instead of float value. Default is `false`.

## Plugin options
To customize the plugin installation you can optionally pass an `options` object to `Vue.use()`:
```js
Vue.use(VCurrencyField, { 
    locale: 'pt-BR',
	decimalLength: 2,
	autoDecimalMode: true,
	min: null,
	max: null,
	defaultValue: 0,
    valueAsInteger: false,
    allowNegative: true
})
```