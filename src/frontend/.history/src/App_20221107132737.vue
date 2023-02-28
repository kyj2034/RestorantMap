<template>
  <div id="app">
    <MainMap/>
    <SideBar class="side-bar"/>
  </div>
</template>

<script>
import MainMap from '@/components/MainMap'
import SideBar from '@/components/SideBar'

export default {
  name: 'App',
  components: {
    SideBar,
    MainMap
  }
}
</script>

<style>
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
