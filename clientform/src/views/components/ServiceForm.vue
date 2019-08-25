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
            serviceIndex: 'serviceIndex',
        }),
    },
    methods: {
        selectService(index) {
            this.$store.commit('setOrderService', index);
        },
    },
};
</script>

<template>
    <div>
        <h2>Service form</h2>
        <div
            class="box selector"
            v-for="(service, index) in services"
            :key="index"
            @click="selectService(index)"
            v-bind:class="serviceIndex === index ?  'active' : ''"
        >
            {{service}}
        </div>
    </div>
</template>

<style scoped>
</style>
