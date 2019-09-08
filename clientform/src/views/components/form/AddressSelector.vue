<script>
import { mapGetters } from 'vuex';

export default {
    name: 'SitesButtons',
    props: {
        addresses: {
            type: Array,
            required: true,
        },
    },
    computed: {
        ...mapGetters({
            addressId: 'addressId',
        }),
    },
    methods: {
        selectAddress(id) {
            this.$store.commit('setOrderAddress', id);
        },
    },
};
</script>

<template>
  <div class="sites-container">
      <div
          class="box selector"
          v-for="(address, i) in addresses"
          :key="i"
          v-bind:class="addressId === address.id ?  'active' : ''"
          @click="selectAddress(address.id)"
      >
          <div>{{address.name}}</div>
          <div class="address-legend">
              {{address.street}},
              {{address.city}},
              {{address.zip}}
          </div>
      </div>
  </div>
</template>

<style lang="sass" scoped>
.address-legend
    font-size: smaller
</style>
