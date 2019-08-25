<script>
import {mapGetters} from "vuex";

export default {
    name: 'CarSelector',
    props: {
        cars: {
            type: Array,
            required: true,
        },
    },
    computed: {
        ...mapGetters({
            carId: 'carId',
        }),
    },
    methods: {
        selectCar(id) {
            this.$store.commit('setOrderCar', id);
        },
    },
};
</script>

<template>
  <div class="sites-container">
      <div
          class="box selector"
          v-for="(car, i) in cars"
          :key="i"
          v-bind:class="carId === car.id ?  'active' : ''"
          @click="selectCar(car.id)"
      >
          <p class="address-legend">{{car.plate_number}}, {{car.model}} {{car.brand}}</p>
      </div>
  </div>
</template>

<style lang="sass" scoped>
.address-legend
    font-size: smaller
</style>
