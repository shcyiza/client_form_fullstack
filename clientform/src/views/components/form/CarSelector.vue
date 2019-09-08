<script>
import { mapGetters } from 'vuex';
import car_brands from '../../../../public/car_brands.json';


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
        car_logos() {
            return this.cars.map((car) => this.brandObject(car.brand).logo);
        },
    },
    methods: {
        selectCar(id) {
            this.$store.commit('setOrderCar', id);
        },
        brandObject(queried_brand) {
            return car_brands.find((brand) => brand.name === queried_brand);
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
          <div class="columns ">
              <div class="column">
                  <img
                  v-if="car_logos[i]"
                  :src="car_logos[i]"
                  :alt="car.brand"
                  height="60" width="60"
                  />
                  <p v-else class="address-legend">{{car.brand}}</p>
              </div>
              <div class="column">
                  <p class="address-legend">{{car.model}}</p>
                  <p class="address-legend">{{car.plate_number}}</p>
              </div>
              <div class="column">
                  <svg height="32" width="32">
                      <circle cx="16" cy="16" r="15" :fill="car.color" />
                  </svg>
              </div>
          </div>
      </div>
  </div>
</template>

<style lang="sass" scoped>
.address-legend
    font-size: smaller
.box
    margin: 10px
</style>
