<template>
  <div class="main">
    <!-- Main 切换页面动画 -->
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Main",
};
</script>

<style lang="less" scoped>
.main {
  position: relative;
}
.slide-enter-active,
.slide-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
