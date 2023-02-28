<template>
  <div id="app">
    <MainMap/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MainMap from '@/components/MainMap'

export default {
  name: 'App',
  components: {
    MainMap
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
