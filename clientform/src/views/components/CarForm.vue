<script>
import { mapGetters } from 'vuex';
import CarSelector from './form/CarSelector.vue';

const initCarDraft = () => ({
    plate_number: '',
    brand: '',
    model: '',
    color: '',
});

export default {
    name: 'CarForm',
    components: {
        CarSelector,
    },
    data() {
        return {
            car_draft: initCarDraft(),
        };
    },
    computed: {
        ...mapGetters({
            cars: 'getCars',
            user: 'getAuthedUser',
        }),
        carAttr() {
            return Object.keys(this.car_draft);
        },
    },
    methods: {
        addCar(event) {
            event.preventDefault();
            this.$store.dispatch('addCar', this.car_draft);
            this.car_draft = initCarDraft();
        },
    },
    created() {
    },
};
</script>

<template>
    <div class="custom-form">
        <h2>Car Form</h2>

        <car-selector :cars="cars"/>

        <form
                id="add-car"
                @submit="addCar"
        >
            <div v-for="(attr, i) in carAttr" :key="i">
                <label class="label">{{attr}}</label>
                <input class="input"
                        v-model="car_draft[attr]"
                />
            </div>

            <button class="button" type="submit">Add Car</button>
        </form>
    </div>
</template>

<style scoped>

</style>
