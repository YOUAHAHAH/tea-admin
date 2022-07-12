<template>
  <div class="login-wrap">
    <div class="bgc">
      <img src="../../assets/img/999.png" />
    </div>
    <div class="ms-login">
      <el-form
        :model="form"
        status-icon
        ref="form"
        class="login-container"
        v-loading="loading"
      >
        <h3 class="login-title" style="margin-top: 20px">欢迎登录</h3>
        <el-form-item>
          <el-input type="input" v-model="form.phone">
            <template #prepend>
              <el-button icon="el-icon-user"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="form.password">
            <template #prepend>
              <el-button icon="el-icon-lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm(form)">登录</el-button>
        </div>
        <Enorll></Enorll>
      </el-form>
    </div>
  </div>
</template>

<script>
import Enorll from "./Enorll.vue";
import { LoginUser } from "@/api/index.js";
import { Throttle } from "../../assets/js/debounce.js";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  components: {
    Enorll,
  },
  data() {
    return {
      loading: false,
      form: {
        phone: "admin",
        password: "123456",
      },
    };
  },
  methods: {
    ...mapMutations(["USER_LOGIN"]),
    // 登录 (节流)
    submitForm: Throttle(function (from) {
      this.loading = true;
      if (this.form.phone == "admin" && this.form.password == "123456") {
        localStorage.setItem("loginUserInfo", JSON.stringify(this.form.phone));
        this.$router.push("/Main");
      } else {
        LoginUser(from).then((res) => {
          if (res.success) {
            this.USER_LOGIN(res.data[0]);
            this.$router.push("/Main");
          } else {
            this.$message.error(res.msg);
          }
          this.loading = false;
        });
      }
    }, 1000),
  },
};
</script>

<style lang="less" scoped>
.login-wrap {
  .bgc {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .ms-login {
    .login-container {
      border-radius: 15px;
      background-color: #fff;
      background-clip: padding-box;
      position: absolute;
      left: 60%;
      top: 25%;
      width: 350px;
      padding: 35px 35px 15px 35px;
      padding-top: 0;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      .login-title {
        margin: 0 auto 40px auto;
        text-align: center;
        color: #505458;
      }
      .login-btn {
        text-align: center;
        button {
          width: 100%;
          height: 36px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
.el-form-item__content {
  text-align: center;
}
</style>
