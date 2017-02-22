<template>

  <div id="app">

    <img src="./assets/logo.png">
    <router-view></router-view>
    {{ count1 }}
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      count: 1
    }
  },
  computed: {
    count1 () {
      // return '123123'
      return this.$store.state.count
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
