<template>
  <div>
    <WelcomeBanner v-if="this.getUser.user != null"/>
    <h1 v-else>ComboCentric</h1>
    <div v-if="dataReady">
      <router-link :to="`/Combo/${this.combos[0]._id}`">
        <div class="card-wheel">
          <img v-for="card in this.photos[0]" :src="card" :key="card" alt="" />
        </div>
        <p>Submitted by {{ this.authors[0].firstName }}</p>
      </router-link>
      <router-link :to="`/Combo/${this.combos[1]._id}`">
        <div class="card-wheel">
          <img v-for="card in this.photos[1]" :src="card" :key="card" alt="" />
        </div>
        <p>Submitted by {{ this.authors[1].firstName }}</p>
      </router-link>
      <router-link :to="`/Combo/${this.combos[2]._id}`">
        <div class="card-wheel">
          <img v-for="card in this.photos[2]" :src="card" :key="card" alt="" />
        </div>
        <p>Submitted by {{ this.authors[2].firstName }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import WelcomeBanner from "@/components/WelcomeBanner";
import {mapGetters} from "vuex";
import ComboService from "@/comboService";
import ScryfallService from "@/scryfallService";
import UserService from "@/userService";
export default {
  name: "Home",
  components: {WelcomeBanner},
  data() {
    return {
      numCombos: 3,
      combos: [],
      photos: [[],[],[]],
      authors: [[],[],[]],
      dataReady: false
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  async mounted() {
    this.combos = await ComboService.getRandomCombos(this.numCombos);
    console.log(this.combos)
    let current = 1;
    while (current <= this.combos.length) {
      let currentPhoto = 1;
      while (currentPhoto <= this.combos[current-1].cards.length) {
        this.photos[current - 1][currentPhoto - 1] = await ScryfallService.getPhotoByID(this.combos[current - 1].cards[currentPhoto - 1])
        console.log(this.photos[current - 1][currentPhoto - 1])
        currentPhoto++;
      }
      current++;
    }
    current = 1;
    while (current <= this.combos.length) {
      this.authors[current-1] = await UserService.getUser(this.combos[current-1].author);
      current++;
    }
    this.dataReady = true;
  }
}
</script>

<style scoped>
h1 {
  margin-top:10px;
}
.card-wheel {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  padding:10px;
  max-width: 100%;
}
.card-wheel img {
  padding: 8px;
  max-width: 300px;
  border-radius: 10px;
}
</style>