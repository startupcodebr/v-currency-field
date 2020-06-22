<template>
  <div id="appRoot">
    <v-app id="inspire" class="app">
      <main>
        <v-content>
          <v-layout>
           <v-card>
            <v-card-text>
             <v-currency-field 
             label="Solo" 
             locale="pt-BR" 
             :auto-decimal-mode="true" 
             :decimal-length="{min: 0, max: 3}" 
             :default-value="50" 
             :value-as-integer="false"
             :allow-negative="false"
             flat 
             v-model="value">

             <template v-slot:append>
              $$
            </template>

          </v-currency-field>
          {{ value }}
        </v-card-text>

        <v-card-actions>
         <v-btn 
         small
         class="mr-4 white--text"
         @click.prevent="changeValue()"
         color="green darken-3">Change Value</v-btn> 
       </v-card-actions>
     </v-card>
   </v-layout>
 </v-content>


  <v-content>
    <v-layout>
      <v-card>
        <v-card-text>
          <v-currency-field
            class="title-branding"
            label="Monthly income"
            v-model="income"
            v-bind="currency_config_no_decimals"
            type="tel"
            :rules="[
                 v => parseFloat(v) > 0 || 'Monthly income cannot be zero',
                 v => parseFloat(v.toString().replace('.', '')) >= 20000 || 'Minimum income of R20 000'
            ]"
            :autocomplete="'new-password'"
            :disabled="checking"/>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-content>
</main>
</v-app>
</div>
</template>

<script>
  export default {
    name: 'demo',
    data() {
      return {
        currency_config: {
          decimal: ',',
          thousands: ' ',
          prefix: 'R ',
          precision: 0,
          min: null,
          max: null,
          masked: false,
        },
        currency_config_no_decimals: {
          decimalLength: 0,
          thousands: ' ',
          prefix: 'R ',
          precision: 0,
          min: null,
          max: null,
          masked: false,
        },
        value: 9716,
        income: 0,
        checking: false
      }
    },
    methods: {
      changeValue () {
       this.value = 117;
      }
   },
 }
</script>
