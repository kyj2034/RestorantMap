<template>
  <div class="side-bar-wrapper">
    <VueResizable
        class="resizable-side-bar"
        :width="500"
        :min-width="500"
        :max-width="Infinity"
        :active="['r']"
        v-if="isVisibleSideBar">
      <div class="side-bar"></div>
      </div>
      
    </VueResizable>
  </div>
</template>

<script>
import VueResizable from 'vue-resizable';

  export default {
    name: 'SideBar',
    components: {
      VueResizable,
    },
    data(){
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
.side-bar-wrapper {
  > .resizable-side-bar{
    > .side-bar {
      background-color: #000000;
      opacity: 0.5;
      width: 100%;
      height: 100%;
    }
  } 
}
</style>
