<template>
<div id="appRoot">
  <v-app id="inspire" class="app">
    <main>
      <v-content>
	  	<v-layout>
	      <v-card>
	    	<v-card-text>
	    		<v-currency-field label="Solo" locale="pt-BR" :auto-decimal-mode="true" :decimal-length="2" :default-value="0" flat v-model="value"/>
	    		{{ value }}
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
  data: () => ({
  	value: 1593
  })
}
</script>
