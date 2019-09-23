<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ServiceForm',
    computed: {
        ...mapGetters({
            order_offer_id: 'offerId',
            offers: 'getOffers',
        }),
    },
    methods: {
        selectOffer(id) {
            this.$store.commit('setOrderOffer', id);
        },
    },
    created() {
        if (!this.offers[0]) this.$store.dispatch('fetchOffers');
    },
};
</script>

<template>
    <div>
        <h2>Service form</h2>
        <div
        class="box selector"
        v-for="(offer, index) in offers"
        :key="index"
        @click="selectOffer(offer.id)"
        v-bind:class="offer.id === order_offer_id ?  'active' : ''"
        >
            <b>{{offer.name}}</b>
            <br>
            {{offer.nominal_price * (1 + offer.vat)}} €
        </div>
    </div>
</template>

<style scoped>
</style>
