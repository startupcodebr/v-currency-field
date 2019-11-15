<template>
  <v-currency-field 
  label="Rate" 
  :error-messages="errors.rate"
  filled
  v-model="rate"/>
</template>

<script>
export default {
  data: () => ({
    rate: 0,
    errors: {}
  })
}
</script>