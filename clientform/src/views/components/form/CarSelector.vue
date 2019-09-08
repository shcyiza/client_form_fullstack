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
            return this.cars.map((car) => {
                const brand_obj = this.brandObject(car.brand)
                return brand_obj && brand_obj.logo
            });
        },
    },
    methods: {
        selectCar(id) {
            this.$store.commit('setOrderCar', id);
        },
        brandObject(queried_brand) {
            return car_brands.find(
                (brand) => brand.name.toLowerCase() === queried_brand.toLowerCase(),
            );
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
                  <p v-else class="address-legend"><b>Brand:</b> {{car.brand}}</p>
              </div>
              <div class="column">
                  <p class="address-legend"><b>Model:</b> {{car.model}}</p>
                  <div class="plate-number">{{car.plate_number}}</div>
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
.plate-number
    background-color: white
    color: red
    font-size: 13px
    font-weight: bold
    padding: 5px
    border: 2px solid red
    border-radius: 5px
    width: 100%
</style>
