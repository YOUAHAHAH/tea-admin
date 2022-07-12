<template>
  <div>
    <div class="btn-fullscreen" @click="handleFullScreen">
      <el-tooltip
        effect="dark"
        :content="fullscreen ? `取消全屏` : `全屏`"
        placement="bottom"
      >
        <img src="../../assets/img/全屏.png" v-if="!fullscreen" />
        <img src="../../assets/img/取消全屏.png" v-else />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "FullScreen",
  data() {
    return {
      fullscreen: false,
    };
  },
  created() {
    let that = this;
    window.onresize = function () {
      if (!that.checkFull()) {
        // 退出全屏后要执行的动作
        that.fullscreen = false;
      }
    };
  },
  methods: {
    checkFull() {
      //判断浏览器是否处于全屏状态 （需要考虑兼容问题）
      //火狐浏览器
      var isFull =
        document.mozFullScreen ||
        document.fullScreen ||
        //谷歌浏览器及Webkit内核浏览器
        document.webkitIsFullScreen ||
        document.webkitRequestFullScreen ||
        document.mozRequestFullScreen ||
        document.msFullscreenEnabled;
      if (isFull === undefined) {
        isFull = false;
      }
      return isFull;
    },

    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
  },
};
</script>

<style lang="less" scoped>
.btn-fullscreen {
  line-height: 45px;
  margin-right: 10px;
  img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
}
</style>
