<template>
  <div>
    <div class="btn-fullscreen">
      <el-tooltip effect="dark" :content="contents" placement="bottom">
        <el-badge is-dot class="item">
          <img src="../../assets/img/消息中心.png" @click="Msgk" />
        </el-badge>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { selectMessage } from "@/api/index.js";
export default {
  name: "Message",
  data() {
    return {
      contents: "",
      contdata: [],
    };
  },
  methods: {
    Msgk() {
      this.$emit("getMessageKey");
      this.$router.push({
        path: "/message",
      });
    },
  },
  mounted() {
    selectMessage().then((res) => {
      res.data.forEach((item) => {
        if (item.status == "1") {
          this.contdata.push(item);
        }
      });
      this.contents = "您有" + this.contdata.length + "条未读消息";
    });
  },
};
</script>

<style lang="less" scoped>
.btn-fullscreen {
  line-height: 45px;
  .item {
    img {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
    /deep/sup {
      top: 12px;
      right: 12px;
    }
  }
}
</style>
