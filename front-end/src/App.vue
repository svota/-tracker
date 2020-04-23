<template>
<div id="app">
  <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.1/build/pure-min.css" integrity="sha384-oAOxQR6DkCoMliIh8yFnu25d7Eq/PHS21PClpwjOTeU2jRSq11vu66rf90/cZr47" crossorigin="anonymous">
  <div class="header">
    <div class="brand">
      <h1>ВремяTracker</h1>
      <h2>Time-Management Service</h2>
    </div>
  </div>
  <div class="content">
    <router-view/>
  </div>
  <Footer url="https://github.com/svota/vremyatracker"/>
</div>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Footer
  },
}
</script>

<style>
body {
  background: #F7F5F7;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
