<template>
  <div>
    <el-container class="app-wrapper">
      <el-aside width="210px"><Aside></Aside></el-aside>
      <el-container class="container">
        <el-header><Header></Header> </el-header>
        <Card></Card>
        <el-main><Main></Main></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Card from "./Card.vue";
import Header from "@/views/Header/Header.vue";
import Aside from "@/views/Aside/AsideMain.vue";
import Main from "@/views/Main/Main.vue";
export default {
  name: "Home",
  components: {
    Card,
    Header,
    Aside,
    Main,
  },
  data() {
    return {
      LoginInfo: "", // 登录信息
    };
  },
  created() {
    this.LoginInfo = JSON.parse(localStorage.getItem("loginUserInfo"));
    // console.log(this.LoginInfo);
    if (this.LoginInfo == "admin") {
      this.$message({
        message: "此状态为游客状态！",
        type: "success",
      });
    } else if (this.LoginInfo.id != 1) {
      this.$message({
        message: "此状态为管理员状态！",
        type: "success",
      });
    } else if (this.LoginInfo.id == 1) {
      this.$message({
        message: "欢迎尊贵的超级管理员！",
        type: "success",
      });
    }
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.el-aside {
  background-color: #304156;
  overflow: hidden;
  box-shadow: 3px 3px 6px 0px rgb(0 21 41 / 35%);
}
::v-deep .el-header {
  padding: 0;
}
</style>
