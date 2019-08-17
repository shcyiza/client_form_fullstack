<script>
export default {
    name: "SitesButtons",
    props: {
        addresses:{
            type: Array,
            required: true
        }
    }
}
</script>

<template>
  <div class="sites-container">
      <div v-for="(place, i) in addresses" :key="i">
          <div class="button is-large is-fullwidth is-info">
              <p class="address-legend">{{place.street}}, {{place.zip_code}} {{place.city}}</p>
          </div>
      </div>
  </div>
</template>

<style lang="sass" scoped>
.address-legend
    font-size: smaller
</style>