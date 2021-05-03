<template>
  <div class="login mid-width">
    <h4>Log In</h4>
    <b-form @submit.prevent="login">
      <b-form-input v-model="user.email" id="email" name="email" placeholder="Email"></b-form-input>
      <b-form-input v-model="user.password" id="password" name="password" placeholder="Password" type="password"></b-form-input>
      <button class="btn btn-primary btn-md">Log In</button>
    </b-form>
    <p v-if="status">{{status}}</p>
  </div>
</template>

<script>
import UserService from "@/userService";
import {mapGetters, mapActions} from 'vuex'
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: null,
        password: null
      },
      status: null
    }
  },
  methods: {
    ...mapActions(['setUser']),
    async login() {
      try {
        UserService.login(this.user).then((user) => {
          this.setUser(user);
          this.$router.push('Profile');
        }).catch((e)=>{console.error(e)});
      } catch (e) {console.error(e)}
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style scoped>
.mid-width {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
h4 {
  margin-top: 20px;
  width: 100%;
}
input, button {
  margin-top: 10px;
  width: 600px;
}
</style>