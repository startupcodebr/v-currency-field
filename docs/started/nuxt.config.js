{
  buildModules: [
    ['@nuxtjs/vuetify']
  ],
  modules: [
  	['v-currency-field/nuxt', {
      locale: 'pt-BR',
      decimalLength: 2,
      autoDecimalMode: true,
      min: null,
      max: null,
      defaultValue: 0,
      valueAsInteger: false,
      allowNegative: true
    }]
  ]
}