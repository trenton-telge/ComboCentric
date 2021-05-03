<template>
  <div class="faq-wrapper">
    <div class="faq-inner">
      <h4>FAQ</h4>
      <h6>What Is ComboCentric?</h6>
      <p><span class="tab"></span>ComboCentric is a platform for sharing and discussing potential combos in Magic: The Gathering.</p>
      <br />
      <h6>How do I post a combo I’ve discovered?</h6>
      <p><span class="tab"></span>To post a combo, you will first have to log in or create an account on ComboCentric. Once you’re logged in, just go to the Post Combo page in the navigation, search for up to five cards, and add a comment to begin the discussion.</p>
      <br />
      <h6>How do I find other users’ posts?</h6>
      <p><span class="tab"></span>The main discovery mechanism for other posts is the homepage, with displays featured posts each time you open the link. Each post has a dedicated permalink to share outside of the platform.</p>
      <br />
      <h6>How do I comment on another user’s post?</h6>
      <p><span class="tab"></span>You must first go to the permalinked page for that post, then you may post a comment on that combo suggestion.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FAQ"
}
</script>

<style scoped>
  .faq-wrapper {
    text-align: left;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .faq-inner {
    max-width: 60%;
  }
  h4 {
    margin-top: 20px;
    text-align: center;
  }
  h6 {
    font-size: 16pt;
    font-weight: bold;
  }
  .tab {
    display: inline-block;
    margin-left: 40px;
  }
</style>