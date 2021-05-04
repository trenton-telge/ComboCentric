<template>
  <div>
    <div v-if="this.getUser.user">
      <h4>Post a Combo</h4>
      <b-form @submit.prevent="postCombo">
        <b-form-select v-model="numberOfCards" :options="options"></b-form-select>
        <b-form-input v-model="cardNames[0]" placeholder="Card 1"></b-form-input>
        <b-form-input v-model="cardNames[1]" placeholder="Card 2"></b-form-input>
        <b-form-input v-model="cardNames[2]" v-if="numberOfCards >= 3" placeholder="Card 3"></b-form-input>
        <b-form-input v-model="cardNames[3]" v-if="numberOfCards >= 4" placeholder="Card 4"></b-form-input>
        <b-form-input v-model="cardNames[4]" v-if="numberOfCards >= 5" placeholder="Card 5"></b-form-input>
        <button class="btn btn-primary btn-md">Make Post</button>
      </b-form>
    </div>
    <div v-else>
      <h3>You must be logged in to view this page.</h3>
      <router-link to="Login">Log In</router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ScryfallService from "@/scryfallService";
import ComboService from "@/comboService";
export default {
  name: "MakePost",
  data() {
    return {
      options: [2, 3, 4, 5],
      cardNames: ['', '', '', '', ''],
      numberOfCards: 2,
      post: {
        author: null,
        cards: []
      },
      status: null
    }
  },
  methods: {
    async postCombo(){
      try {
        const loops = this.numberOfCards;
        let current = 1;
        while (current <= loops) {
          this.post.cards.push(await ScryfallService.getScryfallIDByName(this.cardNames[current-1]));
          current++;
        }
        ComboService.postCombo(this.post).then((combo) => {
          console.log(combo)
          this.$router.push(`/combo/${combo._id}`)
        })
      } catch (e) {
        console.error(e);
      }
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  mounted() {
    this.post.author = this.getUser.user._id
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