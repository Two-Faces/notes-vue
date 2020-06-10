<template>
  <div id="app">
    <h4>Notes list</h4>
    <router-view/>
    <v-dialog />
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'App',
  methods: {
    ...mapActions(['getNotes']),
  },
  mounted() {
    this.getNotes();
  }
}
</script>

<style lang="scss">
  h4{
    text-align: center;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 60px;
  }
</style>
