<script>
import { required } from 'vuelidate/lib/validators'
import FormField from './form/FormField'
import { mapGetters } from 'vuex'

export default {
    name: "CarForm",
    components: {
        FormField
    },
    computed: {
        ...mapGetters({
            plate: "getPlate",
            brand: "getBrand",
            model: "getModel"
        }),
        carAttr() {
            return ["plate", "brand", "model"]
        }
    },
    validations: {
        plate: {
            required
        },
        brand: {
            required
        },
        model: {
            required
        }
    },
    methods: {
        updateStore (attr, value) {
            this.$store.dispatch('updateCarAttr', {attr,  value})
        }
    }
}
</script>

<template>
    <div class="custom-form">
        <h2>Car Form</h2>

        <div v-for="(attr, i) in carAttr" :key="i">
            <form-field
                    :label="attr"
                    :value="$v[attr].$model"
                    :warnings="[
                        {validator: !$v[attr].required, message: 'required'},
                    ]"
                    @input="updateStore(attr, $event)"
            />
        </div>
    </div>
</template>

<style scoped>

</style>