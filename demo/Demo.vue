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
	    		:decimal-length="2" 
	    		:default-value="50" 
	    		:value-as-integer="true"
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
	</main>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'demo',
  data: () => ({
  	value: 9716
  }),
  methods: {
		changeValue () {
			this.value = 117;
		}
	},
}
</script>
