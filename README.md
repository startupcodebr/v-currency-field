# Vuetify Currency Field (Version 1.0.8 DEPRECATED)

## Features
- All features from v-money as v-text-field of vuetify.

## Compatibility

| branch    | tag         | release |   |   Vuetify   |  Based On   |
|:----------|-------------|--------:|:-:| :---------: | :---------: |
| master    | latest      | 3.x.x   | → | 1.x & 2.x   | [vue currency input](https://dm4t2.github.io/vue-currency-input/)
| 2.x       | vuetify-2.x | 2.0.0   | → | 2.x         | [v-money](https://github.com/64robots/v-money)
| 1.x       | vuetify-1.x | 1.0.8   | → | 1.x         | [v-money](https://github.com/64robots/v-money)

## Usage

### Globally

```js
import Vue from 'vue'
import currency from 'v-currency-field'

import 'v-currency-field/dist/index.css'

Vue.use(currency)
```

### Example

```html
<template>
  <div>
    <v-currency-field label="Value" v-bind="currency_config" :error-messages="errors.price" v-model="price"></v-currency-field>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        errors: {},
        price: 123.45,
        currency_config: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          suffix: ' #',
          precision: 2,
          masked: false,
          allowBlank: false
        }
      }
    }
  }
</script>
```

## Properties

All v-money properties

| property   | Required | Type    | Default                 | Description                                             |
|------------|----------|---------|-------------------------|---------------------------------------------------------|
| precision  | **true** | Number  | 2                       | How many decimal places                                 |
| decimal    | false    | String  | "."                     | Decimal separator                                       |
| thousands  | false    | String  | ","                     | Thousands separator                                     |
| prefix     | false    | String  | ""                      | Currency symbol followed by a Space, like "R$ "         |
| suffix     | false    | String  | ""                      | Percentage for example: " %"                            |
| masked     | false    | Boolean | false                   | If the component output should include the mask or not  |
| allowBlank | false    | Boolean | false                   | If the field can start blank and be cleared out by user |

And all vuetify properties

| property              | Required | Type             |  Observation             |
|-----------------------|----------|------------------| -------------------------|
| appendOuterIcon       | false    | String           |                          |
| appendOuterIconCb     | false    | Function         | Working but deprecated   |
| @click:append-outer   | false    | Function         | Not Working              |
| autofocus             | false    | Boolean          |                          |
| box                   | false    | Boolean          |                          |
| browserAutocomplete   | false    | String           | Not Tested               |
| clearable             | false    | Boolean          | Not Working Event        |
| clearIcon             | false    | String           |                          |
| clearIconCb           | false    | Number           | Working but deprecated   |
| @click:clear          | false    | Number           | Not Working              |
| color                 | false    | String           |                          |
| flat                  | false    | Boolean          |                          |
| fullWidth             | false    | Boolean          |                          |
| label                 | false    | String           |                          |
| outline               | false    | Boolean          |                          |
| prependInnerIcon      | false    | String           |                          |
| prependInnerIconCb    | false    | Function         | Working but deprecated   |
| @click:prepend-inner  | false    | Function         | Not Working              |
| reverse               | false    | Boolean          |                          |
| singleLine            | false    | Boolean          |                          |
| solo                  | false    | Boolean          |                          |
| soloInverted          | false    | Boolean          |                          |
| error-messages        | false    | []               |                          |
| disabled              | false    | Boolean          |                          |
| readonly              | false    | Boolean          |                          |
| dark                  | false    | Boolean          |                          |
| height                | false    | String           |                          |
| hint                  | false    | String           |                          |
| light                 | false    | Boolean          |                          |
| background-color      | false    | String           |                          |
| hide-details          | false    | Boolean          |                          |


### References

- https://github.com/64robots/v-money
- https://vuetifyjs.com/pt-BR/components/text-fields
