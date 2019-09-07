<script>
import car_brands from '../../../../public/car_brands.json';

export default {
    name: 'AutoComplete',
    data() {
        return {
            current_selection: 0,
        };
    },
    props: {
        query: {
            type: String,
            required: true,
        },
        last_selected: {
            type: String,
            required: true,
        },
    },
    computed: {
        filteredBrands() {
            return car_brands.filter(
                (brand) => (brand.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1),
            );
        },
    },
    methods: {
        selectBrand(brand_name) {
            this.$emit('input', brand_name);
        },
        handleKeyboardInterface(event) {
            const { key } = event;
            const selected = this.current_selection;
            const { original_index } = this.filteredBrands[this.current_selection];

            switch (key) {
            case 'ArrowUp':
                event.preventDefault();
                if (selected > 0) this.current_selection = selected - 1;
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (selected < this.filteredBrands.length - 1) {
                    this.current_selection = selected + 1;
                }
                break;
            case 'Enter':
                event.preventDefault();
                this.selectBrand(car_brands[original_index].name);
                break;
            default:
                break;
            }
        },
    },
    mounted() {
        document.addEventListener('keydown', this.handleKeyboardInterface);
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.handleKeyboardInterface);
    },
};
</script>

<template>
    <ul class="autocomplete-results ac-el" v-if="query.length > 0 && query !== last_selected">
        <li
        v-for="(brand, i) in filteredBrands"
        :key="i"
        @click="selectBrand(brand.name)"
        @mouseover="current_selection = i"
        class="autocomplete-result ac-el"
        :class="{
            'is-active': last_selected === brand.name,
            'is-hovered': current_selection === i,
        }"
        >
            <div class="columns">
                <div class="column">
                    <img :src="brand.logo" :alt="brand.name" height="60" width="60"/>
                </div>
                <div class="column">
                    {{ brand.name }}
                </div>
            </div>


        </li>
    </ul>
</template>

<style lang="sass" scoped>
.autocomplete
    position: relative
    display: inline-block
    width: 130px

.autocomplete-results
    top: 100%
    z-index: 99
    border: 1px solid #eeeeee
    max-height: 350px
    overflow: hidden
.autocomplete-result
    height: 70px
    list-style: none
    text-align: left
    padding: 4px 2px
    cursor: pointer
    &.is-hovered
        background-color: #4AAE9B
        color: white
    &.is-active
        background-color: #a8d8e5
        color: black
</style>
