module.exports = {
  plugins: [
    require('./plugin.js')
  ],
  base: '/v-currency-field/',
  title: 'Vuetify Currency Field',
  description: 'Currency component for vuetify v-text-field',
  themeConfig: {
    search: false,
    nav: [{
      text: 'Release Notes',
      link: 'https://github.com/phiny1/v-currency-field/releases'
    }],
    sidebar: {
      '/': [
        '/started.md',
        '/config.md',
        '/versions.md',
      ]
    },
    repo: 'phiny1/v-currency-field',
    docsDir: 'docs',
    docsBranch: 'gh-pages',
    editLinks: false
  }
}
