<template>
  <div>
    <el-row>
      <el-col :span="16">
        <el-breadcrumb separator="/" style="padding: 25px">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item, index) in list" :key="index">{{
            item
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="8">
        <div class="header-right">
          <Message @getMessageKey="getMsg"></Message>
          <FullScreen></FullScreen>
          <el-dropdown trigger="click" @command="handleCommand">
            <!-- <el-avatar :size="45" shape="square" :src="imgUrl"></el-avatar> -->
            <img
              :src="imgUrl"
              style="width: 45px; height: 45px; border-radius: 50%"
            />
            <el-dropdown-menu slot="dropdown" split-button="true">
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item divided command="loginOut"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FullScreen from "./FullScreen.vue";
import Message from "./Message.vue";
import Bus from "@/assets/js/Bus.js";
import imgUrl from "@/assets/img/333.jpg";
export default {
  name: "Header",
  components: {
    FullScreen,
    Message,
  },
  data() {
    return {
      list: [],
      imgUrl,
      MsgKey: "",
    };
  },
  methods: {
    getMsg() {
      this.list = ["消息中心", "消息列表"];
    },
    handleCommand(command) {
      console.log(command);
      if (command === "user") {
        this.$router.push("/UserList");
      } else if (command === "loginOut") {
        this.$store.commit("loginOut");
        this.$router.push("/Login");
      }
    },
  },
  created() {
    if (this.$route.path === "/Main") {
      this.list = [];
    } else {
      this.list.push(this.$route.meta.firstName, this.$route.meta.name);
    }
    Bus.$on("AsideSelect", (key, keyPath, datas) => {
      if (key == "/Main") {
        return (this.list = []);
      } else if (this.MsgKey == "/Message" || key == "/Message") {
        return this.getMsg();
      } else {
        datas.forEach((item) => {
          if (item.path === keyPath[0]) {
            this.list.splice(0, 1, item.title);
            item.children.forEach((subItem) => {
              if (subItem.path === key) {
                return this.list.splice(1, 2, subItem.title);
              }
            });
          }
        });
      }
    });
  },
};
</script>

<style lang="less" scoped>
.header-right {
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
  .el-dropdown {
    float: right;
    margin-right: 50px;
  }
}
</style>
