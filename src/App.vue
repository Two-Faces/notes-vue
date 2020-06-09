<template>
  <div id="app">
    <h4>Notes list</h4>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({

  })
}
</script>

<style>
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
