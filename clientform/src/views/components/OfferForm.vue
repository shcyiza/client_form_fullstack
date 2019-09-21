<script>
import { mapGetters } from 'vuex';
import { AVAILABLE_SERVICE } from '../../helpers/constants';

export default {
    name: 'ServiceForm',
    data() {
        return {
            services: AVAILABLE_SERVICE,
        };
    },
    computed: {
        ...mapGetters({
            order_offer_id: 'offerId',
            company: 'getCompanyInfo',
        }),
    },
    methods: {
        selectOffer(id) {
            this.$store.commit('setOrderOffer', id);
        },
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
