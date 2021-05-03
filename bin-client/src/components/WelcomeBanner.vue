<template>
  <div>
    <h2>Welcome to ComboCentric, {{ getUser.user.firstName }}</h2>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "WelcomeBanner",
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style scoped>

</style>