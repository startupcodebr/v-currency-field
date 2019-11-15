---
sidebarDepth: 3
---

# Guide

## Introduction
The Vuetify Currency Field uses [Vue Currency Input](https://dm4t2.github.io/vue-currency-input/) directive to create a currency component (`<v-currency-field>`) with all features of v-text-field.
The component is compatible with vuetify 1.x and 2.x and dynamic binds the props and listeners to v-text-field component.

## Installation

Install the npm package:
``` bash
npm install v-currency-field 
# OR 
yarn add v-currency-field
```

### Vue Cli
#### No Treeshaking

Registry `<v-currency-field>` component globally in your `main.js`:

<<< @/docs/started/main.notreeshaking.js

#### Treeshaking

Registry `<v-currency-field>` and `<v-text-field>` component globally in your `main.js`:

<<< @/docs/started/main.treeshaking.js

With treeshaking enabled, webpack don't reconize v-text-field inside v-currency-field component. That's why is necessery registry `<v-text-field>` globally.

### Nuxt
#### No Treeshaking

Add `v-currency-field/nuxt` to the modules section of `nuxt.config.js`:

<<< @/docs/started/nuxt.config.js

#### Treeshaking

Add `v-currency-field/nuxt-treeshaking` to the modules section of `nuxt.config.js`:

<<< @/docs/started/nuxt.config.treeshaking.js

### Direct download via CDN

If you don't use a module system you can also download the plugin as UMD bundle via CDN. 
Include the plugin after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/v-currency-field"></script>
```

## Usage
### Component
The `<v-currency-field>` component works with all `<v-text-field>` props. All [currency props](./config.md) are optional.

<<< @/docs/started/ComponentUsage.vue
