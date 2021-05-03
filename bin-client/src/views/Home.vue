<template>
  <div>
    <WelcomeBanner v-if="getUser.user != null"/>
  </div>
</template>

<script>
import WelcomeBanner from "@/components/WelcomeBanner";
import {mapGetters} from "vuex";
export default {
  name: "Home",
  components: {WelcomeBanner},
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style scoped>

</style>