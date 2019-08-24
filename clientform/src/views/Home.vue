<script>
export default {
  name: 'home',
  components: {},
  data() {
    return {
      company_code: this.$route.query.company || '',
    };
  },
  computed: {
    company() {
      return this.$store.getters.getCompanyDetails;
    },
  },
  methods: {
    companyRoute(main_path) {
      return `${main_path}${this.company_code ? `?company=${this.company_code}` : ''}`;
    },
  },
  created() {
    this.$store.dispatch('initCompanyData', this.company_code);
  },
};
</script>

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>{{company.name}} Choose your service</h1>
    <router-link :to="companyRoute('/carwash')">Carwash</router-link> |
    <router-link :to="companyRoute('/carwash')">Car-check</router-link>
  </div>
</template>
