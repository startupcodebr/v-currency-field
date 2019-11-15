module.exports = {
   productionSourceMap: false,
   lintOnSave: false,
   pluginOptions: {
     p11n: {
       configureRollup: {
         external: ['vuetify/lib']
       }
     }
   }
}