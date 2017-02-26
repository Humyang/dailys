<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <counter></counter>
  </div>
</template>

<script>
import Counter from './Count.vue'
// import { mapState } from 'vuex'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Learn Vuex'
    }
  },
  components: {
    Counter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
