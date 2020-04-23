<template>
  <div id="footer">
    <a :href="url">
      <img class="logo" src="../../images/github.svg" alt="">
    </a>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    url: String
  }
}
</script>

<style scoped>
#footer {
  display: flex;
  justify-content: center;
  font-size: 30px;
  height: 40px;
  text-align: center;
  width: 100%;
  background-color: #343a40;
  position: fixed;
  bottom: 0px;
}

.logo {
    height: 20px;
    margin: 10px auto;
}
</style>

<style>
body {
  height: 100%;
  margin: 0 0 50px 0;
}
</style>
