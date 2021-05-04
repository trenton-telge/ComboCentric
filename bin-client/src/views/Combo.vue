<template>
  <div>
    <h4>{{ $route.params.id }}</h4>
    <div class="fw-flex" v-if="this.dataReady">
      <div class="card-wheel">
        <img v-for="card in this.cards" :src="card" :key="card" alt="" />
      </div>
      <div class="comment-area b-card">
        <p class="comment-area-header">Comments</p>
        <div class="comment" v-for="mycomment in this.comments" :key="mycomment">
          <p class="comment-text">{{mycomment.body}}</p>
          <p class="comment-sig">{{mycomment.author}}</p>
        </div>
        <b-form v-if="getUser.user != null" @submit.prevent="postComment">
          <b-textarea v-model="comment.body"></b-textarea>
          <button class="btn btn-primary btn-md">Comment</button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import ComboService from "@/comboService";
import ScryfallService from "@/scryfallService";
import CommentService from "@/commentService";
import UserService from "@/userService";
import {mapGetters} from "vuex";

export default {
  name: "Combo",
  data() {
    return {
      numCards: 0,
      numComments: 0,
      cards: [],
      comments: [],
      comment: {
        author: null,
        combo: null,
        body: null,
        postdate: new Date().toString()
      },
      dataReady: false
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    async postComment() {
      this.comment.combo = this.$route.params.id
      try {
        CommentService.postComment(this.comment).then(async (comment) => {
          comment.author = (await UserService.getUser(comment.author)).firstName
          this.comments.push(comment)
        })
      } catch (e) {
        console.error(e)
      }
    }
  },
  async mounted() {
    if (this.getUser.user != null) {this.comment.author = this.getUser.user._id}
    const cardIDs = (await ComboService.getComboByID(this.$route.params.id)).cards;
    console.log(cardIDs)
    this.numCards = cardIDs.length;
    let current = 1;
    while (current <= this.numCards) {
      this.cards.push(await ScryfallService.getPhotoByID(cardIDs[current-1]))
      current++;
    }
    const comments = await CommentService.getCommentsByComboID((this.$route.params.id));
    this.numComments = comments.length;
    current = 1;
    while (current <= this.numComments) {
      const localuser = await UserService.getUser(comments[current-1].author)
      comments[current-1].author = localuser.firstName
      current++
      this.comments = comments
    }
    this.dataReady = true;
  }
}
</script>

<style scoped>
* {
  margin: 0;
}
p {
  width: 100%;
}
.fw-flex{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.comment-area {
  max-width: 60%;
  min-width: 60%;
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