<script>
import { mapGetters } from 'vuex';
import { toast } from './helpers/toast_notification';

export default {
  data() {
    return {
      company_code: this.$route.query.company || '',
    };
  },
  computed: {
    ...mapGetters({
      company: 'getCompanyDetails',
    }),
  },
  methods: {
    handleToastNotification(e) {
      toast(
        this.$toasted,
        e.detail.message,
        e.detail.type,
      );
    },
  },
  created() {
    this.$store.dispatch('initCompanyData', this.company_code);
    document.addEventListener('toast-notification', this.handleToastNotification);
  },
  beforeDestroy() {
    document.removeEventListener('toast-notification', this.handleToastNotification);
  },
};
</script>

<template>
  <div id="app">
    <div id="nav">
      <h1>{{company.name || "Carjo"}}</h1>
      <h3>{{company.name && "Carjo"}}</h3>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
