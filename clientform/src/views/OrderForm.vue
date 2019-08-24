<script>
import { mapGetters } from 'vuex';
import CarForm from './components/CarForm.vue';
import AddressForm from './components/AddressForm.vue';
import { notifySuccess } from '../helpers/toast_notification';

export default {
  name: 'OrderForm',
  data() {
    return {
      // user: {},
      // cars: [],
    };
  },
  components: {
    CarForm,
    AddressForm,
  },
  computed: {
    ...mapGetters({
      company: 'getCompanyDetails',
      user: 'getAuthedUser',
    }),
  },
  methods: {
    getAuthedUser() {
      this.$store.dispatch(
        'fetchAuthedUser',
        this.endSession.bind(this),
      );
    },
    endSession() {
      localStorage.removeItem('user_session_token');
      this.$router.push('/');
    },
    logout() {
      this.endSession();
      notifySuccess('Thank you, see you soon!');
    },
  },
  created() {
    this.getAuthedUser();
  },
};
</script>

<template>
    <div>
        <div class="has-text-left">
            <h5><b>Hey,</b> {{user.first_name}} {{user.last_name}}</h5>
        </div>

        <div class="has-text-right">
            <a class="button is-danger" @click="logout">log out</a>
        </div>

        <hr>

        <div class="columns">
            <div class="column form-container">
                <h2>Service form</h2>
                <a class="button">Car-wash</a>
                <a class="button">Car-check</a>
            </div>
            <car-form class="column form-container"/>
            <address-form class="column form-container"/>

        </div>
    </div>
</template>

<style lang="sass" scoped>
.form-container
    padding: 0px 50px 0px 50px
</style>
