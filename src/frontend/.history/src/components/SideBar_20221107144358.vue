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
    </VueResizable>
    <BButton
      class="side-bar-active-btn"
      sise="sm"
      @click="showSideBar"
    >
      {{ isVisibleSideBar ? '닫힘' : '열림' }}
      </BButton>
  </div>
</template>

<script>
import VueResizable from 'vue-resizable';
import { BButton } from 'bootstrap-vue';
  export default {
    name: 'SideBar',
    components: {
      VueResizable,
      BButton,
    },
    data(){
      return {
        isVisibleSideBar: true,
      }
    },
    methods: {
      showSideBar() {
        this.isVisibleSideBar = !this.isVisibleSideBar;
      }
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
