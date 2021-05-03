<template>
  <div class="registration mid-width">
    <h4>Register</h4>
    <b-form @submit.prevent="register">
      <b-form-input v-model="user.firstName" id="firstName" name="firstName" placeholder="First Name"></b-form-input>
      <b-form-input v-model="user.lastName" id="lastName" name="lastName" placeholder="Last Name"></b-form-input>
      <b-form-input v-model="user.email" id="email" name="email" placeholder="Email"></b-form-input>
      <b-form-input v-model="user.password" id="password" name="password" placeholder="Password" type="password"></b-form-input>
      <button class="btn btn-primary btn-md">Register</button>
    </b-form>
    <p v-if="status">{{status}}</p>
  </div>
</template>

<script>
import UserService from "@/userService";
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: "RegistrationForm",
  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
        lastLogin: null,
        email: null,
        password: null
      },
      status: null
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async register() {
      try {
        UserService.register(this.user).then((newAccount) => {
          if (Object.keys(newAccount).includes('errors')){
            this.status = newAccount.errors.message;
          } else {
            console.log(newAccount)
            this.setUser(newAccount)
            this.$router.push('Home');
          }
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