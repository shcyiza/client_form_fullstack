<script>
export default {
  name: 'form-field',
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    warnings: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      inputVal: this.value,
    };
  },
  computed: {
    hasWarning() {
      return !!this.warnings.find((w) => w.validator === true);
    },
  },
  watch: {
    inputVal(val) {
      this.$emit('input', val);
    },
    value() {
      if (this.value !== this.inputVal) {
        this.inputVal = this.value;
      }
    },
  },
};
</script>

<template>
    <div class="field">
        <label class="label">{{label}}</label>
        <div class="control has-icons-left has-icons-right">
            <input class="input"
                   v-bind:class="{ 'is-danger': hasWarning }"
                   v-model="inputVal"
            >
        </div>
        <div warning v-for="(warning, i) in warnings" v-bind:key="i">
            <p v-if="warning.validator" class="help is-danger">{{warning.message}}</p>
        </div>
    </div>
</template>

<style scoped>

</style>
