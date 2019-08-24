
<template>
  <div class="sites-container">
      <div v-for="(place, i) in addresses" :key="i" class="box selector">
          <div>{{place.name}}</div>
          <div class="address-legend">{{place.street}}, {{place.zip_code}} {{place.city}}</div>
      </div>
  </div>
</template>

<style lang="sass" scoped>
.address-legend
    font-size: smaller
</style>

<script>
export default {
  name: 'SitesButtons',
  props: {
    addresses: {
      type: Array,
      required: true,
    },
  },
};
</script>
