<script>
import { toast } from './helpers/toast_notification';

export default {
  methods: {
    handleToastNotification(e) {
      console.log(e)
      toast(
        this.$toasted,
        e.detail.message,
        e.detail.type,
      );
    }
  },
  created() {
    document.addEventListener('toast-notification', this.handleToastNotification)
  },
  beforeDestroy() {
    document.removeEventListener('toast-notification', this.handleToastNotification)
  }
}
</script>

<template>
  <div id="app">
    <div id="nav">
      <!--<router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>-->
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
