<script>
export default {
    name: "SitesButtons",
    props: {
        sites:{
            type: Array,
            required: true
        }
    }
}
</script>

<template>
  <div class="sites-container">
      <div v-for="(place, i) in sites" :key="i">
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