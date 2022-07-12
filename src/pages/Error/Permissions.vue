<template>
  <div style="width: 100%">
    <el-col :span="24">
      <el-card style="padding: 20px" v-if="!PermissionsInfo">
        <h2 style="text-align: center; padding: 10px">管理员权限页面</h2>
        <span style="font-size: 14px">
          只有用 管理员
          账号登录的才拥有管理员权限，才能进到这个页面，其他账号想进来都会跳到403页面，重新用管理员账号登录才有权限。
          想尝试一下，请<el-button type="text" @click="LoginOut"
            >退出登录</el-button
          >，随便输入个账号名，再进来试试看。
        </span>
      </el-card>
      <el-card v-else>
        <div class="error-page">
          <div class="error-code">4<span>0</span>3</div>
          <div class="error-desc">啊哦~ 你没有权限访问该页面哦</div>
          <div class="error-handle">
            <router-link to="/Main">
              <el-button type="primary" size="large">返回首页</el-button>
            </router-link>
            <el-button
              class="error-btn"
              type="primary"
              size="large"
              @click="goBack"
              >返回上一页</el-button
            >
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Permissions",
  data() {
    return {
      LoginInfo: "", // 登录信息
      PermissionsInfo: false,
    };
  },
  methods: {
    LoginOut() {
      this.$store.commit("loginOut");
      this.$router.push("/Login");
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.LoginInfo = JSON.parse(localStorage.getItem("loginUserInfo"));
    // console.log(this.LoginInfo);
    if (this.LoginInfo == "admin") {
      // console.log(111);
      this.PermissionsInfo = true;
    } else {
      this.PermissionsInfo = false;
    }
  },
};
</script>

<style lang="less" scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.error-code {
  line-height: 1;
  font-size: 250px;
  font-weight: bolder;
  color: #f02d2d;
}
.error-code span {
  color: #00a854;
}
.error-desc {
  font-size: 30px;
  color: #777;
}
.error-handle {
  margin-top: 30px;
  padding-bottom: 150px;
}
.error-btn {
  margin-left: 100px;
}
</style>
