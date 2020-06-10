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
    text-transform: uppercase;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 60px;

    button:not(.vue-dialog-button) {
      outline: none;
      box-shadow: 0 1px 1px -1px #000;
      cursor: pointer;
      margin: 0 3px;
      border-radius: 3px;
      color: #fff;
      background: #444;
      border: 0;
      height: 30px;
      transition: .1s;

      &:disabled {
        opacity: .7;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        opacity: .9;
        transform: translate(0,-1px);
      }

      &.error {
        background: brown;
        color: #fff;
      }
      &.success {
        background: darkslategrey;
        color: #fff;
      }
    }
  }
</style>
