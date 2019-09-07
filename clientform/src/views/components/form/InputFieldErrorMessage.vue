<script>
export default {
    props: {
        errors: {
            type: Array,
            required: false,
        },
        validators: {
            type: Array,
            required: false,
        },
    },
    computed: {
        firstError() {
            return this.validators.find((validator) => validator.validate === this.errors[0]);
        },
    },
};
</script>

<template>
    <div v-if="errors.length > 0">
        <p v-if="firstError.instruction" class="help is-danger">
            {{firstError.instruction}}
        </p>
        <p v-else class="help is-danger">
            The rule '{{firstError.instruction}}' must be respected.
        </p>
    </div>
</template>

<style lang="sass">

</style>
