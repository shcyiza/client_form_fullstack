<script>
export default {
  name: 'CarSelector',
  props: {
    cars: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <div class="sites-container">
      <div v-for="(car, i) in cars" :key="i" class="box selector">
          <p class="address-legend">{{car.plate_number}}, {{car.model}} {{car.brand}}</p>
      </div>
  </div>
</template>

<style lang="sass" scoped>
.address-legend
    font-size: smaller
</style>
