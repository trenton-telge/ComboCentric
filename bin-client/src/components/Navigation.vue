<template>
  <nav class="fw">
    <router-link to="../Home">Home</router-link>
    <router-link v-if="!getUser.user" to="../Register">Register</router-link>
    <router-link v-if="!getUser.user" to="../Login">Log In</router-link>
    <router-link v-if="getUser.user != null" to="../Profile">{{ getUser.user.firstName }}</router-link>
    <p v-if="getUser.user != null" v-on:click="logOut">Log Out</p>
    <!--<router-link v-if="getUser.user != null && getUser.user.email === 'darkforce102@gmail.com'" to="Admin">Admin</router-link>-->
    <router-link v-if="getUser.user != null" to="../MakePost">Post Combo</router-link>
  </nav>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "Navigation",
  methods: {
    ...mapActions(['setUser']),
    logOut: function(){
      this.setUser({firstName: null, lastName: null, lastLogin: null, email: null, password: null, token: null});
      this.$router.push('Home');
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  mounted() {
  }
}
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }
  nav {
    background-color: aquamarine;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    padding-top: 5px;
    padding-bottom: 5px;
    height: 54px;
  }
  nav * {
    padding: 8px;
    color: black;
    font-size: 14pt;
  }
</style>