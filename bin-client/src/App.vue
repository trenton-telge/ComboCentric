<template>
  <div id="app" class="fw">
    <Navigation class="fw" />
    <div class="pw">
      <router-view/>
    </div>
    <Footer class="fw" />
  </div>
</template>

<script>

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
export default {
  name: 'App',
  components: {Footer, Navigation},
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.fw {
  width: 100%;
}
.pw {
  width: 94%;
  max-width: 1200px;
  min-height: calc(100% - 134px);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
}
html, body {
  height: 100%;
}
</style>
