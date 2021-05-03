<template>
  <footer>
    <router-link to="FAQ">FAQ</router-link>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
  footer {
    height:80px;
    width: 100%;
    display: flex;
    background-color: aquamarine;
    justify-content: center;
    align-items: center;
  }
  footer * {
    color: black;
  }
</style>