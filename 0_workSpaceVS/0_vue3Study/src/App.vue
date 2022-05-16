
<template>
  <div>
    <router-link to="/home">初始</router-link>
    |
    <router-link to="/about">useXXX</router-link>
    |
    <router-link to="/style">style & js</router-link>
    |
    <router-link to="/watcheffect">watcheffect</router-link>
    |
    <router-link to="/Props">Props</router-link>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
