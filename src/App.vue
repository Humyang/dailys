<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './css/common.css'
import './css/flex.css'
import './css/scroll.css'
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
