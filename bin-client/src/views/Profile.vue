<template>
  <div class="registration mid-width">
    <div v-if="getUser.user">
      <h4>Edit Profile</h4>
      <b-form @submit.prevent="update">
        <b-form-input v-model="user.firstName" id="firstName" name="firstName" :placeholder="autofill.firstName"></b-form-input>
        <b-form-input v-model="user.lastName" id="lastName" name="lastName" :placeholder="autofill.lastName"></b-form-input>
        <b-form-input v-model="user.email" id="email" name="email" :placeholder="autofill.email"></b-form-input>
        <b-form-input v-model="user.password" id="password" name="password" placeholder="New Password" type="password"></b-form-input>
        <button class="btn btn-primary btn-md">Update Information</button>
      </b-form>
      <h4>Delete Profile</h4>
      <b-form @submit.prevent="del">
        <button class="btn btn-danger btn-md">Delete Profile</button>
      </b-form>
    </div>
    <div v-else>
      <h3>You must be logged in to view this page.</h3>
      <router-link to="Login">Log In</router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UserService from "@/userService";
export default {
  name: "Profile",
  data() {
    return {
      autofill: {
        firstName: null,
        lastName: null,
        email: null,
        password: null
      },
      user: {
        _id: null,
        firstName: null,
        lastName: null,
        lastLogin: null,
        email: null,
        password: null,
        token: null
      },
      status: null
    }
  },
  methods: {
    ...mapActions(['setUser']),
    async update() {
      this.user._id = this.getUser.user._id;
      this.user.firstName === ''?this.user.firstName = this.getUser.user.firstName:{};
      this.user.lastName === ''?this.user.lastName = this.getUser.user.lastName:{};
      this.user.lastLogin = this.getUser.user.lastLogin;
      this.user.email === ''?this.user.email = this.getUser.user.email:{};
      this.user.password === ''?this.user.password = this.getUser.user.password:{};
      this.user.token = this.getUser.user.token;
      try {
        UserService.updateUser(this.user).then((user) => {
          if (Object.keys(user).includes('errors')){
            this.status = user.errors.message;
          } else {
            console.log(user)
            this.setUser(user)
            this.$router.push('Home');
          }
        }).catch((e)=>{console.error(e)})
      } catch (e) {console.error(e)}
    },
    async del() {
      try {
        UserService.deleteUser(this.getUser.user._id).then((res) => {
          if (Object.keys(res).includes('errors')) {
            this.status = res.errors.message;
          } else {
            this.logOut();
            this.$router.push('Home');
          }
        })
      } catch (e) {console.error(e)}
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  mounted() {
    this.autofill = this.getUser.user
    this.user._id = this.getUser.user._id
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